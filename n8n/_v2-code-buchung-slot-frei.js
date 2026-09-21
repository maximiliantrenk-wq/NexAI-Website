// NEXAI Voice · Buchung — Öffnungszeiten UND Konflikt prüfen; sonst 3 Alternativen berechnen
const TZ = 'Europe/Berlin';
// Öffnungszeiten: EINE Quelle für diesen Node. Mo–Fr 9–17, Sa 9–12, So geschlossen.
const OPENING = { 1: [9, 17], 2: [9, 17], 3: [9, 17], 4: [9, 17], 5: [9, 17], 6: [9, 12] };
const SLOT_MIN = 30, LEAD_MIN = 120, HORIZON = 14;
const WD = ['', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
const ov = (aS, aE, bS, bE) => aS < bE && bS < aE;
const istOffen = (dt) => {
  const o = OPENING[dt.weekday];
  if (!o) return false;
  const h = dt.hour + dt.minute / 60;
  return h >= o[0] && h + SLOT_MIN / 60 <= o[1];
};
function busyFromEvents(items){const busy=[];for(const it of items){const e=(it&&it.json)?it.json:it;if(!e)continue;if(e.status==='cancelled')continue;if(e.transparency==='transparent')continue;const s=e.start&&(e.start.dateTime||e.start.date);const en=e.end&&(e.end.dateTime||e.end.date);if(!s||!en)continue;const es=DateTime.fromISO(s).setZone(TZ),ee=DateTime.fromISO(en).setZone(TZ);if(!es.isValid||!ee.isValid)continue;busy.push([es,ee]);}return busy;}
// Alternativen: ein Vorschlag je Tag, drei verschiedene Tage, verschiedene Uhrzeiten.
// Bevorzugtes Fenster rotiert, damit nicht alle Vorschlaege am Vormittag liegen.
const PRAEFERENZ = [[9, 12], [14, 17], [12, 14]];
function collectFree(busy, now, from, maxTotal) {
  const earliest = now.plus({ minutes: LEAD_MIN }), limit = now.plus({ days: HORIZON });
  let start = ((from && from > earliest) ? from : earliest).set({ second: 0, millisecond: 0 });
  if (start.minute !== 0 && start.minute !== 30) start = start.minute < 30 ? start.set({ minute: 30 }) : start.plus({ hours: 1 }).set({ minute: 0 });
  const istFrei = (dt) => {
    if (!istOffen(dt) || dt < earliest) return false;
    const e = dt.plus({ minutes: SLOT_MIN });
    return !busy.some(([bs, be]) => ov(dt, e, bs, be));
  };
  const slotsAmTag = (tag) => {
    const out = [];
    let c = tag.startOf('day').set({ hour: 9, minute: 0 });
    if (c < start) c = start;
    const ende = tag.startOf('day').plus({ days: 1 });
    let g = 0;
    while (c < ende && c < limit && g < 60) { g++; if (istFrei(c)) out.push(c); c = c.plus({ minutes: SLOT_MIN }); }
    return out;
  };
  const out = [], benutzt = new Set();
  let tag = start.startOf('day');
  let guard = 0;
  while (out.length < maxTotal && tag < limit && guard < 40) {
    guard++;
    const kand = slotsAmTag(tag);
    if (kand.length) {
      const [von, bis] = PRAEFERENZ[out.length % PRAEFERENZ.length];
      const neu = (c) => !benutzt.has(c.toFormat('HH:mm'));
      const wahl = kand.filter(c => c.hour >= von && c.hour < bis && neu(c))[0] || kand.filter(neu)[0] || kand[0];
      out.push(wahl); benutzt.add(wahl.toFormat('HH:mm'));
    }
    tag = tag.plus({ days: 1 }).startOf('day');
  }
  return out;
}
const lbl = dt => WD[dt.weekday] + ' ' + dt.toFormat('dd.LL.') + ' um ' + dt.toFormat('HH:mm');
const p = $('Parse & Normalize').first().json;
const now = $now.setZone(TZ);
const reqStart = DateTime.fromISO(p.startISO).setZone(TZ);
const reqEnd = DateTime.fromISO(p.endISO).setZone(TZ);
const busy = busyFromEvents($input.all());

// Außerhalb der Öffnungszeiten wird NICHT gebucht — der Code entscheidet, nicht der Prompt.
if (!istOffen(reqStart)) {
  const alt = collectFree(busy, now, null, 3);
  return [{ json: { ...p, frei: false, ausserhalb: true, alternativen: alt.map(lbl) } }];
}
// Zu kurzfristig (Vorlauf 2 Stunden) — sonst steht der Termin, bevor jemand ihn sieht.
if (reqStart < now.plus({ minutes: LEAD_MIN })) {
  const alt = collectFree(busy, now, null, 3);
  return [{ json: { ...p, frei: false, zuKurzfristig: true, alternativen: alt.map(lbl) } }];
}
const konflikt = busy.some(([bs, be]) => ov(reqStart, reqEnd, bs, be));
if (!konflikt) { return [{ json: { ...p, frei: true, alternativen: [] } }]; }
const alt = collectFree(busy, now, reqStart, 3);
return [{ json: { ...p, frei: false, alternativen: alt.map(lbl) } }];
