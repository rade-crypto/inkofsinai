// ===================== 09 · Why the Bible Keeps Choosing the Younger Brother · painted edition =====================
// paintings (cut out on black) + gold graphics. Cue times are VO seconds; video time = VO time + PRE.
const PRE=.4, VEND=423.7, DUR=PRE+VEND+3.2;
const norm=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(/\s+/).filter(Boolean);const WW=WDS.map(w=>w[2].replace(/'/g,''));
function C(ph,after=0,end=false){const q=norm(ph);for(let i=0;i<WDS.length;i++){if(WDS[i][0]<after-4)continue;let ok=true;for(let j=0;j<q.length;j++){if(!WW[i+j]||WW[i+j]!==q[j]){ok=false;break;}}if(ok)return end?WDS[i+q.length-1][1]:WDS[i][0];}console.warn('cue?',ph,after);window.MISS=(window.MISS||[]).concat([ph]);return after;}
const CE=(ph,after=0)=>C(ph,after,true);
const SH=[];const S=(a,b,f,keep,cut)=>SH.push({a,b,f,keep,cut});window.TXA=1;
{const _ft=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(...q){const k=window.TXA;if(k!==1){if(k<=.003)return;const g=this.globalAlpha;this.globalAlpha=Math.min(1,g*k);_ft.apply(this,q);this.globalAlpha=g;}else _ft.apply(this,q);};}
const ap=(v,v0,d=.45)=>sm(v0-.2,v0-.2+Math.min(d,.35),v);
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
  lines.forEach((ws,li)=>{const lt=WDS[i0+k]?WDS[i0+k][0]-.2:0;const toks=ws.map(w=>{const g=w.includes('*');const s=w.replace(/\*/g,'').replace(/_/g,' ');k++;return {s,g,t:lt};});
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
function draw(k,ox,oy,s,a=1){const im=IMG[k];if(!im)return;LP={ox,oy,s,b:{side:'C',l:ox,r:ox+1376*s}};X.save();X.globalAlpha*=a;if(k==='b_joseph')X.globalCompositeOperation='lighten';X.drawImage(im,ox,oy,1376*s,768*s);X.restore();}
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

// ================= SHOTS v8: every line a full phrase, on its word; cuts 0.15 s before each sentence =================
// ln: one italic line, *word* = gold, appears on VO time t (whole line at once, 0.2 s lead)
// explainer kit: thin gold rules, spaced serif caps (T-chart / chain)
function hrule(x0,x1,y,p,a=1){if(a<=.003||p<=0)return;X.save();X.globalAlpha*=a;X.strokeStyle='rgba(217,180,106,.75)';X.lineWidth=2;X.shadowColor='rgba(255,190,90,.5)';X.shadowBlur=8;X.beginPath();X.moveTo(x0,y);X.lineTo(lerp(x0,x1,clamp(p)),y);X.stroke();X.restore();}
function vrule(x,y0,y1,p,a=1){if(a<=.003||p<=0)return;X.save();X.globalAlpha*=a;X.strokeStyle='rgba(217,180,106,.75)';X.lineWidth=2;X.shadowColor='rgba(255,190,90,.5)';X.shadowBlur=8;X.beginPath();X.moveTo(x,y0);X.lineTo(x,lerp(y0,y1,clamp(p)));X.stroke();X.restore();}
function exBG(v){BGd();glow(960,540,820,.22);motes(v,.6,200,100,1520,880);}
// name label, as in the posted videos: Hebrew name in gold over the English caps
function nameH(h,en,x,y,a,hs=64,es=40,gold=true){if(a<=.003)return;heb(h,x,y-hs*.62,hs,a,{gold:gold?{[h]:0}:{},t:9});cap(en,x,y+es*.55,es,a,false,'8px');}
const lx=()=>{},kx=()=>{};
function ln(s,x,y,sz,v,t,o={}){const a=(o.a??1)*ap(v,t);if(a<=.003)return;const parts=s.split(/(\*[^*]+\*)/).filter(Boolean).map(p=>p[0]==='*'?[p.slice(1,-1),1]:[p,0]);
  X.save();X.globalAlpha*=a;X.font=`italic 400 ${sz}px Newsreader`;X.textBaseline='middle';X.textAlign='left';const ws=parts.map(p=>X.measureText(p[0]).width),tot=ws.reduce((p,q)=>p+q,0);let xx=x-tot/2;const dy=(1-eo(clamp((v-t+.2)/.38)))*10;
  parts.forEach((p,i)=>{if(p[1]){X.fillStyle=gg(xx,y-sz/2,xx+ws[i],y+sz/2);X.shadowColor='rgba(255,196,96,.85)';X.shadowBlur=24;}else{X.fillStyle=IVORY;X.shadowColor='rgba(0,0,0,.95)';X.shadowBlur=14;}X.fillText(p[0],xx,y+dy);xx+=ws[i];});X.restore();}


// ---- explainer graphics (no photos) ----
function xmark(x,y,r,a){if(a<=.003)return;X.save();X.globalAlpha*=a;X.strokeStyle='rgba(217,180,106,.8)';X.lineWidth=2.5;X.beginPath();X.moveTo(x-r,y-r);X.lineTo(x+r,y+r);X.moveTo(x+r,y-r);X.lineTo(x-r,y+r);X.stroke();X.restore();}
function campRing(v,cx,cy,rx,ry,p,a,o={}){if(a<=.003)return;X.save();X.globalAlpha*=a;
  const g=X.createRadialGradient(cx,cy,0,cx,cy,rx);g.addColorStop(0,'rgba(60,44,24,.55)');g.addColorStop(1,'rgba(20,15,9,.0)');X.fillStyle=g;X.beginPath();X.ellipse(cx,cy,rx*.78,ry*.72,0,0,7);X.fill();
  const r=rng(7);for(let i=0;i<70;i++){const an=r()*7,d=Math.sqrt(r());const x=cx+Math.cos(an)*rx*.7*d,y=cy+Math.sin(an)*ry*.62*d;X.fillStyle=`rgba(170,130,80,${.35+.2*r()})`;X.beginPath();X.moveTo(x,y-9);X.lineTo(x-8,y+5);X.lineTo(x+8,y+5);X.fill();}
  if(o.chaos){const c=o.chaos;for(let i=0;i<16;i++){const an=r()*7,d=Math.sqrt(r());orb(cx+Math.cos(an)*rx*.6*d,cy+Math.sin(an)*ry*.5*d,40+30*r(),.5*c*(.6+.4*Math.sin(v*6+i)));}}
  X.restore();X.save();X.globalCompositeOperation='lighter';const N=60;for(let i=0;i<N;i++){const q=i/N;if(q>p)break;const an=q*Math.PI*2-Math.PI/2;const px=cx+rx*Math.cos(an),py=cy+ry*Math.sin(an);const fl=.7+.3*Math.sin(v*9+i*1.7);
    X.fillStyle=`rgba(255,214,140,${.9*fl*a})`;X.beginPath();X.arc(px,py,4.5,0,7);X.fill();orb(px,py,18,.4*fl*a);}X.restore();}
// Jacob's crossed hands as a diagram: right hand (gold) to the younger, left hand to the older
function crossX(v,cx,y0,y1,pR,pL,a,o={}){if(a<=.003)return;const w=o.w||400;
  ink([[cx+60,y0],[cx-w+40,y1-60]],pL,a*.75,{arrow:true,w:3,head:18,col:'rgba(240,228,205,.85)'});
  ink([[cx-60,y0],[cx+w-40,y1-60]],pR,a,{arrow:true,w:5,head:24});
  if(o.lab!==false){cap('LEFT HAND',cx-w-190,y1-70,34,a*clamp(pL*2),false,'6px');cap('RIGHT HAND',cx+w+200,y1-70,34,a*clamp(pR*2),true,'6px');}
  nameH('מְנַשֶּׁה','MANASSEH',cx-w,y1+40,a*(o.aM??1),70,40,false);nameH('אֶפְרַיִם','EPHRAIM',cx+w,y1+40,a*(o.aE??1),70,40,true);}

// ---------- 0:00 · "In his old age, Jacob can't see" ----------
S(-1,2.65,(v)=>{const seeT=C('cant see',1);pic('03_jacob_closeup',v,-1.2,2.9,{side:'L',tx:420,z:1.02,push:.1,blur:6*sm(seeT,seeT+.6,v)});
  rays(120,-40,.95,1200,.5,1.1-.7*sm(seeT,seeT+.5,v),v);bokeh(v,1,5,7,-1);if(v>seeT)dimAt(960,300,1500,.25*sm(seeT,seeT+.6,v));
  const c=TC();nameH('יַעֲקֹב','JACOB',c,500,ap(v,1.4,.35),130,58);});
// ---------- 0:03 · two boys; the right hand is meant for the firstborn ----------
function bedT(z,cxImg=688){const s=H/768*z;return {s,ox:960-cxImg*s,oy:1110-759*s};}
function bed(k,v,z,cxImg){const T0=bedT(z,cxImg);draw(k,T0.ox,T0.oy,T0.s);motes(v,.8,200,200,1520,860);bokeh(v,1,11,7);return T0;}
S(2.65,11.95,(v)=>{warm(960,560,820,.8);const tR=C('right hand is meant',5)+.1,tF=C('so the firstborn stands',7)+.25,tY=C('and the younger at',9)+.35;
  const zin=eio(sm(5.0,6.8,v))*(1-eio(sm(7.6,9.4,v)));const z=lerp(.8,.95,zin)+.015*camE((v-2.75)/9.3),cxI=lerp(688,610,zin),sc=H/768*z;
  const ox=960-cxI*sc,oy=lerp(1110,1230,zin)-759*sc;draw('00_before',ox,oy,sc);motes(v,.7,200,200,1520,860);bokeh(v,1,11,6);


  const [rx,ry]=P(588,432);ringA(rx,ry,80,54,ap(v,tR,.5)*(1-sm(7.4,7.9,v)),sm(tR,tR+1,v));
  tagAt('FIRSTBORN',300,440,520,250,ap(v,tF,.6),false);tagAt('YOUNGER',1620,440,910,240,ap(v,tY,.6),true);
  cap('HIS GRANDSONS',960,110,44,ap(v,3.2,.4)*(1-sm(7.5,7.9,v)),false,'9px');
  {const [ax,ay]=P(520,250);warm(ax,ay,380,1.2*sm(8.1,8.6,v)*(1-sm(10.3,10.7,v)));const [bx,by]=P(910,240);warm(bx,by,380,1.2*sm(10.5,11,v));}
  {const [hx,hy]=P(588,432),[mx,my]=P(520,250);X.save();X.setLineDash([12,12]);ink(bez([hx,hy],[hx-40,hy-260],[mx,my-70]),eio(sm(6.0,6.9,v)),.8*(1-sm(10.9,11.6,v)),{arrow:true,w:3,head:18,col:'rgba(240,228,205,.85)'});X.restore();}});
const RH0=[588,432],LH0=[806,432],OB=[520,250],YB=[912,268];
// ---------- 0:12 · "But Jacob crosses his arms, so his right hand comes down on the younger boy's head" ----------
S(11.95,17.15,(v)=>{const u=camE((v-11.95)/9.6);const z=lerp(.8,.86,u);warm(960,560,820,.8);bed('00_before',v,z);
  const tRH=C('so his right hand comes',13)+.25,tYg=C('younger boys head',15);
  if(v>tYg){const [yx,yy]=P(910,260);warm(yx,yy,420,1.3*sm(tYg,tYg+.6,v));}
  X.save();const g=X.createLinearGradient(0,0,0,330);g.addColorStop(0,'rgba(5,4,3,.9)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(0,0,W,330);X.restore();
  
  tagAt('FIRSTBORN',300,440,520,250,1,false);tagAt('YOUNGER',1620,440,910,240,1+.2*sm(tYg,tYg+.4,v),true);
  // the crossing drawn as two arcs from his hands to the opposite heads
  {const [lx,ly]=P(806,432),[mx,my]=P(520,250);ink(bez([lx,ly],[(lx+mx)/2+60,ly-480],[mx+10,my-80]),eio(sm(12.6,13.4,v)),.85,{arrow:true,w:4,head:22,col:'rgba(240,228,205,.9)'});}
  {const [rx,ry]=P(588,432),[ex,ey]=P(910,240);ink(bez([rx,ry],[(rx+ex)/2-60,ry-520],[ex-10,ey-80]),eio(sm(tRH,tRH+1.1,v)),1,{arrow:true,w:6,head:30});}
  // Joseph: named, then his move drawn as arrows (no figure composited into the group)
  
  {const [ex,ey]=P(910,240),[mx,my]=P(520,250);
   ink(bez([1640,420],[1400,250],[ex+60,ey-20]),eio(sm(19.9,20.6,v)),1,{arrow:true,w:5,head:26});
   const p=eio(sm(20.6,21.4,v));if(p>0){X.save();X.setLineDash([16,12]);ink(bez([ex,ey-60],[(ex+mx)/2,ey-260],[mx,my-60]),p,.9,{arrow:true,w:4,head:22,col:'rgba(240,228,205,.9)'});X.restore();}}
});
// ---------- 0:17 · the boys' father
function josephClose(v,t0){const u=camE((v-t0)/3.2);const s=H/768*(1.75+.06*u);const [ox,oy]=at(650,250,1300,470,s);warm(1250,420,700,.9);draw('j_bow',ox,oy,s);bokeh(v,1,7,6);
  X.save();const g=X.createLinearGradient(0,700,0,1080);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(1,'rgba(5,4,3,1)');X.fillStyle=g;X.fillRect(0,700,W,380);X.restore();
  X.save();X.globalAlpha=.92;blackL(640,1000);X.restore();}
S(17.15,19.75,(v)=>{josephClose(v,17.15);nameH('יוֹסֵף','JOSEPH',500,470,ap(v,17.3,.35),110,52);cap('THE BOYS’ FATHER',500,600,40,ap(v,17.7,.35),true,'8px');},false,true);
S(19.75,21.55,(v)=>{const z=.86;warm(960,560,820,.8);bed('00_before',v,z);
  {const [lx,ly]=P(806,432),[mx,my]=P(520,250);ink(bez([lx,ly],[(lx+mx)/2+60,ly-480],[mx+10,my-80]),1,.6,{arrow:true,w:4,head:22,col:'rgba(240,228,205,.9)'});}
  {const [rx,ry]=P(588,432),[ex,ey]=P(910,240);ink(bez([rx,ry],[(rx+ex)/2-60,ry-520],[ex-10,ey-80]),1,.75,{arrow:true,w:6,head:30});
   ink(bez([1820,520],[1500,300],[ex+70,ey-70]),eio(sm(19.9,20.5,v)),1,{arrow:true,w:6,head:28});cap('JOSEPH',1720,600,46,ap(v,19.9,.35),true,'9px');
   const p=eio(sm(20.6,21.3,v));if(p>0){X.save();X.setLineDash([16,12]);const [mx,my]=P(520,250);ink(bez([ex,ey-90],[(ex+mx)/2,ey-330],[mx,my-90]),p,.95,{arrow:true,w:4,head:22,col:'rgba(240,228,205,.95)'});X.restore();}}},false,true);
S(21.55,24.75,(v)=>{josephClose(v,19.95);
  vSide(ap(v,21.7,.35),500,'GENESIS 48:18','לֹא־כֵן אָבִי כִּי־זֶה הַבְּכֹר',['הַבְּכֹר'],[[['“Not so, father,',0]],[['this one is the ',0],['firstborn',1],['.”',0]]],{cy:540,hs:92,es:64});},false,true);
// ---------- 0:20 · he grabs Jacob's hand
// ---------- 0:22 · "Not so, father, this one is the firstborn"
// ---------- 0:25 · "and Jacob says, 'I know, my son, I know'" ----------
S(24.75,28.65,(v)=>{const k2=C('i know',27);const z=1.04+.06*eio(sm(24.9,28.75,v))+.06*eio(sm(k2,k2+1,v));pic('01_jacob_boys',v,24.9,28.8,{side:'L',tx:540,fx:.3,z:.95,push:.06});
  
  vSide(ap(v,25.1,.3),1380,'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son,',0]],[['I know',1],['.”',0]]],{hs:112,es:70});});
// ---------- 0:29–0:39 · the ladder builds across two paintings ----------
const LAD=()=>[['CAIN','ABEL',C('from the first two brothers',33)+.3],['ISHMAEL','ISAAC',C('and so was his father',29)+.3],['ESAU','JACOB',vJYB+.2]];
const LADo=()=>({hY:vJYB+.2,hF:vJYB+.2,dim:C('passing over',35),glow:C('and choosing the younger',37)+.3});
S(28.65,33.25,(v)=>{pic('c_twins',v,28.6,33.5,{side:'L',tx:540,z:.86,ty:590,push:.08,par:[-40,50],pz:[0,.05]});bokeh(v,1,13,5);
  const tP=C('a younger brother',28)+.3;const [ex,ey]=P(367,380),[jx,jy]=P(829,380);dimAt(ex,ey,330,.7*sm(tP,tP+.8,v));warm(jx,jy,360,sm(tP,tP+.8,v));
  tag('ESAU',367,52,ap(v,28.9,.5),false,{y:175});tag('JACOB',829,58,ap(v,28.9,.5),true,{y:175});
  ladder(v,1450,540,LAD(),LADo());});
S(33.25,39.35,(v)=>{pic('05_cain_abel',v,33.2,39.8,{side:'L',tx:520,z:.78,push:.1,par:[50,-50],pz:[.03,0]});bokeh(v,1,17,5);
  const tP=C('from the first two brothers',33)+.6;const [cx0,cy0]=P(170,380),[ax,ay]=P(809,380);dimAt(cx0,cy0,320,.7*sm(tP,tP+.8,v));warm(ax,ay,340,sm(tP,tP+.8,v));
  tag('CAIN',170,82,ap(v,33.6,.5),false,{y:175});tag('ABEL',809,98,ap(v,33.8,.5),true,{y:175});
  ladder(v,1450,560,LAD(),LADo());},true);
// ---------- 0:39 · "and three times an older brother wants him dead" ----------
function panel(k,sx,sy,sw,sh,dx,dy,dw,dh,rev,a){if(a<=.003||rev<=0)return;const im=IMG[k];X.save();X.globalAlpha*=a;X.beginPath();const hh=dh*eio(rev);X.rect(dx,dy+(dh-hh)/2,dw,hh);X.clip();X.drawImage(im,sx,sy,sw,sh,dx,dy,dw,dh);
  const f=(x0,y0,x1,y1)=>{const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');return g;};
  X.fillStyle=f(dx,0,dx+90,0);X.fillRect(dx,dy,90,dh);X.fillStyle=f(dx+dw,0,dx+dw-90,0);X.fillRect(dx+dw-90,dy,90,dh);X.fillStyle=f(0,dy+dh,0,dy+dh-140);X.fillRect(dx,dy+dh-140,dw,140);X.fillStyle=f(0,dy,0,dy+60);X.fillRect(dx,dy,dw,60);X.restore();}
S(39.35,42.95,(v)=>{exBG(v);const ts=[39.7,40.2,40.7];const n=ts.filter(t=>v>t).length;
  tally2(v,960,420,n,ap(v,39.5,.35),['CAIN','ESAU','JACOB’S SONS'],420,70);
  ['KILLS','PLANS','PLOTS'].forEach((w,i)=>cap(w,960+(i-1)*420,640,46,ap(v,[39.9,40.4,40.9][i],.35),true,'9px'));});
// ---------- 0:43 · "Genesis never says why, and the reason only comes centuries later" ----------
const FL=[1700,600];
S(42.95,47.25,(v)=>{BGd();motes(v,.8,200,100,1520,880);
  kin('Genesis never says *why*.','genesis never says why',42,960,360,110,v);
  const tR=C('and the reason',44),tL=CE('centuries later',45);const p=eio(sm(tR,tL,v));const x=lerp(240,FL[0],p);
  ink([[240,FL[1]],[x,FL[1]]],1,1,{w:8});for(let i=0;i<9;i++){const tx=240+i*(FL[0]-240)/9;if(tx<x){X.save();X.globalAlpha=.6;X.fillStyle=GOLD;X.fillRect(tx-1,FL[1]-12,2,24);X.restore();}}
  if(p>0&&p<1){orb(x,FL[1],60,.7);embers(v,.6,[[x,FL[1]]],4);}
  T('?',FL[0],FL[1]-170,'400 120px Fraunces',GOLD,ap(v,46.6,.4),'center');
  const fl=sm(tL-.1,tL+.4,v);if(fl>0){embers(v,fl,[FL],9);orb(FL[0],FL[1]-20,120*fl,.9*fl);}});
// ---------- 0:47 · "before a battle where 300 men surround an army, and not one of them is holding a sword" ----------
S(47.25,53.15,(v)=>{exBG(v);campRing(v,1300,560,470,230,sm(49.5,50.6,v),ap(v,47.4,.5));
  cap('JUDGES 7',400,300,44,ap(v,47.4,.4),true,'8px');bigNum('300',400,470,ap(v,48.5,.4),200);
  ln('not one of them',400,710,68,v,50.4);ln('is holding a *sword*.',400,795,68,v,51.7);});
// ---------- 0:53 · the first younger brother doesn't survive (full painting)
S(53.15,60.05,(v)=>{const u=camE((v-53.25)/6.9);const sc=1.22*(1+.05*u);const [ox,oy]=at(688,420,960,720,sc);draw('e_offering',ox,oy,sc);bokeh(v,1,29,5);band(1,280);
  const tA=C('god accepts',55);
  if(v<55.85)kx('The first *younger* brother|doesn’t survive.','the first younger brother',52,960,150,70,v);
  else if(v<58.45)kx('God accepts *Abel’s* offering|instead of Cain’s.','god accepts abels offering',55,960,150,70,v);
  else lx('So out in the field,',960,150,74,v,58.6);
  tag('ABEL',950,250,ap(v,tA+.3,.5),true,{dx:210,y:430,tick:false});tag('CAIN',231,94,ap(v,C('instead of cains',56)+.2,.5),false,{dx:-170,y:400,tick:false});});
// ---------- 1:00 · Genesis 4:8 ----------
S(60.05,63.35,(v)=>{const tR=C('cain rises up',59),tK=C('and kills him',61);
  pic('f_cain_rises',v,60.15,63.6,{side:'L',tx:560,fx:.5,z:.75,push:.06,fade:760});bokeh(v,1,31,5);
  const [ax,ay]=P(1100,560);dimAt(ax,ay,330,.95*sm(tK,tK+.8,v));
  verse2(ap(v,60.2,.3),1440,520,'GENESIS 4:8',['וַיָּקָם קַיִן … וַיַּהַרְגֵהוּ'],['וַיַּהַרְגֵהוּ'],[[['“Cain rose up against Abel',0]],[['his brother, and ',0],['killed him',1],['.”',0]]],{hs:84,es:62});});
// ---------- 1:03 · "But God keeps choosing the younger anyway. Isaac is picked over his older brother Ishmael" ----------
S(63.35,69.05,(v)=>{const tO=C('his older brother ishmael',66);const q=eio(sm(tO-.7,tO+1.5,v));
  const sA=H/768*1.3,sB=H/768*.82;const [aox,aoy]=at(957,480,640,600,sA);const bm=META['11_isaac_ishmael'];const box=440-bm.cx*1376*sB,boy=560-.5*768*sB;
  const s=lerp(sA,sB,q),ox=lerp(aox,box,q),oy=lerp(aoy,boy,q);warm(lerp(640,820,q),560,620,1);draw('11_isaac_ishmael',ox,oy,s);bokeh(v,1,37,6);
  const [ix,iy]=P(957,300);rays(ix+40,-60,1.62,820,.25,.9*sm(63.9,64.7,v),v,4);
  if(v<66.25)kin('But God keeps choosing|the *younger* anyway.','but god keeps choosing',63,1420,470,80,v);
  else{lx('*Isaac* is picked over',1420,420,76,v,66.4);lx('his older brother,',1420,515,76,v,67.2);lx('Ishmael.',1420,610,76,v,68.4);}
  tag('ISAAC',957,293,ap(v,66.4,.3),true,{up:90});tag('ISHMAEL',440,44,ap(v,68.4,.3),false,{dx:230,y:190,tick:false});});
// ---------- 1:09 · twins, chosen before they're born → Genesis 25:23 → רַב ----------
S(69.05,81.55,(v)=>{pic('12_rebekah_pregnant',v,69.05,81.6,{side:'L',tx:560,push:.14});const c=TC();
  if(v<76.25){lx('When Isaac has *twins*,',c,320,64,v,69.2);lx('God chooses before',c,420,64,v,71.0);lx('they’re even born,',c,505,64,v,71.9);lx('telling their mother,',c,605,64,v,73.2);nameH('רִבְקָה','REBEKAH',c,540,ap(v,73.9,.35),88,46);}
  else if(v<80.65)vSide(ap(v,76.4,.3),c,'GENESIS 25:23','וְרַב יַעֲבֹד צָעִיר',['וְרַב','צָעִיר'],[[['“The ',0],['older',1],[' will serve',0]],[['the ',0],['younger',1],['.”',0]]],{cy:540,hs:108,es:68});
  else{keyW('רַב','“older”',c,440,ap(v,80.8,.5),{hs:210,gy:160,gs:62});cap('GENESIS 25:23',c,200,46,ap(v,80.8,.5),false,'8px');}});
S(81.55,87.95,(v)=>{exBG(v);keyW('רַב','“older”',960,330,1,{hs:190,gy:150,gs:60});cap('AN ARMY',960,560,50,ap(v,84.4,.35),false,'9px');cap('SENT HOME',960,990,50,ap(v,86.9,.35),true,'9px');
  {const r=rng(21),a=ap(v,84.1,.5),go=sm(85.9,87.2,v);X.save();for(let i=0;i<900;i++){const x=260+r()*1400,y=620+r()*330,keep=i%3===0;const al=a*(keep?1:1-go)*(.45+.35*r());if(al<=.01)continue;X.fillStyle=`rgba(225,190,125,${al})`;X.beginPath();X.arc(x+(keep?0:-go*60),y,2.4,0,7);X.fill();}X.restore();}});
// 1:28 · Isaac loves Esau
S(87.95,90.95,(v)=>{pic('13_isaac_esau',v,87.95,91,{side:'L',tx:560,z:.86});const c=TC();
  kx('Isaac loves *Esau*,','isaac loves esau',86,c,480,84,v);lx('the firstborn twin,',c,590,66,v,89.6);});
// 1:31 · Rebekah loves Jacob
S(90.95,92.85,(v)=>{pic('14_rebekah_jacob',v,90.95,93,{side:'L',tx:560,fx:.55,z:1.05});const c=TC();
  lx('while Rebekah loves *Jacob*.',c,500,72,v,91.1);});
// 1:33 · the birthright for a bowl of stew
S(92.85,96.35,(v)=>{pic('15_stew',v,92.85,96.4,{side:'L',tx:540,z:.72});const c=TC();
  lx('Esau sells his *birthright*',c,470,70,v,93.0);cap('THE BIRTHRIGHT',c,520,60,ap(v,93.9,.35),true,'8px');});
// 1:36 · Isaac still means to bless Esau; Esau is a hairy man
S(96.35,102.85,(v)=>{pic('04_isaac',v,95.5,103.4,{side:'L',tx:600,z:.95});const c=TC();nameH('יִצְחָק','ISAAC',c,420,ap(v,96.6,.35),104,50,false);if(v<100.75){cap('THE BLESSING',c,600,44,ap(v,99.9,.35),true,'8px');ink([[c-120,660],[c+120,660]],sm(100.2,100.6,v),1,{arrow:true,w:3,head:16});cap('ESAU',c,720,44,ap(v,100.4,.35),false,'8px');}else nameH('עֵשָׂו','ESAU',c,640,ap(v,100.9,.35),90,44,false);
  if(v<100.75){lx('But Isaac, who can’t see,',c,450,68,v,96.5);lx('still means to bless *Esau*.',c,540,68,v,98.9);}
  else lx('*Esau* is a hairy man,',c,500,72,v,100.9);});
// 1:43 · goatskin on Jacob's hands
S(102.85,105.65,(v)=>{pic('16_goatskin',v,102.5,105.7,{side:'L',tx:600});const c=TC();lx('So Rebekah wraps',c,450,70,v,103.0);cap('GOATSKIN',c,520,64,ap(v,104.9,.35),true,'9px');});
// 1:45 · Isaac feels the hairy hands
S(105.65,109.85,(v)=>{pic('17_isaac_feels',v,105.65,109.9,{side:'L',tx:520,z:.86,push:.09});const c=1440;
  const [hx,hy]=P(700,430);ringA(hx,hy,110,80,ap(v,106.2,.35),sm(106.2,106.9,v));
  lx('Isaac feels those',c,430,64,v,105.9);lx('hairy hands',c,515,64,v,107.0);lx('and blesses *Jacob* instead.',c,620,64,v,107.7);});
// 1:50 · Esau cries out
S(109.85,118.05,(v)=>{pic('20_esau_cries',v,109.85,118.1,{side:'L',tx:560});const c=TC();
  if(v<112.25){lx('When Esau finds out,',c,470,68,v,110.0);lx('he cries:',c,560,68,v,111.3);}
  else verse2(ap(v,112.4,.35),c,540,'GENESIS 27:36',['בְּכֹרָתִי לָקָח … לָקַח בִּרְכָתִי'],['בְּכֹרָתִי','בִּרְכָתִי'],[[['“He took my ',0],['birthright',1],[',',0]],[['now he has taken my ',0],['blessing',1],['.”',0]]],{hs:84,es:60});});
// 1:58 · בְּכֹרָתִי / בִּרְכָתִי: swap two letters
function letters2(v,cx,y,swapU,a){const L5=['ב','כ','ר','ת','י'],gap=170,x0=cx+2*gap;
  L5.forEach((ch,i)=>{let x=x0-i*gap,yy=y;const sw=(i===1||i===2);if(sw){const to=i===1?x0-2*gap:x0-gap;const u=eio(swapU);x=lerp(x,to,u);yy=y-(i===1?1:-1)*110*Math.sin(Math.PI*u);}
    heb(ch,x,yy,170,a,{gold:sw?{[ch]:0}:{},t:9});});}
S(118.05,128.75,(v)=>{BGd();glow(960,520,760,.18);motes(v,.6,200,100,1520,880);
  const tS=C('swap two letters',121),tB=C('becomes blessing',123);const sw=sm(tB-.2,tB+1.0,v);const fW=v<125.75?1:0;
  keyW('בְּכֹרָתִי','“my birthright”',1340,230,ap(v,118.2,.5)*fW,{hs:96,gy:88,gs:46,gold:false});keyW('בִּרְכָתִי','“my blessing”',580,230,ap(v,118.5,.5)*fW,{hs:96,gy:88,gs:46,gold:false});
  letters2(v,960,520,sw,ap(v,tS-.3,.5));const k=sm(tB+.6,tB+1.0,v),a2=ap(v,tS-.3,.5);
  T('birthright',960,660,'italic 400 70px Newsreader',IVORY,a2*(1-k),'center');T('blessing',960,660,'italic 400 70px Newsreader',GL,a2*k,'center');
  ln('Both belong to the *firstborn*,',960,815,68,v,125.9);ln('and both went to the *younger*.',960,905,68,v,127.6);});
// 2:08 · Esau's plan → Genesis 27:41 → a second older brother
S(128.75,139.75,(v)=>{pic('21_esau_plan',v,128.75,139.8,{side:'L',tx:520,push:.14});const c=TC();
  if(v<131.25)lx('So Esau makes a *plan*.',c,520,72,v,128.9);
  else if(v<136.55)verse2(ap(v,131.4,.35),c,540,'GENESIS 27:41',['וְאַהַרְגָה אֶת־יַעֲקֹב אָחִי'],['וְאַהַרְגָה'],[[['“…then I will ',0],['kill',1]],[['my brother Jacob.”',0]]],{hs:96,es:66});
  else{tally2(v,c,500,v>136.9?2:1,ap(v,136.6,.35),['CAIN','ESAU','JACOB’S SONS'],300,58);}});
// 2:19 · Jacob runs to Laban
S(139.75,142.25,(v)=>{pic('22_jacob_flees',v,139.75,144.7,{side:'L',tx:600,drift:60});const c=TC();
  nameH('יַעֲקֹב','JACOB',c,480,ap(v,139.9,.35),110,52);lx('to his uncle Laban.',c,525,64,v,141.1);});
// 2:22 · "and there, the pattern flips": a card turns over
function flipCard(v,cx,cy,w,h,p,a,front,back){if(a<=.003)return;const ang=Math.PI*eio(clamp(p)),sx=Math.cos(ang),face=sx>=0?front:back;const k=Math.abs(sx);
  X.save();X.globalAlpha*=a;X.translate(cx,cy);X.scale(Math.max(.02,k),1+.04*Math.sin(ang));
  const g=X.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'rgba(34,26,15,.96)');g.addColorStop(1,'rgba(16,12,7,.96)');X.fillStyle=g;X.beginPath();X.roundRect(-w/2,-h/2,w,h,22);X.fill();
  X.strokeStyle='rgba(217,180,106,.85)';X.lineWidth=2.5;X.shadowColor='rgba(255,190,90,.6)';X.shadowBlur=18;X.stroke();X.shadowBlur=0;X.strokeStyle='rgba(217,180,106,.35)';X.lineWidth=1.2;X.beginPath();X.roundRect(-w/2+16,-h/2+16,w-32,h-32,14);X.stroke();X.restore();
  if(k>.15){X.save();X.translate(cx,cy);X.scale(k,1);X.translate(-cx,-cy);
    nameH(face[0],face[1],cx,cy-120,a,96,46,true);cap('OVER',cx,cy+20,34,a*.8,false,'10px');nameH(face[2],face[3],cx,cy+170,a*.75,80,40,false);X.restore();}}
S(142.25,146.45,(v)=>{exBG(v);flipCard(v,960,540,620,640,sm(143.4,144.1,v),ap(v,142.4,.4),['הַצָּעִיר','THE YOUNGER','הַבְּכֹר','THE FIRSTBORN'],['הַבְּכִירָה','THE FIRSTBORN','הַצְּעִירָה','THE YOUNGER']);});
// 2:24 · Laban's two daughters
S(146.45,150.85,(v)=>{pic('23_leah_rachel',v,146.45,150.9,{side:'L',tx:560,z:.84,ty:620});const c=TC();
  tag('LEAH',620,40,ap(v,146.6,.35),false,{dx:0,y:110,tick:false});tag('RACHEL',860,40,ap(v,148.0,.35),true,{dx:60,y:110,tick:false});
  lx('Laban has two daughters:',c,360,62,v,144.8);ln('Leah, the older,',c,450,62,v,146.6);ln('and *Rachel*, the younger,',c,535,62,v,147.7);lx('whom Jacob loves.',c,620,62,v,149.5);});
// 2:31 · Laban's trick and excuse
S(150.85,160.45,(v)=>{pic('24_laban',v,150.85,160.5,{side:'L',tx:540,z:.95});const c=TC();
  if(v<155.05){lx('But Laban tricks him',c,430,64,v,151.0);lx('into marrying Leah first,',c,515,64,v,152.0);lx('and his excuse stings:',c,620,64,v,153.8);}
  else verse2(ap(v,155.2,.35),c,540,'GENESIS 29:26',['לָתֵת הַצְּעִירָה לִפְנֵי הַבְּכִירָה'],['הַצְּעִירָה'],[[['“…give the ',0],['younger',1]],[['before the firstborn.”',0]]],{hs:84,es:64});});
// 2:40 · Jacob, of all people
S(160.45,164.75,(v)=>{exBG(v);nameH('יַעֲקֹב','JACOB',960,330,ap(v,160.6,.35),110,52);cap('THE YOUNGER BROTHER',960,450,38,ap(v,161.2,.35),false,'7px');
  ln('is told:',960,590,64,v,162.4);ln('“the *firstborn* comes first.”',960,690,76,v,162.9);});
// 2:44 · God sees that Leah is unloved (English only: the Hebrew has the Divine Name); Judah
S(164.75,168.75,(v)=>{pic('25_leah_baby',v,164.75,172.3,{side:'L',tx:600});const c=TC();
  if(v<168.75)vSide(ap(v,164.9,.35),c,'GENESIS 29:31','',[],[[['“God saw that Leah',0]],[['was ',0],['unloved',1],[',',0]],[['and He opened her womb.”',0]]],{es:62});
  else{ln('And from Leah comes *Judah*,',c,470,64,v,168.9);ln('the tribe of King David.',c,560,64,v,170.6);}});
// 2:52 · this time Jacob picks the younger; God sides with the older
S(168.75,172.25,(v)=>{exBG(v);const y=520,xs=[380,880,1460];
  nameH('לֵאָה','LEAH',xs[0],y,ap(v,169.1,.35),80,40,false);ln('the unloved one',xs[0],y+110,56,v,169.1);
  ink([[xs[0]+130,y],[xs[1]-170,y]],sm(169.4,169.9,v),1,{arrow:true,w:3,head:18});
  nameH('יְהוּדָה','JUDAH',xs[1],y,ap(v,169.9,.35),80,40);
  ink([[xs[1]+170,y],[xs[2]-255,y]],sm(170.6,171.3,v),1,{arrow:true,w:3,head:18});ln('the tribe of',(xs[1]+xs[2])/2+20,y-130,58,v,170.6);
  nameH('דָּוִד','KING DAVID',xs[2],y,ap(v,171.3,.35),80,40);});
S(172.25,179.25,(v)=>{exBG(v);const g=v>176.1;
  nameH('לֵאָה','LEAH',640,560,ap(v,172.4,.35),110,50,g);ln('the older',640,690,58,v,172.4);
  nameH('רָחֵל','RACHEL',1280,560,ap(v,172.4,.35)*(g?.55:1),110,50,!g);ln('the younger',1280,690,58,v,172.4,{a:g?.55:1});
  cap('JACOB PICKS',1280,250,40,ap(v,173.5,.35),false,'7px');ink([[1280,290],[1280,400]],sm(173.9,174.5,v),1,{arrow:true,w:3,head:16,col:'rgba(240,228,205,.85)'});
  cap('GOD SIDES WITH',640,250,40,ap(v,175.4,.35),true,'7px');ink([[640,290],[640,400]],sm(176.1,176.7,v),1,{arrow:true,w:5,head:20});});
// 2:59 · the two fathers' favorites vs God's choice
S(179.25,189.05,(v)=>{exBG(v);const L0=640,R0=1280;
  if(v<185.85){cap('FAVORED',L0,250,44,ap(v,179.4,.35)*(v<183.5?1:.6),false,'7px');cap('GOD CHOSE',R0,250,40,ap(v,183.5,.35),true,'8px');hrule(380,1540,300,sm(179.3,180,v));vrule(960,280,860,sm(179.5,180.3,v));
    const dl=v<183.5?1:.55;
    nameH('עֵשָׂו','ESAU',L0,460,ap(v,180.0,.35)*dl,96,44,false);ln('by Isaac',L0,560,56,v,180.0,{a:dl});
    nameH('רָחֵל','RACHEL',L0,730,ap(v,181.8,.35)*dl,96,44,false);ln('by Jacob',L0,830,56,v,181.8,{a:dl});
    nameH('יַעֲקֹב','JACOB',R0,460,ap(v,183.5,.35),96,44);nameH('לֵאָה','LEAH',R0,730,ap(v,183.9,.35),96,44);}
  else{cap('BORN SECOND',960,520,84,ap(v,186.6,.35),false,'12px');ink([[620,520],[1300,520]],sm(187.6,188.3,v),1,{w:6});}});
// 3:09 · Jacob has a favorite of his own
S(189.05,195.35,(v)=>{pic('26_jacob_joseph',v,189.05,200.6,{side:'L',tx:560,fx:.25,z:.9,push:.08,fade:700});const c=1380;
  nameH('יַעֲקֹב','JACOB',c,480,ap(v,189.2,.35),110,52);lx('now has a *favorite*',c,490,62,v,191.3);lx('of his own,',c,565,62,v,192.1);
  lx('a son who is about',c,680,62,v,193.0);lx('to pay for it.',c,755,62,v,194.1);});
// 3:15 · Joseph
S(195.35,200.55,(v)=>{pic('26_jacob_joseph',v,189.05,200.6,{side:'L',tx:560,fx:.25,z:.9,push:.08,fade:700});const c=1400;if(v<197.45)nameH('יוֹסֵף','JOSEPH',1480,500,ap(v,195.7,.4),110,52);else verse2(ap(v,197.6,.35),1480,540,'GENESIS 37:3',['אָהַב אֶת־יוֹסֵף מִכָּל־בָּנָיו'],['מִכָּל־בָּנָיו'],[[['“Israel loved Joseph',0]],[['more than all',1],[' his sons.”',0]]],{hs:66,es:56});
  lx('Rachel’s son,',c,490,62,v,196.6);lx('and Jacob loves him more',c,580,62,v,197.6);lx('than all his brothers.',c,660,62,v,199.2);});
// 3:20 · the brothers hate him (text on the black sky, upper right)
S(200.55,207.15,(v)=>{pic('30_brothers_see',v,200.55,207.2,{side:'C',z:1,push:.08});
  const [jx,jy]=P(1120,460);ringA(jx,jy,46,90,ap(v,203.4,.4),sm(203.4,204.2,v));
  if(v<202.05)lx('The brothers hate him.',1480,250,68,v,200.7);
  else if(v<204.05){lx('They see him coming',1480,210,66,v,202.2);lx('from far off.',1480,295,66,v,203.1);}
  else vSide(ap(v,204.2,.4),1480,'GENESIS 37:20','לְכוּ וְנַהַרְגֵהוּ',['וְנַהַרְגֵהוּ'],[[['“Come, let’s ',0],['kill',1],[' him.”',0]]],{cy:250,hs:86,es:62});});
// 3:27 · Cain alone, Esau alone, now a whole group
S(207.15,213.15,(v)=>{exBG(v);const xs=[480,960,1440];
  nameH('קַיִן','CAIN',xs[0],330,ap(v,207.3,.35),90,44);orb(xs[0],500,60,.8*ap(v,207.6,.35));ln('did it alone',xs[0],640,60,v,207.5);
  nameH('עֵשָׂו','ESAU',xs[1],330,ap(v,208.7,.35),90,44);orb(xs[1],500,60,.8*ap(v,209.0,.35));ln('planned it alone',xs[1],640,60,v,209.1);
  card('27_brothers_hate',380,60,640,620,xs[2],420,380,400,ap(v,211.4,.4),true);cap('JACOB’S SONS',xs[2],660,44,ap(v,211.4,.35),false,'7px');ln('a whole *group*',xs[2],750,60,v,211.4);ln('of brothers',xs[2],825,60,v,212.1);});
// 3:33 · sold as a slave
S(213.15,216.95,(v)=>{pic('31_joseph_sold',v,213.15,217,{side:'R',tx:1300,drift:-50});const c=560;
  lx('They sell him',c,430,66,v,213.3);lx('as a slave instead,',c,515,66,v,213.8);lx('but *Joseph* survives.',c,625,66,v,215.5);});
// 3:37 · years later: the boys' father
S(216.95,227.85,(v)=>{exBG(v);
  nameH('יַעֲקֹב','JACOB',960,170,ap(v,217.2,.35),80,40,false);ink([[960,230],[960,320]],sm(218.2,218.7,v),1,{w:3});
  nameH('יוֹסֵף','JOSEPH',960,420,ap(v,218.2,.35),104,50);ln('the boys’ father',960,540,58,v,218.2);
  ink([[920,580],[620,700]],sm(223.4,224.2,v),1,{w:3});ink([[1000,580],[1300,700]],sm(223.4,224.2,v),1,{w:3});
  nameH('מְנַשֶּׁה','MANASSEH',620,820,ap(v,225.3,.35),88,44,false);ln('the older',620,930,56,v,226.0);
  nameH('אֶפְרַיִם','EPHRAIM',1300,820,ap(v,227.0,.35),88,44);});
// 3:43 · Manasseh and Ephraim

// 3:48 · the right hand lands on Ephraim (Genesis 48:14)
S(227.85,234.85,(v)=>{exBG(v);
  vTop(ap(v,228.9,.35),'GENESIS 48:14','וַיָּשֶׁת עַל־רֹאשׁ אֶפְרַיִם וְהוּא הַצָּעִיר',['הַצָּעִיר'],[[['“He laid it on Ephraim’s head,',0]],[['though he was the ',0],['younger',1],['.”',0]]],{hs:72,es:58});
  crossX(v,960,500,840,sm(228.3,229.4,v),sm(227.95,228.6,v),1);});
// 3:55 · I know, my son → he too will be great
S(234.85,242.15,(v)=>{exBG(v);const c=960;
  if(v<238.15)vSide(ap(v,235.9,.35),c,'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son,',0]],[['I know',1],['.”',0]]],{hs:120,es:72});
  else verse2(ap(v,238.3,.35),c,540,'GENESIS 48:19',['וְאוּלָם אָחִיו הַקָּטֹן יִגְדַּל מִמֶּנּוּ'],['הַקָּטֹן'],[[['“But his ',0],['little brother',1]],[['will be greater than he.”',0]]],{hs:72,es:68});});
// 4:02 · Isaac was fooled by a pair of hands
S(242.15,249.95,(v)=>{exBG(v);const L0=640,R0=1280;const dl=v>246.2?.5:1;vrule(960,220,860,sm(242.3,243,v));
  nameH('יִצְחָק','ISAAC',L0,300,ap(v,242.3,.35)*dl,96,46,false);ln('can’t see',L0,440,58,v,242.3,{a:dl});ln('fooled by *hands*',L0,580,64,v,243.0,{a:dl});
  nameH('יַעֲקֹב','JACOB',R0,300,ap(v,244.7,.35),96,46);ln('can’t see either',R0,440,58,v,245.0);ln('but *knows*',R0,580,64,v,248.1);});
// 4:04 · Jacob can't see either, but he knows
S(249.95,255.55,(v)=>{exBG(v);const rows=[['CAIN','ABEL'],['ESAU','JACOB'],['THE BROTHERS','JOSEPH']];
  rows.forEach(([l,r],i)=>{const y=230+i*105,a=.55*ap(v,250.1+i*.25,.35);cap(l,700,y,40,a,false,'7px');xmark(960,y,16,a);cap(r,1220,y,40,a,false,'7px');});
  hrule(560,1360,560,sm(250.9,251.6,v));
  {const a=ap(v,251.3,.35);nameH('מְנַשֶּׁה','MANASSEH',740,700,a,80,40,false);nameH('אֶפְרַיִם','EPHRAIM',1180,700,a,80,40);}
  ln('*side by side*',960,840,66,v,252.0);});
// 4:15 · Jacob never says why; the answer goes to Manasseh's tribe
S(255.55,257.95,(v)=>{exBG(v);crossX(v,960,420,800,1,1,.5);T('?',960,560,'400 160px Fraunces',GOLD,ap(v,256.8,.35),'center');
  kin('But Jacob never says *why*|he crossed his hands.','but jacob never says why',255,960,170,64,v);});
S(257.95,265.65,(v)=>{exBG(v);const y=520;
  orb(460,y,90,.5*ap(v,258.1,.35));
  nameH('מְנַשֶּׁה','MANASSEH',460,y+270,ap(v,262.2,.35),70,40);ln('the older boy',460,y+345,56,v,263.0);
  hrule(660,1260,y,sm(258.8,260.0,v));ln('centuries later',960,y-55,60,v,259.4);
  {const a=ap(v,260.9,.35);X.save();X.globalAlpha*=a;X.strokeStyle='rgba(217,180,106,.8)';X.lineWidth=2;X.setLineDash([10,9]);X.strokeRect(1310,y-170,300,340);X.restore();
   T('?',1460,y,'400 150px Fraunces',GOLD,a,'center');cap('A MAN FROM',1460,y+230,46,a,false,'8px');cap('HIS TRIBE',1460,y+290,46,ap(v,262.2,.35),false,'8px');}});
// 4:25 · Gideon
S(265.65,267.05,(v)=>{exBG(v);nameH('גִּדְעוֹן','GIDEON',960,560,ap(v,265.9,.35),150,60);});
S(267.05,269.35,(v)=>{pic('32_midian_raiders',v,266.5,269.4,{side:'R',tx:1300,push:.07,drift:-40,fade:760});const c=520;nameH('מִדְיָן','MIDIAN',c,540,ap(v,267.5,.35),104,50,false);lx('is crushing Israel,',c,560,72,v,267.9);});
// 4:29 · an angel finds him threshing wheat inside a winepress
S(269.35,274.15,(v)=>{pic('33_gideon_threshing',v,268.9,274.2,{side:'R',tx:1320,fx:700/1376,z:1.0,push:.08,fade:820});const c=Math.max(540,TC());
  lx('An angel finds him',c,360,64,v,269.5);lx('threshing wheat',c,450,64,v,270.5);lx('inside a winepress',c,535,64,v,271.3);lx('to hide it from Midian.',c,625,64,v,272.4);});
// 4:34 · "I am the wrong man" (Judges 6:15)
S(274.15,283.95,(v)=>{pic('35_gideon_me',v,274.15,284,{side:'L',tx:560,fx:.33});const c=TC();
  if(v<276.25){lx('Gideon says',c,450,68,v,274.3);lx('he’s the wrong man:',c,540,68,v,274.8);}
  else verse2(ap(v,276.4,.35),c,560,'JUDGES 6:15',['אַלְפִּי הַדַּל … וְאָנֹכִי הַצָּעִיר'],['אַלְפִּי','הַצָּעִיר'],[[['“My ',0],['clan',1],[' is the poorest…',0]],[['and I am the ',0],['youngest',1],['.”',0]]],{hs:80,es:60});});
// 4:44 · אַלְפִּי my clan → my thousand · הַצָּעִיר the youngest
function twoWords(v){const th=v>286.25;const dm=(v>290.05&&v<293.55)?.3:1;keyW('אַלְפִּי',th?'':'“my clan”',1240,360,ap(v,284.1,.5)*dm,{hs:120,gy:115,gs:46});if(th)enLine([['“my ',0],['thousand',1],['”',0]],1240,475,66,dm);
  keyW('הַצָּעִיר','“the youngest”',680,360,ap(v,287.7,.5),{hs:120,gy:115,gs:46});}
S(283.95,290.05,(v)=>{exBG(v);twoWords(v);});
S(290.05,293.55,(v)=>{exBG(v);twoWords(v);
  cap('SAME WORD AS GENESIS 25:23',960,680,46,ap(v,290.4,.4),true,'8px');});
S(293.55,300.55,(v)=>{exBG(v);twoWords(v);gl(560,620,1360,.5);{const a=ap(v,297.2,.4);if(a>0){X.save();X.globalAlpha*=a;X.strokeStyle='rgba(217,180,106,.9)';X.lineWidth=2.5;X.shadowColor='rgba(255,190,90,.7)';X.shadowBlur=18;X.beginPath();X.roundRect(440,240,1040,320,24);X.stroke();X.restore();}}
  if(v<296.95){ln('So Gideon is the *youngest* son',960,700,60,v,293.7);ln('of the poorest *thousand*.',960,780,60,v,295.2);}
  else{lx('Those two words come back',960,700,60,v,297.1);lx('at the very end of this story.',1300,780,60,v,298.5);}});
// 5:00 · Gideon needs an army: 32,000 men; “the people are too many”
S(300.55,308.75,(v)=>{pic('36_army_32000',v,300.55,308.8,{side:'R',tx:1280,z:.86,push:.08,fade:760});blackL(700,1000);const c=400;
  if(v<303.35){lx('But first,',c,400,64,v,300.7);lx('Gideon needs an army.',c,485,64,v,301.5);}
  else if(v<305.15){bigNum('32,000',c,480,ap(v,303.5,.5),150);cap('MEN',c,610,50,ap(v,304.6,.4),false,'9px');}
  else vSide(ap(v,305.3,.45),c,'JUDGES 7:2','רַב הָעָם',['רַב'],[[['“The people',0]],[['are ',0],['too many',1],['.”',0]]],{cy:540,hs:110,es:66});});
// 5:09 · the same word to Rebekah → רַב: older for twins, many for an army
S(308.75,323.25,(v)=>{exBG(v);
    {const g=X.createLinearGradient(0,0,0,360);g.addColorStop(0,'rgba(5,4,3,.9)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(0,0,W,360);}
  if(v<313.15)vFull(ap(v,308.9,.35),'GENESIS 25:23','וְרַב יַעֲבֹד צָעִיר',['וְרַב'],[[['“The ',0],['older',1],[' will serve the younger.”',0]]],{hs:110,es:70});
  else{keyW('רַב','',960,330,ap(v,313.3,.4),{hs:170});
    ink([[880,410],[640,480]],sm(313.8,314.4,v),1,{w:3});ink([[1040,410],[1300,480]],sm(316.2,316.8,v),1,{w:3});cap('FOR THE TWINS',620,530,40,ap(v,314.0,.4),false,'8px');ln('“older”',620,600,64,v,315.0);
    cap('FOR AN ARMY',1320,530,40,ap(v,316.2,.4),false,'8px');ln('“many”',1320,600,64,v,317.6);}
  {const g=X.createLinearGradient(0,760,0,1080);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(.4,'rgba(5,4,3,.82)');g.addColorStop(1,'rgba(5,4,3,.95)');X.fillStyle=g;X.fillRect(0,760,W,320);}
  cap('EITHER WAY: THE BIGGER SIDE',960,760,46,ap(v,318.8,.35),true,'8px');lx('and God starts sending it home.',960,955,66,v,321.1);});
// 5:23 · 22,000 leave; 10,000 left; still too many
S(323.25,330.85,(v)=>{pic('37_22000_leave',v,323.25,330.9,{side:'R',tx:1280,z:.86,push:.08,drift:40,fade:760});blackL(700,1000);const c=400;
  if(v<326.55){const d=v>324.95?.55:1;bigNum('22,000',c,330,ap(v,323.4,.5)*d,110);cap('LEAVE',c,420,48,ap(v,323.6,.5)*d,false,'8px');
  bigNum('10,000',c,580,ap(v,325.1,.4),110);cap('LEFT',c,670,48,ap(v,325.4,.4),true,'8px');}
  else vSide(ap(v,326.7,.45),c,'JUDGES 7:4','עוֹד הָעָם רָב',['עוֹד','רָב'],[[['“The people are',0]],[['still too many',1],['.”',0]]],{cy:540,hs:96,es:62});});
// 5:31 · the water test
S(330.85,335.45,(v)=>{pic('40_lap_water',v,330.85,335.5,{side:'L',tx:600,push:.07});const c=TC();
  lx('He tests them',c,380,66,v,331.0);lx('at the water.',c,460,66,v,331.9);bigNum('300',c,590,ap(v,333.0,.4),130);ln('lap the water',c,710,62,v,333.6);lx('from their hands.',c,785,62,v,334.5);});
// 5:36 · the rest kneel; God keeps the 300 (split screen)
S(335.45,341.25,(v)=>{BGd();const u=camE((v-335.6)/5);
  {const sc=H/768*.7;draw('40_lap_water',480-767*sc,720-384*sc,sc);}
  {const sc=1.0*(1+.04*u);const [ox,oy]=at(1060,420,1440,720,sc*1.15);X.save();X.beginPath();X.rect(960,0,960,H);X.clip();draw('41_kneel_drink',ox,oy,sc*1.15,.9);X.restore();const g=X.createLinearGradient(960,0,1160,0);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(960,0,200,H);}
  band(1,330);
  bigNum('300',480,120,ap(v,335.6,.4),110);ln('lap the water',480,215,62,v,335.6);ln('*kept*',480,295,66,v,338.0);
  ln('The rest kneel',1440,120,64,v,335.6);ln('down to drink,',1440,205,64,v,336.7);ln('*sent home*',1440,295,66,v,339.5);});
// 5:41 · Midian's army, like locusts (Judges 7:12)
S(341.25,345.55,(v)=>{pic('42_midian_camp',v,341.25,345.6,{side:'R',tx:1400,push:.05,drift:-40,fade:760});const c=520;
  lx('While down in the valley,',c,380,62,v,341.4);vSide(ap(v,344.1,.4),c,'JUDGES 7:12','כָּאַרְבֶּה',['כָּאַרְבֶּה'],[[['“like ',0],['locusts',1],['”',0]]],{cy:500,hs:110,es:68});});
// 5:46 · the weapons: a shofar, an empty jar, a torch inside
S(345.55,354.05,(v)=>{pic('43_props_rows',v,345.55,354.1,{side:'R',tx:1320,fx:.57,push:.1,fade:760});const c=540;
  lx('Then Gideon hands out',c,250,62,v,345.7);lx('the weapons:',c,330,62,v,346.6);gl(c-240,395,c+240,.5*ap(v,345.7,.4));
  heb('שׁוֹפָר',c,480,100,ap(v,348.9,.4),{gold:{'שׁוֹפָר':0},t:9});ln('a horn to blow,',c,575,62,v,349.7);
  ln('an empty clay jar',c,690,62,v,350.9);ln('with a *torch* hidden inside.',c,775,62,v,352.2);});
// 5:54 · in the middle of the night they surround the camp
S(354.05,356.55,(v)=>{pic('d_300',v,354.05,359.1,{side:'C',z:1.06,push:.05,drift:30});band(1,230);
  lx('In the middle of the night,',960,135,66,v,354.2);lx('they surround the camp.',960,215,66,v,355.3);});
// 5:56 · blow the shofars and smash the jars
S(356.55,359.05,(v)=>{pic('44_jar_smash',v,356.55,359.1,{side:'L',tx:640,z:1.05,push:.1});const c=TC();
  lx('They blow the shofars',c,460,66,v,356.7);lx('and *smash* the jars.',c,550,66,v,357.6);});
// 5:59 · torches in the left hand, shofars in the right: both hands full
S(359.05,365.95,(v)=>{pic('45_torch_shofar',v,359.05,366,{side:'R',tx:1300,z:.7,push:.07,fade:640});const c=400;
  const [tx,ty]=P(1100,470),[sx,sy]=P(520,320);embers(v,1,[[tx,ty-40]],12);{const fl=.8+.2*Math.sin(v*13)*Math.sin(v*7.3);orb(tx,ty-70,150,.85*fl);orb(tx,ty-62,46,fl);}
  ringA(tx,ty,70,110,ap(v,360.3,.4)*(1-sm(361.2,361.5,v)),sm(360.3,361,v));
  if(v<362.75)vSide(ap(v,359.2,.4),480,'JUDGES 7:20','',[],[[['“…',0],['torches',1],[' in their left hands,',0]],[['',0],['shofars',1],[' in their right…”',0]]],{cy:480,es:58});
  else{ln('Both hands are *full*.',c,450,66,v,362.9);ln('And not one of them',c,580,66,v,363.9);ln('is holding a *sword*.',c,665,66,v,365.1);}});
// 6:06 · the shout
S(365.95,368.95,(v)=>{BGd();glow(960,520,760,.28+.05*Math.sin(v*7));lx('They shout:',960,300,66,v,366.1);
  vFull(ap(v,366.7,.35),'JUDGES 7:20','',[],[[['“A ',0],['sword',1],[' for God',0]],[['and for Gideon!”',0]]],{es:84,cy:600});});
// 6:09 · nobody charges
S(368.95,373.65,(v)=>{exBG(v);campRing(v,960,640,620,250,1,1,{chaos:sm(373.0,373.6,v)});
  });
// 6:14 · God turns every man's sword against the man beside him (Judges 7:22)
S(373.65,378.55,(v)=>{pic('46_camp_chaos',v,373.65,378.6,{side:'L',tx:620,push:.07});const c=TC();
  lx('Inside, God turns',c,400,64,v,374.3);lx('every man’s sword',c,485,64,v,375.9);lx('against the man beside him.',c,570,64,v,377.1);vSide(ap(v,375.9,.4),c,'JUDGES 7:22','',[],[[['“…every man’s ',0],['sword',1]],[['against his fellow.”',0]]],{cy:520,es:62});});
// 6:18 · why: “My own hand saved me”
S(378.55,388.35,(v)=>{BGd();glow(960,520,820,.3+.04*Math.sin(v));motes(v,.6,200,100,1520,880);
  vFull(ap(v,378.7,.4),'JUDGES 7:2','יָדִי הוֹשִׁיעָה לִּי',['יָדִי'],[[['“',0],['My own hand',1],[' saved me.”',0]]],{hs:140,es:80});});
// 6:28 · hands full of light and noise
S(388.35,394.15,(v)=>{exBG(v);ln('Their hands were full',960,260,66,v,391.0);
  {const a=Math.max(.35*ap(v,388.5,.5),ap(v,392.6,.4));const fl=.85+.15*Math.sin(v*11);orb(640,560,170*a,.9*a*fl);orb(640,560,60,a*fl);embers(v,a,[[640,540]],10);cap('LIGHT',640,800,52,a,true,'10px');}
  {const a=Math.max(.35*ap(v,388.7,.5),ap(v,393.3,.4));X.save();X.globalAlpha*=a;X.strokeStyle='rgba(240,214,150,.9)';X.lineWidth=4;X.shadowColor='rgba(255,190,90,.8)';X.shadowBlur=14;for(let k=0;k<4;k++){const r=60+k*55+((v*90)%55);X.globalAlpha=a*(1-k/4);X.beginPath();X.arc(1180,560,r,-.7,.7);X.stroke();}X.restore();cap('NOISE',1280,800,52,a,true,'10px');}});
// 6:34 · back to Jacob's crossed hands
S(394.15,396.45,(v)=>{exBG(v);crossX(v,960,420,820,sm(394.5,395.6,v),sm(394.3,395.2,v),1,{lab:false});
  if(v<396.45)lx('Now go back to Jacob’s crossed hands.',960,135,64,v,394.3);
  else if(v<400.25){ln('When the firstborn wins,',960,125,62,v,396.6);ln('it can look like *his own hand* did it.',960,205,62,v,398.1);}
  else{ln('But when the *younger* one wins,',960,120,62,v,400.4);ln('or the unloved one,',960,195,62,v,402.1);ln('everyone knows *whose hand* it was.',960,270,62,v,403.5);}});
S(396.45,405.65,(v)=>{exBG(v);const L0=640,R0=1280,hy=288,ly=333;const dl=v>400.3?.45:1;
  cap('FIRSTBORN WINS',L0,hy,42,ap(v,396.6,.35)*dl,false,'7px');cap('YOUNGER WINS',R0,hy,42,ap(v,400.4,.35),true,'7px');
  hrule(380,1540,ly,sm(396.4,397.2,v));vrule(960,313,780,sm(396.6,397.6,v));
  ln('it can look like',L0,520,62,v,398.1,{a:dl});ln('*his own hand*',L0,610,76,v,398.7,{a:dl});ln('did it.',L0,700,62,v,399.6,{a:dl});
  ln('or the unloved one,',R0,420,56,v,402.1);
  ln('everyone knows',R0,520,62,v,403.5);ln('*whose hand*',R0,610,76,v,404.2);ln('it was.',R0,700,62,v,404.8);});
// 6:46 · Isaiah takes the two words
S(405.65,vHeb-.05,(v)=>{BGd();glow(960,500,820,.28);motes(v,.9,200,100,1520,880);
  const u=eio(sm(410.3,412.3,v));const mf=v>407.75;
  keyW(mf?'אֶלֶף':'אַלְפִּי',mf?'“a thousand”':'“my thousand”',lerp(1320,1180,u),lerp(420,470,u),ap(v,405.9,.4),{hs:120,gy:110});
  keyW('הַצָּעִיר','“the youngest”',lerp(600,740,u),lerp(420,470,u),ap(v,405.9,.4),{hs:120,gy:110});
  T('ISAIAH 60:22',960,250,'300 48px Fraunces',GOLD,ap(v,407.9,.5),'center','8px');
  lx('God makes them a promise',960,740,64,v,413.5);lx('to His people.',960,825,64,v,414.5);});
// 6:56 · the final verse, alone (Isaiah 60:22)
S(vHeb-.05,999,(v)=>{BGd();glow(960,520,900,.3+.05*Math.sin(v*.7));motes(v,.6,200,100,1520,880);
  T('ISAIAH 60:22',W/2,280,'300 52px Fraunces',GOLD,ap(v,vHeb,.5),'center','8px');
  heb('הַקָּטֹן יִהְיֶה לָאֶלֶף וְהַצָּעִיר לְגוֹי עָצוּם',W/2,440,112,ap(v,vHeb+.15,.5),{t:v,gold:{'לָאֶלֶף':vFinal+1.6,'וְהַצָּעִיר':vFinal+2.9}});
  enLine([['“The little one will become a ',0],['thousand',1],[',',0]],W/2,645,86,ap(v,vFinal,.5));enLine([['and the ',0],['youngest',1],[' a mighty nation.”',0]],W/2,760,86,ap(v,C('and the youngest a mighty',421),.5));});

// ---------- render ----------
let GR=[],VIG;
// soft crossfades between shots (XF seconds, centred on each boundary)
const XF=.8;let OC=null,OX=null;
function resetCtx(){X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.shadowBlur=0;X.setLineDash([]);}
function runShot(s,v){X.save();try{s.f(Math.max(0,v));}catch(e){console.error('shot',s.a,e.message);}X.restore();resetCtx();}
function blendShot(s,v,a){if(a<=.002)return;if(!OC){const m=mk(W,H);OC=m[0];OX=m[1];}const MX=X;X=OX;resetCtx();X.clearRect(0,0,W,H);BGd();runShot(s,v);X=MX;resetCtx();X.globalAlpha=a;X.drawImage(OC,0,0);X.globalAlpha=1;}
function drawAt(t){const v=t-PRE;resetCtx();BGd();
  let i=-1;for(let k=0;k<SH.length;k++){if(v>=SH[k].a&&v<SH[k].b){i=k;break;}}if(i<0)return;const s=SH[i],nx=SH[i+1],pv=SH[i-1];
  if(nx&&nx.cut&&v>s.b-XF/2){window.TXA=1-sm(s.b-.32,s.b-.1,v);runShot(s,v);}
  else if(s.cut&&v<s.a+XF/2){window.TXA=sm(s.a-.1,s.a+.12,v);runShot(s,v);}
  else if(nx&&v>s.b-XF/2){window.TXA=nx.keep?1:1-sm(s.b-.32,s.b-.1,v);runShot(s,v);window.TXA=nx.keep?0:sm(s.b-.1,s.b+.12,v)/Math.max(.05,eio(clamp((v-(s.b-XF/2))/XF)));blendShot(nx,v,eio(clamp((v-(s.b-XF/2))/XF)));window.TXA=1;}
  else if(pv&&v<s.a+XF/2){window.TXA=s.keep?1:1-sm(s.a-.32,s.a-.1,v);runShot(pv,v);window.TXA=s.keep?0:sm(s.a-.1,s.a+.12,v)/Math.max(.05,eio(clamp((v-(s.a-XF/2))/XF)));blendShot(s,v,eio(clamp((v-(s.a-XF/2))/XF)));window.TXA=1;}
  else{window.TXA=1;runShot(s,v);}window.TXA=1;}
window.renderFrame=t=>{drawAt(t);X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;if(VIG)X.drawImage(VIG,0,0);if(GR.length)X.drawImage(GR[Math.floor(t*24)%3],0,0);};
SH.sort((p,q)=>p.a-q.a);window.SHOTS=SH;window.CUE=C;window.DUR=DUR;
const IMGS=window.IMGS||{};
Promise.all([...['500 40px "Frank Ruhl Libre"','300 30px Fraunces','400 30px Fraunces','500 30px Fraunces','italic 400 40px Newsreader'].map(f=>document.fonts.load(f,'אב Ab')),
  ...Object.keys(IMGS).map(k=>new Promise(r=>{const im=new Image();im.onload=()=>{IMG[k]=im;meta(k,im);r();};im.onerror=()=>{console.error('img',k);r();};im.src=IMGS[k];}))]).then(()=>{
  for(let k=0;k<3;k++){const [g,gx]=mk(W,H);const r=rng(9+k);gx.globalAlpha=.035;for(let i=0;i<2200;i++){gx.fillStyle=r()<.5?'#000':'#fff';gx.fillRect(r()*W,r()*H,1+r()*1.6,1+r()*1.6);}GR.push(g);}
  const [vv,vx]=mk(W,H);const vg=vx.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,W*.68);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');vx.fillStyle=vg;vx.fillRect(0,0,W,H);VIG=vv;
  window.READY=true;});
