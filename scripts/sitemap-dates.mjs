#!/usr/bin/env node
// Schreibt content/file-dates.json: für jede inhaltsrelevante Datei das Datum der
// letzten Änderung (Tag der letzten Commit-Änderung; noch nicht committete
// Änderungen zählen als heute). app/sitemap.ts leitet daraus je Adresse das
// <lastmod> ab, statt bei jedem Deploy alles auf „heute" zu stempeln.
//
// Läuft automatisch vor `npm run build` (prebuild). Auf dem Coolify-Build gibt es
// kein Git (.dockerignore) – dann bleibt die committete Datei einfach stehen.
import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "content/file-dates.json");
// Im Git-Pfadmuster sind eckige Klammern Zeichenklassen, deshalb maskiert.
// „*" deckt in Git-Pfadmustern auch Verzeichnisse ab, trifft also die Wurzelseite und alle Unterseiten.
const MUSTER = ["app/\\[locale\\]/*page.tsx", "messages/*/*.json", "content/*.ts", "public/products/*.webp"];

function git(...args) {
  const r = spawnSync("git", args, { cwd: ROOT, encoding: "utf8" });
  if (r.error || r.status !== 0) return null;
  return r.stdout;
}

const tracked = git("ls-files", "-z", "--", ...MUSTER);
if (tracked === null) {
  console.log("sitemap-dates: kein Git verfügbar, content/file-dates.json bleibt unverändert.");
  process.exit(0);
}
const files = tracked.split("\0").filter(Boolean).sort();
const geaendert = new Set(
  (git("status", "--porcelain", "-z", "--", ...MUSTER) ?? "")
    .split("\0")
    .filter(Boolean)
    .map((z) => z.slice(3)),
);
const heute = new Date().toISOString().slice(0, 10);

const dates = {};
for (const f of files) {
  if (geaendert.has(f)) {
    dates[f] = heute;
    continue;
  }
  const d = git("log", "-1", "--format=%cs", "--", f)?.trim();
  dates[f] = d || heute;
}

const neu = JSON.stringify(dates, null, 2) + "\n";
const alt = existsSync(OUT) ? readFileSync(OUT, "utf8") : "";
if (neu !== alt) {
  writeFileSync(OUT, neu);
  console.log(`sitemap-dates: ${files.length} Dateien, content/file-dates.json aktualisiert.`);
} else {
  console.log(`sitemap-dates: ${files.length} Dateien, keine Änderung.`);
}
