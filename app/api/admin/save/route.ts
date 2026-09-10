import { NextResponse } from "next/server";
import { z } from "zod";
import { applyValues } from "@/lib/admin/fields";
import { findSection, messagePath, type Locale } from "@/lib/admin/sections";
import { loadSection, saveFiles } from "@/lib/admin/store";
import { isSignedIn } from "@/lib/admin/session";

const fieldMap = z.record(z.string(), z.string());

const schema = z.object({
  // Je Bereich und Sprache die geänderten Felder: { home: { de: { "Hero.title": "…" } } }
  changes: z.record(
    z.string(),
    z.object({ de: fieldMap.optional(), en: fieldMap.optional() }),
  ),
  note: z.string().max(140).optional(),
});

export async function POST(request: Request) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { changes, note } = parsed.data;
  const files: Record<string, unknown> = {};
  const touched: string[] = [];

  try {
    for (const [sectionId, perLocale] of Object.entries(changes)) {
      const section = findSection(sectionId);
      if (!section) {
        return NextResponse.json({ error: `Unbekannter Bereich: ${sectionId}` }, { status: 400 });
      }

      const entries = Object.entries(perLocale ?? {}).filter(
        ([, fields]) => fields && Object.keys(fields).length > 0,
      ) as [Locale, Record<string, string>][];
      if (entries.length === 0) continue;

      // Immer gegen den frisch geladenen Stand arbeiten, nie gegen den, den der
      // Browser beim Öffnen bekommen hat.
      const current = await loadSection(sectionId);
      for (const [locale, fields] of entries) {
        files[messagePath(locale, sectionId)] = applyValues(current[locale], fields);
      }
      touched.push(section.title);
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Speichern fehlgeschlagen." },
      { status: 400 },
    );
  }

  if (Object.keys(files).length === 0) {
    return NextResponse.json({ error: "Keine Änderungen." }, { status: 400 });
  }

  const headline = note?.trim() || `Texte geändert: ${touched.join(", ")}`;
  const message = `${headline}\n\nGeändert über den Texteditor unter /admin.`;

  try {
    const result = await saveFiles(files, message);
    return NextResponse.json({ ok: true, files: Object.keys(files), ...result });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unbekannter Fehler";
    // Der häufigste echte Fehlerfall: Zwischenzeitlich wurde auf main gepusht.
    const hint = detail.includes("422")
      ? "In der Zwischenzeit wurde am Repository etwas geändert. Seite neu laden und noch einmal speichern."
      : detail;
    return NextResponse.json({ error: hint }, { status: 502 });
  }
}
