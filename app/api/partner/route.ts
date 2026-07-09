import { NextResponse } from "next/server";
import { z } from "zod";
import { fieldsToHtml, fieldsToText, sendMail } from "@/lib/email";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  website: z.string().optional(),
  companyType: z.string().min(1),
  message: z.string().min(10),
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

  const { name, email, company, website, companyType, message } = parsed.data;
  const fields = {
    Name: name,
    "E-Mail": email,
    Unternehmen: company,
    Website: website?.trim() ? website : "—",
    "Art des Unternehmens": companyType,
    Nachricht: message,
  };

  const result = await sendMail({
    subject: `Neue Partneranfrage von ${name}`,
    replyTo: email,
    html: fieldsToHtml(fields),
    text: fieldsToText(fields),
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false },
      { status: result.error === "not_configured" ? 500 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
