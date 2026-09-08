// Lesen und Schreiben der Sprachdateien für den Texteditor.
//
// Zwei Quellen, mit unterschiedlicher Aufgabe:
//
//  • Zum Bearbeiten und Speichern zählt ausschließlich GitHub — der Editor lädt
//    beim Öffnen den echten Stand des Branches und schreibt gegen genau diesen
//    zurück. Nur so gehen parallele Änderungen an anderen Feldern nicht verloren.
//
//  • Für Übersicht und Suche genügt der mitgebaute Stand aus dem Bundle. Der ist
//    schnell, kostet keine API-Aufrufe und ist ab dem nächsten Bau wieder aktuell.
//    Die Oberfläche sagt das an der Stelle auch dazu.
//
// Ohne `GITHUB_TOKEN` fällt der Editor in der lokalen Entwicklung auf das
// Dateisystem zurück. In Produktion niemals — dort wäre eine Änderung im
// Container beim nächsten Deploy spurlos weg.

import { readFile as readLocalFile, writeFile as writeLocalFile } from "node:fs/promises";
import { join } from "node:path";
import { commitFiles, githubConfigured, readFile as readGithubFile } from "./github";
import { LOCALES, messagePath, type Locale } from "./sections";

export type SectionContent = Record<Locale, unknown>;

const viaGithub = () => githubConfigured();
const localOnly = () => !githubConfigured() && process.env.NODE_ENV !== "production";

export function storageMode(): "github" | "local" | "off" {
  if (viaGithub()) return "github";
  return localOnly() ? "local" : "off";
}

/** Aktueller Stand einer Sprachdatei — aus GitHub, in der Entwicklung von Platte. */
async function loadRaw(locale: Locale, sectionId: string): Promise<string> {
  const path = messagePath(locale, sectionId);
  if (viaGithub()) return readGithubFile(path);
  if (localOnly()) return readLocalFile(join(process.cwd(), path), "utf8");
  throw new Error("Der Texteditor ist nicht eingerichtet (GITHUB_TOKEN fehlt).");
}

export async function loadSection(sectionId: string): Promise<SectionContent> {
  const [de, en] = await Promise.all(LOCALES.map((l) => loadRaw(l, sectionId)));
  return { de: JSON.parse(de), en: JSON.parse(en) };
}

/**
 * Der zum Bau mitgelieferte Stand. Wird nur für Übersicht und Suche benutzt,
 * nie als Grundlage zum Speichern.
 */
export async function loadBundled(locale: Locale, sectionId: string): Promise<unknown> {
  const loaded = await import(`../../messages/${locale}/${sectionId}.json`);
  return loaded.default;
}

export type SaveResult =
  | { mode: "github"; sha: string; url: string }
  | { mode: "local" };

/**
 * Schreibt fertig serialisierte Dateien. Das Format ist dasselbe, das
 * `scripts/messages-format.mjs` erzeugt — dadurch bleibt der Vergleich in Git
 * auf die tatsächlich geänderten Zeilen beschränkt.
 */
export async function saveFiles(
  files: Record<string, unknown>,
  message: string,
): Promise<SaveResult> {
  const serialized = Object.fromEntries(
    Object.entries(files).map(([path, document]) => [
      path,
      JSON.stringify(document, null, 2) + "\n",
    ]),
  );

  if (viaGithub()) {
    const { sha, url } = await commitFiles(serialized, message);
    return { mode: "github", sha, url };
  }

  if (localOnly()) {
    await Promise.all(
      Object.entries(serialized).map(([path, content]) =>
        writeLocalFile(join(process.cwd(), path), content, "utf8"),
      ),
    );
    return { mode: "local" };
  }

  throw new Error("Der Texteditor ist nicht eingerichtet (GITHUB_TOKEN fehlt).");
}
