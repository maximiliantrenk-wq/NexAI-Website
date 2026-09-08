// NEXAI Voice · Verfügbarkeit — freie Slots deterministisch berechnen (kein LLM-Raten)
const TZ='Europe/Berlin';
const DAY_START=9,DAY_END=17,SLOT_MIN=30,LEAD_MIN=120,HORIZON=14;
const WD=['','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag','Sonntag'];
const ov=(aS,aE,bS,bE)=>aS<bE&&bS<aE;
function busyFromEvents(items){const busy=[];for(const it of items){const e=(it&&it.json)?it.json:it;if(!e)continue;if(e.status==='cancelled')continue;if(e.transparency==='transparent')continue;const s=e.start&&(e.start.dateTime||e.start.date);const en=e.end&&(e.end.dateTime||e.end.date);if(!s||!en)continue;const es=DateTime.fromISO(s).setZone(TZ),ee=DateTime.fromISO(en).setZone(TZ);if(!es.isValid||!ee.isValid)continue;busy.push([es,ee]);}return busy;}
function collectFree(busy,now,from,maxTotal,maxPerDay){const earliest=now.plus({minutes:LEAD_MIN}),limit=now.plus({days:HORIZON});let cur=((from&&from>earliest)?from:earliest).set({second:0,millisecond:0});if(cur.minute!==0&&cur.minute!==30)cur=cur.minute<30?cur.set({minute:30}):cur.plus({hours:1}).set({minute:0});const out=[],per={};let g=0;while(out.length<maxTotal&&cur<limit&&g<5000){g++;const wd=cur.weekday,h=cur.hour+cur.minute/60,dk=cur.toFormat('yyyy-LL-dd');if(wd>=1&&wd<=5&&h>=DAY_START&&h+SLOT_MIN/60<=DAY_END&&cur>=earliest&&(per[dk]||0)<maxPerDay){const cE=cur.plus({minutes:SLOT_MIN});if(!busy.some(([bs,be])=>ov(cur,cE,bs,be))){out.push(cur);per[dk]=(per[dk]||0)+1;}}cur=cur.plus({minutes:SLOT_MIN});}return out;}
const lbl=dt=>WD[dt.weekday]+' '+dt.toFormat('dd.LL.')+' um '+dt.toFormat('HH:mm');
const now=$now.setZone(TZ);
const busy=busyFromEvents($input.all());
const slots=collectFree(busy,now,null,8,2);
const toolCallId=$('Parse').first().json.toolCallId;
const heute='Heute ist '+WD[now.weekday]+', der '+now.toFormat('dd.LL.yyyy')+'.';
let result;
if(slots.length===0){result=heute+' In den nächsten 14 Tagen ist leider kein Termin frei. Entschuldige dich und biete an, dass sich das Team beim Anrufer meldet.';}
else{result=heute+' Freie Termine (Europe/Berlin, Dauer 30 Minuten): '+slots.map(lbl).join(' | ')+'. Schlage dem Anrufer 3 davon vor — bevorzugt an verschiedenen Tagen und passend zu seinem Wunsch. Nenne NUR Termine aus dieser Liste, erfinde keine. Nennt der Anrufer einen anderen konkreten Wunsch, buche direkt; das Buchungssystem prüft final und schlägt sonst Alternativen vor.';}
return [{ json: { results: [{ toolCallId, result }] } }];
