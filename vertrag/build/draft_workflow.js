export const meta = {
  name: 'nexai-vertrag-draft',
  description: 'Ausformulierung des modularen NexAI-B2B-Vertragswerks (8 Dokumente) als strukturierte Blöcke, Entwurf + juristischer Review-Pass',
  phases: [
    { title: 'Entwurf', detail: 'Volltext je Dokument als validierte Blöcke' },
    { title: 'Review', detail: 'Juristischer Feinschliff + Vollständigkeit + Konsistenz' },
  ],
}

// ---------- Gemeinsame Spezifikation ----------
const SPEC = `ROLLE: Du bist ein erfahrener deutscher Wirtschafts- und IT-Vertragsjurist. Du formulierst den FINALEN,
unterschriftsreifen deutschen Vertragstext eines Dokuments aus einem modularen B2B-Vertragswerk aus.
Ausgabe ausschließlich als strukturierte Blöcke (Schema). Sprache: Deutsch, förmliches "Sie", präzise,
klar, hochwertig (Niveau erstklassiger SaaS-/Enterprise-Verträge), ohne Marketing/Übertreibung.

MANDANT / PARTEI (immer exakt so):
NexAI – Next Generation Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt, Deutschland,
vertreten durch die Gesellschafter Maximilian Trenk und Jason Brian Merklein, E-Mail mbt@nex-a-i.com,
Telefon 0176 20147646 — nachfolgend "NexAI".
Gegenpartei: Firma / Ansprechpartner / Anschrift / E-Mail / Telefon als auszufüllende Felder — nachfolgend "Kunde".

DEFINIERTE BEGRIFFE (einheitlich verwenden):
- "Agenten" = die von NexAI bereitgestellten KI-Agenten / digitalen Assistenten (Voice Agent, Chat Agent,
  Social-Media-Agent, Vertriebs-/Akquise-Agent, Automatisierungen, individuelle KI-Agenten).
- "Endnutzer" = Personen, die mit den Agenten interagieren (z. B. Anrufer, Chat-Kontakte, angesprochene Kontakte).
- "Projektleistungen" = einmalige Werkleistungen (insb. Website-Erstellung, Ersteinrichtung) — Werkvertragsrecht.
- "Betriebsleistungen" = laufender Betrieb, Wartung, Hosting, Support der Agenten — Dienstvertragsrecht.
- "Vertragsdokumente" = Rahmenvertrag, Auftragsformular/Leistungsschein, Anlage A (Leistungsbeschreibung),
  Anlage B (AVV), Anlage C (SLA), Anlage D (Abnahmeprotokoll), SEPA-Firmenlastschriftmandat, AGB (B2B).
- "Freikontingent" = im Beitrag enthaltenes Nutzungskontingent; "Mehrverbrauch"/"Overage" = darüber hinaus.
- "Subunternehmer" = Unterauftragsverarbeiter/Drittdienste (Vapi, Twilio, Make, OpenAI, ElevenLabs, Google, Hoster).

BESTÄTIGTE ENTSCHEIDUNGEN (verbindlich einarbeiten):
- Modulares Werk, deutsches Recht, Gerichtsstand Sitz NexAI.
- Keine Einrichtungs-/Setup-Gebühr. Nur monatlicher ODER jährlicher Beitrag. Monatsmodell: monatlich kündbar
  (1 Monat zum Monatsende). Jahresmodell: 12 Monate Mindestlaufzeit, keine anteilige Rückerstattung (Rabatt als
  Gegenleistung), Verlängerung um je 12 Monate, Kündigung mit 1 Monat Frist zum Laufzeitende.
- Freikontingent + Mehrverbrauch (Overage) zum Netto-Einheitspreis (Platzhalter, z. B. "____ EUR/Min."),
  abgerechnet mit dem Folgemonatsbeitrag; Einzelverbindungsnachweis auf Verlangen; technisches EUR-Spend-Cap je Agent.
- Zahlung wahlweise SEPA-Firmenlastschrift (B2B) ODER Überweisung.
- Umsatzsteuer: Regelbesteuerung; alle Preise netto zzgl. gesetzl. USt; bis zur USt-IdNr Steuernummer auf Rechnung.
- Aufzeichnung/Transkription von Gesprächen STANDARDMÄSSIG DEAKTIVIERT, nur auf dokumentierte Weisung; immer mit
  Pflicht-Ansage (KI-Hinweis + ggf. Aufzeichnungshinweis).
- Agenten dürfen KEINE rechtsverbindlichen Zusagen (Preise, Bestellungen, Verträge) abgeben — nur Auskunft/Termine.
- Accounts/Infrastruktur laufen über NexAI (Betriebsmittel), kein Herausgabeanspruch; optional kundeneigene Accounts.
- Datenspeicherung: wo technisch abschaltbar keine Speicherung; sonst Aufbewahrung 6 Monate; Geschäftsdaten
  zusätzlich in Kundensystemen (führendes System). Bei Vertragsende 30-Tage-Export vor Löschung + Löschbestätigung.
- Leads/Akquise: NexAI recherchiert Kontakte teils selbst -> strenge Eigen-Compliance (nur zulässige B2B-Ansprache,
  Art. 14 DSGVO-Info, Opt-out-Doku), Kunden-Zusicherung, Ablehnungsrecht rechtswidriger Kampagnen.
- EU-KI-VO (AI Act): KI-Kennzeichnung/Transparenz (Art. 50) ist verbindlicher, nicht abschaltbarer Leistungsbestandteil.
- Keine Erfolgs-/Lead-/Umsatzgarantie; KI ist wahrscheinlichkeitsbasiert und nicht fehlerfrei.
- NexAI ist Anbieter, Kunde ist Betreiber i. S. der KI-VO (je Agent im Auftragsformular).

FORMAT / BLÖCKE:
- Dokumentkopf: nutze "title" (Dokumenttitel) und optional "subtitle" + "meta" ("Stand: Juli 2026").
- Rahmenvertrag und AGB: Paragraphen als "h1" mit num "§ 1", "§ 2" ... und Titel im Feld text.
- Anlagen (A–D), Auftragsformular, SEPA-Mandat: Abschnitte als "h1" mit num "1.", "2." ... (oder ohne num),
  Unterüberschriften als "h2".
- Absätze als "p". Fettung im Text sparsam über **doppelte Sternchen** (wird gerendert). KEINE Markdown-Links.
- Nummerierte Klauselabsätze (1),(2),(3) als "num" (items). Aufzählungen als "bullets" (items).
- Tabellen als "table" (header + rows). Ausfüllfelder als "fill" (label + value ""). Ankreuzoptionen als
  "checkbox" (text, checked=false). Platzhalter generell als "____".
- Unterschriften als "sig" mit cols; für NexAI IMMER beide Gesellschafter + eine Spalte "Für den Kunden".
  Beispiel cols: [{"role":"Für NexAI","lines":["Ort, Datum","","Maximilian Trenk (Gesellschafter)"]},
  {"role":"Für NexAI","lines":["Ort, Datum","","Jason Brian Merklein (Gesellschafter)"]},
  {"role":"Für den Kunden","lines":["Ort, Datum","","Name / Funktion"]}]
- "pagebreak" für Seitenumbrüche, "spacer" (h in pt) für Abstände, "note" für dezente Hinweise (kursiv), "hr" Trennlinie.

QUALITÄT & KONSISTENZ:
- Vollständige, in sich schlüssige Klauseln — nicht "sollte geregelt werden", sondern ausformuliert.
- Querverweise korrekt benennen (z. B. "Anlage B (AVV)", "§ 12 (Haftung)").
- Firmierung/Adresse/Definitionen identisch zu dieser Spezifikation.
- Am Ende jedes Hauptdokuments (Rahmenvertrag, AVV, AGB) ein dezenter "note"-Hinweis, dass es sich um einen
  sorgfältig erstellten Entwurf handelt, der für den Einzelfall anwaltlich geprüft werden sollte.
- filename = der vorgegebene Dateiname (ohne Endung).`

// ---------- Dokument-spezifische Briefings ----------
const DOCS = [
  {
    filename: '01_Rahmen-Dienstleistungsvertrag',
    title: 'Rahmen-Dienstleistungsvertrag für KI- und Automatisierungslösungen (B2B)',
    brief: `Das Kerndokument. Struktur mit § 1 ff. Nimm mindestens auf:
- Parteien-Kopf (NexAI-Block + Kunde-Felder als "fill").
- § Vertragsgegenstand & Vertragsdokumente + RANGFOLGE-Klausel (bei Widersprüchen Reihenfolge: Auftragsformular,
  Rahmenvertrag, Anlage C SLA, Anlage A, Anlage D, AGB; Anlage B AVV hat SACHVORRANG für alle Datenschutzfragen;
  Individualabreden vorrangig, § 305b BGB).
- § Vertragsschluss & Nachweis (Textform/eIDAS, revisionssichere Dokumentation).
- § Leistungen: klare Trennung PROJEKTLEISTUNGEN (Werkvertrag §§ 631 ff., Abnahme nach Anlage D, Gewährleistung
  1 Jahr ab Abnahme, Ausnahmen Leben/Körper/Gesundheit/Vorsatz/grobe Fahrl./ProdHaftG) vs. BETRIEBSLEISTUNGEN
  (Dienstvertrag § 611, kein Erfolg geschuldet).
- § KI-Systeme & KI-Transparenz: wahrscheinlichkeitsbasiert, nicht fehlerfrei, eigenverantwortliche Prüfung;
  Art.-50-KI-VO-Kennzeichnung als nicht abschaltbarer Leistungsbestandteil; Kunde darf Hinweis nicht unterdrücken.
- § Aufzeichnung: standardmäßig AUS, nur auf dokumentierte Weisung, Pflicht-Ansage; Verantwortung des Kunden.
- § Automatisierte Erklärungen der Agenten: keine Abschlussvollmacht (nur Auskunft/Termine); Zurechnung zum Kunden.
- § Vergütung & Zahlung: netto zzgl. USt; kein Setup; Monats-/Jahresbeitrag; Freikontingent + Overage-Einheitspreis
  + Einzelverbindungsnachweis; Sofortfälligkeit ab Overage-Schwelle; Preisanpassung (Kostenbasis, 6 Wochen
  Ankündigung in Textform, Symmetrie, Sonderkündigungsrecht ab > 5 %, KEINE Zustimmungsfiktion); Zahlarten SEPA/
  Überweisung; Verzug (§ 288: 9 %-Punkte + 40 EUR); Leistungsaussetzung nur nach Ankündigung + 7 Tage Nachfrist,
  ohne Datenlöschung.
- § Laufzeit & Kündigung: Monatsmodell monatlich kündbar; Jahresmodell 12 Monate, kein Refund, Verlängerung 12 Mon.;
  außerordentliche Kündigung § 314 mit Regelbeispielen (Verzug > 2 Beiträge; rechtswidrige Nutzung trotz Aufforderung).
- § Mitwirkungspflichten des Kunden.
- § Nutzungsrechte: alle Prompts/Workflows/Konfigurationen/Skripte/Code (auch individuell) verbleiben bei NexAI;
  Kunde erhält einfaches, nicht übertragbares, auf die Laufzeit befristetes Nutzungsrecht (erlischt bei Ende);
  Ergebnisdaten (Leads/Termine/Transkripte) dem Kunden zugeordnet; beigestellte Materialien bleiben Kunde.
- § Betriebsinfrastruktur & Accounts: Accounts/Zugangsdaten = Betriebsmittel der NexAI, kein Herausgabeanspruch;
  logische Mandantentrennung (Details Anlage B); optional kundeneigene Accounts (dann Kundeneigentum + Übergabe).
- § Drittanbieter: differenziert, mit Verschuldens-Carve-out (kein Pauschalausschluss); laufende Drittkosten Kunde.
- § Haftung: DREISTUFIG blue-pencil-fest — (1) unbeschränkt bei Vorsatz/grober Fahrl./Leben-Körper-Gesundheit/
  Arglist/Garantie/ProdHaftG; (2) einfache Fahrl. nur bei Kardinalpflichten, begrenzt auf vertragstypisch
  vorhersehbaren Schaden, konkretisiert/gedeckelt auf die in den letzten 12 Monaten gezahlte Vergütung, mindestens
  jedoch "____ EUR", zzgl. Jahres-Aggregat "____ EUR"; (3) im Übrigen ausgeschlossen; keine Erfolgs-/Lead-/
  Umsatzgarantie.
- § Datenschutz & AVV: Verweis auf zwingende Anlage B; Rollen (Kunde Verantwortlicher, NexAI Auftragsverarbeiter);
  Innenausgleich Art. 82 Abs. 5; keine Bußgeld-Freistellung (nur deklaratorisch).
- § Datenspeicherung & Transparenz: Kunde stimmt ausdrücklich zu, dass Daten INTERN bei NexAI und GGF. EXTERN bei
  Subunternehmern (auch Drittland) gespeichert werden — Kundendaten UND Endnutzerdaten (Anrufer/Chat-Kontakte:
  Kontaktdaten, Gesprächsinhalte, Transkripte, Metadaten), im Rahmen der 6-Monats-Regel; KUNDENPFLICHT: als
  Verantwortlicher Rechtsgrundlage sicherstellen und Endnutzer nach Art. 13/14 DSGVO informieren (Datenschutzhinweis
  + Bot-Ansage) inkl. Hinweis auf NexAI und Drittdienste; sonst FREISTELLUNG von NexAI.
- § Akquise/Direktwerbung (UWG): zulässige Ansprache (§ 7 UWG, Art. 6/14 DSGVO), NexAI-Ablehnungsrecht rechtswidriger
  Kampagnen, Kunden-Zusicherung Rechtsgrundlage soweit möglich, Opt-out-Dokumentation.
- § Stimm-/Namensrechte & Deepfake-Kennzeichnung (Default synthetische Standardstimmen; bei Klonen dokumentierte
  Einwilligung + Freistellung).
- § Rechtmäßige Nutzung & Freistellung + sofortiges vorübergehendes Deaktivierungsrecht (Beitragspflicht bleibt).
- § Vertraulichkeit; § Referenznutzung (Opt-in mit checkbox).
- § Vertragsende & Offboarding: 30-Tage-Export (CSV/JSON) vor Löschung + Löschbestätigung; Rufnummern-Rückportierung
  + Keep-Alive bis Portierung; bei kundeneigenen Accounts Sequenz Export -> IP-Entfernung -> Zugriffsentzug.
- § Höhere Gewalt (erweitert: Cyberangriff, Provider-Ausfall/Insolvenz, behördl. Sperren, Netz-/TK-Ausfall) +
  Aussetzung von Leistungs- UND Zahlungspflicht + Kündigungsrecht ab > 30 Tagen + anteilige Rückerstattung nicht
  erbrachter, vorausbezahlter Zeiträume.
- § Verfügbarkeit: keine Garantie, Bemühensschuld (Details Anlage C).
- § Schlussbestimmungen: Textform für Kundenerklärungen (Kündigungen); Vorrang Individualabreden; Abwehrklausel
  gegen Einkaufs-AGB des Kunden; salvatorische Klausel (modern); deutsches Recht; Gerichtsstand Sitz NexAI.
- Unterschriften (beide Gesellschafter + Kunde).`,
  },
  {
    filename: '02_Auftragsformular_Leistungsschein',
    title: 'Auftragsformular / Leistungsschein',
    brief: `Kurzes, ausfüllbares Bestelldokument (Individualabrede, Vorrang vor AGB). Enthalte:
- Bezug auf den Rahmenvertrag + Kunde-Felder ("fill").
- Auswahl der Leistungen als "checkbox": Voice Agent, Chat Agent, Social-Media-Agent, Vertriebs-/Akquise-Agent,
  Automatisierung, Individuelle KI-Agenten, Website-Erstellung.
- Je Agent verbindlicher Einsatzzweck ("fill") + Bestätigung "KEIN Hochrisiko-Einsatz nach Anhang III KI-VO".
- Rollenzuordnung KI-VO: NexAI = Anbieter, Kunde = Betreiber (checkbox/fill).
- Vergütungstabelle ("table"): Position | Modell (monatlich/jährlich) | Netto-Betrag. Kein Setup.
- Freikontingent + Overage-Einheitspreis ("fill", z. B. "Freikontingent ____ Min./Monat", "Mehrverbrauch ____ EUR/Min. netto").
- Technisches EUR-Spend-Cap je Agent ("fill").
- Zahlart als "checkbox": SEPA-Firmenlastschrift / Überweisung.
- Laufzeitmodell als "checkbox": Monatsmodell (monatlich kündbar) / Jahresmodell (12 Monate, kein Refund).
- Bestätigung "Agenten ohne Abschlussvollmacht (nur Auskunft/Termine)".
- Aufzeichnung: checkbox "deaktiviert (Standard)" / "auf Weisung aktiviert".
- Rufnummern: mitgebracht (Kundeneigentum) / von NexAI gestellt; Registrierungsinhaber ("fill").
- Notfallkontakt + optionale Rückfallnummer ("fill").
- Geplante Einrichtung/Start ("fill"; Hinweis 3–10 Werktage).
- Optional: Ablösesumme für dauerhafte Prompt-Weiternutzung nach Vertragsende ("fill").
- Unterschriften.`,
  },
  {
    filename: '03_AnlageA_Leistungsbeschreibung',
    title: 'Anlage A – Leistungsbeschreibung',
    brief: `Konkretisiert den Leistungsumfang. Enthalte:
- Vorbemerkung: maßgeblich sind Auftragsformular + diese Anlage; nicht aufgeführte Leistungen nicht geschuldet.
- Je Leistung ein Abschnitt mit Feature-Aufzählung (bullets), inhaltlich an NexAIs Website angelehnt:
  Voice Agent (Anrufe annehmen, FAQ, Termine vereinbaren/verschieben/absagen, Weiterleitung, Lead-Erfassung,
  Qualifizierung, Mehrsprachigkeit); Chat Agent (Website/App-Chat, Beratung, Angebote empfehlen, Lead-Erfassung,
  Terminvereinbarung, Suche in Unterlagen); Social-Media-Agent (Nachrichten/Kommentare, Interessenten erkennen,
  Beiträge planen/vorbereiten, Community-Management); Vertriebs-/Akquise-Agent (Unternehmen finden, Ansprechpartner
  recherchieren, Passung bewerten, personalisierte E-Mails/Leitfäden — mit Compliance-Hinweis § 7 UWG/Art. 14 DSGVO);
  Automatisierung (CRM/Google Workspace/Microsoft 365, Kalender, E-Mail, Sheets/Excel, API, Benachrichtigungen,
  Lead-Verteilung, Prozessautomatisierung); Individuelle KI-Agenten (projektspezifisch); Website-Erstellung
  (Werkleistung: modern, responsiv, schnell, SEO-Grundlagen, Landingpages, Anbindung an Agenten).
- Ersteinrichtung (Grundkonfiguration, Workflows, Anbindung, Tests).
- KI-Ansage / Pflicht-Hinweis: konkreter Ansage-Wortlaut ("Sie sprechen mit einem KI-Assistenten ...").
- Aufzeichnungen/Transkripte: standardmäßig AUS; falls aktiviert 6 Monate Aufbewahrung; keine Speicherung in
  privaten Endnutzer-Accounts; Bereitstellung auf Anfrage.
- Guardrails/Themenausschlüsse: keine medizinische/rechtliche/steuerliche Beratung, keine verbindlichen Preis-/
  Vertragszusagen, Eskalations-/Rückfragelogik, Kalender-Read-Back gegen Doppeltermine; Wissensbasis-Pflege = Kunde.
- Nicht geschuldete Leistungen (Werbekampagnen, SEO-Betreuung, Social-Media-Redaktion, Grafik/Logo, Hosting fremder
  Systeme, Schulungen sofern nicht vereinbart).
- Keine Erfolgs-/Lead-/Umsatzgarantie (Beschaffenheitsabgrenzung).`,
  },
  {
    filename: '04_AnlageB_AVV_Auftragsverarbeitung',
    title: 'Anlage B – Vertrag zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO',
    brief: `Vollständiger AVV. Enthalte alle Pflichtinhalte:
- Präambel/Rollen: Kunde = Verantwortlicher, NexAI = Auftragsverarbeiter; Sachvorrang dieses AVV in Datenschutzfragen.
- Gegenstand, Art, Zweck, Dauer der Verarbeitung.
- KATEGORIEN personenbezogener Daten und BETROFFENER: Ansprechpartner des Kunden sowie ENDNUTZER (Anrufer,
  Chat-Kontakte, angesprochene Kontakte) — Kontakt-/Stammdaten, Gesprächsinhalte, Transkripte, Termindaten, Metadaten.
- Weisungsbindung (dokumentierte Weisungen); Vertraulichkeit/Verpflichtung der Mitarbeiter.
- Technische & organisatorische Maßnahmen (Art. 32) als eigener Anhang: Mandantentrennung (getrennte Projekte/
  Workspaces/API-Keys je Kunde), MFA, Least-Privilege, Verschlüsselung, Zugriffsprotokollierung, KEIN Produktivbetrieb
  über rein private Endnutzer-Accounts, Löschroutinen.
- SPEICHERORTE & Aufbewahrung: intern bei NexAI + extern bei Subunternehmern (ggf. Drittland); wo abschaltbar keine
  Speicherung; sonst Löschung spätestens 6 Monate nach Erhebung; Ausnahme Aufbewahrung zu Nachweiszwecken bis Verjährung.
- Zweckbindung / KEIN Training: keine Nutzung zu eigenen Zwecken, kein Modelltraining/Fine-Tuning; Zero-Retention-
  Konfiguration der Subunternehmer, soweit technisch möglich (Art. 28 Abs. 10).
- Unterauftragsverarbeiter: ANHANG mit Tabelle (Name | Sitz/Land | Leistung | Datenkategorien | Transfermechanismus),
  Beispiele: Vapi (USA), Twilio (USA), Make/Integromat (EU), OpenAI (USA), ElevenLabs (USA), Google (USA), Hoster.
  Allgemeine Genehmigung mit Änderungsvorbehalt (Art. 28 Abs. 2): Information mind. 14 Tage vorab in Textform,
  Widerspruchs-/Sonderkündigungsrecht aus wichtigem Grund. Drittlandtransfer: vorrangig DPF, hilfsweise EU-SCC
  Modul 3 + Zusatzmaßnahmen + TIA (Vapi/ElevenLabs vorsorglich SCC-Weg).
- Unterstützungspflichten: Betroffenenrechte (Art. 12–23), Meldung von Datenschutzverletzungen UNVERZÜGLICH,
  spätestens 24 Stunden nach Kenntnis (Art. 33/34), DSFA (Art. 35/36).
- Löschung/Rückgabe nach Wahl des Verantwortlichen bei Ende (Art. 28 Abs. 3 lit. g) + 30-Tage-Export + Löschbestätigung
  in Textform; gesetzliche Aufbewahrungspflichten (§ 147 AO, § 257 HGB) -> Einschränkung/Sperrung (Art. 18) statt Löschung.
- Nachweis-/Auditrecht (Art. 28 Abs. 3 lit. h).
- Rollenmatrix je Leistung (v. a. Akquise: Auftragsverarbeitung / gemeinsame Verantwortlichkeit Art. 26 / getrennte
  Verantwortlichkeit) und Klarstellung, dass NexAIs eigene straf-/bußgeldrechtliche Verantwortlichkeit unberührt bleibt.
- Innenausgleich Art. 82 Abs. 5.
- Unterschriften.`,
  },
  {
    filename: '05_AnlageC_SLA',
    title: 'Anlage C – Service Level Agreement (SLA)',
    brief: `Support- und Servicebedingungen. Enthalte:
- Zweck & Geltung.
- Servicezeiten: Mo–Fr 08:00–17:00 Uhr (außer gesetzl. Feiertage Baden-Württemberg); Anfragen außerhalb am nächsten Werktag.
- Supportkanäle (E-Mail, Telefon, Videokonferenz, Fernwartung, ggf. Ticketsystem).
- Prioritäten P1–P4 mit Definition + Beispielen und REAKTIONSZEITEN (Erstreaktion innerhalb Servicezeiten):
  P1 (Totalausfall) 8 Std; P2 (wesentliche Funktion) 1 Werktag; P3 (Teilfunktion) 2 Werktage; P4 (Anfrage/Änderung)
  3 Werktage. KEINE garantierte Wiederherstellungszeit (Bemühensschuld). Ursachen außerhalb NexAIs Einflussbereich
  (Drittdienste/höhere Gewalt) setzen Fristen aus.
- Enthaltener vs. nicht enthaltener Support (neue Funktionen/Agenten/Integrationen/Schulungen gesondert vergütet).
- Wartungsfenster: planbare Wartung möglichst außerhalb Geschäftszeiten, Ankündigung mind. 48 Std in Textform;
  Notfall-/Sicherheitswartung ohne Vorankündigung; kurze Unterbrechungen sind kein Mangel.
- Verfügbarkeit: keine garantierte Uptime; Zielkennzahl 99 % im Monatsmittel für NexAIs eigene Orchestrierung,
  Drittdienst-Ausfälle und Wartungsfenster unberücksichtigt (Bemühensschuld, keine Beschaffenheitsgarantie).
- Störungsmeldung/Fallback/Business Continuity: keine 24/7-Überwachungszusage; Kunde ist für ein Ausweichverfahren
  selbst verantwortlich; Schadensminderungsobliegenheit (§ 254).
- Datensicherung: Kunde verantwortlich für eigene Daten; führendes System = Kundensystem.
- Drittanbieter-Hinweis; Mitwirkungspflichten (Fehlerbeschreibung, Zugänge).
- Änderungsvorbehalt SLA mit Ankündigung + ordentlichem Kündigungsrecht (keine Zustimmungsfiktion).
- Unterschriften.`,
  },
  {
    filename: '06_AnlageD_Abnahmeprotokoll',
    title: 'Anlage D – Abnahmeprotokoll (Projekt-/Werkleistungen)',
    brief: `Abnahme für Projektleistungen (v. a. Website/Ersteinrichtung). Enthalte:
- Kopf mit Parteien + Projekt-/Feldangaben ("fill": Projekt, Projektbeginn, Abnahmedatum).
- Gegenstand der Abnahme (Bezug Rahmenvertrag + Auftragsformular).
- Gelieferte Leistungen als "checkbox"-Liste (Voice Agent, Chat Agent, Terminbuchung, CRM-Anbindung, Kalender,
  Sheets, E-Mail-Automatisierung, API-Integration, Workflow-Automatisierung, Website, individuelle Entwicklung, Sonstige).
- Dokumentation/Übergabe (checkbox: Zugangsdaten, Einweisung, Dokumentation, Support-Ansprechpartner).
- Restarbeiten (Ja/Nein + Feld); Mängel (Ja/Nein + Feld).
- Erklärung: Werkleistung im Wesentlichen vertragsgemäß erbracht; unwesentliche Mängel hindern Abnahme nicht;
  Abnahmefiktion nach § 640 Abs. 2 BGB (Fertigstellungsanzeige, angemessene Frist, Verweigerung nur mit Mangelangabe);
  mit Abnahme beginnt Gewährleistungsfrist (1 Jahr) für Werkleistungen.
- Unterschriften (beide Gesellschafter + Kunde).`,
  },
  {
    filename: '07_SEPA-Firmenlastschriftmandat',
    title: 'SEPA-Firmenlastschriftmandat (B2B)',
    brief: `SEPA-B2B-Firmenlastschriftmandat. Enthalte:
- Gläubiger: NexAI-Block + Platzhalter Gläubiger-Identifikationsnummer ("____") + Mandatsreferenz ("____").
- Zahler/Kunde-Felder ("fill": Name, Anschrift, IBAN, BIC, Kreditinstitut).
- Mandatstext (B2B-Firmenlastschrift): Ermächtigung zum Einzug wiederkehrender Lastschriften + Weisung an die Bank;
  Hinweis, dass bei der Firmenlastschrift KEIN Erstattungsanspruch nach erfolgter Einlösung besteht (§ 675e Abs. 4 BGB).
- Pflicht des Zahlers, das Mandat unverzüglich, spätestens vor dem ersten Einzug, bei seiner Bank zu registrieren.
- Pre-Notification (Vorabankündigung) auf 1 Kalendertag verkürzt.
- Regelung zu vom Kunden zu vertretenden Rücklastschriften (Ersatz tatsächlicher Bankentgelte + angemessene Pauschale,
  Nachweis geringeren Schadens vorbehalten).
- Überweisungs-Fallback (Fälligkeit spätestens 3. Werktag im Voraus).
- Ort, Datum, Unterschrift des Zahlers.
- Kurzer note-Hinweis: Gläubiger-ID bei der Deutschen Bundesbank zu beantragen.`,
  },
  {
    filename: '08_AGB_B2B',
    title: 'Allgemeine Geschäftsbedingungen (AGB) – B2B',
    brief: `Standard-Geschäftsbedingungen, WIDERSPRUCHSFREI zum Rahmenvertrag (Rahmenvertrag/Individualabrede hat Vorrang).
Struktur § 1 ff. Enthalte:
- Geltungsbereich (nur Unternehmer § 14 BGB; ABWEHRKLAUSEL gegen entgegenstehende Einkaufs-AGB, auch bei
  vorbehaltloser Leistung).
- Leistungen (Kurzbeschreibung, Verweis Auftragsformular/Anlage A).
- Angebot & Vertragsschluss (freibleibend; Annahme in Textform/e-Signatur).
- Preise (netto zzgl. USt) & Zahlungsbedingungen (14 Tage; SEPA/Überweisung; Verzug § 288: 9 %-Punkte + 40 EUR;
  Leistungsaussetzung nach Ankündigung + Nachfrist); Overage-Hinweis.
- Preis-/Bedingungsänderungen: 6 Wochen Ankündigung in Textform + ordentliches Kündigungsrecht, KEINE Zustimmungsfiktion.
- Mitwirkungspflichten; Änderungswünsche (gesondert vergütet).
- Nutzungsrechte (wie Rahmenvertrag: NexAI behält Rechte; befristetes einfaches Nutzungsrecht).
- Drittanbieter (differenziert, Verschuldens-Carve-out; laufende Kosten Kunde).
- KI-Systeme (wahrscheinlichkeitsbasiert; keine Erfolgs-/Fehlerfreiheitsgarantie; Eigenverantwortung).
- Verfügbarkeit (Bemühensschuld; Wartung kein Mangel).
- Support (nach Vertrag/SLA).
- Haftung (dreistufig, blue-pencil-fest, gespiegelt zum Rahmenvertrag; Cap-Platzhalter "____ EUR").
- Datenschutz (Verweis AVV Anlage B).
- Vertraulichkeit; Höhere Gewalt; Referenzen (nur mit Zustimmung).
- Textform für Kundenerklärungen; Schlussbestimmungen (deutsches Recht, Gerichtsstand Sitz, salvatorische Klausel).`,
  },
]

const BLOCK = {
  type: 'object',
  additionalProperties: false,
  properties: {
    t: { type: 'string', enum: ['title', 'subtitle', 'meta', 'h1', 'h2', 'p', 'bullets', 'num', 'table', 'fill', 'checkbox', 'sig', 'pagebreak', 'spacer', 'note', 'hr'] },
    text: { type: 'string' },
    num: { type: 'string' },
    items: { type: 'array', items: { type: 'string' } },
    header: { type: 'array', items: { type: 'string' } },
    rows: { type: 'array', items: { type: 'array', items: { type: 'string' } } },
    label: { type: 'string' },
    value: { type: 'string' },
    checked: { type: 'boolean' },
    h: { type: 'number' },
    cols: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          role: { type: 'string' },
          lines: { type: 'array', items: { type: 'string' } },
        },
        required: ['role', 'lines'],
      },
    },
  },
  required: ['t'],
}

const DOC_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    filename: { type: 'string' },
    doc_title: { type: 'string' },
    doc_subtitle: { type: 'string' },
    blocks: { type: 'array', items: BLOCK },
  },
  required: ['filename', 'doc_title', 'blocks'],
}

function draftPrompt(doc) {
  return `${SPEC}

======================================================================
ZU ERSTELLENDES DOKUMENT: "${doc.title}"
filename: ${doc.filename}

BRIEFING (verbindlicher Inhalt):
${doc.brief}

Erstelle jetzt den vollständigen, unterschriftsreifen deutschen Text als Blöcke. Beginne mit einem "title"-Block
"${doc.title}" und einem "meta"-Block "Stand: Juli 2026". Sei vollständig und präzise. Gib ausschließlich das
strukturierte Dokumentobjekt zurück (filename, doc_title, blocks).`
}

function reviewPrompt(doc, draft) {
  return `${SPEC}

======================================================================
JURISTISCHER REVIEW & FEINSCHLIFF für: "${doc.title}" (filename ${doc.filename}).

BRIEFING (Soll-Inhalt):
${doc.brief}

ENTWURF (JSON-Blöcke):
${JSON.stringify(draft)}

Prüfe kritisch als deutscher Vertragsjurist: (1) Sind ALLE im Briefing geforderten Klauseln vollständig und
juristisch tragfähig enthalten? (2) Sind die Formulierungen im B2B WIRKSAM (AGB-Kontrolle §§ 305–310 BGB,
blue-pencil-fest, keine unzulässigen Pauschalausschlüsse/Fiktionen)? (3) Konsistenz mit der Spezifikation
(Definitionen, Firmierung, Querverweise, Zahlen/Entscheidungen)? (4) Sprache klar, förmlich, hochwertig?
Ergänze Fehlendes, schärfe Schwaches, korrigiere Unwirksames. Gib das FINALE, verbesserte Dokumentobjekt
vollständig als Blöcke zurück (filename, doc_title, blocks) — nicht nur die Änderungen.`
}

// ---------- Pipeline: Entwurf -> Review, ohne Barriere ----------
const finals = await pipeline(
  DOCS,
  (doc) => agent(draftPrompt(doc), { schema: DOC_SCHEMA, phase: 'Entwurf', label: 'entwurf:' + doc.filename, effort: 'high' }),
  (draft, doc) => {
    if (!draft) return null
    return agent(reviewPrompt(doc, draft), { schema: DOC_SCHEMA, phase: 'Review', label: 'review:' + doc.filename, effort: 'high' })
      .then((r) => r || draft)
  }
)

const docs = finals.filter(Boolean)
log(`${docs.length}/${DOCS.length} Dokumente fertig ausformuliert`)

return { docs }
