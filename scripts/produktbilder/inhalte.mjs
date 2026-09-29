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
  "sales-assistent": {
    name: "Sales Assistent",
    markeIcon: "graduation-cap",
    objektIcon: "messages-square",
    tagline: ["Verkaufen üben,", "bevor es zählt."],
    features: [
      { icon: "library", titel: "Lernbibliothek", text: "Ihre Videos, Texte und Leitfäden an einem Ort." },
      { icon: "messages-square", titel: "Rollenspiel", text: "Einwände üben, vier Härtegrade." },
      { icon: "clipboard-check", titel: "Auswertung", text: "Was lief gut, woran lag es, welche Lektion hilft." },
      { icon: "quote", titel: "Mit Beleg", text: "Jede Aussage mit Fundstelle aus dem Gespräch." },
      { icon: "shield-check", titel: "Freigabe zum Kunden", text: "Erst nach bestandenem Wissens-Check." },
    ],
    rechts:
      kopf("messages-square", "Rollenspiel · Einwand „zu teuer“", "Stufe: hart · Branche: Handwerk", "Ausgewertet") +
      `<div class="karte"><div class="abschnitt" style="margin-top:0">Gesprächsverlauf</div>` +
      `<div class="zeile"><span class="zt">Kunde</span><span class="zd">„Das ist deutlich zu teuer für uns.“</span></div>` +
      `<div class="zeile"><span class="zt">Sie</span><span class="zd">„Womit vergleichen Sie gerade, damit ich es einordnen kann?“</span></div>` +
      `<div class="zeile"><span class="zt">Kunde</span><span class="zd">„Mit dem Angebot vom Wettbewerb, das ist günstiger.“</span></div>` +
      `<div class="zeile"><span class="zt">Sie</span><span class="zd">„Verstehe. Was kostet Sie ein verpasster Anruf am Tag?“</span></div></div>` +
      `<div class="abschnitt">Auswertung</div>` +
      ereignis("thumbs-up", "Nachgefragt statt gerechtfertigt", "Bedarf geöffnet, bevor über den Preis geredet wurde", "Hebel 1", chip("Stark", "ok")) +
      ereignis("circle-alert", "Nutzen zu spät beziffert", "Die Rechnung kam erst im vierten Zug", "Hebel 2", chip("Üben", "lila")) +
      ereignis("book-open", "Passende Lektion", "Preisgespräch: vom Einwand zur Rechnung", "Modul 3", chip("Vorgeschlagen", "blau")) +
      `<div class="stats">${stat("Gesprächsphasen erreicht", "4 von 5")}${stat("Belegte Fundstellen", "5")}${stat("Geübte Einwände", "12")}</div>`,
  },

  "mail-agent": {
    name: "Mail Agent",
    markeIcon: "mail",
    objektIcon: "inbox",
    tagline: ["Das Postfach liest mit.", "Antworten liegen bereit."],
    features: [
      { icon: "sun", titel: "Briefing am Morgen", text: "Was wichtig ist, in einer Übersicht." },
      { icon: "calendar-clock", titel: "Fristen zuerst", text: "Termine und Fristen als eigener Block." },
      { icon: "pen-line", titel: "Antwort liegt bereit", text: "Fertiger Entwurf in Ihrem Ton." },
      { icon: "shield-alert", titel: "Betrug erkannt", text: "Gefälschte Absender fallen auf." },
      { icon: "send", titel: "Erst auf Ihr Wort", text: "Verschickt wird nur, was Sie freigeben." },
    ],
    rechts:
      kopf("inbox", "Briefing · Dienstag, 7:30 Uhr", "32 neue Nachrichten · 3 brauchen Sie", "Bereit") +
      `<div class="abschnitt" style="margin-top:0">Wichtig heute</div>` +
      ereignis("file-text", "Angebot Dachdecker Berger", "Fragt nach Termin diese Woche · Entwurf liegt bereit", "6:41", chip("Antwort offen", "lila")) +
      ereignis("calendar-clock", "Frist: Rückmeldung Förderantrag", "Läuft am Freitag ab · aus dem Anhang gelesen", "Fr", chip("Frist", "blau")) +
      ereignis("shield-alert", "Angebliche Rechnung 4711", "Absender ähnelt der echten Adresse · 7 Auffälligkeiten", "5:02", chip("Betrug", "warn")) +
      `<div class="abschnitt">Antwortentwurf</div>` +
      `<div class="karte"><div class="kn">An: berger@beispiel-dach.de</div>` +
      `<div class="zd" style="margin-top:8px">Guten Tag Herr Berger,<br>vielen Dank für Ihre Nachricht. Donnerstag um 14:00 Uhr passt bei uns.<br>Sie bekommen die Bestätigung direkt im Anschluss.</div>` +
      `<div class="join" style="margin-top:12px">${chip("Freigeben und senden", "ok")}${chip("Bearbeiten")}${chip("Später")}</div></div>` +
      `<div class="stats">${stat("Zusammengefasst", "29")}${stat("Brauchen Sie", "3")}${stat("Betrug geblockt", "1")}</div>`,
  },
};
