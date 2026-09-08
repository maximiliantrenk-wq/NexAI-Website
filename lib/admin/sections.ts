// Die Bereiche des Texteditors — eine Sprachdatei je Bereich.
//
// Die Reihenfolge ist die der Wichtigkeit im Alltag, nicht das Alphabet:
// Was oft geändert wird, steht oben.

export const LOCALES = ["de", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export type Section = {
  /** Dateiname ohne Endung, zugleich Adresse: /admin/<id> */
  id: string;
  title: string;
  description: string;
  /** Warnhinweis, der im Editor über den Feldern steht. */
  caution?: string;
};

export const SECTIONS: Section[] = [
  {
    id: "home",
    title: "Startseite",
    description: "Die große Überschrift oben, die Abschnitte darunter, Zahlen und Knöpfe.",
  },
  {
    id: "services",
    title: "Leistungen",
    description: "Die Seite „Leistungen“ mit den einzelnen Angeboten.",
  },
  {
    id: "products",
    title: "Produkte",
    description:
      "Die sechs Produktseiten: Voice-Agent, Chat-Agent, NexAI Kalender, NexAI CRM, Automatisierung, NexAI App.",
  },
  {
    id: "pricing",
    title: "Preise",
    description: "Die Preisseite und die Beschreibung der Pakete.",
  },
  {
    id: "about",
    title: "Über uns",
    description: "Unternehmen, Gründer, Werte, Zitat.",
  },
  {
    id: "contact",
    title: "Kontakt",
    description: "Kontaktseite, Formular und Terminbuchung.",
  },
  {
    id: "common",
    title: "Menü und Fußzeile",
    description:
      "Alles, was auf jeder Seite vorkommt: Navigation, Fußzeile, Newsletter, Fehlerseite.",
  },
  {
    id: "partner",
    title: "Partner",
    description: "Die Seite für Kooperations- und Vertriebspartner.",
  },
  {
    id: "recruiting",
    title: "Vertriebspartner werden",
    description: "Die Seiten für Setter und Closer. Der größte Bereich.",
  },
  {
    id: "roi",
    title: "ROI-Rechner",
    description: "Beschriftungen und Erklärtexte des Rechners.",
  },
  {
    id: "chat",
    title: "Chat-Fenster",
    description: "Begrüßung und Hinweise im Chat unten rechts.",
  },
  {
    id: "legal",
    title: "Rechtstexte",
    description: "Impressum, Datenschutzerklärung, AGB.",
    caution:
      "Diese Texte sind rechtlich geprüft. Ändere hier nur etwas, wenn es mit dem Anwalt abgestimmt ist — ein falsches Wort kann abmahnfähig sein.",
  },
];

export function findSection(id: string): Section | undefined {
  return SECTIONS.find((s) => s.id === id);
}

export function messagePath(locale: Locale, sectionId: string): string {
  return `messages/${locale}/${sectionId}.json`;
}
