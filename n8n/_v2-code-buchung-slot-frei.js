// NEXAI Voice · Buchung — Wunsch-Slot prüfen; bei Konflikt 3 Alternativen berechnen
const TZ='Europe/Berlin';
const DAY_START=9,DAY_END=17,SAT_END=12,SLOT_MIN=30,LEAD_MIN=120,HORIZON=14;
const WD=['','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
const ov=(aS,aE,bS,bE)=>aS<bE&&bS<aE;
function busyFromEvents(items){const busy=[];for(const it of items){const e=(it&&it.json)?it.json:it;if(!e)continue;if(e.status==='cancelled')continue;if(e.transparency==='transparent')continue;const s=e.start&&(e.start.dateTime||e.start.date);const en=e.end&&(e.end.dateTime||e.end.date);if(!s||!en)continue;const es=DateTime.fromISO(s).setZone(TZ),ee=DateTime.fromISO(en).setZone(TZ);if(!es.isValid||!ee.isValid)continue;busy.push([es,ee]);}return busy;}
function collectFree(busy,now,from,maxTotal,maxPerDay){const earliest=now.plus({minutes:LEAD_MIN}),limit=now.plus({days:HORIZON});let cur=((from&&from>earliest)?from:earliest).set({second:0,millisecond:0});if(cur.minute!==0&&cur.minute!==30)cur=cur.minute<30?cur.set({minute:30}):cur.plus({hours:1}).set({minute:0});const out=[],per={};let g=0;while(out.length<maxTotal&&cur<limit&&g<5000){g++;const wd=cur.weekday,h=cur.hour+cur.minute/60,dk=cur.toFormat('yyyy-LL-dd');if(wd>=1&&wd<=6&&h>=DAY_START&&h+SLOT_MIN/60<=(wd===6?SAT_END:DAY_END)&&cur>=earliest&&(per[dk]||0)<maxPerDay){const cE=cur.plus({minutes:SLOT_MIN});if(!busy.some(([bs,be])=>ov(cur,cE,bs,be))){out.push(cur);per[dk]=(per[dk]||0)+1;}}cur=cur.plus({minutes:SLOT_MIN});}return out;}
const lbl=dt=>WD[dt.weekday]+' '+dt.toFormat('dd.LL.')+' um '+dt.toFormat('HH:mm');
const p=$('Parse & Normalize').first().json;
const now=$now.setZone(TZ);
const reqStart=DateTime.fromISO(p.startISO).setZone(TZ);
const reqEnd=DateTime.fromISO(p.endISO).setZone(TZ);
const busy=busyFromEvents($input.all());
const konflikt=busy.some(([bs,be])=>ov(reqStart,reqEnd,bs,be));
if(!konflikt){return [{ json: { ...p, frei:true, alternativen:[] } }];}
const alt=collectFree(busy,now,reqStart,3,99);
return [{ json: { ...p, frei:false, alternativen:alt.map(lbl) } }];
