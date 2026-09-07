#!/usr/bin/env node
// Baut die Produktbilder unter public/products/<slug>.webp (1536×1024, WebP).
//
//   node scripts/produktbilder/build.mjs                 → alle drei
//   node scripts/produktbilder/build.mjs nexai-crm       → nur eines
//   node scripts/produktbilder/build.mjs nexai-crm --png-dir /pfad   → PNG zusätzlich dorthin
//
// Voraussetzung: Google Chrome unter /Applications (headless-Screenshot). Der
// alte Headless-Modus wird benutzt, weil der neue nach dem Screenshot hängen bleibt;
// der Prozess wird nach dem Schreiben der Datei selbst beendet.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, statSync, writeFileSync, copyFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { produkte } from "./inhalte.mjs";
import { rendern, B, H } from "./vorlage.mjs";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const FONT_DIR = join(ROOT, "node_modules/geist/dist/fonts/geist-sans");
const OUT_DIR = join(ROOT, "public/products");

const args = process.argv.slice(2);
const pngDirIdx = args.indexOf("--png-dir");
const pngDir = pngDirIdx >= 0 ? args[pngDirIdx + 1] : null;
const slugs = args.filter((a, i) => !a.startsWith("--") && i !== pngDirIdx + 1);
const auswahl = slugs.length ? slugs : Object.keys(produkte);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function screenshot(html, png) {
  const work = join(tmpdir(), `produktbild-${process.pid}-${Date.now()}`);
  mkdirSync(work, { recursive: true });
  const htmlPath = join(work, "seite.html");
  writeFileSync(htmlPath, html);
  const chrome = spawn(CHROME, [
    "--headless=old", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
    `--window-size=${B},${H}`, "--force-device-scale-factor=1",
    `--user-data-dir=${join(work, "profil")}`, `--screenshot=${png}`, `file://${htmlPath}`,
  ], { stdio: "ignore" });
  // Warten, bis die PNG geschrieben und ihre Größe stabil ist.
  let last = -1, stabil = 0;
  for (let i = 0; i < 200; i++) {
    await sleep(200);
    if (existsSync(png)) {
      const s = statSync(png).size;
      if (s > 0 && s === last) stabil++; else stabil = 0;
      last = s;
      if (stabil >= 3) break;
    }
  }
  chrome.kill("SIGTERM");
  await sleep(300);
  rmSync(work, { recursive: true, force: true });
  if (!existsSync(png)) throw new Error("Chrome hat keine PNG geschrieben");
}

for (const slug of auswahl) {
  const p = produkte[slug];
  if (!p) throw new Error(`Unbekanntes Produkt: ${slug}`);
  const html = rendern(p, { fontDir: FONT_DIR });
  const png = join(tmpdir(), `${slug}.png`);
  await screenshot(html, png);
  const meta = await sharp(png).metadata();
  if (meta.width !== B || meta.height !== H) throw new Error(`${slug}: ${meta.width}×${meta.height} statt ${B}×${H}`);
  mkdirSync(OUT_DIR, { recursive: true });
  const webp = join(OUT_DIR, `${slug}.webp`);
  await sharp(png).webp({ quality: 82 }).toFile(webp);
  const kb = Math.round(statSync(webp).size / 1024);
  if (pngDir) { mkdirSync(pngDir, { recursive: true }); copyFileSync(png, join(pngDir, `${slug}.png`)); writeFileSync(join(pngDir, `${slug}.html`), html); }
  rmSync(png, { force: true });
  console.log(`✓ ${slug}: ${meta.width}×${meta.height}, ${kb} KB → public/products/${slug}.webp`);
}
