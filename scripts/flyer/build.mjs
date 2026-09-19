#!/usr/bin/env node
// Baut den A4-Flyer als PDF und nimmt ihn ab.
//
//   node scripts/flyer/build.mjs                      → PDF nach scripts/flyer/NEXAI-Flyer-A4.pdf
//   node scripts/flyer/build.mjs --out /pfad/x.pdf    → woanders hin
//   node scripts/flyer/build.mjs --bilder /ordner     → zusätzlich Seitenbilder (PDFKit) dorthin
//
// Voraussetzung: Google Chrome unter /Applications. Der alte Headless-Modus wird
// benutzt, weil der neue nach print-to-pdf hängen bleibt.
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { rendern } from "./vorlage.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HIER, "../..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const SANS = join(ROOT, "node_modules/geist/dist/fonts/geist-sans");
const MONO = join(ROOT, "node_modules/geist/dist/fonts/geist-mono");

const args = process.argv.slice(2);
const wert = (flag) => (args.indexOf(flag) >= 0 ? args[args.indexOf(flag) + 1] : null);
const ziel = resolve(wert("--out") ?? join(HIER, "NEXAI-Flyer-A4.pdf"));
const bilderOrdner = wert("--bilder");

const schlaf = (ms) => new Promise((r) => setTimeout(r, ms));

async function drucken(html, pdf) {
  const work = join(tmpdir(), `flyer-${process.pid}-${Date.now()}`);
  mkdirSync(work, { recursive: true });
  const htmlPfad = join(work, "flyer.html");
  writeFileSync(htmlPfad, html);
  rmSync(pdf, { force: true });
  const chrome = spawn(CHROME, [
    "--headless=old", "--disable-gpu", "--no-first-run", "--no-pdf-header-footer",
    `--user-data-dir=${join(work, "profil")}`, `--print-to-pdf=${pdf}`, `file://${htmlPfad}`,
  ], { stdio: "ignore" });
  let letzte = -1, stabil = 0;
  for (let i = 0; i < 250; i++) {
    await schlaf(200);
    if (existsSync(pdf)) {
      const s = statSync(pdf).size;
      if (s > 0 && s === letzte) stabil++; else stabil = 0;
      letzte = s;
      if (stabil >= 3) break;
    }
  }
  chrome.kill("SIGTERM");
  await schlaf(300);
  rmSync(work, { recursive: true, force: true });
  if (!existsSync(pdf)) throw new Error("Chrome hat keine PDF geschrieben");
  return { html: htmlPfad };
}

/** Abnahme direkt am PDF. Wirft, wenn etwas nicht stimmt. */
function abnehmen(pdf) {
  const roh = readFileSync(pdf, "latin1");
  const fehler = [];

  const seiten = roh.match(/\/Count (\d+)/)?.[1];
  if (seiten !== "2") fehler.push(`Seitenzahl ist ${seiten ?? "unbekannt"}, erwartet 2`);

  // Der Fehler vom 19.09.2026: Verlaufstext wird als Alpha-Weichmaske exportiert,
  // PDFKit ignoriert sie und malt einen Volltonbalken über den Text.
  const alpha = (roh.match(/\/S\s*\/Alpha/g) ?? []).length;
  if (alpha > 0) fehler.push(`${alpha} Alpha-Weichmaske(n) im PDF. Apple-Viewer malen darüber einen Vollton-Balken. Ursache ist fast immer background-clip:text oder mix-blend-mode.`);

  const links = (roh.match(/\/URI/g) ?? []).length;
  if (links < 3) fehler.push(`nur ${links} klickbare Links, erwartet mindestens 3 (Telefon, E-Mail, Web)`);

  if (fehler.length) {
    throw new Error("Abnahme fehlgeschlagen:\n  - " + fehler.join("\n  - "));
  }
  return { seiten, links };
}

const html = rendern({ schriftSans: SANS, schriftMono: MONO });
mkdirSync(dirname(ziel), { recursive: true });
await drucken(html, ziel);
const { seiten, links } = abnehmen(ziel);
const kb = Math.round(statSync(ziel).size / 1024);
console.log(`✓ ${ziel}`);
console.log(`  ${seiten} Seiten, ${links} Links, ${kb} KB, keine Alpha-Weichmasken`);

if (bilderOrdner) {
  console.log("Seitenbilder (PDFKit, Apples Renderer):");
  const r = spawnSync("swift", [join(HIER, "pruefen.swift"), ziel, resolve(bilderOrdner)], { stdio: "inherit" });
  if (r.status !== 0) throw new Error("pruefen.swift fehlgeschlagen");
}
