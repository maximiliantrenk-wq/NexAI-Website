// Vorlage für den A4-Flyer (2 Seiten), reines HTML/CSS, wird headless gedruckt.
// Farben und Schrift sind die Tokens aus app/globals.css.
//
// HARTE REGEL: nirgends `background-clip: text` (Verlaufstext). Chrome druckt es
// als Alpha-Weichmaske, und Apples PDFKit (Vorschau, iOS, WhatsApp) ignoriert die
// Maske und malt einen Volltonbalken ÜBER den Text. Akzente deshalb als Vollton.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { icon } from "../produktbilder/icons.mjs";
import { marke, seite1, seite2 } from "./inhalte.mjs";

const HIER = dirname(fileURLToPath(import.meta.url));

const C = {
  bg: "#08090d",
  flaeche: "#0e0f16",
  karte: "#0d0e14",
  fg: "#f4f5fa",
  muted: "#a2a6b8",
  subtle: "#6c7080",
  linie: "#ffffff12",
  linieStark: "#ffffff24",
  blau: "#4d7cff",
  blauHell: "#6f97ff",
  violett: "#8b5cf6",
  purpur: "#a855f7",
};

/** Die NEXAI-Wortmarke mit dem N-Zeichen (aus components/brand/logo.tsx). */
function logo(id, groesse = 30) {
  return `<span class="logo">
    <svg viewBox="0 0 96 96" width="${groesse}" height="${groesse}" fill="none">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${C.blau}"/><stop offset="1" stop-color="${C.purpur}"/>
      </linearGradient></defs>
      <g stroke="${C.fg}" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M31 71V27l34 44"/><path d="M65 71V34"/><path d="M38 47l18 22"/>
      </g>
      <circle cx="65" cy="26" r="6.5" fill="url(#${id})"/>
    </svg>
    <span class="wortmarke">NEX<span class="wm-ai">AI</span></span>
  </span>`;
}

function kachel(name) {
  return `<span class="kachel">${icon(name, { size: 22, stroke: "#ffffff", width: 1.9 })}</span>`;
}

/** Platinen-Band: Leiterbahnen von beiden Rändern auf einen Chip in der Mitte. */
function platine(b = 666, h = 128) {
  const mx = b / 2;
  const my = h / 2;
  const chip = 74;
  const randAbstand = chip / 2 + 22;
  let bahnen = "";
  let punkte = "";
  const stufen = [0.14, 0.31, 0.5, 0.69, 0.86];
  stufen.forEach((t, i) => {
    const y = Math.round(h * t);
    const ziel = Math.round(my + (y - my) * 0.16);
    const knick = 118 + i * 22;
    bahnen += `<path d="M6 ${y} H${knick} L${knick + 26} ${ziel} H${mx - randAbstand}"/>`;
    bahnen += `<path d="M${b - 6} ${y} H${b - knick} L${b - knick - 26} ${ziel} H${mx + randAbstand}"/>`;
    punkte += `<circle cx="6" cy="${y}" r="2.8"/><circle cx="${b - 6}" cy="${y}" r="2.8"/>`;
  });
  let pins = "";
  for (let i = 0; i < 7; i++) {
    const x = Math.round(mx - chip / 2 + 9 + i * ((chip - 18) / 6));
    pins += `<path d="M${x} ${my - chip / 2} V${my - chip / 2 - 12}"/>`;
    pins += `<path d="M${x} ${my + chip / 2} V${my + chip / 2 + 12}"/>`;
  }
  return `<svg class="platine" viewBox="0 0 ${b} ${h}" width="${b}" height="${h}" fill="none">
    <g stroke="${C.violett}" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round" fill="none" opacity="0.45">${bahnen}</g>
    <g fill="${C.violett}" stroke="none" opacity="0.6">${punkte}</g>
    <g stroke="${C.violett}" stroke-width="1.4" stroke-linecap="round" fill="none" opacity="0.5">${pins}</g>
    <rect x="${mx - chip / 2}" y="${my - chip / 2}" width="${chip}" height="${chip}" rx="16"
          stroke="${C.purpur}" stroke-width="1.6" opacity="0.8" fill="${C.bg}"/>
    <rect x="${mx - chip / 2 + 13}" y="${my - chip / 2 + 13}" width="${chip - 26}" height="${chip - 26}" rx="9"
          stroke="${C.violett}" stroke-width="1.1" opacity="0.5" fill="none"/>
    <g transform="translate(${mx - 17} ${my - 17}) scale(0.355)" fill="none">
      <g stroke="${C.blauHell}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
        <path d="M31 71V27l34 44"/><path d="M65 71V34"/><path d="M38 47l18 22"/>
      </g>
      <circle cx="65" cy="26" r="6.5" fill="${C.purpur}" stroke="none"/>
    </g>
  </svg>`;
}

function qr() {
  const svg = readFileSync(join(HIER, "qr-nex-a-i.svg"), "utf8");
  return svg.replace("<svg ", '<svg class="qr" width="122" height="122" ');
}

function css(schriftSans, schriftMono) {
  return `
@font-face{font-family:Geist;src:url("file://${schriftSans}/Geist-Regular.woff2") format("woff2");font-weight:400}
@font-face{font-family:Geist;src:url("file://${schriftSans}/Geist-Medium.woff2") format("woff2");font-weight:500}
@font-face{font-family:Geist;src:url("file://${schriftSans}/Geist-SemiBold.woff2") format("woff2");font-weight:600}
@font-face{font-family:Geist;src:url("file://${schriftSans}/Geist-Bold.woff2") format("woff2");font-weight:700}
@font-face{font-family:GeistMono;src:url("file://${schriftMono}/GeistMono-Medium.woff2") format("woff2");font-weight:500}

@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{background:${C.bg};-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Geist,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}

.seite{position:relative;width:210mm;height:297mm;overflow:hidden;background:${C.bg};
  color:${C.fg};padding:64px;display:flex;flex-direction:column;break-after:page}
.seite:last-of-type{break-after:auto}
.glanz{position:absolute;inset:0;pointer-events:none;
  background:
    radial-gradient(760px 520px at 8% 6%, rgba(77,124,255,.17), transparent 62%),
    radial-gradient(680px 620px at 104% 40%, rgba(168,85,247,.15), transparent 60%),
    radial-gradient(520px 420px at 50% 108%, rgba(77,124,255,.10), transparent 64%);}
.raster{position:absolute;inset:0;pointer-events:none;opacity:.5;
  background-image:radial-gradient(${C.linie} 1px, transparent 1px);background-size:26px 26px}
.inhalt{position:relative;display:flex;flex-direction:column;flex:1}

.kopf{display:flex;align-items:center;justify-content:space-between}
.logo{display:inline-flex;align-items:center;gap:10px}
.wortmarke{font-size:20px;font-weight:600;letter-spacing:-.02em}
.wm-ai{color:${C.blauHell}}
.pill{border:1px solid ${C.linieStark};border-radius:999px;padding:9px 18px;
  font-size:13.5px;color:${C.muted};background:rgba(255,255,255,.02)}

.titel{margin-top:74px;font-size:76px;line-height:1.045;font-weight:700;letter-spacing:-.035em}
.titel .akzent{color:${C.blauHell}}
.subline{margin-top:32px;max-width:592px;font-size:20px;line-height:1.55;color:${C.muted}}

.karten{margin-top:46px;margin-bottom:26px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.karte{background:${C.karte};border:1px solid ${C.linie};border-radius:16px;padding:21px}
.kachel{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;
  border-radius:13px;background:linear-gradient(140deg,${C.blau},${C.violett})}
.karte h3{margin-top:18px;font-size:21px;font-weight:600;letter-spacing:-.02em}
.karte p{margin-top:9px;font-size:14.5px;line-height:1.5;color:${C.muted}}

.cta{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:28px;
  padding:30px 32px;border-radius:20px;
  background:linear-gradient(${C.karte},${C.karte}) padding-box,
             linear-gradient(100deg,${C.blau},${C.purpur}) border-box;
  border:1.5px solid transparent}
.eyebrow{font-size:12.5px;font-weight:600;letter-spacing:.14em;color:${C.blauHell}}
.cta h3{margin-top:11px;font-size:25px;font-weight:600;letter-spacing:-.02em}
.cta-tel{margin-top:13px;font-size:34px;font-weight:700;letter-spacing:-.02em;color:${C.fg}}
.cta p{margin-top:9px;font-size:14px;line-height:1.5;color:${C.muted};max-width:360px}
.qr-block{text-align:center;flex-shrink:0}
.qr{display:block;border-radius:8px;background:#fff;padding:9px;width:122px;height:122px}
.qr-hinweis{margin-top:9px;font-size:12px;color:${C.subtle}}
.qr-web{margin-top:3px;font-family:GeistMono,monospace;font-size:12.5px;color:${C.muted}}

.kopf2{display:flex;align-items:flex-start;justify-content:space-between}
.titel2{font-size:46px;font-weight:700;letter-spacing:-.035em;line-height:1}
.titel2 .akzent2{color:${C.purpur}}
.bausteine{margin-top:34px;display:grid;grid-template-columns:1fr 1fr;gap:24px 30px}
.baustein{display:grid;grid-template-columns:44px 1fr;gap:15px;align-items:start}
.baustein h3{font-size:17px;font-weight:600;letter-spacing:-.015em;padding-top:3px}
.baustein p{margin-top:6px;font-size:14px;line-height:1.5;color:${C.muted}}
.breit{margin-top:6px;grid-column:1 / -1}

.kennzahlen{margin-top:26px;padding-top:22px;border-top:1px solid ${C.linie};
  display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.kz-wert{font-size:29px;font-weight:700;letter-spacing:-.03em}
.kz-label{margin-top:4px;font-size:13.5px;color:${C.muted}}
.kz-hinweis{margin-top:13px;font-size:13px;color:${C.muted}}

.platine{display:block;margin:14px auto 0}

.cta2{margin-top:auto;display:block;padding:26px 30px}
.cta2 h3{margin-top:10px;font-size:23px}
.cta2 p{margin-top:8px;max-width:none;font-size:14px}
.kontakt{margin-top:18px;padding-top:16px;border-top:1px solid ${C.linie};
  display:flex;align-items:center;gap:26px;flex-wrap:wrap}
.kontakt a,.kontakt span{display:inline-flex;align-items:center;gap:9px;font-size:15px;font-weight:500}
.kontakt svg{flex-shrink:0}

.fuss{margin-top:18px;font-size:11.5px;color:${C.subtle};text-align:center}
`;
}

export function rendern({ schriftSans, schriftMono }) {
  const s1 = seite1;
  const s2 = seite2;

  const titelZeilen = s1.titel
    .map((z, i) => (i === s1.akzentZeile ? `<span class="akzent">${z}</span>` : z))
    .join("<br>");

  const karten = s1.karten
    .map((k) => `<div class="karte">${kachel(k.icon)}<h3>${k.titel}</h3><p>${k.text}</p></div>`)
    .join("");

  const bausteine = s2.bausteine
    .map((b) => `<div class="baustein">${kachel(b.icon)}<div><h3>${b.titel}</h3><p>${b.text}</p></div></div>`)
    .join("");

  const datenschutz = `<div class="baustein breit">${kachel(s2.datenschutz.icon)}
    <div><h3>${s2.datenschutz.titel}</h3><p>${s2.datenschutz.text}</p></div></div>`;

  const kennzahlen = s2.kennzahlen
    .map((k) => `<div><div class="kz-wert">${k.wert}</div><div class="kz-label">${k.label}</div></div>`)
    .join("");

  const kontaktIcon = (n) => icon(n, { size: 17, stroke: C.blauHell, width: 1.9 });

  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
<title>NEXAI Flyer</title><style>${css(schriftSans, schriftMono)}</style></head><body>

<section class="seite">
  <div class="glanz"></div><div class="raster"></div>
  <div class="inhalt">
    <header class="kopf">${logo("punkt-a")}<span class="pill">${marke.pill}</span></header>
    <h1 class="titel">${titelZeilen}</h1>
    <p class="subline">${s1.subline}</p>
    <div class="karten">${karten}</div>
    <div class="cta">
      <div>
        <div class="eyebrow">${s1.cta.eyebrow}</div>
        <h3>${s1.cta.titel}</h3>
        <a class="cta-tel" href="${marke.demoLink}">${marke.demoAnzeige}</a>
        <p>${s1.cta.text}</p>
      </div>
      <a class="qr-block" href="${marke.webUrl}">
        ${qr()}
        <div class="qr-hinweis">${s1.cta.qrHinweis}</div>
        <div class="qr-web">${marke.web}</div>
      </a>
    </div>
  </div>
</section>

<section class="seite">
  <div class="glanz"></div><div class="raster"></div>
  <div class="inhalt">
    <header class="kopf2">
      <h2 class="titel2">${s2.titelVorn}<span class="akzent2">${s2.titelAkzent}</span>${s2.titelHinten}</h2>
      ${logo("punkt-b", 26)}
    </header>
    <div class="bausteine">${bausteine}${datenschutz}</div>
    <div class="kennzahlen">${kennzahlen}</div>
    <div class="kz-hinweis">${s2.kennzahlenHinweis}</div>
    ${platine()}
    <div class="cta cta2">
      <div class="eyebrow">${s2.cta.eyebrow}</div>
      <h3>${s2.cta.titel}</h3>
      <p>${s2.cta.text}</p>
      <div class="kontakt">
        <a href="${marke.mobilLink}">${kontaktIcon("phone")}${marke.mobilAnzeige}</a>
        <a href="${marke.mailLink}">${kontaktIcon("mail")}${marke.mailAnzeige}</a>
        <a href="${marke.webUrl}">${kontaktIcon("globe")}${marke.web}</a>
      </div>
    </div>
    <div class="fuss">${marke.fusszeile}</div>
  </div>
</section>

</body></html>`;
}
