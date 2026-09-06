# Datenschutz-Fragenkatalog V–IX — konsolidiert über alle Systeme

**Verantwortlicher:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Gesellschafter: Maximilian Trenk, Jason Brian Merklein · Datenschutz: mbt@nex-a-i.com
**Stand:** August 2026 · **Aufsichtsbehörde:** LfDI Baden-Württemberg

> **Kein Rechtsrat.** Technisch-organisatorische Bestandsaufnahme des *tatsächlich implementierten* Zustands (Quellcode + Konfiguration, nicht nur Konzept-Doku). Rechtliche Einordnung/Formulierung dem Anwalt/DSB überlassen. Wo Konzept und Code auseinanderfallen oder ein Punkt bei uns noch in Umsetzung ist, ist das **ausdrücklich vermerkt** — bitte nicht überlesen, diese Punkte sind für eine belastbare Doku entscheidend.

## Vorbemerkung: drei getrennte Systeme

Diese Beantwortung erweitert die website-bezogene Fassung (`Datenschutz-Fragenkatalog-Beantwortung.md`) um zwei erst am 09.08.2026 produktiv gegangene Eigen-Systeme. Für die Datenschutz-Doku sind **drei technisch getrennte Verarbeitungsumgebungen** zu unterscheiden:

| System | URL | Hosting | Rolle NexAIs | Zweck |
|---|---|---|---|---|
| **Website** | nex-a-i.com | Vercel (US) | Verantwortlicher | Marketing, Formulare, Chat, Terminbuchung, KI-Telefon |
| **CRM** | crm.nex-a-i.com | Hetzner (DE), Docker | Verantwortlicher (eigene Leads/Kunden) *und* Auftragsverarbeiter (Kundendaten aus KI-Agenten) | Zentrale Kontakt-/Lead-/Anruf-Verwaltung |
| **Portal** | app.nex-a-i.com | Hetzner/Coolify (DE), Docker | Verantwortlicher | Auftrags-, Rechnungs-, Provisions- und Support-Verwaltung für Partner & Kunden |

Die Website ist **zustandslos** (keine eigene Datenbank) und reicht nur durch. CRM und Portal sind die beiden Systeme mit **eigener Datenhaltung** (jeweils PostgreSQL auf deutschen Hetzner-Servern).

---

## V. Datenübermittlung und Empfänger

### 1. Interne Stellen mit Zugriff

- **Grundsatz:** NexAI hat **keine Angestellten** — nur die zwei Gesellschafter (Maximilian Trenk, Jason Brian Merklein). Vollen administrativen Zugriff auf alle drei Systeme haben ausschließlich sie.
- **CRM:** Zugriff rollenbasiert (RBAC) und mandantengetrennt (Row-Level-Security, s. IX). In der Eigennutzung greifen die Gesellschafter als Admins zu.
- **Portal:** vier Rollen mit gestuftem Zugriff — `admin` (Gesellschafter, Vollzugriff), `manager` (eingeschränkter Verwaltungszugriff, nur freigeschaltete Bereiche und selbst angelegte Konten), `partner` und `customer` (Selbstzugriff nur auf **eigene** Daten). Löschrechte ausschließlich `admin`.

### 2. Gemeinsame Verantwortlichkeit (Art. 26)

- **Website & Portal:** keine gemeinsame Verantwortlichkeit.
- **CRM:** Für im Kundenauftrag betriebene KI-Agenten sind wir **Auftragsverarbeiter** des Kunden (nicht gemeinsam verantwortlich); Rollen in AVV §15. Für unsere **eigenen** Leads/Kunden im CRM sind wir Verantwortlicher.
- **⚠️ Neu zu bewerten — Vertriebspartner:** Selbstständige Vertriebspartner (z. B. Connor Reimann) erhalten über das **Portal** Zugriff auf Daten der ihnen zugeordneten Kunden (Firmenname, Ansprechpartner, Auftrags- und Provisionsdaten). Das ist eine **Übermittlung an einen externen Empfänger**. Ob der Partner insoweit eigener Verantwortlicher, Empfänger oder Auftragsverarbeiter ist, **bitte rechtlich einordnen** — im Partnervertrag ggf. eine Datenschutz-/AV-Klausel ergänzen.

### 3./4. Externe Dienstleister / Auftragsverarbeiter

**A) Website** (unverändert, s. bestehende Fassung): Vercel (US/DPF), Resend (US/DPF), OpenAI (IE/US), Google (IE/US), Vapi (US/SCC), Deepgram (US/SCC), easybell (DE), Hetzner (DE).

**B) CRM (crm.nex-a-i.com)**

| Empfänger | Funktion | Sitz | Rolle | AVV-Status |
|---|---|---|---|---|
| **Hetzner Online GmbH** | Server/Compute/Storage — **alle CRM-Daten liegen hier** (PostgreSQL 16, Redis 7, Backups) | **DE** (Falkenstein/Nürnberg) | Auftragsverarbeiter | ✅ AVV im Kundenpanel |
| **Vapi, Inc.** | Voice-Orchestrierung (Anruf→Kontakt/Call) | US | Unterauftragsverarbeiter | ✅ DPA abgeschlossen |
| ~~**Deepgram, Inc.**~~ | ~~Speech-to-Text (via Vapi)~~ | ~~US~~ | — | **nicht mehr im Einsatz** (Stand 06.09.2026) |
| **OpenAI** | LLM + TTS (via Vapi) | IE/US | Unterauftragsverarbeiter | ✅ Self-Serve-DPA |
| **easybell GmbH** | SIP-Telefonie | **DE** | TK-Anbieter (§ 88 TKG) | i. d. R. kein AVV nötig |
| **SMTP-Versand (Alerting)** | System-/Fehler-Benachrichtigungen an die Gesellschafter | je Provider | Auftragsverarbeiter | ⏳ zu klären, welcher SMTP |
| Telegram / Slack (optional) | technische Alerts (kein Kunden-PII vorgesehen) | US | — | nur falls aktiviert |
| GlitchTip (self-hosted) | Error-Tracking, redigierte Logs (kein PII) | **DE** | intern | — |
| n8n (self-hosted) | Automatisierung Lead-Eingang (`/api/leads`) | **DE** | intern | — |

> PostgreSQL, Redis und n8n laufen auf einem **internen Docker-Netz ohne nach außen offene Ports**; nur der Reverse-Proxy (Traefik) ist erreichbar.

**C) Portal (app.nex-a-i.com)**

| Empfänger | Funktion | Sitz | Rolle | AVV-Status |
|---|---|---|---|---|
| **Hetzner / Coolify** | Server/Hosting, Container, **DB-Volume (Uploads)** | **DE** *(Standort bestätigen — s. Klärungsbedarf)* | Auftragsverarbeiter | ⏳ Hetzner-AVV; Coolify self-hosted |
| **PostgreSQL 16** | Primärdatenbank (alle Portal-Daten) | **DE** | (Teil der Hetzner-Infrastruktur) | — |
| **Resend, Inc.** | Transaktions-E-Mail: Zugangsdaten-Mail, Provisions-/Rechnungs-Benachrichtigung, Admin-Info | US (DPF) | Auftragsverarbeiter | ⏳ DPA |
| **Browser-Push-Dienste** (Apple/Google/Mozilla) | Zustellung von Web-Push-Benachrichtigungen (gespeicherter Endpoint) | je Hersteller | Empfänger/Unterauftragsverarbeiter | ⏳ zu erfassen |
| **Steuerberater** *(extern)* | Rechnungs-/Buchhaltungsdaten (§ 147 AO) | DE | eigener Verantwortlicher / Empfänger | Übermittlung dokumentieren |
| **Bank** *(extern)* | Zahlungsverkehr (SEPA) | DE | eigener Verantwortlicher | — |
| GitHub (privat) | Quellcode-/Deploy (keine Laufzeit-PII) | US | — | — |

> **Speicherort hochgeladener Dateien (Portal):** Rechnungen, Partner-Belege und Profilfotos liegen auf einem **lokalen, gemounteten Volume** (`/app/.data/uploads`) auf dem Hetzner-Server — **kein** externer Objektspeicher. Zufalls-Dateinamen, außerhalb des Webroots, Zugriff nur über zugriffsgeschützte Endpunkte.

### 5. Drittstaatenübermittlung

- **CRM & Portal-Kerndaten:** liegen **ausschließlich in Deutschland** (Hetzner) → keine Drittlandübermittlung des Datenbestands.
- **US-Übermittlungen** entstehen nur an den o. g. Diensten:
  - **DPF / Art. 45** (Angemessenheitsbeschluss): Vercel, Resend, OpenAI, Google.
  - **SCC / Art. 46 + TIA**: Vapi (kein DPF). Deepgram ist nicht mehr im Einsatz.
- **China entfällt** — die frühere Sprachsynthese über MiniMax wurde auf OpenAI umgestellt.
- **Web-Push:** Endpoints/Zustellung laufen über die Push-Infrastruktur des jeweiligen Browserherstellers (i. d. R. US) — für die Doku als Empfänger aufnehmen.

---

## VI. Speicherdauer und Löschung

### 1./2. Speicherfristen und Kriterien

**A) Website / KI-Agenten** (Regelfristen, Kriterium = Zweckfortfall bzw. gesetzliche Pflicht):
Kontakt-/Partneranfragen bis Bearbeitungsabschluss · Leads 6 Monate · Termine (Online-Buchung) 12 Monate · Chatverläufe 6 Monate · Termine (Telefon) 6 Monate · Newsletter bis Widerruf · Server-/Zugriffslogs 30 Tage · **Anrufe: keine Aufzeichnung** · Vertrags-/Rechnungsdaten 8/10 Jahre (§ 147 AO, § 257 HGB).

**B) CRM** (Konzept-Defaults laut `docs/DATA_RETENTION.md`):
Kontakt 12 Monate · Lead 6 Monate · Anruf-Metadaten 6 Monate (danach Anonymisierung) · **Transkript 7 Tage / standardmäßig aus** · **Audio wird nicht gespeichert** · technische Logs 30 Tage · Audit-Log ~12 Monate.

**C) Portal** (Geschäftsdaten):
Nutzer-/Login-Konten, Partner-/Kunden-Stammdaten: für die Dauer der Geschäftsbeziehung · Aufträge/Rechnungen/Provisionen: gesetzliche Aufbewahrung 8/10 Jahre (§ 147 AO, § 257 HGB) · Sitzungen (Sessions): 30 Tage · Support-Nachrichten/Chat: derzeit **keine definierte Frist** · Push-Abos: bis Abbestellung/Ablauf.

### 3. Löschung — Umsetzungsstand (ehrlich)

- **CRM:** Es existiert eine **automatische Retention-Engine** (Poller, alle 10 Min., mandantenübergreifend privilegiert), die die Entitäten Kontakt, Anruf, Lead, Termin sowie Transkripte per Aktion `soft_delete / hard_delete / anonymize / pseudonymize` bereinigt und jeden Löschvorgang auditiert. Betroffenen-Löschungen (Art. 17) laufen zusätzlich sofort über die DSR-Funktion.
  **⚠️ Einschränkungen für die Doku:**
  1. Die Engine löscht **nur, wenn pro Mandant eine Retention-Policy aktiv gesetzt ist** — es werden **keine Default-Fristen automatisch geseedet**. Ohne konfigurierte Policy passiert nichts. Die „Default-Fristen"-Tabelle oben ist damit **Konzept, kein automatischer Code-Default** (Umsetzung: Policies pro Mandant anlegen).
  2. Vom automatischen Sweep **nicht** erfasst: Deals/Firmen, System-Events, Custom-Fields, Audit-Logs.
  3. Nach einem Backup-Restore werden zwischenzeitliche Löschungen **nicht automatisch erneut angewandt** — das ist ein manueller Schritt.
- **Portal:** **Keine** automatische Löschung/Retention (kein Cron, keine Frist im Code). Löschungen erfolgen **manuell durch den Admin**. Zusätzlich verhindern **Referenz-Sperren**, dass ein Kunde/Partner/Auftrag gelöscht wird, solange abhängige Datensätze (Aufträge, Rechnungen, Logins) bestehen → in der Praxis mehrstufige manuelle Löschung. Ein gelöschtes Login löscht **nicht** automatisch den zugehörigen Stammdatensatz.
  **⚠️ Wichtig:** Die handels-/steuerrechtliche **10-Jahres-Aufbewahrung für Rechnungen ist technisch nicht erzwungen** — Rechnungen (inkl. hochgeladener PDF) können vom Admin jederzeit gelöscht werden; es gibt keine Aufbewahrungssperre (GoBD/§ 147 AO). Bitte organisatorisch absichern.
- **Website / Google / n8n:** Die automatisierte Umsetzung der Löschfristen in Kalender/Tabellen sowie das Pruning der n8n-Execution-History sind **noch in Umsetzung**.

---

## VII. Betroffenenrechte

### 1. Information

In der Datenschutzerklärung wird über alle Rechte informiert: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20), Widerspruch (Art. 21), Widerruf von Einwilligungen (Art. 7 Abs. 3) sowie Beschwerderecht bei der Aufsichtsbehörde (**LfDI Baden-Württemberg**).

### 2. Ausübung

Formlos per **E-Mail an mbt@nex-a-i.com** (alternativ postalisch); Bearbeitung innerhalb der gesetzlichen Frist (grundsätzlich ein Monat). Ergänzend nach System:

- **CRM — technische Unterstützung vorhanden:** dedizierte DSR-Funktionen im Backend (jeweils POST, Identifier nie in der URL, jede Aktion auditiert):
  - **Auffinden** aller Datensätze zu einer Person (`/dsr/locate`),
  - **Auskunft/Übertragbarkeit** (Art. 15/20) als **Export in JSON oder CSV** über Kontakte, Anrufe, Transkripte, Leads, Deals, Events, Custom-Fields (`/dsr/export`),
  - **Löschung** (Art. 17) durch modulübergreifende **Anonymisierung/Entkopplung** in einer Transaktion (`/dsr/erase`); ein **Legal-Hold** hat Vorrang und blockiert die Löschung nachweisbar.
  Berichtigung (Art. 16) über die normalen Bearbeitungsfunktionen; Einschränkung (Art. 18) über das Legal-Hold-Flag. Dedizierte Endpunkte für Art. 16/18/21 bestehen nicht (organisatorisch abgedeckt).
- **Portal — überwiegend manuell:** **Berichtigung** als Self-Service (eingeloggte Nutzer ändern eigene Stamm-/Kontaktdaten). **Auskunft/Export/Löschung** haben **keine** eigene Self-Service-Funktion → werden **manuell** durch den Admin (bzw. direkt in der Datenbank) bearbeitet.
- **Website:** keine eigene Datenhaltung; Anfragen werden an das jeweils speichernde System (CRM/Google/Postfach) durchgereicht.

---

## VIII. Besondere Kategorien von Daten (Art. 9)

### 1. Verarbeitung

**Keine gezielte Verarbeitung besonderer Kategorien** in keinem der drei Systeme. Das Datenmodell von CRM und Portal enthält **keine** Felder zu Gesundheit, Biometrie, ethnischer Herkunft, politischer/religiöser/gewerkschaftlicher Zugehörigkeit oder Sexualleben. (Die Portal-Belegkategorie „hospitality" = **Bewirtungsbelege/Spesen**, keine Gesundheitsdaten.)

**Restrisiko Freitext:** Chat, Telefonassistent sowie Freitextfelder (CRM-Notizen; Portal `notes`, Support-Nachrichten) lassen freie Eingaben zu — ein Nutzer könnte solche Angaben theoretisch von sich aus machen. Sie werden **nicht angefordert, nicht gezielt ausgewertet** und unterliegen den allgemeinen Löschfristen.

**Zusätzliche technische Schutzmaßnahme (CRM):** Für sensible Branchen ist ein **Sensitivitäts-Riegel** implementiert — Mandanten mit `sensitivity='high'` (Gesundheit/Recht/Finanzen) werden vom US-Voice-Pfad im Code **blockiert** (Ausnahme wird geworfen, per Test abgesichert).

### 2. Rechtsgrundlage

Entfällt mangels gezielter Verarbeitung. Sollte im Einzelfall eine Verarbeitung besonderer Kategorien erforderlich werden, ausdrückliche **Einwilligung (Art. 9 Abs. 2 lit. a)** + vorherige Rechtsprüfung + ggf. AVV-Anpassung/DSFA.

---

## IX. Technische und organisatorische Maßnahmen (TOMs)

### 1. Umgesetzte Maßnahmen je System

**A) Website**
TLS/HTTPS durchgängig · Rate-Limiting + geheimer Header-Schlüssel + HMAC-Signatur auf den serverseitigen Schnittstellen · Honeypot-Felder gegen Bots · keine Cookies/kein Tracking · self-hosted Schriften · keine eigene Datenhaltung (Datenminimierung).

**B) CRM** (im Code belegt)

| Maßnahme | Status |
|---|---|
| **Mandantentrennung** per PostgreSQL Row-Level-Security (`force row level security`, fail-closed) | ✅ DB-erzwungen |
| **Least-Privilege-DB-Rollen** (App-Rolle ohne Superuser/BYPASSRLS; separater Migrations-User) | ✅ |
| **RBAC** (Rollen-/Rechte-Prüfung serverseitig) | ✅ |
| **Passwort-Hashing: argon2id** | ✅ |
| **MFA: TOTP (RFC 6238)** implementiert | ✅ implementiert · ⚠️ Admin-**Zwang** in Produktion derzeit **deaktiviert** (`MFA_ENFORCE_ADMIN=false`, bewusste, reversible Betriebsentscheidung) |
| **Verschlüsselung sensibler Felder** AES-256-GCM | ⚠️ implementiert, aber **nur für MFA-Secrets** verdrahtet — Transkript-/Notizinhalte werden **nicht** feldverschlüsselt (in der Praxis entschärft, da Transkription in Vapi deaktiviert ist → i. d. R. keine Transkripte) |
| **Append-only Audit-Log** (App-Rolle nur INSERT+SELECT) | ✅ |
| **TLS in transit** (Traefik + Let's Encrypt) | ✅ |
| **Backups** (`pg_dump` → gzip → **age-verschlüsselt**, EU/Hetzner Storage Box, Aufbewahrung ~30 Tage) | ✅ |
| **Webhook-Signaturen** (HMAC inbound Vapi + signierte outbound Webhooks) | ✅ |
| **Server-Sessions** (httpOnly/Secure/SameSite, TTL 12 h) | ✅ |
| **Login-Rate-Limit / Brute-Force-Lockout** | ✅ |
| **Alerting** bei Fehlern (E-Mail/Telegram/Slack) | ✅ |
| DB/Redis/n8n ohne offene Host-Ports (nur Proxy erreichbar) | ✅ |

**C) Portal** (im Code belegt)

| Maßnahme | Status |
|---|---|
| **TLS/HTTPS** (Let's Encrypt via Coolify) | ✅ |
| **Passwort-Hashing: bcrypt** (Kostenfaktor 11), Mindestlänge 8, erzwungener Wechsel bei Erst-Login | ✅ |
| **Sitzungen:** opakes 32-Byte-Token, in der DB nur als **SHA-256-Hash**, Cookie httpOnly/Secure/SameSite=lax, 30 Tage | ✅ |
| **RBAC** (4 Rollen, serverseitige Guards, Löschen nur Admin) | ✅ |
| **Zugriffskontrolle/Mandantentrennung:** Partner sieht nur eigene, Kunde nur eigene Rechnungen/Belege (sonst 403); Support-Threads streng zugriffsgeprüft | ✅ sauber umgesetzt |
| **Upload-Härtung:** Allowlist (pdf/png/jpeg/webp), 10 MB-Limit, Zufallsdateinamen, Path-Traversal-Schutz, Auslieferung `Cache-Control: private, no-store` | ✅ |
| **Eingabevalidierung** durchgängig (Zod) | ✅ |
| **Audit-Log** (append-only) | ⚠️ „best effort", deckt nur **einen Teil** der Vorgänge ab (u. a. keine Lese-/Download-Protokollierung, keine Upload-Protokollierung) |
| **MFA / 2FA** | ❌ **nicht vorhanden** |
| **Login-Rate-Limit / Account-Lockout** | ❌ **nicht vorhanden** |
| **DB-Verschlüsselung in transit** | ⚠️ im Code **nicht** konfiguriert (läuft über internes Coolify/Hetzner-Netz) |
| **Backups** | ⚠️ **nicht im Repo** — rein operativ über Coolify/Hetzner (extern zu bestätigen/dokumentieren) |
| **Zugangsdaten-Mail** enthält **Initialpasswort im Klartext** (via Resend), Pflicht-Wechsel beim ersten Login | ⚠️ Datenschutz-/Sicherheitshinweis (s. Klärungsbedarf) |

### 2. Integrität, Vertraulichkeit, Verfügbarkeit

- **Vertraulichkeit:** Zugriffsbeschränkung (RBAC, RLS im CRM), Verschlüsselung im Transport, Least-Privilege-DB-Rollen, keine offenen DB-Ports.
- **Integrität:** serverseitige Validierung (Zod), append-only Audit-Logs, signierte Webhooks, kontrollierte Schnittstellen.
- **Verfügbarkeit:** verschlüsselte Backups (CRM: age-verschlüsselt, EU); Managed-Infrastruktur (Hetzner/Coolify/Vercel/Google). **Hinweis:** CRM und Portal laufen jeweils als **Single-Node ohne Hochverfügbarkeit** — Node-Ausfall bedeutet Downtime bis zum Restore (bewusster, akzeptierter Trade-off).

### In Umsetzung / Härtung
Website: HMAC-Webhooks, Rotation des Automatisierungs-API-Schlüssels, n8n-Verlaufs-Pruning. · CRM: Retention-Policies pro Mandant produktiv setzen; Feldverschlüsselung für sensible Inhalte erweitern. · Portal: MFA + Login-Lockout ergänzen; DB-TLS erzwingen; Backup-Konzept dokumentieren; Audit-Abdeckung erweitern; Zugangsdaten-Mail entschärfen.

---

## Klärungs- & Handlungsbedarf (für Max / Anwalt / Config)

**🔴 vor Weitergabe an den Anwalt klären**
1. **Lead-Speicherung Chat/Termin — Widerspruch:** DSE §9/§10 und VVT sagen „self-hosted CRM (DE)". Die im Website-Repo liegenden **n8n-Workflows schreiben Chat-/Termin-Leads aber weiterhin nach Google Sheets (IE/US)**. Nur das Kontakt-/Partnerformular schreibt real ins CRM. **Entscheiden, welcher Zustand produktiv ist**, und Doku/Workflow angleichen.
2. **Portal-Serverstandort** ist im Repo nicht dokumentiert (Hetzner betreibt DE/FI/US). Für die Drittland-Bewertung **Land verbindlich bestätigen** (Annahme: DE).
3. **10-Jahres-Rechnungsaufbewahrung** ist im Portal technisch **nicht erzwungen** (Rechnungen frei löschbar) → organisatorische Sicherung/GoBD-konforme Ablage klären.

**🟠 kurzfristig**
4. **CRM-Retention produktiv scharf schalten** (Policies pro Mandant setzen — sonst löscht nichts automatisch).
5. **Portal härten:** MFA + Login-Rate-Limit ergänzen; DB-TLS erzwingen; Zugangsdaten-Mail nicht mehr mit Klartext-Passwort (stattdessen Einmal-Link/Reset).
6. **AVV/DPA abschließen** — noch offen: Resend, Google Workspace, Vercel; für **Web-Push-Dienste** Empfänger/Rechtsgrundlage erfassen.
   *Erledigt (Stand 06.09.2026): Hetzner (AVV im Kundenpanel), OpenAI (Self-Serve-DPA), Vapi (DPA abgeschlossen). Deepgram entfällt — nicht mehr im Einsatz. Die Tabellen oben führten Hetzner und OpenAI schon länger als erledigt; diese Liste war nicht nachgezogen.*
7. **TIA** für Vapi/Resend dokumentieren (Deepgram entfällt).
8. **Newsletter:** VVT nennt „Zeit/IP" als Opt-in-Nachweis — der Code speichert **nur den Zeitstempel** (keine IP). VVT angleichen oder IP ergänzen.

**⚖️ organisatorisch/rechtlich**
9. **Vertriebspartner-Zugriff** über das Portal datenschutzrechtlich einordnen (Empfänger vs. eigener Verantwortlicher) und im Partnervertrag regeln.
10. **DSB-Pflicht** (Art. 37) angesichts KI-Kerntätigkeit prüfen; **DSFA** (Art. 35) für den Sprachassistenten bewerten.
11. **Backup-/Wiederherstellungskonzept** für CRM und Portal schriftlich festhalten (TOM-Nachweis).

*Selbstauskunft zum tatsächlichen Verarbeitungsstand, kein Rechtsrat.*
