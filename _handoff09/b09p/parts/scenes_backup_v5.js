// ===================== 09 · Why the Bible Keeps Choosing the Younger Brother · painted edition =====================
// paintings (cut out on black) + gold graphics. Cue times are VO seconds; video time = VO time + PRE.
const PRE=.4, VEND=423.7, DUR=PRE+VEND+3.2;
const norm=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(/\s+/).filter(Boolean);const WW=WDS.map(w=>w[2].replace(/'/g,''));
function C(ph,after=0,end=false){const q=norm(ph);for(let i=0;i<WDS.length;i++){if(WDS[i][0]<after-4)continue;let ok=true;for(let j=0;j<q.length;j++){if(!WW[i+j]||WW[i+j]!==q[j]){ok=false;break;}}if(ok)return end?WDS[i+q.length-1][1]:WDS[i][0];}console.warn('cue?',ph,after);window.MISS=(window.MISS||[]).concat([ph]);return after;}
const CE=(ph,after=0)=>C(ph,after,true);
const SH=[];const S=(a,b,f)=>SH.push({a,b,f});
const ap=(v,v0,d=.45)=>sm(v0,v0+d,v);
const BGd=()=>{X.fillStyle='#050403';X.fillRect(0,0,W,H);};

// ---------- text ----------
function enLine(parts,x,y,size,a=1){if(a<=.003)return;X.save();X.globalAlpha*=a;X.font=`italic 400 ${size}px Newsreader`;const ws=parts.map(p=>X.measureText(p[0]).width),tot=ws.reduce((p,q)=>p+q,0);let xx=x-tot/2;
  parts.forEach((p,i)=>{X.textAlign='left';X.textBaseline='middle';if(p[1]){X.fillStyle=gg(xx,y-size/2,xx+ws[i],y+size/2);X.shadowColor='rgba(255,200,100,.8)';X.shadowBlur=18;}else{X.fillStyle=IVORY;X.shadowBlur=0;}X.fillText(p[0],xx,y);xx+=ws[i];});X.restore();}
const goldMap=ws=>{const m={};(ws||[]).forEach(w=>m[w]=0);return m;};
const lab=(s,x,y,a,c=IVORY,sz=34)=>T(s,x,y,`400 ${Math.max(42,Math.round(sz*1.3))}px Fraunces`,c,a,'center','7px');
const labG=(s,x,y,a,sz=34)=>{if(a<=.003)return;sz=Math.max(46,Math.round(sz*1.3));X.save();X.globalAlpha*=a;X.font=`500 ${sz}px Fraunces`;X.letterSpacing='6px';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gg(x-200,y-sz,x+200,y+sz);X.shadowColor='rgba(255,200,100,.8)';X.shadowBlur=18;X.fillText(s,x,y);X.restore();};
const gloss=(s,x,y,a,sz=40)=>T(s,x,y,`italic 400 ${Math.max(66,Math.round(sz*1.35))}px Newsreader`,IVORY,a,'center');
const gl=(x0,y,x1,a=.5)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;const g=X.createLinearGradient(x0,0,x1,0);g.addColorStop(0,'rgba(217,180,106,0)');g.addColorStop(.5,'rgba(217,180,106,.9)');g.addColorStop(1,'rgba(217,180,106,0)');X.strokeStyle=g;X.lineWidth=1.6;X.beginPath();X.moveTo(x0,y);X.lineTo(x1,y);X.stroke();X.restore();};
function keyW(h,g,x,y,a,o={}){if(a<=.003)return;heb(h,x,y,o.hs||150,a,{gold:o.gold===false?{}:{[h]:0},t:9});if(g)gloss(g,x,y+(o.gy||130),a,o.gs||52);}
const bigNum=(s,x,y,a,sz=110)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;X.font=`500 ${sz}px Fraunces`;X.textAlign='center';X.textBaseline='middle';X.fillStyle=gg(x-200,y-sz/2,x+200,y+sz/2);X.shadowColor='rgba(255,200,100,.7)';X.shadowBlur=22;X.fillText(s,x,y);X.restore();};
// a verse on the black side of the frame: reference · Hebrew (key word gold) · English (same word gold)
function vSide(a,cx,ref,hl,gold,en,o={}){if(a<=.003)return;const hs=o.hs||78,es=o.es||46,cy=o.cy??540;const tot=64+(hl?hs*1.55:0)+en.length*es*1.4;let y=cy-tot/2;
  T(ref,cx,y,'300 46px Fraunces',GOLD,a,'center','7px');y+=70;
  if(hl){heb(hl,cx,y+hs*.5,hs,a,{gold:goldMap(gold),t:9});y+=hs*1.55;}
  en.forEach(p=>{enLine(p,cx,y+es*.5,es,a);y+=es*1.4;});}
// the verse banner at the top (the channel standard, for wide pictures)
function band(a,h){if(a<=.003)return;X.save();const g=X.createLinearGradient(0,0,0,h+140);const k=h/(h+140);g.addColorStop(0,`rgba(5,4,3,${.94*a})`);g.addColorStop(k*.8,`rgba(5,4,3,${.88*a})`);g.addColorStop(k,`rgba(5,4,3,${.6*a})`);g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(0,0,W,h+140);X.restore();}
function vTop(a,ref,hl,gold,en,o={}){if(a<=.003)return;const hs=o.hs||64,es=o.es||48;const h=84+70+(hl?hs*1.4:0)+en.length*es*1.3+30;band(a,h);
  let y=84;T(ref,W/2,y,'300 40px Fraunces',GOLD,a,'center','6px');y+=70;
  if(hl){heb(hl,W/2,y+hs*.42,hs,a,{gold:goldMap(gold),t:9});y+=hs*1.4;}
  en.forEach(p=>{enLine(p,W/2,y+es*.35,es,a);y+=es*1.3;});}
function vFull(a,ref,hl,gold,en,o={}){if(a<=.003)return;const hs=o.hs||96,es=o.es||58,cy=o.cy??540,cx=o.cx??W/2;const tot=60+(hl?hs*1.5:0)+en.length*es*1.35;let y=cy-tot/2;
  T(ref,cx,y,'300 42px Fraunces',GOLD,a,'center','6px');y+=60;
  if(hl){heb(hl,cx,y+hs*.5,hs,a,{gold:goldMap(gold),t:9});y+=hs*1.5;}
  en.forEach(p=>{enLine(p,cx,y+es*.45,es,a);y+=es*1.35;});}
const ringA=(x,y,rx,ry,a,p=1)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;X.globalCompositeOperation='lighter';X.strokeStyle='rgba(240,196,106,.98)';X.lineWidth=4.5;X.shadowColor='rgba(255,180,70,.95)';X.shadowBlur=22;X.beginPath();X.ellipse(x,y,rx,ry,0,-Math.PI/2,-Math.PI/2+Math.PI*2*clamp(p));X.stroke();X.restore();};
const orb=(x,y,r,a=1)=>{if(a<=.003)return;X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,236,190,${a})`);g.addColorStop(.35,`rgba(255,206,120,${.6*a})`);g.addColorStop(1,'rgba(255,190,90,0)');X.fillStyle=g;X.fillRect(x-r,y-r,2*r,2*r);X.restore();};

// ---------- the paintings ----------
const IMG={},META={};
function meta(k,im){const c=document.createElement('canvas'),w=172,h=96;c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;
  let x0=w,x1=0,y0=h,y1=0,sx=0,sy=0,n=0;for(let j=0;j<h;j++)for(let i=0;i<w;i++){if(d[(j*w+i)*4+3]>128){n++;sx+=i;sy+=j;if(i<x0)x0=i;if(i>x1)x1=i;if(j<y0)y0=j;if(j>y1)y1=j;}}
  const occ=[];for(let i=0;i<w;i++){let c=0;for(let j=0;j<h;j++)if(d[(j*w+i)*4+3]>128)c++;occ.push(c>2);}
  const cuts=[];let gs=-1;for(let i=0;i<w;i++){if(!occ[i]){if(gs<0)gs=i;}else{if(gs>0&&i-gs>=2)cuts.push((gs+i)/2/w);gs=-1;}}
  const segs=[];let a0=0;cuts.forEach(c=>{segs.push([a0,c]);a0=c;});segs.push([a0,1]);
  META[k]=n?{cx:sx/n/w,cy:sy/n/h,x0:x0/w,x1:x1/w,y0:y0/h,y1:y1/h,full:n>w*h*.97,segs}:{cx:.5,cy:.5,x0:0,x1:1,y0:0,y1:1,full:true,segs:[[0,1]]};}
let LP={ox:0,oy:0,s:1};
// pic: draws a painting. side L/R/C puts the subject on that side; the rest of the frame stays black for the graphics.
function pic(k,v,t0,t1,o={}){const im=IMG[k];if(!im)return;const M=META[k];const side=o.side||'L';
  const u=camE((v-t0)/Math.max(.1,t1-t0));const z=(o.z||1)*(1+(o.push??(v>69.3?.09:.05))*u);const s=H/768*z;
  const fx=o.fx??M.cx,fy=o.fy??.5;const TX=o.tx??(side==='L'?600:side==='R'?1320:960),TY=(o.ty??540);
  const dx=(o.drift??(side==='R'?-26:26))*(u-.5);let ox=TX-fx*1376*s+dx,oy=TY-fy*768*s;const iw=1376*s,ih=768*s;
  if(!M.full){if(M.x0<.012)ox=Math.min(ox,0);if(M.x1>.988)ox=Math.max(ox,W-iw);if(M.y0<.012)oy=Math.min(oy,0);if(M.y1>.988)oy=Math.max(oy,H-ih);}
  const s0=H/768*(o.z||1),ox0=TX-fx*1376*s0;LP={ox,oy,s,b:{side,l:ox0+M.x0*1376*s0,r:ox0+M.x1*1376*s0}};
  const sx=TX+dx,sy=TY;
  X.save();X.globalCompositeOperation='lighter';const fl=.85+.15*Math.sin(v*1.7)+.05*Math.sin(v*5.3);
  const g=X.createRadialGradient(sx,sy-60,40,sx,sy-60,o.gr||620);g.addColorStop(0,`rgba(255,196,110,${.16*fl*(o.glow??1)})`);g.addColorStop(1,'rgba(255,196,110,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();
  if(o.par&&M.segs.length>1){M.segs.forEach((sg,i)=>{const sx0=sg[0]*1376,sw=(sg[1]-sg[0])*1376;const ex=(o.par[i]||0)*(u-.5),zi=1+((o.pz&&o.pz[i])||0)*u;
      X.drawImage(im,sx0,0,sw,768,ox+sx0*s+ex-(zi-1)*sw*s/2,oy-(zi-1)*ih,sw*s*zi,ih*zi);});}
  else{if(o.blur)X.filter=`blur(${o.blur}px)`;X.drawImage(im,ox,oy,iw,ih);X.filter='none';}
  // fade the painting into black toward the graphics side (and softly at every edge)
  const f0=o.fade||(M.full?520:620);X.save();if(o.fade!==false&&(M.full||o.fade)){
  if(side==='L'){const g2=X.createLinearGradient(TX+f0*.55,0,TX+f0,0);g2.addColorStop(0,'rgba(5,4,3,0)');g2.addColorStop(1,'rgba(5,4,3,1)');X.fillStyle=g2;X.fillRect(TX+f0*.55,0,W,H);}
  if(side==='R'){const g2=X.createLinearGradient(TX-f0,0,TX-f0*.55,0);g2.addColorStop(0,'rgba(5,4,3,1)');g2.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g2;X.fillRect(0,0,TX-f0*.55,H);}
  if(side==='C'&&M.full){[[0,0,260,0],[W,0,W-260,0]].forEach(([a0,_,a1])=>{const g3=X.createLinearGradient(a0,0,a1,0);g3.addColorStop(0,'rgba(5,4,3,1)');g3.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g3;X.fillRect(Math.min(a0,a1),0,260,H);});}
  }X.restore();
  if(v>69.3&&o.bk!==false)bokeh(v,.9,(k.length*7)%97,6);
  if(o.motes!==false)motes(v,.7,side==='R'?TX-560:side==='L'?TX-620:200,120,side==='C'?1520:1180,820);}
const P=(ix,iy)=>[LP.ox+ix*LP.s,LP.oy+iy*LP.s];        // image pixel (1376×768) → screen
const TXT=side=>side==='L'?1430:side==='R'?500:960;    // centre of the black side
// the pattern ledger: born first → chosen
function ledger(v,cx,cy,rows,a,o={}){if(a<=.003)return;const dy=o.dy||92,w=o.w||300;
  lab('BORN FIRST',cx-w*.55,cy-dy*.9,a*.9,'rgba(240,228,205,.85)',30);labG('CHOSEN',cx+w*.55,cy-dy*.9,a,30);gl(cx-w*1.15,cy-dy*.45,cx+w*1.15,.5*a);
  rows.forEach(([b,c,t,lt],i)=>{const al=a*ap(v,t,.4);if(al<=.003)return;const y=cy+i*dy+12;
    T(b,cx-w*.55,y,'500 42px Fraunces',IVORY,al*.75,'center','4px');T('→',cx,y,'400 40px Fraunces',GOLD,al*.8,'center');
    if(lt!==undefined&&v>lt)T(c,cx+w*.55,y,'500 42px Fraunces',IVORY,al,'center','4px');else labG(c,cx+w*.55,y,al,42);});}
// three times an older brother wants him dead: three marks
function tally(v,cx,cy,n,a,names,sp=260){if(a<=.003)return;for(let i=0;i<3;i++){const x=cx+(i-1)*sp,on=i<n;
  X.save();X.globalAlpha*=a*(on?1:.35);X.strokeStyle=on?'rgba(240,200,120,.95)':'rgba(240,228,205,.5)';X.lineWidth=3;if(on){X.shadowColor='rgba(255,190,90,.9)';X.shadowBlur=18;}X.beginPath();X.arc(x,cy,46,0,Math.PI*2);X.stroke();X.restore();
  T(String(i+1),x,cy+2,'500 44px Fraunces',on?GOLD:'rgba(240,228,205,.6)',a*(on?1:.5),'center');if(names&&names[i]&&on)T(names[i],x,cy+92,'400 30px Fraunces',IVORY,a,'center','5px');}}

// ---------- cues (VO seconds) ----------
const vK=C('kills him',60);
const vIsP=C('isaac is picked',64),vIsh=C('ishmael',66),vTw=C('twins',68),vReb=C('rebecca',72),vRab=C('the word for older',78);
const vArmy=C('about an army',82),vSent=C('gets sent home',85),vLov=C('isaac loves esau',87);
const vRL=C('while rebecca loves',90),vStew=C('bowl of stew',95),vMeans=C('still means to give',98);
const vHairy=C('esau is a hairy',100),vGoat=C('goatskin',103),vFeels=C('isaac feels those',105),vInst=C('blesses jacob instead',107),vCry=C('when esau finds out',109);
const vTook=C('he took',111),vTwins=C('almost twins',119),vSwap=C('swap two letters',122),vBirth=C('birthright becomes',123),vBoth=C('both belong',125),vBoth2=C('both went to the',126),vPlan=C('so esau makes a plan',128);
const vMourn=C('the days of mourning',129),vSecond=C('now a second',136),vRun=C('jacob runs for his',139);
const vFlip=C('the pattern flips',142),vDau=C('laban has two daughters',144);
const vLeah=C('leah the older',146),vRach=C('and rachel the younger',147),vLoves=C('whom jacob loves',149),vTrick=C('but laban tricks',151),vAround=C('around here',155),vOfAll=C('jacob of all people',160),vSees=C('but god sees that leah',164);
const vWomb=C('opens her womb',167),vJudah=C('comes judah',169),vDavid=C('king david',171),vPick=C('who picks the younger',173),vSides=C('who sides with the older',176),vFav=C('isaac favored esau',179);
const vCant=C('so it cant be only',184),vJF=C('jacob favored rachel',180),vBothT=C('both times god went',182),vMom=C('his mothers favorite',189),vHisOwn=C('a favorite of his own',190),vPay=C('about to pay for it',193),vJos=C('its joseph',195);
const vHate=C('the brothers hate him',200),vFar=C('coming from far off',203),vCome=C('come lets kill him',205),vAlone=C('cain did it alone',207),vEsauA=C('esau planned it alone',208),vGroup=C('whole group of brothers',211),vSell=C('they sell him as a slave',213);
const vSurv=C('joseph survives',215),vYears=C('and years later',217),vGrabs=C('the one who grabs',221);
const vBoys=C('those two boys are his sons',223),vMan=C('manasseh the older',225),vEph=C('and ephraim',226),vLands=C('right hand lands on',228),vVih=CE('lands on ephraim',228),vTries=C('when joseph tries',233),vIKnow=C('i know my son',235),vToo=C('he too will be great',238),vFool=C('isaac was fooled',242);
const vEither=C('cant see either',244),vOnly=C('the only one in the room',247),vSbs=C('stand side by side',252),vNobody=C('nobody wants anybody dead',253),vNever=C('but jacob never says why',255);
const vAns=C('the answer comes centuries',258),vTribe=C('the tribe of manasseh',261),vDidnt=C('didnt get the right hand',263),vGid=C('his name is gideon',265);
const vMid=C('midian is crushing',268),vAngel=C('an angel finds him',270),vThresh=C('threshing wheat',272),vWrong=C('gideon says hes the wrong',274),vClan=C('my clan is the poorest',276),vAlfi=C('in hebrew the word he uses',280);
const vThou=C('my thousand',285),vYst=C('and the youngest is',287),vSame=C('the same word god used',289),vSoG=C('so gideon is the youngest',293),vComeBack=C('those two words come back',296),vArmy2=C('gideon needs an army',301);
const vGath=C('he gathers',303),vRav=C('god tells him',305),vSameW=C('its the same word god said',309),vMeantO=C('for the twins it meant',314),vMany=C('it means many',316),vBigger=C('its the bigger side',319),vSend=C('starts sending it home',321),v22=C('22 000 leave',323);
const v10=C('with 10 000 left',325),vOd=C('god says it again',327),vWater=C('tests them at the water',331),vLap=C('300 lap the water',333),vKneel=C('kneel down to drink',336),vKeeps=C('god keeps the 300',337),vValley=C('down in the valley',341),vLoc=C('like locusts',343),vHands=C('then gideon hands out',344);
const vSho=C('gets a shofar',348),vJar=C('empty clay jar',351),vTorch=C('with a torch hidden',352),vNight=C('in the middle of the night',354),vSurr=C('they surround the camp',356),vSmash=C('smash the jars',358),vLeft=C('torches in their left',360),vRight=C('the shofars in their right',361),vHFull=C('both hands are full',363),vNoSw=C('not one of them is holding',364),vShout=C('they shout',366),vNoCh=C('nobody charges',369),vInside=C('inside it god turns',374),vTold=C('god had told gideon',377);
const vYadi=C('and say',384),vMyOwn=C('my own hand saved me',386),vNobody2=C('nobody in that army',388),vLight=C('full of light and noise',391),vBack=C('now go back to jacobs',394);
const vFirstW=C('when the firstborn wins',397),vYoungW=C('when the younger one wins',401),vWhose=C('whose hand it was',404),vCent=C('and centuries after gideon',405);
const vIsa=C('the prophet isaiah',408),vTwoW=C('those same two words',409),vProm=C('makes them a promise',412),vFinal=C('the little one will become',419),vHeb=CE('to his people',414)+.35;
const vRight0=C('the right hand is meant',5),vCross=C('but jacob crosses his arms',11),vComes=C('his right hand comes down',14),vFather=C('the boys father',17),vNotSo=C('not so father',21),vIK0=C('i know my son',25),vJYB=C('jacob was a younger brother',27),vIsaac0=C('and so was his father',29),vFirst2=C('from the first two brothers',33),vPass=C('keeps passing over',35),vThree=C('three times',38),vNever0=C('genesis never says why',42),vCent0=C('only comes centuries later',44),vBattle=C('before a battle',46),vSurr0=C('300 men surround',47),vSword0=C('not one of them is holding a sword',51),vFirstY=C('the first younger brother',53),vAccepts=C('god accepts abels',56),vField=C('out in the field',58),vRises=C('cain rises up',60),vKeep=C('but god keeps choosing',63);

// ============================== SHOTS ==============================
// ================= motion + type kit (v2) =================
const camE=x=>{x=clamp(x);return (x-.3*x*x)/.7;};const expoO=x=>{x=clamp(x);return x>=1?1:1-Math.pow(2,-10*x);};
// word index of a phrase in the VO
function CI(ph,after=0){const q=norm(ph);for(let i=0;i<WDS.length;i++){if(WDS[i][0]<after-4)continue;let ok=true;for(let j=0;j<q.length;j++){if(!WW[i+j]||WW[i+j]!==q[j]){ok=false;break;}}if(ok)return i;}console.warn('ci?',ph,after);window.MISS=(window.MISS||[]).concat([ph]);return 0;}
// kinetic line: every displayed word appears on its spoken word. Tokens map 1:1 to VO words from the cue. *word* = gold, | = new line
function kin(disp,cue,after,x,y,size,v,o={}){const i0=CI(cue,after);const lines=disp.split('|').map(l=>l.trim().split(/\s+/));const lh=size*(o.lh||1.25);let k=o.skip||0;
  X.save();X.font=o.font||`italic 400 ${size}px Newsreader`;if(o.ls)X.letterSpacing=o.ls;X.textBaseline='middle';X.textAlign='left';
  lines.forEach((ws,li)=>{const toks=ws.map(w=>{const g=w.includes('*');const s=w.replace(/\*/g,'').replace(/_/g,' ');const t=WDS[i0+k]?WDS[i0+k][0]:0;k++;return {s,g,t};});
    const sp=X.measureText(' ').width;const wd=toks.map(t=>X.measureText(t.s).width);const tot=wd.reduce((a,b)=>a+b,0)+sp*(toks.length-1);let xx=x-tot/2;const yy=y+(li-(lines.length-1)/2)*lh;
    toks.forEach((t,j)=>{const q=clamp((v-(t.t-.06))/.38),u=eo(q)*(o.a??1);if(u>0){X.globalAlpha=u;const dy=(1-eo(q))*14;
      if(t.g){X.fillStyle=gg(xx,yy-size/2,xx+wd[j],yy+size/2);X.shadowColor='rgba(255,196,96,.85)';X.shadowBlur=24;}else{X.fillStyle=o.col||IVORY;X.shadowColor='rgba(0,0,0,.95)';X.shadowBlur=14;}
      X.fillText(t.s,xx,yy+dy);}xx+=wd[j]+sp;});});X.restore();}
// a big caps title that lands on a word
function cap(s,x,y,size,a,gold=false,ls='8px'){if(a<=.003)return;X.save();X.globalAlpha*=a;X.font=`500 ${size}px Fraunces`;X.letterSpacing=ls;X.textAlign='center';X.textBaseline='middle';const sc=1+.06*(1-eo(a));X.translate(x,y);X.scale(sc,sc);
  if(gold){X.fillStyle=gg(-300,-size/2,300,size/2);X.shadowColor='rgba(255,196,96,.85)';X.shadowBlur=26;}else{X.fillStyle=IVORY;X.shadowColor='rgba(0,0,0,.95)';X.shadowBlur=14;}X.fillText(s,0,0);X.restore();}
// soft out-of-focus gold dust in front of the painting (foreground parallax)
function bokeh(v,a=1,seed=3,n=8,dir=1){const r=rng(seed);X.save();X.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const x0=r()*W,y0=r()*H,rad=50+r()*110,sp=(10+r()*22)*dir,ph=r()*6;
  const x=((x0+v*sp)%(W+300)+W+300)%(W+300)-150,y=y0+Math.sin(v*.3+ph)*36;const al=a*(.03+.035*r())*(.6+.4*Math.sin(v*.7+ph));
  const g=X.createRadialGradient(x,y,0,x,y,rad);g.addColorStop(0,`rgba(255,210,140,${al})`);g.addColorStop(.6,`rgba(255,200,120,${al*.45})`);g.addColorStop(1,'rgba(255,190,100,0)');X.fillStyle=g;X.fillRect(x-rad,y-rad,2*rad,2*rad);}X.restore();}
// slow moving shafts of light from a point
function rays(x,y,ang,len,spread,a,v,n=5){if(a<=.003)return;X.save();X.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const th=ang+(i-(n-1)/2)*spread/n+.025*Math.sin(v*.45+i*1.3);const w=26+18*Math.sin(v*.6+i*1.7);const al=a*(.045+.03*Math.sin(v*.8+i*2.1));
  X.save();X.translate(x,y);X.rotate(th);const g=X.createLinearGradient(0,0,len,0);g.addColorStop(0,`rgba(255,222,165,${al})`);g.addColorStop(1,'rgba(255,222,165,0)');X.fillStyle=g;X.beginPath();X.moveTo(0,-w*.25);X.lineTo(len,-w*2.4);X.lineTo(len,w*2.4);X.lineTo(0,w*.25);X.fill();X.restore();}X.restore();}
// sparks rising from torch tips (pts in screen px)
function embers(v,a,pts,n=7){if(a<=.003)return;X.save();X.globalCompositeOperation='lighter';pts.forEach(([sx,sy],k)=>{for(let i=0;i<n;i++){const ph=(i/n+k*.37)%1;const life=(v*.5+ph)%1;
  const x=sx+Math.sin((v*.9+i)*1.7+k)*16*life+(i-n/2)*2.5,y=sy-life*170;const al=a*(1-life)*.85;X.fillStyle=`rgba(255,${(165+70*(1-life))|0},90,${al})`;X.beginPath();X.arc(x,y,1.5+1.6*(1-life),0,7);X.fill();}
  const fl=.75+.25*Math.sin(v*11+k*2.3)*Math.sin(v*7.1+k);orb(sx,sy+10,70,.35*a*fl);});X.restore();}
// gold ink line that draws itself along points; optional arrow head
function bez(p0,p1,p2,n=28){const o=[];for(let i=0;i<=n;i++){const t=i/n;o.push([(1-t)*(1-t)*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0],(1-t)*(1-t)*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]]);}return o;}
function ink(pts,p,a,o={}){if(a<=.003||p<=0)return;let L=0;const sg=[];for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);sg.push(d);L+=d;}
  let rem=L*clamp(p);X.save();X.globalAlpha*=a;X.strokeStyle=o.col||'rgba(244,204,126,.96)';X.lineWidth=o.w||5;X.lineCap='round';X.lineJoin='round';X.shadowColor='rgba(255,190,90,.95)';X.shadowBlur=20;X.beginPath();X.moveTo(pts[0][0],pts[0][1]);
  let end=pts[0],dir=[1,0];for(let i=1;i<pts.length&&rem>0;i++){const d=sg[i-1],k=Math.min(1,rem/d);const x=lerp(pts[i-1][0],pts[i][0],k),y=lerp(pts[i-1][1],pts[i][1],k);X.lineTo(x,y);dir=[pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]];end=[x,y];rem-=d;}
  X.stroke();if(o.arrow&&p>.97){const an=Math.atan2(dir[1],dir[0]),h=o.head||26;X.beginPath();X.moveTo(end[0]-h*Math.cos(an-.5),end[1]-h*Math.sin(an-.5));X.lineTo(end[0],end[1]);X.lineTo(end[0]-h*Math.cos(an+.5),end[1]-h*Math.sin(an+.5));X.stroke();}X.restore();}
// darken everything but one area (a spotlight that guides the eye)
function spot(x,y,r,a){if(a<=.003)return;X.save();const g=X.createRadialGradient(x,y,r*.55,x,y,r*1.6);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(1,`rgba(5,4,3,${.62*a})`);X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();}

function tally2(v,cx,cy,n,a,names,sp=340,r=66){if(a<=.003)return;for(let i=0;i<3;i++){const x=cx+(i-1)*sp,on=i<n;
  X.save();X.globalAlpha*=a*(on?1:.4);X.strokeStyle=on?'rgba(244,204,126,.98)':'rgba(240,228,205,.55)';X.lineWidth=on?4:2.5;if(on){X.shadowColor='rgba(255,190,90,.95)';X.shadowBlur=26;}X.beginPath();X.arc(x,cy,r,0,Math.PI*2);X.stroke();X.restore();
  T(String(i+1),x,cy+3,`500 ${r*.9|0}px Fraunces`,on?GL:'rgba(240,228,205,.6)',a*(on?1:.55),'center');
  if(names&&names[i]&&on)cap(names[i],x,cy+r+52,i===2?36:42,a,false,'6px');}}
function card(k,sx,sy,sw,sh,cx,cy,w,h,a,lit){if(a<=.003)return;const im=IMG[k];X.save();X.globalAlpha*=a*(lit?1:.42);X.drawImage(im,sx,sy,sw,sh,cx-w/2,cy-h/2,w,h);
  const f=(x0,y0,x1,y1)=>{const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');return g;};
  X.fillStyle=f(cx-w/2,0,cx-w/2+50,0);X.fillRect(cx-w/2,cy-h/2,50,h);X.fillStyle=f(cx+w/2,0,cx+w/2-50,0);X.fillRect(cx+w/2-50,cy-h/2,50,h);X.fillStyle=f(0,cy+h/2,0,cy+h/2-90);X.fillRect(cx-w/2,cy+h/2-90,w,90);X.restore();}
// ================= first minute v3 (merged: retention + YouTube strategy) =================
const TC=()=>{const b=LP.b;if(!b)return 1430;return b.side==='R'?Math.max(460,(70+b.l)/2):b.side==='L'?Math.min(1480,(b.r+1860)/2):960;};
function tag(s,ix,iy,a,gold,o={}){if(a<=.003)return;const [x,y]=P(ix,iy);const ly=o.y??Math.max(96,y-(o.up??70));const lx=x+(o.dx||0);const sz=o.sz||52;
  cap(s,lx,ly,sz,a,gold,'7px');
  if(o.tick!==false&&y-ly>70){X.save();X.globalAlpha*=a*.75;X.strokeStyle='rgba(217,180,106,.9)';X.lineWidth=2;X.beginPath();X.moveTo(lx,ly+sz*.7);X.lineTo(x,y-16);X.stroke();X.restore();}}
function tagAt(s,lx,ly,ix,iy,a,gold,sz=52){if(a<=.003)return;const [x,y]=P(ix,iy);cap(s,lx,ly,sz,a,gold,'7px');X.save();X.font=`500 ${sz}px Fraunces`;X.letterSpacing='7px';const hw=X.measureText(s).width/2+18;X.restore();
  const sx=x<lx?lx-hw:lx+hw;X.save();X.globalAlpha*=a*.8;X.strokeStyle='rgba(217,180,106,.9)';X.lineWidth=2;X.beginPath();X.moveTo(sx,ly);X.lineTo(x,y);X.stroke();X.restore();}
// draw a painting at an explicit transform (s = screen px per image px)
function draw(k,ox,oy,s,a=1){const im=IMG[k];if(!im)return;LP={ox,oy,s,b:{side:'C',l:ox,r:ox+1376*s}};X.save();X.globalAlpha*=a;X.drawImage(im,ox,oy,1376*s,768*s);X.restore();}
// keep image point (ix,iy) at screen (sx,sy) with scale s
const at=(ix,iy,sx,sy,s)=>[sx-ix*s,sy-iy*s];
function warm(x,y,r,a){X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,196,110,${.2*a})`);g.addColorStop(1,'rgba(255,196,110,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();}
function dimAt(x,y,r,a){if(a<=.003)return;X.save();const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(5,4,3,${.7*a})`);g.addColorStop(.7,`rgba(5,4,3,${.5*a})`);g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();}
function blackL(x0,x1){const g=X.createLinearGradient(x0,0,x1,0);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle='#050403';X.fillRect(0,0,x0,H);X.fillStyle=g;X.fillRect(x0,0,x1-x0,H);}
function blackR(x0,x1){const g=X.createLinearGradient(x0,0,x1,0);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(1,'rgba(5,4,3,1)');X.fillStyle=g;X.fillRect(x0,0,x1-x0,H);X.fillStyle='#050403';X.fillRect(x1,0,W-x1,H);}
function dashed(x0,y0,x1,y1,p,a,col='rgba(240,228,205,.85)'){if(a<=.003||p<=0)return;X.save();X.globalAlpha*=a;X.strokeStyle=col;X.lineWidth=3.5;X.setLineDash([14,12]);X.lineCap='round';X.shadowColor='rgba(0,0,0,.9)';X.shadowBlur=8;X.beginPath();X.moveTo(x0,y0);X.lineTo(lerp(x0,x1,p),lerp(y0,y1,p));X.stroke();X.restore();}
function gline(x0,y0,x1,y1,p,a,w=7){ink([[x0,y0],[lerp(x0,x1,clamp(p)),lerp(y0,y1,clamp(p))]],p>0?1:0,a,{w});}
// a verse with Hebrew on one or two lines (key word gold in both languages)
function verse2(a,cx,cy,ref,hl,gold,en,o={}){if(a<=.003)return;const hs=o.hs||100,es=o.es||64;const tot=64+hl.length*hs*1.35+en.length*es*1.36+18;let y=cy-tot/2;
  T(ref,cx,y,'300 46px Fraunces',GOLD,a,'center','7px');y+=72;hl.forEach(h=>{heb(h,cx,y+hs*.45,hs,a,{gold:goldMap(gold),t:9});y+=hs*1.35;});y+=18;
  en.forEach(p=>{enLine(p,cx,y+es*.45,es,a);y+=es*1.36;});}
// the ladder: rows build upward, the stack stays centred; older names left, younger (chosen) names right in gold
function ladder(v,cx,cy,rows,o={}){const dy=118,fs=62,lx=cx-210,rx=cx+210;const ws=rows.map(r=>ap(v,r[2],.4));const Ht=ws.reduce((a,b)=>a+b,0)*dy;if(Ht<=1)return;let acc=0;const top=cy-Ht/2;
  const dimL=o.dim?1-.55*sm(o.dim,o.dim+.6,v):1,glo=o.glow?sm(o.glow,o.glow+.6,v):0;
  if(glo>0){X.save();X.globalCompositeOperation='lighter';const g=X.createLinearGradient(rx-170,0,rx+170,0);g.addColorStop(0,'rgba(255,200,110,0)');g.addColorStop(.5,`rgba(255,200,110,${.12*glo})`);g.addColorStop(1,'rgba(255,200,110,0)');X.fillStyle=g;X.fillRect(cx+60,top-20,360,Ht+40);X.restore();}
  rows.forEach((r,i)=>{const w=ws[i];if(w<=.003){return;}const y=top+acc*dy+dy*w/2;acc+=w;
    const al=clamp((w-.45)/.55);T(r[0],cx-95,y,`500 ${fs}px Fraunces`,IVORY,al*.62*dimL,'right','5px');ink([[cx-70,y],[cx+70,y]],sm(r[2]+.15,r[2]+.5,v),al,{arrow:true,w:3.5,head:16});
    X.save();X.globalAlpha*=ap(v,r[2]+.3,.35)*al;X.font=`500 ${fs}px Fraunces`;X.letterSpacing='5px';X.textAlign='left';X.textBaseline='middle';X.fillStyle=gg(cx+95,y-fs/2,cx+400,y+fs/2);X.shadowColor='rgba(255,196,96,.85)';X.shadowBlur=24;X.fillText(r[1],cx+95,y);X.restore();});
  const hy=top-70;cap('FIRSTBORN',cx-250,hy,52,o.hF?ap(v,o.hF,.35):0,false,'7px');cap('YOUNGER',cx+235,hy,52,o.hY?ap(v,o.hY,.35):0,true,'7px');}

// ---------- 0:00 · "In his old age, Jacob can't see" ----------
S(-1,2.75,(v)=>{const seeT=C('cant see',1);pic('03_jacob_closeup',v,-1.2,2.9,{side:'L',tx:420,z:1.02,push:.1,blur:6*sm(seeT,seeT+.6,v)});
  rays(120,-40,.95,1200,.5,1.1-.7*sm(seeT,seeT+.5,v),v);bokeh(v,1,5,7,-1);if(v>seeT)dimAt(960,300,1500,.25*sm(seeT,seeT+.6,v));
  const c=TC();kin('In his old age,','in his old age',0,c,460,88,v);kin('*Jacob* can’t *see*.','jacob cant see',0,c,575,88,v);});
// ---------- 0:03 · "and two boys are brought to him for a blessing" ----------
function bedT(z,cxImg=688){const s=H/768*z;return {s,ox:960-cxImg*s,oy:1110-759*s};}
function bed(k,v,z,cxImg){const T0=bedT(z,cxImg);draw(k,T0.ox,T0.oy,T0.s);motes(v,.8,200,200,1520,860);bokeh(v,1,11,7);return T0;}
S(2.75,5.42,(v)=>{warm(960,560,820,.8);const z=lerp(.78,.8,camE((v-2.75)/2.67));bed('00_before',v,z);
  const [b1x,b1y]=P(420,400),[b2x,b2y]=P(980,420);warm(b1x,b1y,360,sm(2.8,4,v));warm(b2x,b2y,360,sm(3,4.2,v));
  kin('Two boys are brought to him|for a *blessing*.','two boys are brought',2,960,160,72,v);});
// ---------- 0:05 · cut-in: "The right hand is meant for the firstborn" ----------
S(5.42,7.8,(v)=>{const z=lerp(1.6,1.7,camE((v-5.42)/2.38));const s=H/768*z;const [ox,oy]=at(588,432,600,610,s);warm(600,600,700,1);draw('00_before',ox,oy,s);blackR(930,1180);motes(v,.8,100,200,900,800);bokeh(v,1,41,6);
  const tH=C('right hand is meant',5)+.25;ringA(600,610,150,96,ap(v,tH,.3),sm(tH,tH+.6,v));orb(600,610,260,.22*ap(v,tH,.5));
  kin('The *right* *hand*','the right hand is',5,1450,420,88,v);kin('is meant for|the firstborn.','is meant for the firstborn',5,1450,610,88,v);});
// ---------- 0:08 · "so the firstborn stands at his right hand, and the younger at his left" ----------
const RH0=[588,432],LH0=[806,432],OB=[520,250],YB=[912,268];
S(7.8,12.05,(v)=>{warm(960,560,820,.8);const z=lerp(.8,.832,(v-7.8)/4.25);bed('00_before',v,z);
  const tF=C('so the firstborn stands',7)+.25,tR=C('at his right hand',8)+.1,tY=C('and the younger at',9)+.35,tL=tY+.15;
  tagAt('FIRSTBORN',300,440,360,300,ap(v,tF,.35),false);tagAt('YOUNGER',1620,440,1000,330,ap(v,tY,.35),true);
  const [rx,ry]=P(...RH0),[ox,oy]=P(...OB),[lx,ly]=P(...LH0),[yx,yy]=P(...YB);
  ringA(rx,ry,70,46,ap(v,tR,.3)*.9,sm(tR,tR+.5,v));dashed(rx,ry-30,ox,oy+40,eio(sm(tR+.1,tR+.8,v)),1);
  ringA(lx,ly,70,46,ap(v,tL,.3)*.9,sm(tL,tL+.5,v));dashed(lx,ly-30,yx,yy+40,eio(sm(tL+.1,tL+.8,v)),1);});
// ---------- 0:12 · match cut: "But Jacob crosses his arms, so his right hand comes down on the younger boy's head" ----------
S(12.05,17.25,(v)=>{const u=camE((v-12.05)/5.2);const z=lerp(.832,.875,u),cxI=lerp(688,716,u);warm(960,560,820,.8);bed('02_crossing',v,z,cxI);
  const tRH=C('so his right hand comes',13)+.25,tYg=C('younger boys head',15),tHd=CE('younger boys head',15);
  if(v>tYg){const [yx,yy]=P(980,420);warm(yx,yy,420,1.3*sm(tYg,tYg+.6,v));}
  kin('Jacob *crosses* his arms.','jacob crosses his arms',11,960,160,84,v);
  tagAt('FIRSTBORN',300,440,360,300,1,false);tagAt('YOUNGER',1620,440,1000,340,1+.2*sm(tYg,tYg+.4,v),true);
  // the two expected (dashed) paths swing into a gold X along his forearms
  const [hx,hy]=P(872,248),[gx,gy]=P(548,206),[r0x,r0y]=P(...RH0);
  {const [sx,sy]=P(600,318);ink(bez([sx,sy],[(sx+hx)/2,sy-210],[hx-10,hy-58]),eio(sm(tRH,tRH+1.1,v)),1,{arrow:true,w:6,head:30});}
  ringA(hx-6,hy+16,74,54,ap(v,tYg,.3),sm(tYg,tYg+.6,v));});
// ---------- 0:17 · "The boys' father, Jacob's own son," ----------
S(17.25,19.9,(v)=>{const u=camE((v-17.25)/2.65);{const s2=H/768*.5;draw('02_crossing',-70+10*u,1060-759*s2,s2,.9);}const s=H/768*.7*(1+.05*u);const [ox,oy]=at(735,185,1430-40*u,500,s);warm(1400,560,600,1);draw('b_joseph',ox,oy,s);bokeh(v,1,7,6);
  cap('THE BOYS’ FATHER',1330,150,62,ap(v,vFather,.3),true);kin('Jacob’s own son','jacobs own son',18,1330,250,76,v);});
// ---------- 0:20 · insert: "grabs his hand to move it" ----------
S(19.9,22.3,(v)=>{const t=sm(19.9,22.3,v),mv=eio(sm(C('to move it',20),C('to move it',20)+.8,v));const s=H/768*1.04*(1+.04*t);const [ox,oy]=at(688,384,960-40*mv,540,s);draw('00b_grip',ox,oy,s);
  bokeh(v,1,43,6);X.save();const g=X.createRadialGradient(960,540,420,960,540,1100);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(1,'rgba(5,4,3,.85)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();{const tm=C('to move it',20);{const [p0x,p0y]=P(700,440),[p1x,p1y]=P(560,250),[p2x,p2y]=P(330,240);ink(bez([p0x,p0y],[p1x,p1y],[p2x,p2y]),eio(sm(tm-.1,tm+.5,v)),1,{arrow:true,w:10,head:44});}}});
// ---------- 0:21 · "Not so, father, this one is the firstborn" ----------
S(22.3,24.9,(v)=>{const z=lerp(1.25,1.31,camE((v-22.3)/2.6));const s=H/768*z;const [ox,oy]=at(735,185,1450,400,s);warm(1450,420,700,1);draw('b_joseph',ox,oy,s);blackL(860,1200);bokeh(v,1,47,6);
  vSide(ap(v,22.25,.2),560,'GENESIS 48:18','לֹא־כֵן אָבִי כִּי־זֶה הַבְּכֹר',['הַבְּכֹר'],[[['“Not so, father,',0]],[['this one is the ',0],['firstborn',1],['.”',0]]],{cy:540,hs:112,es:68});});
// ---------- 0:25 · "and Jacob says, 'I know, my son, I know'" ----------
S(24.9,28.75,(v)=>{const k2=C('i know',27);const z=1.04+.06*eio(sm(24.9,28.75,v))+.06*eio(sm(k2,k2+1,v));pic('03_jacob_closeup',v,24.9,28.8,{side:'L',tx:420,z,push:0});
  rays(120,-40,.95,1250,.5,.6+.8*sm(vIK0,vIK0+.8,v),v);warm(380,420,500,sm(vIK0,vIK0+1,v));
  vSide(ap(v,24.95,.3),1380,'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son,',0]],[['I know',1],['.”',0]]],{hs:112,es:70});});
// ---------- 0:29–0:40 · the ladder builds across three paintings ----------
const LAD=()=>[['CAIN','ABEL',C('from the first two brothers',33)+.3],['ISHMAEL','ISAAC',C('and so was his father',29)+.3],['ESAU','JACOB',vJYB+.2]];
const LADo=()=>({hY:vJYB+.2,hF:vJYB+.2,dim:C('passing over',35),glow:C('and choosing the younger',37)+.3});
S(28.75,31.05,(v)=>{pic('c_twins',v,28.6,31.2,{side:'L',tx:540,z:.86,ty:590,push:.06,par:[-40,50],pz:[0,.05]});bokeh(v,1,13,6);
  const tP=C('a younger brother',28)+.3;const [ex,ey]=P(367,380),[jx,jy]=P(829,380);dimAt(ex,ey,330,.8*sm(tP,tP+.6,v));warm(jx,jy,360,sm(tP,tP+.6,v));
  ladder(v,1450,540,LAD(),LADo());});
S(31.05,33.35,(v)=>{pic('11_isaac_ishmael',v,30.9,33.5,{side:'L',tx:430,z:.82,ty:560,push:.07,par:[-30,40],pz:[0,.05]});bokeh(v,1,37,6);
  const tP=C('isaac',31)+.1;const [ix,iy]=P(440,380),[sx,sy]=P(957,500);dimAt(ix,iy,320,.8*sm(tP,tP+.6,v));warm(sx,sy,300,sm(tP,tP+.6,v));
  ladder(v,1450,540,LAD(),LADo());});
S(33.35,39.65,(v)=>{pic('05_cain_abel',v,33.2,39.8,{side:'L',tx:520,z:.78,push:.13,par:[70,-60],pz:[.04,0]});bokeh(v,1,17,6);
  const tP=C('from the first two brothers',33)+.6;const [cx0,cy0]=P(170,380),[ax,ay]=P(809,380);dimAt(cx0,cy0,320,.8*sm(tP,tP+.6,v));warm(ax,ay,340,sm(tP,tP+.6,v));
  ladder(v,1450,560,LAD(),LADo());});
// ---------- 0:40 · "and three times an older brother wants him dead" : three faces ----------
function panel(k,sx,sy,sw,sh,dx,dy,dw,dh,rev,a){if(a<=.003||rev<=0)return;const im=IMG[k];X.save();X.globalAlpha*=a;X.beginPath();const hh=dh*eio(rev);X.rect(dx,dy+(dh-hh)/2,dw,hh);X.clip();X.drawImage(im,sx,sy,sw,sh,dx,dy,dw,dh);
  const f=(x0,y0,x1,y1)=>{const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');return g;};
  X.fillStyle=f(dx,0,dx+90,0);X.fillRect(dx,dy,90,dh);X.fillStyle=f(dx+dw,0,dx+dw-90,0);X.fillRect(dx+dw-90,dy,90,dh);X.fillStyle=f(0,dy+dh,0,dy+dh-140);X.fillRect(dx,dy+dh-140,dw,140);X.fillStyle=f(0,dy,0,dy+60);X.fillRect(dx,dy,dw,60);X.restore();
}
S(39.65,43.05,(v)=>{BGd();const g=1+.02*camE((v-39.65)/3.4);X.save();X.translate(960,470);X.scale(g,g);X.translate(-960,-470);
  const t1=39.45,t2=39.9,t3=40.35;
  const q=x=>1-Math.pow(1-clamp(x),4);panel('f_cain_rises',160,10,460,620,170,110,460,620,q((v-t1)/.35),1);panel('21_esau_plan',420,0,460,620,665,110,460,620,q((v-t2)/.35),1);panel('27_brothers_hate',380,60,640,620,1160,110,600,620,q((v-t3)/.35),1);
  cap('CAIN',400,790,52,ap(v,t1+.2,.3),false,'8px');cap('ESAU',895,790,52,ap(v,t2+.2,.3),false,'8px');cap('JACOB’S SONS',1460,790,52,ap(v,t3+.2,.3),false,'8px');
  X.restore();
  kin('an older brother wants him *dead*.','an older brother wants',39,960,915,76,v);});
// ---------- 0:43 · "Genesis never says why, and the reason only comes centuries later" : a timeline that ends in a flame ----------
const FL=[1700,600];
S(43.05,47.35,(v)=>{BGd();{const q=.2*(1-sm(44.6,45.4,v));panel('f_cain_rises',160,10,460,620,170,110,460,620,1,q);panel('21_esau_plan',420,0,460,620,665,110,460,620,1,q);panel('27_brothers_hate',380,60,640,620,1160,110,600,620,1,q);}motes(v,.8,200,100,1520,880);
  kin('Genesis never says *why*.','genesis never says why',42,960,360,110,v);
const tR=C('and the reason',44),tL=CE('centuries later',45);const p=eio(sm(tR,tL,v));const x=lerp(240,FL[0],p);
  ink([[240,FL[1]],[x,FL[1]]],1,1,{w:8});for(let i=0;i<9;i++){const tx=240+i*(FL[0]-240)/9;if(tx<x){X.save();X.globalAlpha=.6;X.fillStyle=GOLD;X.fillRect(tx-1,FL[1]-12,2,24);X.restore();}}
  if(p>0&&p<1){orb(x,FL[1],60,.7);embers(v,.6,[[x,FL[1]]],4);}
  kin('centuries later','centuries later',45,Math.min(x-40,1480),FL[1]+100,80,v);
  const fl=sm(tL-.1,tL+.4,v);if(fl>0){embers(v,fl,[FL],9);orb(FL[0],FL[1]-20,120*fl,.9*fl);}});
// ---------- 0:47 · "before a battle where 300 men surround an army, and not one of them is holding a sword" ----------
S(47.35,53.25,(v)=>{const u=camE((v-47.35)/5.9);const s=1.285*(1+.1*u);const [ox,oy]=at(1041,237,FL[0],FL[1],s);draw('d_300',ox,oy,s);blackL(760,1100);
  X.save();const g=X.createLinearGradient(0,oy-40,0,oy+140);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(0,0,W,oy+140);X.restore();
  embers(v,1,[[1041,237],[1152,232],[1209,248],[1272,247],[1324,254]].map(([x,y])=>P(x,y)));bokeh(v,1,53,6);
  const t3=C('300 men',48),tS=C('surround an army',49),tN=C('not one of them',50),tH=C('holding a sword',51);
  // a ring of torch points draws itself around the camp
  const rp=sm(tS,tS+.9,v);if(rp>0){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<48;i++){const q=i/48;if(q>rp)break;const an=q*Math.PI*2-Math.PI/2;const [px,py]=P(668+150*Math.cos(an),468+42*Math.sin(an));const fl=.7+.3*Math.sin(v*9+i*1.7);
    X.fillStyle=`rgba(255,214,140,${.9*fl})`;X.beginPath();X.arc(px,py,4.2,0,7);X.fill();orb(px,py,16,.35*fl);}X.restore();}
  {const n=Math.round(300*expoO((v-t3+.05)/.9));bigNum(String(n),400,330,ap(v,t3-.05,.15),220);}
  if(v<C('men surround',48)-.05)kin('Before a battle','before a battle',46,400,610,84,v);
  else if(v<tN-.1)kin('men surround|an army','men surround an army',48,400,610,84,v);
  else kin('not one of them|is holding a *sword*.','not one of them is holding',50,400,610,80,v);
  const [hx,hy]=P(1052,300);ringA(hx,hy,90,120,ap(v,tH,.3),sm(tH,tH+.6,v));});
// ---------- 0:53 · "The first younger brother doesn't survive. God accepts Abel's offering" ----------
S(53.25,57.25,(v)=>{const u=camE((v-53.25)/4);const s=1.5*(1+.06*u);const [ox,oy]=at(900,420,1240,600,s);draw('e_offering',ox,oy,s);blackL(640,900);
  const tA=C('god accepts',55);bokeh(v,1,29,6);{const [hx,hy]=P(830,150);dimAt(hx,hy,230,.55);}
  if(v<tA-.1){kin('The first *younger*|brother','the first younger brother',52,480,430,84,v);kin('doesn’t survive.','doesnt survive',53,480,615,84,v);}
  else kin('God accepts|*Abel’s* offering','god accepts abels offering',55,480,500,84,v);});
// ---------- 0:57 · "instead of Cain's, so out in the field" : the reveal of Cain ----------
S(57.25,60.15,(v)=>{const u=camE((v-57.25)/2.9);const s=1.42*(1+.07*u);const [ox,oy]=at(372,260,560+12*u,470,s);draw('e_offering',ox,oy,s);blackR(860,1090);dimAt(560,300,900,.25);bokeh(v,1,59,5);
  kin('God accepts *Abel’s* offering','god accepts abels offering',55,1400,330,72,v);kin('instead of *Cain’s*','instead of cains',56,1400,490,88,v);kin('out in the field','out in the field',58,1400,640,72,v);});
// ---------- 1:00 · "Cain rises up against his little brother and kills him" (Genesis 4:8) ----------
S(60.15,63.45,(v)=>{const tR=C('cain rises up',59),tK=C('and kills him',61);const tilt=eio(sm(tR,tR+.9,v));
  pic('f_cain_rises',v,60.15,63.6,{side:'L',tx:600,fx:.5,z:1.06,push:.06,fade:860,ty:585,par:[30,-10],pz:[.05,0]});bokeh(v,1,31,5);
  const [ax,ay]=P(890,520);dimAt(ax,ay,330,.95*sm(tK,tK+.8,v));
  verse2(ap(v,tR-.05,.3),1460,520,'GENESIS 4:8',['וַיָּקָם קַיִן אֶל־הֶבֶל','אָחִיו וַיַּהַרְגֵהוּ'],['וַיַּהַרְגֵהוּ'],[[['“Cain rose up against Abel',0]],[['his brother, and ',0],['killed him',1],['.”',0]]],{hs:92,es:62});});
// ---------- 1:03 · "But God keeps choosing the younger anyway. Isaac is picked over his older brother Ishmael" ----------
S(63.45,vTw-.1,(v)=>{const tO=C('his older brother ishmael',66);const q=eio(sm(tO-.7,tO+1.5,v));
  const sA=H/768*1.3,sB=H/768*.82;const [aox,aoy]=at(957,480,640,600,sA);const bm=META['11_isaac_ishmael'];const box=440-bm.cx*1376*sB,boy=560-.5*768*sB;
  const s=lerp(sA,sB,q),ox=lerp(aox,box,q),oy=lerp(aoy,boy,q);warm(lerp(640,820,q),560,620,1);draw('11_isaac_ishmael',ox,oy,s);bokeh(v,1,37,6);
  const [ix,iy]=P(957,300);rays(ix+40,-60,1.62,820,.25,.9*sm(C('keeps choosing',63),C('keeps choosing',63)+.8,v),v,4);
  kin('God keeps choosing|the *younger*','god keeps choosing the younger',63,1420,470,88,v,{a:1-sm(tO-.9,tO-.6,v)});
  tag('ISAAC',957,293,ap(v,63.5,.3),true,{up:90});tag('ISHMAEL',440,44,ap(v,C('ishmael',67),.3),false,{dx:230,y:190,tick:false});
  if(v>tO-.1)kin('his *older* brother','his older brother',66,1420,520,84,v);});

// 1:08 · twins, chosen before they're born
S(vTw-.1,vRab-.05,(v)=>{pic('12_rebekah_pregnant',v,vTw-.1,vRab,{side:'L',tx:560,push:.14});const c=TC();const vs=C('the older will serve',75);const f=1-sm(vs-.35,vs-.05,v);
  cap('REBEKAH',c,360,56,ap(v,vReb-.2,.35)*f,false,'8px');kin('has twins','has twins',68,c,460,80,v,{a:f});kin('God chooses|before they’re even born','god chooses before',70,c,640,64,v,{a:f});
  vSide(ap(v,vs,.3),c,'GENESIS 25:23','וְרַב יַעֲבֹד צָעִיר',['וְרַב','צָעִיר'],[[['“The ',0],['older',1],[' will serve',0]],[['the ',0],['younger',1],['.”',0]]],{cy:540,hs:108,es:68});});
// 1:19 · רַב — remember this word (open loop 2)
S(vRab-.05,vLov-.05,(v)=>{const a2=ap(v,vArmy,.3);
  if(v<vArmy-.05){pic('12_rebekah_pregnant',v,vRab-4,vArmy,{side:'L',tx:430,z:.95});keyW('רַב','“older”',1300,420,ap(v,vRab+.3,.4),{hs:210,gy:160,gs:62});cap('GENESIS 25:23',1300,180,46,ap(v,vRab+.3,.4),false,'8px');}
  else{const s=1.5*(1+.05*camE((v-vArmy)/6));const [ox,oy]=at(688,470,960,600,s);draw('36_army_32000',ox,oy,s,.55);band(1,380);
    keyW('רַב','',960,150,1,{hs:150});gloss('…centuries later, God says it again,',960,300,a2,64);gloss('about an army,',960,388,ap(v,vArmy+.9,.3),64);
    {const g=X.createLinearGradient(0,820,0,1080);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(.5,'rgba(5,4,3,.85)');g.addColorStop(1,'rgba(5,4,3,.95)');X.fillStyle=g;X.fillRect(0,820,W,260);}gloss('and most of that army gets sent home',960,985,ap(v,vSent,.4),62);}});
// 1:28 · Isaac loves Esau
S(vLov-.05,vRL-.05,(v)=>{pic('13_isaac_esau',v,vLov-.05,vRL,{side:'L',tx:560,z:.86});const c=TC();
  kin('Isaac loves *Esau*','isaac loves esau',86,c,480,84,v);gloss('the firstborn twin',c,585,ap(v,vLov+.6,.4),48);});
// 1:31 · Rebekah loves Jacob
S(vRL-.05,vStew-.6,(v)=>{pic('14_rebekah_jacob',v,vRL-.05,vStew,{side:'L',tx:560,z:.92});const c=TC();
  kin('Rebekah loves *Jacob*','rebecca loves jacob',89,c,480,78,v);gloss('her younger son',c,580,ap(v,vRL+.8,.4),60);});
// 1:33 · the birthright for a bowl of stew
S(vStew-.6,vMeans-.05,(v)=>{pic('15_stew',v,vStew-.6,vMeans,{side:'L',tx:540,z:.72});const c=TC();
  cap('THE BIRTHRIGHT',c,440,56,ap(v,vStew-.5,.35),true,'8px');kin('for a bowl|of stew','bowl of stew',93,c,600,80,v,{skip:-2});});
// 1:38 · Isaac still means to bless Esau
S(vMeans-.05,vHairy-.05,(v)=>{pic('13_isaac_esau',v,vMeans-1,vHairy,{side:'L',tx:600,z:.95});const c=TC();
  gloss('Isaac, who can’t see,',c,470,ap(v,vMeans-.05,.4),60);gloss('still means to bless Esau.',c,555,ap(v,vMeans+.6,.4),60);});
// 1:41 · Esau is a hairy man; goatskin on Jacob's hands
S(vHairy-.05,vFeels-.05,(v)=>{const tW=C('so rebecca wraps',101);if(v<tW-.05){pic('21_esau_plan',v,vHairy-.05,tW,{side:'L',tx:600,z:.95});const c=TC();cap('ESAU',c,420,60,ap(v,vHairy,.3),false,'9px');gloss('is a hairy man,',c,520,ap(v,vHairy+.2,.4),66);}
  else{pic('16_goatskin',v,tW-.05,vFeels,{side:'L',tx:600});const c=TC();cap('JACOB',c,380,60,ap(v,tW,.3),true,'9px');gloss('so Rebekah wraps',c,470,ap(v,tW,.4),62);gloss('his hands',c,545,ap(v,tW+.3,.4),62);cap('IN GOATSKIN',c,645,52,ap(v,vGoat,.35),true,'8px');}});
// 1:45 · Isaac feels the hairy hands
S(vFeels-.05,vCry-.05,(v)=>{pic('17_isaac_feels',v,vFeels-.05,vCry,{side:'L',tx:520,z:.86,push:.09});const c=Math.max(1500,TC());
  const [hx,hy]=P(700,430);ringA(hx,hy,110,80,ap(v,vFeels+.3,.35),sm(vFeels+.3,vFeels+1,v));
  gloss('He feels those',c,430,ap(v,vFeels,.4),62);gloss('hairy hands…',c,510,ap(v,vFeels+.3,.4),62);cap('AND BLESSES JACOB',c,620,48,ap(v,vInst,.35),true,'7px');});
// 1:50 · Esau cries out
S(vCry-.05,vTwins-.6,(v)=>{pic('20_esau_cries',v,vCry-.05,vTwins,{side:'L',tx:560});const c=TC();
  verse2(ap(v,vTook-.1,.35),c,540,'GENESIS 27:36',['אֶת־בְּכֹרָתִי לָקָח','וְהִנֵּה עַתָּה לָקַח בִּרְכָתִי'],['אֶת־בְּכֹרָתִי','בִּרְכָתִי'],[[['“He took my ',0],['birthright',1],[',',0]],[['and now he has taken',0]],[['my ',0],['blessing',1],['.”',0]]],{hs:92,es:62});});
// 1:58 · two words that are almost twins
function letters(v,cx,y,swapU,a){const L5=['ב','כ','ר','ת','י'],gap=130,x0=cx+2*gap;
  L5.forEach((ch,i)=>{let x=x0-i*gap,yy=y;let gold=false;
    if(i===1||i===2){const to=i===1?x0-2*gap:x0-gap;const u=eio(swapU);x=lerp(x,to,u);yy=y-(i===1?1:-1)*100*Math.sin(Math.PI*u);gold=swapU>0;}
    heb(ch,x,yy,150,a,{gold:gold?{[ch]:0}:{},t:9});});}
S(vTwins-.6,vPlan-.05,(v)=>{BGd();glow(960,520,760,.26);
  keyW('בְּכֹרָתִי','“my birthright”',1320,260,ap(v,vTwins-.5,.4),{hs:96,gy:90,gs:46,gold:false});keyW('בִּרְכָתִי','“my blessing”',600,260,ap(v,vTwins-.3,.4),{hs:96,gy:90,gs:46,gold:false});
  letters(v,960,640,sm(vSwap+.4,vSwap+1.6,v),ap(v,vTwins+.4,.4));
  T(v<vBirth+.3?'birthright':'blessing',960,815,'italic 400 66px Newsreader',IVORY,ap(v,vTwins+.6,.4),'center');
  const bt=ap(v,vBoth,.4);if(bt>0){enLine([['Both belonged to the ',0],['firstborn',1],['.',0]],960,940,66,bt*(1-sm(vBoth2-.2,vBoth2+.1,v)));enLine([['Both went to the ',0],['younger',1],['.',0]],960,940,66,ap(v,vBoth2,.3));}});
// 2:08 · Esau's plan
S(vPlan-.05,vRun-.05,(v)=>{pic('21_esau_plan',v,vPlan-.05,vRun,{side:'L',tx:520,push:.14});const c=TC();
  vSide(ap(v,vPlan+.2,.35),c,'GENESIS 27:41','וְאַהַרְגָה אֶת־יַעֲקֹב אָחִי',['וְאַהַרְגָה'],[[['“…and then I will ',0],['kill',1]],[['my brother Jacob.”',0]]],{cy:440,hs:96,es:62});
  tally2(v,c,820,Math.floor(ap(v,vSecond,.2))+1,ap(v,vSecond-.2,.4),['CAIN','ESAU','JACOB’S SONS'],250,56);});
// 2:19 · Jacob runs to Laban
S(vRun-.05,vDau-.05,(v)=>{pic('22_jacob_flees',v,vRun-.05,vDau,{side:'L',tx:600,drift:60});const c=TC();
  gloss('Jacob runs for his life',c,460,ap(v,vRun,.4),46);gloss('to his uncle Laban…',c,525,ap(v,vRun+.9,.4),46);labG('AND THE PATTERN FLIPS',c,620,ap(v,vFlip,.4),36);});
// 2:24 · Leah the older, Rachel the younger
S(vDau-.05,vTrick-.05,(v)=>{pic('23_leah_rachel',v,vDau-.05,vTrick,{side:'L',tx:560,z:.84,ty:620});const c=TC();
  tag('LEAH',620,40,ap(v,vLeah,.35),false,{dx:-60,y:92,tick:false});tag('RACHEL',860,40,ap(v,vRach,.35),true,{dx:90,y:92,tick:false});
  gloss('Leah, the older,',c,440,ap(v,vLeah,.4),62);enLine([['and ',0],['Rachel',1],[', the younger,',0]],c,525,62,ap(v,vRach,.4));gloss('whom Jacob loves',c,610,ap(v,vLoves,.4),62);});
// 2:31 · Laban's excuse
S(vTrick-.05,vOfAll-.05,(v)=>{pic('24_laban',v,vTrick-.05,vOfAll,{side:'L',tx:540,z:.95});const c=TC();const f=1-sm(vAround-.4,vAround-.1,v);
  cap('LABAN',c,440,56,ap(v,vTrick,.35)*f,false,'8px');gloss('tricks him into',c,545,ap(v,vTrick+.4,.4)*f,60);gloss('marrying Leah first',c,625,ap(v,vTrick+.9,.4)*f,60);
  verse2(ap(v,vAround,.35),c,540,'GENESIS 29:26',['לֹא־יֵעָשֶׂה כֵן בִּמְקוֹמֵנוּ','לָתֵת הַצְּעִירָה לִפְנֵי הַבְּכִירָה'],['הַצְּעִירָה'],[[['“It is not done in our place,',0]],[['to give the ',0],['younger',1]],[['before the firstborn.”',0]]],{hs:80,es:60});});
// 2:40 · Jacob, of all people
S(vOfAll-.05,vSees-.05,(v)=>{pic('c_twins',v,vOfAll-.05,vSees,{side:'L',tx:560,fx:829/1376,z:1.12,ty:600});const c=TC();
  gloss('Jacob, of all people,',c,460,ap(v,vOfAll,.4),64);enLine([['is told the ',0],['firstborn',1]],c,550,64,ap(v,vOfAll+.8,.4));gloss('comes first.',c,635,ap(v,vOfAll+1.3,.4),64);});
// 2:44 · God sees that Leah is unloved
S(vSees-.05,vPick-.05,(v)=>{pic('25_leah_baby',v,vSees-.05,vPick,{side:'L',tx:600});const c=TC();
  vSide(ap(v,vSees+.3,.35)*(1-sm(vJudah-.4,vJudah-.1,v)),c,'GENESIS 29:31','כִּי־שְׂנוּאָה לֵאָה',['כִּי־שְׂנוּאָה'],[[['“…that Leah was ',0],['unloved',1],['.”',0]]],{hs:104,es:64});
  const j=ap(v,vJudah,.4);if(j>0){labG('JUDAH',c,470,j,52);gloss('the tribe of',c,560,ap(v,vDavid-.3,.4),42);labG('KING DAVID',c,630,ap(v,vDavid,.4),44);}});
// 2:52 · this time Jacob picks the younger; God sides with the older
S(vPick-.05,vMom-.05,(v)=>{const f=ap(v,vFav,.35);
  if(v<vFav-.1){pic('23_leah_rachel',v,vPick-.05,vFav,{side:'L',tx:520,z:.84,ty:620});const c=TC();
    tag('RACHEL',860,40,ap(v,vPick+.3,.3),false,{dx:90,y:92,tick:false});tag('LEAH',620,40,ap(v,vSides+.2,.3),true,{dx:-60,y:92,tick:false});
    kin('This time it’s *Jacob*|who picks the younger,','this time its jacob',172,c,430,64,v);kin('and *God*|who sides with the older.','and god who sides',175,c,640,64,v);}
  else{BGd();glow(960,540,780,.2);motes(v,.7,200,120,1520,820);
    const hf=f*(1-sm(vCant-.3,vCant,v));cap('THE FAVORITE',600,85,48,hf,false,'8px');cap('GOD CHOSE',1320,85,48,hf,true,'8px');
    card('c_twins',247,20,240,300,600,320,300,375,ap(v,vFav,.35),v<vBothT);card('c_twins',709,25,240,300,1320,320,300,375,ap(v,vBothT,.35),true);
    cap('ESAU',600,545,46,ap(v,vFav,.35)*(v<vBothT?.9:.5),false,'7px');cap('JACOB',1320,545,50,ap(v,vBothT,.35),true,'7px');
    card('23_leah_rachel',740,10,240,300,600,770,300,375,ap(v,vJF,.35),v<vBothT+.4);card('23_leah_rachel',490,10,240,300,1320,770,300,375,ap(v,vBothT+.4,.35),true);
    cap('RACHEL',600,990,46,ap(v,vJF,.35)*(v<vBothT+.4?.9:.5),false,'7px');cap('LEAH',1320,990,50,ap(v,vBothT+.4,.35),true,'7px');
    cap('ISAAC’S',260,320,42,ap(v,vFav,.35),false,'7px');cap('JACOB’S',260,770,42,ap(v,vJF,.35),false,'7px');
    T('→',960,320,'400 80px Fraunces',GOLD,ap(v,vBothT,.3),'center');T('→',960,770,'400 80px Fraunces',GOLD,ap(v,vBothT+.4,.3),'center');
    gloss('so it can’t be only about who was born second',960,88,ap(v,vCant,.4),60);}});
// 3:09 · Jacob has a favorite of his own
S(vMom-.05,vJos-.05,(v)=>{pic('26_jacob_joseph',v,vMom-.05,vJos,{side:'L',tx:470,z:.84,push:.1});const c=1460;
  enLine([['Jacob, his mother’s favorite,',0]],c,420,56,ap(v,vMom,.4));enLine([['now has a ',0],['favorite',1],[' of his own…',0]],c,510,56,ap(v,vHisOwn,.4));
  enLine([['a son who is about',0]],c,640,56,ap(v,vPay,.4));enLine([['to pay for it.',0]],c,715,56,ap(v,vPay+.4,.4));});
// 3:15 · Joseph, and the brothers hate him
S(vJos-.05,vFar-.05,(v)=>{if(v<vHate-.05){pic('26_jacob_joseph',v,vJos-1,vHate,{side:'L',tx:560,fx:880/1376,z:1.05});const [jx]=P(770,0);blackL(Math.max(0,jx-120),jx+40);const c=TC();
    cap('JOSEPH',c,440,72,ap(v,vJos,.35),true,'10px');gloss('Rachel’s son, loved most',c,545,ap(v,vJos+.6,.4),62);}
  else{pic('27_brothers_hate',v,vHate-.05,vFar,{side:'R',tx:1320,z:.62,push:.08});const c=TC();cap('THE BROTHERS',c,470,58,ap(v,vHate,.3),false,'8px');cap('HATE HIM',c,560,58,ap(v,vHate+.2,.3),false,'8px');}});
// 3:22 · they see him coming
S(vFar-.05,vAlone-.05,(v)=>{pic('30_brothers_see',v,vFar-.05,vAlone,{side:'C',z:1,push:.07});
  const [jx,jy]=P(1120,460);ringA(jx,jy,46,90,ap(v,vFar+.3,.35),sm(vFar+.3,vFar+1,v));
  vSide(ap(v,vCome-.1,.35),1500,'GENESIS 37:20','לְכוּ וְנַהַרְגֵהוּ',['וְנַהַרְגֵהוּ'],[[['“Come, let’s ',0],['kill',1],[' him.”',0]]],{cy:250,hs:84,es:58});});
// 3:27 · alone, alone, and now a whole group
S(vAlone-.05,vSell-.05,(v)=>{BGd();card('f_cain_rises',160,10,460,620,620,250,240,320,1,true);card('21_esau_plan',420,0,460,620,960,250,240,320,1,true);card('27_brothers_hate',380,60,640,620,1300,250,300,320,ap(v,vGroup-.2,.3),true);
  tally2(v,960,500,Math.floor(ap(v,vGroup-.3,.2))+2,1,null,340,52);cap('CAIN',620,615,44,1,false,'7px');cap('ESAU',960,615,44,1,false,'7px');cap('JACOB’S SONS',1300,615,40,ap(v,vGroup,.3),false,'6px');
  gloss('alone',620,720,ap(v,vAlone+.3,.4),70);gloss('alone',960,720,ap(v,vEsauA+.5,.4),70);cap('A WHOLE',1330,705,50,ap(v,vGroup,.35),true,'8px');cap('GROUP',1330,765,50,ap(v,vGroup+.15,.35),true,'8px');});
// 3:33 · sold as a slave
S(vSell-.05,vYears-.05,(v)=>{pic('31_joseph_sold',v,vSell-.05,vYears,{side:'R',tx:1300,drift:-50});const c=TC();
  gloss('They sell him as a slave instead…',c,470,ap(v,vSell,.4),46);labG('BUT JOSEPH SURVIVES',c,560,ap(v,vSurv,.4),38);});
// 3:37 · years later: the boys' father
S(vYears-.05,vBoys-.05,(v)=>{const u=camE((v-vYears)/6);const s=H/768*.7*(1+.06*u);const [ox,oy]=at(735,185,1430-40*u,500,s);warm(1400,560,600,1);draw('b_joseph',ox,oy,s);bokeh(v,1,61,6);
  cap('JOSEPH',560,170,64,ap(v,vYears+.2,.35),true,'9px');gloss('years later, the boys’ father,',560,265,ap(v,vYears,.4),56);gloss('the one who grabs Jacob’s hand',560,340,ap(v,vGrabs,.4),56);});
// 3:43 · Manasseh and Ephraim
S(vBoys-.05,vLands-.05,(v)=>{warm(960,560,820,.8);const z=lerp(.78,.81,camE((v-vBoys)/5));bed('00_before',v,z);
  tagAt('MANASSEH',300,440,360,300,ap(v,vMan,.35),false);tagAt('EPHRAIM',1620,440,1000,330,ap(v,vEph,.35),true);
  kin('the older','manasseh the older',224,300,540,56,v,{skip:1});});
// 3:48 · the right hand lands on Ephraim
S(vLands-.05,vIKnow-.05,(v)=>{warm(960,560,820,.8);const z=lerp(.68,.73,camE((v-vLands)/7));bed('02_crossing',v,z);
  tagAt('MANASSEH',300,440,360,300,1,false);tagAt('EPHRAIM',1620,440,1000,340,1,true);const [hx,hy]=P(872,248);ringA(hx-6,hy+16,74,54,ap(v,vLands+.3,.3),sm(vLands+.3,vLands+.9,v));
  vTop(ap(v,vVih-.4,.35),'GENESIS 48:14','וְהוּא הַצָּעִיר',['הַצָּעִיר'],[[['“…though he was the ',0],['younger',1],['.”',0]]],{hs:84,es:60});});
// 3:55 · I know, my son
S(vIKnow-.05,vFool-.05,(v)=>{pic('03_jacob_closeup',v,vIKnow-.05,vFool,{side:'L',tx:560,push:.06});const c=TC();
  if(v<vToo-.2)vSide(ap(v,vIKnow-.2,.35),c,'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son,',0]],[['I know',1],['.”',0]]],{hs:104,es:66});
  else verse2(ap(v,vToo-.15,.35),c,540,'GENESIS 48:19',['גַּם־הוּא יִגְדָּל','וְאוּלָם אָחִיו הַקָּטֹן','יִגְדַּל מִמֶּנּוּ'],['הַקָּטֹן'],[[['“He too will be great,',0]],[['but his ',0],['little brother',1]],[['will be greater than he.”',0]]],{hs:72,es:62});});
// 4:02 · Isaac was fooled by a pair of hands
S(vFool-.05,vEither-.05,(v)=>{pic('17_isaac_feels',v,vFool-1.5,vEither,{side:'L',tx:520,z:.86});const c=Math.max(1500,TC());tag('ISAAC',400,60,ap(v,vFool,.3),false,{y:130,dx:60});tag('JACOB',940,130,ap(v,vFool+.2,.3),true,{y:150});
  gloss('Isaac was fooled',c,470,ap(v,vFool,.4),64);gloss('by a pair of hands.',c,560,ap(v,vFool+.5,.4),64);});
// 4:04 · Jacob can't see either, but he knows
S(vEither-.05,vSbs-.05,(v)=>{pic('03_jacob_closeup',v,vEither-.05,vSbs,{side:'L',tx:560,z:1.12});const c=TC();
  gloss('Jacob can’t see either,',c,420,ap(v,vEither,.4),46);gloss('but he’s the only one',c,500,ap(v,vOnly,.4),46);gloss('in the room',c,570,ap(v,vOnly+.5,.4),46);cap('WHO KNOWS EXACTLY',c,640,46,ap(v,vOnly+1,.35),true,'7px');cap('WHAT HE’S DOING',c,705,46,ap(v,vOnly+1.4,.35),true,'7px');});
// 4:10 · side by side, and nobody wants anybody dead
S(vSbs-.05,vNever-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.8,.84,camE((v-vSbs)/3)));
  band(ap(v,vSbs,.4),210);enLine([['This time they stand ',0],['side by side',1],[',',0]],960,95,64,ap(v,vSbs,.4));enLine([['and nobody wants anybody dead.',0]],960,180,64,ap(v,vNobody,.4));});
// 4:15 · Jacob never says why; the answer goes to Manasseh's tribe
S(vNever-.05,vGid-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.7,.76,camE((v-vNever)/10)));
  if(v<vAns-.1)kin('But Jacob never says *why*|he crossed his hands.','but jacob never says why',255,960,150,68,v);
  else if(v<vDidnt-.3)kin('The answer comes centuries later,|to a man from the tribe of','the answer comes centuries',258,960,150,64,v);
  else gloss('the older boy who didn’t get the right hand',960,140,ap(v,vDidnt-.3,.35),60);
  const tM=vTribe+.4;tagAt('MANASSEH',300,520,360,330,ap(v,tM,.3),true,60);const [mx,my]=P(520,250);ringA(mx,my,90,70,ap(v,tM,.3),sm(tM,tM+.6,v));});
// 4:25 · Gideon; Midian crushing Israel
S(vGid-.05,vAngel-.05,(v)=>{if(v<vMid-.05){pic('33_gideon_threshing',v,vGid-.05,vMid,{side:'R',tx:1300,fx:790/1376,z:.95,push:.08,fade:760});const c=TC();kin('his name is *Gideon*','his name is gideon',264,c,520,78,v);}
  else{pic('32_midian_raiders',v,vMid-.05,vAngel,{side:'C',push:.07,drift:-40});band(1,200);cap('MIDIAN',960,85,60,ap(v,vMid,.3),false,'10px');gloss('is crushing Israel',960,160,ap(v,vMid+.3,.4),60);}});
// 4:30 · a messenger finds him
S(vAngel-.05,vThresh-.05,(v)=>{pic('34_man_terebinth',v,vAngel-.05,vThresh,{side:'L',tx:620});const c=TC();
  cap('AN ANGEL',c,450,60,ap(v,vAngel,.3),true,'9px');gloss('finds him…',c,550,ap(v,vAngel+.3,.4),66);});
// 4:31 · threshing wheat inside a winepress
S(vThresh-.05,vWrong-.05,(v)=>{pic('33_gideon_threshing',v,vThresh-.05,vWrong,{side:'R',tx:1320,fx:700/1376,z:1.0,push:.07,fade:820});const c=TC();
  cap('GIDEON',c,380,56,ap(v,vThresh,.3),true,'9px');gloss('threshing wheat',c,470,ap(v,vThresh,.4),62);gloss('inside a winepress',c,545,ap(v,vThresh+.5,.4),62);gloss('to hide it from Midian',c,630,ap(v,C('to hide it',272),.4),56);});
// 4:34 · "I am the wrong man"
S(vWrong-.05,vAlfi-.05,(v)=>{pic('35_gideon_me',v,vWrong-.05,vAlfi,{side:'L',tx:600});const c=TC();
  gloss('Gideon says',c,440,ap(v,vWrong,.4)*(1-ap(v,vClan-.3,.3)),66);gloss('he’s the wrong man:',c,530,ap(v,vWrong+.4,.4)*(1-ap(v,vClan-.3,.3)),66);
  verse2(ap(v,vClan-.1,.35),c,560,'JUDGES 6:15',['הִנֵּה אַלְפִּי הַדַּל בִּמְנַשֶּׁה','וְאָנֹכִי הַצָּעִיר בְּבֵית אָבִי'],['אַלְפִּי','הַצָּעִיר'],[[['“My ',0],['clan',1],[' is the poorest',0]],[['in Manasseh,',0]],[['and I am the ',0],['youngest',1]],[['in my father’s house.”',0]]],{hs:76,es:56});});
// 4:40 · אַלְפִּי my thousand · הַצָּעִיר the youngest
S(vAlfi-.05,vArmy2-.05,(v)=>{if(v>vSame-.05&&v<vSoG-.1)pic('12_rebekah_pregnant',v,vSame-.05,vSoG,{side:'L',tx:400,z:.95,push:.08});else pic('35_gideon_me',v,vAlfi-3,vArmy2,{side:'L',tx:400,z:.92,push:.2});
  keyW('אַלְפִּי','“my thousand”',1580,360,ap(v,vAlfi+.2,.4),{hs:120,gy:115,gs:46});
  keyW('הַצָּעִיר','“the youngest”',1100,360,ap(v,vYst,.4),{hs:120,gy:115,gs:46});
  const s1=ap(v,vSame,.35)*(1-ap(v,vSoG-.2,.3));cap('GENESIS 25:23',1100,560,40,s1,true,'7px');gloss('the same word God used',1340,650,s1,56);gloss('for Jacob before he was born',1340,725,s1,56);
  const k=ap(v,vComeBack,.5);if(k>0){gl(900,800,1780,.5*k);gloss('these two words come back',1340,860,k,58);gloss('at the very end',1340,935,k,58);}});
// 5:00 · 32,000 men; “the people are too many”
S(vArmy2-.05,vSameW-.05,(v)=>{pic('36_army_32000',v,vArmy2-.05,vSameW,{side:'C',push:.05});
  band(ap(v,vGath,.4),170);bigNum('32,000',960,95,ap(v,vGath+.4,.4),76);
  if(v>vRav)vTop(ap(v,vRav+.2,.35),'JUDGES 7:2','רַב הָעָם',['רַב'],[[['“The people are ',0],['too many',1],['.”',0]]],{hs:96,es:62});});
// 5:08 · רַב: older for twins, many for an army
S(vSameW-.05,v22-.05,(v)=>{BGd();const u=camE((v-vSameW)/14);
  {const s=H/768*.62;draw('12_rebekah_pregnant',300-390*s,1080-750*s,s,.85*ap(v,vSameW,.3));}
  {const s=1.0*(1+.05*u);const [ox,oy]=at(688,470,1480,780,s);X.save();X.beginPath();X.rect(980,0,940,H);X.clip();draw('36_army_32000',ox,oy,s,.75*ap(v,vSameW,.3));X.restore();blackR(1800,1920);
   {const g=X.createLinearGradient(0,oy,0,oy+200);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(980,0,940,oy+200);}
   const g=X.createLinearGradient(980,0,1200,0);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(980,0,220,H);}
  {const g=X.createLinearGradient(0,0,0,360);g.addColorStop(0,'rgba(5,4,3,.9)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(0,0,W,360);}
  keyW('רַב','',960,170,ap(v,vSameW,.4),{hs:190});
  cap('GENESIS 25:23',620,380,40,ap(v,vMeantO,.4),true,'7px');gloss('“older”',620,455,ap(v,vMeantO,.4),66);
  cap('JUDGES 7:2',1440,380,40,ap(v,vMany,.4),true,'7px');gloss('“many”',1440,455,ap(v,vMany,.4),66);
  {const g=X.createLinearGradient(0,780,0,1080);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(.45,'rgba(5,4,3,.8)');g.addColorStop(1,'rgba(5,4,3,.95)');X.fillStyle=g;X.fillRect(0,780,W,300);}
  enLine([['Either way, it’s the ',0],['bigger side',1],[',',0]],960,875,64,ap(v,vBigger,.4));gloss('and God starts sending it home.',960,965,ap(v,vSend,.4),62);});
// 5:23 · 22,000 leave
S(v22-.05,vWater-.05,(v)=>{pic('37_22000_leave',v,v22-.05,vWater,{side:'C',push:.05,drift:40});
  const n=v<v10?32000-Math.round(22000*eio(sm(v22,v22+1.4,v))):10000;band(1,170);bigNum(n.toLocaleString('en-US'),960,95,1,76);
  if(v>vOd-.1)vTop(ap(v,vOd,.35),'JUDGES 7:4','עוֹד הָעָם רָב',['עוֹד','רָב'],[[['“The people are ',0],['still too many',1],['.”',0]]],{hs:96,es:62});});
// 5:31 · the water test: the 300 lap from their hands
S(vWater-.05,vKneel-.05,(v)=>{pic('40_lap_water',v,vWater-.05,vKneel,{side:'L',tx:600,push:.07});const c=TC();
  gloss('He tests them',c,380,ap(v,vWater,.4),66);gloss('at the water.',c,460,ap(v,vWater+.4,.4),66);bigNum('300',c,590,ap(v,vLap,.4),130);gloss('lap the water',c,710,ap(v,vLap+.3,.4),62);gloss('from their hands',c,785,ap(v,vLap+.6,.4),62);});
// 5:36 · the rest kneel down to drink; God keeps the 300
S(vKneel-.05,vValley-.05,(v)=>{if(v<vKeeps+1.1){pic('41_kneel_drink',v,vKneel-.05,vKeeps+1.2,{side:'C',push:.06});band(1,200);cap('THE REST KNEEL',960,85,56,ap(v,vKneel,.3),false,'9px');gloss('down to drink',960,160,ap(v,vKneel+.3,.4),58);}
  else{pic('40_lap_water',v,vKeeps+1.1,vValley,{side:'L',tx:560,z:.92});const c=TC();const n=10000-Math.round(9700*expoO((v-vKeeps-1.15)/1.0));
    bigNum(n.toLocaleString('en-US'),c,420,1,130);gloss('God keeps the 300,',c,560,ap(v,vKeeps+1.1,.3),62);gloss('everyone else',c,640,ap(v,vKeeps+1.3,.4),62);gloss('is sent home',c,715,ap(v,vKeeps+1.5,.4),62);}});
// 5:41 · Midian's army, like locusts
S(vValley-.05,vHands-.05,(v)=>{pic('42_midian_camp',v,vValley-.05,vHands,{side:'C',push:.05,drift:-40});
  band(ap(v,vValley,.4),160);labG('MIDIAN’S ARMY',960,82,ap(v,vValley+.2,.4),42);gloss('spread out like locusts',960,148,ap(v,vLoc,.4),42);});
// 5:44 · the weapons: a shofar, an empty jar, a torch inside
S(vHands-.05,vNight-.05,(v)=>{pic('43_props_rows',v,vHands-.05,vNight,{side:'C',push:.14,ty:620});
  band(1,280);gloss('Then Gideon hands out the weapons:',960,85,ap(v,vHands,.4),56);
  cap('A SHOFAR',1060,185,52,ap(v,vSho,.35),true,'7px');T('a ram’s horn',1060,245,'italic 400 50px Newsreader',IVORY,ap(v,vSho+.3,.35),'center');cap('AN EMPTY CLAY JAR',470,185,50,ap(v,vJar,.35),true,'7px');cap('A TORCH INSIDE',470,245,46,ap(v,vTorch,.35),true,'6px');});
// 5:54 · in the middle of the night they surround the camp
S(vNight-.05,356.65,(v)=>{pic('d_300',v,vNight-.05,vSmash,{side:'C',z:1.06,push:.05,drift:30});
  band(ap(v,vNight,.4),150);gloss('In the middle of the night,',960,80,ap(v,vNight,.4),46);labG('THEY SURROUND THE CAMP',960,145,ap(v,vSurr,.4),38);});
// 5:58 · smash the jars
S(356.65,vLeft-.05,(v)=>{pic('44_jar_smash',v,356.65,vLeft,{side:'C',z:1.05,push:.1});
  band(1,200);cap('THEY BLOW THE SHOFARS',960,95,50,ap(v,356.65,.25),true,'7px');cap('AND SMASH THE JARS',960,165,50,ap(v,vSmash,.3),true,'7px');});
// 5:59 · torch in the left hand, shofar in the right: both hands full
S(vLeft-.05,367.0,(v)=>{pic('45_torch_shofar',v,vLeft-.05,367.0,{side:'R',tx:1200,z:.8,push:.07,fade:false});const c=330;
  const [tx,ty]=P(1100,470),[sx,sy]=P(520,320);embers(v,1,[[tx,ty-40]],12);{const fl=.8+.2*Math.sin(v*13)*Math.sin(v*7.3);orb(tx,ty-70,150,.85*fl);orb(tx,ty-62,46,fl);}
  ringA(tx,ty,70,110,ap(v,vLeft+.2,.35),sm(vLeft+.2,vLeft+.9,v));ringA(sx,sy,90,80,ap(v,vRight+.2,.35),sm(vRight+.2,vRight+.9,v));
  vSide(ap(v,vLeft,.35)*(1-sm(vHFull-.3,vHFull,v)),c,'JUDGES 7:20','',[],[[['“…the ',0],['torches',1]],[['in their left hands,',0]],[['and the ',0],['shofars',1]],[['in their right…”',0]]],{cy:500,es:62});
  cap('BOTH HANDS',c,450,58,ap(v,vHFull,.35),true,'8px');cap('ARE FULL',c,530,58,ap(v,vHFull+.2,.35),true,'8px');kin('Not one of them|is holding a *sword*.','not one of them is holding',364,c,690,64,v);});
// 6:06 · the shout
S(367.0,vNoCh-.05,(v)=>{BGd();glow(960,520,760,.28+.05*Math.sin(v*7));
  vFull(ap(v,vShout+.2,.35),'JUDGES 7:20','',[],[[['“A ',0],['sword',1],[' for God',0]],[['and for Gideon!”',0]]],{es:84});});
// 6:09 · nobody charges: each man stands in his place
S(vNoCh-.05,vInside-.05,(v)=>{pic('d_300',v,vNoCh-.05,vInside,{side:'C',z:1.12,push:.04,drift:-20});
  band(1,220);enLine([['But nobody ',0],['charges',1],['.',0]],960,88,70,ap(v,vNoCh,.4));gloss('Each man just stands in his place around the camp.',960,170,ap(v,C('each man just stands',370),.4),48);});
// 6:14 · God turns every man's sword against the man beside him
S(vInside-.05,vTold-.05,(v)=>{pic('46_camp_chaos',v,vInside-.05,vTold,{side:'C',push:.07});
  band(1,220);gloss('Inside, God turns every man’s sword',960,88,ap(v,vInside,.4),62);cap('AGAINST THE MAN BESIDE HIM',960,170,50,ap(v,vInside+1.4,.35),true,'7px');});
// 6:17 · why: “My own hand saved me”
S(vTold-.05,vNobody2-.05,(v)=>{BGd();glow(960,520,820,.3+.04*Math.sin(v));motes(v,.6,200,100,1520,880);
  gloss('God had told Gideon why,',960,450,ap(v,vTold,.4)*(1-ap(v,vYadi,.3)),70);gloss('before the first man went home…',960,560,ap(v,vTold+.9,.4)*(1-ap(v,vYadi,.3)),70);
  vFull(ap(v,vYadi,.4),'JUDGES 7:2','יָדִי הוֹשִׁיעָה לִּי',['יָדִי'],[[['“',0],['My own hand',1],[' saved me.”',0]]],{hs:140,es:80});});
// 6:28 · hands full of light and noise
S(vNobody2-.05,vBack-.05,(v)=>{pic('45_torch_shofar',v,vNobody2-.05,vBack,{side:'R',tx:1360,z:.74,push:.06,fade:false});const c=430;
  const [tx,ty]=P(1100,470);embers(v,1,[[tx,ty-40]],12);{const fl=.8+.2*Math.sin(v*13)*Math.sin(v*7.3);orb(tx,ty-70,150,.85*fl);orb(tx,ty-62,46,fl);}orb(tx,ty-60,220,.3*ap(v,vLight,.5));
  enLine([['Nobody in that army',0]],c,560,56,ap(v,vNobody2,.4));enLine([['could ever say it,',0]],c,635,56,ap(v,vNobody2+.6,.4));enLine([['their hands were full',0]],c,735,56,ap(v,vLight-.8,.4));
  enLine([['of ',0],['light',1],[' and ',0],['noise',1],['.',0]],c,825,70,ap(v,vLight,.4));});
// 6:34 · back to Jacob's crossed hands
S(vBack-.05,vCent-.05,(v)=>{warm(960,560,820,.8);bed('02_crossing',v,lerp(.78,.84,camE((v-vBack)/11.5)));
  {const [hx,hy]=P(872,248);ringA(hx-4,hy+20,64,44,ap(v,vWhose-.2,.3),sm(vWhose-.2,vWhose+.4,v));}const sw=v>vYoungW-.1;tagAt('MANASSEH',300,560,360,330,ap(v,vFirstW,.3)*(sw?.45:1),!sw,56);tagAt('EPHRAIM',1620,560,1000,360,ap(v,vYoungW-.1,.3),true,56);
  const a1=ap(v,vFirstW,.4)*(1-sm(vYoungW-.3,vYoungW,v));if(a1>0){band(a1,230);enLine([['When the firstborn wins,',0]],960,85,60,a1);enLine([['it can look like ',0],['his own hand',1],[' did it.',0]],960,165,60,a1);}
  const a2=ap(v,vYoungW,.4);if(a2>0){band(a2,230);enLine([['But when the ',0],['younger',1],[' one wins,',0]],960,85,60,a2);enLine([['everyone knows ',0],['whose hand',1],[' it was.',0]],960,165,60,ap(v,vWhose-.4,.4));}});
// 6:45 · Isaiah takes the two words
S(vCent-.05,vHeb-.05,(v)=>{BGd();glow(960,500,820,.28);motes(v,.9,200,100,1520,880);
  const u=eio(sm(vTwoW+.4,vTwoW+2.4,v));const mf=sm(vIsa-.2,vIsa+.3,v);
  keyW(mf<.5?'אַלְפִּי':'אֶלֶף',mf<.5?'“my thousand”':'“a thousand”',lerp(1320,1180,u),lerp(420,470,u),ap(v,vCent+.3,.4),{hs:120,gy:110});
  keyW('הַצָּעִיר','“the youngest”',lerp(600,740,u),lerp(420,470,u),ap(v,vCent+.3,.4),{hs:120,gy:110});
  T(mf<.5?'JUDGES 6:15 · GIDEON’S TWO WORDS':'ISAIAH 60:22',960,250,'300 40px Fraunces',GOLD,ap(v,vCent+.3,.4),'center','7px');
  {const a3=ap(v,vTwoW+.6,.4)*(1-sm(vProm-.3,vProm,v));heb('א ל ף',960,700,72,a3,{gold:{'א':0,'ל':0,'ף':0},t:9});gloss('the same three letters: “thousand”',960,800,a3,52);}
  gloss('…a promise to His people',960,760,ap(v,vProm,.4),60);});
// 6:52 · the final verse, alone (Isaiah 60:22)
S(vHeb-.05,999,(v)=>{BGd();glow(960,520,900,.3+.05*Math.sin(v*.7));motes(v,.6,200,100,1520,880);
  T('ISAIAH 60:22',W/2,280,'300 52px Fraunces',GOLD,ap(v,vHeb,.5),'center','8px');
  heb('הַקָּטֹן יִהְיֶה לָאֶלֶף וְהַצָּעִיר לְגוֹי עָצוּם',W/2,440,132,1,{t:v,t0:vHeb+.15,step:(vFinal-vHeb-.6)/6,gold:{'לָאֶלֶף':vFinal+1.6,'וְהַצָּעִיר':vFinal+2.9}});
  enLine([['“The little one will become a ',0],['thousand',1],[',',0]],W/2,645,86,ap(v,vFinal,.5));enLine([['and the ',0],['youngest',1],[' a mighty nation.”',0]],W/2,760,86,ap(v,C('and the youngest a mighty',421),.5));});

// ---------- render ----------
let GR=[],VIG;
function drawAt(t){const v=t-PRE;X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.shadowBlur=0;X.setLineDash([]);
  BGd();for(const s of SH){if(v<s.a||v>=s.b)continue;X.save();try{s.f(Math.max(0,v));}catch(e){console.error('shot',s.a,e.message);}X.restore();}}
window.renderFrame=t=>{drawAt(t);X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;if(VIG)X.drawImage(VIG,0,0);if(GR.length)X.drawImage(GR[Math.floor(t*24)%3],0,0);};
window.SHOTS=SH;window.CUE=C;window.DUR=DUR;
const IMGS=window.IMGS||{};
Promise.all([...['500 40px "Frank Ruhl Libre"','300 30px Fraunces','400 30px Fraunces','500 30px Fraunces','italic 400 40px Newsreader'].map(f=>document.fonts.load(f,'אב Ab')),
  ...Object.keys(IMGS).map(k=>new Promise(r=>{const im=new Image();im.onload=()=>{IMG[k]=im;meta(k,im);r();};im.onerror=()=>{console.error('img',k);r();};im.src=IMGS[k];}))]).then(()=>{
  for(let k=0;k<3;k++){const [g,gx]=mk(W,H);const r=rng(9+k);gx.globalAlpha=.035;for(let i=0;i<2200;i++){gx.fillStyle=r()<.5?'#000':'#fff';gx.fillRect(r()*W,r()*H,1+r()*1.6,1+r()*1.6);}GR.push(g);}
  const [vv,vx]=mk(W,H);const vg=vx.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,W*.68);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');vx.fillStyle=vg;vx.fillRect(0,0,W,H);VIG=vv;
  window.READY=true;});
