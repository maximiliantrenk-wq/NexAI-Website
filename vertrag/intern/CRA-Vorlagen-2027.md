# CRA-Vorlagen für den 11.12.2027

Stand: 18.10.2026 · intern · Gerüste, die vor dem Inverkehrbringen eines erfassten Produkts **ab dem 11.12.2027**
ausgefüllt sein müssen (Art. 71 Abs. 2 CRA). Platzhalter in `[eckigen Klammern]`.

**Rechtsstand:** VO (EU) 2024/2847 (CRA), konsolidierte Fassung vom 20.11.2024 (CELEX 02024R2847-20241120),
über `recht` abgerufen am 18.10.2026; laut CELLAR-Abfrage vom selben Tag die neueste konsolidierte Fassung.
Einzige seither erlassene Änderung: VO (EU) 2025/327 (EHDS) Art. 104 (Art. 13 Abs. 4, Art. 31 Abs. 3, neuer
Art. 32 Abs. 5a) – betrifft nur EHR-Systeme, für NexAI ohne Belang. Technische Beschreibung der Kategorien in
Anhang III/IV: Durchführungsverordnung (EU) 2025/2392 vom 28.11.2025. Deutsches CRA-Durchführungsgesetz: im
BGBl-Spiegel bis 16.10.2026 nicht verkündet.

---

## Teil 0 – Einordnung je Produkt (Prüfung 18.10.2026)

**Maßstab.** Der CRA gilt für „auf dem Markt bereitgestellte Produkte mit digitalen Elementen“ mit Daten-
verbindung (Art. 2 Abs. 1). Produkt ist „ein Software- oder Hardwareprodukt und dessen
Datenfernverarbeitungslösungen“ (Art. 3 Nr. 1). Datenfernverarbeitung ist entfernte Verarbeitung, „ohne die
das Produkt … eine seiner Funktionen nicht erfüllen könnte“ (Art. 3 Nr. 2) – sie hängt also immer an einem
Produkt. Reiner SaaS-Betrieb ohne ausgeliefertes Produkt ist **nicht erfasst**: EG 12 Satz 4 „Die Richtlinie
(EU) 2022/2555 gilt für Cloud-Computing-Dienste und Cloud-Dienstmodelle wie SaaS“; bestätigend VO (EU)
2025/327 EG 112: „Da die Verordnung (EU) 2024/2847 Software as a Service (SaaS) als solche nicht direkt
abdeckt …“. Umgekehrt ist das Backend einer App erfasst: EG 11 „wenn eine mobile Anwendung den Zugang zu
einer Anwendungsprogrammierschnittstelle oder zu einer Datenbank erfordert, die über einen vom Hersteller
entwickelten Dienst bereitgestellt wird. In diesem Fall fällt der Dienst als Datenfernverarbeitungslösung in
den Anwendungsbereich dieser Verordnung“.

**Anhang III/IV.** Maßgeblich ist die **Kernfunktion** (Art. 7 Abs. 1 Satz 1; DVO 2025/2392 EG 2). Eine
eingebaute Funktion einer Anhang-III-Kategorie macht das Gesamtprodukt nicht dazu (Art. 7 Abs. 1 Satz 2);
DVO 2025/2392 EG 5: ein Produkt, „dessen Kernfunktionen sich jedoch von der einer solchen Produktkategorie
unterscheiden, gilt hingegen nicht als ein Produkt, das der technischen Beschreibung dieser Produktkategorie
entspricht“; EG 3 nennt als Beispiel ausdrücklich den eingebetteten Browser in einer Nachrichten-App.
Anhang IV umfasst nur Hardware (Sicherheitsboxen, Smart-Meter-Gateways, Chipkarten).

| Produkt | Betrieb | CRA erfasst? | Anhang III/IV | Verfahren |
|---|---|---|---|---|
| **NexAI CRM, gehostet** (crm.nex-a-i.com) | NexAI betreibt, Kunden nutzen per Browser | **nein** – SaaS (EG 12) | – | – (NIS2: NexAI unter den Schwellen, § 28 Abs. 2 Nr. 3 BSIG: ≥ 50 Mitarbeiter oder je > 10 Mio. EUR) |
| **NexAI CRM, Kauflizenz** | Kunde betreibt auf eigenem Server | **ja**, sobald die erste Lizenz ausgeliefert ist (Software, entgeltlich „zur Verwendung“ bereitgestellt, Art. 3 Nr. 1, 22; NexAI ist Hersteller, Art. 3 Nr. 13) | **nein** – Kernfunktion CRM. Anmeldung, Zwei-Faktor, Rollen sind Nebenfunktionen; „Identitätsmanagementsysteme“ (Anhang III Klasse I Nr. 1, DVO 2025/2392 Anhang I Nr. 1) meint Produkte, deren Kernfunktion Authentifizierung/Zugangsverwaltung ist (EG 5) | **Modul A** (Art. 32 Abs. 1 lit. a) |
| **Kalender** (kalender.nex-a-i.com) und **NexTime** | NexAI betreibt; Kunden installieren höchstens die PWA (WebAPK baut Google) | **nein**, solange reine Web-App (EG 12). Restrisiko: installierbare PWAs regelt der CRA nicht ausdrücklich | – | – |
| ↳ Kalender als **Play-Store-App (TWA)** | Max am 14.10.: „Erst später“ | **ja** ab Veröffentlichung, Backend als Datenfernverarbeitung (EG 11) | **nein** (Kernfunktion Terminbuchung; Browser-Komponente nach DVO EG 3 unschädlich) | Modul A |
| **E-Mail-Assistent (Mailagent)** | NexAI betreibt je Kunde eine Instanz auf dem NexAI-Server 2.28.111.4 | **nein** – SaaS; wird er je beim Kunden installiert: ja, wie Kauflizenz | nein | (Modul A) |
| **NexStudy als Store-App** | Capacitor (iOS) / TWA (Android); Stand 12.10.: D-U-N-S beantragt, nicht im Store | **ja** ab Veröffentlichung, auch unentgeltlich (Art. 3 Nr. 22); der Study-Dienst unter app.nex-a-i.com ist dann Datenfernverarbeitung (EG 11) | **nein** – Kernfunktion Lernen; die WebView ist eingebettete Komponente (Art. 7 Abs. 1 Satz 2; DVO EG 3) | Modul A |
| Portal, Website, Voice-/Chat-Agenten | NexAI betreibt | nein – SaaS/Website (EG 12) | – | – |
| NexStay | [klären: betreibt NexAI den Produktivserver oder das Hotel?] | NexAI-Betrieb: nein; Installation beim Hotel: ja | nein (Kernfunktion Hotelverwaltung) | (Modul A) |

**Heute (18.10.2026) ist nach Vault-Stand kein erfasstes Produkt auf dem Markt** (0 Kauflizenzen, keine
Store-App). Damit greift weder Art. 14 noch Art. 13. Vor dem ersten Verkauf bzw. der ersten Store-Freigabe
diese Tabelle neu prüfen.

**Zeitachse.** Art. 14 (Meldepflicht) gilt seit 11.09.2026 (Art. 71 Abs. 2 UAbs. 2), auch für Produkte, die
vor dem 11.12.2027 in Verkehr kommen (Art. 69 Abs. 3). Alles Übrige ab 11.12.2027; früher in Verkehr gebrachte
Produkte nur bei „wesentlicher Änderung“ danach (Art. 69 Abs. 2, Art. 3 Nr. 30). Ungeklärt und deshalb nicht
darauf bauen: ob jede nach dem 11.12.2027 verkaufte Lizenz einer alten Version als neu in Verkehr gebracht gilt.
Sicherer Weg: ab dem 11.12.2027 jede ausgelieferte Version vollständig nach Teil 1–4 behandeln.

---

## Teil 1 – Technische Dokumentation (Art. 31, Anhang VII) – NexAI CRM (Kauflizenz)

Pflicht: „vor dem Inverkehrbringen … erstellt und … zumindest während des Unterstützungszeitraums, laufend
aktualisiert“ (Art. 31 Abs. 2); Aufbewahrung „mindestens zehn Jahre lang oder für die Dauer des
Unterstützungszeitraums, je nachdem, welcher Zeitraum länger ist“ (Art. 13 Abs. 13). Ablage: [Ort, z. B.
`nexai-crm/docs/cra/` + unveränderliche Kopie je Version].

| Nr. Anhang VII | Inhalt | Quelle / Stand 18.10.2026 |
|---|---|---|
| 1 a | Zweckbestimmung | aus `CRA_Nutzerinformation_Kauflizenz` Teil B Nr. 4 übernehmen |
| 1 b | „Softwareversionen, die sich auf die Erfüllung der grundlegenden Cybersicherheitsanforderungen auswirken“ | [Versionsliste] – **Lücke:** alle Pakete führen `"version": "0.0.0"`; Versionsschema einführen (auch für Art. 13 Abs. 15) |
| 1 c | Hardware-Abbildungen | entfällt (reine Software) |
| 1 d | Informationen für Nutzer nach Anhang II | `vertrag/CRA_Nutzerinformation_Kauflizenz.pdf` (ausgefüllt je Version) |
| 2 a | Konzeption, Systemarchitektur, Zusammenwirken der Komponenten | `nexai-crm/docs/ARCHITECTURE.md`, `docs/adr/`, Container-Plan `infra/docker-compose.yml` |
| 2 b | Schwachstellenbehandlung: SBOM, Offenlegungskonzept, Nachweis Kontaktadresse, sichere Update-Verteilung | SBOM: [fehlt]; Konzept: `CRA_Offenlegungsrichtlinie`; Kontakt: security.txt + Screenshot; Update-Verteilung: [fehlt – Ausrollweg bauen] |
| 2 c | Herstellungs- und Überwachungsprozesse, Validierung | CI `nexai-crm/.github/workflows/ci.yml` (Tests, gitleaks, Trivy), Release-Ablauf [beschreiben] |
| 3 | Bewertung der Cybersicherheitsrisiken (Art. 13) | Teil 2 dieses Dokuments, ausgefüllt |
| 4 | Informationen zur Festlegung des Unterstützungszeitraums | 7 Jahre ab Lizenzkauf (Max, 06.10./18.10.2026); Begründung: Nutzungsdauer CRM-Kauflizenz im Markt [Vergleichswerte], Art. 13 Abs. 8 UAbs. 2–3 (mind. 5 Jahre); Abhängigkeiten: Unterstützungszeiträume von Node.js, PostgreSQL, Redis, Traefik, Basis-Images [Enddaten eintragen] |
| 5 | angewandte harmonisierte Normen / gemeinsame Spezifikationen; sonst Beschreibung der Lösungen für Anhang I Teil I und II | [Stand der harmonisierten Normen zum CRA prüfen]; bis dahin: Lösungsbeschreibung je Anforderung = Teil 2 Spalte „Umsetzung“ |
| 6 | Berichte über Tests und Prüfungen | CI-Läufe, Trivy-Berichte, Vollcheck-Berichte, [Penetrationstest falls vorhanden] |
| 7 | Exemplar der EU-Konformitätserklärung | Teil 3, unterschrieben |
| 8 | SBOM auf begründetes Verlangen der Marktüberwachung | [Ablage je Version] |

---

## Teil 2 – Bewertung der Cybersicherheitsrisiken (Art. 13 Abs. 2–4)

Art. 13 Abs. 3 verlangt „mindestens eine Analyse der Cybersicherheitsrisiken auf der Grundlage der
Zweckbestimmung und der vernünftigerweise vorhersehbaren Verwendung …, wie der Betriebsumgebung oder der zu
schützenden Anlagen, wobei die voraussichtliche Nutzungsdauer des Produkts berücksichtigt wird“, und die
Angabe, „ob und gegebenenfalls in welcher Weise die Sicherheitsanforderungen gemäß Anhang I Teil I Nummer 2
… anwendbar sind und wie diese Anforderungen … umgesetzt werden“. Nicht anwendbare Anforderungen brauchen
„eine klare Begründung“ (Abs. 4). Dokumentieren und „gegebenenfalls aktualisieren“ während des
Unterstützungszeitraums (Abs. 3), bei neuen Schwachstellen ebenso (Abs. 7).

### 2.1 Rahmen

- Produkt / Version: [NexAI CRM x.y.z]
- Zweckbestimmung: [aus Nutzerinformation B 4]
- Vorhersehbare Verwendung und Fehlanwendung (Art. 3 Nr. 24, 25): [z. B. Betrieb ohne Updates, öffentlich
  erreichbare Datenbank, geteilte Zugänge, Verarbeitung von Gesundheitsdaten in Praxen]
- Betriebsumgebung: Linux-Server des Kunden, Docker, Traefik, PostgreSQL 16, Redis 7, [Node 22]
- Zu schützende Werte: Kundendaten (Kontakte, Gesprächsmitschriften, Rechnungen), Zugangsdaten, Schlüssel
  angebundener Dienste, Verfügbarkeit des Vertriebs
- Nutzungsdauer: [≥ 7 Jahre]
- Methode: [z. B. STRIDE je Komponente + Bewertung Eintritt × Ausmaß, Art. 3 Nr. 37]

### 2.2 Anhang I Teil I Nr. 2 – je Anforderung

| lit. | Anforderung (Kurzform) | anwendbar? | Umsetzung / Stand 18.10.2026 | Lücke / Maßnahme |
|---|---|---|---|---|
| a | „ohne bekannte ausnutzbare Schwachstellen“ | ja | Trivy-Scan (fs, CRITICAL/HIGH) in CI | Trivy läuft mit `exit-code: "0"` (nur Bericht) → vor Release blockierend machen; Freigabe-Prüfung je Version |
| b | sichere Standardkonfiguration, Zurücksetzen | ja | Installationsskript erzeugt Geheimnisse lokal, interne Netze | [Werkszustand/Zurücksetzen beschreiben]; optionale Dienste (`n8n:latest`, `uptime-kuma`) aus der Kundenauslieferung nehmen oder auf feste Version pinnen |
| c | Behebung durch Sicherheitsupdates, ggf. automatisch mit Opt-out | ja | – | **Ausrollweg für Kundeninstallationen fehlt** (Muster: Mailagent-Ausrollskript mit Deploy-Key, Rückrollen) |
| d | Schutz vor unbefugtem Zugriff, Meldung möglicher unbefugter Zugriffe | ja | argon2id, TOTP, Rollen, Rate Limiting | [Meldung verdächtiger Anmeldungen an Admin?] |
| e | Vertraulichkeit, Verschlüsselung | ja | TLS (Traefik/ACME); AES-256-GCM für MFA-Geheimnisse und Gesprächsmitschriften; `DATABASE_SSL`-Regel | Notizen, E-Mail-Inhalte, Anhänge unverschlüsselt (SECURITY.md § 2) – bewerten |
| f | Integrität, Meldung von Beschädigung | ja | [Prüfsummen Sicherungen, Migrationen] | [ergänzen] |
| g | Datenminimierung | ja | Löschregeln/Retention-Engine | [Abgleich DATA_RETENTION.md] |
| h | Verfügbarkeit, DoS-Abwehr | ja | Rate Limiting; In-CRM-Wächter | [Kundenbetrieb: Hinweise in Nutzerinfo] |
| i | Auswirkungen auf andere Netze minimieren | ja | ausgehende Verbindungen nur zu konfigurierten Diensten | [Egress-Liste] |
| j | geringe Angriffsfläche | ja | nur 80/443 öffentlich | optionale Dienste s. b |
| k | Minderung der Ausnutzung | ja | RLS (fail-closed), Least-Privilege-Rolle `nexai_app` | [Container ohne root?] |
| l | Aufzeichnung sicherheitsrelevanter Vorgänge, Opt-out | ja | Audit-Log | [Opt-out-Mechanismus prüfen] |
| m | Daten und Einstellungen dauerhaft löschen; sichere Übertragung | ja | Export, `down -v` | [Löschung in Sicherungen beschreiben] |

Anhang I Teil I Nr. 1 (angemessenes Niveau insgesamt): [Gesamturteil].

### 2.3 Anhang I Teil II – Schwachstellenbehandlung

| Nr. | Pflicht | Stand 18.10.2026 | Maßnahme bis 11.12.2027 |
|---|---|---|---|
| 1 | SBOM „in einem gängigen maschinenlesbaren Format“ | fehlt | CycloneDX je Release erzeugen (CI) und ablegen |
| 2 | unverzüglich beheben; Sicherheitsupdates getrennt, „soweit technisch machbar“ | Beschränkung auf neueste Version nach Art. 13 Abs. 10 (alle bekommen sie kostenlos, Max 18.10.) | Release-Kanal „nur Sicherheit“ prüfen; Abs.-10-Bedingung „keine zusätzlichen Kosten für die Anpassung der Hardware- und Softwareumgebung“ bei jedem großen Versionssprung prüfen |
| 3 | regelmäßig und wirksam testen | Tests in CI, Vollchecks | Sicherheitstests dokumentieren |
| 4 | nach Update Informationen über behobene Schwachstellen veröffentlichen | – | Seite für Sicherheitshinweise [https://nex-a-i.com/de/sicherheit] |
| 5 | Strategie koordinierte Offenlegung | **erledigt (Entwurf)**: `CRA_Offenlegungsrichtlinie` | veröffentlichen |
| 6 | Kontaktadresse | security.txt-Text liegt vor; security@ fehlt | Postfach anlegen, Datei einbauen |
| 7 | sichere Verteilung von Updates | fehlt | Ausrollweg mit Signatur/Prüfsumme |
| 8 | Sicherheitsupdates unverzüglich und kostenlos, mit Hinweisen | zugesagt (Nutzerinformation Teil A) | Benachrichtigungsweg an technische Kontakte |

**Widerspruch Doku ↔ Wirklichkeit (vor Aufnahme in die technische Dokumentation beheben):**
`nexai-crm/docs/SECURITY.md` § 11 nennt „`npm audit`, **Trivy** (image scan), … pinned image digests,
Dependabot. A failing security gate blocks merge.“ Tatsächlich (origin/main, 18.10.2026): Trivy nur als
Dateisystem-Scan mit `exit-code: "0"`, kein Dependabot/Renovate im Repo, `n8n:latest` ungepinnt. Falsche
Angaben gegenüber der Marktüberwachung sind bußgeldbewehrt (Art. 64 Abs. 4).

---

## Teil 3 – EU-Konformitätserklärung (Art. 28, Anhang V)

Aufbau nach Anhang V; Sprache des Mitgliedstaats, in dem das Produkt bereitgestellt wird (Art. 28 Abs. 2);
„nach Bedarf aktualisiert“. Mit der Ausstellung übernimmt NexAI „die Verantwortung für die Konformität“
(Art. 28 Abs. 4). CE-Kennzeichnung bei Software „entweder auf der EU-Konformitätserklärung … oder auf der das
Softwareprodukt begleitenden Website“ (Art. 30 Abs. 1 Satz 3). Dem Produkt Kopie oder vereinfachte Erklärung
(Anhang VI) mit Internetadresse beifügen (Art. 13 Abs. 20).

```
EU-KONFORMITÄTSERKLÄRUNG Nr. [CRM-x.y.z]

1. Produkt: NexAI CRM, Software, Version [x.y.z], Kennung [Commit/Build]
2. Hersteller: NexAI – Next Generation Artificial Intelligence GbR,
   Untere Bergstraße 13, 74586 Frankenhardt-Honhardt, Deutschland
3. Die alleinige Verantwortung für die Ausstellung dieser Konformitätserklärung trägt der Hersteller.
4. Gegenstand der Erklärung: NexAI CRM [x.y.z] – CRM-Software zum Betrieb auf einem Server des Kunden
   (Bezeichnung zur Rückverfolgbarkeit: [Lizenz-/Releasekennung])
5. Der oben beschriebene Gegenstand der Erklärung erfüllt die einschlägigen Harmonisierungsrechtsvorschriften
   der Union: Verordnung (EU) 2024/2847 (ABl. L, 2024/2847, 20.11.2024).
6. Angewandte harmonisierte Normen / gemeinsame Spezifikationen / Zertifizierung: [… oder „keine“]
7. Notifizierte Stelle: entfällt (internes Kontrollverfahren, Modul A, Anhang VIII Teil I)
8. Weitere Angaben: Unterstützungszeitraum bis [MM/JJJJ]; Kontaktstelle security@nex-a-i.com

Unterzeichnet für und im Namen von: NexAI – Next Generation Artificial Intelligence GbR
[Ort, Datum der Ausstellung]
[Name, Funktion]  [Unterschrift]
```

(GbR: Gesamtvertretung – beide Gesellschafter unterschreiben lassen oder Vollmacht ablegen.)

---

## Teil 4 – Selbstbewertung nach Modul A (Art. 32 Abs. 1 lit. a, Anhang VIII Teil I)

Modul A ist zulässig, weil das Produkt weder in Anhang III (Art. 32 Abs. 2, 3) noch in Anhang IV (Abs. 4)
fällt (Teil 0). Mit Modul A erklärt der Hersteller „auf eigene Verantwortung“, dass das Produkt Anhang I
Teil I genügt und er Anhang I Teil II erfüllt (Anhang VIII Teil I Nr. 1).

| Schritt | Anhang VIII Teil I | Nachweis | erledigt |
|---|---|---|---|
| 1 | Nr. 2: „Der Hersteller erstellt die technische Dokumentation gemäß Anhang VII.“ | Teil 1 vollständig, Version [x.y.z] | [ ] |
| 2 | Nr. 3: Maßnahmen, damit Konzeption, Entwicklung, Herstellung und Schwachstellenbehandlung die Konformität „gewährleisten“ | Teil 2 ohne offene Lücke bei a–m und Teil II Nr. 1–8; CI-Tor blockierend; Release-Checkliste | [ ] |
| 3 | Nr. 4.1: CE-Kennzeichnung | auf der Konformitätserklärung oder der Produkt-Website (Art. 30 Abs. 1 Satz 3) | [ ] |
| 4 | Nr. 4.2: schriftliche EU-Konformitätserklärung, Aufbewahrung 10 Jahre bzw. Unterstützungszeitraum | Teil 3 unterschrieben, abgelegt | [ ] |
| 5 | Art. 13 Abs. 15, 16, 18, 19 | Versionskennung, Kontaktangaben, Nutzerinformation, Enddatum beim Kauf | [ ] |
| 6 | Art. 13 Abs. 14 (Serienfertigung) | jede neue Version: Teil 2 aktualisieren, Erklärung nachziehen | [ ] |

Ergebnis: [Konform / nicht konform – Begründung], Datum, Unterschrift beider Gesellschafter.

---

## Teil 5 – Fristen und Aufbewahrung auf einen Blick

| Was | Dauer | Norm |
|---|---|---|
| Unterstützungszeitraum | mind. 5 Jahre; NexAI: 7 Jahre ab Kauf | Art. 13 Abs. 8 UAbs. 3 |
| Sicherheitsupdate abrufbar | 10 Jahre oder Rest des Unterstützungszeitraums, das Längere | Art. 13 Abs. 9 |
| Technische Doku + Konformitätserklärung | 10 Jahre oder Unterstützungszeitraum, das Längere | Art. 13 Abs. 13 |
| Nutzerinformation verfügbar | 10 Jahre oder Unterstützungszeitraum, das Längere | Art. 13 Abs. 18 |
| Meldungen | 24 h / 72 h / 14 Tage bzw. 1 Monat | Art. 14 Abs. 2, 4 → `CRA-Meldeablauf.md` |
| Betriebseinstellung | vorher Behörde und Nutzer informieren | Art. 13 Abs. 23 |

## Teil 6 – Was bis zum 11.12.2027 gebaut werden muss (aus Teil 1–4)

1. Versionsschema + Versionsanzeige im CRM (Art. 13 Abs. 15; Anhang VII Nr. 1 b).
2. SBOM je Release (Anhang I Teil II Nr. 1).
3. Trivy blockierend, Dependabot/Renovate oder gleichwertig; SECURITY.md § 11 an die Wirklichkeit anpassen.
4. Ausrollweg für Kundeninstallationen mit Integritätsprüfung (Anhang I Teil I Nr. 2 lit. c, Teil II Nr. 7).
5. Ende-des-Unterstützungszeitraums-Hinweis in der Anwendung (Art. 13 Abs. 19 UAbs. 2).
6. Seite für Sicherheitshinweise + Archiv der Updates (Anhang I Teil II Nr. 4; Art. 13 Abs. 9, 11).
7. Optionale Container (n8n, uptime-kuma) aus der Kundenauslieferung nehmen oder pinnen und bewerten.
8. Lizenzregister (Kunde, Version, technischer Kontakt, Mitgliedstaat) – braucht schon Art. 14.
