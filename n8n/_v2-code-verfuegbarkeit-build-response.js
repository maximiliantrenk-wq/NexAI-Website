// NEXAI Voice · Verfügbarkeit — freie Slots über den Tag gestreut (Vormittag/Mittag/Nachmittag)
const TZ = 'Europe/Berlin';
// Öffnungszeiten: EINE Quelle für diesen Node. Mo–Fr 9–17, Sa 9–12, So geschlossen.
const OPENING = { 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 17], 6: [9, 12] };
// Tagesfenster, aus denen je ein freier Slot gesucht wird (ganze Stunden).
const FENSTER_WOCHE = [[9, 12], [12, 15], [15, 17]];
const FENSTER_SAMSTAG = [[9, 11], [11, 12]];
const SLOT_MIN = 30, LEAD_MIN = 120, HORIZON = 14, MAX_DAYS = 3;
const WD = ['', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const ov = (aS, aE, bS, bE) => aS < bE && bS < aE;
const istOffen = (dt) => {
  const o = OPENING[dt.weekday];
  if (!o) return false;
  const h = dt.hour + dt.minute / 60;
  return h >= o[0] && h + SLOT_MIN / 60 <= o[1];
};
const fensterFuer = (weekday) => (weekday === 6 ? FENSTER_SAMSTAG : FENSTER_WOCHE);
function busyFromEvents(items) {
  const busy = [];
  for (const it of items) {
    const e = (it && it.json) ? it.json : it;
    if (!e) continue;
    if (e.status === 'cancelled') continue;
    if (e.transparency === 'transparent') continue;
    const s = e.start && (e.start.dateTime || e.start.date);
    const en = e.end && (e.end.dateTime || e.end.date);
    if (!s || !en) continue;
    const es = DateTime.fromISO(s).setZone(TZ), ee = DateTime.fromISO(en).setZone(TZ);
    if (!es.isValid || !ee.isValid) continue;
    busy.push([es, ee]);
  }
  return busy;
}
// Ersten freien 30-Min-Slot in einem Tages-Fenster [winFrom..winTo) finden
function firstFreeInWindow(busy, day, winFrom, winTo, earliest, limit) {
  const winEnd = day.set({ hour: winTo, minute: 0, second: 0, millisecond: 0 });
  let cur = day.set({ hour: winFrom, minute: 0, second: 0, millisecond: 0 });
  if (cur < earliest) {
    cur = earliest.set({ second: 0, millisecond: 0 });
    if (cur.minute !== 0 && cur.minute !== 30) cur = cur.minute < 30 ? cur.set({ minute: 30 }) : cur.plus({ hours: 1 }).set({ minute: 0 });
  }
  while (cur < winEnd && cur < limit) {
    if (istOffen(cur) && cur >= earliest) {
      const cE = cur.plus({ minutes: SLOT_MIN });
      if (!busy.some(([bs, be]) => ov(cur, cE, bs, be))) return cur;
    }
    cur = cur.plus({ minutes: SLOT_MIN });
  }
  return null;
}
// Pro geöffnetem Tag je einen freien Slot aus jedem Fenster (gestreut über den Tag)
function collectSpread(busy, now, maxDays) {
  const earliest = now.plus({ minutes: LEAD_MIN }), limit = now.plus({ days: HORIZON });
  const out = [];
  let day = now.startOf('day'), daysUsed = 0, guard = 0;
  while (daysUsed < maxDays && day < limit && guard < 60) {
    guard++;
    if (OPENING[day.weekday]) {
      let added = 0;
      for (const [wf, wt] of fensterFuer(day.weekday)) {
        const s = firstFreeInWindow(busy, day, wf, wt, earliest, limit);
        if (s) { out.push(s); added++; }
      }
      if (added > 0) daysUsed++;
    }
    day = day.plus({ days: 1 });
  }
  return out;
}
const lbl = dt => WD[dt.weekday] + ' ' + dt.toFormat('dd.LL.') + ' um ' + dt.toFormat('HH:mm');
const now = $now.setZone(TZ);
const busy = busyFromEvents($input.all());
const slots = collectSpread(busy, now, MAX_DAYS);
const toolCallId = $('Parse').first().json.toolCallId;
const heute = 'Heute ist ' + WD[now.weekday] + ', der ' + now.toFormat('dd.LL.yyyy') + '.';
let result;
if (slots.length === 0) {
  result = heute + ' In den nächsten 14 Tagen ist leider kein Termin frei. Entschuldige dich und biete an, dass sich das Team beim Anrufer meldet.';
} else {
  result = heute + ' Freie Zeiten (Europe/Berlin, 30 Min — eine Auswahl über den Tag, NICHT alle freien Zeiten): ' + slots.map(lbl).join(' | ') + '. Schlage dem Anrufer drei Termine an DREI VERSCHIEDENEN Tagen mit VERSCHIEDENEN Uhrzeiten vor \u2014 niemals drei Zeiten am selben Tag. Passe die Auswahl seinem Wunsch an. Möchte er SPÄTER oder eine andere Uhrzeit: nenne die späteren Zeiten aus dieser Liste ODER rufe direkt book_appointment mit seiner konkreten Wunschuhrzeit auf — beraten wird Montag bis Freitag von 9 bis 17 Uhr und samstags von 9 bis 12 Uhr, sage also innerhalb dieser Zeiten NIEMALS, es gebe nichts Späteres. Außerhalb dieser Zeiten und sonntags wird nicht gebucht. Erfinde keine Zeiten; konkrete Wünsche immer über book_appointment prüfen und buchen.';
}
return [{ json: { results: [{ toolCallId, result }] } }];
