import { NextResponse } from "next/server";
import { contact, person } from "@/content/profile";
import { isValidEmail } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_LENGTHS = { name: 120, email: 200, subject: 200, message: 5000 };
const RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 };

/**
 * Best-effort in-memory throttle. Serverless instances are not shared, so this
 * is a speed bump rather than a guarantee — enough to stop naive floods without
 * adding a database. Swap in Vercel KV if the form ever gets seriously abused.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (ts) => now - ts < RATE_LIMIT.windowMs,
  );
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((ts) => now - ts >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }

  return recent.length > RATE_LIMIT.max;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const read = (key: keyof typeof MAX_LENGTHS) =>
    String(payload[key] ?? "")
      .trim()
      .slice(0, MAX_LENGTHS[key]);

  const name = read("name");
  const email = read("email");
  const subject = read("subject");
  const message = read("message");

  // Honeypot: a filled `company` field means a bot. Return 200 so the bot
  // believes it succeeded and does not retry with a different strategy.
  if (String(payload.company ?? "").length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a name, a valid email address, and a message." },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? contact.email;

  // Without a mail provider configured the form cannot deliver. Say so plainly
  // rather than pretending it worked — the UI falls back to a mailto link.
  if (!apiKey || !from) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY and CONTACT_FROM_EMAIL.",
    );
    return NextResponse.json(
      { error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  const heading = subject
    ? `${subject} — via josueboutrosmd.com`
    : `New message via josueboutrosmd.com`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: heading,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          subject ? `Subject: ${subject}` : null,
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
        html: `
          <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6;color:#14201d">
            <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
            ${subject ? `<p style="margin:0 0 4px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
            <hr style="border:none;border-top:1px solid #e4dcd0;margin:16px 0" />
            <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
            <p style="margin:24px 0 0;font-size:12px;color:#5c6a66">
              Sent from the contact form on ${person.displayName}'s website.
            </p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend rejected the message:", response.status, detail);
      return NextResponse.json(
        { error: "The message could not be delivered." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Contact form delivery failed:", error);
    return NextResponse.json(
      { error: "The message could not be delivered." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
