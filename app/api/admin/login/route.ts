import { NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";
import { ADMIN_COOKIE, adminConfigured, issueToken, verifyPassword } from "@/lib/admin/session";

// Fünf Versuche in einer Viertelstunde je IP. Bremst Rateversuche aus, ohne
// jemanden auszusperren, der sich einmal vertippt.
const limiter = createRateLimiter({ limit: 5, windowMs: 15 * 60 * 1000 });

const schema = z.object({ password: z.string().min(1).max(200) });

export async function POST(request: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "Der Bereich ist nicht eingerichtet." }, { status: 503 });
  }

  if (limiter(clientIp(request))) {
    return NextResponse.json(
      { error: "Zu viele Versuche. Bitte in einer Viertelstunde erneut probieren." },
      { status: 429 },
    );
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !verifyPassword(parsed.data.password)) {
    return NextResponse.json({ error: "Passwort stimmt nicht." }, { status: 401 });
  }

  const { value, maxAge } = issueToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });
  return response;
}
