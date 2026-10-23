import { contactConfigured, validateEnquiry, type Enquiry } from "@/lib/contact";

/**
 * Booking enquiries. Delivery is configured with server-only environment variables
 * (see .env.example) — nothing secret ever reaches the browser:
 *   RESEND_API_KEY + BOOKING_EMAIL  → sends an email through Resend
 *   CONTACT_WEBHOOK_URL             → POSTs the enquiry as JSON (Zapier, Make, Slack, a CRM…)
 * With neither set the route answers 503 and the form shows the fallback contact options.
 */

const recent = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function deliver(e: Enquiry) {
  const lines = [
    `Name: ${e.name}`,
    `Email: ${e.email}`,
    `Type: ${e.type}`,
    e.date ? `Date: ${e.date}` : null,
    e.location ? `Location: ${e.location}` : null,
    "",
    e.message,
  ].filter((l) => l !== null) as string[];

  if (process.env.RESEND_API_KEY && process.env.BOOKING_EMAIL) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
        to: [process.env.BOOKING_EMAIL],
        reply_to: e.email,
        subject: `Booking enquiry — ${e.type} — ${e.name}`,
        text: lines.join("\n"),
        html: `<pre style="font:14px/1.5 system-ui">${escape(lines.join("\n"))}</pre>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return;
  }

  if (process.env.CONTACT_WEBHOOK_URL) {
    const res = await fetch(process.env.CONTACT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...e, receivedAt: new Date().toISOString(), text: lines.join("\n") }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  }
}

export async function POST(request: Request) {
  if (!contactConfigured()) {
    return Response.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === "string" && body.company.length > 0) {
    return Response.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const { data, errors } = validateEnquiry(body);
  if (!data) return Response.json({ ok: false, error: "invalid", errors }, { status: 422 });

  try {
    await deliver(data);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery failed", err);
    return Response.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
