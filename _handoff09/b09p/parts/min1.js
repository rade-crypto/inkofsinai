// ================= first minute v3 (merged: retention + YouTube strategy) =================
const TC=()=>{const b=LP.b;if(!b)return 1430;return b.side==='R'?Math.max(460,(70+b.l)/2):b.side==='L'?Math.min(1480,(b.r+1860)/2):960;};
function tag(s,ix,iy,a,gold,o={}){if(a<=.003)return;const [x,y]=P(ix,iy);const ly=o.y??Math.max(96,y-(o.up??70));const lx=x+(o.dx||0);const sz=o.sz||48;
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
  T(ref,cx,y,'300 42px Fraunces',GOLD,a,'center','7px');y+=70;hl.forEach(h=>{heb(h,cx,y+hs*.45,hs,a,{gold:goldMap(gold),t:9});y+=hs*1.35;});y+=18;
  en.forEach(p=>{enLine(p,cx,y+es*.45,es,a);y+=es*1.36;});}
// the ladder: rows build upward, the stack stays centred; older names left, younger (chosen) names right in gold
function ladder(v,cx,cy,rows,o={}){const dy=118,fs=62,lx=cx-210,rx=cx+210;const ws=rows.map(r=>ap(v,r[2],.4));const Ht=ws.reduce((a,b)=>a+b,0)*dy;if(Ht<=1)return;let acc=0;const top=cy-Ht/2;
  const dimL=o.dim?1-.55*sm(o.dim,o.dim+.6,v):1,glo=o.glow?sm(o.glow,o.glow+.6,v):0;
  if(glo>0){X.save();X.globalCompositeOperation='lighter';const g=X.createLinearGradient(rx-170,0,rx+170,0);g.addColorStop(0,'rgba(255,200,110,0)');g.addColorStop(.5,`rgba(255,200,110,${.12*glo})`);g.addColorStop(1,'rgba(255,200,110,0)');X.fillStyle=g;X.fillRect(rx-170,top-20,340,Ht+40);X.restore();
    ink([[rx+150,top+10],[rx+150,top+Ht-10]],sm(o.glow,o.glow+.9,v),1,{w:4});}
  rows.forEach((r,i)=>{const w=ws[i];if(w<=.003){return;}const y=top+acc*dy+dy*w/2;acc+=w;
    T(r[0],lx,y,`500 ${fs}px Fraunces`,IVORY,w*.8*dimL,'center','5px');ink([[cx-70,y],[cx+70,y]],sm(r[2]+.15,r[2]+.5,v),w,{arrow:true,w:3.5,head:16});cap(r[1],rx,y,fs,ap(v,r[2]+.3,.35)*(1+.15*glo),true,'5px');});
  const hy=top-70;cap('FIRSTBORN',lx,hy,44,o.hF?ap(v,o.hF,.35):0,false,'7px');cap('YOUNGER',rx,hy,44,o.hY?ap(v,o.hY,.35):0,true,'7px');}

// ---------- 0:00 · "In his old age, Jacob can't see" ----------
S(-1,2.75,(v)=>{pic('03_jacob_closeup',v,-.6,2.9,{side:'L',tx:420,z:1.02,push:.1});const seeT=C('cant see',1);
  rays(120,-40,.95,1200,.5,1.1-.7*sm(seeT,seeT+.5,v),v);bokeh(v,1,5,7,-1);if(v>seeT)dimAt(960,300,1500,.25*sm(seeT,seeT+.6,v));
  const c=TC();kin('In his old age,','in his old age',0,c,450,72,v);kin('*Jacob* can’t *see*.','jacob cant see',0,c,560,84,v);});
// ---------- 0:03 · "and two boys are brought to him for a blessing" ----------
function bedT(z,cxImg=688){const s=H/768*z;return {s,ox:960-cxImg*s,oy:1110-759*s};}
function bed(k,v,z,cxImg){const T0=bedT(z,cxImg);draw(k,T0.ox,T0.oy,T0.s);motes(v,.8,200,200,1520,860);bokeh(v,1,11,7);return T0;}
S(2.75,5.42,(v)=>{warm(960,560,820,.8);const z=lerp(.8,.83,eio(sm(2.75,5.4,v)));bed('00_before',v,z);
  const [b1x,b1y]=P(420,400),[b2x,b2y]=P(980,420);warm(b1x,b1y,360,sm(2.8,4,v));warm(b2x,b2y,360,sm(3,4.2,v));
  kin('Two boys','two boys',2,960,96,84,v);kin('for a *blessing*.','for a blessing',3,960,186,64,v);});
// ---------- 0:05 · cut-in: "The right hand is meant for the firstborn" ----------
S(5.42,7.8,(v)=>{const z=lerp(1.6,1.72,eio(sm(5.42,7.8,v)));const s=H/768*z;const [ox,oy]=at(588,432,600,610,s);warm(600,600,700,1);draw('00_before',ox,oy,s);blackR(930,1180);motes(v,.8,100,200,900,800);bokeh(v,1,41,6);
  const tH=C('right hand is meant',5)+.25;ringA(600,610,150,96,ap(v,tH,.3),sm(tH,tH+.6,v));orb(600,610,260,.22*ap(v,tH,.5));
  kin('The *right* *hand*','the right hand is',5,1450,430,84,v);kin('is meant for|the firstborn.','is meant for the firstborn',5,1450,610,70,v);});
// ---------- 0:08 · "so the firstborn stands at his right hand, and the younger at his left" ----------
const RH0=[588,432],LH0=[806,432],OB=[520,250],YB=[912,268];
S(7.8,12.05,(v)=>{warm(960,560,820,.8);const z=lerp(.8,.82,eio(sm(7.8,12.05,v)));bed('00_before',v,z);
  const tF=C('so the firstborn stands',7)+.25,tR=C('at his right hand',8)+.1,tY=C('and the younger at',9)+.35,tL=CE('at his left',10);
  tagAt('FIRSTBORN',330,560,330,330,ap(v,tF,.35),false);tagAt('YOUNGER',1610,560,1010,360,ap(v,tY,.35),true);
  const [rx,ry]=P(...RH0),[ox,oy]=P(...OB),[lx,ly]=P(...LH0),[yx,yy]=P(...YB);
  ringA(rx,ry,70,46,ap(v,tR,.3)*.9,sm(tR,tR+.5,v));dashed(rx,ry-30,ox,oy+40,eio(sm(tR+.1,tR+.8,v)),1);
  ringA(lx,ly,70,46,ap(v,tL,.3)*.9,sm(tL,tL+.5,v));dashed(lx,ly-30,yx,yy+40,eio(sm(tL+.1,tL+.8,v)),1);});
// ---------- 0:12 · match cut: "But Jacob crosses his arms, so his right hand comes down on the younger boy's head" ----------
S(12.05,17.25,(v)=>{const u=eio(sm(12.05,17.25,v));const z=lerp(.82,.95,u),cxI=lerp(688,760,u);warm(960,560,820,.8);bed('02_crossing',v,z,cxI);
  const tRH=C('so his right hand comes',13)+.25,tYg=C('younger boys head',15),tHd=CE('younger boys head',15);
  if(v>tYg){const [yx,yy]=P(980,420);warm(yx,yy,420,1.3*sm(tYg,tYg+.6,v));}
  kin('Jacob *crosses* his arms.','jacob crosses his arms',11,960,92,84,v);
  tagAt('FIRSTBORN',330,560,330,330,1,false);tagAt('YOUNGER',1610,560,1010,380,1+.2*sm(tYg,tYg+.4,v),true);
  // the two expected (dashed) paths swing into a gold X along his forearms
  const sw=eio(sm(12.1,12.8,v));const [r0x,r0y]=P(...RH0),[o0x,o0y]=P(...OB),[l0x,l0y]=P(...LH0),[y0x,y0y]=P(...YB);
  const [ra,rb]=[P(636,338),P(872,250)],[la,lb]=[P(806,322),P(548,206)];
  if(sw<1){dashed(r0x,r0y-30,o0x,o0y+40,1,1-sw);dashed(l0x,l0y-30,y0x,y0y+40,1,1-sw);}
  gline(lerp(r0x,ra[0],sw),lerp(r0y,ra[1],sw),lerp(o0x,rb[0],sw),lerp(o0y,rb[1],sw),1,sw*(.85+.15*sm(tRH,tRH+.4,v)),7+3*sm(tRH,tRH+.4,v));
  gline(lerp(l0x,la[0],sw),lerp(l0y,la[1],sw),lerp(y0x,lb[0],sw),lerp(y0y,lb[1],sw),1,sw*.7*(1-.4*sm(tRH,tRH+.4,v)),6);
  const [hx,hy]=P(872,248);ringA(hx,hy,110,72,ap(v,tHd-.2,.3),sm(tHd-.2,tHd+.4,v));});
// ---------- 0:17 · "The boys' father, Jacob's own son," ----------
S(17.25,19.9,(v)=>{pic('b_joseph',v,17.25,20,{side:'R',tx:1400,fx:735/1376,z:.72,push:.05,drift:-70,fade:false});bokeh(v,1,7,6);const [hx,hy]=P(200,230);orb(hx,hy,170,.4*ap(v,17.4,.4)*(.8+.2*Math.sin(v*3)));
  cap('THE BOYS’ FATHER',560,300,60,ap(v,vFather,.3),true);kin('Jacob’s own son','jacobs own son',18,560,410,70,v);});
// ---------- 0:20 · insert: "grabs his hand to move it" ----------
S(19.9,21.65,(v)=>{const t=sm(19.9,21.65,v),mv=eio(sm(C('to move it',20),C('to move it',20)+.8,v));const s=H/768*1.04*(1+.04*t);const [ox,oy]=at(688,384,960-40*mv,540,s);draw('00b_grip',ox,oy,s);
  orb(P(840,330)[0],P(840,330)[1],260,.25);bokeh(v,1,43,6);X.save();const g=X.createRadialGradient(960,540,420,960,540,1100);g.addColorStop(0,'rgba(5,4,3,0)');g.addColorStop(1,'rgba(5,4,3,.85)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();});
// ---------- 0:21 · "Not so, father, this one is the firstborn" ----------
S(21.65,24.9,(v)=>{const z=lerp(1.25,1.33,eio(sm(21.65,24.9,v)));const s=H/768*z;const [ox,oy]=at(735,185,1450,400,s);warm(1450,420,700,1);draw('b_joseph',ox,oy,s);blackL(640,1000);bokeh(v,1,47,6);
  vSide(ap(v,vNotSo-.05,.3),560,'GENESIS 48:18','לֹא־כֵן אָבִי כִּי־זֶה הַבְּכֹר',['הַבְּכֹר'],[[['“Not so, father,',0]],[['this one is the ',0],['firstborn',1],['.”',0]]],{cy:540,hs:100,es:66});});
// ---------- 0:25 · "and Jacob says, 'I know, my son, I know'" ----------
S(24.9,28.75,(v)=>{const k2=C('i know',27);const z=1.04+.06*eio(sm(24.9,28.75,v))+.06*eio(sm(k2,k2+1,v));pic('03_jacob_closeup',v,24.9,28.8,{side:'L',tx:420,z,push:0});
  rays(120,-40,.95,1250,.5,.6+.8*sm(vIK0,vIK0+.8,v),v);warm(380,420,500,sm(vIK0,vIK0+1,v));
  vSide(ap(v,vIK0-.1,.3),1380,'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son,',0]],[['I know',1],['.”',0]]],{hs:110,es:70});});
// ---------- 0:29–0:40 · the ladder builds across three paintings ----------
const LAD=()=>[['CAIN','ABEL',C('from the first two brothers',33)+.3],['ISHMAEL','ISAAC',C('isaac',31)+.1],['ESAU','JACOB',vJYB+.2]];
const LADo=()=>({hY:C('a younger brother himself',28)+.2,hF:C('over the firstborn',35)+.35,dim:C('passing over',35),glow:C('and choosing the younger',37)+.3});
S(28.75,31.05,(v)=>{pic('c_twins',v,28.6,31.2,{side:'L',tx:540,z:.86,ty:590,push:.06,par:[-40,50],pz:[0,.05]});bokeh(v,1,13,6);
  const tP=C('a younger brother',28)+.3;const [ex,ey]=P(367,380),[jx,jy]=P(829,380);dimAt(ex,ey,330,.8*sm(tP,tP+.6,v));warm(jx,jy,360,sm(tP,tP+.6,v));
  ladder(v,1450,540,LAD(),LADo());});
S(31.05,33.35,(v)=>{pic('11_isaac_ishmael',v,30.9,33.5,{side:'L',tx:430,z:.82,ty:560,push:.07,par:[-30,40],pz:[0,.05]});bokeh(v,1,37,6);
  const tP=C('isaac',31)+.1;const [ix,iy]=P(440,380),[sx,sy]=P(957,500);dimAt(ix,iy,320,.8*sm(tP,tP+.6,v));warm(sx,sy,300,sm(tP,tP+.6,v));
  ladder(v,1450,540,LAD(),LADo());});
S(33.35,39.65,(v)=>{pic('05_cain_abel',v,33.2,39.8,{side:'L',tx:520,z:.78,push:.08,par:[40,-40],pz:[.03,0]});bokeh(v,1,17,6);
  const tP=C('from the first two brothers',33)+.6;const [cx0,cy0]=P(170,380),[ax,ay]=P(809,380);dimAt(cx0,cy0,320,.8*sm(tP,tP+.6,v));warm(ax,ay,340,sm(tP,tP+.6,v));
  ladder(v,1450,560,LAD(),LADo());});
// ---------- 0:40 · "and three times an older brother wants him dead" : three faces ----------
function panel(k,sx,sy,sw,sh,dx,dy,dw,dh,rev,a){if(a<=.003||rev<=0)return;const im=IMG[k];X.save();X.globalAlpha*=a;X.beginPath();const hh=dh*eio(rev);X.rect(dx,dy+(dh-hh)/2,dw,hh);X.clip();X.drawImage(im,sx,sy,sw,sh,dx,dy,dw,dh);
  const f=(x0,y0,x1,y1)=>{const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');return g;};
  X.fillStyle=f(dx,0,dx+90,0);X.fillRect(dx,dy,90,dh);X.fillStyle=f(dx+dw,0,dx+dw-90,0);X.fillRect(dx+dw-90,dy,90,dh);X.fillStyle=f(0,dy+dh,0,dy+dh-140);X.fillRect(dx,dy+dh-140,dw,140);X.fillStyle=f(0,dy,0,dy+60);X.fillRect(dx,dy,dw,60);X.restore();
  if(rev<1){X.save();X.globalCompositeOperation='lighter';X.globalAlpha=(1-rev)*.8;X.fillStyle='rgba(255,214,150,.7)';X.fillRect(dx+20,dy+dh/2-1.5,dw-40,3);X.restore();}}
S(39.65,43.05,(v)=>{BGd();glow(960,480,900,.2);bokeh(v,1,19,7);const tD=C('wants him dead',41)+.5;const g=1+.03*eio(sm(tD,tD+1,v));X.save();X.translate(960,470);X.scale(g,g);X.translate(-960,-470);
  const t1=vThree+.05,t2=C('an older',40),t3=C('older brother wants',40)+.3;
  panel('f_cain_rises',170,20,400,560,250,170,400,560,sm(t1,t1+.25,v),1);panel('21_esau_plan',450,10,400,560,690,170,400,560,sm(t2,t2+.25,v),1);panel('27_brothers_hate',430,70,560,560,1130,170,540,560,sm(t3,t3+.25,v),1);
  X.restore();cap('THREE TIMES',960,108,64,ap(v,vThree,.3),false,'12px');
  kin('an older brother|wants him *dead*.','an older brother wants',39,960,860,66,v);});
// ---------- 0:43 · "Genesis never says why, and the reason only comes centuries later" : a timeline that ends in a flame ----------
const FL=[1700,600];
S(43.05,47.35,(v)=>{BGd();glow(960,500,800,.2);motes(v,.8,200,100,1520,880);bokeh(v,1,23,8);
  kin('Genesis never says *why*.','genesis never says why',42,960,380,96,v);
  cap('GENESIS',300,530,48,1,false,'9px');const tR=C('and the reason',44),tL=CE('centuries later',45);const p=eio(sm(tR,tL,v));const x=lerp(240,FL[0],p);
  ink([[240,FL[1]],[x,FL[1]]],1,1,{w:5});for(let i=0;i<9;i++){const tx=240+i*(FL[0]-240)/9;if(tx<x){X.save();X.globalAlpha=.6;X.fillStyle=GOLD;X.fillRect(tx-1,FL[1]-12,2,24);X.restore();}}
  if(p>0&&p<1){orb(x,FL[1],60,.7);embers(v,.6,[[x,FL[1]]],4);}
  kin('centuries later','centuries later',45,Math.min(x-40,1480),FL[1]+90,64,v);
  const fl=sm(tL-.1,tL+.4,v);if(fl>0){embers(v,fl,[FL],9);orb(FL[0],FL[1]-20,120*fl,.9*fl);}});
// ---------- 0:47 · "before a battle where 300 men surround an army, and not one of them is holding a sword" ----------
S(47.35,53.25,(v)=>{const u=eio(sm(47.35,53.25,v));const s=1.285*(1+.1*u);const [ox,oy]=at(1041,237,FL[0],FL[1],s);draw('d_300',ox,oy,s);blackL(560,1000);
  X.save();const g=X.createLinearGradient(0,oy-40,0,oy+140);g.addColorStop(0,'rgba(5,4,3,1)');g.addColorStop(1,'rgba(5,4,3,0)');X.fillStyle=g;X.fillRect(0,0,W,oy+140);X.restore();
  embers(v,1,[[1041,237],[1152,232],[1209,248],[1272,247],[1324,254]].map(([x,y])=>P(x,y)));bokeh(v,1,53,6);
  const t3=C('300 men',48),tS=C('surround an army',49),tN=C('and not one of them',50),tH=C('is holding a sword',51)+.2;
  // a ring of torch points draws itself around the camp
  const rp=sm(tS,tS+.9,v);if(rp>0){X.save();X.globalCompositeOperation='lighter';for(let i=0;i<48;i++){const q=i/48;if(q>rp)break;const an=q*Math.PI*2-Math.PI/2;const [px,py]=P(720+360*Math.cos(an),470+92*Math.sin(an));const fl=.7+.3*Math.sin(v*9+i*1.7);
    X.fillStyle=`rgba(255,214,140,${.9*fl})`;X.beginPath();X.arc(px,py,4.2,0,7);X.fill();orb(px,py,16,.35*fl);}X.restore();}
  bigNum('300',440,330,ap(v,t3,.3),220);
  if(v<tN-.1)kin('men surround|an army','men surround an army',48,440,600,70,v);
  else kin('not one of them|is holding a *sword*.','not one of them is holding',50,440,600,66,v);
  const [hx,hy]=P(1052,300);ringA(hx,hy,90,120,ap(v,tH,.3),sm(tH,tH+.6,v));});
// ---------- 0:53 · "The first younger brother doesn't survive. God accepts Abel's offering" ----------
S(53.25,57.25,(v)=>{const u=eio(sm(53.25,57.25,v));const s=1.5*(1+.06*u);const [ox,oy]=at(900,420,1240,600,s);draw('e_offering',ox,oy,s);blackL(640,900);
  const tA=C('god accepts',55);const [rx,ry]=P(930,-40);rays(rx,ry,1.92,1000,.35,1.2+.6*sm(tA,tA+.6,v),v,6);bokeh(v,1,29,6);
  if(v<tA-.1){kin('The first *younger*|brother','the first younger brother',52,480,430,84,v);kin('doesn’t survive.','doesnt survive',53,480,610,66,v);}
  else kin('God accepts|*Abel’s* offering','god accepts abels offering',55,480,500,84,v);});
// ---------- 0:57 · "instead of Cain's, so out in the field" : the reveal of Cain ----------
S(57.25,60.15,(v)=>{const u=eio(sm(57.25,60.15,v));const s=1.42*(1+.07*u);const [ox,oy]=at(372,260,560+12*u,470,s);draw('e_offering',ox,oy,s);blackR(860,1090);dimAt(560,300,900,.25);bokeh(v,1,59,5);
  kin('instead of *Cain’s*','instead of cains',56,1400,470,84,v);kin('out in the field','out in the field',58,1400,620,64,v);});
// ---------- 1:00 · "Cain rises up against his little brother and kills him" (Genesis 4:8) ----------
S(60.15,63.45,(v)=>{const tR=C('cain rises up',59),tK=C('and kills him',61);const tilt=eio(sm(tR,tR+.9,v));
  pic('f_cain_rises',v,60.15,63.6,{side:'L',tx:600,fx:.5,z:.98,push:.06,fade:860,ty:lerp(330,560,tilt),par:[30,-10],pz:[.05,0]});bokeh(v,1,31,5);
  const [ax,ay]=P(890,520);dimAt(ax,ay,330,.95*sm(tK,tK+.8,v));
  verse2(ap(v,tR-.05,.3),1490,520,'GENESIS 4:8',['וַיָּקָם קַיִן אֶל־הֶבֶל','אָחִיו וַיַּהַרְגֵהוּ'],['וַיַּהַרְגֵהוּ'],[[['“Cain rose up against Abel',0]],[['his brother, and ',0],['killed him',1],['.”',0]]],{hs:84,es:54});});
// ---------- 1:03 · "But God keeps choosing the younger anyway. Isaac is picked over his older brother Ishmael" ----------
S(63.45,69.3,(v)=>{const tO=C('his older brother ishmael',66);const q=eio(sm(tO-.1,tO+1,v));
  const sA=H/768*1.3,sB=H/768*.82;const [aox,aoy]=at(957,480,640,600,sA);const bm=META['11_isaac_ishmael'];const box=440-bm.cx*1376*sB,boy=560-.5*768*sB;
  const s=lerp(sA,sB,q),ox=lerp(aox,box,q),oy=lerp(aoy,boy,q);warm(lerp(640,820,q),560,620,1);draw('11_isaac_ishmael',ox,oy,s);bokeh(v,1,37,6);
  const [ix,iy]=P(957,300);rays(ix+40,-60,1.62,820,.25,.9*sm(C('keeps choosing',63),C('keeps choosing',63)+.8,v),v,4);
  kin('God keeps choosing|the *younger*','god keeps choosing the younger',63,1420,470,84,v,{a:1-sm(tO-.2,tO+.2,v)});
  tag('ISAAC',957,293,ap(v,C('isaac is picked',64),.3),true,{up:90});tag('ISHMAEL',440,44,ap(v,C('ishmael',67),.3),false,{y:118});
  if(v>tO)kin('his *older* brother','his older brother',66,1420,520,72,v,{a:sm(tO,tO+.3,v)});});
