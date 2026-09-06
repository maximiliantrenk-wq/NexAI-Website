# Verzeichnis von Verarbeitungstätigkeiten (Art. 30 DSGVO)

**Verantwortlicher / Auftragsverarbeiter:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Gesellschafter: Maximilian Trenk, Jason Brian Merklein · Kontakt Datenschutz: mbt@nex-a-i.com
**Stand:** September 2026 · **Aufsichtsbehörde:** LfDI Baden-Württemberg
**Drittland-Folgenabschätzungen** liegen vor: [Vapi](TIA-Vapi-Drittlandtransfer.md) (deckt Soniox mit ab) · [OpenAI](TIA-OpenAI-Drittlandtransfer.md) · [Resend](TIA-Resend-Drittlandtransfer.md) — für Resend greift Art. 45 (DPF), die SCC-Bewertung liegt als Rückfall bei.

> ⚠️ **Kein Rechtsrat.** Vorlage zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2, Art. 30 DSGVO). Laufend fortschreiben; vor Verwendung vom DSB/Anwalt prüfen lassen. Löschfristen = interne Defaults, mit der Datenschutzerklärung abgeglichen.

Empfänger-Kürzel (Drittland-Mechanismus): **Resend** (US, **DPF** — hilfsweise SCC) · **Google** IE/US (DPF/SCC) · **OpenAI** IE/US (**SCC, nicht DPF-zertifiziert** — Prüfung 06.09.2026; No-Training) · **Vapi** (US, SCC+TIA — Orchestrierung **und** Sprachsynthese) · **Soniox** (US, STT, Unterauftragsverarbeiter von Vapi, SCC+TIA über den Vapi-DPA) · **easybell** (DE) · **Hetzner** (DE, Server der **Website**, der self-hosted n8n **und des NexAI-CRM**) · **NexAI-CRM** (self-hosted, DE — eigene zentrale Kundenverwaltung, keine Drittlandübermittlung) · **Explorium** (Datenprovider).

---

## Teil A — Als Verantwortlicher (Art. 30 Abs. 1)

### A1 Bereitstellung der Website / Server-Logs
- **Zweck:** Auslieferung und Sicherheit der Website. **Betroffene:** Websitebesucher. **Daten:** IP-Adresse, Zeitpunkt, angeforderte Inhalte, Referrer, Browser.
- **Rechtsgrundlage:** Art. 6(1)f. **Empfänger:** Hetzner (DE). **Drittland:** keine (Server in Deutschland). **Löschung:** 30 Tage. **TOMs:** siehe AVV Anhang 1.

### A2 Kontakt- und Partnerformular / E-Mail
- **Zweck:** Bearbeitung von Anfragen und Partneranfragen. **Betroffene:** Interessenten, Partner. **Daten:** Name, E-Mail, Unternehmen, Website, Nachricht.
- **Rechtsgrundlage:** Art. 6(1)b/f. **Empfänger:** Resend (Versand), Postfach mbt@nex-a-i.com (Google Workspace), **NexAI-CRM (self-hosted DE)** (Speicherung Anfrage/Kontakt). **Drittland:** USA (SCC); CRM = EU. **Löschung:** nach Bearbeitung.

### A3 Newsletter
- **Zweck:** Versand von Informationen zu Leistungen. **Betroffene:** Abonnenten. **Daten:** E-Mail-Adresse, Opt-in-Nachweis (Zeit/IP).
- **Rechtsgrundlage:** Art. 6(1)a (Double-Opt-In). **Empfänger:** Resend. **Drittland:** USA (SCC). **Löschung:** bis Widerruf.

### A4 Website-Chat-Assistent
- **Zweck:** Beantwortung von Anfragen, Terminvereinbarung. **Betroffene:** Chat-Nutzer. **Daten:** Nachrichteninhalte, freiwillige Kontaktdaten (Name/E-Mail/Telefon), Anliegen; Session-Kennung + Verlauf im Browser-sessionStorage.
- **Rechtsgrundlage:** Art. 6(1)b/f. **Empfänger:** n8n@Hetzner, **NexAI-CRM (self-hosted DE)** (Lead-/Kontaktspeicher), OpenAI (LLM), Google (Calendar). **Drittland:** IE/US (DPF/SCC); Automatisierung + CRM = EU. **Löschung:** Chatverläufe 6 Monate; Leads 6 Monate. **Besonderheit:** KI-Hinweis (Art. 50 AI Act) gegeben; kein Training.

### A5 Online-Terminbuchung
- **Zweck:** Vereinbarung von Beratungsterminen. **Betroffene:** Terminbucher. **Daten:** Name, E-Mail, Zeitpunkt, Anlass.
- **Rechtsgrundlage:** Art. 6(1)b. **Empfänger:** n8n@Hetzner, **NexAI-CRM (self-hosted DE)** (Termin-/Kontaktspeicher), Google Calendar; Resend (interne Notiz). **Drittland:** IE/US (DPF/SCC); CRM = EU. **Löschung:** 12 Monate.

### A6 KI-Telefon-/Sprachassistent (eigene Nummer/Demo)
- **Zweck:** Terminvereinbarung/Erreichbarkeit per Telefon. **Betroffene:** Anrufer. **Daten:** Rufnummer, Name, Anliegen, Wunschtermin, ggf. E-Mail, Verbindungsdaten.
- **Rechtsgrundlage:** Art. 6(1)b/f. **Empfänger:** Vapi (Orchestrierung + TTS), Soniox (STT, via Vapi), OpenAI (LLM), easybell, n8n@Hetzner, **NexAI-CRM (self-hosted DE)** (Anruf-/Termin-/Kontaktspeicher), Google. **Drittland:** USA (SCC+TIA), IE/US (DPF/SCC); CRM = EU. **Löschung:** Termindaten 6 Monate; **keine Anrufaufzeichnung** (in Vapi deaktiviert). **Besonderheit:** KI-Ansage zu Gesprächsbeginn (Art. 50 AI Act); DSFA prüfen.

### A7 Neukundengewinnung / Lead-Recherche (Vertrieb)
- **Zweck:** Akquise/B2B-Ansprache. **Betroffene:** Entscheider/Ansprechpartner potenzieller Kunden. **Daten:** Name, Funktion, Firma, geschäftliche E-Mail/Telefon, Quelle.
- **Rechtsgrundlage:** Art. 6(1)f (Interessenabwägung); **§ 7 UWG** für E-Mail-Werbung beachten. **Quelle/Empfänger:** Explorium (Datenprovider), Google Sheets/CRM. **Drittland:** je Anbieter. **Pflichten:** **Art. 14 Informationspflicht** gegenüber Prospects; Opt-out-Register. **Löschung:** 6 Monate ohne Reaktion.

### A8 Kunden-/Vertrags- und Rechnungsverwaltung
- **Zweck:** Vertragsanbahnung/-durchführung, Buchhaltung. **Betroffene:** Kunden/Ansprechpartner. **Daten:** Stammdaten, Vertrags-/Zahlungsdaten (SEPA), Kommunikation.
- **Rechtsgrundlage:** Art. 6(1)b; Art. 6(1)c (steuer-/handelsrechtlich). **Empfänger:** Google Workspace, ggf. Steuerberater/Bank. **Löschung:** gesetzliche Fristen (§147 AO 8/10 Jahre, §257 HGB).

---

### A9 Bewerbungen Vertriebspartner (Setter/Closer)
- **Zweck:** Gewinnung und Auswahl selbstständiger Vertriebspartner, Anbahnung eines Vertriebspartnervertrags, Auswertung der Bewerbungskanäle. **Betroffene:** Bewerber (Selbstständige). **Daten:** Name, E-Mail, Telefon, gewünschte Rolle, Vertriebserfahrung, Verfügbarkeit, optional Profil-Link/Nachricht, Sprache, Zeitpunkt; Herkunft des Seitenaufrufs (ref/UTM, Einstiegsseite, Referrer-Domain; sessionStorage, kein Cookie); IP kurzzeitig im RAM (Ratenlimit).
- **Rechtsgrundlage:** Art. 6(1)b (Anbahnung), Art. 6(1)f (Kanalauswertung, Missbrauchsschutz). **Empfänger:** Resend (Eingangsbestätigung + interne Mail, US/DPF), **NexAI-CRM (self-hosted DE)** (`source = website-vertriebspartner`), bei Terminbuchung A5, nach Vertragsschluss Partner-Portal app.nex-a-i.com. **Drittland:** US (DPF/SCC) nur Resend. **Löschung:** 6 Monate nach Abschluss des Verfahrens (§ 15 Abs. 4 AGG, § 6 Abs. 3 AGG); bei Vertragsschluss Übergang in A8. **Besonderheit:** keine automatisierte Entscheidung, kein AI-Scoring; DSE Abschnitt 12.

### A10 NexAI Study — privater Lernbereich im Portal
- **Zweck:** Bereitstellung eines persönlichen KI-Lernassistenten für **eine einzelne private Nutzerin** im Portal (app.nex-a-i.com, Zweig `/study`): Aufbereitung selbst hochgeladener Lernunterlagen zu Lernfassungen, Vorlesen, Abfragen, Fortschrittsmessung. Kein geschäftlicher Zweck, keine Verbindung zu Kunden-, Lead- oder CRM-Daten.
- **Betroffene:** die Nutzerin selbst; **mittelbar Dritte**, die in hochgeladenen Unterlagen namentlich vorkommen können.
- **Daten:** Konto (Name, E-Mail, Passwort-Hash, letzte Anmeldung); **hochgeladene Dateien** (PDF, Word, PowerPoint, Text, Markdown, Bilder bis 50 MB; Original bleibt unverändert); **daraus erzeugt**: ausgelesener Text, Gliederung, sechs Lernfassungen, Sprachaufnahmen, Karteikarten, Prüfungsfragen, Antworten samt Bewertung, Lernchat, Markierungen; Sicherheitsprotokoll (nur die **Tatsache** der Anmeldung, keine Lerninhalte).
- **Rechtsgrundlage:** Art. 6(1)b (Nutzungsverhältnis) — *anwaltlich zu bestätigen, siehe Pflegehinweise*. **Empfänger:** **Hetzner** (DE, Server — Konto, Dateien, Aufnahmen, erzeugte Inhalte); **OpenAI Ireland Ltd** (Sprachmodell, Abschreiben von Scans/Fotos, Sprachsynthese), Verarbeitung durch OpenAI L.L.C. (US) möglich. **Drittland:** USA über OpenAI → **Art. 46 SCC** (OpenAI ist **nicht** DPF-zertifiziert, geprüft 06.09.2026) → [TIA](TIA-OpenAI-Drittlandtransfer.md). **Löschung:** **keine Frist** — Löschung durch die Nutzerin oder mit dem Konto; dann Datensätze **und** Dateien.
- **Besonderheiten:**
  - **Art. 9 nicht ausgeschlossen.** Die Nutzerin lädt beliebige Unterlagen hoch; Gesundheits- oder andere besondere Daten sind technisch nicht verhindert. Sie verlassen in diesem Fall mit der Verarbeitung die EU. Einziger Schutz ist der Hinweis in der Datenschutzerklärung.
  - **Nur Scans und Fotos gehen als Bild an das Modell.** Reine Textformate (PDF mit Textebene, Word, PowerPoint, Text, Markdown) werden auf dem eigenen Server ausgelesen und nicht übermittelt.
  - **Kein Training** auf den über die Schnittstelle übermittelten Daten.
  - **Trennung zum Geschäftsbetrieb:** eigener Routenbaum, eigene Rolle `privat`, jede Tabelle mit `owner_user_id`. Geschäftskonten erreichen den Lernbereich nicht, das `privat`-Konto keinen Geschäftsbereich. **Ehrliche Grenze:** ein Portal-Admin kann das Passwort zurücksetzen und sich damit anmelden — Vertraulichkeit *gegen* den Betreiber besteht nicht.
  - **Keine automatisierte Entscheidung** im Sinne von Art. 22; Bewertungen im Prüfungstraining haben keine rechtliche Wirkung.
  - **Datenschutzhinweis liegt als Entwurf vor** (`nexai-portal/docs/datenschutz-study-ENTWURF.md`), ist **noch nicht veröffentlicht**.

---

## Teil B — Als Auftragsverarbeiter für Kunden (Art. 30 Abs. 2)

**Kategorien von Verarbeitungen je Kunde (Verantwortlicher = Kunde):** Betrieb der beauftragten KI-Agenten. Details je Auftrag im Auftragsformular; Rollen in AVV §15.

| Verarbeitung (Agent) | Betroffene | Datenkategorien | Empfänger/Subunternehmer | Drittland | Löschung |
|---|---|---|---|---|---|
| Voice Agent (Inbound) | Anrufer des Kunden | Rufnummer, Gesprächsinhalt (flüchtig), Termin, Metadaten | Vapi (Orchestrierung + TTS), Soniox (STT, via Vapi), OpenAI (LLM), easybell, n8n@Hetzner, Google | US/IE (SCC/TIA bzw. DPF) | Termine ≤ 6 Mon.; keine Aufnahme (deaktiviert) |
| Chat Agent | Chat-Kontakte des Kunden | Nachrichten, Kontaktdaten, Anliegen | n8n@Hetzner, OpenAI, Google | IE/US (DPF/SCC); EU | ≤ 6 Mon. |
| Social-Media-Agent | Social-Kontakte des Kunden | Nachrichten, Profil-/Kontaktdaten | n8n@Hetzner, OpenAI, Plattform-APIs | je Plattform | ≤ 6 Mon. |
| Automatisierungen | je nach Workflow | Vorgangs-, Kontakt-, Termindaten | n8n@Hetzner, angebundene Dienste | i. d. R. EU | ≤ 6 Mon. |
| Individuelle KI-Agenten | fallweise | fallweise | fallweise (im Auftragsformular) | fallweise | ≤ 6 Mon. |
| Vertriebs-/Akquise-Agent | angesprochene Kontakte | Kontakt-/Firmendaten | Explorium, n8n@Hetzner, OpenAI, Google | je Anbieter | ≤ 6 Mon. |

**Allgemeine TOMs:** siehe AVV Anhang 1. **Drittlandgarantien:** DPF/SCC+TIA je Subunternehmer (AVV Anhang 2). **Grundsatz Nichtspeicherung**, Aufzeichnung/Transkription standardmäßig aus. **Besondere Kategorien (Art. 9):** nicht Gegenstand (AVV §3) — bei sensiblen Branchen Sensitivitäts-Riegel + juristische Prüfung.

---

## Bekannte Lücken dieses Verzeichnisses

- **Das Partner-/Kundenportal (app.nex-a-i.com) fehlt als eigene Verarbeitungstätigkeit.** Es kommt bislang nur in A9 als Ziel nach Vertragsschluss vor. Tatsächlich verarbeitet es Partner- und Kundenstammdaten, Leads, Rechnungen und Provisionen, Kalender, Direktnachrichten und Karrieresystem-Daten. **A10 deckt ausdrücklich nur den Lernbereich ab, nicht das Portal selbst.** → nachzutragen.
- **Rechtsgrundlage von A10** (Art. 6(1)b) ist eine vorläufige Einordnung und vom Anwalt zu bestätigen.

## Pflegehinweise
- Bei **neuem Subunternehmer**: hier + AVV Anhang 2 ergänzen, Kunden 14 Tage vorab informieren (AVV §9).
- Bei **Anbieterwechsel** (z. B. TTS weg von MiniMax): Zeilen A6/Teil B + Datenschutzerklärung §11 + AVV Anhang 2 angleichen.
- Bei **Recording-Änderung**: A6, Löschkonzept und DSE §11 anpassen.
