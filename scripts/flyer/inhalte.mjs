// Alle Texte des A4-Flyers an einer Stelle. Wer eine Branchenfassung braucht
// (Autohaus, Handwerk, Praxis), ändert nur diese Datei, nicht die Vorlage.
//
// Regeln, die hier eingebaut sind und nicht verwässert werden dürfen:
//  - Fakten-Ledger B1: 24/7, 70 bis 80 %, 3×, 100 % sind ZIELWERTE, keine
//    Messergebnisse. Der Hinweis unter den Kennzahlen ist Pflicht.
//  - Fakten-Ledger B2: 24/7 bezieht sich auf den AGENTEN, nie auf NexAI.
//  - Datenschutz nur qualifiziert ("nach der DSGVO verarbeitet", AV-Vertrag),
//    kein Siegel-Versprechen wie "DSGVO-konform".
//  - Die Demo-Nummer ist die Vapi-Nummer "NexAI Hauptnummer". Vor jedem Druck
//    prüfen, ob sie registriert ist (Vapi registriert sich nur einmal).

export const marke = {
  wortmarke: "NEXAI",
  pill: "Digitale Mitarbeiter & AI-Automatisierung",
  web: "nex-a-i.com",
  webUrl: "https://www.nex-a-i.com/de",
  demoAnzeige: "07959 3100191",
  demoLink: "tel:+4979593100191",
  mobilAnzeige: "0176 80714816",
  mobilLink: "tel:+4917680714816",
  mailAnzeige: "mbt@nex-a-i.com",
  mailLink: "mailto:mbt@nex-a-i.com",
  fusszeile:
    "NexAI · Next Generation Artificial Intelligence GbR · Untere Bergstraße 13 · 74586 Frankenhardt",
};

export const seite1 = {
  titel: ["Digitale", "Mitarbeiter, die", "wirklich arbeiten."],
  // Zeile 3 wird farbig gesetzt, als VOLLTON. Kein background-clip:text,
  // das druckt Apple als blauen Balken über den Text (siehe build.mjs).
  akzentZeile: 2,
  subline:
    "Keine Standard-Chatbots, sondern AI-Agenten, die Anrufe annehmen, Anfragen beantworten und Abläufe automatisieren. Rund um die Uhr.",
  karten: [
    {
      icon: "phone",
      titel: "Voice Agent",
      text: "Nimmt rund um die Uhr jeden Anruf an und bucht Termine.",
    },
    {
      icon: "message-square",
      titel: "Chat Agent",
      text: "Beantwortet Anfragen auf Ihrer Website sofort.",
    },
    {
      icon: "waypoints",
      titel: "Automatisierung",
      text: "Verbindet Ihre Programme und nimmt wiederkehrende Aufgaben ab.",
    },
  ],
  cta: {
    eyebrow: "SELBST AUSPROBIEREN",
    titel: "Rufen Sie unseren Agenten an.",
    text: "Er geht rund um die Uhr ran und sagt Ihnen zu Beginn, dass er eine AI ist.",
    qrHinweis: "Code scannen",
  },
};

export const seite2 = {
  titelVorn: "Warum ",
  titelAkzent: "NexAI",
  titelHinten: "?",
  bausteine: [
    {
      icon: "calendar-check",
      titel: "NexAI Kalender",
      text: "Kunden buchen selbst, mit Bestätigung und Erinnerung per E-Mail oder SMS.",
    },
    {
      icon: "users",
      titel: "NexAI CRM",
      text: "Anrufe, Anfragen, Termine und Aufgaben an einem Ort, auf Servern in Deutschland.",
    },
    {
      icon: "smartphone",
      titel: "NexAI App",
      text: "Ihre eigene App für Kunden oder Mitarbeiter, ohne App-Store.",
    },
    {
      icon: "sliders-horizontal",
      titel: "Individuell",
      text: "Jede Lösung entsteht passend für Ihr Unternehmen, keine Software von der Stange.",
    },
  ],
  datenschutz: {
    icon: "shield-check",
    titel: "Datenschutz und AI Act",
    text: "Ihre Daten werden nach der DSGVO verarbeitet: mit Auftragsverarbeitungsvertrag, festen Löschfristen und einer transparenten Datenschutzerklärung. Unser Voice Agent sagt außerdem zu Beginn jedes Gesprächs, dass er eine AI ist, wie es der EU AI Act in Artikel 50 verlangt.",
  },
  kennzahlen: [
    { wert: "24/7", label: "Agent erreichbar" },
    { wert: "70–80 %", label: "weniger Handarbeit" },
    { wert: "3×", label: "schnellere Reaktion" },
    { wert: "100 %", label: "individuell" },
  ],
  kennzahlenHinweis: "Unsere Zielwerte, keine Messergebnisse.",
  cta: {
    eyebrow: "NÄCHSTER SCHRITT",
    titel: "30 Minuten Analyse, kostenlos und unverbindlich.",
    text: "Wir sehen uns an, wo bei Ihnen Anrufe, Anfragen und Termine liegen bleiben, und sagen Ihnen ehrlich, ob sich AI dafür lohnt.",
  },
};
