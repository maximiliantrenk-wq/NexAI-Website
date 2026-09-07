// Inhalte der drei Produktbilder. Texte sind Bildinhalt (Mock-Oberflächen mit
// Beispielnamen), keine Website-Copy. Keine Prozent-Versprechen, keine echten Kunden.
import { icon } from "./icons.mjs";
import { kreis, chip } from "./vorlage.mjs";

const kopf = (ikon, titel, sub, status = "Aktiv") =>
  `<div class="kopf">${kreis(ikon, 46, 22)}<div><div class="kt">${titel}</div><div class="ks">${sub}</div></div><span class="pill"><i class="dot"></i>${status}</span></div>`;

const ereignis = (ikon, titel, text, zeit, c) =>
  `<div class="ereignis">${kreis(ikon, 40, 19)}<div><div class="et">${titel}</div><div class="ed">${text}</div></div><div class="er">${c}<span class="ez">${zeit}</span></div></div>`;

const stat = (label, wert) => `<div class="stat"><div class="sl">${label}</div><div class="sv">${wert}</div></div>`;

export const produkte = {
  "nexai-crm": {
    name: "CRM",
    markeIcon: "contact",
    objektIcon: "contact",
    tagline: ["Alle Kunden. Ein System.", "Volle Übersicht."],
    features: [
      { icon: "users", titel: "Alles an einem Ort", text: "Kontakte, Firmen, Anfragen und Termine." },
      { icon: "phone-incoming", titel: "Automatisch gefüllt", text: "Anrufe und Website-Anfragen landen von selbst im CRM." },
      { icon: "bell", titel: "Aufgaben & Erinnerungen", text: "Kein Rückruf geht mehr unter." },
      { icon: "chart-column", titel: "Berichte auf Knopfdruck", text: "Was diese Woche passiert ist, als Tabelle oder PDF." },
      { icon: "shield-check", titel: "Datenschutz eingebaut", text: "Läuft auf Servern in Deutschland." },
    ],
    rechts:
      kopf("contact", "NexAI CRM", "Autohaus Beispiel · Kontakt") +
      `<div class="karte flex"><div class="avatar">MK</div><div><div class="kn">Markus Keller</div><div class="kk">Interessent · Anfrage über Voice Agent · 0170 000 00 00</div></div><span class="chip lila" style="margin-left:auto">Phase: Angebot</span></div>` +
      `<div class="abschnitt">Zeitleiste</div>` +
      ereignis("phone-call", "Anruf vom Voice Agent", "Gesprächsprotokoll gespeichert, Kontakt angelegt", "10:30", chip("Automatisch", "blau")) +
      ereignis("globe", "Anfrage über Website", "Wunschfahrzeug: Kombi, Budget bis 25.000 €", "10:31", chip("Erfasst", "ok")) +
      ereignis("calendar-check", "Termin Probefahrt", "Donnerstag, 14:00 Uhr · im Kalender eingetragen", "10:32", chip("Gebucht", "ok")) +
      ereignis("list-checks", "Aufgabe: Angebot schicken", "Zuständig: Frau Weber · Erinnerung morgen 9:00", "10:33", chip("Offen", "lila")) +
      ereignis("sticky-note", "Notiz von Frau Weber", "„Wünscht Rückruf am Nachmittag, hat einen Eintauschwagen.“", "10:41", chip("Notiz")) +
      `<div class="stats">${stat("Neue Anfragen heute", "4")}${stat("Offene Aufgaben", "3")}${stat("Termine diese Woche", "7")}</div>`,
  },

  "nexai-kalender": {
    name: "Kalender",
    markeIcon: "calendar-days",
    objektIcon: "calendar-check",
    tagline: ["Termine, die sich", "von selbst buchen."],
    features: [
      { icon: "mouse-pointer-click", titel: "Online buchen", text: "Kunden wählen Leistung und Uhrzeit selbst." },
      { icon: "message-square-text", titel: "Bestätigung & Erinnerung", text: "Per E-Mail und SMS, ganz automatisch." },
      { icon: "shield-check", titel: "Keine Doppelbuchung", text: "Jeder Termin wird nur einmal vergeben." },
      { icon: "layout-grid", titel: "Alles im Blick", text: "Tag, Woche, Monat und Kundenkartei." },
      { icon: "smartphone", titel: "Als App installierbar", text: "Auf dem Handy und am Desktop." },
    ],
    rechts: (() => {
      const tage = ["Mo 8.", "Di 9.", "Mi 10.", "Do 11.", "Fr 12."];
      const zeiten = ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
      const belegt = {
        "0-0": ["a", "Maniküre · Anna S."], "0-1": ["b", "Pediküre · Lena K."], "0-4": ["c", "Färben · Mia R."],
        "1-1": ["a", "Maniküre · Jana B."], "1-3": ["b", "Pediküre · Eva M."],
        "2-0": ["c", "Schnitt · Tom W."], "2-4": ["a", "Maniküre · Nora F."],
        "3-2": ["b", "Pediküre · Ida L."], "3-3": ["a", "Maniküre · Sara P."],
        "4-1": ["c", "Färben · Lea H."], "4-3": ["frei", "frei"],
      };
      let grid = `<div class="woche"><div></div>${tage.map((t, i) => `<div class="wtag${i === 4 ? " heute" : ""}">${i === 4 ? `<span>${t}</span>` : t}</div>`).join("")}`;
      zeiten.forEach((z, zi) => {
        grid += `<div class="wzeit">${z}</div>`;
        for (let t = 0; t < 5; t++) {
          const b = belegt[`${t}-${zi}`];
          grid += `<div class="wz">${b ? `<div class="termin ${b[0]}">${b[1]}</div>` : ""}</div>`;
        }
      });
      grid += `</div>`;
      return (
        kopf("calendar-days", "NexAI Kalender", "Salon Beispiel · Woche 37") +
        grid +
        `<div class="karte"><div style="display:flex;align-items:center;gap:10px"><div class="kn">Termin wählen</div><span class="chip blau" style="margin-left:auto">Reserviert für 4:59</span></div>` +
        `<div class="seg"><span>Vormittag</span><span class="an">Nachmittag</span><span>Abend</span></div>` +
        `<div class="slots"><span>13:30</span><span class="an">14:00</span><span>15:30</span><span>16:00</span><span>17:30</span></div></div>` +
        `<div class="toast">${icon("circle-check", { size: 24, stroke: "#6ee7b7", width: 2 })}Termin bestätigt · SMS an Kundin gesendet</div>` +
        `<div class="stats">${stat("Termine heute", "6")}${stat("Erinnerungen gesendet", "4")}${stat("Nächster freier Termin", "16:00")}</div>`
      );
    })(),
  },

  "nexai-app": {
    name: "App",
    markeIcon: "smartphone",
    objektIcon: "smartphone",
    tagline: ["Ihre App. Ihre Marke.", "Jedes Gerät."],
    features: [
      { icon: "palette", titel: "Ihre Marke", text: "Logo, Farben, Name: alles Ihres." },
      { icon: "download", titel: "Ohne App-Store", text: "Direkt aus dem Browser installieren." },
      { icon: "bell-ring", titel: "Push-Nachrichten", text: "Neuigkeiten sofort aufs Handy." },
      { icon: "monitor-smartphone", titel: "Alle Geräte", text: "iPhone, Android und Desktop." },
      { icon: "plug-zap", titel: "Verbunden", text: "Mit CRM, Kalender und Ihren Systemen." },
    ],
    rechts:
      kopf("smartphone", "Ihre App", "Kundenportal · Beispiel GmbH", "Installiert") +
      `<div class="appwrap">
        <div class="phone"><div class="notch"></div>
          <div class="pkopf"><div class="plogo">B</div><div><div class="pt">Beispiel GmbH</div><div class="ps">Guten Morgen, Herr Berger</div></div></div>
          <div class="pkarte"><div class="pi">${icon("clipboard-list", { size: 17, stroke: "#c4a6ff", width: 2 })}</div><div><div class="pn">Aufträge</div><div class="pd">3 in Bearbeitung</div></div><span class="pb">3</span></div>
          <div class="pkarte"><div class="pi">${icon("receipt", { size: 17, stroke: "#c4a6ff", width: 2 })}</div><div><div class="pn">Rechnungen</div><div class="pd">1 neu freigegeben</div></div><span class="pb">1</span></div>
          <div class="pkarte"><div class="pi">${icon("messages-square", { size: 17, stroke: "#c4a6ff", width: 2 })}</div><div><div class="pn">Support-Chat</div><div class="pd">Antwort vom Team</div></div><span class="pb">2</span></div>
          <div class="pkarte"><div class="pi">${icon("calendar-days", { size: 17, stroke: "#c4a6ff", width: 2 })}</div><div><div class="pn">Termine</div><div class="pd">Nächster: Mi, 10:00</div></div></div>
          <div class="pkarte"><div class="pi">${icon("camera", { size: 17, stroke: "#c4a6ff", width: 2 })}</div><div><div class="pn">Belege</div><div class="pd">Foto hochladen</div></div></div>
          <div class="pkarte"><div class="pi">${icon("megaphone", { size: 17, stroke: "#c4a6ff", width: 2 })}</div><div><div class="pn">Ankündigung</div><div class="pd">Neue Öffnungszeiten ab Oktober</div></div></div>
          <div class="tabs"><span class="an">${icon("house", { size: 18, stroke: "#c4a6ff", width: 2 })}Start</span><span>${icon("clipboard-list", { size: 18, stroke: "rgba(255,255,255,.55)", width: 2 })}Aufträge</span><span>${icon("messages-square", { size: 18, stroke: "rgba(255,255,255,.55)", width: 2 })}Chat</span><span>${icon("user", { size: 18, stroke: "rgba(255,255,255,.55)", width: 2 })}Profil</span></div>
        </div>
        <div class="push" style="top:150px"><div class="pi">${icon("bell-ring", { size: 18, stroke: "#fff", width: 2 })}</div><div><div class="pn">Neue Rechnung freigegeben</div><div class="pd">Rechnung 2026-0142 ist jetzt in Ihrer App.</div></div><span class="pz">jetzt</span></div>
        <div class="push" style="top:300px"><div class="pi">${icon("messages-square", { size: 18, stroke: "#fff", width: 2 })}</div><div><div class="pn">Nachricht vom Team</div><div class="pd">„Termin am Mittwoch passt, bis dann!“</div></div><span class="pz">vor 2 Min.</span></div>
        <div class="push" style="top:450px"><div class="pi">${icon("download", { size: 18, stroke: "#fff", width: 2 })}</div><div><div class="pn">Zum Home-Bildschirm</div><div class="pd">Installieren ohne App-Store, in Sekunden.</div></div><span class="pz">Tipp</span></div>
      </div>`,
  },
};
