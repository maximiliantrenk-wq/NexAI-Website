// Vorlage für die Produktbilder (1536×1024, 3:2) im Stil der drei ersten Renders:
// Glaspanel links (Marke, Produktname, Tagline, Feature-Liste), leuchtendes Objekt
// auf einem Podium in der Mitte, Mock-Oberfläche des Produkts rechts, gepunktete
// Wellenfläche unten, Badge unten rechts. Reines HTML/CSS, wird headless gerendert.
import { icon } from "./icons.mjs";

export const B = 1536;
export const H = 1024;

const GRAD_DEFS = `<defs><linearGradient id="ng" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b8cff"/><stop offset="0.55" stop-color="#8b5cf6"/><stop offset="1" stop-color="#c084fc"/></linearGradient></defs>`;

/** Kreis mit Icon (Feature-Zeile links, Kopfzeile rechts) */
export function kreis(name, size = 56, iconSize = 26) {
  return `<span class="kreis" style="width:${size}px;height:${size}px">${icon(name, { size: iconSize, stroke: "#c4a6ff", width: 1.8 })}</span>`;
}

export function chip(text, art = "") {
  return `<span class="chip ${art}">${text}</span>`;
}

/** Gepunktete Wellenfläche am unteren Rand (perspektivisch nach hinten dichter). */
function wellen() {
  const zeilen = 19;
  let dots = "";
  for (let i = 0; i < zeilen; i++) {
    const tiefe = i / (zeilen - 1); // 0 = hinten, 1 = vorn
    const y0 = 745 + 9 * i + 0.62 * i * i;
    const amp = 9 + 22 * tiefe;
    const dx = 9 + 6 * tiefe;
    const r = 1.1 + 2.1 * tiefe;
    const op = 0.16 + 0.7 * tiefe;
    for (let x = -10; x <= B + 10; x += dx) {
      const y = y0 + amp * Math.sin(x / 150 + i * 0.32) + 0.45 * amp * Math.sin(x / 63 - i * 0.55) + 0.25 * amp * Math.sin(x / 29 + i);
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" opacity="${op.toFixed(2)}"/>`;
    }
  }
  return `<svg class="wellen" viewBox="0 0 ${B} ${H}" width="${B}" height="${H}">
    <defs>
      <linearGradient id="wg" x1="0" x2="1"><stop offset="0" stop-color="#4d7cff"/><stop offset="0.5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#c084fc"/></linearGradient>
      <linearGradient id="wf" x1="0" y1="0" x2="0" y2="1"><stop offset="0.70" stop-color="#fff" stop-opacity="0"/><stop offset="0.80" stop-color="#fff" stop-opacity="0.6"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient>
      <mask id="wm"><rect width="${B}" height="${H}" fill="url(#wf)"/></mask>
    </defs>
    <g fill="url(#wg)" mask="url(#wm)">${dots}</g>
  </svg>`;
}

/** Ein paar verstreute Lichtpunkte (deterministisch). */
function partikel() {
  let s = 7, out = "";
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 46; i++) {
    const x = rnd() * B, y = 40 + rnd() * 700, r = 1 + rnd() * 2.2, o = 0.15 + rnd() * 0.5;
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#b794ff" opacity="${o.toFixed(2)}"/>`;
  }
  return `<svg class="partikel" viewBox="0 0 ${B} ${H}" width="${B}" height="${H}">${out}</svg>`;
}

function css(fontDir) {
  return `
@font-face{font-family:Geist;src:url("file://${fontDir}/Geist-Regular.woff2") format("woff2");font-weight:400}
@font-face{font-family:Geist;src:url("file://${fontDir}/Geist-Medium.woff2") format("woff2");font-weight:500}
@font-face{font-family:Geist;src:url("file://${fontDir}/Geist-SemiBold.woff2") format("woff2");font-weight:600}
@font-face{font-family:Geist;src:url("file://${fontDir}/Geist-Bold.woff2") format("woff2");font-weight:700}
*{box-sizing:border-box}
html,body{margin:0;width:${B}px;height:${H}px;overflow:hidden;background:#05030d;font-family:Geist,system-ui,sans-serif;color:#fff;-webkit-font-smoothing:antialiased}
.buehne{position:relative;width:${B}px;height:${H}px;overflow:hidden;
  background:
    radial-gradient(38% 34% at 50% 44%, rgba(96,50,190,.42), transparent 72%),
    radial-gradient(70% 45% at 50% 105%, rgba(60,30,130,.55), transparent 65%),
    radial-gradient(60% 60% at 8% 50%, rgba(50,25,110,.25), transparent 70%),
    radial-gradient(60% 60% at 92% 50%, rgba(50,25,110,.25), transparent 70%),
    #05030d}
.ring{position:absolute;left:50%;top:445px;border-radius:50%;border:1px solid rgba(160,110,255,.13);transform:translate(-50%,-50%)}
.wellen,.partikel{position:absolute;left:0;top:0;pointer-events:none}

.panel{position:absolute;border-radius:32px;border:1px solid rgba(160,110,255,.62);
  background:linear-gradient(165deg, rgba(44,22,84,.62) 0%, rgba(14,8,32,.78) 55%, rgba(10,6,24,.86) 100%);
  box-shadow:0 0 44px rgba(120,70,255,.22), 0 0 2px rgba(190,150,255,.6), inset 0 0 70px rgba(120,70,255,.10), inset 0 1px 0 rgba(255,255,255,.10)}
.links{left:36px;top:46px;width:448px;height:838px;padding:44px 40px 30px;transform:perspective(1700px) rotateY(9deg);transform-origin:left center}
.rechts{left:928px;top:46px;width:568px;height:838px;padding:28px 30px 28px;transform:perspective(1700px) rotateY(-8deg);transform-origin:right center;display:flex;flex-direction:column}

.marke{font-size:66px;font-weight:600;letter-spacing:-.025em;line-height:1;display:flex;align-items:center;gap:16px}
.marke .ai{background:linear-gradient(90deg,#7c6cff,#b46bff);-webkit-background-clip:text;background-clip:text;color:transparent}
.produkt{font-size:46px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;margin-top:10px;line-height:1.05}
.tagline{font-size:23px;font-weight:400;color:rgba(255,255,255,.9);line-height:1.4;margin-top:18px}
.linie{height:1px;background:linear-gradient(90deg,rgba(170,120,255,.75),rgba(170,120,255,.05));margin:30px 0 6px}
.zeile{display:flex;gap:18px;align-items:center;padding:17px 0;border-bottom:1px solid rgba(160,110,255,.16)}
.zeile:last-child{border-bottom:0}
.kreis{flex:none;border-radius:50%;border:1.5px solid rgba(170,120,255,.85);display:grid;place-items:center;
  background:radial-gradient(circle at 50% 40%, rgba(120,70,255,.28), rgba(30,15,60,.5));
  box-shadow:0 0 18px rgba(140,90,255,.38), inset 0 0 12px rgba(140,90,255,.25)}
.zt{font-size:16.5px;font-weight:700;letter-spacing:.045em;text-transform:uppercase}
.zd{font-size:15px;color:rgba(255,255,255,.74);line-height:1.34;margin-top:3px}

/* Mitte */
.objekt{position:absolute;left:${B / 2 - 150}px;top:262px;width:300px;height:300px}
.objekt .rueck{position:absolute;inset:0;transform:translate(-26px,-24px);border-radius:58px;
  background:linear-gradient(135deg,rgba(124,92,255,.32),rgba(168,85,247,.06));border:2px solid rgba(140,100,255,.55)}
.objekt .front{position:absolute;inset:0;border-radius:58px;background:linear-gradient(160deg,#1b1236 0%,#0d0820 60%,#080516 100%);
  box-shadow:0 0 0 2.5px rgba(130,110,255,.95),0 0 38px rgba(124,92,255,.85),0 0 120px rgba(139,92,246,.5),inset 0 0 44px rgba(124,92,255,.28),inset 0 2px 0 rgba(255,255,255,.12)}
.objekt .ikon{position:absolute;inset:0;display:grid;place-items:center;filter:drop-shadow(0 0 14px rgba(150,110,255,.9))}
.reflex{position:absolute;left:${B / 2 - 210}px;top:610px;width:420px;height:150px;border-radius:50%;background:radial-gradient(closest-side,rgba(124,92,255,.38),transparent 75%)}
.puck{position:absolute;left:${B / 2 - 250}px;width:500px;border-radius:50%}
.puck.unten{top:748px;height:136px;background:#07050f;box-shadow:0 0 0 2px rgba(168,85,247,.75),0 0 26px rgba(168,85,247,.55),0 40px 70px rgba(0,0,0,.85)}
.puck.seite{top:771px;height:46px;border-radius:0;background:linear-gradient(180deg,#100b20,#06040e);box-shadow:-2px 0 0 rgba(140,100,255,.35),2px 0 0 rgba(140,100,255,.35)}
.boden{position:absolute;left:${B / 2 - 330}px;top:760px;width:660px;height:200px;border-radius:50%;background:radial-gradient(closest-side,rgba(124,92,255,.30),transparent 78%)}
.puck.oben{top:706px;height:130px;background:radial-gradient(60% 60% at 50% 42%,#1c1434,#09061a 72%);
  box-shadow:0 0 0 3px rgba(77,124,255,.85),0 0 30px rgba(77,124,255,.55),inset 0 0 40px rgba(77,124,255,.18)}
.puck.innen{left:${B / 2 - 190}px;top:722px;width:380px;height:98px;background:transparent;border:2px solid rgba(168,85,247,.8);box-shadow:0 0 18px rgba(168,85,247,.55),inset 0 0 22px rgba(168,85,247,.22)}

/* Rechts: Mock-Oberfläche */
.kopf{display:flex;align-items:center;gap:14px;padding-bottom:16px;border-bottom:1px solid rgba(160,110,255,.22)}
.kt{font-size:22px;font-weight:600;letter-spacing:-.01em}
.ks{font-size:14px;color:rgba(255,255,255,.62);margin-top:2px}
.pill{margin-left:auto;font-size:14px;font-weight:500;padding:7px 13px;border-radius:999px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;gap:8px;white-space:nowrap}
.dot{width:9px;height:9px;border-radius:50%;background:#34d399;box-shadow:0 0 10px #34d399}
.chip{font-size:12.5px;font-weight:500;padding:5px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);white-space:nowrap}
.chip.ok{color:#a7f3d0;border-color:rgba(52,211,153,.4);background:rgba(52,211,153,.12)}
.chip.lila{color:#e2d2ff;border-color:rgba(168,85,247,.5);background:rgba(139,92,246,.22)}
.chip.blau{color:#cfe0ff;border-color:rgba(77,124,255,.5);background:rgba(77,124,255,.2)}
.karte{margin-top:18px;border-radius:18px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);padding:16px 18px}
.karte.flex{display:flex;gap:14px;align-items:center}
.avatar{flex:none;width:50px;height:50px;border-radius:50%;display:grid;place-items:center;font-weight:600;font-size:17px;background:linear-gradient(135deg,#5b8cff,#a855f7);box-shadow:0 0 16px rgba(139,92,246,.5)}
.kn{font-size:18px;font-weight:600}
.kk{font-size:14px;color:rgba(255,255,255,.62);margin-top:3px}
.ereignis{display:flex;gap:14px;align-items:flex-start;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.07)}
.ereignis:last-child{border-bottom:0}
.et{font-size:16px;font-weight:600}
.ed{font-size:14px;color:rgba(255,255,255,.64);margin-top:3px;line-height:1.3}
.er{margin-left:auto;text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:7px;flex:none}
.ez{font-size:12.5px;color:rgba(255,255,255,.5)}
.abschnitt{font-size:12.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:18px 0 2px}
.stats{margin-top:auto;display:flex;gap:12px}
.stat{flex:1;border-radius:14px;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);padding:12px 14px}
.sl{font-size:12.5px;color:rgba(255,255,255,.58);line-height:1.2}
.sv{font-size:24px;font-weight:600;margin-top:4px;background:linear-gradient(90deg,#8fb0ff,#c084fc);-webkit-background-clip:text;background-clip:text;color:transparent}

/* Kalender-Mock */
.woche{margin-top:16px;display:grid;grid-template-columns:44px repeat(5,1fr);gap:4px}
.wtag{font-size:12.5px;font-weight:600;text-align:center;color:rgba(255,255,255,.7);padding:4px 0 6px}
.wtag.heute{color:#fff}
.wtag.heute span{background:linear-gradient(135deg,#5b8cff,#a855f7);border-radius:999px;padding:2px 8px}
.wzeit{font-size:11.5px;color:rgba(255,255,255,.45);text-align:right;padding-right:6px;height:40px;line-height:40px}
.wz{height:40px;border-radius:8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);position:relative;overflow:hidden}
.termin{position:absolute;inset:2px;border-radius:7px;padding:4px 7px;font-size:11.5px;font-weight:500;line-height:1.15;border:1px solid}
.termin.a{background:rgba(139,92,246,.35);border-color:rgba(168,85,247,.7)}
.termin.b{background:rgba(77,124,255,.32);border-color:rgba(120,160,255,.7)}
.termin.c{background:rgba(236,72,153,.28);border-color:rgba(244,114,182,.65)}
.termin.frei{background:rgba(52,211,153,.10);border:1px dashed rgba(52,211,153,.5);color:#a7f3d0}
.seg{display:flex;gap:6px;margin-top:12px}
.seg span{flex:1;text-align:center;font-size:13px;padding:7px 0;border-radius:999px;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.7)}
.seg span.an{background:linear-gradient(135deg,#5b8cff,#a855f7);color:#fff;border-color:transparent;font-weight:600}
.slots{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.slots span{font-size:14px;padding:8px 13px;border-radius:10px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05)}
.slots span.an{border-color:rgba(168,85,247,.9);background:rgba(139,92,246,.3);box-shadow:0 0 14px rgba(139,92,246,.45);font-weight:600}
.toast{margin-top:14px;display:flex;align-items:center;gap:12px;border-radius:14px;padding:12px 16px;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.4);font-size:15px;font-weight:500}

/* App-Mock */
.appwrap{position:relative;flex:1;margin-top:16px}
.phone{position:absolute;left:14px;top:6px;width:292px;height:600px;border-radius:44px;background:#07050f;border:3px solid rgba(160,130,255,.6);
  box-shadow:0 0 0 6px #0c0a18,0 0 40px rgba(124,92,255,.45),0 30px 60px rgba(0,0,0,.7);padding:14px 12px;overflow:hidden}
.notch{width:110px;height:26px;border-radius:999px;background:#000;margin:0 auto 10px}
.pkopf{display:flex;align-items:center;gap:10px;padding:8px 6px 12px}
.plogo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#5b8cff,#a855f7);display:grid;place-items:center;font-weight:700;font-size:16px}
.pt{font-size:16px;font-weight:600}
.ps{font-size:11.5px;color:rgba(255,255,255,.55)}
.pkarte{border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);padding:11px 12px;margin:0 4px 8px;display:flex;align-items:center;gap:10px}
.pkarte .pi{width:32px;height:32px;border-radius:9px;display:grid;place-items:center;background:rgba(139,92,246,.25);border:1px solid rgba(168,85,247,.45);flex:none}
.pkarte .pn{font-size:13.5px;font-weight:600}
.pkarte .pd{font-size:11.5px;color:rgba(255,255,255,.58);margin-top:2px}
.pkarte .pb{margin-left:auto;font-size:11px;font-weight:600;padding:3px 8px;border-radius:999px;background:linear-gradient(135deg,#5b8cff,#a855f7)}
.tabs{position:absolute;left:12px;right:12px;bottom:12px;display:flex;justify-content:space-around;padding:10px 0;border-radius:18px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}
.tabs span{font-size:10.5px;color:rgba(255,255,255,.55);display:flex;flex-direction:column;align-items:center;gap:3px}
.tabs span.an{color:#c4a6ff}
.push{position:absolute;left:236px;width:290px;border-radius:16px;padding:12px 14px;background:rgba(20,12,44,.92);border:1px solid rgba(170,120,255,.55);box-shadow:0 0 30px rgba(124,92,255,.35),0 20px 40px rgba(0,0,0,.6);display:flex;gap:11px;align-items:flex-start}
.push .pi{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#5b8cff,#a855f7);display:grid;place-items:center;flex:none}
.push .pn{font-size:14px;font-weight:600}
.push .pd{font-size:12.5px;color:rgba(255,255,255,.66);margin-top:2px;line-height:1.3}
.push .pz{font-size:11px;color:rgba(255,255,255,.45);margin-left:auto;flex:none}

/* Badge */
.badge{position:absolute;right:38px;bottom:38px;height:68px;padding:0 30px 0 24px;border-radius:999px;border:1.5px solid rgba(255,255,255,.85);background:rgba(10,6,24,.72);display:flex;align-items:center;gap:14px;font-size:26px;font-weight:500;letter-spacing:-.01em;box-shadow:0 0 30px rgba(120,70,255,.28),inset 0 0 20px rgba(120,70,255,.15)}
`;
}

export function rendern(p, { fontDir }) {
  const features = p.features
    .map((f) => `<div class="zeile">${kreis(f.icon)}<div><div class="zt">${f.titel}</div><div class="zd">${f.text}</div></div></div>`)
    .join("");
  const ringe = [360, 580, 800, 1020].map((d) => `<div class="ring" style="width:${d}px;height:${d}px"></div>`).join("");
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${css(fontDir)}</style></head><body>
<div class="buehne">
  ${ringe}
  ${partikel()}
  ${wellen()}
  <div class="reflex"></div><div class="boden"></div>
  <div class="puck unten"></div><div class="puck seite"></div><div class="puck oben"></div><div class="puck innen"></div>
  <div class="objekt"><div class="rueck"></div><div class="front"></div><div class="ikon">${icon(p.objektIcon, { size: 168, stroke: "url(#ng)", width: 1.9, defs: GRAD_DEFS })}</div></div>
  <div class="panel links">
    <div class="marke">${icon(p.markeIcon, { size: 44, stroke: "#b794ff", width: 2 })}<span>Nex <span class="ai">Ai</span></span></div>
    <div class="produkt">${p.name}</div>
    <div class="tagline">${p.tagline[0]}<br>${p.tagline[1]}</div>
    <div class="linie"></div>
    ${features}
  </div>
  <div class="panel rechts">${p.rechts}</div>
  <div class="badge">${icon("heart", { size: 30, stroke: "#c4a6ff", width: 2 })}<span>Mit KI und Liebe generiert</span></div>
</div>
</body></html>`;
}
