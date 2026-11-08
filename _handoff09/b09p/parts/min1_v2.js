// ---- first-minute helpers ----
function tag(s,ix,iy,a,gold,o={}){if(a<=.003)return;const [x,y]=P(ix,iy);const ly=o.y??Math.max(96,y-(o.up??70));const lx=x+(o.dx||0);const sz=o.sz||42;
  cap(s,lx,ly,sz,a,gold,'7px');
  if(o.tick!==false&&y-ly>70){X.save();X.globalAlpha*=a*.75;X.strokeStyle='rgba(217,180,106,.9)';X.lineWidth=2;X.beginPath();X.moveTo(lx,ly+sz*.7);X.lineTo(x,y-16);X.stroke();X.restore();}}
const TC=()=>{const b=LP.b;if(!b)return 1430;return b.side==='R'?Math.max(460,(70+b.l)/2):b.side==='L'?Math.min(1480,(b.r+1860)/2):960;};
function bedShot(k,v,t0,t1,z0,z1){// the before / crossing pair: same framing, slow push toward Jacob's hands
  const im=IMG[k];const u=eio(clamp((v-t0)/(t1-t0)));const z=lerp(z0,z1,u);const s=H/768*z;const ox=960-688*s,oy=1052-759*s;LP={ox,oy,s,b:{side:'C',l:ox,r:ox+1376*s}};
  X.save();X.globalCompositeOperation='lighter';const fl=.85+.15*Math.sin(v*1.7);const g=X.createRadialGradient(960,560,60,960,560,820);g.addColorStop(0,`rgba(255,196,110,${.17*fl})`);g.addColorStop(1,'rgba(255,196,110,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();
  X.drawImage(im,ox,oy,1376*s,768*s);motes(v,.8,200,200,1520,860);bokeh(v,1,11,7);}

// 0:00 · in his old age Jacob can't see
S(-1,2.75,(v)=>{pic('03_jacob_closeup',v,-.6,2.9,{side:'L',tx:420,z:1.02,push:.09});rays(120,-40,.95,1200,.5,1,v);bokeh(v,1,5,7,-1);
  kin('In his old age,|*Jacob* can’t see.','in his old age',0,TC(),530,80,v);});
// 0:03 · two boys brought to him; the right hand is meant for the firstborn; firstborn at his right, younger at his left
S(2.75,12.05,(v)=>{bedShot('00_before',v,2.75,12.05,.74,.8);
  if(v<5.42)kin('and two boys are brought to him|for a *blessing*.','and two boys are brought',2,960,150,62,v);
  else kin('The *right* *hand* is meant for the *firstborn*.','the right hand is meant',5,960,120,64,v);
  const [rx,ry]=P(588,432),[lx,ly]=P(806,432);const tR=C('right hand is meant',5)+.1;
  ringA(rx,ry,80,54,ap(v,tR,.3),sm(tR,tR+.7,v));cap('HIS RIGHT HAND',rx-40,ry+108,36,ap(v,tR+.3,.35),true,'6px');
  const tF=C('so the firstborn stands',7),tY=C('and the younger at his left',9)+.3;
  tag('FIRSTBORN',505,215,ap(v,tF+.2,.35),false,{up:95});tag('YOUNGER',915,232,ap(v,tY,.35),true,{up:95});
  const [fx,fy]=P(470,330),[yx,yy]=P(905,330);ink(bez([rx-30,ry-30],[rx-80,ry-120],[fx+20,fy+20]),sm(tF+.3,tF+1.1,v),.9,{arrow:true});
  ringA(lx,ly,70,48,ap(v,tY+.2,.3)*.6,sm(tY+.2,tY+.9,v));ink(bez([lx+30,ly-30],[lx+80,ly-110],[yx-10,yy+30]),sm(tY+.3,tY+1.1,v),.55,{arrow:true,col:'rgba(240,228,205,.8)'});});
// 0:12 · but Jacob crosses his arms; his right hand comes down on the younger boy's head
S(12.05,17.25,(v)=>{bedShot('02_crossing',v,12.05,17.25,.8,.88);
  if(v<C('so his right hand comes',13)-.1)kin('But Jacob *crosses* his arms,','but jacob crosses his arms',11,960,120,68,v);
  else kin('so his *right* *hand* comes down|on the *younger* boy’s head.','so his right hand comes down',13,960,150,62,v);
  tag('FIRSTBORN',505,205,1,false,{up:95});tag('YOUNGER',900,250,1,true,{up:95});
  const [sx,sy]=P(600,330),[hx,hy]=P(872,248);const tC=C('so his right hand comes',13);
  ink(bez([sx,sy],[ (sx+hx)/2,sy-240],[hx,hy-40]),sm(tC+.1,tC+1.2,v),1,{arrow:true,w:6});
  ringA(hx,hy,96,64,ap(v,C('younger boys head',15),.3),sm(C('younger boys head',15),C('younger boys head',15)+.7,v));});
// 0:17 · the boys' father grabs his hand: "Not so, father"
S(17.25,25.95,(v)=>{pic('b_joseph',v,17.25,26,{side:'R',tx:1400,fx:735/1376,z:.7,push:.07,drift:-60,fade:false});bokeh(v,1,7,6);
  const c=560,f=1-sm(vNotSo-.3,vNotSo-.05,v);
  cap('THE BOYS’ FATHER',c,250,54,ap(v,vFather,.3)*f,true);kin('Jacob’s own son|grabs his hand to move it.','jacobs own son',18,c,380,58,v,{a:f});
  vSide(ap(v,vNotSo-.05,.3),c,'GENESIS 48:18','לֹא־כֵן אָבִי כִּי־זֶה הַבְּכֹר',['הַבְּכֹר'],[[['“Not so, father,',0]],[['this one is the ',0],['firstborn',1],['.”',0]]],{cy:330,hs:92,es:60});});
// 0:26 · "I know, my son, I know"
S(25.95,28.75,(v)=>{pic('03_jacob_closeup',v,24.8,28.9,{side:'L',tx:420,z:1.06,push:.08});rays(120,-40,.95,1200,.5,1.2,v);
  vSide(ap(v,vIK0+.05,.3),TC(),'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son,',0]],[['I know',1],['.”',0]]],{hs:104,es:64});});
// 0:29 · Jacob was a younger brother himself
S(28.75,31.05,(v)=>{pic('c_twins',v,28.6,31.2,{side:'L',tx:560,z:.86,ty:590,push:.06,par:[-50,60],pz:[0,.05]});const c=TC();bokeh(v,1,13,6);
  tag('ESAU',367,52,ap(v,vJYB+.1,.3),false,{y:118});tag('JACOB',829,58,ap(v,vJYB,.3),true,{y:118});
  kin('*Jacob* was a younger brother|himself.','jacob was a younger brother',27,c,520,70,v);});
// 0:31 · and so was his father, Isaac
S(31.05,33.35,(v)=>{pic('04_isaac',v,30.8,33.5,{side:'L',tx:600,z:.95,push:.09});const c=TC();rays(200,-60,.9,1100,.45,.9,v);
  kin('And so was his father,|*Isaac*.','and so was his father',29,c,520,72,v);});
// 0:33 · from the first two brothers in the world, the firstborn is passed over
function ledger2(v,cx,cy,rows,a,o={}){if(a<=.003)return;const dy=o.dy||100,w=o.w||380,fs=o.fs||50;
  cap('BORN FIRST',cx-w*.55,cy-dy*.95,34,a*.85,false,'6px');cap('CHOSEN',cx+w*.55,cy-dy*.95,34,a,true,'6px');gl(cx-w*1.2,cy-dy*.5,cx+w*1.2,.6*a);
  rows.forEach(([b,c,t],i)=>{const y=cy+i*dy+14;const a1=ap(v,t,.3),a2=ap(v,t+.45,.3);if(a1<=.003)return;
    T(b,cx-w*.55,y,`500 ${fs}px Fraunces`,IVORY,a1*.72,'center','4px');ink([[cx-w*.18,y],[cx+w*.18,y]],sm(t+.1,t+.45,v),a1*.9,{arrow:true,w:3,head:16});
    cap(c,cx+w*.55,y,fs,a2,true,'4px');});}
S(33.35,39.65,(v)=>{pic('05_cain_abel',v,33.2,39.8,{side:'L',tx:540,z:.78,push:.07,par:[40,-40],pz:[.03,0]});const c=TC();bokeh(v,1,17,6);
  tag('CAIN',170,82,ap(v,vFirst2+.3,.3),false,{y:124});tag('ABEL',809,98,ap(v,vFirst2+.5,.3),true,{y:124});
  kin('From the first two brothers|in the world…','from the first two brothers',33,c,520,64,v,{a:1-sm(vPass-.4,vPass-.1,v)});
  ledger2(v,c,420,[['CAIN','ABEL',vPass],['ISHMAEL','ISAAC',vPass+.9],['ESAU','JACOB',vPass+1.8],['MANASSEH','EPHRAIM',vPass+2.7]],ap(v,vPass,.3),{w:380,dy:108,fs:48});});
// 0:39 · three times, an older brother wants him dead
function tally2(v,cx,cy,n,a,names,sp=340,r=66){if(a<=.003)return;for(let i=0;i<3;i++){const x=cx+(i-1)*sp,on=i<n;
  X.save();X.globalAlpha*=a*(on?1:.4);X.strokeStyle=on?'rgba(244,204,126,.98)':'rgba(240,228,205,.55)';X.lineWidth=on?4:2.5;if(on){X.shadowColor='rgba(255,190,90,.95)';X.shadowBlur=26;}X.beginPath();X.arc(x,cy,r,0,Math.PI*2);X.stroke();X.restore();
  if(on)orb(x,cy,r*1.6,.18*a);T(String(i+1),x,cy+3,`500 ${r*.9|0}px Fraunces`,on?GL:'rgba(240,228,205,.6)',a*(on?1:.55),'center');
  if(names&&names[i]&&on)cap(names[i],x,cy+r+56,38,a,false,'6px');}}
S(39.65,43.05,(v)=>{BGd();glow(960,540,820,.26);motes(v,.9,200,100,1520,880);bokeh(v,1,19,8);
  cap('THREE TIMES',960,250,92,ap(v,vThree,.3),false,'14px');
  kin('an older brother wants him *dead*.','an older brother wants',39,960,375,66,v);
  tally2(v,960,620,Math.min(3,Math.max(0,Math.floor((v-vThree-.7)/.45))),ap(v,vThree+.5,.3),['CAIN','ESAU','THE BROTHERS']);});
// 0:43 · Genesis never says why
S(43.05,47.35,(v)=>{BGd();glow(960,520,760,.24+.04*Math.sin(v*1.3));motes(v,.9,200,100,1520,880);bokeh(v,1,23,9);
  const sc=1+.035*sm(43,47.4,v);X.save();X.translate(960,540);X.scale(sc,sc);X.translate(-960,-540);
  kin('Genesis never says *why*.','genesis never says why',42,960,440,112,v);
  kin('And the reason only comes|centuries later…','and the reason only comes',44,960,640,64,v);X.restore();});
// 0:47 · before a battle where 300 men surround an army, and not one is holding a sword
S(47.35,53.25,(v)=>{pic('d_300',v,47.35,53.4,{side:'C',z:1.06,push:.1,drift:-60});
  embers(v,1,[[49,187],[358,202],[1041,237],[1152,232],[1209,248],[1272,247],[1324,254]].map(([x,y])=>P(x,y)));
  band(1,230);
  if(v<vSword0-.15)kin('Before a battle where *300* men|surround an army,','before a battle where',46,960,130,62,v);
  else kin('and not one of them|is holding a *sword*.','and not one of them is holding',50,960,130,66,v);});
// 0:53 · the first younger brother doesn't survive: God accepts Abel's offering instead of Cain's
S(53.25,58.55,(v)=>{pic('e_offering',v,53.1,58.7,{side:'C',z:.92,ty:600,push:.08,drift:-30});
  const [sx,sy]=P(930,-40);rays(sx,sy,1.92,900,.35,1.4,v,6);bokeh(v,1,29,6);band(1,230);
  if(v<vAccepts-.15)kin('The first *younger* brother|doesn’t survive.','the first younger brother',52,960,130,64,v);
  else kin('God accepts *Abel’s* offering|instead of Cain’s.','god accepts abels',55,960,130,62,v);
  tag('CAIN',370,60,ap(v,vAccepts+.2,.3),false,{dx:-150,y:330,tick:false});tag('ABEL',820,190,ap(v,vAccepts+.4,.3),true,{dx:170,y:420,tick:false});});
// 0:59 · out in the field Cain rises up against his little brother and kills him
S(58.55,63.45,(v)=>{pic('f_cain_rises',v,58.4,63.6,{side:'L',tx:640,fx:.5,z:.94,push:.08,fade:900,par:[50,-10],pz:[.06,0]});const c=Math.max(1540,TC());bokeh(v,1,31,6);
  tag('CAIN',370,90,ap(v,vRises,.3),false,{dx:200,y:150,tick:false});tag('ABEL',890,300,ap(v,vField+.4,.3),true,{up:70});
  kin('*Cain* rises up|against his little brother','cain rises up',59,c,360,58,v);
  tally2(v,c,660,Math.floor(ap(v,vK+.2,.15)),ap(v,vK,.3),['CAIN','ESAU','THE BROTHERS'],210,56);});
// 1:03 · but God keeps choosing the younger anyway: Isaac over Ishmael
S(63.45,69.3,(v)=>{pic('11_isaac_ishmael',v,63.3,69.5,{side:'L',tx:440,z:.82,ty:560,push:.08,par:[-30,40],pz:[0,.05]});const c=TC();bokeh(v,1,37,6);
  tag('ISHMAEL',440,44,ap(v,vIsh,.3),false,{y:118});tag('ISAAC',957,293,ap(v,C('isaac is picked',64),.3),true,{up:80});
  kin('But God keeps choosing|the *younger* anyway.','but god keeps choosing',63,c,420,62,v,{a:1-sm(vIsP-.4,vIsP-.1,v)});
  ledger2(v,c,600,[['ISHMAEL','ISAAC',vIsh-.6]],ap(v,vIsP,.3),{w:340,fs:50});});
