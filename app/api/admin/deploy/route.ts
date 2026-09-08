import { NextResponse } from "next/server";
import { deployConfigured } from "@/lib/admin/deploy";
import { isSignedIn } from "@/lib/admin/session";

// Stößt in Coolify einen Neubau an, damit die gespeicherten Texte live gehen.

export async function POST() {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  if (!deployConfigured()) {
    return NextResponse.json({ error: "Kein Coolify-Zugang hinterlegt." }, { status: 503 });
  }

  const base = process.env.COOLIFY_URL!.trim().replace(/\/+$/, "");
  const uuid = encodeURIComponent(process.env.COOLIFY_APP_UUID!.trim());

  try {
    const response = await fetch(`${base}/api/v1/deploy?uuid=${uuid}`, {
      headers: { Authorization: `Bearer ${process.env.COOLIFY_TOKEN!.trim()}` },
      cache: "no-store",
    });
    if (!response.ok) {
      return NextResponse.json({ error: `Coolify meldet ${response.status}.` }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Coolify ist nicht erreichbar." }, { status: 502 });
  }
}
