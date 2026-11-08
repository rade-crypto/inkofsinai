// ================= motion + type kit (v2) =================
// word index of a phrase in the VO
function CI(ph,after=0){const q=norm(ph);for(let i=0;i<WDS.length;i++){if(WDS[i][0]<after-4)continue;let ok=true;for(let j=0;j<q.length;j++){if(!WW[i+j]||WW[i+j]!==q[j]){ok=false;break;}}if(ok)return i;}console.warn('ci?',ph,after);window.MISS=(window.MISS||[]).concat([ph]);return 0;}
// kinetic line: every displayed word appears on its spoken word. Tokens map 1:1 to VO words from the cue. *word* = gold, | = new line
function kin(disp,cue,after,x,y,size,v,o={}){const i0=CI(cue,after);const lines=disp.split('|').map(l=>l.trim().split(/\s+/));const lh=size*(o.lh||1.25);let k=o.skip||0;
  X.save();X.font=o.font||`italic 400 ${size}px Newsreader`;if(o.ls)X.letterSpacing=o.ls;X.textBaseline='middle';X.textAlign='left';
  lines.forEach((ws,li)=>{const toks=ws.map(w=>{const g=w.includes('*');const s=w.replace(/\*/g,'').replace(/_/g,' ');const t=WDS[i0+k]?WDS[i0+k][0]:0;k++;return {s,g,t};});
    const sp=X.measureText(' ').width;const wd=toks.map(t=>X.measureText(t.s).width);const tot=wd.reduce((a,b)=>a+b,0)+sp*(toks.length-1);let xx=x-tot/2;const yy=y+(li-(lines.length-1)/2)*lh;
    toks.forEach((t,j)=>{const u=sm(t.t-.08,t.t+.26,v)*(o.a??1);if(u>0){X.globalAlpha=u;const dy=(1-eo(u))*size*.2;
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
