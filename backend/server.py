from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import hashlib
import logging
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Literal, Optional
import uuid
from datetime import datetime, timezone
import httpx
from emergentintegrations.llm.openai import OpenAITextToSpeech

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY")
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]
SITE_URL = "https://josue-clinical.preview.emergentagent.com"

AUDIO_DIR = ROOT_DIR / "audio_cache"
AUDIO_DIR.mkdir(exist_ok=True)
tts_client = OpenAITextToSpeech(api_key=os.environ["EMERGENT_LLM_KEY"])
TTS_VOICE = "onyx"
TTS_MODEL = "tts-1-hd"

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    async with httpx.AsyncClient(timeout=30) as http_client:
        resp = await http_client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


def _email_frame(inner: str) -> str:
    return (
        '<table role="presentation" width="100%" style="background:#FAF7F2;padding:32px 0">'
        '<tr><td align="center"><table role="presentation" width="560" style="background:#FFFFFF;'
        'border:1px solid #E7DFD3;border-radius:12px;padding:32px;font-family:Arial,sans-serif;'
        f'font-size:14px;color:#1C1917">{inner}</table></td></tr></table>'
    )


def _email_footer() -> str:
    return (
        f'<tr><td style="padding-top:24px;font-size:12px;color:#78716C">Sent by {escape(EMAIL_FROM_NAME)}'
        f' — <a href="{SITE_URL}">{escape(EMAIL_FROM_NAME)}</a>. '
        'We never ask for passwords or card details by email.</td></tr>'
    )


def clean_for_tts(text: str) -> str:
    text = re.sub(r"https?://\S+", "", text)
    text = re.sub(r"`{1,3}[^`]*`{1,3}", "", text)
    text = re.sub(r"[*_#>~|]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def chunk_text(text: str, limit: int = 4000) -> list[str]:
    chunks, current = [], ""
    for sentence in text.split(". "):
        piece = sentence if sentence.endswith(".") else sentence + "."
        piece = piece + " "
        if len(current) + len(piece) > limit and current:
            chunks.append(current.strip())
            current = piece
        else:
            current += piece
    if current.strip():
        chunks.append(current.strip())
    final = []
    for c in chunks:
        while len(c) > limit:
            final.append(c[:limit])
            c = c[limit:]
        final.append(c)
    return final


class ContactInquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    inquiry_type: Literal["patient", "speaking", "media", "professional"]
    message: str = Field(min_length=1, max_length=5000)
    lang: Optional[str] = "en"


class ContactInquiry(BaseModel):
    id: str
    name: str
    email: EmailStr
    inquiry_type: str
    message: str
    lang: str = "en"
    created_at: str


class NewsletterSubscribe(BaseModel):
    email: EmailStr
    lang: Optional[str] = "en"


class TTSRequest(BaseModel):
    text: str = Field(min_length=10, max_length=30000)
    lang: Optional[str] = "en"


@api_router.get("/")
async def root():
    return {"message": "Josué Boutros, MD — API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/contact", response_model=ContactInquiry)
async def create_inquiry(payload: ContactInquiryCreate):
    doc = payload.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contact_inquiries.insert_one(doc)
    doc.pop("_id", None)
    try:
        inner = (
            f'<tr><td><h2 style="margin:0 0 16px;font-size:18px">New {escape(doc["inquiry_type"])} inquiry</h2></td></tr>'
            f'<tr><td style="padding:4px 0"><strong>Name:</strong> {escape(doc["name"])}</td></tr>'
            f'<tr><td style="padding:4px 0"><strong>Email:</strong> {escape(doc["email"])}</td></tr>'
            f'<tr><td style="padding:4px 0"><strong>Type:</strong> {escape(doc["inquiry_type"])}</td></tr>'
            f'<tr><td style="padding:12px 0"><strong>Message:</strong><br/>{escape(doc["message"]).replace(chr(10), "<br/>")}</td></tr>'
            + _email_footer()
        )
        await send_email(
            to=OWNER_EMAIL,
            subject=f"New {doc['inquiry_type']} inquiry — josueboutros.md",
            html=_email_frame(inner),
        )
    except Exception as e:
        logger.error(f"Inquiry notification email failed: {e}")
    return ContactInquiry(**doc)


@api_router.post("/newsletter")
async def subscribe(payload: NewsletterSubscribe):
    existing = await db.newsletter_subscribers.find_one({"email": payload.email})
    if existing:
        return {"ok": True, "already": True}
    await db.newsletter_subscribers.insert_one({
        "id": str(uuid.uuid4()),
        "email": payload.email,
        "lang": payload.lang,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })
    try:
        if payload.lang == "es":
            subject = "Su suscripción — Josué Boutros, MD"
            inner = (
                '<tr><td><h2 style="margin:0 0 16px;font-size:18px">Bienvenido al archivo.</h2></td></tr>'
                '<tr><td style="padding-bottom:16px">Gracias por suscribirse. Recibirá cada nuevo ensayo '
                'sobre medicina familiar, prevención y el cuidado bilingüe — directo en su correo, sin ruido.</td></tr>'
                f'<tr><td><a href="{SITE_URL}/insights" style="color:#9F4A32">Leer el archivo de ensayos</a></td></tr>'
                + _email_footer()
            )
        else:
            subject = "Welcome to the archive — Josué Boutros, MD"
            inner = (
                '<tr><td><h2 style="margin:0 0 16px;font-size:18px">Welcome to the archive.</h2></td></tr>'
                '<tr><td style="padding-bottom:16px">Thank you for subscribing. Each new essay on family '
                'medicine, prevention, and bilingual care will arrive straight to your inbox — no noise.</td></tr>'
                f'<tr><td><a href="{SITE_URL}/insights" style="color:#9F4A32">Read the essay archive</a></td></tr>'
                + _email_footer()
            )
        await send_email(to=payload.email, subject=subject, html=_email_frame(inner))
    except Exception as e:
        logger.error(f"Newsletter welcome email failed: {e}")
    return {"ok": True, "already": False}


@api_router.post("/tts")
async def create_tts(payload: TTSRequest):
    text = clean_for_tts(payload.text)
    key = hashlib.sha256(f"{text}|{TTS_VOICE}|1.0|{TTS_MODEL}|mp3".encode()).hexdigest()
    path = AUDIO_DIR / f"{key}.mp3"
    if not path.exists():
        chunks = chunk_text(text)
        audio = b""
        for chunk in chunks:
            audio += await tts_client.generate_speech(
                text=chunk, model=TTS_MODEL, voice=TTS_VOICE, response_format="mp3"
            )
        path.write_bytes(audio)
        logger.info(f"Generated TTS {key} ({len(chunks)} chunks, {len(audio)} bytes)")
    return {"url": f"/api/tts/{key}.mp3"}


@api_router.get("/tts/{key}")
async def get_tts(key: str):
    if not re.fullmatch(r"[a-f0-9]{64}\.mp3", key):
        raise HTTPException(status_code=404, detail="Not found")
    path = AUDIO_DIR / key
    if not path.exists():
        raise HTTPException(status_code=404, detail="Not found")
    return FileResponse(path, media_type="audio/mpeg", headers={"Cache-Control": "public, max-age=31536000"})


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
