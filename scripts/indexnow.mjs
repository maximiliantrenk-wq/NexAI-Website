#!/usr/bin/env node
// IndexNow: meldet URLs an Bing, Yandex, Seznam, Naver (alle teilen sich den Endpunkt).
// Google nimmt nicht teil — dort zählen Sitemap + Search Console.
//
// Aufruf:  node scripts/indexnow.mjs                 → alle URLs aus der Live-Sitemap
//          node scripts/indexnow.mjs /de/vertriebspartner /en/vertriebspartner
// Voraussetzung: die Schlüsseldatei public/<key>.txt ist LIVE erreichbar
// (https://nex-a-i.com/<key>.txt), sonst lehnt der Endpunkt mit 403 ab.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "nex-a-i.com";
const BASE = `https://${HOST}`;
const KEY = readFileSync(join(ROOT, "content/indexnow-key.txt"), "utf8").trim();

async function sitemapUrls() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urls = args.length
  ? args.map((u) => (u.startsWith("http") ? u : `${BASE}${u}`))
  : await sitemapUrls();

const keyUrl = `${BASE}/${KEY}.txt`;
const probe = await fetch(keyUrl);
if (!probe.ok || (await probe.text()).trim() !== KEY) {
  console.error(`Schlüsseldatei nicht live: ${keyUrl} (${probe.status}). Erst deployen, dann pingen.`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: keyUrl, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} für ${urls.length} URLs`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
