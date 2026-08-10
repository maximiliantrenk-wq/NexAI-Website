import { NextResponse } from "next/server";
import { z } from "zod";
import { fieldsToHtml, fieldsToText, sendMail } from "@/lib/email";
import { verifyToken } from "@/lib/newsletter-token";

// Uses node:crypto for token verification — force the Node.js runtime.
export const runtime = "nodejs";

const schema = z.object({ token: z.string().min(1) });

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let verified: { email: string } | null;
  try {
    verified = verifyToken(parsed.data.token);
  } catch {
    // Token secret unavailable = server misconfiguration, not a bad link.
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  if (!verified) {
    // Invalid, tampered or expired link.
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Double opt-in step 2: consent is now proven. With no database, the internal
  // notification IS the consent record — so if it fails, surface an error (502)
  // and let the user retry via the still-valid link, rather than losing the lead.
  const fields = {
    "E-Mail": verified.email,
    Status: "Double-Opt-In bestätigt",
    Zeitpunkt: new Date().toISOString(),
    Quelle: "Newsletter (Footer)",
  };

  const notify = await sendMail({
    subject: `Newsletter bestätigt: ${verified.email}`,
    replyTo: verified.email,
    html: fieldsToHtml(fields),
    text: fieldsToText(fields),
  });

  if (!notify.ok) {
    return NextResponse.json(
      { ok: false },
      { status: notify.error === "not_configured" ? 500 : 502 },
    );
  }

  return NextResponse.json({ ok: true, email: verified.email });
}
