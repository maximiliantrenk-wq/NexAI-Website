# AVV-/Subprozessor-Tracker (Art. 28 DSGVO)

**Verantwortlicher:** NexAI – Next Generation Artificial Intelligence GbR, Untere Bergstraße 13, 74586 Frankenhardt-Honhardt · Gesellschafter: Maximilian Trenk, Jason Brian Merklein · Kontakt Datenschutz: mbt@nex-a-i.com
**Stand:** August 2026 · **Aufsichtsbehörde:** LfDI Baden-Württemberg

> ⚠️ **Kein Rechtsrat.** Arbeitsliste zur Erfüllung der Rechenschaftspflicht (Art. 5 Abs. 2, Art. 28 DSGVO). Die Datenschutzerklärung (nex-a-i.com) sagt bereits: *„Mit den vorgenannten Dienstleistern haben wir Auftragsverarbeitungsverträge nach Art. 28 DSGVO geschlossen."* — diese Liste dient dazu, dass das auch **stimmt**. Anbieter-Links verifiziert Aug 2026; vor Abschluss kurz gegenprüfen. Vor Verwendung vom DSB/Anwalt prüfen lassen.

---

## 🔴 Zuerst: 3 Dinge klären/entscheiden (können AVVs blockieren)

1. ✅ **Vercel — erledigt (12.08.): Website auf Hetzner umgezogen.** Die Website läuft jetzt als Coolify-App auf der Hetzner-n8n-Box (5.75.179.247, DE). **Vercel fällt als Empfänger komplett weg**, §6 DSE = Hetzner/DE (keine Drittlandübermittlung). Kein Vercel-AVV mehr nötig.

2. ✅ **Geklärt (11.08.): Google Workspace** — mbt@nex-a-i.com läuft auf Workspace → das Cloud Data Processing Addendum ist **automatisch in Kraft**, AVV vorhanden. Nur noch bestätigen, dass der **Buchungskalender** (n8n → Google Calendar) **derselbe** Workspace-Account ist (nicht ein separates privates @gmail).

3. **Deepgram: Training-Opt-out verlangen.** Deepgram nutzt Kundendaten **per Default zur Modellverbesserung**. Beim AVV-Anfordern ausdrücklich die **Opt-out-Variante** verlangen — sonst widerspricht es der DSE-Zusage „keine Nutzung zu Trainingszwecken".

---

## Übersicht

| # | Anbieter | Rolle | Ort | Transfer-Basis | AVV-Weg | Status |
|---|----------|-------|-----|----------------|---------|:---:|
| 1 | ~~Vercel~~ → **Hetzner** | Website-Hosting (jetzt DE) | DE | keine Übermittlung | durch Hetzner-AVV (#5) | ✅ |
| 2 | **Resend** | E-Mail-Versand (Formulare, Newsletter-DOI) | US | DPF **+** SCC | Auto über ToS; PDF im Dashboard | ☐ |
| 3 | **OpenAI** (Ireland Ltd) | Chat-Sprachmodell, Voice-LLM + TTS | IE/US | **SCC** (kein DPF) + TIA | Self-Service-Formular im Dashboard | ☐ |
| 4 | **Google** | Google Calendar (Terminverwaltung) | IE/US | DPF **+** SCC | Auto (nur Workspace/GCP) | ☐ |
| 5 | **Hetzner** | Server für n8n **+** NexAI-CRM | DE | keine Übermittlung | Klick im Kundenaccount | ☐ |
| 6 | **Vapi** | Voice-Orchestrierung/Telefonie | US | **SCC** (kein DPF) + TIA | Basis über ToS; signiert = Enterprise | ☐ |
| 7 | **Deepgram** | Sprache→Text (STT) | US | **SCC** (kein DPF) + TIA | Per E-Mail anfordern (Opt-out!) | ☐ |
| 8 | **easybell** | SIP-Telefonanbindung | DE | keine Übermittlung | i. d. R. **kein AVV nötig** (s. u.) | ☐ |

**Selbst betrieben — kein AVV nötig:** n8n und das NexAI-CRM (inkl. Postgres/Redis) laufen **self-hosted auf dem Hetzner-Server**. Kein Dritter verarbeitet dort → kein eigener AVV; der **Hetzner-AVV (#5)** deckt den Server ab.

---

## Details je Anbieter

### 1. Vercel Inc. (US) — Website-Hosting, Server-Logs
- **Verarbeitet:** Zugriffsdaten der Websitebesucher (IP, Zeit, Inhalte, Referrer, Browser). DSE §6.
- **AVV:** „Data Processing Addendum" — https://vercel.com/legal/dpa · Subprozessoren: https://vercel.com/legal/sub-processors
- **Abschluss:** Automatisch mit Vertragsabschluss über die ToS („deemed to have signed"). Gegengezeichnete Kopie für Enterprise über Sales.
- **⚠️ Gotcha:** Der AVV gilt **nur für Pro & Enterprise**. **Hobby-Plan = kein gültiger AVV.** → Tarif prüfen (Punkt 1 oben).
- **Transfer:** Im DPA-Text stehen **EU-SCCs (2021) + UK-IDTA**; DPF wird separat auf der Trust-Seite behauptet. Auf der Live-Registry (dataprivacyframework.gov) selbst kurz gegenchecken.
- **Status:** ✅ **entfällt (12.08.)** — _Website auf Hetzner umgezogen; §6 DSE nennt jetzt Hetzner/DE. Kein Vercel-AVV nötig._

### 2. Resend, Inc. (US) — E-Mail-Versand
- **Verarbeitet:** Empfänger-Adressen + Formular-/Newsletter-Inhalte. DSE §7, §8.
- **AVV:** https://resend.com/legal/dpa · GDPR-Info: https://resend.com/security/gdpr · Subprozessoren: https://resend.com/legal/subprocessors
- **Abschluss:** Automatisch bei ToS-Zustimmung; die **ausgeführte Kopie liegt self-service im Dashboard** unter `Settings → Documents` (`/settings/documents`) → herunterladen und ablegen.
- **Transfer:** **DPF + SCC** (beide im DPA). Keine Tarif-Beschränkung (auch im Free-Plan).
- **Status:** ☐ offen — _PDF aus dem Dashboard ziehen und ablegen._

### 3. OpenAI Ireland Ltd (IE, ggf. OpenAI L.L.C. US) — Chat-LLM, Voice-LLM + Sprachsynthese
- **Verarbeitet:** Chat-Eingaben; im Voice-Pfad Text/Sprachsynthese. DSE §9, §11.
- **AVV:** „OpenAI Data Processing Addendum" (v.010126, gültig ab 01.01.2026) — https://openai.com/policies/data-processing-addendum/ · Subprozessoren: https://openai.com/policies/sub-processor-list/
- **Abschluss:** **Self-Service-Formular im Dashboard** (Org-Settings → Data Controls): Firma + Unterzeichner eintragen → OpenAI schickt gegengezeichnetes PDF. **Erfordert ein Business-/Organisations-Konto** (kein Privatkonto).
- **⚠️ Transfer:** OpenAI ist **NICHT DPF-zertifiziert** → stützt sich auf **SCCs**. Vertragspartner ist OpenAI **Ireland** (innereuropäisch); die SCCs greifen für die Weitergabe an OpenAI US. → **TIA nötig** (s. u.). Gut: API-Daten werden nicht zum Training genutzt (deckt die DSE-Zusage).
- **Status:** ☐ offen — _DPA-Formular im Business-Konto ausfüllen._

### 4. Google Ireland Ltd (IE, ggf. Google LLC US) — Google Calendar
- **Verarbeitet:** Termin-/Kontaktdaten (Name, E-Mail, Zeit, Anliegen). DSE §9, §10, §11.
- **AVV:** „Cloud Data Processing Addendum" (CDPA) — https://cloud.google.com/terms/data-processing-addendum · Subprozessoren: https://workspace.google.com/terms/subprocessors/
- **Abschluss:** **Automatisch per Verweis** in den Google-Cloud-/Workspace-Vertrag eingebunden (im Admin-Bereich ggf. die aktuelle CDPA aktiv annehmen).
- **⚠️ Gotcha:** Nur bei **Business-Konto** (Workspace **oder** GCP-Projekt). **Privates @gmail → gar kein AVV** (Google = Verantwortlicher). → Konto-Typ klären (Punkt 2 oben). Der VVT nimmt für das Postfach bereits „Google Workspace" an — bitte bestätigen, dass **derselbe** Account den Buchungskalender hält.
- **Transfer:** **DPF (Google LLC, seit 14.09.2023) + SCC.**
- **Status:** ✅ **weitgehend erledigt** — _Workspace bestätigt (11.08., mbt@nex-a-i.com) → CDPA automatisch in Kraft. Nur bestätigen, dass der Buchungskalender derselbe Workspace-Account ist._

### 5. Hetzner Online GmbH (DE) — Server (n8n + NexAI-CRM)
- **Verarbeitet:** Alles, was auf dem Server liegt (CRM-Daten, n8n-Automatisierung).
- **AVV:** „Auftragsverarbeitungsvertrag gem. Art. 28 DSGVO" (v1.1, 10.02.2025) — https://www.hetzner.com/AV/DPA_de.pdf · Subunternehmer: https://www.hetzner.com/AV/subunternehmer.pdf
- **Abschluss:** **Klick im Kundenaccount** — https://accounts.hetzner.com/account/dpa → Datenkategorien (Anlage 1) wählen → „Ich stimme der Vereinbarung zu". Keine Unterschrift, kein Rückversand. Ein AVV deckt Cloud **und** dedizierte Server.
- **Transfer:** **Keine** — Verarbeitung ausschließlich EU, sofern der Serverstandort **Falkenstein/Nürnberg/Helsinki** bleibt (nicht Ashburn/Singapur wählen).
- **Status:** ☐ offen — _Im Account abschließen (2 Minuten)._

### 6. Vapi, Inc. (US) — Voice-Orchestrierung/Telefonie
- **Verarbeitet:** Telefonnummer, Anruf-Metadaten (Name/Anliegen/Wunschtermin). **Keine Aufzeichnung.** DSE §11.
- **AVV:** Keine öffentliche Seite; im ToS eingebunden — https://vapi.ai/terms-of-service · Trust Center: https://security.vapi.ai/ · GDPR: https://docs.vapi.ai/security-and-privacy/GDPR
- **Abschluss:** Basis-DPA **automatisch über die ToS**; eine **gegengezeichnete DPA gibt es nur für Enterprise** (über das Trust Center anfragen). Für ein signiertes Art.-28-Dokument → Enterprise/Trust-Center-Weg.
- **⚠️ Transfer:** **NICHT DPF** → **SCC-only** → **TIA nötig**. Subprozessor-Liste ist hinter dem Trust-Center-Login. Ein „EU-Region"-Schalter garantiert kein EU-only-Processing.
- **Status:** ☐ offen — _Signierte DPA über Trust Center anfragen; bis dahin ToS-Basis dokumentieren._

### 7. Deepgram, Inc. (US) — Spracherkennung (STT)
- **Verarbeitet:** Audio → Text (Sprachinhalt, transient). DSE §11.
- **AVV:** Keine öffentliche Seite; **per E-Mail anfordern** an **security@deepgram.com** · Subprozessoren (öffentlich): https://deepgram.com/privacy/subprocessors
- **Abschluss:** Nicht klick-basiert — DPA anfragen. **⚠️ Ausdrücklich die Training-Opt-out-Variante verlangen** (Default = Modelltraining auf euren Daten, s. Punkt 3).
- **Transfer:** **NICHT DPF** → **SCC-only** → **TIA nötig**. EU-Endpunkt `api.eu.deepgram.com` existiert, Subprozessoren bleiben aber teils US.
- **Status:** ☐ offen — _security@deepgram.com anschreiben, Opt-out-DPA anfordern._

### 8. easybell GmbH (DE) — SIP-Telefonanbindung
- **Verarbeitet:** Telefonanbindung/SIP der Nummer +4979593100191.
- **AVV:** Für **reine SIP-/Telefonie** stellt easybell nach eigener Position **keinen AVV** — sie sind insoweit **eigener Verantwortlicher** (Fernmeldegeheimnis), keine Auftragsverarbeitung i. S. v. Art. 28. Ein AVV-Äquivalent gibt es nur für die **Cloud-Telefonanlage mit „Kontakte"-Funktion** (auto-eingebunden, keine Unterschrift): https://www.easybell.de/business/agb/ergaenzende-agb-datenvervarbeitung-cloud-telefonanlage/
- **Abschluss:** Für unseren SIP-Trunk **voraussichtlich nichts zu tun**. Falls ein Prüfer fragt: easybells FAQ/Position zitieren.
- **Transfer:** Keine (DE).
- **Status:** ☐ offen — _bestätigen, dass wir nur den SIP-Trunk nutzen (nicht die Cloud-PBX-Kontakte) → dann erledigt ohne Dokument._

---

## TIA-Pflicht für die SCC-only-Drei
**OpenAI, Vapi, Deepgram** laufen ohne DPF-Angemessenheitsbeschluss **nur über SCCs**. Für jeden dieser drei gehört eine kurze **Übermittlungs-Folgenabschätzung (Transfer Impact Assessment, TIA)** dokumentiert und in die VVT verlinkt (US-Rechtslage, ergänzende Maßnahmen wie Verschlüsselung/Datenminimierung/keine Aufzeichnung). → Follow-up nach Abschluss der DPAs.

## Gesondert prüfen (kein Website-Subprozessor)
- **Explorium** (Datenprovider für Lead-Recherche) steht in der VVT, ist aber ein **eingehender Datenlieferant**, kein Website-Auftragsverarbeiter. Eigene Rechtsgrundlage/Vereinbarung (Controller-Controller bzw. Explorium-Vertrag/DPA) separat prüfen — gehört **nicht** in die öffentliche Website-DSE.

## Definition of Done
- [ ] Google-Konto (Workspace ✓) · Deepgram-Opt-out geklärt (Vercel-Tarif entfällt — Website auf Hetzner umgezogen)
- [ ] Alle 8 Status-Häkchen auf ☑ (bzw. „nicht nötig" belegt bei easybell)
- [ ] TIA für OpenAI/Vapi/Deepgram dokumentiert + in VVT verlinkt
- [ ] Ausgeführte AVV-PDFs abgelegt (Resend, OpenAI, Hetzner; Google per Verweis)
