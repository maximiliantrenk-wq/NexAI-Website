import { NextResponse } from "next/server";
import { z } from "zod";
import { fieldsToHtml, fieldsToText, sendMail } from "@/lib/email";

const schema = z.object({
  email: z.string().email(),
  // Honeypot — real users leave this empty; bots tend to fill every field.
  hp: z.string().optional(),
});

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

  // Bot trap: pretend success, send nothing.
  if (hp && hp.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const fields = {
    "E-Mail": email,
    Quelle: "Newsletter (Footer)",
  };

  const result = await sendMail({
    subject: `Neuer Newsletter-Abonnent: ${email}`,
    replyTo: email,
    html: fieldsToHtml(fields),
    text: fieldsToText(fields),
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
