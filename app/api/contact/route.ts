import { NextResponse } from "next/server";
import { z } from "zod";
import { fieldsToHtml, fieldsToText, sendMail } from "@/lib/email";
import { saveLead } from "@/lib/crm";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
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

  const { name, email, company, message } = parsed.data;
  const fields = {
    Name: name,
    "E-Mail": email,
    Unternehmen: company?.trim() ? company : "—",
    Nachricht: message,
  };

  // Email (primary acknowledgement) + CRM (durable sink) run in parallel. The
  // form's success hinges on the email only; saveLead never throws and no-ops
  // until CRM_API_URL/KEY are set, so this can't regress the existing behaviour.
  const [result] = await Promise.all([
    sendMail({
      subject: `Neue Kontaktanfrage von ${name}`,
      replyTo: email,
      html: fieldsToHtml(fields),
      text: fieldsToText(fields),
    }),
    saveLead({
      name,
      email,
      source: "website-kontakt",
      title: `Kontaktanfrage – ${name}`,
      notes: [company?.trim() ? `Unternehmen: ${company}` : "", `Nachricht: ${message}`]
        .filter(Boolean)
        .join("\n"),
    }),
  ]);

  if (!result.ok) {
    // Missing API key = server misconfiguration (500); send failure = upstream (502).
    return NextResponse.json(
      { ok: false },
      { status: result.error === "not_configured" ? 500 : 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
