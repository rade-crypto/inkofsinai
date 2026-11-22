// ===================== 09 · Why the Bible Keeps Choosing the Younger Brother · first minute =====================
// all cue times are VO seconds (Tomer take, ASR word starts). Video time = VO time + PRE.
const PRE=.4, VEND=63.35, DUR=PRE+VEND+1.4;
const SH=[];const S=(a,b,f)=>SH.push({a,b,f});
const ap=(v,v0,d=.45)=>sm(v0,v0+d,v);
const L2=(p,q,u)=>[p[0]+(q[0]-p[0])*u,p[1]+(q[1]-p[1])*u];
const BGd=()=>{X.fillStyle='#0b0907';X.fillRect(0,0,W,H);};
// ---------- shared drawing bits ----------
function enLine(parts,x,y,size){X.save();X.font=`italic 400 ${size}px Newsreader`;const ws=parts.map(p=>X.measureText(p[0]).width),tot=ws.reduce((a,b)=>a+b,0);let xx=x-tot/2;
  parts.forEach((p,i)=>{X.textAlign='left';X.textBaseline='middle';if(p[1]){X.fillStyle=gg(xx,y-size/2,xx+ws[i],y+size/2);X.shadowColor='rgba(255,200,100,.8)';X.shadowBlur=18;}else{X.fillStyle=IVORY;X.shadowBlur=0;}X.fillText(p[0],xx,y);xx+=ws[i];});X.restore();}
function panelA(ref,hebs,ens,a,o={}){if(a<=.003)return;const cx=o.cx??480,hs=o.hs??70,es=o.es??50;const hgap=hs*1.45,egap=es*1.35;
  const tot=48+hebs.length*hgap+18+ens.length*egap;let y=(o.cy??540)-tot/2;X.save();X.globalAlpha*=a;
  T(ref,cx,y,'400 32px Fraunces',GOLD,1,'center','7px');y+=48+hgap/2;
  hebs.forEach(([s,g])=>{const gm={};(g||[]).forEach(w=>gm[w]=0);heb(s,cx,y,hs,1,{gold:gm,t:9});y+=hgap;});
  y+=18-hgap/2+egap/2;ens.forEach(p=>{enLine(p,cx,y,es);y+=egap;});X.restore();}
function fadeLeft(x0,x1,a=1){if(a<=.003)return;X.save();X.globalAlpha*=a;const g=X.createLinearGradient(x0,0,x1,0);g.addColorStop(0,'rgba(11,9,7,1)');g.addColorStop(1,'rgba(11,9,7,0)');X.fillStyle=g;X.fillRect(0,0,x1,H);X.fillStyle='#0b0907';X.fillRect(0,0,x0,H);X.restore();}
const beam=(x,y0,y1,w,a=.5)=>{if(a<=.003)return;X.save();X.globalCompositeOperation='lighter';const g=X.createLinearGradient(0,y0,0,y1);g.addColorStop(0,`rgba(255,226,160,${a})`);g.addColorStop(1,'rgba(255,226,160,0)');X.fillStyle=g;X.beginPath();X.moveTo(x-w*.35,y0);X.lineTo(x+w*.35,y0);X.lineTo(x+w,y1);X.lineTo(x-w,y1);X.closePath();X.fill();X.restore();};
const orb=(x,y,r,a=1)=>{if(a<=.003)return;X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,236,190,${a})`);g.addColorStop(.35,`rgba(255,206,120,${.6*a})`);g.addColorStop(1,'rgba(255,190,90,0)');X.fillStyle=g;X.fillRect(x-r,y-r,2*r,2*r);X.restore();};
const ringA=(x,y,rx,ry,a,p=1)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;X.globalCompositeOperation='lighter';X.strokeStyle='rgba(255,214,140,.95)';X.lineWidth=5;X.shadowColor='rgba(255,190,90,1)';X.shadowBlur=28;X.beginPath();X.ellipse(x,y,rx,ry,0,-Math.PI/2,-Math.PI/2+Math.PI*2*clamp(p));X.stroke();X.restore();};
const dotArc=(x0,y0,x1,y1,h,a,p=1)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;X.globalCompositeOperation='lighter';X.strokeStyle='rgba(255,214,140,.9)';X.lineWidth=4;X.setLineDash([2,13]);X.lineCap='round';X.shadowColor='rgba(255,190,90,1)';X.shadowBlur=14;X.beginPath();
  const N=40,k=Math.max(1,Math.round(N*clamp(p)));for(let i=0;i<=k;i++){const u=i/N,mx=(x0+x1)/2,my=Math.min(y0,y1)-h;const x=(1-u)*(1-u)*x0+2*(1-u)*u*mx+u*u*x1,y=(1-u)*(1-u)*y0+2*(1-u)*u*my+u*u*y1;i?X.lineTo(x,y):X.moveTo(x,y);}X.stroke();X.restore();};
const lab=(s,x,y,a,c=IVORY,sz=34)=>T(s,x,y,`400 ${sz}px Fraunces`,c,a,'center','6px');
const labG=(s,x,y,a,sz=34)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;X.font=`500 ${sz}px Fraunces`;X.letterSpacing='6px';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gg(x-200,y-sz,x+200,y+sz);X.shadowColor='rgba(255,200,100,.8)';X.shadowBlur=18;X.fillText(s,x,y);X.restore();};
const gline=(y,x0,x1,a=.5)=>pen(0,0,1,a,1,()=>L([[x0,y],[x1,y]]));
// figure drawn in gold line at (x,y) scale s, drawing itself on with p
const fig=(x,y,s,a,p,o,flip)=>pen(x,y,s,a,p,()=>{flip?flipF(o):figure(o);});

// =============== SHOT 1 · 0–28.6 · the crossed hands (Gen 48) ===============
S(0,28.62,(v)=>{BGd();
  const dx=lerp(-330,60,eio(sm(21.1,22.5,v)));
  X.save();X.translate(dx,0);
  glow(1330,600,720,.34+.04*Math.sin(v*.8));motes(v,.8,900,200,900,700);
  const Z=1.45,CX=1330,CY=900;X.save();X.translate(CX,CY);X.scale(Z,Z);X.translate(-CX,-CY);
  gline(900,1020,1640,.5);
  const J=[1200,900],js=1.4,B1=[1326,900],B2=[1420,900],bs=.66;
  // Jacob's hands: in his lap → out to the two heads (right hand = back arm → the younger, farther boy)
  const lapF=[58,-88],lapB=[50,-96],T1=[(B1[0]+4-J[0])/js,(900-bs*292-J[1])/js],T2=[(B2[0]+4-J[0])/js,(900-bs*292-J[1])/js];
  const uB=eio(sm(12.3,14.6,v)),uF=eio(sm(12.6,14.2,v)),lean=.06+.26*Math.max(uB,uF);
  const midB=[66,-176];const hB=uB<.5?L2(lapB,midB,uB*2):L2(midB,T2,(uB-.5)*2);
  const hF=L2(lapF,T1,uF);
  const jg=eio(sm(19.8,20.9,v)),tug=Math.sin(Math.max(0,v-20.9)*5)*Math.exp(-Math.max(0,v-20.9)*1.2)*4*jg;
  // Joseph, standing behind the boys, facing his father
  if(v>17.0){const jx=1500,jsc=1.3,tg=[(jx-(B2[0]+6))/jsc,(900-bs*292+8-900)/jsc];fig(jx,900,jsc,1,sm(17.1,18.2,v),{pose:'stand',beard:'short',gear:'cap',seed:164,lean:.06+.16*jg,armF:L2([26,-168],[tg[0],tg[1]+tug],jg),handF:jg>.6?'grip':'relax',t:v},true);}
  // the two boys, standing before their grandfather
  fig(B2[0],900,bs,1,sm(2.9,4.3,v),{pose:'stand',gear:'hair',seed:163,t:v},true);
  fig(B1[0],900,bs,1,sm(3.0,4.4,v),{pose:'stand',gear:'hair',seed:162,t:v},true);
  // Jacob in his chair
  pen(J[0],J[1],js,1,sm(0,1.6,v),()=>{figure({pose:'chair',seatH:58,beard:'long',gear:'cloth',seed:161,lean,armF:hF,handF:uF>.8?'open':'relax',armB:hB,handB:uB>.8?'open':'relax',t:v});
    X.save();X.globalAlpha*=.8;L([[-40,-58],[40,-58]]);L([[-34,-58],[-34,0]]);L([[34,-58],[34,0]]);L([[-40,-58],[-46,-170]]);X.restore();});
  const scr=p=>[J[0]+js*p[0],J[1]+js*p[1]];
  const rh=scr(hB);
  ringA(rh[0]+4,rh[1]-4,30,26,ap(v,5.6,.35)*(1-sm(11.8,12.2,v)),sm(5.6,6.3,v));
  lab('RIGHT HAND',rh[0]-10,rh[1]+46,ap(v,5.7,.35)*(1-sm(11.8,12.2,v)),GOLD,20);
  lab('FIRSTBORN',B1[0],936,ap(v,6.7,.4),IVORY,19);
  labG('YOUNGER',B2[0]+10,966,ap(v,10.4,.4),19);
  const t2=scr(T2),l0=scr(lapB);dotArc(l0[0],l0[1],t2[0],t2[1],70,ap(v,12.3,.3)*(1-sm(16.6,17.2,v)),sm(12.3,14.6,v));
  ringA(t2[0]+2,t2[1]+2,34,28,ap(v,15.8,.35),sm(15.8,16.5,v));beam(t2[0],400,t2[1]+30,70,.28*ap(v,15.8,.6));
  X.restore();
  X.restore();
  // the verse on the black side (Gen 48:18, then 48:19)
  fadeLeft(560,960,sm(21.1,22.3,v));
  if(v>=21.65&&v<25.9)panelA('GENESIS 48:18',[['לֹא־כֵן אָבִי כִּי־זֶה הַבְּכֹר',['הַבְּכֹר']]],[[['“Not so, father,',0]],[['this one is the ',0],['firstborn',1],['.”',0]]],ap(v,21.65,.35),{cx:470,hs:74});
  if(v>=25.9)panelA('GENESIS 48:19',[['יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי']]],[[['“',0],['I know',1],[', my son, ',0],['I know',1],['…”',0]]],ap(v,25.9,.35),{cx:470,hs:80});
});

// =============== SHOT 2 · 28.6–39.5 · the ledger: born first / chosen ===============
const ROWS=[['CAIN','ABEL',33.7],['ISHMAEL','ISAAC',31.4],['ESAU','JACOB',28.75],['MANASSEH','EPHRAIM',35.5]];
S(28.62,39.55,(v)=>{BGd();glow(960,560,820,.24+.03*Math.sin(v));motes(v,.7,300,150,1300,800);
  const xL=640,xR=1280,y0=330,dy=140;
  const hd=ap(v,28.8,.4);lab('BORN FIRST',xL,y0-110,hd*.8,'rgba(240,228,205,.8)',30);labG('CHOSEN',xR,y0-110,hd,30);
  pen(0,0,1,.4*hd,sm(28.8,29.6,v),()=>{L([[xL-260,y0-70],[xR+260,y0-70]]);L([[960,y0-90],[960,y0+dy*3+60]]);});
  const pass=sm(36.1,36.8,v),choose=sm(38.0,38.7,v);
  ROWS.forEach(([a,b,tv],i)=>{const y=y0+i*dy+20,al=ap(v,tv,.4);if(al<=.003)return;const yy=y+16*(1-eo(al));
    T(a,xL,yy,'500 66px Fraunces',IVORY,al*(1-.6*pass),'center','4px');
    if(pass>0)pen(0,0,1,.55*al*pass,sm(36.1+i*.12,36.7+i*.12,v),()=>{L([[xL-150,yy+4],[xL+150,yy+4]]);});
    T(b,xR,yy,'500 66px Fraunces',IVORY,al*(1-choose),'center','4px');if(choose>0)labG(b,xR,yy,al*choose,66);
    if(choose>0)orb(xR,yy,150,.22*choose*al);});
});

// =============== SHOT 3 · 39.5–43.25 · three times, an older brother wants him dead ===============
S(39.55,43.25,(v)=>{BGd();glow(960,600,900,.22);gline(860,140,1780,.45);
  const P=[[400,39.7,'CAIN','ABEL',1],[940,40.5,'ESAU','JACOB',1],[1480,41.3,'HIS BROTHERS','JOSEPH',3]];
  P.forEach(([x,tv,a,b,n],i)=>{const al=ap(v,tv,.4);if(al<=.003)return;const loom=eio(sm(41.6,42.4,v));
    beam(x+(n>1?130:70),0,800,90,.22*al);
    const yx=x+(n>1?140:80);fig(yx,860,.95,al,1,{pose:'stand',gear:'hair',seed:300+i,t:v},true); // the younger, facing his brother
    for(let k=0;k<n;k++)fig(x-60-k*46,860-k*6,1.08-k*.06,al*(1-.25*k),1,{pose:'stand',beard:'short',gear:'cloth',seed:310+i*5+k,lean:.06+.14*loom,armF:[60+40*loom,-150-30*loom],handF:'grip',t:v});
    lab(a,x-60-(n-1)*23-(n>1?40:0),930,al,IVORY,30);labG(b,yx,930,al,30);});
  const tt=ap(v,39.65,.35);T('THREE TIMES',960,170,'500 64px Fraunces',IVORY,tt,'center','8px');
});

// =============== SHOT 4a · 43.25–47.3 · Genesis never says why ===============
S(43.25,47.35,(v)=>{BGd();glow(960,540,700,.26+.04*Math.sin(v*1.3));motes(v,.8,200,100,1500,880);
  const a1=ap(v,43.3,.4);
  X.save();X.globalAlpha*=a1;enLine([['Genesis never says ',0],['why',1],['.',0]],960,470,86);X.restore();
  T('The reason only comes centuries later.',960,610,'italic 400 54px Newsreader',IVORY,ap(v,44.9,.4),'center');
});

// =============== SHOT 4b · 47.3–50.65 · a camp in the valley, and 300 lights around it ===============
const CAMP=(()=>{const r=rng(907),o=[];for(let i=0;i<46;i++){const an=r()*Math.PI*2,rr=Math.sqrt(r());o.push([960+Math.cos(an)*560*rr,760+Math.sin(an)*95*rr,.08+r()*.05]);}return o.sort((p,q)=>p[1]-q[1]);})();
const RINGL=(()=>{const r=rng(911),o=[];for(let i=0;i<120;i++){const an=i/120*Math.PI*2+r()*.03;o.push([960+Math.cos(an)*(700+r()*30),760+Math.sin(an)*(150+r()*14),r()]);}return o;})();
function campScene(v,lights){starsF(v,.8);moonF(1560,190,46,.85);
  pen(W/2,520,1,1,1,()=>{hills(1,{y:240,seed:3});});
  CAMP.forEach(([x,y,s],i)=>{const w=560*s,h=420*s;X.save();X.beginPath();X.moveTo(x-w/2,y);X.lineTo(x,y-h);X.lineTo(x+w/2,y);X.closePath();X.fillStyle='#120d08';X.fill();X.strokeStyle='rgba(217,180,106,.55)';X.lineWidth=1.4;X.stroke();X.beginPath();X.moveTo(x,y-h);X.lineTo(x+w*.08,y);X.stroke();X.restore();orb(x+w*.6,y-4,14,.22+.08*Math.sin(v*3+i));});
  if(lights>0)RINGL.forEach(([x,y,r],i)=>{const a=sm(i/120,i/120+.05,lights);if(a<=.003)return;const fl=.75+.25*Math.sin(v*9+i*1.7);orb(x,y,22,.75*a*fl);X.save();X.fillStyle=`rgba(255,236,190,${a})`;X.fillRect(x-1.5,y-1.5,3,3);X.restore();});}
S(47.35,50.65,(v)=>{BGd();const z=1+.03*sm(47.35,50.65,v);X.save();X.translate(W/2,H/2);X.scale(z,z);X.translate(-W/2,-H/2);campScene(v,sm(48.45,49.9,v));X.restore();
  lab('300 MEN',960,960,ap(v,48.5,.4),GOLD,40);});

// =============== SHOT 4c · 50.65–52.95 · not one of them holding a sword ===============
S(50.65,52.95,(v)=>{BGd();glow(1240,520,620,.3);starsF(v,.5);gline(900,860,1700,.5);
  const x=1240,y=900,s=1.6;
  fig(x,y,s,1,1,{pose:'stand',beard:'short',gear:'cap',seed:420,armF:[64,-250],handF:'grip',armB:[-40,-246],handB:'grip',t:v});
  // a torch in the left hand (front arm, raised) and a shofar in the right
  torchF(v,x+64*s,y-262*s,1.1,1);
  pen(x-40*s,y-246*s,s,1,1,()=>{X.save();X.lineWidth=3;Q([0,0],[-30,-20],[-46,-58]);Q([8,-4],[-22,-30],[-34,-62]);L([[-46,-58],[-34,-62]]);X.restore();});
  fadeLeft(520,900,1);
  T('Not one of them',470,480,'italic 400 64px Newsreader',IVORY,ap(v,50.85,.35),'center');
  X.save();X.globalAlpha*=ap(v,51.5,.35);enLine([['is holding a ',0],['sword',1],['.',0]],470,580,64);X.restore();
});

// =============== SHOT 5 · 52.95–58.55 · two offerings ===============
S(52.95,58.55,(v)=>{BGd();glow(960,620,760,.26);gline(900,300,1620,.5);
  // Cain, the older, with grain; Abel, the younger, with a lamb
  fig(700,900,1.25,1,sm(53.0,54.2,v),{pose:'kneel',beard:'short',gear:'cloth',seed:91,armF:[96,-96],handF:'grip',armB:[86,-88],handB:'grip',t:v});
  pen(700+120*1.25,900-110*1.25,1.25,1,sm(53.2,54.2,v),()=>{for(let k=-4;k<=4;k++)L([[k*5,40],[k*12,-60]]);L([[-26,4],[26,4]]);});
  pen(1150,900,.95,1,sm(53.4,54.4,v),()=>sheepR({t:v,seed:3}));
  fig(1300,900,1.25,1,sm(53.4,54.6,v),{pose:'kneel',beard:'short',gear:'hair',seed:92,armF:[110,-76],handF:'open',t:v},true);
  lab('CAIN',700,980,ap(v,53.5,.4),IVORY,32);labG('ABEL',1300,980,ap(v,53.6,.4),32);
  T('the older',700,1030,'italic 400 34px Newsreader',IVORY,ap(v,53.5,.4)*.8,'center');T('the younger',1300,1030,'italic 400 34px Newsreader',IVORY,ap(v,53.6,.4)*.8,'center');
  // God accepts Abel's offering
  const acc=ap(v,56.0,.7);beam(1220,0,840,210,.34*acc);orb(1180,760,90,.5*acc);
  X.save();X.globalAlpha*=1-.45*sm(57.3,58.0,v);X.restore();
});

// =============== SHOT 6 · 58.55–end · out in the field ===============
S(58.55,99,(v)=>{BGd();glow(1000,640,760,.22);
  pen(W/2,660,1,.8,1,()=>{wheatF(v,.5,{seed:31,n:60});});gline(900,200,1720,.55);
  const rise=sm(60.2,60.9,v),strike=eio(sm(62.2,62.8,v)),fall=sm(62.5,63.6,v);
  // Abel (younger), lit; his light goes out as he falls
  beam(1180,0,860,160,.3*(1-fall));orb(1180,700,70,.35*(1-fall));
  fig(1180,900,1.3,1-.55*fall,1,{pose:'prost',k:fall,beard:'short',gear:'hair',seed:92,t:v},true);
  // Cain rises up against him
  if(rise<1)fig(820,900,1.3,1-rise,1,{pose:'kneel',beard:'short',gear:'cloth',seed:91,t:v});
  if(rise>0)fig(lerp(820,940,eio(rise)),900,1.3,rise,1,{pose:'stand',beard:'short',gear:'cloth',seed:91,lean:.08+.2*strike,armF:L2([40,-160],[150,-210],strike),handF:'grip',t:v});
  lab('CAIN',880,980,ap(v,60.25,.4),IVORY,32);
});

// ---------- render ----------
let GR=[],VIG;
function drawAt(t){const v=t-PRE;X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.shadowBlur=0;X.setLineDash([]);
  BGd();for(const s of SH){if(v<s.a||v>=s.b)continue;X.save();LIGHT=[.55,-.83];LIGHTPOS=null;try{s.f(Math.max(0,v));}catch(e){console.error('shot',s.a,e.message);}X.restore();}}
window.renderFrame=t=>{drawAt(t);X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;if(VIG)X.drawImage(VIG,0,0);if(GR.length)X.drawImage(GR[Math.floor(t*24)%3],0,0);};
Promise.all(['500 40px "Frank Ruhl Libre"','400 30px Fraunces','500 30px Fraunces','italic 400 40px Newsreader'].map(f=>document.fonts.load(f,'אב Ab'))).then(()=>{
  for(let k=0;k<3;k++){const [g,gx]=mk(W,H);const r=rng(9+k);gx.globalAlpha=.04;for(let i=0;i<2200;i++){gx.fillStyle=r()<.5?'#000':'#fff';gx.fillRect(r()*W,r()*H,1+r()*1.6,1+r()*1.6);}GR.push(g);}
  const [vv,vx]=mk(W,H);const vg=vx.createRadialGradient(W/2,H/2,H*.42,W/2,H/2,W*.66);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');vx.fillStyle=vg;vx.fillRect(0,0,W,H);VIG=vv;
  window.READY=true;});
window.DUR=DUR;
