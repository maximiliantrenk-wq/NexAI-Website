// Bringt alle Sprachdateien auf ein einheitliches Format (2 Leerzeichen, Zeilenumbruch
// am Dateiende) — dasselbe Format, das der Texteditor unter /admin beim Speichern
// schreibt. Ohne diesen einmaligen Durchlauf erzeugt die erste Änderung über die
// Oberfläche einen riesigen Diff aus reinen Formatierungszeilen.
//
// Aufruf: node scripts/messages-format.mjs [--pruefen]

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../messages/", import.meta.url).pathname;
const nurPruefen = process.argv.includes("--pruefen");

let geaendert = 0;
for (const locale of readdirSync(ROOT)) {
  const dir = join(ROOT, locale);
  if (!statSync(dir).isDirectory()) continue;
  for (const datei of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const pfad = join(dir, datei);
    const roh = readFileSync(pfad, "utf8");
    const kanonisch = JSON.stringify(JSON.parse(roh), null, 2) + "\n";
    if (kanonisch === roh) continue;
    geaendert++;
    console.log(`${nurPruefen ? "weicht ab" : "formatiert"}: messages/${locale}/${datei}`);
    if (!nurPruefen) writeFileSync(pfad, kanonisch, "utf8");
  }
}

if (nurPruefen && geaendert > 0) process.exit(1);
console.log(geaendert === 0 ? "Alle Dateien sind einheitlich formatiert." : `${geaendert} Dateien.`);
