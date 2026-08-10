import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/email";
import { createToken } from "@/lib/newsletter-token";
import { confirmEmail } from "@/lib/newsletter-email";

// Uses node:crypto for the token — force the Node.js runtime (not Edge).
export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(["de", "en"]).optional(),
  // Honeypot — real users leave this empty; bots tend to fill every field.
  hp: z.string().optional(),
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nex-a-i.com";

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    // Malformed / non-JSON body → bad request, not a server error.
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { email, hp } = parsed.data;
  const locale = parsed.data.locale ?? "de";

  // Bot trap: pretend success, send nothing.
  if (hp && hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  // Double opt-in step 1: email a signed confirmation link to the SUBSCRIBER.
  // We do NOT add them anywhere yet — they only count as subscribed once they
  // click the link (handled in /api/subscribe/confirm).
  let token: string;
  try {
    token = createToken(email);
  } catch {
    // Secret unavailable = server misconfiguration.
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const confirmUrl = `${SITE_URL}/${locale}/newsletter/confirm?token=${encodeURIComponent(token)}`;
  const mail = confirmEmail(locale, confirmUrl);

  const result = await sendMail({
    to: email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  });

  if (!result.ok) {
    // Missing API key = server misconfiguration (500); send failure = upstream (502).
    return NextResponse.json(
      { ok: false },
      { status: result.error === "not_configured" ? 500 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
