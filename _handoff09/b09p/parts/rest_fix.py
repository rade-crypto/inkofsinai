import re
p='/tmp/claude-0/lf12/b09p/scenes09p.js';s=open(p).read()
def block(marker,new):
  global s
  i=s.index('// '+marker);j=s.index('\n// ',i+5)
  s=s[:i]+new.strip('\n')+s[j:]
block("1:08 · twins","""// 1:08 · twins, chosen before they're born
S(vTw-.1,vRab-.05,(v)=>{pic('12_rebekah_pregnant',v,vTw-.1,vRab,{side:'L',tx:560});const c=TC();const vs=C('the older will serve',75);const f=1-sm(vs-.35,vs-.05,v);
  cap('REBEKAH',c,430,56,ap(v,vReb-.2,.35)*f,false,'8px');kin('has twins','has twins',68,c,540,80,v,{a:f});
  vSide(ap(v,vs,.3),c,'GENESIS 25:23','וְרַב יַעֲבֹד צָעִיר',['וְרַב','צָעִיר'],[[['“The ',0],['older',1],[' will serve',0]],[['the ',0],['younger',1],['.”',0]]],{cy:540,hs:108,es:68});});""")
block("1:28 · Isaac loves","""// 1:28 · Isaac loves Esau
S(vLov-.05,vRL-.05,(v)=>{pic('13_isaac_esau',v,vLov-.05,vRL,{side:'L',tx:560,z:.86});const c=TC();
  kin('Isaac loves *Esau*','isaac loves esau',86,c,480,84,v);gloss('the firstborn twin',c,585,ap(v,vLov+.6,.4),48);});""")
block("1:33 · the birthright","""// 1:33 · the birthright for a bowl of stew
S(vStew-.6,vMeans-.05,(v)=>{pic('15_stew',v,vStew-.6,vMeans,{side:'L',tx:540,z:.72});const c=TC();
  cap('THE BIRTHRIGHT',c,440,56,ap(v,vStew-.5,.35),true,'8px');kin('for a bowl|of stew','bowl of stew',93,c,600,80,v,{skip:-2});});""")
block("1:38 · Isaac still","""// 1:38 · Isaac still means to bless Esau
S(vMeans-.05,vHairy-.05,(v)=>{pic('13_isaac_esau',v,vMeans-1,vHairy,{side:'L',tx:600,z:.95});const c=TC();
  gloss('Isaac, who can’t see,',c,470,ap(v,vMeans-.05,.4),60);gloss('still means to bless Esau.',c,555,ap(v,vMeans+.6,.4),60);});""")
block("1:45 · Isaac feels","""// 1:45 · Isaac feels the hairy hands
S(vFeels-.05,vCry-.05,(v)=>{pic('17_isaac_feels',v,vFeels-.05,vCry,{side:'L',tx:520,z:.86,push:.09});const c=Math.max(1500,TC());
  const [hx,hy]=P(700,430);ringA(hx,hy,110,80,ap(v,vFeels+.3,.35),sm(vFeels+.3,vFeels+1,v));
  gloss('He feels those',c,430,ap(v,vFeels,.4),62);gloss('hairy hands…',c,510,ap(v,vFeels+.3,.4),62);cap('AND BLESSES JACOB',c,620,48,ap(v,vInst,.35),true,'7px');});""")
s=s.replace("const bt=ap(v,vBoth,.4);if(bt>0){enLine([['Both belonged to the ',0],['firstborn',1],['.',0]],960,940,46,bt*(1-sm(vBoth2-.2,vBoth2+.1,v)));enLine([['Both went to the ',0],['younger',1],['.',0]],960,940,46,ap(v,vBoth2,.3));}});",
 "const bt=ap(v,vBoth,.4);if(bt>0){enLine([['Both belonged to the ',0],['firstborn',1],['.',0]],960,940,66,bt*(1-sm(vBoth2-.2,vBoth2+.1,v)));enLine([['Both went to the ',0],['younger',1],['.',0]],960,940,66,ap(v,vBoth2,.3));}});")
s=s.replace("T(v<vBirth+.3?'birthright':'blessing',960,820,'italic 400 54px Newsreader',IVORY,ap(v,vTwins+.6,.4),'center');","T(v<vBirth+.3?'birthright':'blessing',960,815,'italic 400 66px Newsreader',IVORY,ap(v,vTwins+.6,.4),'center');")
s=s.replace("keyW('בְּכֹרָתִי','“my birthright”',1300,280,ap(v,vTwins-.5,.4),{hs:88,gy:80,gs:42,gold:false});keyW('בִּרְכָתִי','“my blessing”',620,280,ap(v,vTwins-.3,.4),{hs:88,gy:80,gs:42,gold:false});",
 "keyW('בְּכֹרָתִי','“my birthright”',1320,260,ap(v,vTwins-.5,.4),{hs:96,gy:90,gs:46,gold:false});keyW('בִּרְכָתִי','“my blessing”',600,260,ap(v,vTwins-.3,.4),{hs:96,gy:90,gs:46,gold:false});")
block("2:24 · Leah","""// 2:24 · Leah the older, Rachel the younger
S(vDau-.05,vTrick-.05,(v)=>{pic('23_leah_rachel',v,vDau-.05,vTrick,{side:'L',tx:560});const c=TC();
  tag('LEAH',560,250,ap(v,vLeah,.35),false,{dx:-150,y:600,tick:false});tag('RACHEL',820,250,ap(v,vRach,.35),true,{dx:170,y:600,tick:false});
  gloss('Leah, the older,',c,440,ap(v,vLeah,.4),62);enLine([['and ',0],['Rachel',1],[', the younger,',0]],c,525,62,ap(v,vRach,.4));gloss('whom Jacob loves',c,610,ap(v,vLoves,.4),62);});""")
block("2:31 · Laban","""// 2:31 · Laban's excuse
S(vTrick-.05,vOfAll-.05,(v)=>{pic('24_laban',v,vTrick-.05,vOfAll,{side:'L',tx:540,z:.95});const c=TC();const f=1-sm(vAround-.4,vAround-.1,v);
  cap('LABAN',c,440,56,ap(v,vTrick,.35)*f,false,'8px');gloss('tricks him into',c,545,ap(v,vTrick+.4,.4)*f,60);gloss('marrying Leah first',c,625,ap(v,vTrick+.9,.4)*f,60);
  verse2(ap(v,vAround,.35),c,540,'GENESIS 29:26',['לֹא־יֵעָשֶׂה כֵן בִּמְקוֹמֵנוּ','לָתֵת הַצְּעִירָה לִפְנֵי הַבְּכִירָה'],['הַצְּעִירָה'],[[['“It is not done in our place,',0]],[['to give the ',0],['younger',1]],[['before the firstborn.”',0]]],{hs:80,es:60});});""")
block("2:40 · Jacob, of all","""// 2:40 · Jacob, of all people
S(vOfAll-.05,vSees-.05,(v)=>{pic('c_twins',v,vOfAll-.05,vSees,{side:'L',tx:560,fx:829/1376,z:1.12,ty:600});const c=TC();
  gloss('Jacob, of all people,',c,460,ap(v,vOfAll,.4),64);enLine([['is told the ',0],['firstborn',1]],c,550,64,ap(v,vOfAll+.8,.4));gloss('comes first.',c,635,ap(v,vOfAll+1.3,.4),64);});""")
s=s.replace("enLine([['This time it’s ',0],['Jacob',1],[' who picks the younger,',0]],960,420,52,ap(v,vPick,.4));enLine([['and ',0],['God',1],[' who sides with the older.',0]],960,510,52,ap(v,vSides,.4));",
 "enLine([['This time it’s ',0],['Jacob',1],[' who picks the younger,',0]],960,400,70,ap(v,vPick,.4));enLine([['and ',0],['God',1],[' who sides with the older.',0]],960,500,70,ap(v,vSides,.4));")
s=s.replace("T('ESAU',620,470,'500 54px Fraunces'","T('ESAU',620,480,'500 64px Fraunces'").replace("labG('JACOB',1300,470,ap(v,vBothT,.4),54);","labG('JACOB',1300,480,ap(v,vBothT,.4),50);").replace("T('RACHEL',620,590,'500 54px Fraunces'","T('RACHEL',620,610,'500 64px Fraunces'").replace("labG('LEAH',1300,590,ap(v,vBothT+.4,.4),54);","labG('LEAH',1300,610,ap(v,vBothT+.4,.4),50);")
block("3:15 · Joseph","""// 3:15 · Joseph, and the brothers hate him
S(vJos-.05,vFar-.05,(v)=>{pic('27_brothers_hate',v,vJos-.05,vFar,{side:'R',tx:1330,z:.78,push:.08});const c=TC();
  cap('JOSEPH',c,420,64,ap(v,vJos,.35),true,'9px');gloss('Rachel’s son, loved most',c,515,ap(v,vJos+.6,.4),56);cap('THE BROTHERS HATE HIM',c,630,46,ap(v,vHate,.35),false,'7px');});""")
s=s.replace("const [jx,jy]=P(800,360);ringA(jx,jy,36,70,ap(v,vFar+.3,.35),sm(vFar+.3,vFar+1,v));","const [jx,jy]=P(1120,460);ringA(jx,jy,46,90,ap(v,vFar+.3,.35),sm(vFar+.3,vFar+1,v));")
block("3:37 · years","""// 3:37 · years later: the boys' father
S(vYears-.05,vBoys-.05,(v)=>{const u=camE((v-vYears)/6);const s=H/768*.7*(1+.06*u);const [ox,oy]=at(735,185,1430-40*u,500,s);warm(1400,560,600,1);draw('b_joseph',ox,oy,s);bokeh(v,1,61,6);
  cap('JOSEPH',560,170,64,ap(v,vYears+.2,.35),true,'9px');gloss('years later, the boys’ father,',560,265,ap(v,vYears,.4),56);gloss('the one who grabs Jacob’s hand',560,340,ap(v,vGrabs,.4),56);});""")
block("3:43 · Manasseh","""// 3:43 · Manasseh and Ephraim
S(vBoys-.05,vLands-.05,(v)=>{warm(960,560,820,.8);const z=lerp(.78,.81,camE((v-vBoys)/5));bed('00_before',v,z);
  tagAt('MANASSEH',300,440,360,300,ap(v,vMan,.35),false);tagAt('EPHRAIM',1620,440,1000,330,ap(v,vEph,.35),true);
  kin('the older','manasseh the older',224,300,540,56,v,{skip:1});kin('the younger','and ephraim the younger',225,1620,540,56,v,{skip:2});});""")
block("3:48 · the right","""// 3:48 · the right hand lands on Ephraim
S(vLands-.05,vIKnow-.05,(v)=>{warm(960,560,820,.8);const z=lerp(.81,.86,camE((v-vLands)/7));bed('02_crossing',v,z);
  tagAt('MANASSEH',300,440,360,300,1,false);tagAt('EPHRAIM',1620,440,1000,340,1,true);const [hx,hy]=P(872,248);ringA(hx-6,hy+16,74,54,ap(v,vLands+.3,.3),sm(vLands+.3,vLands+.9,v));
  vTop(ap(v,vVih-.4,.35),'GENESIS 48:14','וְהוּא הַצָּעִיר',['הַצָּעִיר'],[[['“…though he was the ',0],['younger',1],['.”',0]]],{hs:84,es:60});});""")
block("4:02 · Isaac was","""// 4:02 · Isaac was fooled by a pair of hands
S(vFool-.05,vEither-.05,(v)=>{pic('17_isaac_feels',v,vFool-1.5,vEither,{side:'L',tx:520,z:.86});const c=Math.max(1500,TC());
  gloss('Isaac was fooled',c,470,ap(v,vFool,.4),64);gloss('by a pair of hands.',c,560,ap(v,vFool+.5,.4),64);});""")
s=s.replace("band(ap(v,vSbs,.4),170);enLine([['This time the two brothers stand ',0],['side by side',1],[',',0]],960,90,48,ap(v,vSbs,.4));enLine([['and nobody wants anybody dead.',0]],960,160,48,ap(v,vNobody,.4));",
 "band(ap(v,vSbs,.4),210);enLine([['This time they stand ',0],['side by side',1],[',',0]],960,95,64,ap(v,vSbs,.4));enLine([['and nobody wants anybody dead.',0]],960,180,64,ap(v,vNobody,.4));")
s=s.replace("S(vSbs-.05,vNever-.05,(v)=>{pic('02_crossing',v,vSbs-.05,vNever,{side:'C',z:.86,ty:640,push:.04});","S(vSbs-.05,vNever-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.8,.84,camE((v-vSbs)/3)));")
block("5:44 · the weapons","""// 5:44 · the weapons: a shofar, an empty jar, a torch inside
S(vHands-.05,vNight-.05,(v)=>{pic('43_props_rows',v,vHands-.05,vNight,{side:'C',push:.08,ty:600});
  band(1,260);gloss('Then Gideon hands out the weapons:',960,80,ap(v,vHands,.4),48);
  cap('A SHOFAR',420,175,46,ap(v,vSho,.35),true,'7px');cap('AN EMPTY CLAY JAR',960,175,46,ap(v,vJar,.35),true,'7px');cap('A TORCH INSIDE',1500,175,46,ap(v,vTorch,.35),true,'7px');});""")
block("5:59 · torch","""// 5:59 · torch in the left hand, shofar in the right: both hands full
S(vLeft-.05,vShout-.05,(v)=>{pic('45_torch_shofar',v,vLeft-.05,vShout,{side:'R',tx:1330,z:.8,push:.07,fade:false});const c=400;
  const [tx,ty]=P(1100,470),[sx,sy]=P(520,320);
  ringA(tx,ty,70,110,ap(v,vLeft+.2,.35),sm(vLeft+.2,vLeft+.9,v));ringA(sx,sy,90,80,ap(v,vRight+.2,.35),sm(vRight+.2,vRight+.9,v));
  vSide(ap(v,vLeft,.35)*(1-sm(vHFull-.3,vHFull,v)),c,'JUDGES 7:20','',[],[[['“…the ',0],['torches',1]],[['in their left hands,',0]],[['and the ',0],['shofars',1]],[['in their right…”',0]]],{cy:500,es:62});
  cap('BOTH HANDS',c,450,58,ap(v,vHFull,.35),true,'8px');cap('ARE FULL',c,530,58,ap(v,vHFull+.2,.35),true,'8px');kin('Not one of them|is holding a *sword*.','not one of them is holding',364,c,690,64,v);});""")
block("6:28 · hands","""// 6:28 · hands full of light and noise
S(vNobody2-.05,vBack-.05,(v)=>{pic('45_torch_shofar',v,vNobody2-.05,vBack,{side:'R',tx:1330,z:.84,push:.06,fade:false});const c=400;
  const [tx,ty]=P(1100,470);orb(tx,ty-60,170,.3*ap(v,vLight,.5));
  gloss('Nobody in that army',c,420,ap(v,vNobody2,.4),58);gloss('could ever say it,',c,495,ap(v,vNobody2+.6,.4),58);gloss('their hands were full',c,590,ap(v,vLight-.8,.4),58);
  enLine([['of ',0],['light',1],[' and ',0],['noise',1],['.',0]],c,680,70,ap(v,vLight,.4));});""")
block("6:34 · back","""// 6:34 · back to Jacob's crossed hands
S(vBack-.05,vCent-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.78,.84,camE((v-vBack)/11.5)));
  const [hx,hy]=P(872,248);ringA(hx-6,hy+16,74,54,ap(v,vBack+.3,.3),sm(vBack+.3,vBack+.9,v));
  const a1=ap(v,vFirstW,.4)*(1-sm(vYoungW-.3,vYoungW,v));if(a1>0){band(a1,230);enLine([['When the firstborn wins,',0]],960,85,60,a1);enLine([['it can look like ',0],['his own hand',1],[' did it.',0]],960,165,60,a1);}
  const a2=ap(v,vYoungW,.4);if(a2>0){band(a2,230);enLine([['But when the ',0],['younger',1],[' one wins,',0]],960,85,60,a2);enLine([['everyone knows ',0],['whose hand',1],[' it was.',0]],960,165,60,ap(v,vWhose-.4,.4));}});""")
open(p,'w').write(s);print('ok')
