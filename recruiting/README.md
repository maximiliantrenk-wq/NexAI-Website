# Recruiting-Kit: Setter & Closer (m/w/d) für NexAI

Alles, was für die Gewinnung selbstständiger Vertriebspartner gebraucht wird, außer der Website selbst
(die liegt unter `/vertriebspartner`, Texte in `messages/{de,en}/recruiting.json`, Zahlen in `content/commission.ts`).

## Inhalt

| Datei | Zweck |
|---|---|
| `anzeigen/yeahbase.md` | Closer-Börse Yeahbase (ex-Closerbase), Gratis-Paket 30 Tage |
| `anzeigen/top-closer.md` | Closer-Börse Top Closer („Closer finden") |
| `anzeigen/facebook-gruppe.md` | Post für „Opener/Setter/Closer in DACH (Jobs und Vermittlung)" |
| `anzeigen/linkedin-stellenanzeige.md` | Gratis-Stellenanzeige (1 gleichzeitig, pausiert nach 21 Tagen / 50 Bewerbungen) |
| `anzeigen/linkedin-post-max.md` | Beitrag für Max' Profil |
| `anzeigen/linkedin-post-unternehmensseite.md` | Beitrag für die NexAI-Unternehmensseite |
| `anzeigen/indeed.md` | Indeed-Listing (Vergütungsform + Produkt müssen genannt sein) |
| `anzeigen/kleinanzeigen.md` | Kleinanzeigen Jobs (1 Gratis-Anzeige je 30 Tage, gewerblich) |
| `anzeigen/handelsvertreter-portale.md` | DIPEO, Handelsvertreter-Netzwerk, VertriebsOffice (Firmenprofil + Gesuch) |
| `anzeigen/closer-academy-mail.md` | Anfrage an die Closer Academy (Vermittlung von Absolventen) |
| `anzeigen/kurztexte.md` | Instagram-Bio, WhatsApp/DM-Antwort, Signatur |
| `bilder/` | Bilder für Social/Börsen (NexAI-Design, aus dem HTML→PNG-Bildsystem) |
| `POSTING-LOG.md` | Was wann wo mit welchem Link gepostet wurde, und was daraus wurde |
| `POSTING-KALENDER.md` | Zyklen je Plattform (wann erneuern) |
| `ONBOARDING.md` | Checkliste vom „Ja" bis zum ersten Anruf |

## Link-Konvention (Quellen-Tracking ohne Cookies)

Jeder Kanal bekommt seinen eigenen Link. Die Kennung landet automatisch in der Bewerbungsmail, in der
CRM-Notiz und im Kalendertermin („Quelle: ref=…"):

```
https://nex-a-i.com/de/vertriebspartner?ref=<kanal>-<variante>
```

| Kanal | Link |
|---|---|
| Yeahbase | `https://nex-a-i.com/de/vertriebspartner?ref=yeahbase` |
| Top Closer | `https://nex-a-i.com/de/vertriebspartner?ref=topcloser` |
| Facebook-Gruppe | `https://nex-a-i.com/de/vertriebspartner?ref=fb` |
| LinkedIn Stellenanzeige | `https://nex-a-i.com/de/vertriebspartner?ref=li-job` |
| LinkedIn Post Max | `https://nex-a-i.com/de/vertriebspartner?ref=li-max-1` (Nummer je Post hochzählen) |
| LinkedIn Unternehmensseite | `https://nex-a-i.com/de/vertriebspartner?ref=li-page-1` |
| Indeed | `https://nex-a-i.com/de/vertriebspartner?ref=indeed` |
| Kleinanzeigen | `https://nex-a-i.com/de/vertriebspartner?ref=kleinanzeigen` |
| DIPEO / HV-Netzwerk / VertriebsOffice | `?ref=dipeo` / `?ref=hvnetz` / `?ref=vertriebsoffice` |
| Instagram-Bio / DM / WhatsApp | Kurzlink `https://nex-a-i.com/closer?ref=ig-bio` bzw. `?ref=wa` (leitet mit Kennung weiter) |

Kurzlinks: `nex-a-i.com/closer` und `nex-a-i.com/setter` leiten auf die Seite und reichen `?ref=` durch.

## Ablauf beim Posten (über Max' Chrome-Erweiterung)

1. Max ist auf der Plattform eingeloggt (Konten legt nur er an; Passwörter und Zahlungen bleiben bei ihm).
2. Ich fülle die Anzeige aus dem passenden Text aus, prüfe die Pflichtfelder der Plattform und zeige eine Zusammenfassung.
3. Max sagt „ok", ich sende ab und trage Datum, Kanal, Variante und Link in `POSTING-LOG.md` ein.
4. **Ein Kanal pro Tag**, je Plattform ein eigener Text (kein identischer Text an mehreren Orten am selben Tag: Spamfilter, Gruppensperren).
5. Erneuerung nur nach Plattformregel (siehe `POSTING-KALENDER.md`).

## Regeln für jeden Text

- Erster Satz nennt die Vergütungsform: **selbstständige Handelsvertretung (§ 84 HGB), reine Provision, kein Fixum.**
- Produkt und Leadquelle nennen (digitale AI-Mitarbeiter für KMU; geprüfte Firmenkontakte, B2B-Kaltanruf).
- **(m/w/d)** an jeder Rollenbezeichnung, keine Alters- oder Herkunftsbezüge, „Deutsch verhandlungssicher" statt „Muttersprache".
- Keine Einkommensversprechen, keine „bis zu X €/Monat". Nur die Prozentsätze und das gekennzeichnete Beispiel.
- Keine Garantien auf Termine oder Abschlüsse. Ehrlich: junges Unternehmen, B2B-Telefonvertrieb, kein Coaching-Warm-Lead.
- Kein Kalt-Outreach per E-Mail oder DM an Personen, die nicht gefragt haben (§ 7 UWG). Nur Posten, wo es erlaubt ist, und auf Anfragen antworten.
