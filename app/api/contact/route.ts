import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

// Where contact submissions are sent. Overridable via env if needed.
const TO = process.env.CONTACT_TO ?? "mbt@nex-a-i.com";
// Sender. Works out of the box with Resend's onboarding domain; switch to a
// verified address on nex-a-i.com later for better deliverability.
const FROM = process.env.CONTACT_FROM ?? "NEXAI Website <onboarding@resend.dev>";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const { name, email, company, message } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Email provider not configured yet — log so nothing is silently lost.
      console.log("[contact] (no RESEND_API_KEY set) submission:", {
        name,
        email,
        company: company ?? "",
      });
      return NextResponse.json({ ok: true });
    }

    const text = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      `Unternehmen: ${company?.trim() ? company : "—"}`,
      "",
      "Nachricht:",
      message,
    ].join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Neue Kontaktanfrage von ${name}`,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend error:", res.status, detail);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
