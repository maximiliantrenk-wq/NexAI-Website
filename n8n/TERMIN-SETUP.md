# Terminbuchung auf der Website — Einrichtung

Die Kontaktseite (`/contact`, Abschnitt „Termin buchen") zeigt freie Zeiten aus
dem Google-Kalender und legt den gebuchten Termin dort an.

**Solange nichts davon eingerichtet ist, bricht die Seite nicht** — sie zeigt
einen Hinweis auf Formular und Telefon. Du kannst also in Ruhe einrichten.

## Wie es aufgebaut ist

```
Besucher klickt „Freie Termine anzeigen"
        │
        ▼
/api/booking  (Next.js)          ← hier liegen ALLE Regeln
        │  {action:"busy"}
        ▼
n8n  nexai-website-termin        ← nur Kalender-Adapter
        │
        ▼
Google Calendar
```

Wichtig: n8n rechnet **nichts** aus. Es liefert nur die belegten Zeiträume und
legt Termine an. Geschäftszeiten, Raster, Vorlaufzeit und Horizont stehen in
`lib/booking.ts`:

| Regel | Wert | wo ändern |
|---|---|---|
| Geschäftszeiten | Mo–Fr 08:00–17:00 | `DAY_START_HOUR` / `DAY_END_HOUR` |
| Termindauer | 30 Minuten | `SLOT_MINUTES` |
| Vorlaufzeit | 2 Stunden | `LEAD_TIME_MINUTES` |
| Vorausschau | 14 Tage | `HORIZON_DAYS` |
| Zeitzone | Europe/Berlin | `TZ` |

Diese Werte spiegeln bewusst die Regeln des Voice Agents
(`nexai-vapi-verfuegbarkeit.json`), damit Telefon und Website dieselben Termine
anbieten. **Änderst du sie hier, ändere sie auch dort** — sonst bieten die
beiden Kanäle Unterschiedliches an.

## Schritt 1 — Workflow importieren

1. n8n öffnen → **Workflows** → **Import from File**
2. `n8n/nexai-website-termin.json` auswählen

## Schritt 2 — Google-Zugangsdaten verbinden

Die beiden Google-Calendar-Knoten (**Get Events**, **Create Event**) haben noch
keine Zugangsdaten hinterlegt. Bei beiden dieselben auswählen, die schon der
Voice-Agent-Workflow nutzt.

Der Kalender steht auf `primary`. Soll ein anderer Kalender verwendet werden, in
beiden Knoten umstellen.

## Schritt 3 — Header-Auth anlegen

Der Webhook-Knoten steht auf **Header Auth**.

1. Auf den **Webhook**-Knoten klicken → **Credential for Header Auth** → **Create New**
2. **Name:** `x-nexai-secret`
3. **Value:** eine lange Zufallszeichenfolge — z. B. mit
   `openssl rand -hex 32` erzeugen
4. Diesen Wert gleich merken, er kommt in Schritt 5 nach Vercel

## Schritt 4 — Aktivieren und URL kopieren

**Save**, dann **Active** einschalten. Danach im Webhook-Knoten die
**Production URL** kopieren (nicht die Test-URL!). Sie sieht so aus:

```
https://DEIN-N8N-HOST/webhook/nexai-web-termin
```

## Schritt 5 — In Vercel eintragen

Vercel → Projekt → **Settings** → **Environment Variables**:

| Name | Wert |
|---|---|
| `N8N_BOOKING_WEBHOOK_URL` | die Production-URL aus Schritt 4 |
| `N8N_BOOKING_SECRET` | der Wert aus Schritt 3 |

Danach **neu deployen**, sonst greifen die Variablen nicht.

## Nach jedem Neu-Import unbedingt prüfen

Je nach n8n-Version heißen die Zeitfenster-Felder im Knoten **Get Events**
entweder `Time Min` / `Time Max` unter *Options* oder **After** / **Before**
direkt oben im Knoten. Nach einem Import kann es passieren, dass sie leer
bleiben, weil die Datei die jeweils andere Variante enthält.

Also nach jedem Import einmal **Get Events** öffnen und sicherstellen, dass an
einer der beiden Stellen steht:

```
{{ $json.timeMin }}      und      {{ $json.timeMax }}
```

Sind beide leer, lädt der Knoten den kompletten Kalender ohne Zeitfenster und
läuft in einen Timeout — auf der Website erscheint dann „Die Terminbuchung ist
gerade nicht erreichbar".

Dasselbe gilt für **Create Event**: Unter *Additional Fields → Attendees* muss
`{{ $json.email }}` stehen. Fehlt der Eintrag, wird der Gast nicht eingetragen
und Google verschickt **keine Einladung** — die Buchung wirkt dann erfolgreich,
der Kunde bekommt aber nichts.

## Schritt 6 — Prüfen

Auf `/contact` zum Abschnitt „Termin buchen", **Freie Termine anzeigen**
klicken. Es sollten Werktage mit Uhrzeiten erscheinen. Zum Testen einmal
wirklich buchen — der Termin muss danach im Google-Kalender stehen, und die
angegebene E-Mail-Adresse muss eine Kalendereinladung von Google bekommen.

Den Testtermin danach im Kalender wieder löschen.

## Was wo abgesichert ist

- **Der Browser bestimmt nicht, was buchbar ist.** Beim Buchen lädt der Server
  die belegten Zeiten erneut und prüft den gewünschten Termin gegen das frisch
  berechnete Raster. Ein direkter POST mit „3 Uhr nachts" oder einem bereits
  belegten Termin wird mit `409` abgelehnt.
- **Doppelbuchung** ist dadurch bis auf ein sehr kleines Zeitfenster
  ausgeschlossen; wer zu spät klickt, bekommt „Dieser Termin wurde gerade
  vergeben" und die Liste lädt neu.
- **Der Kalender wird erst auf Klick abgefragt**, nicht bei jedem Seitenaufruf.
- **Kein Termininhalt verlässt den Server:** n8n gibt ausschließlich Start- und
  Endzeiten zurück, keine Titel, Beschreibungen oder Teilnehmer.
- **Bots** laufen in einen unsichtbaren Honigtopf und ein Ratenlimit (30
  Anfragen pro Minute und IP).

## Bestätigungsmail

Die Bestätigung an den Kunden verschickt **Google**, weil er als Teilnehmer im
Termin steht (`sendUpdates: all`). Das ist bewusst so gelöst und funktioniert
unabhängig davon, ob die Resend-Domain schon verifiziert ist.

Intern geht zusätzlich eine Benachrichtigung über Resend an `CONTACT_TO` —
dieselbe Adresse wie beim Kontaktformular.
