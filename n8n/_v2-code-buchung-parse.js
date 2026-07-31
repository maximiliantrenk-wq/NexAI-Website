// NEXAI Voice · Buchung — Payload lesen (flach ODER Vapi-Envelope) + Datum robust parsen (v4-Port)
const TZ = 'Europe/Berlin';
const nowDt = $now.setZone(TZ);
const today = { year: nowDt.year, month: nowDt.month, day: nowDt.day, dow: nowDt.weekday };

const root = $input.first().json || {};
const body = (root.body && typeof root.body === 'object') ? root.body : root;
let toolCallId = '';
let a = {};
if (body && body.message && Array.isArray(body.message.toolCalls) && body.message.toolCalls[0]) {
  const tc = body.message.toolCalls[0];
  toolCallId = tc.id || '';
  let ar = tc.function && tc.function.arguments;
  if (typeof ar === 'string') { try { ar = JSON.parse(ar); } catch (e) { ar = {}; } }
  a = ar || {};
} else {
  a = body || {};
  toolCallId = body.toolCallId || '';
}

const name = String(a.name ?? '').trim();
const email = String(a.email ?? '').trim();
const telefon = String(a.telefon ?? a.phone ?? '').trim();
const anliegen = String(a.anliegen ?? a.topic ?? '').trim();
const notizen = String(a.notizen ?? '').trim();
const terminRaw = String(a.termin ?? a.start ?? a.startISO ?? '').trim();

// ---- verifizierter Datums-Parser (Port aus parse_test4.js) ----
const pad = n => String(n).padStart(2, '0');
function addDaysFmt(off){ const d=new Date(Date.UTC(today.year,today.month-1,today.day)); d.setUTCDate(d.getUTCDate()+off); return pad(d.getUTCDate())+'.'+pad(d.getUTCMonth()+1)+'.'+d.getUTCFullYear(); }
function wdOffset(W){ let o=W-today.dow; if(o<=0)o+=7; return o; }
const TODAY_MMDD = pad(today.month)+pad(today.day);
const WEEKDAYS=[['montag',1],['dienstag',2],['mittwoch',3],['donnerstag',4],['freitag',5],['sonnabend',6],['samstag',6],['sonntag',7]];
const MONTH_ALT='januar|februar|maerz|märz|april|mai|juni|juli|august|september|oktober|november|dezember|jan|feb|mär|mrz|apr|jun|jul|aug|sept|sep|okt|nov|dez';
const MONTHS=[['januar|jan','01'],['februar|feb','02'],['maerz|märz|mär|mrz','03'],['april|apr','04'],['mai','05'],['juni|jun','06'],['juli|jul','07'],['august|aug','08'],['september|sept|sep','09'],['oktober|okt','10'],['november|nov','11'],['dezember|dez','12']];
function hasConcreteDate(s){ return new RegExp('(\\d{1,2}\\.\\d{1,2}|'+MONTH_ALT+')').test(s); }
function resolveRel(t){ const low=t.toLowerCase(); if(hasConcreteDate(low))return t; let s=low;
  s=s.replace(/übermorgen/g,addDaysFmt(2)+' '); s=s.replace(/morgen/g,addDaysFmt(1)+' '); s=s.replace(/heute/g,addDaysFmt(0)+' ');
  for(const wp of WEEKDAYS)s=s.replace(new RegExp(wp[0],'g'),addDaysFmt(wdOffset(wp[1]))+' '); return s; }
function runMarked(input){ let s=input.toLowerCase();
  s=s.replace(/(^|\D)(\d{1,2})[.:](\d{2})\s*uhr/g,'$1$2:$3'); s=s.replace(/(^|\D)(\d{1,2})\s*uhr/g,'$1$2:00');
  for(const mp of MONTHS)s=s.replace(new RegExp('(^|\\D)(\\d{1,2})\\s*\\.?\\s*(?:'+mp[0]+')\\s*\\.?\\s*','g'),'$1$2.'+mp[1]+'.');
  s=s.replace(/[^0-9.: ]/g,''); s=s.replace(/ +/g,' ').trim();
  s=s.replace(/( )(\d{1,2})\.(\d{2})$/g,'$1$2:$3');
  s=s.replace(/(\d{1,2})\.(\d{1,2})\.(\d{1,2})\.(\d{2})(?=\s|$)/g,'$1.$2.@YEAR@ $3:$4');
  s=s.replace(/(\d{1,2})\.(\d{1,2})\.(\d{2})(?=\s|$)/g,'$1.$2.20$3');
  s=s.replace(/(\d{1,2})\.(\d{1,2})\.?\s*(\d{1,2}:\d{2})/g,'$1.$2.@YEAR@ $3'); return s.trim(); }
function smartClean(m){ if(!m.includes('@YEAR@'))return m; const mt=m.match(/^(\d{1,2})\.(\d{1,2})\.@YEAR@/);
  if(!mt)return m.replace(/@YEAR@/g,String(today.year));
  const mm=mt[2].padStart(2,'0'),dd=mt[1].padStart(2,'0'); const yr=((mm+dd)<TODAY_MMDD)?today.year+1:today.year;
  return m.replace(/@YEAR@/g,String(yr)); }

let clean = terminRaw ? smartClean(runMarked(resolveRel(terminRaw))) : '';
const FINAL=/^\d{1,2}\.\d{1,2}\.\d{4} \d{1,2}:\d{2}$/;

let valid=false, past=false, startISO='', endISO='', startLabel='';
if (FINAL.test(clean)) {
  const start = DateTime.fromFormat(clean, 'd.M.yyyy H:mm', { zone: TZ });
  if (start.isValid) {
    const end = start.plus({ minutes: 30 });
    startISO = start.toISO();
    endISO = end.toISO();
    startLabel = start.setLocale('de').toFormat("dd.LL.yyyy 'um' HH:mm");
    if (start > nowDt) valid = true; else past = true;
  }
}
return [{ json: { valid, past, toolCallId, name, email, telefon, anliegen, notizen, terminRaw, clean, startISO, endISO, startLabel } }];
