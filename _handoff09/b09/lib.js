// Long-form 04 · first minute · gold line animation (the trick with the goat and the garment)
const W=1920,H=1080,c=document.getElementById('c');let X=c.getContext('2d');
const IVORY='#efe6d4',GOLD='#d9b46a',GL='#f6dc98';
const clamp=v=>Math.max(0,Math.min(1,v)),sm=(a,b,t)=>{const x=clamp((t-a)/(b-a));return x*x*(3-2*x)},eio=x=>{x=clamp(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2},eo=x=>1-Math.pow(1-clamp(x),3),lerp=(a,b,k)=>a+(b-a)*k;
const win=(t,a,b,fi=.5,fo=.5)=>Math.min(sm(a,a+fi,t),1-sm(b-fo,b,t));
const gg=(x0,y0,x1,y1)=>{const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'#a8741f');g.addColorStop(.35,'#f6dc98');g.addColorStop(.55,'#c9952f');g.addColorStop(1,'#f0cf7c');return g;};
function rng(s){return()=>{s=(s*16807)%2147483647;return s/2147483647;};}
const mk=(w,h)=>{const o=document.createElement('canvas');o.width=w;o.height=h;return [o,o.getContext('2d')];};
function T(s,x,y,font,col,a,al='center',ls='0px'){if(a<=0.003)return;const g0=X.globalAlpha;X.save();X.globalAlpha=clamp(a)*g0;X.font=font;X.letterSpacing=ls;X.fillStyle=col;X.textAlign=al;X.textBaseline='middle';X.fillText(s,x,y);X.restore();}
function GNF(g,w){const n=w.normalize('NFC');for(const k in g)if(k.normalize('NFC')===n)return g[k];}
function heb(s,x,y,size,a,o={}){if(a<=0.003)return;const g0=X.globalAlpha;X.save();X.font=`500 ${size}px "Frank Ruhl Libre"`;X.direction='rtl';X.textAlign='right';X.textBaseline='middle';const ws=s.split(' '),sp=X.measureText(' ').width*1.1;
  const wd=ws.map(w=>X.measureText(w).width),tot=wd.reduce((p,q)=>p+q,0)+sp*(ws.length-1);let xr=x+tot/2;
  ws.forEach((w,i)=>{const st=o.step??.22,wa=o.t0!==undefined?sm(o.t0+i*st,o.t0+i*st+.35,o.t):1;const gt=o.gold?(o.gold[w]??GNF(o.gold,w)):undefined,gk=gt!==undefined?sm(gt,gt+.4,o.t):0;
    X.globalAlpha=clamp(a*wa*(1-gk))*g0;X.fillStyle=IVORY;X.fillText(w,xr,y);if(gk>0){X.globalAlpha=clamp(a*wa*gk)*g0;X.fillStyle=gg(xr-wd[i],y-size/2,xr,y+size/2);X.shadowColor='rgba(240,180,80,.7)';X.shadowBlur=16;X.fillText(w,xr,y);X.shadowBlur=0;}xr-=wd[i]+sp;});X.restore();}
const ref=(s,x,y,a,size=28)=>0&&T(s,x,y,`300 ${size}px Fraunces`,GOLD,a,'center','5px');
const lab=(s,x,y,a,size=28,col=IVORY)=>T(s,x,y,`300 ${size}px Fraunces`,col,a,'center','8px');
const gloss=(s,x,y,a,size=38)=>T(s,x,y,`italic 400 ${Math.round(size*1.18)}px Newsreader`,IVORY,Math.min(1,a*1.08),'center');
function glow(x,y,r,a){if(a<=0)return;X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,220,160,${.75*a})`);g.addColorStop(.3,`rgba(240,175,85,${.32*a})`);g.addColorStop(1,'rgba(240,175,85,0)');X.fillStyle=g;X.fillRect(x-r,y-r,2*r,2*r);X.restore();}
// pen: a gold line drawing that draws itself on (p 0→1) — everything below is drawn through it
function pen(x,y,s,a,p,fn,...args){if(a<=0.003||p<=0)return;const g0=X.globalAlpha;X.save();X.globalAlpha=clamp(a)*g0;X.translate(x,y);X.scale(s,s);X.lineWidth=2.6/s;X.lineCap='round';X.lineJoin='round';X.strokeStyle=gg(-160,-160,160,160);
  X.shadowColor='rgba(240,180,80,.65)';X.shadowBlur=12;if(p<1)X.setLineDash([2200*p,2200]);fn(...args);X.restore();}
const L=(pts)=>{X.beginPath();pts.forEach((p,i)=>i?X.lineTo(p[0],p[1]):X.moveTo(p[0],p[1]));X.stroke();};
const Q=(a,b,c2)=>{X.beginPath();X.moveTo(...a);X.quadraticCurveTo(...b,...c2);X.stroke();};
const C=(x,y,r,a0=0,a1=Math.PI*2)=>{X.beginPath();X.arc(x,y,r,a0,a1);X.stroke();};
const fillI=(f,a=1)=>{X.save();X.globalAlpha*=a;X.fillStyle=f;X.fill();X.restore();};

// ---------- pieces ----------
function tent(){L([[-520,240],[-430,-120],[0,-300],[430,-120],[520,240]]);L([[0,-300],[0,240]]);X.save();X.globalAlpha*=.45;[-300,-150,150,300].forEach(dx=>Q([dx*.2,-300+Math.abs(dx)*.5],[dx*.7,-40],[dx,240]));X.restore();L([[-560,240],[560,240]]);}
function flap(open){Q([380,-150],[380+60*open,40],[300+240*open,240]);Q([300,-150],[300+20*open,60],[230+60*open,240]);}
function lampPiece(t){X.beginPath();X.moveTo(-46,0);X.quadraticCurveTo(0,30,46,0);X.quadraticCurveTo(30,-14,0,-14);X.quadraticCurveTo(-30,-14,-46,0);X.stroke();L([[38,-6],[58,-16]]);L([[0,24],[0,60]]);L([[-24,60],[24,60]]);}
function flame(t,x,y,s,a){if(a<=0)return;const f=1+.03*Math.sin(t*2.1)+.02*Math.sin(t*3.7+1),sw=3*Math.sin(t*1.9);const g0f=X.globalAlpha;X.save();X.globalAlpha=clamp(a)*g0f;X.translate(x,y);X.scale(s,s*f);
  const g=X.createLinearGradient(0,-60,0,6);g.addColorStop(0,'rgba(255,240,200,0)');g.addColorStop(.35,'rgba(255,214,140,.95)');g.addColorStop(1,'rgba(240,150,60,.9)');X.fillStyle=g;
  X.beginPath();X.moveTo(0,6);X.quadraticCurveTo(-16,-12,sw,-58);X.quadraticCurveTo(16,-14,0,6);X.fill();X.restore();glow(x,y-20*s,180*s,a*.9*(1+.05*Math.sin(t*1.3)));}
// a figure: head, robe; options: beard, sit, bend, arm reach (0..1 toward target), staff, hood/veil
function goat(){X.beginPath();X.moveTo(70,-8);X.quadraticCurveTo(20,-34,-50,-26);X.quadraticCurveTo(-82,-22,-84,4);X.quadraticCurveTo(-82,24,-60,30);X.lineTo(52,30);X.quadraticCurveTo(70,22,70,-8);
  X.moveTo(70,-8);X.quadraticCurveTo(78,-40,90,-56);X.quadraticCurveTo(104,-60,116,-44);X.quadraticCurveTo(124,-34,118,-28);X.quadraticCurveTo(106,-26,96,-32);X.quadraticCurveTo(88,-22,80,-6);X.stroke();
  Q([92,-58],[78,-98],[52,-92]);Q([52,-92],[66,-86],[76,-62]);Q([110,-28],[110,-12],[102,-4]);[[48,30,52,96],[30,30,30,96],[-44,30,-50,96],[-62,26,-70,96]].forEach(([p,q,r,u])=>L([[p,q],[r,u]]));}
function goatWalk(t){X.save();goat();X.restore();}
function coatP(){const P=new Path2D();P.moveTo(-26,-104);P.lineTo(-66,-98);P.lineTo(-150,-34);P.lineTo(-128,-10);P.lineTo(-70,-50);P.lineTo(-78,120);P.lineTo(78,120);P.lineTo(70,-50);P.lineTo(128,-10);P.lineTo(150,-34);P.lineTo(66,-98);P.lineTo(26,-104);P.quadraticCurveTo(0,-74,-26,-104);return P;}
function coat(blood=0){const P=coatP();X.save();X.fillStyle='rgba(20,14,8,.5)';X.fill(P);X.restore();X.stroke(P);X.save();X.clip(P);X.globalAlpha*=.55;[-48,-24,0,24,48].forEach(sx=>L([[sx,-80],[sx*1.08,122]]));X.restore();
  if(blood>0){X.save();X.clip(P);X.setLineDash([]);X.shadowBlur=0;const g=X.createRadialGradient(10,40,0,10,40,140*blood);g.addColorStop(0,'rgba(150,24,14,.92)');g.addColorStop(.7,'rgba(120,16,10,.55)');g.addColorStop(1,'rgba(110,14,10,0)');X.fillStyle=g;X.fillRect(-160,-120,320,250);X.restore();}}
// big hands for the close-up
function oldHand(){X.beginPath();X.moveTo(-260,-30);X.quadraticCurveTo(-120,-60,-20,-50);X.quadraticCurveTo(40,-48,70,-36);X.quadraticCurveTo(110,-30,120,-14);X.quadraticCurveTo(100,-6,60,-10);
  X.quadraticCurveTo(90,4,96,18);X.quadraticCurveTo(80,24,50,14);X.quadraticCurveTo(70,30,64,40);X.quadraticCurveTo(40,40,20,26);X.quadraticCurveTo(-60,40,-120,30);X.quadraticCurveTo(-200,26,-260,30);X.stroke();
  X.save();X.globalAlpha*=.5;Q([-40,-30],[0,-20],[40,-24]);Q([-30,-6],[0,0],[30,-2]);X.restore();}
function arm(hair,peel){X.beginPath();X.moveTo(260,-60);X.quadraticCurveTo(80,-70,-60,-56);X.quadraticCurveTo(-130,-50,-150,-20);X.quadraticCurveTo(-160,20,-120,46);X.quadraticCurveTo(-40,60,80,56);X.quadraticCurveTo(180,54,260,60);X.stroke();
  [-150,-120,-90].forEach((fx,k)=>Q([fx+10,-10+k*18],[fx-40,-6+k*18],[fx-56,10+k*18]));
  if(hair>0){const r=rng(13);X.save();X.globalAlpha*=hair;X.lineWidth*=.7;for(let i=0;i<120;i++){const px=lerp(-120,250,r()),py=lerp(-50,50,r());if(px<lerp(-130,260,peel))continue;const ang=-.8+r()*.5;L([[px,py],[px+16*Math.cos(ang),py+16*Math.sin(ang)]]);}X.restore();
    if(peel>0&&peel<1){const ex=lerp(-130,260,peel);X.save();X.globalAlpha*=hair;Q([ex,-58],[ex+30,0],[ex,58]);X.restore();}}}
function head(){C(0,0,70);Q([40,-30],[60,0],[44,30]);X.save();X.globalAlpha*=.8;Q([30,10],[46,14],[52,8]);X.restore();Q([-60,-40],[0,-110],[70,-30]);}
function waves(t,a){for(let k=0;k<4;k++){const ph=((t*.9+k*.25)%1);X.save();X.globalAlpha*=a*(1-ph);C(0,0,60+ph*180,-.6,.6);X.restore();}}

// ---------- character rig v4: one-piece silhouettes, rim-lit by the scene's light ----------
const INK='#120d08';
const rot=(a,[x,y])=>[x*Math.cos(a)-y*Math.sin(a),x*Math.sin(a)+y*Math.cos(a)];
const add=([a,b],[c,d])=>[a+c,b+d],sub=([a,b],[c,d])=>[a-c,b-d],mul=([a,b],k)=>[a*k,b*k],nrm=([a,b])=>{const d=Math.hypot(a,b)||1;return [a/d,b/d];};
function smoothP(pts,close=true,P=new Path2D()){const n=pts.length;if(close){P.moveTo((pts[0][0]+pts[1][0])/2,(pts[0][1]+pts[1][1])/2);
    for(let i=1;i<=n;i++){const p=pts[i%n],q=pts[(i+1)%n];P.quadraticCurveTo(p[0],p[1],(p[0]+q[0])/2,(p[1]+q[1])/2);}P.closePath();}
  else{P.moveTo(...pts[0]);for(let i=1;i<n-1;i++){const p=pts[i],q=pts[i+1];P.quadraticCurveTo(p[0],p[1],i===n-2?q[0]:(p[0]+q[0])/2,i===n-2?q[1]:(p[1]+q[1])/2);}if(n===2)P.lineTo(...pts[1]);}return P;}
const xf=(pts,f)=>pts.map(f);
// light: screen-space direction toward the light, or a screen point it comes from
let LIGHT=[.55,-.83],LIGHTPOS=null;
const RIMC=document.createElement('canvas');RIMC.width=W;RIMC.height=H;const RX=RIMC.getContext('2d');
function rimLayer(paths,o={}){if(!paths.length)return;const m=X.getTransform(),sc=Math.hypot(m.a,m.b)||1,inv=m.inverse();
  let lv=LIGHT;if(LIGHTPOS){lv=nrm([LIGHTPOS[0]-m.e,LIGHTPOS[1]-(m.f-150*sc)]);}
  const px=(o.rim||1)*(1.8+1.5*Math.sqrt(sc)),vx=-lv[0]*px,vy=-lv[1]*px,ox=inv.a*vx+inv.c*vy,oy=inv.b*vx+inv.d*vy;
  const bb=o.bb||[-150,-430,250,30];let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;[[bb[0],bb[1]],[bb[2],bb[1]],[bb[0],bb[3]],[bb[2],bb[3]]].forEach(([u,v])=>{const sx=m.a*u+m.c*v+m.e,sy=m.b*u+m.d*v+m.f;x0=Math.min(x0,sx);x1=Math.max(x1,sx);y0=Math.min(y0,sy);y1=Math.max(y1,sy);});
  x0=Math.max(0,Math.floor(x0-24));y0=Math.max(0,Math.floor(y0-24));x1=Math.min(W,Math.ceil(x1+24));y1=Math.min(H,Math.ceil(y1+24));if(x1<=x0||y1<=y0)return;
  const gold=X.strokeStyle;RX.setTransform(1,0,0,1,0,0);RX.globalCompositeOperation='source-over';RX.globalAlpha=1;RX.clearRect(x0,y0,x1-x0,y1-y0);RX.setTransform(m);
  RX.fillStyle=gold;paths.forEach(P=>RX.fill(P));
  RX.globalCompositeOperation='source-atop';RX.save();RX.translate(ox,oy);RX.fillStyle=o.fill||INK;paths.forEach(P=>RX.fill(P));RX.restore();
  RX.globalCompositeOperation='destination-over';RX.globalAlpha=.42;RX.lineWidth=1.7/sc;RX.strokeStyle=gold;RX.lineJoin='round';paths.forEach(P=>RX.stroke(P));
  RX.globalAlpha=1;RX.globalCompositeOperation='source-over';
  X.save();X.setTransform(1,0,0,1,0,0);X.globalAlpha*=(o.dim??1);X.shadowColor='rgba(240,180,80,.5)';X.shadowBlur=9*Math.min(1.8,sc);X.shadowOffsetX=lv[0]*3;X.shadowOffsetY=lv[1]*3;
  X.drawImage(RIMC,x0,y0,x1-x0,y1-y0,x0,y0,x1-x0,y1-y0);X.restore();}
// fine detail inside a part: clipped, faint
function inside(P,a,fn){X.save();X.setLineDash([]);X.clip(P);X.globalAlpha*=a;X.shadowBlur=0;X.lineWidth=X.lineWidth*.7;fn();X.restore();}
const SL=(pts)=>{X.stroke(smoothP(pts,false));};

// two-bone arm; the elbow goes the natural way (down) unless up is asked for
function armIK(Sh,T,l1,l2,up=false,back=false){let dx=T[0]-Sh[0],dy=T[1]-Sh[1],d=Math.hypot(dx,dy)||1;const dm=Math.min(d,l1+l2-.5),ux=dx/d,uy=dy/d;
  const a=(l1*l1-l2*l2+dm*dm)/(2*dm),h=Math.sqrt(Math.max(0,l1*l1-a*a));const E1=[Sh[0]+ux*a-uy*h,Sh[1]+uy*a+ux*h],E2=[Sh[0]+ux*a+uy*h,Sh[1]+uy*a-ux*h];
  const E=back?(E1[0]<E2[0]?E1:E2):((E1[1]>E2[1])!==up?E1:E2);return [E,[Sh[0]+ux*dm,Sh[1]+uy*dm]];}
function limbP(A,B,w0,w1,P=new Path2D()){const [ux,uy]=nrm(sub(B,A)),nx=-uy,ny=ux;P.moveTo(A[0]+nx*w0,A[1]+ny*w0);P.lineTo(B[0]+nx*w1,B[1]+ny*w1);
  P.arc(B[0],B[1],w1,Math.atan2(ny,nx),Math.atan2(ny,nx)+Math.PI,true);P.lineTo(A[0]-nx*w0,A[1]-ny*w0);P.arc(A[0],A[1],w0,Math.atan2(-ny,-nx),Math.atan2(-ny,-nx)+Math.PI,true);P.closePath();return P;}
// a wide robe sleeve that hangs with gravity
function sleeveP(Sh,E,Wr,len=.5){const d1=nrm(sub(E,Sh)),d2=nrm(sub(Wr,E)),l2=Math.hypot(Wr[0]-E[0],Wr[1]-E[1]),C=add(E,mul(d2,l2*len));
  const n1=[-d1[1],d1[0]],n2=[-d2[1],d2[0]],dr=5+12*Math.abs(d2[0]);const off=(p,n,s,w,dd)=>{const q=add(p,mul(n,s*w));return (n[1]*s>0)?add(q,[0,dd]):q;};
  const P=new Path2D();const a1=off(Sh,n1,1,12,2),b1=off(E,n1,1,12,dr*.6),c1=off(C,n2,1,13,dr),c2=off(C,n2,-1,13,dr),b2=off(E,n1,-1,12,dr*.6),a2=off(Sh,n1,-1,12,2);
  P.moveTo(...a1);P.quadraticCurveTo(...b1,...c1);P.lineTo(...c2);P.quadraticCurveTo(...b2,...a2);P.closePath();return {P,C,n2,dr};}
const HANDS={relax:[[0,-5],[8,-6.5],[12,-9],[16,-8.5],[15,-5],[20,-4],[24,0],[23,5],[17,7],[8,6.5],[0,5.5]],
  open:[[0,-5],[8,-6],[11,-10],[16,-12],[17,-8.5],[14,-5],[26,-3.6],[31,-1],[30,2.4],[20,4.2],[8,5.6],[0,5.5]],
  feel:[[0,-5],[8,-6],[11,-9],[15,-10],[15,-6],[22,-4],[28,1],[29,6],[25,7],[16,6],[6,6],[0,5]],
  grip:[[0,-5.5],[8,-7],[15,-7.5],[19,-3],[18,4],[12,7.5],[4,6.5],[0,5.5]],
  cup:[[0,-5],[10,-5],[20,-6],[27,-9],[29,-6],[24,0],[14,5],[4,5.5],[0,5]]};
function handP(Wr,ang,kind='relax',s=1,flipY=1){const m=new DOMMatrix().translate(Wr[0],Wr[1]).rotate(ang*180/Math.PI).scale(s,s*flipY);const P=new Path2D();P.addPath(smoothP(HANDS[kind]||HANDS.relax),m);return P;}
// ---- head pieces, head-local (centre 0,0, face +x) ----
function headP(){const P=new Path2D();P.moveTo(-10,26);P.bezierCurveTo(-27,18,-29,-16,-14,-27);P.bezierCurveTo(-2,-35,16,-31,20,-14);P.quadraticCurveTo(22,-8,21,-4);P.lineTo(28.5,6);
  P.quadraticCurveTo(28,9.5,23,9);P.quadraticCurveTo(24.5,11.5,23,13.2);P.quadraticCurveTo(21.5,15,23,17);P.quadraticCurveTo(22,24,15,26);P.quadraticCurveTo(10,28,7,36);P.lineTo(-9,38);P.closePath();return P;}
const GEAR={cloth:[[19,-15],[12,-36],[-10,-39],[-30,-30],[-35,-4],[-34,18],[-30,36],[-15,36],[-11,24],[-5,12],[-3,-2],[7,-12]],
  hair:[[20,-15],[12,-34],[-10,-38],[-27,-27],[-31,-8],[-28,8],[-19,12],[-11,6],[-5,-3],[8,-13]],
  wig:[[20,-17],[8,-37],[-16,-39],[-32,-22],[-34,8],[-33,32],[-12,34],[-8,20],[-3,6],[4,-8],[14,-13]],
  shawl:[[20,-17],[10,-38],[-16,-41],[-36,-22],[-41,26],[-46,110],[-26,124],[-18,64],[-11,22],[-3,0],[8,-12]],
  cap:[[21,-14],[16,-30],[-6,-37],[-24,-27],[-26,-10],[-2,-17]],
  crown:[[20,-14],[14,-40],[6,-72],[-2,-90],[-14,-86],[-20,-56],[-26,-22],[-30,10],[-24,30],[-12,28],[-8,8],[-2,-8],[8,-12]]};
const BEARD={short:[[-6,4],[-4,24],[2,40],[12,50],[22,45],[27.5,30],[26.5,17],[20,14],[11,17],[3,11]],
  long:[[-6,4],[-5,30],[2,62],[10,88],[19,80],[26.5,52],[27.5,24],[21,14],[10,17],[2,10]]};
// o: pose stand|walk|kneel|sitheels|bow|bedsit|chair; lean, tilt (head), armF/armB targets (figure coords) + handF/handB kinds,
//    gear cloth|hair|wig|shawl|veil|cap, beard short|long, female, eyes closed, stripes 0..1, fur 0..1 (+peel), linen, tear 0..1, collar, dish, staff, ph (walk), t
function figure(o){const pose=o.pose||'stand',ph=o.ph||0,t=o.t||0;X.save();X.strokeStyle=gg(-120,-360,140,20);if(o.tremble>0)X.translate(o.tremble*2.4*Math.sin(t*41),o.tremble*1.4*Math.sin(t*53+1));
  let hip,lean=o.lean||0;const hS=o.seatH||48;
  if(pose==='stand'||pose==='walk')hip=[0,-178];else if(pose==='kneel')hip=[-4,-112];else if(pose==='sitheels')hip=[-18,-62];else if(pose==='bow'){hip=[-18,-62];lean+=1.18;}
  else if(pose==='prost'){const k=clamp(o.k||0);hip=[lerp(0,-18,k),lerp(-178,-62,k)];lean+=1.18*sm(.2,1,k);}
  else if(pose==='bedsit')hip=[0,-hS-16];else hip=[0,-hS-14];
  const br=1+.006*Math.sin(t*1.7+(o.seed||0)),TF=p=>add(hip,rot(lean,[p[0],p[1]*br]));const fem=!!o.female;
  // torso (pelvis origin)
  const tor=fem?[[-26,28],[-26,0],[-28,-30],[-29,-70],[-25,-98],[-16,-112],[0,-117],[12,-113],[20,-102],[25,-82],[22,-58],[22,-30],[25,0],[25,28]]
               :[[-28,28],[-29,0],[-30,-30],[-31,-70],[-30,-98],[-23,-114],[-4,-121],[11,-118],[18,-109],[21,-90],[21,-66],[22,-40],[25,-12],[28,28]];
  const torso=smoothP(xf(tor,TF));
  // lower body by pose (figure coords)
  let low,feet=[];const hx=hip[0],hy=hip[1];
  if(pose==='stand'||pose==='walk'){const s=pose==='walk'?Math.sin(ph):0,c=pose==='walk'?Math.cos(ph):0,st=o.stride??1,fa=10+22*s*st,fb=10-22*s*st,lift=k=>pose==='walk'?-5*(o.stride??1)*Math.max(0,k):0;
    const mn=Math.min(fa,fb),mx=Math.max(fa,fb),hem=fem?-2:(o.hem??-8);
    low=smoothP([[-29,-212],[-31,-170],[-32,-120],[mn*.3-36,-60],[mn-38,hem],[(mn+mx)/2,hem+1],[mx+27,hem],[mx*.35+31,-62],[32,-130],[31,-170],[29,-212]]);
    const foot=(x,y)=>smoothP([[x-24,y-1],[x-22,y-9],[x-10,y-13],[x+2,y-9],[x+14,y-4],[x+18,y+1]]);feet=[foot(fb,lift(-c)),foot(fa,lift(c))];}
  else if(pose==='prost'){const k=clamp(o.k||0),A=[[-29,-212],[-31,-170],[-32,-120],[-33,-60],[-28,-8],[10,-7],[37,-8],[34.5,-62],[32,-130],[31,-170],[29,-212]],B=[[-42,-86],[-52,-62],[-58,-46],[-62,-14],[-62,0],[-10,0],[44,0],[52,-14],[38,-38],[4,-62],[-16,-86]];
    low=smoothP(A.map((p,i)=>[lerp(p[0],B[i][0],k),lerp(p[1],B[i][1],k)]));const foot=(x,y)=>smoothP([[x-24,y-1],[x-22,y-9],[x-10,y-13],[x+2,y-9],[x+14,y-4],[x+18,y+1]]);feet=[foot(10,0),foot(10,0)];}
  else if(pose==='kneel'){low=smoothP([[-29,-140],[-31,-110],[-36,-64],[-44,-24],[-82,-12],[-86,0],[34,0],[40,-14],[34,-64],[29,-110],[27,-140]]);}
  else if(pose==='sitheels'||pose==='bow'){low=smoothP([[-42,-86],[-58,-46],[-62,0],[44,0],[52,-14],[38,-38],[4,-62],[-16,-86]]);}
  else if(pose==='bedsit'){const h=hS;low=smoothP([[-30,-h-44],[-34,-h-8],[-24,-h+2],[150,-h+2],[180,-h-2],[178,-h-22],[146,-h-28],[60,-h-34],[28,-h-44]]);
    feet=[smoothP([[170,-h-2],[174,-h-26],[180,-h-34],[188,-h-30],[190,-h-6]])];}
  else {const h=hS;low=smoothP([[-30,-h-44],[-32,-h+2],[56,-h+6],[74,-h+22],[80,-8],[50,-8],[48,-h+34],[30,-h-6],[28,-h-44]]);feet=[smoothP([[44,-2],[48,-12],[62,-14],[88,-4],[90,1]])];}
  // head
  const piv=TF([0,-122]),ha=lean+(o.tilt||0)+(pose==='bow'?.4:pose==='prost'?.4*sm(.2,1,clamp(o.k||0)):0)+.02*Math.sin(t*.9+(o.seed||0)),hS_=o.headS||1,hc=add(piv,rot(ha,[0,-28*hS_])),hm=new DOMMatrix().translate(hc[0],hc[1]).rotate(ha*180/Math.PI).scale(.86*hS_);
  const inH=pts=>{const P=new Path2D();P.addPath(smoothP(pts),hm);return P;};
  const headParts=[];const hp=new Path2D();hp.addPath(fem?headF():headP(),hm);headParts.push(hp);
  const g=o.gear||(fem?'shawl':'cloth');if(g==='veil'||g==='shawl')headParts.push(inH(GEAR.shawl));else if(GEAR[g])headParts.push(inH(GEAR[g]));
  if(o.beard)headParts.push(inH(BEARD[o.beard]),inH([[17,8.5],[26,10],[24.5,14],[18,13.5]]));
  if(g==='veil')headParts.push(inH([[18,-6],[25,-5],[31,6],[33,24],[30,46],[14,52],[-2,44],[4,10],[10,-4]]));
  const neck=limbP(TF([-1,-110]),add(hc,rot(ha,[-3,22])),9,8.5);
  // arms
  const SF=TF([10,-102]),SB=TF([-4,-104]),l1=60,l2=54;
  const relF=add(TF([20,-20]),[8,6]),relB=TF([-7,8]);
  const arm=(Sh,Tg,hand,up,back)=>{const [E,Wr]=armIK(Sh,Tg,l1,l2,up,back);const sl=sleeveP(Sh,E,Wr,o.sleeve??(o.linen?.15:.5));const fa=limbP(E,Wr,7.5,5.6),ua=limbP(Sh,E,10,8);
    const d=nrm(sub(Wr,E)),ang=Math.atan2(d[1],d[0]);const hd=handP(Wr,ang,hand,1,d[0]>=-.05?1:-1);return {E,Wr,sl,fa,ua,hd,d};};
  const pk=pose==='prost'?sm(.2,1,clamp(o.k||0)):0,lp2=(A,B)=>[lerp(A[0],B[0],pk),lerp(A[1],B[1],pk)];
  const AF=arm(SF,o.armF||(pk>0?lp2(relF,[104,-6]):relF),o.handF||'relax',o.upF),AB=arm(SB,o.armB||(pk>0?lp2(relB,[84,-6]):relB),o.handB||'relax',o.upB,!o.armB&&pk<.3);
  const fill=o.linen?'#2a2116':o.fill||INK;
  // --- back layer
  if(o.staff){const s0=o.staff===true?[AB.Wr[0]+2,-2]:o.staff;X.save();X.lineWidth=7;X.lineCap='round';const P=new Path2D();P.moveTo(s0[0],s0[1]);P.lineTo(AB.Wr[0]+(AB.Wr[0]-s0[0])*.55,AB.Wr[1]+(AB.Wr[1]-s0[1])*.55);
    const st=new Path2D();const A=[s0[0],s0[1]],B=[AB.Wr[0]+(AB.Wr[0]-s0[0])*.5,AB.Wr[1]+(AB.Wr[1]-s0[1])*.5];st.addPath(limbP(A,B,3.2,3.6));rimLayer([st],{dim:.9,fill});X.restore();}
  rimLayer([AB.ua,AB.fa,AB.sl.P,AB.hd,...(pose==='walk'?[feet[0]]:[])],{dim:.6,fill});
  // --- body
  const body=[low,torso,neck,...headParts,...(pose==='walk'?[feet[1]]:feet)];rimLayer(body,{fill});
  // details on the body
  inside(low,.16,()=>{const ys=pose==='stand'||pose==='walk';if(ys){SL([[6,-170],[8,-100],[12,-10]]);SL([[-16,-160],[-22,-80],[-28,-12]]);
      X.globalAlpha*=1.8;SL([[-50,-20],[0,-18],[50,-20]]);}});
  inside(torso,.5,()=>{const a=TF([-34,-30]),b=TF([34,-32]),c=TF([-34,-37]),d=TF([34,-39]);X.beginPath();X.moveTo(...a);X.lineTo(...b);X.moveTo(...c);X.lineTo(...d);X.stroke();
    if(!o.linen&&!fem){X.globalAlpha*=.7;SL([TF([-22,-114]),TF([4,-80]),TF([30,-44])]);}});
  if(o.linen){inside(low,.22,()=>{for(let k=-4;k<=4;k++)SL([[k*7,-176],[k*9,-90],[k*11,-8]]);});
    inside(torso,.3,()=>{for(let k=-3;k<=3;k++)SL([TF([k*8,-110]),TF([k*8.5,-36])]);});}
  if(o.stripes>0){const bands=(P,step)=>inside(P,.34*clamp(o.stripes),()=>{X.lineWidth=5;for(let k=-14;k<=14;k++){X.beginPath();X.moveTo(k*step-60,-400);X.lineTo(k*step+60,40);X.stroke();}});bands(low,22);bands(torso,22);}
  if(o.tear>0){const tt=clamp(o.tear),a=TF([12,-112]),b=TF([10,-112+40*tt]);inside(torso,1,()=>{X.lineWidth=2;X.globalAlpha=1;X.beginPath();X.moveTo(...a);
    for(let i=1;i<=6;i++){const q=[lerp(a[0],b[0],i/6)+(i%2?4:-3),lerp(a[1],b[1],i/6)];X.lineTo(...q);}X.stroke();});}
  if(o.collar){X.save();X.globalAlpha*=(o.collar===true?1:clamp(+o.collar));X.setLineDash([]);X.lineWidth=3.4;X.shadowBlur=14;X.beginPath();const c0=TF([-14,-112]),c1=TF([16,-96]),c2=TF([20,-114]);X.moveTo(...c0);X.quadraticCurveTo(...c1,...c2);X.stroke();X.restore();}
  if(o.fur>0){const r=rng(7);X.save();X.setLineDash([]);X.globalAlpha*=clamp(o.fur)*.7;X.lineWidth=1.1;X.shadowBlur=0;const nb=TF([10,-112]);for(let i=0;i<8;i++){const px=nb[0]+r()*12-8,py=nb[1]+6-r()*12;X.beginPath();X.moveTo(px,py);X.lineTo(px+5,py-6);X.stroke();}X.restore();}
  // eye
  X.save();X.setLineDash([]);X.translate(hc[0],hc[1]);X.rotate(ha);X.scale(.86*hS_,.86*hS_);X.shadowBlur=0;
  if(g!=='veil'||true){if(o.eyes==='closed'||o.smile>.5){X.lineWidth=1.5;if(o.smile>.5&&o.eyes!=='closed'){X.globalAlpha*=.9;X.beginPath();X.moveTo(9,-4.6);X.quadraticCurveTo(13.5,-9.4,18,-4.6);X.stroke();}else{X.globalAlpha*=.8;X.beginPath();X.moveTo(9,-6);X.quadraticCurveTo(13,-3,17,-6);X.stroke();}}
    else{X.fillStyle=GL;X.globalAlpha*=.85;X.beginPath();X.ellipse(13.5,-6,2.4,1.3,0,0,Math.PI*2);X.fill();}}
  if(o.smile>0){X.save();X.globalAlpha=X.globalAlpha*clamp(o.smile);X.lineWidth=1.9;X.lineCap='round';X.beginPath();if(o.beard){X.moveTo(19.5,6.5);X.quadraticCurveTo(15,10.5,10.5,8.5);}else{X.moveTo(21.6,11.2);X.quadraticCurveTo(17.4,15.6,13,10.4);}X.stroke();X.restore();}
  if(g==='cloth'){X.globalAlpha*=.4;X.lineWidth=1.2;X.beginPath();X.moveTo(18,-18);X.quadraticCurveTo(-2,-26,-24,-14);X.stroke();X.beginPath();X.moveTo(-26,-8);X.quadraticCurveTo(-29,14,-25,30);X.stroke();}
  if(g==='wig'){X.globalAlpha*=.35;X.lineWidth=1.1;for(let k=0;k<6;k++){X.beginPath();X.moveTo(-30,-14+k*8);X.lineTo(-8+(k<3?-6:0),-14+k*8);X.stroke();}}
  if(o.beard){X.save();X.globalAlpha*=.8;X.lineWidth=1.5;X.beginPath();X.moveTo(27,17);X.quadraticCurveTo(19,12.5,11,17);X.quadraticCurveTo(3,12,-5,5);X.stroke();X.globalAlpha*=.45;X.lineWidth=1;const bl=o.beard==='long'?80:44;[[8,20],[15,19],[22,19]].forEach(([x,y])=>{X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+2,(y+bl)/2,x-1,bl-4);X.stroke();});X.restore();}
  X.restore();
  if(o.held){X.save();o.held(AF.Wr,AF.d);X.restore();}
  // --- front layer: arm (+ things it holds)
  const front=[AF.ua,AF.fa,AF.sl.P,AF.hd];rimLayer(front,{fill});
  inside(AF.sl.P,.45,()=>{const C=AF.sl.C,n=AF.sl.n2,dd=AF.sl.dr;X.beginPath();const p1=add(C,mul(n,13)),p2=add(add(C,mul(n,-13)),[0,dd]);const off=mul(nrm(sub(AF.E,C)),5);X.moveTo(...add(p1,off));X.lineTo(...add(p2,off));X.stroke();});
  if(o.fur>0){const r=rng(11);X.save();X.setLineDash([]);X.globalAlpha*=clamp(o.fur);X.lineWidth=1.1;X.shadowBlur=0;for(let i=0;i<36;i++){const u=.45+.6*r();if(u-.45<(o.peel||0)*.6)continue;const v=r()-.5,b=add(AF.E,mul(sub(AF.Wr,AF.E),Math.min(u,1.05)));
      const px=b[0]-AF.d[1]*v*14,py=b[1]+AF.d[0]*v*14;X.beginPath();X.moveTo(px,py);X.lineTo(px+AF.d[0]*7-3,py+AF.d[1]*7-5);X.stroke();}X.restore();}
  if(o.ring){X.save();X.globalAlpha*=(o.ring===true?1:clamp(+o.ring));X.fillStyle=GL;X.shadowBlur=12;X.beginPath();X.arc(...add(AF.Wr,mul(AF.d,12)),2.6,0,Math.PI*2);X.fill();X.restore();}
  if(o.dish){X.save();X.translate(AF.Wr[0]+14,AF.Wr[1]-8);const D=new Path2D();D.moveTo(-44,0);D.lineTo(44,0);D.quadraticCurveTo(0,26,-44,0);rimLayer([D],{fill});X.setLineDash([]);X.globalAlpha*=.55;X.lineWidth=1.6;
    [-16,0,16].forEach((d,k)=>{X.beginPath();for(let i=0;i<=20;i++){const yy=-6-i*3,xx=d+6*Math.sin(t*3+i*.5+k);i?X.lineTo(xx,yy):X.moveTo(xx,yy);}X.stroke();});X.restore();}
  X.restore();return {HF:AF.Wr,HB:AB.Wr,hc,SF,SB};}
const flipF=o=>{X.scale(-1,1);return figure(o);};
// ---------- animals, props and sets (rim-lit silhouettes and gold line) ----------
const RIM=(paths,o={})=>{X.save();X.strokeStyle=gg(-150,-260,150,20);rimLayer(paths,o);X.restore();};
// a young goat (facing right, hooves on 0)
function goatR(o={}){const ph=o.ph||0,wk=o.walk?1:0,hb=wk*2*Math.sin(ph*2),t=o.t||0,hd=(o.graze?14:0)+2*Math.sin(t*1.3);
  const body=smoothP([[-70,-70+hb],[-40,-82+hb],[20,-84+hb],[50,-80+hb],[62,-66+hb],[60,-46+hb],[40,-38+hb],[-30,-38+hb],[-62,-42+hb],[-76,-56+hb]]);
  const head=smoothP([[42,-76+hb],[56,-100+hb+hd*.4],[68,-118+hb+hd],[84,-124+hb+hd],[98,-114+hb+hd],[104,-100+hb+hd],[96,-95+hb+hd],[84,-100+hb+hd],[70,-84+hb],[60,-60+hb]]);
  const ear=smoothP([[74,-118+hb+hd],[62,-110+hb+hd],[58,-100+hb+hd],[66,-104+hb+hd]]);
  const horn=new Path2D();horn.moveTo(80,-122+hb+hd);horn.quadraticCurveTo(66,-150+hb+hd,48,-146+hb+hd);horn.quadraticCurveTo(64,-142+hb+hd,74,-120+hb+hd);horn.closePath();
  const beard=smoothP([[94,-98+hb+hd],[99,-80+hb+hd],[92,-86+hb+hd]]);const tail=smoothP([[-70,-62+hb],[-86,-80+hb],[-80,-62+hb]]);
  const leg=(x,s)=>{const sw=wk*14*Math.sin(ph+s),k=[x+sw*.4,-20],f=[x+sw,0];const P=limbP([x,-44+hb],k,5.5,4);limbP(k,f,4,3.4,P);return P;};
  RIM([leg(-56,Math.PI),leg(46,0)],{dim:.6,fill:o.fill});RIM([body,head,ear,horn,beard,tail,leg(-44,0),leg(56,Math.PI)],{fill:o.fill,bb:[-110,-170,130,10]});}
const goatS=()=>goatR();
// a sheep
function sheepR(o={}){const t=o.t||0,sd=o.seed||0,pts=[];for(let i=0;i<30;i++){const an=i/30*Math.PI*2,rr=1+.1*Math.abs(Math.sin(i*1.57+sd*.3));pts.push([-6+Math.cos(an)*46*rr,-50+Math.sin(an)*28*rr]);}
  const body=smoothP(pts),gz=o.graze?14+3*Math.sin(t*2+sd):0,head=smoothP([[30,-62],[44,-74+gz*.5],[58,-74+gz],[70,-64+gz],[72,-54+gz],[64,-46+gz],[50,-46+gz*.6],[36,-46]]),ear=smoothP([[46,-74+gz*.6],[34,-82+gz*.6],[36,-70+gz*.6]]);
  const legs=new Path2D();[[-32,0],[-18,0],[16,0],[28,0]].forEach(([x],k)=>limbP([x,-28],[x+(k%2?1:-1),0],4.5,3.5,legs));RIM([legs,body,head,ear],{fill:o.fill,bb:[-70,-100,90,10]});
  inside(body,.3,()=>{for(let r=0;r<2;r++)for(let i=0;i<6;i++){X.beginPath();X.arc(-38+i*13+r*6,-60+r*14,6,Math.PI*.95,Math.PI*2.05);X.stroke();}});
  X.save();X.fillStyle=GL;X.globalAlpha*=.8;X.beginPath();X.arc(60,-62+gz,2.2,0,Math.PI*2);X.fill();X.restore();}
function camelR(o={}){const ph=o.ph||0,wk=o.walk?1:0,hb=wk*3*Math.sin(ph*2),nb=wk*4*Math.sin(ph*2+1);
  const body=smoothP([[-112,-136+hb],[-86,-156+hb],[-52,-204+hb],[-14,-212+hb],[22,-180+hb],[64,-156+hb],[98,-146+hb],[104,-122+hb],[84,-104+hb],[-80,-102+hb],[-114,-116+hb]]);
  const neck=smoothP([[86,-150+hb],[112,-152+hb],[132,-172+nb],[146,-202+nb],[154,-224+nb],[176,-228+nb],[194,-220+nb],[192,-208+nb],[172,-206+nb],[162,-196+nb],[152,-160+nb],[126,-118+hb],[96,-112+hb]]);
  const load=smoothP([[-60,-186+hb],[-50,-214+hb],[16,-214+hb],[26,-186+hb],[30,-160+hb],[-66,-160+hb]]);
  const leg=(x,s)=>{const sw=wk*22*Math.sin(ph+s),k=[x+sw*.5,-54],f=[x+sw,0];const P=limbP([x,-110+hb],k,8,5);limbP(k,f,5,4.5,P);return P;};
  RIM([leg(-90,Math.PI*.5),leg(66,Math.PI*1.5)],{dim:.6,fill:o.fill,bb:[-140,-260,200,10]});RIM([body,neck,load,leg(-74,Math.PI*1.5),leg(84,Math.PI*.5)],{fill:o.fill,bb:[-140,-260,200,10]});
  inside(load,.4,()=>{X.beginPath();X.moveTo(-56,-200+hb);X.lineTo(22,-200+hb);X.moveTo(-20,-214+hb);X.lineTo(-24,-160+hb);X.stroke();});}
// the land: a ground line, low hills behind, stones
function ground(a,o={}){const y=o.y??240,x0=o.x0??-1400,x1=o.x1??1400;pen(0,0,1,a*.55,1,()=>{L([[x0,y],[x1,y]]);});
  pen(0,0,1,a*.22,1,()=>{const r=rng(o.seed||5);for(let i=0;i<26;i++){const x=x0+r()*(x1-x0),w=6+r()*16;L([[x-w,y+8+r()*30],[x+w,y+8+r()*30]]);}});}
function hills(a,o={}){const y=o.y??240,s=o.seed||1;pen(0,0,1,a*.32,1,()=>{X.beginPath();for(let x=-1500;x<=1500;x+=30){const h=60+40*Math.sin(x*.004+s)+26*Math.sin(x*.011+s*2);x===-1500?X.moveTo(x,y-h):X.lineTo(x,y-h);}X.stroke();});
  pen(0,0,1,a*.16,1,()=>{X.beginPath();for(let x=-1500;x<=1500;x+=30){const h=150+70*Math.sin(x*.0025+s*3)+30*Math.sin(x*.008+s);x===-1500?X.moveTo(x,y-h):X.lineTo(x,y-h);}X.stroke();});}
function starsF(t,a){if(a<=0)return;const r=rng(77);X.save();X.fillStyle=GL;for(let i=0;i<140;i++){const x=r()*W,y=r()*H*.62,s=.6+r()*1.6,tw=.45+.55*Math.abs(Math.sin(t*(.4+r())+i));X.globalAlpha=a*tw*.7;X.fillRect(x,y,s,s);}X.restore();}
function moonF(x,y,r,a){if(a<=0)return;const s=Math.ceil(r*2+8);if(!window.MOONC)window.MOONC=document.createElement('canvas');const M=MOONC;if(M.width!==s){M.width=s;M.height=s;}
  const m=M.getContext('2d');m.setTransform(1,0,0,1,0,0);m.globalCompositeOperation='source-over';m.clearRect(0,0,s,s);m.fillStyle='rgb(246,220,152)';m.beginPath();m.arc(s/2,s/2,r,0,Math.PI*2);m.fill();
  m.globalCompositeOperation='destination-out';m.beginPath();m.arc(s/2+r*.42,s/2-r*.18,r*.92,0,Math.PI*2);m.fill();m.globalCompositeOperation='source-over';
  glow(x-r*.25,y+r*.1,r*5,a*.22);const g0=X.globalAlpha;X.save();X.globalAlpha=clamp(a*.92)*g0;X.shadowColor='rgba(240,200,120,.8)';X.shadowBlur=24;X.drawImage(M,x-s/2,y-s/2);X.restore();}
function sunF(x,y,r,a){if(a<=0)return;X.save();X.globalAlpha=a;X.fillStyle='rgba(255,226,160,.95)';X.shadowColor='rgba(255,200,110,.9)';X.shadowBlur=40;X.beginPath();X.arc(x,y,r,0,Math.PI*2);X.fill();X.restore();glow(x,y,r*7,a*.45);}
// a tent seen from outside (door on the right)
function tentExt(open=0){L([[-300,240],[-250,40],[0,-60],[250,40],[300,240]]);L([[0,-60],[0,240]]);X.save();X.globalAlpha*=.4;[-150,150].forEach(dx=>Q([dx*.2,-60+Math.abs(dx)*.4],[dx*.7,80],[dx,240]));X.restore();
  L([[-330,-30],[-250,40]]);L([[330,-30],[250,40]]);Q([160,40],[170+40*open,140],[150+80*open,240]);L([[70,40],[90,240]]);}
function wellP(){X.beginPath();X.ellipse(0,170,120,26,0,0,Math.PI*2);X.stroke();L([[-120,170],[-120,240]]);L([[120,170],[120,240]]);X.beginPath();X.ellipse(0,240,120,26,0,0,Math.PI);X.stroke();
  X.save();X.globalAlpha*=.4;for(let i=0;i<5;i++)L([[-120+i*60,176],[-120+i*60+30,236]]);X.restore();}
function wellStone(dx=0){X.beginPath();X.ellipse(dx,150,100,24,0,0,Math.PI*2);X.stroke();X.beginPath();X.ellipse(dx,162,100,22,0,0,Math.PI);X.stroke();}
function pitP(){X.beginPath();X.ellipse(0,240,110,18,0,0,Math.PI*2);X.stroke();X.save();X.globalAlpha*=.6;L([[-104,246],[-90,520]]);L([[104,246],[90,520]]);Q([-90,520],[0,540],[90,520]);X.restore();
  X.save();X.globalAlpha*=.25;for(let i=0;i<7;i++)L([[-96+i*4,280+i*34],[-60+i*2,284+i*34]]);for(let i=0;i<7;i++)L([[96-i*4,300+i*34],[60-i*2,304+i*34]]);X.restore();}
function houseP(){L([[-160,240],[-160,20],[160,20],[160,240]]);L([[-180,20],[180,20]]);L([[-180,6],[180,6]]);X.save();X.globalAlpha*=.5;L([[-40,240],[-40,100],[40,100],[40,240]]);X.restore();
  X.save();X.globalAlpha*=.18;for(let r=0;r<7;r++)for(let k=0;k<6;k++)L([[-150+k*52+(r%2)*26,40+r*28],[-120+k*52+(r%2)*26,40+r*28]]);X.restore();}
function gateP(){const P=new Path2D();P.rect(-200,-30,48,270);P.rect(152,-30,48,270);X.stroke(P);
  Q([-206,-30],[0,-150],[206,-30]);Q([-152,-30],[0,-118],[152,-30]);L([[-206,-30],[-152,-30]]);L([[152,-30],[206,-30]]);
  X.save();X.globalAlpha*=.32;for(let k=0;k<7;k++){const y=230-k*38;L([[-200,y],[-152,y]]);L([[152,y],[200,y]]);const off=k%2?14:-10;L([[-176+off,y],[-176+off,y-38]]);L([[176+off,y],[176+off,y-38]]);}X.restore();}
function columnP(h=520){L([[-26,240],[-22,240-h+60]]);L([[26,240],[22,240-h+60]]);Q([-22,240-h+60],[-70,240-h+10],[-56,240-h]);Q([22,240-h+60],[70,240-h+10],[56,240-h]);L([[-62,240-h],[62,240-h]]);
  X.save();X.globalAlpha*=.4;for(let k=0;k<4;k++)L([[-22,240-h+70+k*10],[22,240-h+70+k*10]]);L([[-8,240],[-6,240-h+70]]);L([[8,240],[6,240-h+70]]);X.restore();L([[-40,240],[40,240]]);}
function hallP(n=4,sp=420,h=560){for(let i=0;i<n;i++){X.save();X.translate((i-(n-1)/2)*sp,0);columnP(h);X.restore();}L([[-(n/2)*sp,240-h],[(n/2)*sp,240-h]]);L([[-(n/2)*sp,240-h-24],[(n/2)*sp,240-h-24]]);}
function daisP(){L([[-150,240],[-150,200],[150,200],[150,240]]);L([[-120,200],[-120,160],[120,160],[120,200]]);}
function chairE(){L([[-40,0],[-40,-58]]);L([[40,0],[40,-58]]);L([[-50,-58],[50,-58]]);L([[-44,-58],[-50,-170]]);X.save();X.globalAlpha*=.5;L([[-44,-100],[40,-58]]);X.restore();}
function barsP(){X.save();X.globalAlpha*=.8;L([[-90,-90],[90,-90]]);L([[-90,90],[90,90]]);L([[-90,-90],[-90,90]]);L([[90,-90],[90,90]]);for(let i=1;i<5;i++)L([[-90+i*36,-90],[-90+i*36,90]]);X.restore();}
function sackR(x,o={}){X.save();X.translate(x,0);const P=smoothP([[-40,0],[-48,-50],[-36,-96],[-16,-112],[-24,-128],[0,-122],[24,-130],[18,-112],[38,-96],[48,-50],[40,0]]);RIM([P],{bb:[-70,-150,70,10]});
  inside(P,.3,()=>{L([[-30,-106],[30,-106]]);});if(o.open){X.save();X.setLineDash([]);X.lineWidth=2;X.globalAlpha*=.7;X.beginPath();X.ellipse(0,-118,26,7,0,0,Math.PI*2);X.stroke();X.restore();}X.restore();}
function cupG(){X.beginPath();X.moveTo(-26,-60);X.quadraticCurveTo(-24,-20,0,-14);X.quadraticCurveTo(24,-20,26,-60);X.stroke();X.beginPath();X.ellipse(0,-60,26,6,0,0,Math.PI*2);X.stroke();L([[0,-14],[0,8]]);X.beginPath();X.ellipse(0,10,18,5,0,0,Math.PI*2);X.stroke();}
function sealG(){X.beginPath();X.ellipse(0,-30,16,6,0,0,Math.PI*2);X.stroke();L([[-16,-30],[-16,30]]);L([[16,-30],[16,30]]);X.beginPath();X.ellipse(0,30,16,6,0,0,Math.PI);X.stroke();
  X.save();X.globalAlpha*=.55;for(let i=0;i<3;i++)L([[-12,-14+i*16],[12,-10+i*16]]);X.restore();}
function cordG(t=0){// a coiled, twisted cord with a knotted tassel end
  for(let k=0;k<3;k++){const y=-k*16,rx=100-k*7,ry=28-k*3;X.beginPath();X.ellipse(-60,y,rx,ry,0,0,Math.PI*2);X.stroke();
    X.save();X.globalAlpha*=.55;X.beginPath();for(let i=1;i<18;i++){const u=Math.PI*i/18,px=-60+rx*Math.cos(u),py=y+ry*Math.sin(u);X.moveTo(px-3,py-5);X.lineTo(px+3,py+5);}X.stroke();X.restore();}
  X.beginPath();X.moveTo(36,8);X.bezierCurveTo(70,22,100,30,124,24);X.stroke();X.beginPath();X.ellipse(130,24,6,5,0,0,Math.PI*2);X.stroke();
  X.beginPath();for(let j=-3;j<=3;j++){X.moveTo(135,24);X.lineTo(162,24+j*5);}X.stroke();}
function staffG(){L([[0,160],[0,-150]]);Q([0,-150],[4,-196],[34,-190]);Q([34,-190],[48,-180],[38,-166]);}
function wheatF(t,a,o={}){const r=rng(o.seed||31),n=o.n||90;pen(0,0,1,a,1,()=>{for(let i=0;i<n;i++){const x=-1100+r()*2200,h=120+r()*120,sw=10*Math.sin(t*1.2+x*.006);X.save();X.globalAlpha*=.35+.5*r();
  Q([x,240],[x+sw*.4,240-h*.5],[x+sw,240-h]);X.beginPath();X.ellipse(x+sw,240-h-14,4,14,sw*.03,0,Math.PI*2);X.stroke();X.restore();}});}
function torchF(t,x,y,s,a){pen(x,y,s,a,1,()=>{L([[0,0],[0,120]]);L([[-12,0],[12,0]]);});flame(t,x,y-2*s,s*.9,a);}
function babyR(){const P=smoothP([[-46,2],[-50,-12],[-38,-24],[-6,-28],[24,-26],[38,-16],[40,0],[20,10],[-20,10]]),hd=new Path2D();hd.arc(48,-12,15,0,Math.PI*2);RIM([P,hd],{bb:[-70,-40,70,20]});
  inside(P,.4,()=>{L([[-30,-24],[-10,8]]);L([[-6,-28],[14,8]]);L([[18,-26],[34,4]]);});}
function foldR(){const P=smoothP([[-50,0],[-52,-26],[-44,-34],[44,-34],[52,-26],[50,0]]);RIM([P],{bb:[-70,-50,70,10]});inside(P,.5,()=>{L([[-48,-12],[48,-12]]);L([[-48,-22],[48,-22]]);});}
function motes(t,a,x0,y0,w,h,n=26){const r=rng(5);X.save();X.fillStyle=GL;for(let i=0;i<n;i++){const px=x0+((r()*w+t*(8+r()*10))%w),py=y0+((r()*h-t*(4+r()*6))%h+h)%h,s=1+r()*1.8;X.globalAlpha=a*.35*(.4+.6*Math.sin(t+i));X.fillRect(px,py,s,s);}X.restore();}
const scr=(cx,cy,z,wx,wy)=>[W/2+(wx-cx)*z,H/2+(wy-cy)*z];
// a group of brothers: n figures with small differences
const BRO=[{beard:'short'},{beard:'short',gear:'cap'},{beard:'long'},{beard:'short'},{beard:'short',gear:'cap'},{beard:'short'},{beard:'long'},{beard:'short',gear:'cap'},{beard:'short'},{beard:'short'}];
function brothers(t,a,xs,o={}){xs.forEach((x,i)=>{const b=BRO[i%BRO.length],sc=(o.sc||1)*(.95+.06*((i*7)%5)/4),f=o.flip?flipF:figure;const extra=o.each?o.each(i,x):{};
  pen(x,o.y??240,sc,a*(o.al?o.al(i):1),1,f,{pose:'stand',...b,seed:i,t,...(o.base||{}),...extra});});}
function garmentG(sash=0){const P=new Path2D();P.moveTo(-22,-100);P.lineTo(-58,-94);P.quadraticCurveTo(-90,-84,-98,-58);P.lineTo(-110,44);P.lineTo(-74,52);P.lineTo(-70,-26);P.quadraticCurveTo(-82,70,-98,156);P.quadraticCurveTo(0,168,98,156);P.quadraticCurveTo(82,70,70,-26);P.lineTo(74,52);P.lineTo(110,44);P.lineTo(98,-58);P.quadraticCurveTo(90,-84,58,-94);P.lineTo(22,-100);P.quadraticCurveTo(0,-70,-22,-100);P.closePath();
  X.save();X.fillStyle='rgba(20,14,8,.55)';X.fill(P);X.restore();X.stroke(P);X.save();X.clip(P);X.globalAlpha*=.75;Q([-1,-72],[3,40],[0,162]);X.globalAlpha*=.6;L([[-70,-26],[-62,-92]]);L([[70,-26],[62,-92]]);Q([-38,-30],[-48,60],[-58,160]);Q([38,-30],[48,60],[58,160]);Q([-96,140],[0,152],[96,140]);L([[-108,30],[-76,38]]);L([[108,30],[76,38]]);X.restore();
  if(sash){X.save();X.lineWidth*=1.4;Q([-72,-6],[0,4],[72,-6]);Q([-72,4],[0,14],[72,4]);L([[6,8],[-4,48]]);L([[12,8],[18,46]]);X.restore();}}
function veilG(){const P=new Path2D();P.moveTo(0,-106);P.quadraticCurveTo(-54,-104,-58,-50);P.quadraticCurveTo(-62,4,-94,58);P.quadraticCurveTo(-100,94,-72,102);P.quadraticCurveTo(-36,92,0,104);P.quadraticCurveTo(36,92,72,102);P.quadraticCurveTo(100,94,94,58);P.quadraticCurveTo(62,4,58,-50);P.quadraticCurveTo(54,-104,0,-106);P.closePath();
  X.save();X.fillStyle='rgba(20,14,8,.6)';X.fill(P);X.restore();X.stroke(P);const F=new Path2D();F.ellipse(0,-40,25,33,0,0,Math.PI*2);X.save();X.fillStyle='rgba(8,6,4,.85)';X.fill(F);X.restore();X.save();X.globalAlpha*=.7;X.stroke(F);X.clip(F);X.globalAlpha*=.6;for(let y=-70;y<=-8;y+=9)L([[-30,y],[30,y+3]]);X.restore();
  X.save();X.clip(P);X.globalAlpha*=.45;Q([-30,-8],[-46,40],[-56,98]);Q([30,-8],[46,40],[56,98]);Q([-14,-4],[-16,50],[-18,96]);Q([14,-4],[16,50],[18,96]);X.restore();}
function bed(){X.save();X.globalAlpha*=.9;L([[-130,-44],[250,-44]]);L([[-120,-44],[-120,0]]);L([[240,-44],[240,0]]);X.restore();}
// ---------- the verse: full Hebrew (ivory, key word gold) + English, the well video's way ----------
function wrapLines(txt,font,maxW,rtl){X.save();X.font=font;if(rtl)X.direction='rtl';const ws=txt.split(' '),out=[];let cur='';ws.forEach(w=>{const tt=cur?cur+' '+w:w;if(X.measureText(tt).width>maxW&&cur){out.push(cur);cur=w;}else cur=tt;});out.push(cur);X.restore();return out;}
const VCACHE={};
function verse(t,key,ref,en,y,a,o={}){if(a<=0.003&&!(o.ba>0.003))return;const hs=o.hs||50,es=o.es||34,mw=o.mw||1560;const k=key+'|'+hs;
  if(!VCACHE[k])VCACHE[k]={h:wrapLines(VS[key],`500 ${hs}px "Frank Ruhl Libre"`,mw,true),e:wrapLines(en,`italic 400 ${es}px Newsreader`,mw+40,false)};const Lh=VCACHE[k].h,Le=VCACHE[k].e;
  const tot=26+Lh.length*hs*1.5+16+Le.length*es*1.35,bt=Math.max(tot,o.minTot||0);let yy=y;
  X.save();const bg=X.createLinearGradient(0,y-60,0,y+bt+40);bg.addColorStop(0,'rgba(6,4,3,0)');bg.addColorStop(.2,`rgba(6,4,3,${.93*(o.ba??a)})`);bg.addColorStop(.8,`rgba(6,4,3,${.93*(o.ba??a)})`);bg.addColorStop(1,'rgba(6,4,3,0)');X.fillStyle=bg;X.fillRect(0,y-60,W,bt+100);X.restore();
  T(ref,W/2,yy,'300 28px Fraunces',GOLD,a,'center','5px');yy+=26+hs*.75;
  Lh.forEach((ln,i)=>{heb(ln,W/2,yy,hs,a,{t,t0:(o.t0??-99)+i*.25,gold:o.gold||{},step:.05});yy+=hs*1.5;});yy+=16-hs*.5+es*.6;
  Le.forEach(ln=>{X.save();X.font=`italic 400 ${es}px Newsreader`;const ws=ln.split(' '),sp=X.measureText(' ').width,tw=X.measureText(ln).width;let xx=W/2-tw/2;
    ws.forEach(w=>{const key2=w.toLowerCase().replace(/[^a-z]/g,'');const hk=o.hot&&o.hot[key2]!==undefined?sm(o.hot[key2]-.05,o.hot[key2]+.25,t):0;
      X.globalAlpha=clamp(a);X.fillStyle=hk>0?GL:IVORY;X.textBaseline='middle';X.shadowColor='rgba(240,180,80,.7)';X.shadowBlur=14*hk;X.fillText(w,xx,yy);xx+=X.measureText(w).width+sp;});X.restore();yy+=es*1.35;});}
// ---------- the tent set (world units), and a camera over it ----------
function world(cx,cy,z,fn){X.save();X.translate(W/2,H/2);X.scale(z,z);X.translate(-cx,-cy);fn();X.restore();}
const camAt=(t,keys)=>{let i=0;while(i+1<keys.length&&t>=keys[i+1][0])i++;const A=keys[i],B=keys[Math.min(i+1,keys.length-1)];if(A===B||t<=A[0])return A.slice(1);const k=eio((t-A[0])/(B[0]-A[0]));return [lerp(A[1],B[1],k),lerp(A[2],B[2],k),lerp(A[3],B[3],k)];};
function panel(x,y,w,h,a,fn){if(a<=0.003)return;X.save();X.globalAlpha*=a;X.save();X.beginPath();X.rect(x-w/2,y-h/2,w,h);X.clip();X.fillStyle='rgba(8,6,4,.9)';X.fillRect(x-w/2,y-h/2,w,h);X.translate(x,y);fn();X.restore();
  X.strokeStyle=gg(x-w/2,y-h/2,x+w/2,y+h/2);X.lineWidth=2;X.shadowColor='rgba(240,180,80,.5)';X.shadowBlur=10;X.strokeRect(x-w/2,y-h/2,w,h);X.restore();}
const mini=(s,cx,cy,fn)=>{X.save();X.scale(s,s);X.translate(-cx,-cy);fn();X.restore();};
const sealAt=(x,y,s,a)=>pen(x,y,s,a,1,sealG),cordAt=(x,y,s,a,t)=>pen(x,y,s,a,1,cordG,t),staffAt=(x,y,s,a)=>pen(x,y,s,a,1,staffG);
