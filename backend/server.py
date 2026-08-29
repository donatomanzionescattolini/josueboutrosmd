from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import Literal, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


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
    return ContactInquiry(**doc)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
