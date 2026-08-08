# n8n auf „nichts speichern" umstellen (DSGVO)

Ziel: Die selbst gehostete n8n-Instanz (Hetzner, DE) soll die **Inhalte** von
Chat, Website-Termin und Sprachassistent **nicht dauerhaft protokollieren**.
Betrifft ausschließlich das technische Ausführungs­protokoll von n8n — **nicht**
die bewusst erfassten Leads und Termine (die bleiben, siehe unten).

## Was heute wo gespeichert wird

| Ort | Was | Bewertung |
|---|---|---|
| Browser (`sessionStorage`) | Chatverlauf des Besuchers | flüchtig, nur im Browser des Nutzers, weg beim Tab-Schließen → unkritisch |
| Vercel `/api/chat` | nur Proxy, In-Memory-Ratelimit | speichert nichts dauerhaft |
| n8n „Simple Memory"-Node | Gesprächskontext (20 Nachrichten) | nur im RAM, weg bei jedem n8n-Neustart, **nicht** in der DB |
| **n8n Execution History (DB)** | **jede Ausführung mit voller PII** (Nachrichten, Name, E-Mail, Telefon) | 🔴 **der Punkt, den wir abstellen** |
| Google Sheets / Calendar | Leads & Termine | ✅ **gewollt — Geschäftszweck, bleibt** |

Der **einzige** unbeabsichtigte Speicher ist die Execution History. n8n speichert
per Default **jede** erfolgreiche und fehlgeschlagene Ausführung mit allen Node-
Ein-/Ausgaben und löscht sie erst nach 14 Tagen.

## Die Umstellung: 7 Environment-Variablen

Diese Variablen an der n8n-Instanz setzen (gelten **instanzweit** — decken Chat,
Website-Termin und Vapi-Buchung auf einmal ab, auch künftige Workflows):

```dotenv
# Erfolgreiche Ausführungen NICHT speichern (Default: all)
EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
# Fehler kurz behalten, um Störungen nachvollziehen zu können (Default: all)
EXECUTIONS_DATA_SAVE_ON_ERROR=all
# Manuelle Test-Runs nicht speichern (Default: true)
EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false
# Keine Zwischenschritt-Daten pro Node (ist bereits Default)
EXECUTIONS_DATA_SAVE_ON_PROGRESS=false
# Rollierendes Löschen an lassen (ist bereits Default)
EXECUTIONS_DATA_PRUNE=true
# Was doch gespeichert wird (= nur noch Fehler) nach 24 h automatisch löschen (Default: 336 = 14 Tage)
EXECUTIONS_DATA_MAX_AGE=24
# Obergrenze Anzahl — Default, optional
EXECUTIONS_DATA_PRUNE_MAX_COUNT=10000
```

**Wirkung:** Erfolgreiche Chats/Buchungen werden gar nicht erst geschrieben — n8n
legt beim Start zwar kurz einen „running"-Datensatz an, **verwirft ihn nach
Abschluss aber wieder**. Übrig bleiben nur Fehler-Ausführungen, und die löscht das
Pruning nach spätestens 24 Stunden. Der Gesprächskontext (Simple Memory, RAM)
bleibt erhalten, der Bot versteht Folgefragen weiterhin.

> Entscheidung 08.08.2026: Fehler bewusst 24 h behalten statt `=none`, damit eine
> gestörte Buchung diagnostizierbar bleibt. Wer maximale Datensparsamkeit will,
> setzt zusätzlich `EXECUTIONS_DATA_SAVE_ON_ERROR=none` — dann speichert n8n
> wirklich gar nichts, Fehler sind dann aber nicht mehr nachvollziehbar.

## Wo eintragen (je nach Setup)

**Docker-Compose** (häufigster Fall) — im `n8n`-Service unter `environment:`:

```yaml
services:
  n8n:
    environment:
      - EXECUTIONS_DATA_SAVE_ON_SUCCESS=none
      - EXECUTIONS_DATA_SAVE_ON_ERROR=all
      - EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS=false
      - EXECUTIONS_DATA_SAVE_ON_PROGRESS=false
      - EXECUTIONS_DATA_PRUNE=true
      - EXECUTIONS_DATA_MAX_AGE=24
```

Danach: `docker compose up -d` (Container wird neu erstellt).

**`.env`-Datei / systemd:** dieselben Zeilen in die von n8n geladene `.env` bzw.
`Environment=`-Zeilen der Unit, dann `docker compose up -d` bzw.
`systemctl restart n8n`.

Die Variablen greifen **erst nach einem Neustart** von n8n.

## Alt-Bestände einmalig löschen

Die Env-Variablen wirken nur nach vorn. Bereits gespeicherte Ausführungen einmal
entfernen:

- **n8n-UI:** links **Executions** öffnen → alle auswählen → **Delete**. Oder
  einfach 24 h warten — das Pruning (`MAX_AGE=24`) räumt Bestände selbst weg,
  sobald es aktiv ist.
- **Postgres direkt** (optional, sofort): `TRUNCATE TABLE execution_entity CASCADE;`
  in der n8n-Datenbank. Vorher ein Backup, und n8n sollte dabei idealerweise stehen.

## Verifikation

1. n8n neu starten.
2. Auf der Website einen Test-Chat führen (oder einen Test-Termin buchen).
3. In n8n unter **Executions** nachsehen: die erfolgreiche Ausführung darf
   **nicht** mehr auftauchen. Erscheint sie doch, wurde eine der Variablen nicht
   geladen (Tippfehler / Neustart vergessen / falsche `.env`).

## Was bewusst NICHT abgeschaltet wird

„Nichts speichern" heißt **nicht** „keine Leads/Termine mehr". Diese bleiben, sonst
gäbe es keine Geschäftsdaten:

- **Leads** → Google Sheets (`save_lead`, DSE-Frist 6 Monate)
- **Termine** → Google Calendar (`book_appointment`, DSE-Frist 12 Monate)

Abgeschaltet wird nur das **technische Nebenprotokoll** von n8n, nicht die
absichtliche Erfassung.

## Datenschutzerklärung — passt bereits

`messages/{de,en}/legal.json` §9 formuliert konditional: „**Soweit** eine
Speicherung technisch erfolgt, bewahren wir Chatverläufe für längstens sechs
Monate auf." Nach dieser Umstellung ist der Normalfall „keine Speicherung",
Fehler max. 24 h — die Aussage bleibt korrekt (und konservativer als die Realität).
Optional könnte man §4 „Chatverläufe: 6 Monate" später präzisieren zu „keine
dauerhafte Speicherung; Fehlerprotokolle max. 24 Stunden" — das ist ein besseres
Verkaufsargument, aber ein Rechtstext und daher der Anwalts-/DSB-Prüfung
vorbehalten.
