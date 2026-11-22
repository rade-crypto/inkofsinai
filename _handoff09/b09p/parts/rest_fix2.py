p='/tmp/claude-0/lf12/b09p/scenes09p.js';s=open(p).read()
def block(marker,new):
  global s
  i=s.index('// '+marker);j=s.index('\n// ',i+5);s=s[:i]+new.strip('\n')+s[j:]
def R(a,b):
  global s
  assert a in s,a[:90];s=s.replace(a,b,1)
# shared: portrait card used by the favorite/chosen table
R("// ================= first minute v3","""function card(k,sx,sy,sw,sh,cx,cy,w,h,a,lit){if(a<=.003)return;const im=IMG[k];X.save();X.globalAlpha*=a*(lit?1:.42);X.drawImage(im,sx,sy,sw,sh,cx-w/2,cy-h/2,w,h);
  const f=(x0,y0,x1,y1)=>{const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');return g;};
  X.fillStyle=f(cx-w/2,0,cx-w/2+50,0);X.fillRect(cx-w/2,cy-h/2,50,h);X.fillStyle=f(cx+w/2,0,cx+w/2-50,0);X.fillRect(cx+w/2-50,cy-h/2,50,h);X.fillStyle=f(0,cy+h/2,0,cy+h/2-90);X.fillRect(cx-w/2,cy+h/2-90,w,90);X.restore();}
// ================= first minute v3""")
# 0:43 one "Genesis" only; 0:53 no added light beam on Abel
R("  cap('GENESIS',240,FL[1]-70,60,1,false,'10px');","")
R("const tA=C('god accepts',55);const [rx,ry]=P(930,-40);rays(rx,ry,1.92,1000,.35,1.2+.6*sm(tA,tA+.6,v),v,6);bokeh(v,1,29,6);","const tA=C('god accepts',55);bokeh(v,1,29,6);")
# bigger lines everywhere in the rest of the video
R("const gloss=(s,x,y,a,sz=40)=>T(s,x,y,`italic 400 ${Math.max(58,Math.round(sz*1.35))}px Newsreader`,IVORY,a,'center');","const gloss=(s,x,y,a,sz=40)=>T(s,x,y,`italic 400 ${Math.max(62,Math.round(sz*1.35))}px Newsreader`,IVORY,a,'center');")
block("1:19 · רַב","""// 1:19 · רַב — remember this word (open loop 2)
S(vRab-.05,vLov-.05,(v)=>{const a2=ap(v,vArmy,.3);
  if(v<vArmy-.05){pic('12_rebekah_pregnant',v,vRab-4,vArmy,{side:'L',tx:430,z:.95});keyW('רַב','“older”',1300,420,ap(v,vRab+.3,.4),{hs:210,gy:160,gs:62});cap('GENESIS 25:23',1300,180,46,ap(v,vRab+.3,.4),false,'8px');}
  else{const s=1.5*(1+.05*camE((v-vArmy)/6));const [ox,oy]=at(688,470,960,600,s);draw('36_army_32000',ox,oy,s,.55);band(1,380);
    keyW('רַב','',960,150,1,{hs:150});gloss('…centuries later, God says it again,',960,295,a2,64);gloss('about an army,',960,370,ap(v,vArmy+.9,.3),64);
    X.save();X.fillStyle='rgba(5,4,3,.7)';X.fillRect(0,900,W,180);X.restore();gloss('and most of that army gets sent home',960,980,ap(v,vSent,.4),62);}});""")
block("1:31 · Rebekah","""// 1:31 · Rebekah loves Jacob
S(vRL-.05,vStew-.6,(v)=>{pic('14_rebekah_jacob',v,vRL-.05,vStew,{side:'L',tx:560,z:.92});const c=TC();
  kin('Rebekah loves *Jacob*','rebecca loves jacob',89,c,480,78,v);gloss('her younger son',c,580,ap(v,vRL+.8,.4),60);});""")
block("1:41 · goatskin","""// 1:41 · Esau is a hairy man; goatskin on Jacob's hands
S(vHairy-.05,vFeels-.05,(v)=>{const tW=C('so rebecca wraps',101);if(v<tW-.05){pic('21_esau_plan',v,vHairy-.05,tW,{side:'L',tx:600,z:.95});const c=TC();cap('ESAU',c,420,60,ap(v,vHairy,.3),false,'9px');gloss('is a hairy man,',c,520,ap(v,vHairy+.2,.4),66);}
  else{pic('16_goatskin',v,tW-.05,vFeels,{side:'L',tx:600});const c=TC();cap('JACOB',c,380,60,ap(v,tW,.3),true,'9px');gloss('so Rebekah wraps his hands',c,480,ap(v,tW,.4),62);cap('IN GOATSKIN',c,580,52,ap(v,vGoat,.35),true,'8px');}});""")
R("tag('LEAH',560,250,ap(v,vLeah,.35),false,{dx:-150,y:600,tick:false});tag('RACHEL',820,250,ap(v,vRach,.35),true,{dx:170,y:600,tick:false});","tag('LEAH',620,60,ap(v,vLeah,.35),false,{dx:-60,y:120});tag('RACHEL',860,60,ap(v,vRach,.35),true,{dx:90,y:120});")
block("2:52 · this time","""// 2:52 · this time Jacob picks the younger; God sides with the older
S(vPick-.05,vMom-.05,(v)=>{const f=ap(v,vFav,.35);
  if(v<vFav-.1){pic('23_leah_rachel',v,vPick-.05,vFav,{side:'L',tx:520,z:.95});const c=TC();
    tag('RACHEL',860,60,ap(v,vPick+.3,.3),false,{dx:90,y:120});tag('LEAH',620,60,ap(v,vSides+.2,.3),true,{dx:-60,y:120});
    kin('This time it’s *Jacob*|who picks the younger,','this time its jacob',172,c,430,64,v);kin('and *God*|who sides with the older.','and god who sides',175,c,640,64,v);}
  else{BGd();glow(960,540,780,.2);motes(v,.7,200,120,1520,820);
    cap('THE FAVORITE',620,130,46,f,false,'8px');cap('GOD CHOSE',1300,130,46,f,true,'8px');gl(360,170,1560,.5*f);
    card('c_twins',247,20,240,300,620,330,230,288,ap(v,vFav,.35),false);card('c_twins',709,25,240,300,1300,330,230,288,ap(v,vBothT,.35),true);
    cap('ESAU',620,500,44,ap(v,vFav,.35)*.8,false,'7px');cap('JACOB',1300,500,44,ap(v,vBothT,.35),true,'7px');
    card('23_leah_rachel',740,10,240,300,620,690,230,288,ap(v,vJF,.35),false);card('23_leah_rachel',490,10,240,300,1300,690,230,288,ap(v,vBothT+.4,.35),true);
    cap('RACHEL',620,860,44,ap(v,vJF,.35)*.8,false,'7px');cap('LEAH',1300,860,44,ap(v,vBothT+.4,.35),true,'7px');
    T('→',960,330,'400 64px Fraunces',GOLD,ap(v,vBothT,.3),'center');T('→',960,690,'400 64px Fraunces',GOLD,ap(v,vBothT+.4,.3),'center');
    gloss('so it can’t be only about who was born second',960,965,ap(v,vCant,.4),58);}});""")
block("3:15 · Joseph","""// 3:15 · Joseph, and the brothers hate him
S(vJos-.05,vFar-.05,(v)=>{if(v<vHate-.05){pic('26_jacob_joseph',v,vJos-1,vHate,{side:'L',tx:560,fx:880/1376,z:1.05});const [jx]=P(770,0);blackL(Math.max(0,jx-120),jx+40);const c=TC();
    cap('JOSEPH',c,440,72,ap(v,vJos,.35),true,'10px');gloss('Rachel’s son, loved most',c,545,ap(v,vJos+.6,.4),62);}
  else{pic('27_brothers_hate',v,vHate-.05,vFar,{side:'R',tx:1320,z:.62,push:.08});const c=TC();cap('THE BROTHERS',c,470,58,ap(v,vHate,.3),false,'8px');cap('HATE HIM',c,560,58,ap(v,vHate+.2,.3),false,'8px');}});""")
R("gloss('alone',620,670,ap(v,vAlone+.3,.4),44);gloss('alone',960,670,ap(v,vEsauA+.5,.4),44);cap('A WHOLE GROUP',1300,672,46,ap(v,vGroup,.35),true,'7px');",
  "gloss('alone',620,690,ap(v,vAlone+.3,.4),44);gloss('alone',960,690,ap(v,vEsauA+.5,.4),44);cap('A WHOLE GROUP',1300,712,46,ap(v,vGroup,.35),true,'7px');")
R("S(vLands-.05,vIKnow-.05,(v)=>{warm(960,560,820,.8);const z=lerp(.81,.86,camE((v-vLands)/7));bed('02_crossing',v,z);","S(vLands-.05,vIKnow-.05,(v)=>{warm(960,560,820,.8);const z=lerp(.68,.73,camE((v-vLands)/7));bed('02_crossing',v,z);")
R("['גַּם־הוּא יִגְדָּל','וְאוּלָם אָחִיו הַקָּטֹן יִגְדַּל מִמֶּנּוּ'],","['גַּם־הוּא יִגְדָּל','וְאוּלָם אָחִיו הַקָּטֹן','יִגְדַּל מִמֶּנּוּ'],")
R("[[['“He too will be great,',0]],[['but his ',0],['little brother',1]],[['will be greater than he.”',0]]],{hs:84,es:58});","[[['“He too will be great,',0]],[['but his ',0],['little brother',1]],[['will be greater than he.”',0]]],{hs:72,es:56});")
R("S(vFool-.05,vEither-.05,(v)=>{pic('17_isaac_feels',v,vFool-1.5,vEither,{side:'L',tx:520,z:.86});const c=Math.max(1500,TC());","S(vFool-.05,vEither-.05,(v)=>{pic('17_isaac_feels',v,vFool-1.5,vEither,{side:'L',tx:520,z:.86});const c=Math.max(1500,TC());tag('ISAAC',400,60,ap(v,vFool,.3),false,{y:120});tag('JACOB',940,130,ap(v,vFool+.2,.3),true,{y:150});")
s=s.replace("labG('WHO KNOWS WHAT HE’S DOING',c,620,ap(v,vOnly+1,.4),32);","cap('WHO KNOWS EXACTLY',c,640,46,ap(v,vOnly+1,.35),true,'7px');cap('WHAT HE’S DOING',c,705,46,ap(v,vOnly+1.4,.35),true,'7px');")
block("4:15 · Jacob never","""// 4:15 · Jacob never says why; the answer goes to Manasseh's tribe
S(vNever-.05,vGid-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.7,.76,camE((v-vNever)/10)));
  if(v<vAns-.1)kin('But Jacob never says *why*|he crossed his hands.','but jacob never says why',255,960,150,68,v);
  else if(v<vDidnt-.3)kin('The answer comes centuries later,|to a man from the tribe of','the answer comes centuries',258,960,150,64,v);
  else gloss('the older boy who didn’t get the right hand',960,140,ap(v,vDidnt-.3,.35),60);
  const tM=vTribe+.4;tagAt('MANASSEH',300,520,360,330,ap(v,tM,.3),true,60);const [mx,my]=P(520,250);ringA(mx,my,90,70,ap(v,tM,.3),sm(tM,tM+.6,v));});""")
block("4:25 · Gideon","""// 4:25 · Gideon; Midian crushing Israel
S(vGid-.05,vAngel-.05,(v)=>{if(v<vMid-.05){pic('33_gideon_threshing',v,vGid-.05,vMid,{side:'R',tx:1300,push:.08});const c=TC();kin('his name is *Gideon*','his name is gideon',264,c,520,78,v);}
  else{pic('32_midian_raiders',v,vMid-.05,vAngel,{side:'C',push:.07,drift:-40});band(1,200);cap('MIDIAN',960,85,60,ap(v,vMid,.3),false,'10px');gloss('is crushing Israel',960,160,ap(v,vMid+.3,.4),60);}});""")
R("  gloss('an angel finds him…',c,520,ap(v,vAngel,.4),48);});","  cap('AN ANGEL',c,450,60,ap(v,vAngel,.3),true,'9px');gloss('finds him…',c,550,ap(v,vAngel+.3,.4),66);});")
R("  gloss('threshing wheat inside a winepress',c,470,ap(v,vThresh,.4),44);gloss('to hide it from Midian',c,540,ap(v,C('to hide it',272),.4),44);});","  cap('GIDEON',c,380,56,ap(v,vThresh,.3),true,'9px');gloss('threshing wheat',c,470,ap(v,vThresh,.4),62);gloss('inside a winepress',c,545,ap(v,vThresh+.5,.4),62);gloss('to hide it from Midian',c,630,ap(v,C('to hide it',272),.4),56);});")
R("gloss('Gideon says he’s the wrong man:',c,260,ap(v,vWrong,.4)*(1-ap(v,vClan-.3,.3)),44);","gloss('Gideon says',c,440,ap(v,vWrong,.4)*(1-ap(v,vClan-.3,.3)),66);gloss('he’s the wrong man:',c,530,ap(v,vWrong+.4,.4)*(1-ap(v,vClan-.3,.3)),66);")
block("4:40 · ","""// 4:40 · אַלְפִּי my thousand · הַצָּעִיר the youngest
S(vAlfi-.05,vArmy2-.05,(v)=>{pic('35_gideon_me',v,vAlfi-3,vArmy2,{side:'L',tx:400,z:.92});
  keyW('אַלְפִּי','“my thousand”',1580,360,ap(v,vAlfi+.2,.4),{hs:120,gy:115,gs:46});
  keyW('הַצָּעִיר','“the youngest”',1100,360,ap(v,vYst,.4),{hs:120,gy:115,gs:46});
  const s1=ap(v,vSame,.35)*(1-ap(v,vSoG-.2,.3));cap('GENESIS 25:23',1100,560,40,s1,true,'7px');gloss('the same word God used',1340,650,s1,56);gloss('for Jacob before he was born',1340,725,s1,56);
  const k=ap(v,vComeBack,.5);if(k>0){gl(900,800,1780,.5*k);gloss('these two words come back',1340,860,k,58);gloss('at the very end',1340,935,k,58);}});""")
block("5:08 · ","""// 5:08 · רַב: older for twins, many for an army
S(vSameW-.05,v22-.05,(v)=>{BGd();const u=camE((v-vSameW)/14);
  {const s=H/768*.62;draw('12_rebekah_pregnant',300-390*s,1080-750*s,s,.85*ap(v,vMeantO,.4));}
  {const s=1.0*(1+.05*u);const [ox,oy]=at(688,470,1480,640,s);X.save();X.beginPath();X.rect(980,0,940,H);X.clip();draw('36_army_32000',ox,oy,s,.75*ap(v,vMany,.4));X.restore();blackR(1880,1920);
   const g=X.createLinearGradient(980,0,1200,0);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(980,0,220,H);}
  X.save();X.fillStyle='rgba(5,4,3,.55)';X.fillRect(0,0,W,340);X.restore();
  keyW('רַב','',960,170,ap(v,vSameW,.4),{hs:190});
  cap('GENESIS 25:23',620,420,40,ap(v,vMeantO,.4),true,'7px');gloss('“older”',620,500,ap(v,vMeantO,.4),66);
  cap('JUDGES 7:2',1440,420,40,ap(v,vMany,.4),true,'7px');gloss('“many”',1440,500,ap(v,vMany,.4),66);
  X.save();X.fillStyle='rgba(5,4,3,.6)';X.fillRect(0,820,W,260);X.restore();
  enLine([['Either way, it’s the ',0],['bigger side',1],[',',0]],960,875,64,ap(v,vBigger,.4));gloss('and God starts sending it home.',960,965,ap(v,vSend,.4),62);});""")
block("5:36 · the rest","""// 5:36 · the rest kneel down to drink; God keeps the 300
S(vKneel-.05,vValley-.05,(v)=>{if(v<vKeeps-.05){pic('41_kneel_drink',v,vKneel-.05,vKeeps,{side:'C',push:.06});band(1,200);cap('THE REST KNEEL',960,85,56,ap(v,vKneel,.3),false,'9px');gloss('down to drink',960,160,ap(v,vKneel+.3,.4),58);}
  else{pic('40_lap_water',v,vKeeps-.05,vValley,{side:'L',tx:560,z:.92});const c=TC();const n=10000-Math.round(9700*expoO((v-vKeeps-.2)/1.4));
    bigNum(n.toLocaleString('en-US'),c,420,1,130);gloss('God keeps the 300',c,560,ap(v,vKeeps,.4),62);gloss('everyone else is sent home',c,640,ap(v,vKeeps+1.4,.4),58);}});""")
R("cap('A SHOFAR',420,175,46,ap(v,vSho,.35),true,'7px');cap('AN EMPTY CLAY JAR',960,175,46,ap(v,vJar,.35),true,'7px');cap('A TORCH INSIDE',1500,175,46,ap(v,vTorch,.35),true,'7px');",
  "cap('A SHOFAR',330,180,44,ap(v,vSho,.35),true,'6px');cap('AN EMPTY CLAY JAR',930,180,44,ap(v,vJar,.35),true,'6px');cap('A TORCH INSIDE',1560,180,44,ap(v,vTorch,.35),true,'6px');")
# 5:56 the smash lands on "blow"; label lower
s=s.replace("S(vNight-.05,vSmash-.3,(v)=>{","S(vNight-.05,356.65,(v)=>{").replace("S(vSmash-.3,vLeft-.05,(v)=>{pic('44_jar_smash',v,vSmash-.3,vLeft,","S(356.65,vLeft-.05,(v)=>{pic('44_jar_smash',v,356.65,vLeft,")
s=s.replace("band(ap(v,vSmash-.2,.3),140);labG('THEY BLOW THE SHOFARS AND SMASH THE JARS',960,90,ap(v,vSmash-.2,.3),34);","band(1,200);cap('THEY BLOW THE SHOFARS',960,95,50,ap(v,356.65,.25),true,'7px');cap('AND SMASH THE JARS',960,165,50,ap(v,vSmash,.3),true,'7px');")
# torches: a real flame in the left hand; "sword" held before the shout
R("S(vLeft-.05,vShout-.05,(v)=>{pic('45_torch_shofar',v,vLeft-.05,vShout,","S(vLeft-.05,366.6,(v)=>{pic('45_torch_shofar',v,vLeft-.05,366.6,")
R("  const [tx,ty]=P(1100,470),[sx,sy]=P(520,320);\n","  const [tx,ty]=P(1100,470),[sx,sy]=P(520,320);embers(v,1,[[tx,ty-30]],9);orb(tx,ty-50,90,.55);\n")
R("S(vShout-.05,vNoCh-.05,(v)=>{","S(366.6,vNoCh-.05,(v)=>{")
R("  const [tx,ty]=P(1100,470);orb(tx,ty-60,170,.3*ap(v,vLight,.5));","  const [tx,ty]=P(1100,470);embers(v,1,[[tx,ty-30]],9);orb(tx,ty-50,90,.55);orb(tx,ty-60,200,.3*ap(v,vLight,.5));")
R("pic('45_torch_shofar',v,vNobody2-.05,vBack,{side:'R',tx:1200,z:.8,push:.06,fade:false});const c=340;","pic('45_torch_shofar',v,vNobody2-.05,vBack,{side:'R',tx:1270,z:.78,push:.06,fade:false});const c=400;")
s=s.replace("gloss('Nobody in that army',c,420,ap(v,vNobody2,.4),58);gloss('could ever say it,',c,495,ap(v,vNobody2+.6,.4),58);gloss('their hands were full',c,590,ap(v,vLight-.8,.4),58);","gloss('Nobody in that army',c,420,ap(v,vNobody2,.4),56);gloss('could ever say it,',c,495,ap(v,vNobody2+.6,.4),56);gloss('their hands were full',c,590,ap(v,vLight-.8,.4),56);")
s=s.replace("band(ap(v,vNoCh,.4),160);enLine([['But nobody ',0],['charges',1],['.',0]],960,80,50,ap(v,vNoCh,.4));gloss('Each man just stands in his place around the camp.',960,148,ap(v,C('each man just stands',370),.4),42);",
 "band(1,220);enLine([['But nobody ',0],['charges',1],['.',0]],960,88,70,ap(v,vNoCh,.4));gloss('Each man just stands in his place around the camp.',960,170,ap(v,C('each man just stands',370),.4),48);")
s=s.replace("gloss('God had told Gideon why, before the first man went home:',960,250,ap(v,vTold,.4)*(1-ap(v,vYadi,.3)),40);","gloss('God had told Gideon why,',960,450,ap(v,vTold,.4)*(1-ap(v,vYadi,.3)),70);gloss('before the first man went home…',960,560,ap(v,vTold+.9,.4)*(1-ap(v,vYadi,.3)),70);")
# 6:34: ring on Manasseh for the firstborn line, on Ephraim for the younger line
R("const [hx,hy]=P(872,248);ringA(hx-6,hy+16,74,54,ap(v,vBack+.3,.3),sm(vBack+.3,vBack+.9,v));\n  const a1=","const [hx,hy]=P(872,248),[mx,my]=P(548,206);const sw=v>vYoungW-.1;ringA(sw?hx-6:mx,sw?hy+16:my,74,54,sw?ap(v,vYoungW-.1,.3):ap(v,vFirstW,.3),sw?sm(vYoungW-.1,vYoungW+.5,v):sm(vFirstW,vFirstW+.6,v));\n  const a1=")
# 6:46 the shared letters
R("  gloss('…a promise to His people',960,760,ap(v,vProm,.4),48);});","  {const a3=ap(v,vTwoW+.6,.4)*(1-sm(vProm-.3,vProm,v));heb('א ל ף',960,700,72,a3,{gold:{'א':0,'ל':0,'ף':0},t:9});gloss('the same three letters: “thousand”',960,800,a3,52);}\n  gloss('…a promise to His people',960,760,ap(v,vProm,.4),60);});")
open(p,'w').write(s);print('ok')
