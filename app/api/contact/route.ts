import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

// Contact submissions are emailed here via FormSubmit — no account / API key.
// On the very first submission, FormSubmit sends a one-time confirmation link
// to this address; click it once to activate delivery. After that, every
// submission lands in the inbox.
const ENDPOINT =
  process.env.CONTACT_ENDPOINT ?? "https://formsubmit.co/ajax/mbt@nex-a-i.com";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const { name, email, company, message } = parsed.data;

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit rejects requests without a site origin (anti-spam).
        Origin: "https://nex-a-i.com",
        Referer: "https://nex-a-i.com/contact",
      },
      body: JSON.stringify({
        name,
        email,
        company: company?.trim() ? company : "—",
        message,
        _subject: `Neue Kontaktanfrage von ${name}`,
        _template: "table",
        _captcha: "false",
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] FormSubmit error:", res.status, detail);
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
