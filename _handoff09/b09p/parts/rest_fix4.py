import re
p='/tmp/claude-0/lf12/b09p/scenes09p.js';s=open(p).read()
def R(a,b):
  global s
  assert a in s,a[:90];s=s.replace(a,b,1)
def block(marker,new):
  global s
  i=s.index('// '+marker);j=s.index('\n// ',i+5);s=s[:i]+new.strip('\n')+s[j:]
# ---- engine: text never dissolves with the picture (old text out in the first half of a fade, new text in the second half)
R("const SH=[];const S=(a,b,f)=>SH.push({a,b,f});","const SH=[];const S=(a,b,f,keep)=>SH.push({a,b,f,keep});window.TXA=1;\n{const _ft=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(...q){const k=window.TXA;if(k<1){if(k<=.003)return;const g=this.globalAlpha;this.globalAlpha=g*k;_ft.apply(this,q);this.globalAlpha=g;}else _ft.apply(this,q);};}")
R("  if(nx&&v>s.b-XF/2){runShot(s,v);blendShot(nx,v,eio(clamp((v-(s.b-XF/2))/XF)));}\n  else if(pv&&v<s.a+XF/2){runShot(pv,v);blendShot(s,v,eio(clamp((v-(s.a-XF/2))/XF)));}\n  else runShot(s,v);}",
  "  if(nx&&v>s.b-XF/2){window.TXA=nx.keep?1:1-sm(s.b-XF/2,s.b,v);runShot(s,v);window.TXA=nx.keep?1:sm(s.b,s.b+XF*.4,v);blendShot(nx,v,eio(clamp((v-(s.b-XF/2))/XF)));}\n  else if(pv&&v<s.a+XF/2){window.TXA=s.keep?1:1-sm(s.a-XF/2,s.a,v);runShot(pv,v);window.TXA=s.keep?1:sm(s.a,s.a+XF*.4,v);blendShot(s,v,eio(clamp((v-(s.a-XF/2))/XF)));}\n  else{window.TXA=1;runShot(s,v);}window.TXA=1;}")
# labels that persist across the before→crossing fade
R("S(12.05,17.25,(v)=>{","S(12.05,17.25,(v)=>{")
s=s.replace("ringA(hx,hy,110,72,ap(v,C('younger boys head',15),.3)","ringA(hx,hy,110,72,0*ap(v,C('younger boys head',15),.3)")
# ---- 0:29–0:40: two pictures instead of three (twins carry "Jacob" and "his father Isaac"; Cain/Abel the rest); the table persists
i=s.index("S(28.75,31.05,(v)=>{");j=s.index("// ---------- 0:40 ·",i)
s=s[:i]+"""S(28.75,33.35,(v)=>{pic('c_twins',v,28.6,33.5,{side:'L',tx:540,z:.86,ty:590,push:.08,par:[-40,50],pz:[0,.05]});bokeh(v,1,13,5);
  const tP=C('a younger brother',28)+.3;const [ex,ey]=P(367,380),[jx,jy]=P(829,380);dimAt(ex,ey,330,.7*sm(tP,tP+.8,v));warm(jx,jy,360,sm(tP,tP+.8,v));
  tag('ESAU',367,52,ap(v,28.9,.5),false,{y:118});tag('JACOB',829,58,ap(v,28.9,.5),true,{y:118});
  ladder(v,1450,540,LAD(),LADo());});
S(33.35,39.65,(v)=>{pic('05_cain_abel',v,33.2,39.8,{side:'L',tx:520,z:.78,push:.1,par:[50,-50],pz:[.03,0]});bokeh(v,1,17,5);
  const tP=C('from the first two brothers',33)+.6;const [cx0,cy0]=P(170,380),[ax,ay]=P(809,380);dimAt(cx0,cy0,320,.7*sm(tP,tP+.8,v));warm(ax,ay,340,sm(tP,tP+.8,v));
  tag('CAIN',170,82,ap(v,33.6,.5),false,{y:124});tag('ABEL',809,98,ap(v,33.8,.5),true,{y:124});
  ladder(v,1450,560,LAD(),LADo());},true);
"""+s[j:]
# "…wants him dead" holds before Genesis
s=s.replace("S(39.65,43.05,(v)=>{BGd();","S(39.65,43.3,(v)=>{BGd();").replace("S(43.05,47.35,(v)=>{BGd();","S(43.3,47.35,(v)=>{BGd();")
# 0:49 the 300 lands settled
R("{const n=Math.round(300*expoO((v-t3+.05)/.9));bigNum(String(n),400,330,ap(v,t3-.05,.15),220);}","bigNum('300',400,330,ap(v,t3-.05,.5),220);")
# 0:22 verse inside the safe zone
R("vSide(ap(v,22.2,.35),560,'GENESIS 48:18',","vSide(ap(v,22.2,.35),600,'GENESIS 48:18',")
R("{cy:540,hs:112,es:68});});\n// ---------- 0:25","{cy:540,hs:100,es:66});});\n// ---------- 0:25")
# 1:08 Rebekah text in order, full size
R("cap('REBEKAH',c,360,56,ap(v,vReb-.2,.35)*f,false,'8px');kin('has twins','has twins',68,c,460,80,v,{a:f});kin('God chooses|before they’re even born','god chooses before',70,c,640,64,v,{a:f});",
  "cap('REBEKAH',c,360,56,ap(v,69.9,.5)*f,false,'8px');kin('has twins','has twins',68,c,460,80,v,{a:f});kin('God chooses|before they’re even born','god chooses before',70,c,650,72,v,{a:f});")
# 1:38–1:50: hold Isaac and the red-haired Esau through "Esau is a hairy man", then the goatskin hands
i=s.index("S(vMeans-.05,vHairy-.05,(v)=>{");j=s.index("\n// ",i)
s=s[:i]+"""S(vMeans-.05,C('so rebecca wraps',101)-.05,(v)=>{pic('13_isaac_esau',v,vMeans-1,C('so rebecca wraps',101)+.5,{side:'L',tx:600,z:.95});const c=TC();
  if(v<vHairy-.1){gloss('Isaac, who can’t see,',c,470,ap(v,vMeans-.05,.4),60);gloss('still means to bless Esau.',c,555,ap(v,vMeans+.6,.4),60);}
  else{cap('ESAU',c,440,60,ap(v,vHairy,.4),false,'9px');gloss('is a hairy man,',c,540,ap(v,vHairy+.2,.5),66);}});"""+s[j:]
i=s.index("// 1:41 · Esau is a hairy man");j=s.index("\n// ",i+5)
s=s[:i]+"""// 1:41 · goatskin on Jacob's hands
S(C('so rebecca wraps',101)-.05,vFeels-.05,(v)=>{const tW=C('so rebecca wraps',101);pic('16_goatskin',v,tW-.5,vFeels,{side:'L',tx:600});const c=TC();cap('JACOB',c,380,60,ap(v,tW,.4),true,'9px');gloss('so Rebekah wraps',c,470,ap(v,tW,.5),62);gloss('his hands',c,545,ap(v,tW+.3,.5),62);cap('IN GOATSKIN',c,645,52,ap(v,vGoat,.45),true,'8px');});"""+s[j:]
# 1:58 letter swap: no black gap, label switches as the letters land, the two lines stack
i=s.index("S(vTwins-.6,vPlan-.05,(v)=>{BGd();glow(960,520,760,.18);");j=s.index("\n// ",i)
s=s[:i]+"""S(vTwins-.6,vPlan-.05,(v)=>{BGd();glow(960,520,760,.18);motes(v,.6,200,100,1520,880);
  const tS=C('swap two letters',121),tB=C('becomes blessing',123);const sw=sm(tB-.2,tB+1.0,v);const fW=1-sm(vBoth-.4,vBoth,v);
  keyW('בְּכֹרָתִי','“my birthright”',1340,230,ap(v,vTwins-.6,.5)*fW,{hs:96,gy:88,gs:46,gold:false});keyW('בִּרְכָתִי','“my blessing”',580,230,ap(v,vTwins-.3,.5)*fW,{hs:96,gy:88,gs:46,gold:false});
  letters2(v,960,520,sw,ap(v,tS-.3,.5));const k=sm(tB+.6,tB+1.0,v),a2=ap(v,tS-.3,.5);
  T('birthright',960,660,'italic 400 70px Newsreader',IVORY,a2*(1-k),'center');T('blessing',960,660,'italic 400 70px Newsreader',GL,a2*k,'center');
  enLine([['Both belonged to the ',0],['firstborn',1],['.',0]],960,820,62,ap(v,vBoth,.45));enLine([['Both went to the ',0],['younger',1],['.',0]],960,910,62,ap(v,vBoth2,.45));});"""+s[j:]
# 2:08 no small counter under the verse
R("  tally2(v,c,820,Math.floor(ap(v,vSecond,.2))+1,ap(v,vSecond-.2,.4),['CAIN','ESAU','JACOB’S SONS'],250,56);});","});")
# 2:56 Leah/Rachel tags inside the edge
s=s.replace("tag('LEAH',620,40,ap(v,vSides+.2,.3),true,{dx:-60,y:92,tick:false});","tag('LEAH',620,40,ap(v,vSides+.2,.3),true,{dx:0,y:110,tick:false});").replace("tag('RACHEL',860,40,ap(v,vPick+.3,.3),false,{dx:90,y:92,tick:false});","tag('RACHEL',860,40,ap(v,vPick+.3,.3),false,{dx:60,y:110,tick:false});")
s=s.replace("tag('LEAH',620,40,ap(v,vLeah,.35),false,{dx:-60,y:92,tick:false});","tag('LEAH',620,40,ap(v,vLeah,.35),false,{dx:0,y:110,tick:false});").replace("tag('RACHEL',860,40,ap(v,vRach,.35),true,{dx:90,y:92,tick:false});","tag('RACHEL',860,40,ap(v,vRach,.35),true,{dx:60,y:110,tick:false});")
# 2:59 table: no small row labels; the closing line under the table, inside the safe zone
R("    cap('ISAAC’S',260,320,42,ap(v,vFav,.35),false,'7px');cap('JACOB’S',260,770,42,ap(v,vJF,.35),false,'7px');\n","")
R("    gloss('so it can’t be only about who was born second',960,88,ap(v,vCant,.4),60);","    enLine([['so it can’t be only about who was born second',0]],960,1010,52,ap(v,vCant,.45));")
R("const hf=f*(1-sm(vCant-.3,vCant,v));","const hf=f;")
# 3:09 standard size
s=s.replace("enLine([['Jacob, his mother’s favorite,',0]],c,420,56,ap(v,vMom,.4));enLine([['now has a ',0],['favorite',1],[' of his own…',0]],c,510,56,ap(v,vHisOwn,.4));\n  enLine([['a son who is about',0]],c,640,56,ap(v,vPay,.4));enLine([['to pay for it.',0]],c,715,56,ap(v,vPay+.4,.4));",
 "enLine([['Jacob, his mother’s favorite,',0]],c,400,62,ap(v,vMom,.4));enLine([['now has a ',0],['favorite',1],[' of his own…',0]],c,490,62,ap(v,vHisOwn,.4));\n  enLine([['a son who is about',0]],c,630,62,ap(v,vPay,.4));enLine([['to pay for it.',0]],c,710,62,ap(v,vPay+.4,.4));")
# 3:15–3:27: one brothers painting (brothers plus Joseph far off) instead of two near-identical ones
i=s.index("S(vHate-.05,vFar-.05,(v)=>{");j=s.index("\n// ",i)
s=s[:i]+"""S(vHate-.05,vAlone-.05,(v)=>{pic('30_brothers_see',v,vHate-.05,vAlone,{side:'C',z:1,push:.08});
  const a1=1-sm(vFar-.4,vFar-.1,v);band(1,200);cap('THE BROTHERS HATE HIM',960,95,56,ap(v,vHate,.4)*a1,false,'8px');
  const [jx,jy]=P(1120,460);ringA(jx,jy,46,90,ap(v,vFar+.3,.4),sm(vFar+.3,vFar+1.1,v));
  vSide(ap(v,vCome-.1,.4),1540,'GENESIS 37:20','לְכוּ וְנַהַרְגֵהוּ',['וְנַהַרְגֵהוּ'],[[['“Come, let’s ',0],['kill',1],[' him.”',0]]],{cy:230,hs:80,es:56});});"""+s[j:]
i=s.index("// 3:22 · they see him coming");j=s.index("\n// ",i+5);s=s[:i]+s[j+1:]
# 3:27 the counter: centred and big
i=s.index("S(vAlone-.05,vSell-.05,(v)=>{BGd();");j=s.index("\n// ",i)
s=s[:i]+"""S(vAlone-.05,vSell-.05,(v)=>{BGd();card('f_cain_rises',160,10,460,620,560,290,300,400,1,true);card('21_esau_plan',420,0,460,620,960,290,300,400,1,true);card('27_brothers_hate',380,60,640,620,1360,290,360,400,ap(v,vGroup-.2,.4),true);
  tally2(v,960,580,Math.floor(ap(v,vGroup-.3,.2))+2,1,null,400,52);cap('CAIN',560,690,50,1,false,'8px');cap('ESAU',960,690,50,1,false,'8px');cap('JACOB’S SONS',1360,690,46,ap(v,vGroup,.4),false,'7px');
  gloss('alone',560,800,ap(v,vAlone+.3,.5),76);gloss('alone',960,800,ap(v,vEsauA+.5,.5),76);cap('A WHOLE GROUP',1360,805,52,ap(v,vGroup,.45),true,'8px');});"""+s[j:]
# 4:02 ISAAC label clear of his hair
R("tag('ISAAC',400,60,ap(v,vFool,.3),false,{y:130,dx:60});","tag('ISAAC',400,60,ap(v,vFool,.3),false,{y:220,dx:-190,tick:false});")
# 4:10 → 4:15 one held blessing painting (same framing, so the fade is invisible)
R("S(vSbs-.05,vNever-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.8,.84,camE((v-vSbs)/3)));","S(vSbs-.05,vNever-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.8,.86,(v-vSbs)/13.5));")
R("S(vNever-.05,vGid-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.7,.76,camE((v-vNever)/10)));","S(vNever-.05,vGid-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.8,.86,(v-vSbs)/13.5));")
R("  if(v<vAns-.1)kin('But Jacob never says *why*|he crossed his hands.','but jacob never says why',255,960,150,68,v);","  if(v<vAns-.05)kin('But Jacob never says *why*|he crossed his hands.','but jacob never says why',255,960,120,64,v);")
s=s.replace("  else if(v<vDidnt-.3)kin('The answer comes centuries later,|to a man from the tribe of','the answer comes centuries',258,960,150,64,v);\n  else gloss('the older boy who didn’t get the right hand',960,140,ap(v,vDidnt-.3,.35),60);",
 "  else if(v<vDidnt-.3)kin('The answer comes centuries later,|to a man from the tribe of','the answer comes centuries',258,960,120,62,v);\n  else gloss('the older boy who didn’t get the right hand',960,120,ap(v,vDidnt-.3,.35),60);")
# 4:25–4:34: Gideon → Midian → Gideon held (no extra angel shot)
i=s.index("// 4:30 · a messenger finds him");j=s.index("\n// 4:34",i)
s=s[:i]+"""// 4:30 · an angel finds him threshing wheat inside a winepress (one held shot)
S(vAngel-.05,vWrong-.05,(v)=>{pic('33_gideon_threshing',v,vAngel-.5,vWrong,{side:'R',tx:1320,fx:700/1376,z:1.0,push:.08,fade:820});const c=TC();
  cap('AN ANGEL FINDS HIM',c,330,48,ap(v,vAngel,.45),true,'8px');gloss('threshing wheat',c,450,ap(v,vThresh,.5),64);gloss('inside a winepress',c,530,ap(v,vThresh+.5,.5),64);gloss('to hide it from Midian',c,625,ap(v,C('to hide it',272),.5),58);});"""+s[j:]
# 4:40 small refs bigger
s=s.replace("cap('GENESIS 25:23',1100,560,40,ap(v,vSame+.1,.4),true,'7px');","cap('GENESIS 25:23',1100,560,46,ap(v,vSame+.1,.4),true,'7px');")
R("S(vSame-.05,vSoG-.1,(v)=>{","S(vSame-.05,vSoG-.1,(v)=>{")
# keep the two Hebrew words steady across the 4:40 shots
s=s.replace("S(vSame-.05,vSoG-.1,(v)=>{","S(vSame-.05,vSoG-.1,(v)=>{",1)
# 5:03 / 5:23 / 5:38 numbers land settled
R("const n=Math.round(32000*expoO((v-vGath-.2)/1.4));bigNum(n.toLocaleString('en-US'),c,330,ap(v,vGath,.4),130);","bigNum('32,000',c,330,ap(v,vGath+.2,.5),130);")
R("const n=v<v10?Math.round(22000*expoO((v-v22)/1.4)):10000;bigNum(n.toLocaleString('en-US'),c,330,1,130);cap(v<v10?'GO HOME':'REMAIN',c,450,48,1,false,'8px');",
  "const k10=sm(v10-.3,v10+.2,v);bigNum('22,000',c,300,ap(v,v22,.5)*(1-.6*k10),110);cap('GO HOME',c,395,46,ap(v,v22+.3,.5)*(1-.6*k10),false,'8px');bigNum('10,000',c,500,ap(v,v10,.5),110);cap('REMAIN',c,595,46,ap(v,v10+.2,.5),true,'8px');")
R("{cy:730,hs:96,es:62});});\n// 5:31","{cy:820,hs:84,es:56});});\n// 5:31")
# 5:09 רַב: Esau alone under "older"; no small refs
R("{const s=H/768*.6;draw('c_twins',330-600*s,1070-748*s,s,.85*ap(v,vSameW,.3));}","{const s=H/768*.62;X.save();X.globalAlpha*=.85*ap(v,vSameW,.3);X.drawImage(IMG['c_twins'],230,0,290,768,620-140*s,1070-748*s,290*s,768*s);X.restore();}")
R("cap('GENESIS 25:23',620,380,40,ap(v,vMeantO,.4),true,'7px');gloss('“older”',620,455,ap(v,vMeantO,.4),66);","cap('ESAU',620,380,46,ap(v,vMeantO,.4),false,'8px');gloss('“older”',620,455,ap(v,vMeantO,.4),66);")
R("cap('JUDGES 7:2',1440,380,40,ap(v,vMany,.4),true,'7px');gloss('“many”',1440,455,ap(v,vMany,.4),66);","cap('THE ARMY',1440,380,46,ap(v,vMany,.4),false,'8px');gloss('“many”',1440,455,ap(v,vMany,.4),66);")
# 5:36: one split screen: the 300 kept, the rest sent home; the number fixed
i=s.index("// 5:36 · the rest");j=s.index("\n// 5:41",i)
s=s[:i]+"""// 5:36 · the rest kneel down to drink; God keeps the 300 (split screen)
S(vKneel-.05,vValley-.05,(v)=>{BGd();const u=camE((v-vKneel)/5);
  {const sc=H/768*.8;draw('40_lap_water',480-767*sc,560-384*sc,sc);}
  {const sc=1.0*(1+.04*u);const [ox,oy]=at(688,420,1440,600,sc);X.save();X.beginPath();X.rect(960,0,960,H);X.clip();draw('41_kneel_drink',ox,oy,sc,.9);X.restore();const g=X.createLinearGradient(960,0,1160,0);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(960,0,200,H);}
  band(1,210);cap('THE REST KNEEL',1440,90,50,ap(v,vKneel,.45),false,'8px');gloss('sent home',1440,165,ap(v,vKeeps+1.3,.5),58);
  bigNum('300',480,120,ap(v,vKeeps,.5),110);gloss('kept',480,205,ap(v,vKeeps+.4,.5),58);},true);"""+s[j:]
# 5:44 weapons: the VO's words, labels clear of the torches, title out once labels arrive
R("band(1,280);gloss('Then Gideon hands out the weapons:',960,85,ap(v,vHands,.4),56);","band(1,280);gloss('Then Gideon hands out the weapons:',960,85,ap(v,vHands,.4)*(1-sm(vSho-.4,vSho,v)),56);")
R("cap('A SHOFAR',1060,185,52,ap(v,vSho,.35),true,'7px');T('a ram’s horn',1060,245,'italic 400 50px Newsreader',IVORY,ap(v,vSho+.3,.35),'center');cap('AN EMPTY CLAY JAR',470,185,50,ap(v,vJar,.35),true,'7px');cap('A TORCH INSIDE',470,245,46,ap(v,vTorch,.35),true,'6px');",
  "cap('A SHOFAR',1060,95,56,ap(v,vSho,.4),true,'8px');gloss('a horn to blow',1060,170,ap(v,vSho+.3,.45),56);cap('AN EMPTY CLAY JAR',470,95,52,ap(v,vJar,.4),true,'7px');cap('A TORCH INSIDE',470,165,48,ap(v,vTorch,.4),true,'7px');")
# 5:59 torches: the verse stays; one ring at a time; "both hands are full" added under it
R("  ringA(tx,ty,70,110,ap(v,vLeft+.2,.35),sm(vLeft+.2,vLeft+.9,v));ringA(sx,sy,90,80,ap(v,vRight+.2,.35),sm(vRight+.2,vRight+.9,v));",
  "  ringA(tx,ty,70,110,ap(v,vLeft+.2,.4)*(1-sm(vRight,vRight+.3,v)),sm(vLeft+.2,vLeft+.9,v));ringA(sx,sy,90,80,ap(v,vRight+.2,.4)*(1-sm(vHFull,vHFull+.3,v)),sm(vRight+.2,vRight+.9,v));")
R("vSide(ap(v,vLeft,.35)*(1-sm(vHFull-.3,vHFull,v)),c,'JUDGES 7:20','',[],[[['“…the ',0],['torches',1]],[['in their left hands,',0]],[['and the ',0],['shofars',1]],[['in their right…”',0]]],{cy:500,es:62});\n  cap('BOTH HANDS',c,450,58,ap(v,vHFull,.35),true,'8px');cap('ARE FULL',c,530,58,ap(v,vHFull+.2,.35),true,'8px');kin('Not one of them|is holding a *sword*.','not one of them is holding',364,c,690,64,v);",
  "vSide(ap(v,vLeft,.4),c,'JUDGES 7:20','',[],[[['“…the ',0],['torches',1]],[['in their left hands,',0]],[['and the ',0],['shofars',1]],[['in their right…”',0]]],{cy:360,es:58});\n  cap('BOTH HANDS ARE FULL',c,700,44,ap(v,vHFull,.45),true,'7px');kin('Not one of them|is holding a *sword*.','not one of them is holding',364,c,840,58,v);")
# 6:46 Isaiah: just the reference and the words
R("  T(mf<.5?'JUDGES 6:15 · GIDEON’S TWO WORDS':'ISAIAH 60:22',960,250,'300 40px Fraunces',GOLD,ap(v,vCent+.3,.4),'center','7px');\n  {const a3=ap(v,vTwoW+.6,.4)*(1-sm(vProm-.3,vProm,v));heb('א ל ף',960,700,72,a3,{gold:{'א':0,'ל':0,'ף':0},t:9});gloss('the same three letters: “thousand”',960,800,a3,52);}\n",
  "  T('ISAIAH 60:22',960,250,'300 48px Fraunces',GOLD,ap(v,vIsa-.2,.5),'center','8px');\n")
open(p,'w').write(s);print('ok')
