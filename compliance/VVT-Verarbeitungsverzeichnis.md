# Verzeichnis von Verarbeitungstätigkeiten (Art. 30 DSGVO)

**Verantwortlicher / Auftragsverarbeiter:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Gesellschafter: Maximilian Trenk, Jason Brian Merklein · Kontakt Datenschutz: mbt@nex-a-i.com
**Stand:** September 2026 · **Aufsichtsbehörde:** LfDI Baden-Württemberg
**Drittland-Folgenabschätzungen** liegen vor: [Vapi](TIA-Vapi-Drittlandtransfer.md) (deckt Soniox mit ab) · [OpenAI](TIA-OpenAI-Drittlandtransfer.md) · [Resend](TIA-Resend-Drittlandtransfer.md) — für Resend greift Art. 45 (DPF), die SCC-Bewertung liegt als Rückfall bei.

> ⚠️ **Kein Rechtsrat.** Vorlage zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2, Art. 30 DSGVO). Laufend fortschreiben; vor Verwendung vom DSB/Anwalt prüfen lassen. Löschfristen = interne Defaults, mit der Datenschutzerklärung abgeglichen.

Empfänger-Kürzel (Drittland-Mechanismus): **Resend** (US, **DPF** — hilfsweise SCC) · **Google** IE/US (DPF/SCC) · **OpenAI** IE/US (**SCC, nicht DPF-zertifiziert** — Prüfung 06.09.2026; No-Training) · **Vapi** (US, SCC+TIA — Orchestrierung **und** Sprachsynthese) · **Soniox** (US, STT, Unterauftragsverarbeiter von Vapi, SCC+TIA über den Vapi-DPA) · **easybell** (DE) · **Hetzner** (DE, Server der **Website**, der self-hosted n8n **und des NexAI-CRM**) · **NexAI-CRM** (self-hosted, DE — eigene zentrale Kundenverwaltung, keine Drittlandübermittlung) · **Explorium** (Datenprovider) · **Web-Push-Infrastruktur** der Browserhersteller (Google/Apple/Mozilla, i. d. R. US — nur Endpunkt und Benachrichtigungsinhalt, siehe A11).

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

---

## Portal app.nex-a-i.com (A11–A18)

*Selbst betriebene PWA auf dem Hetzner-Server (DE), Postgres. Rollen: `admin`, `manager`, `vertriebsleiter`, `kommunikationsleiter`, `partner`, `empfehlungsgeber`, `customer`, `privat`. Grundlage der folgenden Einträge ist das Datenbankschema (`nexai-portal/db/schema.ts`, 40 Tabellen, Stand 06.09.2026), nicht eine Beschreibung. Der Lernbereich `privat` steht getrennt als **A10**.*

> ⚠️ **Übergreifende Lücke:** Das Portal hat **keine eigenen Datenschutzhinweise**, obwohl die Website-DSE für app.nex-a-i.com welche zusagt. Es gibt bislang nur den unveröffentlichten Entwurf für den Lernbereich. → offener Punkt.

### A11 Portal — Nutzerkonten, Zugang und Protokollierung
- **Zweck:** Anmeldung, Rechteverwaltung, Sicherheitsprotokoll, Systemmitteilungen, Push-Benachrichtigungen. **Betroffene:** Portalnutzer (Mitarbeitende, Vertriebspartner, Kunden, eine Privatperson). **Daten:** `users` (E-Mail, Passwort-Hash, Rolle, Name, Sprache, Rechte-Schlüssel, Profilbild, Akzentfarbe, Kalender-Abo-Kennung, letzte Anmeldung, Anlegender); `sessions` (Token-Hash, Ablauf); `audit_log` (handelnder Nutzer, Aktion, betroffener Datensatz, Zusatzangaben); `announcements`; `push_subscriptions` (Endpunkt, Schlüssel `p256dh`/`auth`).
- **Rechtsgrundlage:** Art. 6(1)b (Nutzungs-/Vertragsverhältnis), Art. 6(1)f (Protokollierung, Missbrauchsschutz). **Empfänger:** Hetzner (DE). **Für Web-Push zusätzlich die Push-Infrastruktur des jeweiligen Browserherstellers** (Google, Apple, Mozilla — i. d. R. **US**); übermittelt werden Endpunkt und Nachrichteninhalt der Benachrichtigung. **Drittland:** nur Web-Push (US). **Löschung:** mit dem Konto; Sitzungen mit Ablauf; **für das Protokoll ist keine Frist festgelegt**.
- **Besonderheiten:** **Keine Zwei-Faktor-Anmeldung** — im Schema und im Code nicht vorhanden (geprüft 06.09.2026). Steht als P1 in den Datenschutz-To-dos und ist hier als offene Maßnahme zu führen, nicht als vorhandene.

### A12 Portal — Vertriebspartner: Stammdaten, Karrieresystem, Provisionen
- **Zweck:** Verwaltung selbstständiger Vertriebspartner, Abbildung des Karrieresystems, Berechnung und Nachverfolgung von Provisionen. **Betroffene:** Vertriebspartner (Setter, Closer, Vertriebs-/Kommunikationsleiter, Empfehlungsgeber). **Daten:** `partners` (Partnernummer, Name, Firma, E-Mail, Telefon, Anschrift, **Steuernummer/USt-IdNr., IBAN, BIC, Bankname**, Provisionssätze, Funktion und Stufe, Senior-Zeitraum, Beginn der Probezeit, zugeordneter Closer, CRM-Verweis); `commissions` (Zeitraum, Bemessungsgrundlage, Satz, erwarteter Betrag, Status); `documents` (Partnerunterlagen: Kategorie, Datei, Hochladender).
- **Rechtsgrundlage:** Art. 6(1)b (Vertriebspartnervertrag), Art. 6(1)c (steuer-/handelsrechtliche Pflichten). **Empfänger:** Hetzner (DE); Zahlungsdaten mittelbar Bank/Steuerberater. **Drittland:** keines. **Löschung:** mit Vertragsende, soweit keine gesetzlichen Fristen entgegenstehen; Abrechnungsrelevantes über A14.
- **Besonderheiten:** **Bankverbindungen liegen im Portal.** Stufe, Senior-Status und Probezeit sind **leistungsbezogene Daten** über Selbstständige — kein Beschäftigtendatenschutz, aber erhöhte Sorgfalt. Die Upline-Beziehung (`closerPartnerId`) macht Leistung innerhalb der Struktur sichtbar.

### A13 Portal — Kunden- und Auftragsverwaltung
- **Zweck:** Führung der Kundenstammdaten und Aufträge, Zuordnung zu Vertriebspartnern. **Betroffene:** Kunden und deren Ansprechpartner. **Daten:** `customers` (Kundennummer, Firma, Ansprechpartner, E-Mail, Telefon, Anschrift, Status, **Notizen**, CRM-Verweise, zugeordneter Partner); `orders` (Produkt, Beschreibung, Beträge, Laufzeit, Status, Setter/Closer, Provisionssätze, Kündigungszeitpunkt).
- **Rechtsgrundlage:** Art. 6(1)b. **Empfänger:** Hetzner (DE), **NexAI-CRM** (self-hosted DE, Abgleich über `crm_outbox`). **Drittland:** keines. **Löschung:** mit Vertragsende, soweit keine gesetzlichen Fristen entgegenstehen.
- **Besonderheiten:** Das Freitextfeld `notes` ist inhaltlich nicht begrenzt — besondere Kategorien sind dort nicht ausgeschlossen.

### A14 Portal — Rechnungen und Provisionsabrechnung
- **Zweck:** Ausstellung und Verwaltung von Kundenrechnungen und Partner-Provisionsabrechnungen. **Betroffene:** Kunden, Vertriebspartner. **Daten:** `invoices` (Art, Nummer, Ausstellungs-/Fälligkeitsdatum, Abrechnungsmonat, Nettobetrag, Steuersatz und Rechtsgrund bei 0 %, Status, Zahlungseingang, Notizen, **hinterlegte PDF-Datei**, Hochladender). Die Partner-IBAN kommt aus A12 in die Rechnung.
- **Rechtsgrundlage:** Art. 6(1)b; **Art. 6(1)c** (§ 14 UStG, § 147 AO). **Empfänger:** Hetzner (DE), Kunde bzw. Partner als Rechnungsempfänger, mittelbar Steuerberater. **Drittland:** keines. **Löschung:** **8 Jahre**, gerechnet ab Schluss des Kalenderjahres (§ 14b Abs. 1 UStG, § 147 Abs. 1 Nr. 4 i. V. m. Abs. 3 und 4 AO in der Fassung des Vierten Bürokratieentlastungsgesetzes). **Technisch erzwungen** — `nexai-portal/lib/retention.ts`, Prüfung beim Löschen in `app/actions/invoices.ts`.
- **Besonderheiten:** Bewusst **acht** statt zehn Jahre: längeres Aufbewahren als nötig verstößt gegen Art. 5(1)e DSGVO. Rechnungsnummern sind gegen Doppelvergabe gesperrt.

### A15 Portal — Leadlisten, Lead-Bearbeitung und Anrufdokumentation
- **Zweck:** Verteilung und Bearbeitung von Akquise-Leads, Dokumentation der Anrufversuche und Ergebnisse. **Betroffene:** **Dritte** — angesprochene Unternehmen und deren Ansprechpartner (B2B); zusätzlich die bearbeitenden Vertriebspartner. **Daten:** `lead_lists` (Name, Beschreibung, Ersteller, **Eigentümer** — private Listen); `leads` (Firma, Ansprechpartner, Telefon, E-Mail, Website, Ort, **Notiz und Gesprächsnotiz**, Status, Versuche, Wiedervorlage, letzter Anruf und Anrufer, Beanspruchung, Umwandlung in einen Kunden); `lead_calls` (Lead, **Nutzer und Partner**, Ergebnis, erreicht ja/nein, Zeitpunkt, **Dauer**, verknüpfter Termin).
- **Rechtsgrundlage:** Art. 6(1)f (Direktansprache im B2B-Umfeld, Dokumentation) — **Abwägung dokumentieren**; § 7 UWG für die Ansprache selbst ist gesondert zu beachten. **Empfänger:** Hetzner (DE), **NexAI-CRM** (self-hosted DE). **Drittland:** keines. **Löschung:** **keine Frist festgelegt** → nachzuholen.
- **Besonderheiten:** Betroffene sind hier **nicht Vertragspartner**, sondern Angesprochene — Informationspflicht nach **Art. 14 DSGVO** und Herkunft der Daten sind zu klären. `lead_calls` erfasst zugleich, **wer wie lange wen angerufen hat** — Leistungsdaten über Selbstständige.

### A16 Portal — Termine, Kalender und Kalenderfreigaben
- **Zweck:** Terminverwaltung, Erinnerungen, Freigabe des eigenen Kalenders an andere Portalnutzer, Kalender-Abo und Google-Abgleich. **Betroffene:** Portalnutzer, Kunden und deren Ansprechpartner, eingeladene Gäste. **Daten:** `appointments` (Zuständiger, Ersteller, Titel, Kunde, **Ansprechpartner mit E-Mail und Telefon**, Zeitraum, Status, Kategorie, Produkt, **Besprochenes und Notizen**, Ort, Sichtbarkeit, Herkunft, Google-Ereigniskennung, Erinnerung, Serie); `appointment_guests` (Nutzer, E-Mail); `calendar_shares` (Eigentümer, Betrachter, Status); `google_connections` (**Google-Adresse, verschlüsseltes Refresh-Token**).
- **Rechtsgrundlage:** Art. 6(1)b, Art. 6(1)f. **Empfänger:** Hetzner (DE); **Google Ireland Ltd / Google LLC** bei verbundenem Kalender. **Drittland:** IE/US — **Art. 45 (DPF, Google LLC aktiv zertifiziert, geprüft 06.09.2026)**, ergänzend SCC. **Löschung:** keine Frist festgelegt → nachzuholen.
- **Besonderheiten:** Kalenderfreigaben machen Termininhalte **anderen Portalnutzern** sichtbar; die Sichtbarkeitsstufe je Termin steuert das. Das Google-Refresh-Token liegt verschlüsselt.

### A17 Portal — Interne Kommunikation und Support
- **Zweck:** Support-Vorgänge mit Kunden, Team-Kanal, Direktnachrichten zwischen Portalnutzern. **Betroffene:** Portalnutzer, Kunden-Ansprechpartner. **Daten:** `threads` (Kunde, Ersteller, Betreff, Status); `messages` (Absender und dessen Rolle, **Nachrichtentext, Dateianhang**, Lesevermerke); `channel_messages` (Absender, Name, Rolle, Text); `direct_messages` (Absender, Empfänger, **Text**, Lesevermerk).
- **Rechtsgrundlage:** Art. 6(1)b (Support), Art. 6(1)f (interne Zusammenarbeit). **Empfänger:** Hetzner (DE). **Drittland:** keines. **Löschung:** **keine Frist festgelegt** → nachzuholen.
- **Besonderheiten:** **Direktnachrichten sind private Kommunikation** zwischen Nutzern. Ein Portal-Admin hat über den Datenbankzugang technisch Zugriff; eine Regelung dazu gibt es nicht. Der Lernbereich (`privat`) ist von Team-Kanal, Direktnachrichten und Support ausdrücklich ausgeschlossen.

### A18 Portal — Wissens-Bibliothek
- **Zweck:** Bereitstellung von Schulungs- und Vertriebsunterlagen. **Betroffene:** hochladende Nutzer; Personen, die in Unterlagen vorkommen. **Daten:** `library_folders` (Name, Beschreibung, Sichtbarkeit, Ersteller); `library_files` (Titel, Beschreibung, Datei, Hochladender, **Eigentümer** — private Dateien seit 03.09.2026).
- **Rechtsgrundlage:** Art. 6(1)f (Bereitstellung von Arbeitsmitteln). **Empfänger:** Hetzner (DE). **Drittland:** keines. **Löschung:** durch den Eigentümer; keine Frist.
- **Besonderheiten:** Private Dateien sind nur für den Hochladenden sichtbar, auch nicht für die Leitung. Dateien liegen außerhalb des Web-Wurzelverzeichnisses und werden über eine geprüfte Ausgabe-Route ausgeliefert.

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

*Das Portal ist mit A11–A18 nachgetragen (06.09.2026). Beim Eintragen sind folgende Punkte aufgefallen — sie stehen hier, damit sie nicht in den Einträgen untergehen.*

**🔴 Fehlende Löschfristen.** Für **A15 (Leads und Anrufdokumentation)**, **A17 (interne Kommunikation)** und **A16 (Termine)** ist **keine Frist festgelegt**; auch das Sicherheitsprotokoll in A11 wächst unbegrenzt. Art. 5(1)e DSGVO verlangt eine Grenze. Einzig A14 (Rechnungen, 8 Jahre) ist technisch erzwungen — das ist der Maßstab für die übrigen.

**🔴 Keine eigenen Datenschutzhinweise für das Portal.** Die Website-DSE sagt für app.nex-a-i.com eigene Hinweise zu. Es existiert nur ein **unveröffentlichter Entwurf für den Lernbereich**; für Partner, Kunden und Mitarbeitende gibt es nichts.

**🔴 Art. 14 bei Leads (A15).** Die angesprochenen Unternehmen und Ansprechpartner sind **keine Vertragspartner** und haben ihre Daten nicht selbst gegeben. Informationspflicht, Herkunft der Daten und die Abwägung nach Art. 6(1)f sind zu dokumentieren; § 7 UWG betrifft die Ansprache selbst.

**🟠 Keine Zwei-Faktor-Anmeldung im Portal** (A11) — im Schema und im Code nicht vorhanden, geprüft 06.09.2026. Das Portal führt Bankverbindungen (A12) und Rechnungen (A14). Steht als P1 in den Datenschutz-To-dos.

**🟠 Zugriff der Betreiber auf private Inhalte.** Direktnachrichten (A17) und der Lernbereich (A10) sind gegenüber anderen Nutzern abgeschottet, nicht gegenüber jemandem mit Datenbankzugang. Eine schriftliche Regelung dazu fehlt.

**🟠 Freitextfelder ohne Grenze.** `customers.notes` (A13), `leads.note`/`callNote` (A15), Termin-Notizen (A16) und die Lernunterlagen (A10) können besondere Kategorien enthalten, ohne dass etwas es verhindert.

**🟡 Rechtsgrundlage von A10** (Art. 6(1)b) ist eine vorläufige Einordnung und vom Anwalt zu bestätigen.

## Pflegehinweise
- Bei **neuem Subunternehmer**: hier + AVV Anhang 2 ergänzen, Kunden 14 Tage vorab informieren (AVV §9).
- Bei **Anbieterwechsel** (z. B. TTS weg von MiniMax): Zeilen A6/Teil B + Datenschutzerklärung §11 + AVV Anhang 2 angleichen.
- Bei **Recording-Änderung**: A6, Löschkonzept und DSE §11 anpassen.
