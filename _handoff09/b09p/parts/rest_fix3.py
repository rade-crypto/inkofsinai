p='/tmp/claude-0/lf12/b09p/scenes09p.js';s=open(p).read()
def block(marker,new):
  global s
  i=s.index('// '+marker);j=s.index('\n// ',i+5);s=s[:i]+new.strip('\n')+s[j:]
def R(a,b):
  global s
  assert a in s,a[:90];s=s.replace(a,b,1)
# 1:08 + 1:19: one continuous camera on pregnant Rebekah (the only scene with her), then the army
R("S(vTw-.1,vRab-.05,(v)=>{pic('12_rebekah_pregnant',v,vTw-.1,vRab,{side:'L',tx:560,push:.14});","S(vTw-.1,vRab-.05,(v)=>{pic('12_rebekah_pregnant',v,vTw-.1,vArmy,{side:'L',tx:560,push:.14});")
block("1:19 · רַב","""// 1:19 · רַב — remember this word (open loop 2)
S(vRab-.05,vArmy-.05,(v)=>{pic('12_rebekah_pregnant',v,vTw-.1,vArmy,{side:'L',tx:560,push:.14});const c=TC();keyW('רַב','“older”',c,440,ap(v,vRab+.3,.5),{hs:210,gy:160,gs:62});cap('GENESIS 25:23',c,200,46,ap(v,vRab+.3,.5),false,'8px');});
S(vArmy-.05,vLov-.05,(v)=>{const a2=ap(v,vArmy+.1,.5);const sc=1.5*(1+.05*camE((v-vArmy)/6));const [ox,oy]=at(688,470,960,600,sc);draw('36_army_32000',ox,oy,sc,.55);band(1,380);
  keyW('רַב','',960,150,1,{hs:150});gloss('…centuries later, God says it again,',960,300,a2,64);gloss('about an army,',960,388,ap(v,vArmy+.9,.4),64);
  {const g=X.createLinearGradient(0,820,0,1080);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(.5,'rgba(5,4,3,.85)');g.addColorStop(1,'rgba(5,4,3,.95)');X.fillStyle=g;X.fillRect(0,820,W,260);}gloss('and most of that army gets sent home',960,985,ap(v,vSent,.5),62);});""")
# 1:41 two shots so they fade
block("1:41 · Esau is a hairy man","""// 1:41 · Esau is a hairy man; goatskin on Jacob's hands
S(vHairy-.05,C('so rebecca wraps',101)-.05,(v)=>{pic('21_esau_plan',v,vHairy-.05,C('so rebecca wraps',101)+.5,{side:'L',tx:600,z:.95});const c=TC();cap('ESAU',c,420,60,ap(v,vHairy,.4),false,'9px');gloss('is a hairy man,',c,520,ap(v,vHairy+.2,.5),66);});
S(C('so rebecca wraps',101)-.05,vFeels-.05,(v)=>{const tW=C('so rebecca wraps',101);pic('16_goatskin',v,tW-.5,vFeels,{side:'L',tx:600});const c=TC();cap('JACOB',c,380,60,ap(v,tW,.4),true,'9px');gloss('so Rebekah wraps',c,470,ap(v,tW,.5),62);gloss('his hands',c,545,ap(v,tW+.3,.5),62);cap('IN GOATSKIN',c,645,52,ap(v,vGoat,.45),true,'8px');});""")
# 1:58 the two words and the letter swap, redone cleanly
i=s.index("// 1:58 · two words");j=s.index("\n// 2:08",i)
s=s[:i]+"""// 1:58 · בְּכֹרָתִי “my birthright” and בִּרְכָתִי “my blessing”: swap two letters
function letters2(v,cx,y,swapU,a){const L5=['ב','כ','ר','ת','י'],gap=170,x0=cx+2*gap;
  L5.forEach((ch,i)=>{let x=x0-i*gap,yy=y;const sw=(i===1||i===2);if(sw){const to=i===1?x0-2*gap:x0-gap;const u=eio(swapU);x=lerp(x,to,u);yy=y-(i===1?1:-1)*110*Math.sin(Math.PI*u);}
    heb(ch,x,yy,170,a,{gold:sw?{[ch]:0}:{},t:9});});}
S(vTwins-.6,vPlan-.05,(v)=>{BGd();glow(960,520,760,.18);motes(v,.6,200,100,1520,880);
  const tS=C('swap two letters',121),tB=C('becomes blessing',123)+.2;const f1=1-sm(tS-.5,tS-.1,v);
  keyW('בְּכֹרָתִי','“my birthright”',960,300,ap(v,vTwins-.6,.5)*f1,{hs:140,gy:120,gs:58,gold:false});
  keyW('בִּרְכָתִי','“my blessing”',960,640,ap(v,vTwins-.3,.5)*f1,{hs:140,gy:120,gs:58,gold:false});
  const a2=ap(v,tS-.1,.5);if(a2>0){letters2(v,960,450,sm(tS+.3,tS+1.6,v),a2);const k=sm(tB-.3,tB+.3,v);
    T('birthright',960,640,'italic 400 72px Newsreader',IVORY,a2*(1-k),'center');T('blessing',960,640,'italic 400 72px Newsreader',GL,a2*k,'center');}
  const bt=ap(v,vBoth,.45);if(bt>0){enLine([['Both belonged to the ',0],['firstborn',1],['.',0]],960,850,66,bt*(1-sm(vBoth2-.3,vBoth2,v)));enLine([['Both went to the ',0],['younger',1],['.',0]],960,850,66,ap(v,vBoth2,.4));}});"""+s[j:]
# 2:52 two shots
i=s.index("// 2:52 · this time");j=s.index("\n// 3:09",i);blk=s[i:j]
a=blk.index("  if(v<vFav-.1){");b=blk.index("  else{BGd();")
first=blk[a+len("  if(v<vFav-.1){"):b].rstrip().rstrip('}')
second=blk[b+len("  else{BGd();"):].rstrip()
second=second[:second.rindex('}});')]
s=s[:i]+"// 2:52 · this time Jacob picks the younger; God sides with the older\nS(vPick-.05,vFav-.1,(v)=>{"+first+"});\nS(vFav-.1,vMom-.05,(v)=>{const f=ap(v,vFav,.35);BGd();"+second+"});"+s[j:]
# 3:15 two shots
block("3:15 · Joseph","""// 3:15 · Joseph, and the brothers hate him
S(vJos-.05,vHate-.05,(v)=>{pic('26_jacob_joseph',v,vJos-1,vHate+.5,{side:'L',tx:560,fx:880/1376,z:1.05});const [jx]=P(770,0);blackL(Math.max(0,jx-120),jx+40);const c=TC();
  cap('JOSEPH',c,440,72,ap(v,vJos,.4),true,'10px');gloss('Rachel’s son, loved most',c,545,ap(v,vJos+.6,.5),62);});
S(vHate-.05,vFar-.05,(v)=>{pic('27_brothers_hate',v,vHate-.5,vFar,{side:'R',tx:1320,z:.62,push:.08});const c=TC();cap('THE BROTHERS',c,470,58,ap(v,vHate,.4),false,'8px');cap('HATE HIM',c,560,58,ap(v,vHate+.2,.4),false,'8px');});""")
# 4:25 two shots
block("4:25 · Gideon","""// 4:25 · Gideon; Midian crushing Israel
S(vGid-.05,vMid-.05,(v)=>{pic('33_gideon_threshing',v,vGid-.05,vMid+.5,{side:'R',tx:1300,fx:790/1376,z:.95,push:.08,fade:760});const c=TC();kin('his name is *Gideon*','his name is gideon',264,c,520,78,v);});
S(vMid-.05,vAngel-.05,(v)=>{pic('32_midian_raiders',v,vMid-.5,vAngel,{side:'C',push:.07,drift:-40});band(1,200);cap('MIDIAN',960,85,60,ap(v,vMid,.4),false,'10px');gloss('is crushing Israel',960,160,ap(v,vMid+.3,.5),60);});""")
# 4:40 three shots: Gideon, the twins (the same word for Jacob), Gideon
block("4:40 · ","""// 4:40 · אַלְפִּי my thousand · הַצָּעִיר the youngest
function twoWords(v){keyW('אַלְפִּי','“my thousand”',1580,360,ap(v,vAlfi+.2,.5),{hs:120,gy:115,gs:46});keyW('הַצָּעִיר','“the youngest”',1100,360,ap(v,vYst,.5),{hs:120,gy:115,gs:46});}
S(vAlfi-.05,vSame-.05,(v)=>{pic('35_gideon_me',v,vAlfi-3,vArmy2,{side:'L',tx:400,z:.92,push:.2});twoWords(v);});
S(vSame-.05,vSoG-.1,(v)=>{pic('c_twins',v,vSame-.5,vSoG+.5,{side:'L',tx:380,z:.8,ty:600,push:.06});const [jx]=P(829,0);tag('JACOB',829,58,ap(v,vSame,.4),true,{y:118});twoWords(v);
  cap('GENESIS 25:23',1100,560,40,ap(v,vSame+.1,.4),true,'7px');gloss('the same word God used',1340,650,ap(v,vSame,.5),56);gloss('for Jacob before he was born',1340,725,ap(v,vSame+.3,.5),56);});
S(vSoG-.1,vArmy2-.05,(v)=>{pic('35_gideon_me',v,vAlfi-3,vArmy2,{side:'L',tx:400,z:.92,push:.2});twoWords(v);
  const k=ap(v,vComeBack,.6);if(k>0){gl(900,800,1780,.5*k);gloss('these two words come back',1340,860,k,58);gloss('at the very end',1340,935,k,58);}});""")
# 5:00 the army: picture right, the count and the verse on the black side
block("5:00 · 32,000","""// 5:00 · 32,000 men; “the people are too many”
S(vArmy2-.05,vSameW-.05,(v)=>{pic('36_army_32000',v,vArmy2-.05,vSameW,{side:'R',tx:1280,z:.86,push:.08,fade:760});const c=430;
  const n=Math.round(32000*expoO((v-vGath-.2)/1.4));bigNum(n.toLocaleString('en-US'),c,330,ap(v,vGath,.4),130);cap('MEN',c,450,50,ap(v,vGath+.4,.4),false,'9px');
  vSide(ap(v,vRav+.1,.45),c,'JUDGES 7:2','רַב הָעָם',['רַב'],[[['“The people',0]],[['are ',0],['too many',1],['.”',0]]],{cy:730,hs:96,es:62});});""")
R("{const s=H/768*.62;draw('12_rebekah_pregnant',300-390*s,1080-750*s,s,.85*ap(v,vSameW,.3));}","{const s=H/768*.6;draw('c_twins',330-600*s,1070-748*s,s,.85*ap(v,vSameW,.3));}")
block("5:23 · 22,000","""// 5:23 · 22,000 leave
S(v22-.05,vWater-.05,(v)=>{pic('37_22000_leave',v,v22-.05,vWater,{side:'R',tx:1280,z:.86,push:.08,drift:40,fade:760});const c=430;
  const n=v<v10?32000-Math.round(22000*eio(sm(v22,v22+1.8,v))):10000;bigNum(n.toLocaleString('en-US'),c,330,1,130);cap(v<v10?'GO HOME':'REMAIN',c,450,48,1,false,'8px');
  vSide(ap(v,vOd,.45),c,'JUDGES 7:4','עוֹד הָעָם רָב',['עוֹד','רָב'],[[['“The people are',0]],[['still too many',1],['.”',0]]],{cy:730,hs:96,es:62});});""")
# 5:36 two shots
block("5:36 · the rest","""// 5:36 · the rest kneel down to drink; God keeps the 300
S(vKneel-.05,vKeeps+1.1,(v)=>{pic('41_kneel_drink',v,vKneel-.05,vKeeps+1.6,{side:'C',push:.06});band(1,200);cap('THE REST KNEEL',960,85,56,ap(v,vKneel,.4),false,'9px');gloss('down to drink',960,160,ap(v,vKneel+.3,.5),58);});
S(vKeeps+1.1,vValley-.05,(v)=>{pic('40_lap_water',v,vKeeps+.6,vValley,{side:'L',tx:560,z:.92});const c=TC();const n=10000-Math.round(9700*expoO((v-vKeeps-1.15)/1.2));
  bigNum(n.toLocaleString('en-US'),c,420,1,130);gloss('God keeps the 300,',c,560,ap(v,vKeeps+1.1,.4),62);gloss('everyone else',c,640,ap(v,vKeeps+1.3,.5),62);gloss('is sent home',c,715,ap(v,vKeeps+1.5,.5),62);});""")
open(p,'w').write(s);print('ok')
