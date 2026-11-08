// ---- first-minute helpers ----
// a name tag above a figure, with a fine gold tick down toward the head
function tag(s,ix,iy,a,gold,o={}){if(a<=.003)return;const [x,y]=P(ix,iy);const ly=o.y??Math.max(96,y-(o.up??70));const lx=x+(o.dx||0);
  if(gold)labG(s,lx,ly,a,o.sz||32);else lab(s,lx,ly,a,IVORY,o.sz||32);
  if(o.tick!==false&&y-ly>60){X.save();X.globalAlpha*=a*.7;X.strokeStyle='rgba(217,180,106,.85)';X.lineWidth=1.6;X.beginPath();X.moveTo(lx,ly+26);X.lineTo(x,y-14);X.stroke();X.restore();}}
// centre of the black side, from the painting's resting frame
const TC=()=>{const b=LP.b;if(!b)return 1430;return b.side==='R'?Math.max(420,(70+b.l)/2):b.side==='L'?Math.min(1500,(b.r+1860)/2):960;};

// 0:00 · in his old age Jacob can't see; two boys brought for a blessing → the right hand is for the firstborn
S(-1,vCross-.05,(v)=>{pic('01_jacob_boys',v,-1,vCross,{side:'L',tx:600,z:.9,push:.07});const c=TC();
  if(v<vRight0-.05){gloss('In his old age,',c,450,ap(v,0,.35),50);enLine([['Jacob',1],[' can’t see.',0]],c,520,50,ap(v,1.35,.35));
    gl(c-260,600,c+260,ap(v,2.7,.5)*.6);gloss('Two boys are brought to him',c,670,ap(v,2.8,.35),46);gloss('for a blessing.',c,735,ap(v,4.3,.35),46);}
  else{labG('THE RIGHT HAND',c,470,ap(v,vRight0,.35),46);gloss('is meant for the firstborn.',c,545,ap(v,vRight0+.5,.35),48);}
  tag('FIRSTBORN',515,60,ap(v,C('so the firstborn stands',7)+.2,.35),false,{dx:-50,y:112});
  tag('YOUNGER',639,110,ap(v,C('and the younger at his left',9)+.4,.35),true,{dx:70,y:112});});
// 0:12 · but Jacob crosses his arms: the right hand comes down on the younger boy's head
S(vCross-.05,vFather-.05,(v)=>{pic('02_crossing',v,vCross-.05,vFather,{side:'C',z:.8,push:.07});
  tag('FIRSTBORN',381,215,ap(v,vCross+.1,.35),false,{y:118});tag('YOUNGER',906,235,ap(v,vCross+.3,.35),true,{y:118});
  const [hx,hy]=P(886,247);ringA(hx,hy,96,60,ap(v,vComes+.3,.3),sm(vComes+.3,vComes+1,v));
  labG('HIS RIGHT HAND',1560,hy-40,ap(v,vComes+.4,.35),32);gloss('on the younger',1560,hy+18,ap(v,C('younger boys head',15),.35),40);});
// 0:17 · the boys' father grabs his hand: "Not so, father"
S(vFather-.05,vIK0-.05,(v)=>{pic('b_joseph',v,vFather-.05,vIK0,{side:'R',tx:1300,fx:735/1376,z:.76,push:.05,drift:-20,fade:false});
  const c=600,a1=ap(v,vFather,.35)*(1-sm(vNotSo-.35,vNotSo-.05,v));
  labG('THE BOYS’ FATHER',c,300,a1,44);gloss('Jacob’s own son',c,370,ap(v,C('jacobs own son',18),.35)*(1-sm(vNotSo-.35,vNotSo-.05,v)),46);
  vSide(ap(v,vNotSo-.05,.3),c,'GENESIS 48:18','לֹא־כֵן אָבִי כִּי־זֶה הַבְּכֹר',['הַבְּכֹר'],[[['“Not so, father,',0]],[['this one is the ',0],['firstborn',1],['.”',0]]],{cy:330,hs:72,es:48});});
// 0:25 · "I know, my son, I know"
S(vIK0-.05,vJYB-.05,(v)=>{pic('03_jacob_closeup',v,vIK0-1.2,vJYB,{side:'L',tx:420,z:1,push:.05});
  vSide(ap(v,vIK0+.4,.3),TC(),'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son, ',0],['I know',1],['.”',0]]],{hs:84,es:52});});
// 0:28 · Jacob was a younger brother himself
S(vJYB-.05,vIsaac0-.05,(v)=>{pic('c_twins',v,vJYB-.05,vIsaac0,{side:'L',tx:560,z:.86,ty:590,push:.05});const c=TC();
  tag('ESAU',367,52,ap(v,vJYB+.1,.35),false,{y:118});tag('JACOB',829,58,ap(v,vJYB,.35),true,{y:118});
  enLine([['Jacob',1],[' was a younger brother',0]],c,500,52,ap(v,vJYB,.35));gloss('himself.',c,575,ap(v,C('brother himself',29),.35),52);});
// 0:31 · and so was his father, Isaac
S(vIsaac0-.05,vFirst2-.05,(v)=>{pic('04_isaac',v,vIsaac0-.05,vFirst2,{side:'L',tx:600,z:.95,push:.06});const c=TC();
  gloss('And so was his father,',c,480,ap(v,vIsaac0,.35),52);labG('ISAAC',c,565,ap(v,C('isaac',32),.35),56);});
// 0:33 · from the first two brothers in the world, the firstborn is passed over
S(vFirst2-.05,vThree-.05,(v)=>{pic('05_cain_abel',v,vFirst2-.05,vThree,{side:'L',tx:500,z:.84,push:.05});const c=TC();
  tag('CAIN',170,82,ap(v,vFirst2+.3,.35),false,{y:122});tag('ABEL',809,98,ap(v,vFirst2+.5,.35),true,{y:122});
  const a0=ap(v,vFirst2,.35)*(1-sm(vPass-.35,vPass-.05,v));gloss('From the first two brothers',c,480,a0,48);gloss('in the world…',c,545,a0,48);
  ledger(v,c,410,[['CAIN','ABEL',vPass],['ISHMAEL','ISAAC',vPass+.5],['ESAU','JACOB',vPass+1],['MANASSEH','EPHRAIM',vPass+1.5]],ap(v,vPass,.35),{w:360,dy:96});});
// 0:39 · three times, an older brother wants him dead
S(vThree-.05,vNever0-.05,(v)=>{BGd();glow(960,540,760,.24);motes(v,.8,200,100,1520,880);
  T('THREE TIMES',960,330,'500 64px Fraunces',IVORY,ap(v,vThree,.3),'center','12px');
  enLine([['an ',0],['older',0],[' brother wants him ',0],['dead',1],['.',0]],960,420,52,ap(v,C('an older brother',40),.35));
  tally(v,960,610,Math.floor(clamp((v-C('wants him dead',41))/.35,0,3)),ap(v,C('an older brother',40)+.3,.35),['CAIN','ESAU','THE BROTHERS']);});
// 0:43 · Genesis never says why
S(vNever0-.05,vBattle-.05,(v)=>{BGd();glow(960,540,700,.22+.03*Math.sin(v*1.3));motes(v,.8,200,100,1520,880);
  enLine([['Genesis never says ',0],['why',1],['.',0]],960,470,92,ap(v,vNever0,.35));
  gloss('The reason only comes centuries later…',960,610,ap(v,vCent0-.2,.35),54);});
// 0:47 · before a battle where 300 men surround an army, and not one is holding a sword
S(vBattle-.05,vFirstY-.05,(v)=>{pic('d_300',v,vBattle-.05,vFirstY,{side:'C',z:1.04,push:.06,drift:-30});
  const a2=ap(v,vSword0-.1,.3);band(ap(v,vBattle,.35),a2>0?210:140);
  labG('300 MEN SURROUND AN ARMY',960,88,ap(v,vSurr0-.4,.35),44);
  enLine([['and not one of them is holding a ',0],['sword',1],['.',0]],960,160,50,a2);});
// 0:53 · the first younger brother doesn't survive: God accepts Abel's offering instead of Cain's
S(vFirstY-.05,vField-.05,(v)=>{pic('e_offering',v,vFirstY-.05,vField,{side:'C',z:.92,ty:600,push:.06});
  const a2=ap(v,vAccepts,.3);band(1,a2>0?210:140);
  enLine([['The first ',0],['younger',1],[' brother doesn’t survive.',0]],960,88,50,ap(v,vFirstY,.35));
  enLine([['God accepts ',0],['Abel’s',1],[' offering instead of Cain’s.',0]],960,160,46,a2);});
// 0:58 · out in the field Cain rises up against his little brother and kills him
S(vField-.05,vKeep-.05,(v)=>{pic('f_cain_rises',v,vField-.05,vKeep,{side:'L',tx:640,fx:.5,z:.94,push:.08,fade:760});const c=Math.max(1560,TC());
  tag('CAIN',370,38,ap(v,vRises,.35),false,{y:120});tag('ABEL',890,300,ap(v,vField+.4,.35),true,{up:60});
  gloss('against his little brother',c,420,ap(v,C('against his little',61),.35),42);
  tally(v,c,620,Math.floor(ap(v,vK+.2,.15)),ap(v,vK,.35),['CAIN','ESAU','THE BROTHERS'],200);});
// 1:03 · but God keeps choosing the younger anyway: Isaac over Ishmael
S(vKeep-.05,vTw-.1,(v)=>{pic('11_isaac_ishmael',v,vKeep-.05,vTw,{side:'L',tx:600,z:.9,push:.06});const c=TC();
  tag('ISHMAEL',440,44,ap(v,vIsh,.35),false,{y:118});tag('ISAAC',957,293,ap(v,C('isaac is picked',64),.35),true,{up:70});
  const a0=ap(v,vKeep,.35)*(1-sm(vIsP-.35,vIsP-.05,v));gloss('But God keeps choosing',c,480,a0,50);enLine([['the ',0],['younger',1],[' anyway.',0]],c,550,50,a0);
  ledger(v,c,470,[['ISHMAEL','ISAAC',vIsh]],ap(v,vIsP,.35),{w:360});});
