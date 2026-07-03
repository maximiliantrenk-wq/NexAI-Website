import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // TODO: wire up email delivery (e.g. Resend) using parsed.data.
    // For now we accept the submission so the form works end-to-end.
    console.log("[contact] new submission:", {
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company ?? "",
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
