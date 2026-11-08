// ===================== 09 · Why the Bible Keeps Choosing the Younger Brother · full video =====================
// cue times are VO seconds (Tomer take); video time = VO time + PRE. C('phrase',after) finds a phrase in the VO words.
const PRE=.4, VEND=423.7, DUR=PRE+VEND+3.2;
const norm=s=>s.toLowerCase().replace(/[^a-z0-9 ]/g,'').split(/\s+/).filter(Boolean);const WW=WDS.map(w=>w[2].replace(/'/g,''));
function C(ph,after=0,end=false){const q=norm(ph);for(let i=0;i<WDS.length;i++){if(WDS[i][0]<after-4)continue;let ok=true;for(let j=0;j<q.length;j++){if(!WW[i+j]||WW[i+j]!==q[j]){ok=false;break;}}if(ok)return end?WDS[i+q.length-1][1]:WDS[i][0];}console.warn('cue?',ph,after);window.MISS=(window.MISS||[]).concat([ph]);return after;}
const CE=(ph,after=0)=>C(ph,after,true);
const SH=[];const S=(a,b,f)=>SH.push({a,b,f});
const ap=(v,v0,d=.45)=>sm(v0,v0+d,v);
const L2=(p,q,u)=>[p[0]+(q[0]-p[0])*u,p[1]+(q[1]-p[1])*u];
const BGd=()=>{X.fillStyle='#0b0907';X.fillRect(0,0,W,H);};
// ---------- shared drawing bits ----------
function enLine(parts,x,y,size,a=1){if(a<=.003)return;X.save();X.globalAlpha*=a;X.font=`italic 400 ${size}px Newsreader`;const ws=parts.map(p=>X.measureText(p[0]).width),tot=ws.reduce((p,q)=>p+q,0);let xx=x-tot/2;
  parts.forEach((p,i)=>{X.textAlign='left';X.textBaseline='middle';if(p[1]){X.fillStyle=gg(xx,y-size/2,xx+ws[i],y+size/2);X.shadowColor='rgba(255,200,100,.8)';X.shadowBlur=18;}else{X.fillStyle=IVORY;X.shadowBlur=0;}X.fillText(p[0],xx,y);xx+=ws[i];});X.restore();}
function band(a,h){if(a<=.003)return;X.save();const g=X.createLinearGradient(0,0,0,h+140);const k=h/(h+140);g.addColorStop(0,`rgba(6,4,3,${.92*a})`);g.addColorStop(k*.8,`rgba(6,4,3,${.86*a})`);g.addColorStop(k,`rgba(6,4,3,${.6*a})`);g.addColorStop(1,'rgba(6,4,3,0)');X.fillStyle=g;X.fillRect(0,0,W,h+140);X.restore();}
const goldMap=ws=>{const m={};(ws||[]).forEach(w=>m[w]=0);return m;};
// verse banner at the top (the 04/06 way): reference · Hebrew (key word gold) · English (same word gold)
function vTop(a,ref,hl,gold,en,o={}){if(a<=.003)return;const hs=o.hs||64,es=o.es||50;const h=84+70+(hl?hs*1.4:0)+en.length*es*1.3+30;band(a,h);
  let y=84;T(ref,W/2,y,'300 42px Fraunces',GOLD,a,'center','6px');y+=70;
  if(hl){heb(hl,W/2,y+hs*.42,hs,a,{gold:goldMap(gold),t:9});y+=hs*1.4;}
  en.forEach(p=>{enLine(p,W/2,y+es*.35,es,a);y+=es*1.3;});}
// a verse alone, full screen (big reveals and the ending)
function vFull(a,ref,hl,gold,en,o={}){if(a<=.003)return;const hs=o.hs||96,es=o.es||58,cy=o.cy??540;const tot=60+(hl?hs*1.5:0)+en.length*es*1.35;let y=cy-tot/2;
  T(ref,W/2,y,'300 42px Fraunces',GOLD,a,'center','6px');y+=60;
  if(hl){heb(hl,W/2,y+hs*.5,hs,a,{gold:goldMap(gold),t:9});y+=hs*1.5;}
  en.forEach(p=>{enLine(p,W/2,y+es*.45,es,a);y+=es*1.35;});}
const beam=(x,y0,y1,w,a=.5)=>{if(a<=.003)return;X.save();X.globalCompositeOperation='lighter';const g=X.createLinearGradient(0,y0,0,y1);g.addColorStop(0,`rgba(255,226,160,${a})`);g.addColorStop(1,'rgba(255,226,160,0)');X.fillStyle=g;X.beginPath();X.moveTo(x-w*.35,y0);X.lineTo(x+w*.35,y0);X.lineTo(x+w,y1);X.lineTo(x-w,y1);X.closePath();X.fill();X.restore();};
const orb=(x,y,r,a=1)=>{if(a<=.003)return;X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,236,190,${a})`);g.addColorStop(.35,`rgba(255,206,120,${.6*a})`);g.addColorStop(1,'rgba(255,190,90,0)');X.fillStyle=g;X.fillRect(x-r,y-r,2*r,2*r);X.restore();};
const ringA=(x,y,rx,ry,a,p=1)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;X.globalCompositeOperation='lighter';X.strokeStyle='rgba(255,214,140,.95)';X.lineWidth=5;X.shadowColor='rgba(255,190,90,1)';X.shadowBlur=28;X.beginPath();X.ellipse(x,y,rx,ry,0,-Math.PI/2,-Math.PI/2+Math.PI*2*clamp(p));X.stroke();X.restore();};
const dotArc=(x0,y0,x1,y1,h,a,p=1)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;X.globalCompositeOperation='lighter';X.strokeStyle='rgba(255,214,140,.9)';X.lineWidth=4;X.setLineDash([2,13]);X.lineCap='round';X.shadowColor='rgba(255,190,90,1)';X.shadowBlur=14;X.beginPath();
  const N=40,k=Math.max(1,Math.round(N*clamp(p)));for(let i=0;i<=k;i++){const u=i/N,mx=(x0+x1)/2,my=Math.min(y0,y1)-h;const x=(1-u)*(1-u)*x0+2*(1-u)*u*mx+u*u*x1,y=(1-u)*(1-u)*y0+2*(1-u)*u*my+u*u*y1;i?X.lineTo(x,y):X.moveTo(x,y);}X.stroke();X.restore();};
const lab=(s,x,y,a,c=IVORY,sz=34)=>T(s,x,y,`400 ${Math.max(30,sz)}px Fraunces`,c,a,'center','6px');
const labG=(s,x,y,a,sz=34)=>{if(a<=.003)return;sz=Math.max(30,sz);X.save();X.globalAlpha*=a;X.font=`500 ${sz}px Fraunces`;X.letterSpacing='6px';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gg(x-200,y-sz,x+200,y+sz);X.shadowColor='rgba(255,200,100,.8)';X.shadowBlur=18;X.fillText(s,x,y);X.restore();};
const gloss=(s,x,y,a,sz=38)=>T(s,x,y,`italic 400 ${Math.max(36,sz)}px Newsreader`,IVORY,a,'center');
const gline=(y,x0,x1,a=.5)=>pen(0,0,1,a,1,()=>L([[x0,y],[x1,y]]));
const fig=(x,y,s,a,p,o,flip)=>pen(x,y,s,a,p,()=>{flip?flipF(o):figure(o);});
function keyW(h,g,x,y,a,o={}){if(a<=.003)return;heb(h,x,y,o.hs||150,a,{gold:o.gold===false?{}:{[h]:0},t:9});if(g)gloss(g,x,y+(o.gy||130),a,o.gs||52);}
// ---------- props ----------
function shofarP(){const C=[],N=14;for(let i=0;i<=N;i++){const u=i/N,x=-72*u+18*Math.sin(u*Math.PI),y=-70*u*u-14*u,w=2.2+9*u*u;C.push([x,y,w]);}
  const pts=[];for(let i=0;i<=N;i++){const [x,y,w]=C[i],[x2,y2]=C[Math.min(N,i+1)],[x1,y1]=C[Math.max(0,i-1)];const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1;pts.push([x-dy/l*w,y+dx/l*w]);}
  for(let i=N;i>=0;i--){const [x,y,w]=C[i],[x2,y2]=C[Math.min(N,i+1)],[x1,y1]=C[Math.max(0,i-1)];const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy)||1;pts.push([x+dy/l*w,y-dx/l*w]);}
  const P=smoothP(pts);RIM([P],{bb:[-80,-90,20,10],fill:'#1d140a'});inside(P,.5,()=>{for(let i=3;i<N;i+=2){const [x,y,w]=C[i];L([[x-w,y-w*.3],[x+w,y+w*.3]]);}});}
function jarP(){const P=smoothP([[-18,0],[-26,-20],[-24,-46],[-14,-60],[-10,-70],[10,-70],[14,-60],[24,-46],[26,-20],[18,0]]);X.save();X.fillStyle='#120d08';X.fill(P);X.restore();X.stroke(P);L([[-12,-70],[12,-70]]);}
function bowlP(t){L([[-40,-30],[40,-30]]);Q([-40,-30],[0,20],[40,-30]);X.save();X.globalAlpha*=.6;for(let k=-1;k<=1;k++){const sw=6*Math.sin(t*2+k);Q([k*14,-40],[k*14+sw,-62],[k*14-sw,-84]);}X.restore();}
function winepress(){const P=new Path2D();P.moveTo(-260,0);P.lineTo(-240,-110);P.lineTo(240,-110);P.lineTo(260,0);X.save();X.fillStyle='#120d08';X.fill(P);X.restore();X.stroke(P);
  X.save();X.globalAlpha*=.4;for(let i=-3;i<=3;i++){L([[i*70-30,-110],[i*70-26,-60]]);L([[i*70+10,-60],[i*70+14,0]]);}X.restore();L([[-250,-60],[250,-60]]);}
function treeP(){const tr=smoothP([[-22,0],[-16,-120],[-30,-200],[-6,-230],[8,-200],[18,-120],[24,0]]);RIM([tr],{bb:[-40,-240,40,0]});X.save();X.lineWidth=3;Q([-10,-190],[-70,-230],[-120,-250]);Q([8,-200],[80,-250],[130,-262]);X.restore();
  [[-110,-290,120,60],[60,-300,130,64],[-20,-350,150,70],[-140,-250,80,40],[140,-260,90,44]].forEach(([x,y,rx,ry])=>{const P=new Path2D();P.ellipse(x,y,rx,ry,0,0,Math.PI*2);X.save();X.fillStyle='#120d08';X.fill(P);X.restore();X.save();X.globalAlpha*=.6;X.stroke(P);X.restore();});}
function soldier(x,y,s,v,a=1,o={}){const aF=o.armF||[30,-266],aB=o.armB||[44,-318];fig(x,y,s,a,1,{pose:'stand',beard:'short',gear:'cap',seed:o.seed||420,armF:aF,handF:'grip',armB:aB,handB:'grip',t:v},o.flip);
  const sx=o.flip?-1:1;torchF(v,x+sx*aB[0]*s,y+aB[1]*s,1.1*s/1.6,a);
  pen(x+sx*aF[0]*s,y+aF[1]*s,-s*sx,a,1,shofarP);}
const CROWD=(()=>{const r=rng(1301),o=[];for(let i=0;i<640;i++)o.push([r(),r(),r()]);return o;})();
function crowd(v,a,o={}){const x0=o.x0??260,x1=o.x1??1660,y0=o.y0??640,y1=o.y1??900;X.save();
  CROWD.forEach(([u,w,k],i)=>{let x=x0+u*(x1-x0),y=y0+w*(y1-y0);let al=a;const gone=o.gone?o.gone(i,k):0;if(gone>0){x+=gone*900;al*=1-gone;}if(al<=.01)return;const sc=.55+.45*w;
    X.globalAlpha=al*(.55+.45*w);X.fillStyle='#c9a25a';X.fillRect(x-1.6*sc,y-9*sc,3.2*sc,9*sc);X.beginPath();X.arc(x,y-11*sc,2.2*sc,0,Math.PI*2);X.fill();});X.restore();}
const bigNum=(s,x,y,a,sz=110)=>{if(a<=.003)return;X.save();X.globalAlpha*=a;X.font=`500 ${sz}px Fraunces`;X.textAlign='center';X.textBaseline='middle';X.fillStyle=gg(x-200,y-sz/2,x+200,y+sz/2);X.shadowColor='rgba(255,200,100,.7)';X.shadowBlur=22;X.fillText(s,x,y);X.restore();};

// =============== the blessing tableau (start, Gen 48, and the end) ===============
function tableau(v,st){const Z=st.Z||1.3;X.save();X.translate(st.cx??990,st.cy??960);X.scale(Z,Z);X.translate(-1240,-900);
  glow(1300,640,640,.32+.04*Math.sin(v*.8));gline(900,800,1640,.5);
  const J=[1200,900],js=1.4,B1=[1330,900],B2=[1430,900],bs=.84;
  const lapF=[58,-88],lapB=[50,-96],T1=[(B1[0]+4-J[0])/js,(900-bs*292-J[1])/js],T2=[(B2[0]+4-J[0])/js,(900-bs*292-J[1])/js];
  const u=st.u||0,uB=eio(clamp(u*1.05)),uF=eio(clamp((u-.12)*1.2)),lean=.06+.26*Math.max(uB,uF);
  const hF=L2(lapF,T2,uB),hB=L2(lapB,T1,uF);
  const jg=st.grab||0,tug=Math.sin(v*5)*4*jg*(st.tug??1);
  if((st.jos||0)>0){const jx=1500,jsc=1.3,tg=[(jx-(B2[0]+6))/jsc,(900-bs*292+8-900)/jsc];fig(jx,900,jsc,1,st.jos,{pose:'stand',beard:'short',gear:'cap',seed:164,lean:.06+.16*jg,armF:L2([26,-168],[tg[0],tg[1]+tug],jg),handF:jg>.6?'grip':'relax',t:v},true);}
  if((st.boys??1)>0){fig(B2[0],900,bs,1,st.boys??1,{pose:'stand',gear:'hair',seed:163,t:v},true);fig(B1[0],900,bs,1,st.boys??1,{pose:'stand',gear:'hair',seed:162,t:v},true);}
  pen(J[0],J[1],js,1,st.draw??1,()=>{figure({pose:'chair',seatH:58,beard:'long',gear:'cloth',seed:161,lean,armF:hF,handF:uB>.8?'open':'relax',armB:hB,handB:uF>.8?'open':'relax',t:v});
    X.save();X.globalAlpha*=.8;L([[-260,-58],[42,-58]]);L([[-250,-58],[-250,0]]);L([[34,-58],[34,0]]);L([[-262,-58],[-262,-150]]);L([[-262,-150],[-238,-150]]);L([[-238,-150],[-238,-58]]);X.beginPath();X.ellipse(-205,-70,34,12,0,0,Math.PI*2);X.stroke();X.restore();});
  const scr=p=>[J[0]+js*p[0],J[1]+js*p[1]];const rh=scr(hF),t2=scr(T2),l0=scr(lapF);
  const [aR,a1,a2]=st.labels||[0,0,0],[n1,n2]=st.names||['FIRSTBORN','YOUNGER'];
  ringA(rh[0]+4,rh[1]-4,30,26,aR,st.ringP??1);lab('RIGHT HAND',rh[0]-10,rh[1]+46,aR,GOLD,20);
  T(n1,(B1[0]+B2[0])/2-14,936,'400 24px Fraunces',IVORY,a1,'right','5px');if(a2>.003){X.save();X.globalAlpha*=a2;X.font='500 24px Fraunces';X.letterSpacing='5px';X.textAlign='left';X.textBaseline='middle';X.fillStyle=gg(B2[0]-60,920,B2[0]+200,950);X.shadowColor='rgba(255,200,100,.8)';X.shadowBlur=14;X.fillText(n2,(B1[0]+B2[0])/2+14,936);X.restore();}
  if(st.arc)dotArc(l0[0],l0[1],t2[0],t2[1],70,st.arc,st.arcP??1);
  ringA(t2[0]+2,t2[1]+2,34,28,st.ring||0,st.ringP2??1);beam(t2[0],-260,t2[1]+30,70,.28*(st.beam||0));
  X.restore();}


// =============== the crossed hands, from the front (Jacob faces us; his right hand is on our left) ===============
function boyF(x,y){const hd=new Path2D();hd.ellipse(x,y,56,64,0,0,Math.PI*2);const hair=smoothP([[x-58,y-6],[x-50,y-44],[x,y-66],[x+50,y-44],[x+58,y-6],[x+40,y-30],[x,y-40],[x-40,y-30]]);
  const sh=smoothP([[x-160,1095],[x-150,930],[x-96,872],[x-30,856],[x,862],[x+30,856],[x+96,872],[x+150,930],[x+160,1095]]);
  RIM([sh],{bb:[x-170,850,x+170,1090]});RIM([hd,hair],{bb:[x-60,y-70,x+60,y+70]});}
function frontScene(v,o){const cx=960,u=eio(clamp(o.u||0));
  glow(cx,520,700,.32+.04*Math.sin(v*.8));
  pen(0,0,1,o.a??1,o.p??1,()=>{
    const head=new Path2D();head.ellipse(cx,300,64,76,0,0,Math.PI*2);
    const cloth=smoothP([[cx-82,252],[cx-70,196],[cx,172],[cx+70,196],[cx+82,252],[cx+98,440],[cx+62,446],[cx+58,292],[cx,266],[cx-58,292],[cx-62,446],[cx-98,440]]);
    const beard=smoothP([[cx-50,326],[cx-44,400],[cx-22,472],[cx,494],[cx+22,472],[cx+44,400],[cx+50,326],[cx+28,350],[cx,358],[cx-28,350]]);
    const body=smoothP([[cx-180,1095],[cx-210,720],[cx-186,520],[cx-124,446],[cx,428],[cx+124,446],[cx+186,520],[cx+210,720],[cx+180,1095]]);
    RIM([body],{bb:[cx-220,420,cx+220,1090]});inside(body,.3,()=>{L([[cx,446],[cx,1090]]);for(let k=-2;k<=2;k++)Q([cx+k*70,560],[cx+k*76,800],[cx+k*70,1090]);});
    RIM([head,cloth,beard],{bb:[cx-100,170,cx+100,500]});inside(beard,.4,()=>{for(let k=-3;k<=3;k++)Q([cx+k*12,350],[cx+k*14,420],[cx+k*8,488]);});
    X.save();X.lineWidth=2.4;Q([cx-36,298],[cx-24,306],[cx-12,298]);Q([cx+12,298],[cx+24,306],[cx+36,298]);X.restore();   // eyes closed: he can't see
    boyF(640,780);boyF(1280,780);
    // arms: right shoulder (our left) → the younger (our right); left shoulder → the firstborn: an X
    const RS=[cx-150,486],LS=[cx+150,486],RH=L2([cx-70,760],[1262,708],u),LH=L2([cx+70,760],[660,708],eio(clamp(u*1.08)));
    const arm=(S,Hd,side)=>{const m=L2(S,Hd,.5),el=[m[0],m[1]+70*(1-u)+26];const P1=limbP(S,el,34,30),P2=limbP(el,Hd,30,24);const ang=Math.atan2(Hd[1]-el[1],Hd[0]-el[0]);const hp=handP(Hd,ang,u>.85?'open':'relax',4.6,side);
      RIM([P1,P2,hp],{bb:[Math.min(S[0],Hd[0])-60,Math.min(S[1],Hd[1])-60,Math.max(S[0],Hd[0])+60,Math.max(S[1],Hd[1])+60],fill:'#1d140a'});return {el,Hd};};
    o.hold=[arm(LS,LH,-1),arm(RS,RH,1)];});
  const [,R]=o.hold||[0,{Hd:[0,0],el:[0,0]}];
  const lr=o.lRight||0;if(lr>0){ringA(R.Hd[0],R.Hd[1],70,54,lr,o.ringP??1);labG('HIS RIGHT HAND',o.u>.5?1340:700,o.u>.5?560:640,lr,30);}
  lab('FIRSTBORN',640,1030,o.l1||0,IVORY,34);labG('YOUNGER',1280,1030,o.l2||0,34);
  if((o.n1||0)>0){lab('MANASSEH',640,1030,o.n1,IVORY,34);labG('EPHRAIM',1280,1030,o.n1,34);}
  ringA(1280,716,96,78,o.ring||0,o.ringP2??1);beam(1280,0,700,120,.3*(o.beam||0));
  lab('JACOB',cx,140,o.lJ||0,IVORY,32);}
// =============== 0:00 · the crossed hands (Gen 48) ===============
S(-1,5.45,(v)=>{BGd();motes(v,.8,500,200,1000,700);
  tableau(v,{draw:sm(-.2,1.2,v),boys:sm(2.9,4.2,v),u:0,labels:[0,0,0]});
  lab('JACOB',990+1.3*(1200-1240),1010,ap(v,1.4,.4),IVORY,32);gloss('in his old age, he can’t see',990+1.3*(1200-1240),1052,ap(v,1.6,.4)*.85,30);
});
S(5.45,17.25,(v)=>{BGd();motes(v,.8,300,100,1300,800);
  frontScene(v,{u:sm(12.3,14.6,v),lRight:ap(v,5.6,.35)*(1-sm(11.9,12.2,v))+ap(v,14.3,.35),ringP:sm(5.6,6.3,v),l1:ap(v,6.7,.4),l2:ap(v,10.4,.4),ring:ap(v,15.8,.35),ringP2:sm(15.8,16.5,v),beam:ap(v,15.8,.6),lJ:ap(v,5.5,.4)*(1-sm(11.9,12.3,v))});
});
S(17.25,28.62,(v)=>{BGd();motes(v,.8,500,200,1000,700);
  tableau(v,{u:1,boys:1,jos:sm(17.25,18.2,v),grab:eio(sm(19.8,20.9,v)),tug:Math.exp(-Math.max(0,v-20.9)*1.2),labels:[0,1,1],ring:1,beam:1});
  labG('JOSEPH',1470,640,ap(v,17.4,.4),30);
  if(v>=21.65&&v<25.9)vTop(ap(v,21.65,.35),'GENESIS 48:18','לֹא־כֵן אָבִי כִּי־זֶה הַבְּכֹר',['הַבְּכֹר'],[[['“Not so, father, this one is the ',0],['firstborn',1],['.”',0]]]);
  if(v>=25.9)vTop(ap(v,25.9,.35),'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son, ',0],['I know',1],['…”',0]]],{hs:72});
});
// =============== 0:28 · the ledger: born first / chosen ===============
const ROWS=[['CAIN','ABEL',33.7],['ISHMAEL','ISAAC',31.4],['ESAU','JACOB',28.75]];
S(28.62,39.55,(v)=>{BGd();glow(960,560,820,.24+.03*Math.sin(v));motes(v,.7,300,150,1300,800);
  const xL=640,xR=1280,y0=410,dy=150;
  const hd=ap(v,28.7,.4);lab('BORN FIRST',xL,y0-120,hd*.85,'rgba(240,228,205,.85)',34);labG('CHOSEN',xR,y0-120,hd,34);
  pen(0,0,1,.4*hd,sm(28.7,29.5,v),()=>{L([[xL-260,y0-76],[xR+260,y0-76]]);L([[960,y0-96],[960,y0+dy*2+70]]);});
  const pass=sm(36.1,36.8,v),choose=sm(38.0,38.7,v);
  ROWS.forEach(([a,b,tv],i)=>{const y=y0+i*dy+20,al=ap(v,tv,.4);if(al<=.003)return;const yy=y+16*(1-eo(al));
    T(a,xL,yy,'500 66px Fraunces',IVORY,al*(1-.6*pass),'center','4px');
    if(pass>0)pen(0,0,1,.55*al*pass,sm(36.1+i*.12,36.7+i*.12,v),()=>{L([[xL-150,yy+4],[xL+150,yy+4]]);});
    T(b,xR,yy,'500 66px Fraunces',IVORY,al*(1-choose),'center','4px');if(choose>0)labG(b,xR,yy,al*choose,66);
    if(choose>0)orb(xR,yy,150,.22*choose*al);});
});
// =============== 0:39 · three times, an older brother wants him dead ===============
function pairs(v,P,loomT){P.forEach(([x,tv,a,b,n],i)=>{const al=ap(v,tv,.4);if(al<=.003)return;const loom=eio(sm(loomT,loomT+.8,v));
    const yx=x+(n>1?140:80);beam(yx-10,0,800,90,.22*al);
    fig(yx,860,i===1?1.06:.98,al,1,{pose:'stand',beard:i<2?'short':undefined,gear:'hair',seed:300+i,t:v},true);
    for(let k=0;k<n;k++)fig(x-60-k*46,860-k*6,1.08-k*.06,al*(1-.25*k),1,{pose:'stand',beard:'short',gear:'cloth',seed:310+i*5+k,lean:.04+.1*loom,armF:L2([30,-120],[40,-290],loom),handF:'grip',t:v});
    lab(a,x-60-(n-1)*23-(n>1?40:0),930,al,IVORY,30);labG(b,yx,930,al,30);});}
S(39.55,43.25,(v)=>{BGd();glow(960,600,900,.22);gline(860,140,1780,.45);
  pairs(v,[[400,39.5,'CAIN','ABEL',1],[940,40.3,'ESAU','JACOB',1],[1480,41.1,'HIS BROTHERS','JOSEPH',3]],41.6);
  T('THREE TIMES',960,230,'500 64px Fraunces',IVORY,ap(v,39.5,.3),'center','8px');
});
// =============== 0:43 · Genesis never says why ===============
S(43.25,47.35,(v)=>{BGd();glow(960,540,700,.26+.04*Math.sin(v*1.3));motes(v,.8,200,100,1500,880);
  enLine([['Genesis never says ',0],['why',1],['.',0]],960,470,86,ap(v,43.3,.4));
  T('The reason only comes centuries later,',960,610,'italic 400 54px Newsreader',IVORY,ap(v,44.9,.4),'center');
});
// =============== 0:47 · a camp in the valley, and 300 lights around it ===============
const CAMP=(()=>{const r=rng(907),o=[];for(let i=0;i<46;i++){const an=r()*Math.PI*2,rr=Math.sqrt(r());o.push([960+Math.cos(an)*560*rr,760+Math.sin(an)*95*rr,.08+r()*.05]);}return o.sort((p,q)=>p[1]-q[1]);})();
const RINGL=(()=>{const r=rng(911),o=[];for(let i=0;i<120;i++){const an=i/120*Math.PI*2+r()*.03;o.push([960+Math.cos(an)*(700+r()*30),760+Math.sin(an)*(150+r()*14),r()]);}return o;})();
function campScene(v,lights,o={}){starsF(v,.8);if(!o.chaos)moonF(1540,200,44,.85);
  pen(W/2,440,1,1,1,()=>{hills(1,{y:240,seed:3});});
  CAMP.forEach(([x,y,s],i)=>{const w=640*s,h=200*s;X.save();X.beginPath();X.moveTo(x-w/2,y);X.lineTo(x-w*.42,y-h*.55);X.lineTo(x-w*.22,y-h);X.quadraticCurveTo(x,y-h*.7,x+w*.22,y-h);X.lineTo(x+w*.42,y-h*.55);X.lineTo(x+w/2,y);X.closePath();X.fillStyle='#120d08';X.fill();X.strokeStyle='rgba(217,180,106,.6)';X.lineWidth=1.4;X.stroke();X.beginPath();X.moveTo(x-w*.22,y-h);X.lineTo(x-w*.22,y);X.moveTo(x+w*.22,y-h);X.lineTo(x+w*.22,y);X.stroke();X.restore();
    const fire=o.chaos?(.5+.5*Math.abs(Math.sin(v*7+i*1.3))):1;orb(x+w*.6,y-4,14*(o.chaos?1.8:1),(.22+.08*Math.sin(v*3+i))*fire);});
  const men=o.men??lights,fire=o.fire??lights;
  if(men>0)RINGL.forEach(([x0,y0,r],i)=>{const a=sm(i/120,i/120+.05,men);if(a<=.003)return;const x=960+(x0-960)*.82,y=y0;X.save();X.globalAlpha=a*.9;X.fillStyle='#d9b46a';X.fillRect(x-1.8,y-14,3.6,14);X.beginPath();X.arc(x,y-17,2.6,0,Math.PI*2);X.fill();X.restore();
    const f=o.sweep!==undefined?sm(i/120*.5+o.sweep,i/120*.5+o.sweep+.08,v):sm(i/120,i/120+.05,fire);if(f>0){const fl=.8+.2*Math.sin(v*11+i*1.7);orb(x+4,y-24,16,.8*f*fl);X.save();X.fillStyle=`rgba(255,236,190,${f})`;X.beginPath();X.moveTo(x+4,y-34);X.quadraticCurveTo(x+8,y-26,x+4,y-20);X.quadraticCurveTo(x,y-26,x+4,y-34);X.fill();X.restore();}});}
S(47.35,50.65,(v)=>{BGd();const z=1+.03*sm(47.35,50.65,v);X.save();X.translate(W/2,H/2);X.scale(z,z);X.translate(-W/2,-H/2);campScene(v,sm(48.45,49.9,v));X.restore();
  lab('300 MEN AROUND THE CAMP',960,980,ap(v,48.5,.4),GOLD,36);});
// =============== 0:50 · not one of them holding a sword ===============
S(50.65,52.95,(v)=>{BGd();glow(960,520,620,.3);starsF(v,.5);gline(900,560,1360,.5);
  soldier(960,900,1.6,v);
  T('Not one of them',960,180,'italic 400 64px Newsreader',IVORY,ap(v,50.85,.35),'center');
  enLine([['is holding a ',0],['sword',1],['.',0]],960,270,64,ap(v,51.5,.35));
});
// =============== 0:53 · two offerings ===============
S(52.95,58.55,(v)=>{BGd();glow(960,620,760,.26);gline(900,300,1620,.5);
  fig(700,900,1.25,1,sm(53.0,54.2,v),{pose:'kneel',beard:'short',gear:'cloth',seed:91,armF:[96,-96],handF:'grip',armB:[86,-88],handB:'grip',t:v});
  pen(700+120*1.25,900-110*1.25,1.25,1,sm(53.2,54.2,v),()=>{for(let k=-4;k<=4;k++)L([[k*5,40],[k*12,-60]]);L([[-26,4],[26,4]]);});
  pen(1150,900,.95,1,sm(53.4,54.4,v),()=>sheepR({t:v,seed:3}));
  fig(1300,900,1.25,1,sm(53.4,54.6,v),{pose:'kneel',beard:'short',gear:'hair',seed:92,armF:[110,-76],handF:'open',t:v},true);
  lab('CAIN',700,980,ap(v,53.5,.4),IVORY,32);labG('ABEL',1300,980,ap(v,53.6,.4),32);
  gloss('the older',700,1030,ap(v,53.5,.4)*.85,34);gloss('the younger',1300,1030,ap(v,53.6,.4)*.85,34);
  const acc=ap(v,56.0,.7);beam(1220,0,840,210,.34*acc);orb(1180,760,90,.5*acc);
});
// =============== 0:58 · out in the field ===============
const vK=C('kills him',60);
S(58.55,63.5,(v)=>{BGd();glow(1000,640,760,.22);
  pen(W/2,660,1,.8,1,()=>{wheatF(v,.5,{seed:31,n:60});});gline(900,200,1720,.55);
  const rise=sm(60.2,60.9,v),strike=eio(sm(vK-.4,vK+.1,v)),fall=sm(vK-.05,vK+.55,v);
  beam(1180,0,860,160,.3*(1-fall));orb(1180,700,70,.35*(1-fall));
  fig(1180,900,1.3,1-.55*fall,1,{pose:'prost',k:fall,beard:'short',gear:'hair',seed:92,t:v},true);
  if(rise<1)fig(820,900,1.3,1-rise,1,{pose:'kneel',beard:'short',gear:'cloth',seed:91,t:v});
  if(rise>0)fig(lerp(820,940,eio(rise)),900,1.3,rise,1,{pose:'stand',beard:'short',gear:'cloth',seed:91,lean:.08+.2*strike,armF:L2([40,-160],[150,-210],strike),handF:'grip',t:v});
  lab('CAIN',880,980,ap(v,60.25,.4),IVORY,32);labG('ABEL',1180,980,ap(v,58.7,.4)*(1-.5*fall),32);
  const c1=ap(v,vK+.5,.35);bigNum('1',1560,520,c1,130);gloss('the first',1560,620,c1,38);
});
// =============== 1:03 · Isaac over Ishmael; Rebekah's twins ===============
const vIsP=C('isaac is picked',64),vIsh=C('ishmael',66),vTw=C('twins',68),vReb=C('rebecca',72),vRab=C('the word for older',78);
S(63.5,vTw-.1,(v)=>{BGd();glow(960,600,820,.24);gline(900,280,1640,.5);
  const A=ap(v,63.6,.5);
  fig(720,900,1.2,A,sm(63.6,64.8,v),{pose:'stand',beard:'short',gear:'cloth',seed:501,t:v});
  fig(1200,900,1.2,A,sm(63.9,65.0,v),{pose:'stand',beard:'short',gear:'hair',seed:502,t:v},true);
  const lit=ap(v,vIsP,.6);beam(1190,0,860,170,.3*lit);orb(1190,620,90,.35*lit);
  lab('ISHMAEL',720,970,ap(v,vIsh,.4),IVORY,32);labG('ISAAC',1200,970,ap(v,vIsP,.4),32);
  gloss('the older',720,1022,ap(v,vIsh,.4)*.85,34);gloss('the younger',1200,1022,ap(v,vIsP+.4,.4)*.85,34);
});
S(vTw-.1,vRab-.05,(v)=>{BGd();glow(960,640,760,.3+.04*Math.sin(v));motes(v,.8,400,250,1100,700);gline(940,520,1400,.5);
  fig(960,940,1.45,1,sm(vTw-.1,vTw+1,v),{pose:'stand',female:1,gear:'shawl',seed:101,armF:[34,-150],handF:'open',armB:[24,-140],handB:'open',t:v});
  const tw=ap(v,vTw+.3,.6);orb(985,940-1.45*150,46,.55*tw);orb(1010,940-1.45*140,40,.5*tw);gloss('twins, not yet born',1320,700,tw*(1-sm(vReb+.3,vReb+.6,v)),40);
  lab('REBEKAH',960,1010,ap(v,vReb-.2,.4),IVORY,32);
  vTop(ap(v,vReb+.5,.4),'GENESIS 25:23','וְרַב יַעֲבֹד צָעִיר',['וְרַב','צָעִיר'],[[['“The ',0],['older',1],[' will serve the ',0],['younger',1],['.”',0]]],{hs:78});
});
// =============== 1:19 · רַב — "older" … and an army sent home ===============
const vArmy=C('about an army',82),vSent=C('gets sent home',85),vLov=C('isaac loves esau',87);
S(vRab-.05,vLov-.05,(v)=>{BGd();glow(960,420,640,.3);
  T('GENESIS 25:23',960,170,'300 36px Fraunces',GOLD,ap(v,vRab+.3,.4),'center','6px');keyW('רַב','“older”',960,340,ap(v,vRab+.3,.4),{hs:190,gy:150});
  const ar=ap(v,vArmy,.5);crowd(v,ar,{y0:760,y1:960,gone:(i,k)=>k<.9?sm(vSent+k*.4,vSent+.6+k*.4,v):0});
  gloss('centuries later, about an army…',960,680,ar*(1-sm(vSent,vSent+.4,v)),40);
});
// =============== 1:28 · Isaac loves Esau, Rebekah loves Jacob; the stew ===============
const vRL=C('while rebecca loves',90),vStew=C('bowl of stew',95),vMeans=C('still means to give',98);
S(vLov-.05,vMeans-.3,(v)=>{const giv=eio(sm(vStew-.4,vStew+1.0,v));BGd();glow(960,600,860,.24);gline(900,160,1760,.5);
  pen(420,900,1.25,1,sm(vLov,vLov+1,v),()=>{figure({pose:'chair',seatH:58,beard:'long',gear:'cloth',seed:601,t:v});X.save();X.globalAlpha*=.8;L([[-40,-58],[40,-58]]);L([[-34,-58],[-34,0]]);L([[34,-58],[34,0]]);X.restore();});
  fig(640,900,1.2,1,sm(vLov+.3,vLov+1.3,v),{pose:'stand',beard:'short',gear:'hair',seed:602,armF:giv>.6?[70,-118]:[24,-60],handF:'open',t:v});
  fig(1320,900,1.2,1,sm(vRL,vRL+1,v),{pose:'stand',female:1,gear:'shawl',seed:603,t:v},true);
  fig(1040,900,1.15,1,sm(vRL+.2,vRL+1.2,v),{pose:'stand',beard:'short',gear:'cloth',seed:604,armF:giv>0&&giv<1?[70,-120]:[24,-60],handF:'open',t:v},true);
  dotArc(470,620,640,560,60,ap(v,vLov+.6,.4),sm(vLov+.6,vLov+1.4,v));dotArc(1300,560,1110,580,60,ap(v,vRL+.6,.4),sm(vRL+.6,vRL+1.4,v));
  lab('ISAAC',420,970,ap(v,vLov,.4),IVORY,30);lab('ESAU',640,970,ap(v,vLov+.3,.4),IVORY,30);gloss('the firstborn',640,1018,ap(v,vLov+1.5,.4)*.85,32);
  labG('JACOB',1040,970,ap(v,vRL+.4,.4),30);lab('REBEKAH',1320,970,ap(v,vRL,.4),IVORY,30);
  const st=giv,sa=ap(v,vStew-.5,.3);
  pen(lerp(1040-1.15*70,640+1.2*70,st),760-40*Math.sin(Math.PI*st),1.1,sa,1,()=>bowlP(v));
  if(sa>0){const bx=lerp(640,1040,st);labG('BIRTHRIGHT',bx,440-50*Math.sin(Math.PI*st),sa*sm(vStew,vStew+.5,v),34);}
});
// =============== 1:38 · the blessing: goatskin hands ===============
const vHairy=C('esau is a hairy',100),vGoat=C('goatskin',103),vFeels=C('isaac feels those',105),vInst=C('blesses jacob instead',107),vCry=C('when esau finds out',109);
S(vMeans-.3,vCry-.05,(v)=>{BGd();glow(980,620,760,.28);gline(900,300,1640,.5);
  const bedL=(x)=>{X.save();X.globalAlpha*=.8;L([[-280,-58],[42,-58]]);L([[-270,-58],[-270,0]]);L([[34,-58],[34,0]]);L([[-282,-58],[-282,-150]]);X.restore();};
  const fe=eio(sm(vFeels,vFeels+.8,v)),jx=1080,hx=jx-1.15*110,hy=900-1.15*112;
  pen(800,900,1.35,1,sm(vMeans-.3,vMeans+.9,v),()=>{figure({pose:'chair',seatH:58,beard:'long',gear:'cloth',seed:611,lean:.08+.12*fe,armF:L2([56,-88],[(hx-800)/1.35+6,(hy-900)/1.35],fe),handF:'open',t:v});bedL();});
  X.save();X.lineWidth=2.4;X.restore();
  const bind=sm(vGoat-.4,vGoat+.9,v),gk=sm(vGoat,vGoat+.8,v);
  fig(jx,900,1.15,1,sm(vHairy,vHairy+1,v),{pose:'kneel',beard:'short',gear:'cloth',seed:612,armF:[110,-112],handF:'open',armB:[100,-104],handB:'open',t:v},true);
  if(gk>0){X.save();X.globalAlpha*=gk;X.strokeStyle=GL;X.lineWidth=1.8;const r=rng(77);for(let i=0;i<54;i++){const a=r()*Math.PI*2,d=r()*30;const x=hx+Math.cos(a)*d,y=hy+Math.sin(a)*d*.7;X.beginPath();X.moveTo(x,y);X.lineTo(x+5*(r()-.5),y-8);X.stroke();}X.restore();}
  // Rebekah steps in, binds the skins on his hands, then steps back
  const rx=lerp(1400,1240,sm(vGoat-1,vGoat-.4,v))+lerp(0,160,sm(vGoat+1.2,vGoat+2,v));
  fig(rx,900,1.2,ap(v,vGoat-1.2,.5),1,{pose:'stand',female:1,gear:'shawl',seed:613,lean:.2*bind*(1-sm(vGoat+1.2,vGoat+2,v)),armF:L2([20,-80],[(rx-hx)/1.2-10,(hy-900)/1.2+6],bind*(1-sm(vGoat+1.2,vGoat+2,v))),handF:'open',t:v},true);
  ringA(hx,hy,62,48,ap(v,vFeels+.4,.35),sm(vFeels+.4,vFeels+1,v));
  lab('ISAAC',800,970,ap(v,vMeans,.4),IVORY,30);gloss('can’t see',800,1018,ap(v,vMeans,.4)*.85,36);labG('JACOB',jx,970,ap(v,vHairy,.4),30);lab('REBEKAH',rx+60,1018,ap(v,vGoat-.8,.4),IVORY,30);
  labG('HAIRY HANDS',hx,940,ap(v,vFeels+.5,.4)*(1-sm(vInst+.8,vInst+1.2,v)),30);
  beam(jx,0,820,160,.3*ap(v,vInst,.6));
});
// =============== 1:49 · Esau's cry: בְּכֹרָתִי / בִּרְכָתִי ===============
const vTook=C('he took',111),vTwins=C('almost twins',119),vSwap=C('swap two letters',122),vBirth=C('birthright becomes',123),vBoth=C('both belong',125),vBoth2=C('both went to the',126),vPlan=C('so esau makes a plan',128);
S(vCry-.05,vTwins-.6,(v)=>{BGd();glow(960,640,700,.26);gline(900,560,1360,.5);
  fig(960,900,1.4,1,sm(vCry,vCry+1,v),{pose:'stand',beard:'short',gear:'hair',seed:602,lean:-.05,armF:[60,-250],handF:'open',armB:[-50,-250],handB:'open',t:v});
  lab('ESAU',960,970,ap(v,vCry,.4),IVORY,32);
  vTop(ap(v,vTook-.1,.35),'GENESIS 27:36','אֶת־בְּכֹרָתִי לָקָח וְהִנֵּה עַתָּה לָקַח בִּרְכָתִי',['אֶת־בְּכֹרָתִי','בִּרְכָתִי'],[[['“He took my ',0],['birthright',1],[', and now he has taken my ',0],['blessing',1],['.”',0]]],{es:46});
});
function letters(v,y,swapU,a){const L5=['ב','כ','ר','ת','י'],gap=150,x0=960+2*gap;
  L5.forEach((ch,i)=>{let x=x0-i*gap,yy=y;let gold=false;
    if(i===1||i===2){const to=i===1?x0-2*gap:x0-gap;const u=eio(swapU);x=lerp(x,to,u);yy=y-(i===1?1:-1)*110*Math.sin(Math.PI*u);gold=swapU>0;}
    heb(ch,x,yy,170,a,{gold:gold?{[ch]:0}:{},t:9});});}
S(vTwins-.6,vPlan-.05,(v)=>{BGd();glow(960,520,760,.3);
  keyW('בְּכֹרָתִי','“my birthright”',1320,290,ap(v,vTwins-.5,.4),{hs:92,gy:86,gs:42,gold:false});keyW('בִּרְכָתִי','“my blessing”',600,290,ap(v,vTwins-.3,.4),{hs:92,gy:86,gs:42,gold:false});
  letters(v,700,sm(vSwap+.4,vSwap+1.6,v),ap(v,vTwins+.4,.4));
  T(v<vBirth+.3?'birthright':'blessing',960,880,'italic 400 54px Newsreader',IVORY,ap(v,vTwins+.6,.4),'center');
  const bt=ap(v,vBoth,.4);if(bt>0){enLine([['Both belonged to the ',0],['firstborn',1],['.',0]],960,980,44,bt*(1-sm(vBoth2-.2,vBoth2+.1,v)));enLine([['Both went to the ',0],['younger',1],['.',0]],960,980,44,ap(v,vBoth2,.3));}
});
// =============== 2:08 · Esau's plan ===============
const vSecond=C('now a second',136),vRun=C('jacob runs for his',139);
S(vPlan-.05,vRun-.05,(v)=>{BGd();glow(760,600,700,.22);gline(900,200,1720,.5);
  const cl=eio(sm(C('then i will kill',132),C('then i will kill',132)+.8,v));fig(600,900,1.5,1,sm(vPlan,vPlan+1,v),{pose:'stand',beard:'short',gear:'hair',seed:602,lean:.08+.1*cl,armF:L2([40,-150],[70,-230],cl),handF:'grip',t:v});
  gline(822,1240,1820,.4);fig(lerp(1460,1640,sm(vSecond,vRun,v)),820,.6,ap(v,vPlan+.6,.6),1,{pose:'walk',ph:v*5,beard:'short',gear:'cloth',seed:604,t:v});
  lab('ESAU',600,975,ap(v,vPlan,.4),IVORY,32);labG('JACOB',lerp(1460,1640,sm(vSecond,vRun,v)),868,ap(v,vPlan+.6,.4),28);
  vTop(ap(v,C('the days of mourning',129),.35),'GENESIS 27:41','וְאַהַרְגָה אֶת־יַעֲקֹב אָחִי',['וְאַהַרְגָה'],[[['“…and then I will ',0],['kill',1],[' my brother Jacob.”',0]]]);
  const sc=ap(v,vSecond,.4);if(sc>0){bigNum('2',960,560,sc,130);gloss('a second older brother',960,660,sc,38);}
});
// =============== 2:20 · Jacob runs to Laban ===============
const vFlip=C('the pattern flips',142),vDau=C('laban has two daughters',144);
S(vRun-.05,vDau-.05,(v)=>{BGd();starsF(v,.35);glow(960,640,800,.2);
  pen(W/2,640,1,.9,1,()=>{hills(1,{y:240,seed:7});});gline(900,0,1920,.5);
  const u=(v-vRun)/(vFlip+1.5-vRun);fig(lerp(380,1380,clamp(u)),900,1.15,1,1,{pose:'walk',ph:v*5.2,beard:'short',gear:'cloth',seed:604,t:v});
  pen(1600,900,.5,1,sm(vRun+.8,vRun+2,v),()=>{const P=new Path2D();P.moveTo(-340,0);P.lineTo(-300,-170);P.quadraticCurveTo(0,-280,300,-170);P.lineTo(340,0);X.save();X.fillStyle='#120d08';X.fill(P);X.restore();X.stroke(P);});
  lab('LABAN’S HOUSE',1600,970,ap(v,vRun+1,.4),IVORY,28);
  const fl=ap(v,vFlip,.4);if(fl>0)T('THE PATTERN FLIPS',960,230,'500 56px Fraunces',GOLD,fl,'center','8px');
});
// =============== 2:25 · Leah and Rachel; Laban's excuse ===============
const vLeah=C('leah the older',146),vRach=C('and rachel the younger',147),vLoves=C('whom jacob loves',149),vTrick=C('but laban tricks',151),vAround=C('around here',155),vSees=C('but god sees that leah',164);
S(vDau-.05,vSees-.05,(v)=>{BGd();glow(960,620,860,.24);gline(900,240,1680,.5);
  fig(560,900,1.25,1,sm(vDau,vDau+1,v),{pose:'stand',beard:'long',gear:'cloth',seed:701,t:v});
  const wk=sm(vTrick,vTrick+2.6,v),lx=lerp(1100,1340,eio(wk));
  fig(820,900,1.12,1-.35*wk,sm(vRach-.2,vRach+.8,v),{pose:'stand',female:1,gear:'shawl',seed:703,t:v});
  fig(lx,900,1.15,1,sm(vLeah-.2,vLeah+.8,v),{pose:wk>0&&wk<1?'walk':'stand',ph:v*4.5,female:1,gear:'veil',seed:702,t:v});
  fig(1480,900,1.2,1,sm(vLoves-.3,vLoves+.7,v),{pose:'stand',beard:'short',gear:'cloth',seed:604,t:v},true);
  dotArc(1450,560,840,600,80,ap(v,vLoves,.4)*(1-sm(vTrick,vTrick+.4,v)),sm(vLoves,vLoves+.9,v));
  lab('LABAN',560,970,ap(v,vDau,.4),IVORY,30);lab('LEAH',lx,970,ap(v,vLeah,.4),IVORY,30);gloss('the older',lx,1018,ap(v,vLeah+.2,.4)*.85,32);
  labG('RACHEL',820,970,ap(v,vRach,.4),30);gloss('the younger',820,1018,ap(v,vRach+.4,.4)*.85,32);lab('JACOB',1480,970,ap(v,vLoves,.4),IVORY,30);
  gloss('veiled, she is given to Jacob first',1200,430,ap(v,vTrick+.8,.4)*(1-sm(vAround-.3,vAround,v)),36);
  vTop(ap(v,vAround,.35),'GENESIS 29:26','לֹא־יֵעָשֶׂה כֵן בִּמְקוֹמֵנוּ לָתֵת הַצְּעִירָה לִפְנֵי הַבְּכִירָה',['הַצְּעִירָה'],[[['“It is not done in our place, to give the ',0],['younger',1],[' before the firstborn.”',0]]],{es:46,hs:60});
});
// =============== 2:44 · God sees Leah; Judah ===============
const vWomb=C('opens her womb',167),vJudah=C('comes judah',169),vDavid=C('king david',171),vPick=C('who picks the younger',173),vSides=C('who sides with the older',176),vFav=C('isaac favored esau',179);
S(vSees-.05,vFav-.05,(v)=>{BGd();glow(900,620,800,.26);gline(900,240,1680,.5);
  const cr=sm(vWomb,vWomb+.8,v);fig(900,900,1.3,1,sm(vSees-.1,vSees+.9,v),{pose:'stand',female:1,gear:'veil',seed:702,armF:L2([40,-120],[44,-176],cr),handF:'open',armB:L2([30,-112],[34,-168],cr),handB:'open',t:v});
  const lit=ap(v,vSees+.3,.7);beam(900,0,860,190,.32*lit);
  if(v>vWomb+.2)pen(900+1.3*40,900-1.3*186,1.3,ap(v,vWomb+.2,.5),1,()=>{X.scale(.5,.5);babyR();});
  lab('LEAH',900,970,ap(v,vSees,.4),IVORY,32);
  vTop(ap(v,vSees+.4,.35)*(1-sm(vPick-.4,vPick-.1,v)),'GENESIS 29:31','כִּי־שְׂנוּאָה לֵאָה',['כִּי־שְׂנוּאָה'],[[['“…that Leah was ',0],['unloved',1],['.”',0]]],{hs:76});
  const jd=ap(v,vJudah,.4);labG('JUDAH',1400,520,jd,44);gloss('the tribe of',1400,600,ap(v,vDavid-.4,.4),36);labG('KING DAVID',1400,660,ap(v,vDavid,.4),40);
  if(jd>0)dotArc(980,700,1360,560,60,jd,sm(vJudah,vJudah+.8,v));
  const pk=ap(v,vPick,.4);if(pk>0){band(pk,250);enLine([['Jacob picks the ',0],['younger',1],['.',0]],960,110,52,pk);enLine([['God sides with the ',0],['older',1],[', the one Jacob passed over.',0]],960,200,52,ap(v,vSides,.4));}
});
// =============== 2:59 · the two fathers' favorites ===============
const vCant=C('so it cant be only',184),vJF=C('jacob favored rachel',180),vBothT=C('both times god went',182),vHisOwn=C('a favorite of his own',190),vPay=C('about to pay for it',193),vJos=C('its joseph',195);
S(vFav-.05,vJos-.05,(v)=>{BGd();glow(960,540,860,.22);
  const xL=640,xR=1280,y0=330;const hd=ap(v,vFav,.4);
  lab('FAVORED',xL,y0-100,hd*.85,'rgba(240,228,205,.85)',32);labG('GOD WENT TO',xR,y0-100,ap(v,vBothT,.4),32);
  pen(0,0,1,.4*hd,sm(vFav,vFav+.8,v),()=>{L([[xL-280,y0-60],[xR+280,y0-60]]);L([[960,y0-80],[960,y0+230]]);});
  [['ESAU','by Isaac','JACOB',vFav],['RACHEL','by Jacob','LEAH',vJF]].forEach(([a,by,b,tv],i)=>{const y=y0+30+i*170,al=ap(v,tv,.4);T(a,xL,y,'500 66px Fraunces',IVORY,al,'center','4px');gloss(by,xL,y+60,al*.85,36);labG(b,xR,y,ap(v,vBothT+.3+i*.3,.4),66);});
  gloss('…so it can’t be only about who was born second.',960,800,ap(v,vCant,.4)*(1-sm(vHisOwn-.4,vHisOwn,v)),44);
  const hb=ap(v,vHisOwn,.5);gloss('And Jacob now has a favorite of his own:',960,800,hb,46);
  labG('JOSEPH',960,900,ap(v,vPay,.4),48);
});
// =============== 3:15 · Joseph and his brothers ===============
const vHate=C('the brothers hate him',200),vFar=C('coming from far off',203),vCome=C('come lets kill him',205),vAlone=C('cain did it alone',207),vEsauA=C('esau planned it alone',208),vGroup=C('whole group of brothers',211),vSell=C('they sell him as a slave',213);
S(vJos-.05,vAlone-.05,(v)=>{BGd();glow(960,600,860,.22);pen(W/2,640,1,.7,1,()=>{hills(1,{y:240,seed:11});});gline(900,0,1920,.5);
  const jx=lerp(1560,1380,clamp((v-vFar)/4));pen(jx,900,.95,ap(v,vJos,.5),1,()=>{flipF({pose:'walk',ph:v*5,gear:'hair',seed:801,t:v});X.save();X.globalAlpha*=.8;X.lineWidth=2.4;for(let k=0;k<5;k++)L([[-24,-40-k*28],[26,-46-k*28]]);X.restore();});
  orb(jx,900-.95*200,80,.45*ap(v,vJos,.5));labG('JOSEPH',jx,975,ap(v,vJos,.4),32);gloss('his father’s favorite',jx,1022,ap(v,vJos+.6,.4)*.85,36);
  for(let k=0;k<10;k++){const x=220+k*88+(k%2)*16,y=900-(k%2)*14;fig(x,y,(1.05-(k%2)*.1)*(1-.04*(k%3)),ap(v,vHate-.4+k*.06,.5)*(k%2?.8:1),1,{pose:'stand',beard:k%3?'short':'long',gear:['cloth','hair','cap'][k%3],seed:810+k,lean:.05*sm(vFar,vFar+1,v),t:v});}
  lab('HIS BROTHERS',620,975,ap(v,vHate,.4),IVORY,32);const c3=ap(v,vCome+.9,.35);bigNum('3',960,560,c3,130);gloss('the third time',960,660,c3,38);
  vTop(ap(v,vCome-.1,.35),'GENESIS 37:20','לְכוּ וְנַהַרְגֵהוּ',['וְנַהַרְגֵהוּ'],[[['“Come, let’s ',0],['kill',1],[' him.”',0]]],{hs:80});
});
S(vAlone-.05,vSell-.05,(v)=>{BGd();glow(960,600,900,.22);gline(860,120,1800,.45);
  const P=[[360,vAlone,'CAIN',1],[860,vEsauA,'ESAU',1],[1460,vGroup,'THE BROTHERS',10]];
  P.forEach(([x,tv,nm,n],i)=>{const al=ap(v,tv,.4);if(al<=.003)return;
    for(let k=0;k<n;k++){const xx=n>1?x-250+(k%5)*110+(k>4?50:0):x,yy=n>1?860-(k>4?30:0):860,sc=n>1?(k>4?.78:.85):1.05;fig(xx,yy,sc,al*(k>4?.7:1),1,{pose:'stand',beard:'short',gear:['cloth','hair','cap'][k%3],seed:820+i*10+k,t:v});}
    lab(nm,x,930,al,IVORY,30);gloss(n>1?'together':'alone',x,980,al*.85,34);});
});
// =============== 3:33 · sold as a slave; years later ===============
const vSurv=C('joseph survives',215),vYears=C('and years later',217),vGrabs=C('the one who grabs',221);
S(vSell-.05,vYears-.05,(v)=>{BGd();glow(960,620,800,.2);pen(W/2,640,1,.7,1,()=>{hills(1,{y:240,seed:13});});gline(900,0,1920,.5);
  const u=clamp((v-vSell)/(vYears-vSell));
  pen(lerp(700,1150,u)+300,900,1.0,1,1,()=>camelR({walk:1,ph:v*4,t:v}));
  fig(lerp(560,1010,u),900,1.05,1,1,{pose:'walk',ph:v*5,beard:'short',gear:'cap',seed:830,t:v});
  fig(lerp(420,870,u),900,.8,1,1,{pose:'walk',ph:v*5+1,gear:'hair',seed:801,t:v});
  pen(0,0,1,.7,1,()=>{L([[lerp(420,870,u)+20,900-.8*150],[lerp(560,1010,u)-20,900-1.05*150]]);});
  labG('JOSEPH',lerp(420,870,u),970,ap(v,vSell,.4),28);gloss('sold as a slave',lerp(420,870,u),1018,ap(v,vSell+.4,.4)*.85,32);
  T('BUT JOSEPH SURVIVES',960,230,'500 56px Fraunces',IVORY,ap(v,vSurv,.4),'center','7px');
});
// =============== 3:37 · back in the room: Manasseh and Ephraim (Gen 48) ===============
const vBoys=C('those two boys are his sons',223),vMan=C('manasseh the older',225),vEph=C('and ephraim',226),vLands=C('right hand lands on',228),vVih=CE('lands on ephraim',228),vTries=C('when joseph tries',233),vIKnow=C('i know my son',235),vToo=C('he too will be great',238),vFool=C('isaac was fooled',242);
S(vYears-.05,vMan-.3,(v)=>{BGd();motes(v,.8,500,200,1000,700);
  tableau(v,{draw:1,boys:1,u:0,jos:sm(vYears,vYears+1,v),labels:[0,0,0]});
  labG('JOSEPH',990+1.3*(1500-1240),1015,ap(v,vYears+.5,.4),30);lab('JACOB',990+1.3*(1200-1240),1015,ap(v,vGrabs,.4),IVORY,30);
  gloss('years later: the father of the two boys',960,170,ap(v,vYears+.4,.4),44);
});
S(vMan-.3,vTries-.2,(v)=>{BGd();motes(v,.8,300,100,1300,800);
  frontScene(v,{u:sm(vLands-.3,vLands+1.4,v),n1:ap(v,vMan-.2,.4),lRight:ap(v,vLands,.35),ring:ap(v,vLands+1.2,.35),ringP2:sm(vLands+1.2,vLands+1.8,v),beam:ap(v,vLands+1.2,.6)});
  if(v>=vVih-.4)vTop(ap(v,vVih-.4,.35),'GENESIS 48:14','וְהוּא הַצָּעִיר',['הַצָּעִיר'],[[['“…though he was the ',0],['younger',1],['.”',0]]],{hs:80});
});
S(vTries-.2,vFool-.05,(v)=>{BGd();motes(v,.8,500,200,1000,700);
  tableau(v,{u:1,boys:1,jos:1,grab:eio(sm(vTries,vTries+.9,v)),tug:Math.exp(-Math.max(0,v-vTries-.9)*1.2),labels:[0,1,1],names:['MANASSEH','EPHRAIM'],ring:1,beam:1});
  labG('JOSEPH',1470,640,1,30);
  if(v>=vIKnow-.2&&v<vToo)vTop(ap(v,vIKnow-.2,.35),'GENESIS 48:19','יָדַעְתִּי בְנִי יָדַעְתִּי',['יָדַעְתִּי'],[[['“',0],['I know',1],[', my son, ',0],['I know',1],['.”',0]]],{hs:72});
  if(v>=vToo)vTop(ap(v,vToo,.35),'GENESIS 48:19','גַּם־הוּא יִגְדָּל וְאוּלָם אָחִיו הַקָּטֹן יִגְדַּל מִמֶּנּוּ',['הַקָּטֹן'],[[['“He too will be great, but his ',0],['little brother',1],[' will be greater than he.”',0]]],{es:46,hs:60});
});
// =============== 4:02 · hands, then and now ===============
const vEither=C('cant see either',244),vOnly=C('the only one in the room',247),vSide=C('stand side by side',252),vNobody=C('nobody wants anybody dead',253),vNever=C('but jacob never says why',255);
S(vFool-.05,vNever-.05,(v)=>{BGd();
  if(v<vSide-.1){
    X.save();X.translate(-520,40);
    pen(800,900,1.2,1,1,()=>{figure({pose:'chair',seatH:58,beard:'long',gear:'cloth',seed:611,lean:.18,armF:[(965-800)/1.2,(784-900)/1.2],handF:'open',t:v});X.save();X.globalAlpha*=.8;L([[-280,-58],[42,-58]]);L([[-270,-58],[-270,0]]);L([[34,-58],[34,0]]);X.restore();});
    fig(1080,900,1.05,1,1,{pose:'kneel',beard:'short',gear:'cloth',seed:612,armF:[110,-110],handF:'open',armB:[100,-100],handB:'open',t:v},true);
    ringA(965,784,56,44,ap(v,vFool,.35),sm(vFool,vFool+.7,v));X.restore();
    lab('ISAAC',280,1010,ap(v,vFool,.4),IVORY,30);labG('YOUNG JACOB',560,1010,ap(v,vFool,.4),30);gloss('fooled by a pair of hands',480,180,ap(v,vFool+.3,.4)*.95,40);
    pen(0,0,1,.35,1,()=>L([[960,240],[960,1000]]));
    X.save();X.translate(1440,560);X.scale(.5,.5);X.translate(-960,-560);frontScene(v,{u:1,ring:ap(v,vOnly,.35),ringP2:sm(vOnly,vOnly+.7,v),beam:ap(v,vOnly,.6)});X.restore();
    lab('OLD JACOB',1440,1010,ap(v,vEither,.4),IVORY,30);gloss('knows exactly what he’s doing',1440,180,ap(v,vOnly+.5,.4)*.95,40);
  } else {
    glow(960,620,760,.3);gline(900,500,1420,.5);
    fig(880,900,1.05,1,1,{pose:'stand',gear:'hair',seed:162,t:v});fig(1040,900,1.05,1,1,{pose:'stand',gear:'hair',seed:163,t:v},true);
    beam(960,0,860,220,.3*ap(v,vSide,.6));lab('MANASSEH',840,970,ap(v,vSide,.4),IVORY,28);labG('EPHRAIM',1080,970,ap(v,vSide,.4),28);
    gloss('side by side',960,1020,ap(v,vNobody,.4)*.9,34);}
});
// =============== 4:15 · the question; a man from Manasseh ===============
const vAns=C('the answer comes centuries',258),vTribe=C('the tribe of manasseh',261),vDidnt=C('didnt get the right hand',263),vGid=C('his name is gideon',265);
S(vNever-.05,vGid-.05,(v)=>{BGd();glow(960,560,760,.26);motes(v,.9,200,100,1500,880);
  enLine([['Jacob never says ',0],['why',1],[' he crossed his hands.',0]],960,420,70,ap(v,vNever,.4)*(1-sm(vAns-.2,vAns+.2,v)));
  gloss('The answer comes centuries later…',960,300,ap(v,vAns,.4),50);
  const ma=ap(v,vTribe,.5);fig(960,900,1.25,ma,sm(vTribe,vTribe+1.2,v),{pose:'stand',gear:'hair',seed:162,t:v});
  lab('MANASSEH',960,970,ma,IVORY,32);gloss('the older boy, without the right hand',960,1020,ap(v,vDidnt,.4)*.85,34);
});
// =============== 4:25 · Gideon in the winepress ===============
const vMid=C('midian is crushing',268),vAngel=C('an angel finds him',270),vThresh=C('threshing wheat',272),vClan=C('my clan is the poorest',276),vAlfi=C('in hebrew the word he uses',280);
S(vGid-.05,vAlfi-.05,(v)=>{BGd();glow(1000,620,820,.26);gline(900,200,1720,.5);
  const beat=Math.max(0,Math.sin(v*5.5)),gd=sm(vGid,vGid+1,v);
  fig(1120,1040,1.15,1,gd,{pose:'stand',beard:'short',gear:'cap',seed:901,lean:.16+.08*beat,armF:[96,-150-60*beat],handF:'grip',armB:[78,-158-60*beat],handB:'grip',t:v},true);
  pen(1120-1.15*100,1040-1.15*(156+60*beat),1.15,1,1,()=>L([[0,0],[-46,100]]));
  // the pit: its near wall hides his legs; wheat on the floor
  X.save();X.fillStyle='#0b0907';X.fillRect(840,900,560,190);X.restore();pen(0,0,1,1,gd,()=>{L([[860,900],[860,1080]]);L([[1380,900],[1380,1080]]);X.save();X.globalAlpha*=.4;for(let i=0;i<6;i++)L([[880+i*90,940],[900+i*90,1060]]);X.restore();});
  pen(0,0,1,.7,gd,()=>{for(let i=0;i<16;i++){const x=900+i*7;Q([x,900],[x-4,860],[x-10,830]);}});
  const an=ap(v,vAngel,.6);pen(500,900,1.25,an,1,treeP);fig(560,900,1.2,an,1,{pose:'chair',seatH:50,beard:'short',gear:'cloth',seed:902,t:v});pen(0,0,1,an,1,()=>{const P=smoothP([[500,900],[506,850],[560,836],[612,850],[620,900]]);RIM([P],{bb:[500,836,620,900]});});orb(570,640,170,.45*an);
  labG('GIDEON',1120,560,ap(v,vGid,.4),32);lab('AN ANGEL',560,975,ap(v,vAngel,.4),IVORY,30);gloss('threshing wheat in a winepress, hiding from Midian',1120,500,ap(v,vThresh+.4,.4)*.9*(1-sm(vClan-.4,vClan-.1,v)),36);
  vTop(ap(v,vClan-.1,.35),'JUDGES 6:15','הִנֵּה אַלְפִּי הַדַּל בִּמְנַשֶּׁה וְאָנֹכִי הַצָּעִיר בְּבֵית אָבִי',['אַלְפִּי','הַצָּעִיר'],[[['“My ',0],['clan',1],[' is the poorest in Manasseh,',0]],[['and I am the ',0],['youngest',1],[' in my father’s house.”',0]]],{es:46,hs:58});
});
// =============== 4:40 · אַלְפִּי and הַצָּעִיר ===============
const vThou=C('my thousand',285),vYst=C('and the youngest is',287),vSame=C('the same word god used',289),vComeBack=C('those two words come back',296),vArmy2=C('gideon needs an army',301);
S(vAlfi-.05,vArmy2-.6,(v)=>{BGd();glow(960,460,820,.28);motes(v,.8,200,100,1500,880);
  const al=sm(vAlfi+.9,vAlfi+1.6,v);T('JUDGES 6:15',960,170,'300 36px Fraunces',GOLD,1,'center','6px');
  keyW('אַלְפִּי','',lerp(960,1320,eio(al)),lerp(330,420,eio(al)),1,{hs:lerp(110,150,eio(al))});gloss('literally: “my thousand”',1320,550,ap(v,vThou-.3,.4),46);gloss('“my clan”',lerp(960,1320,eio(al)),lerp(440,550,eio(al)),1-sm(vThou-.6,vThou-.3,v),40);
    keyW('הַצָּעִיר','',600,420,ap(v,vYst,.4),{hs:150});gloss('“the youngest”',600,550,ap(v,vYst,.4),46);
  gloss('the same word God used for Jacob (Genesis 25:23)',600,640,ap(v,vSame,.4)*.9,36);
  gloss('Both words come back at the very end.',960,900,ap(v,vComeBack,.4),46);
});
// =============== 5:00 · 32,000 men; רַב הָעָם ===============
const vGath=C('he gathers',303),vRav=C('god tells him',305),vSameW=C('its the same word god said',309),vMeantO=C('for the twins it meant',314),vMany=C('it means many',316),vBigger=C('its the bigger side',319),vSend=C('starts sending it home',321),v22=C('22 000 leave',323);
S(vArmy2-.6,vSameW-.05,(v)=>{BGd();glow(960,700,900,.2);gline(960,160,1760,.4);
  crowd(v,ap(v,vArmy2-.5,.8),{y0:600,y1:940});bigNum('32,000',960,470,ap(v,vGath+.2,.4),120);
  vTop(ap(v,vRav,.35),'JUDGES 7:2','רַב הָעָם',['רַב'],[[['“The people are ',0],['too many',1],['.”',0]]],{hs:84});
});
S(vSameW-.05,v22-.05,(v)=>{BGd();glow(960,380,760,.3);
  crowd(v,.55,{y0:700,y1:960,gone:(i,k)=>k<.3?sm(vSend+k*2,vSend+.8+k*2,v):0});
  keyW('רַב','',960,300,1,{hs:200});const mo=sm(vMany-.7,vMany-.3,v);
  T(mo<.5?'GENESIS 25:23 · for the twins':'JUDGES 7:2 · for an army',960,140,'300 34px Fraunces',GOLD,1,'center','6px');
  gloss('“older”',960,440,(1-mo)*ap(v,vMeantO,.3),58);enLine([['“',0],['many',1],['”',0]],960,440,64,mo);
  enLine([['Either way, it’s the ',0],['bigger side',1],['…',0]],960,560,50,ap(v,vBigger,.4));gloss('and God starts sending it home.',960,630,ap(v,vSend,.4),46);
});
// =============== 5:23 · 22,000 leave; still too many; the water; 300 ===============
const v10=C('with 10 000 left',325),vOd=C('god says it again',327),vWater=C('tests them at the water',331),vLap=C('300 lap the water',333),vKneel=C('kneel down to drink',336),vKeeps=C('god keeps the 300',337),vValley=C('down in the valley',341),vLoc=C('like locusts',343),vHands=C('then gideon hands out',344);
S(v22-.05,vWater-.05,(v)=>{BGd();glow(960,700,900,.2);gline(960,160,1760,.4);
  crowd(v,1,{y0:600,y1:940,gone:(i,k)=>k<.6875?sm(v22+k*1.2,v22+.8+k*1.2,v):0});
  const n=v<v22+.4?'32,000':(v<v10?'22,000 LEAVE':'10,000 LEFT');bigNum(n,960,470,1,n.length>7?90:120);
  vTop(ap(v,vOd,.35),'JUDGES 7:4','עוֹד הָעָם רָב',['עוֹד','רָב'],[[['“The people are ',0],['still too many',1],['.”',0]]],{hs:84});
});
S(vWater-.05,vValley-.05,(v)=>{BGd();glow(960,640,860,.22);
  X.save();X.strokeStyle='rgba(217,180,106,.5)';X.lineWidth=2;for(let k=0;k<4;k++){X.beginPath();for(let x=0;x<=W;x+=20){const y=940+k*18+6*Math.sin(x*.01+v*1.5+k);x?X.lineTo(x,y):X.moveTo(x,y);}X.stroke();}X.restore();
  for(let k=0;k<9;k++){const x=180+k*190,lap=k===2||k===6;const al=ap(v,vWater+.2+k*.08,.4);
    if(lap){fig(x,920,.95,al,1,{pose:'stand',beard:'short',gear:'cap',seed:950+k,lean:.12,armF:[34,-270],handF:'open',t:v});orb(x+30,920-.95*270,40,.5*ap(v,vLap,.5));}
    else fig(x,920,.95,al*(1-.6*sm(vKeeps,vKeeps+.6,v)),1,{pose:'kneel',beard:'short',gear:'cloth',seed:950+k,lean:.9,armF:[70,-20],handF:'open',t:v});}
  labG('300',960,250,ap(v,vLap,.4),90);gloss('lap the water from their hands',960,330,ap(v,vLap+.4,.4),40);
  gloss('the rest kneel down to drink',960,400,ap(v,vKneel,.4)*.85,36);
  T('GOD KEEPS THE 300',960,520,'500 48px Fraunces',GOLD,ap(v,vKeeps,.4),'center','7px');
});
S(vValley-.05,vHands-.05,(v)=>{BGd();campScene(v,0);gloss('like locusts',960,980,ap(v,vLoc,.4),44);lab('MIDIAN',960,920,ap(v,vValley+.4,.4),IVORY,34);});
// =============== 5:44 · the weapons ===============
const vSho=C('gets a shofar',348),vJar=C('empty clay jar',351),vTorch=C('with a torch hidden',352),vNight=C('in the middle of the night',354),vSurr=C('they surround the camp',356),vSmash=C('smash the jars',358),vLeft=C('torches in their left',360),vRight=C('the shofars in their right',361),vHFull=C('both hands are full',363),vNoSw=C('not one of them is holding',364),vShout=C('they shout',366),vNoCh=C('nobody charges',369),vInside=C('inside it god turns',374),vTold=C('god had told gideon',377);
S(vHands-.05,vNight-.05,(v)=>{BGd();glow(960,560,860,.26);gline(860,320,1600,.45);
  const s1=.25+.75*ap(v,vSho-.2,.4),s2=.25+.75*ap(v,vJar,.4),s3=.25+.75*ap(v,vTorch,.4);T('THE WEAPONS',960,230,'500 52px Fraunces',IVORY,ap(v,vHands,.4),'center','8px');
  pen(560,820,2.6,s1,1,shofarP);labG('SHOFAR',560,920,ap(v,vSho-.2,.4),36);gloss('a horn to blow',560,970,ap(v,vSho+.6,.4)*.85,34);
  pen(960,840,2.4,s2,1,jarP);labG('CLAY JAR',960,920,ap(v,vJar,.4),36);gloss('empty',960,970,ap(v,vJar,.4)*.85,34);
  flame(v,960,840-2.4*72,1.0,s3*ap(v,vTorch,.4));torchF(v,1360,720,1.3,s3);labG('TORCH',1360,920,ap(v,vTorch,.4),36);gloss('hidden inside the jar',1360,970,ap(v,vTorch,.4)*.85,34);
});
S(vNight-.05,vLeft-.3,(v)=>{BGd();const z=1+.04*sm(vNight,vLeft,v);X.save();X.translate(W/2,H/2);X.scale(z,z);X.translate(-W/2,-H/2);campScene(v,0,{men:sm(vSurr,vSurr+1.4,v),fire:0,sweep:v>=vSmash?vSmash:undefined});X.restore();
  gloss('the middle of the night',960,200,ap(v,vNight,.4)*(1-sm(vSmash-.3,vSmash,v)),46);lab('THE JARS SMASH',960,200,ap(v,vSmash,.3),GOLD,40);
});
S(vLeft-.3,vShout-.05,(v)=>{BGd();glow(960,520,620,.3);starsF(v,.5);gline(900,560,1360,.5);
  soldier(960,900,1.6,v);
  const l=ap(v,vLeft,.4),r=ap(v,vRight,.4);labG('TORCH',1300,330,l,32);gloss('in his left hand',1300,380,l*.9,36);
  labG('SHOFAR',1330,560,r,32);gloss('in his right hand',1330,610,r*.9,36);
  T('BOTH HANDS FULL',960,980,'500 44px Fraunces',IVORY,ap(v,vHFull,.4),'center','7px');
  enLine([['Not one of them is holding a ',0],['sword',1],['.',0]],960,180,56,ap(v,vNoSw,.4));
});
S(vShout-.05,vInside-.05,(v)=>{BGd();campScene(v,1,{men:1,fire:1});
  const sh=ap(v,vShout,.35);if(sh>0){band(sh,230);T('JUDGES 7:20',W/2,58,'300 42px Fraunces',GOLD,sh,'center','6px');enLine([['“A ',0],['sword',1],[' for God and for Gideon!”',0]],W/2,150,60,sh);}
  gloss('Nobody charges. Each man stands in his place.',960,980,ap(v,vNoCh,.4),44);
});
S(vInside-.05,vTold-.05,(v)=>{BGd();const z=1.15;X.save();X.translate(W/2,H*.72);X.scale(z,z);X.translate(-W/2,-760);campScene(v,1,{chaos:true,men:1,fire:1});X.restore();
  const r=rng(1501);for(let i=0;i<9;i++){const x=560+r()*800,y=600+r()*200,ph=r()*6,sw=Math.sin(v*7+ph);X.save();X.strokeStyle='rgba(255,230,170,.95)';X.lineWidth=3;X.shadowColor='rgba(255,200,120,.9)';X.shadowBlur=14;X.lineCap='round';
    X.beginPath();X.moveTo(x-34,y+20);X.lineTo(x+10+8*sw,y-24);X.moveTo(x+34,y+20);X.lineTo(x-10-8*sw,y-24);X.stroke();X.restore();orb(x,y-20,26,.35*(.5+.5*Math.abs(sw)));}
  band(ap(v,vInside,.35),190);T('JUDGES 7:22',W/2,84,'300 42px Fraunces',GOLD,ap(v,vInside,.35),'center','6px');enLine([['“…God set every man’s ',0],['sword',1],[' against his fellow, through all the camp.”',0]],W/2,160,46,ap(v,vInside,.35));
});
// =============== 6:17 · the reason: "my own hand saved me" ===============
const vYadi=C('and say',384),vMyOwn=C('my own hand saved me',386),vNobody2=C('nobody in that army',388),vLight=C('full of light and noise',391),vBack=C('now go back to jacobs',394);
S(vTold-.05,vNobody2-.05,(v)=>{BGd();glow(960,540,760,.3+.04*Math.sin(v));motes(v,.8,200,100,1500,880);
  gloss('God had told Gideon why, before the first man went home:',960,330,ap(v,vTold,.4)*(1-sm(vYadi-.3,vYadi,v)),46);
  vFull(ap(v,vYadi,.4),'JUDGES 7:2','יָדִי הוֹשִׁיעָה לִּי',['יָדִי'],[[['“My own ',0],['hand',1],[' saved me.”',0]]],{hs:110,es:62,cy:330});
  const up=eio(sm(vYadi,vYadi+1.2,v)),cl=sm(vMyOwn+.6,vMyOwn+1.3,v);
  pen(0,0,1,ap(v,vYadi,.5),1,()=>{const y0=lerp(1260,860,up),cx=960;const arm=smoothP([[cx-52,1200],[cx-50,y0+40],[cx-46,y0],[cx+46,y0],[cx+50,y0+40],[cx+52,1200]]);
    const palm=smoothP([[cx-58,y0+6],[cx-62,y0-60],[cx-40,y0-96],[cx+40,y0-96],[cx+62,y0-56],[cx+56,y0+6]]);const P=[arm,palm];
    const fl=lerp(120,30,cl);[-42,-14,14,42].forEach((dx,i)=>{const h=fl*(i===0||i===3?.82:1);P.push(limbP([cx+dx,y0-90],[cx+dx*1.06,y0-90-h],13,11));});
    P.push(limbP([cx-58,y0-30],[lerp(cx-120,cx-40,cl),lerp(y0-90,y0-70,cl)],14,12));RIM(P,{bb:[cx-140,y0-220,cx+80,y0+60],fill:'#1d140a'});});
  if(cl>0)orb(960,760,160,.25*cl);
});
S(vNobody2-.05,vBack-.05,(v)=>{BGd();glow(960,520,620,.32);starsF(v,.5);gline(900,560,1360,.5);
  const z=1+.05*sm(vNobody2,vNobody2+5,v);X.save();X.translate(960,700);X.scale(z,z);X.translate(-960,-700);soldier(960,900,1.6,v);X.restore();
  enLine([['Their hands were full of ',0],['light and noise',1],['.',0]],960,180,56,ap(v,vLight,.4));
});
// =============== 6:34 · back to Jacob's crossed hands ===============
const vFirstW=C('when the firstborn wins',397),vYoungW=C('when the younger one wins',401),vWhose=C('whose hand it was',404),vCent=C('and centuries after gideon',405);
S(vBack-.05,vCent-.05,(v)=>{BGd();motes(v,.8,500,200,1000,700);
  frontScene(v,{u:1,n1:1,ring:ap(v,vBack+.4,.35),ringP2:sm(vBack+.4,vBack+1.1,v),beam:ap(v,vWhose,.8),lRight:ap(v,vBack+.2,.35)});
  const a1=ap(v,vFirstW,.4)*(1-sm(vYoungW-.3,vYoungW,v));if(a1>0){band(a1,220);enLine([['When the firstborn wins, it can look like ',0],['his own hand',1],[' did it.',0]],960,120,48,a1);}
  const a2=ap(v,vYoungW,.4);if(a2>0){band(a2,260);enLine([['When the ',0],['younger',1],[' one wins, or the ',0],['unloved',1],[' one,',0]],960,110,48,a2);enLine([['everyone knows ',0],['whose hand',1],[' it was.',0]],960,190,48,ap(v,vWhose-.4,.4));}
});
// =============== 6:45 · Isaiah takes the two words ===============
const vIsa=C('the prophet isaiah',408),vTwoW=C('those same two words',409),vProm=C('makes them a promise',412),vFinal=C('the little one will become',419),vHeb=CE('to his people',414)+.35;
S(vCent-.05,vHeb-.05,(v)=>{BGd();glow(960,500,820,.28);motes(v,.9,200,100,1500,880);
  const u=eio(sm(vTwoW+.4,vTwoW+2.4,v));
  const mf=sm(vIsa-.2,vIsa+.3,v);
  keyW(mf<.5?'אַלְפִּי':'אֶלֶף',mf<.5?'“my thousand”':'“thousand”',lerp(1320,1180,u),lerp(420,470,u),ap(v,vCent+.3,.4),{hs:120,gy:110});
  keyW('הַצָּעִיר','“the youngest”',lerp(600,740,u),lerp(420,470,u),ap(v,vCent+.3,.4),{hs:120,gy:110});
  T(mf<.5?'JUDGES 6:15 · GIDEON’S TWO WORDS':'ISAIAH 60:22',960,250,'300 40px Fraunces',GOLD,ap(v,vCent+.3,.4),'center','7px');
  gloss('…a promise to His people',960,760,ap(v,vProm,.4),48);
});
// =============== 6:52 · the final verse, alone (Isaiah 60:22) ===============
S(vHeb-.05,999,(v)=>{BGd();glow(960,520,900,.3+.05*Math.sin(v*.7));motes(v,.6,200,100,1500,880);
  T('ISAIAH 60:22',W/2,300,'300 44px Fraunces',GOLD,ap(v,vHeb,.5),'center','7px');
  heb('הַקָּטֹן יִהְיֶה לָאֶלֶף וְהַצָּעִיר לְגוֹי עָצוּם',W/2,450,96,1,{t:v,t0:vHeb+.15,step:(vFinal-vHeb-.6)/6,gold:{'לָאֶלֶף':vFinal+1.6,'וְהַצָּעִיר':vFinal+2.9}});
  enLine([['“The little one will become a ',0],['thousand',1],[',',0]],W/2,610,58,ap(v,vFinal,.5));enLine([['and the ',0],['youngest',1],[' a mighty nation.”',0]],W/2,690,58,ap(v,C('and the youngest a mighty',421),.5));
});

// ---------- render ----------
let GR=[],VIG;
function drawAt(t){const v=t-PRE;X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.shadowBlur=0;X.setLineDash([]);
  BGd();for(const s of SH){if(v<s.a||v>=s.b)continue;X.save();LIGHT=[.55,-.83];LIGHTPOS=null;try{s.f(Math.max(0,v));}catch(e){console.error('shot',s.a,e.message);}X.restore();}}
window.renderFrame=t=>{drawAt(t);X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;if(VIG)X.drawImage(VIG,0,0);if(GR.length)X.drawImage(GR[Math.floor(t*24)%3],0,0);};
window.SHOTS=SH;window.CUE=C;
Promise.all(['500 40px "Frank Ruhl Libre"','300 30px Fraunces','400 30px Fraunces','500 30px Fraunces','italic 400 40px Newsreader'].map(f=>document.fonts.load(f,'אב Ab'))).then(()=>{
  for(let k=0;k<3;k++){const [g,gx]=mk(W,H);const r=rng(9+k);gx.globalAlpha=.04;for(let i=0;i<2200;i++){gx.fillStyle=r()<.5?'#000':'#fff';gx.fillRect(r()*W,r()*H,1+r()*1.6,1+r()*1.6);}GR.push(g);}
  const [vv,vx]=mk(W,H);const vg=vx.createRadialGradient(W/2,H/2,H*.42,W/2,H/2,W*.66);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.6)');vx.fillStyle=vg;vx.fillRect(0,0,W,H);VIG=vv;
  window.READY=true;});
window.DUR=DUR;
