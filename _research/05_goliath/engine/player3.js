(function(){
const W=1920,H=1080,PRE=0.5,SPL=22.50,INS=1.10;
const T=t=>PRE+t+(t>=SPL?INS:0);
const END_T=T(182.28)+0.75; window.DUR=END_T+0.25;
const IVORY='#efe6d4',GOLD='#d9b46a',GL='#f6dc98';
const clamp=v=>Math.max(0,Math.min(1,v)),sm=(a,b,t)=>{const x=clamp((t-a)/(b-a));return x*x*(3-2*x)},eo=x=>1-Math.pow(1-clamp(x),3),lerp=(a,b,k)=>a+(b-a)*k;
const ease=x=>0.5-0.5*Math.cos(Math.PI*clamp(x));
const eob=x=>{x=clamp(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
const cv=document.getElementById('c'),X=cv.getContext('2d');
const IM={},OI={};let GRN=[],FOG=null,DOT=null,EMB=null;
let rs=1;const rnd=()=>{rs=(rs*16807)%2147483647;return rs/2147483647;};
const gg=(x0,y0,x1,y1)=>{const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'#a8741f');g.addColorStop(.35,'#f6dc98');g.addColorStop(.55,'#c9952f');g.addColorStop(1,'#f0cf7c');return g;};
const gv=(y0,y1)=>{const g=X.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'#fff0c4');g.addColorStop(.5,'#e9bb67');g.addColorStop(1,'#b07a33');return g;};

// ---------- text ----------
function TX(s,x,y,font,col,a,al='center',ls='0px'){if(a<=0.003)return;X.save();X.globalAlpha=clamp(a);X.font=font;X.letterSpacing=ls;X.fillStyle=col;X.textAlign=al;X.textBaseline='middle';X.fillText(s,x,y);X.restore();}
const NF=s=>s.normalize('NFC');
function gtime(map,w,occ){if(!map)return undefined;const n=NF(w);let v;for(const k in map)if(NF(k)===n){v=map[k];break;}if(v===undefined)return undefined;
 if(Array.isArray(v)){const c=occ[n]||0;occ[n]=c+1;return v[Math.min(c,v.length-1)];}return v;}
// Hebrew line, words fade in one by one (right to left) and turn gold at their spoken time
function heb(s,x,y,size,a,o={}){if(a<=0.003)return;X.save();X.font=`500 ${size}px "Frank Ruhl Libre"`;X.direction='rtl';X.textAlign='right';X.textBaseline='middle';
 const ws=s.split(' '),sp=X.measureText(' ').width*1.1,wd=ws.map(w=>X.measureText(w).width),tot=wd.reduce((p,q)=>p+q,0)+sp*(ws.length-1);let xr=x+tot/2;const occ=o.occ||{};
 ws.forEach((w,i)=>{const st=o.step??.05,wa=o.t0!==undefined?sm(o.t0+i*st,o.t0+i*st+.3,o.t):1;const gt=gtime(o.gold,w,occ),gk=gt!==undefined?sm(gt-.05,gt+.25,o.t):(o.allGold?1:0);
  X.globalAlpha=clamp(a*wa*(1-gk));X.fillStyle=o.col||IVORY;X.fillText(w,xr,y);
  if(gk>0){X.globalAlpha=clamp(a*wa*gk);X.fillStyle=gg(xr-wd[i],y-size/2,xr,y+size/2);X.shadowColor='rgba(240,180,80,.8)';X.shadowBlur=18;X.fillText(w,xr,y);X.shadowBlur=0;}
  xr-=wd[i]+sp;});X.restore();return tot;}
function eng(s,x,y,size,a,o={}){if(a<=0.003)return;X.save();X.font=`italic 400 ${size}px Newsreader`;X.textBaseline='middle';
 const ws=s.split(' '),sp=X.measureText(' ').width,tw=X.measureText(s).width;let xx=x-tw/2;const occ=o.occ||{};
 ws.forEach(w=>{const key=w.toLowerCase().replace(/[^a-z]/g,'');const ht=gtime(o.hot,key,occ),hk=ht!==undefined?sm(ht-.05,ht+.25,o.t):0;
  X.globalAlpha=clamp(a);X.fillStyle=hk>0?`rgb(${lerp(239,246,hk)},${lerp(230,214,hk)},${lerp(212,140,hk)})`:IVORY;X.shadowColor='rgba(240,180,80,.75)';X.shadowBlur=14*hk;X.fillText(w,xx,y);xx+=X.measureText(w).width+sp;});X.restore();}
function wrap(txt,font,maxW,rtl){X.save();X.font=font;if(rtl)X.direction='rtl';const ws=txt.split(' '),out=[];let cur='';ws.forEach(w=>{const tt=cur?cur+' '+w:w;if(X.measureText(tt).width>maxW&&cur){out.push(cur);cur=w;}else cur=tt;});out.push(cur);X.restore();return out;}
// gold Hebrew word card with an English gloss and reference, written on right-to-left
function wordCard(t,ton,he,en,ref,cx,cy,size,a0){const k=t-ton;if(k<0)return;const a=(a0??1)*clamp(k/0.18);const p=eo(k/0.55);
 X.save();const sw=size*4.2,sh=size*2.9;const sg=X.createRadialGradient(cx,cy+size*.25,10,cx,cy+size*.25,sw*.62);sg.addColorStop(0,`rgba(4,3,2,${.8*a})`);sg.addColorStop(.6,`rgba(4,3,2,${.55*a})`);sg.addColorStop(1,'rgba(4,3,2,0)');X.fillStyle=sg;X.fillRect(cx-sw,cy-sh,sw*2,sh*2);
 X.font=`500 ${size}px "Frank Ruhl Libre"`;X.direction='rtl';X.textAlign='center';X.textBaseline='middle';const tw=X.measureText(he).width;
 X.beginPath();const ex=cx+tw/2+40-(tw+80)*p;X.rect(ex,cy-size,cx+tw/2+60-ex,size*2);X.clip();
 X.globalAlpha=a;X.fillStyle=gv(cy-size*.55,cy+size*.55);X.shadowColor='rgba(240,170,70,.7)';X.shadowBlur=26;X.fillText(he,cx,cy);X.restore();
 if(p<1){X.save();X.globalCompositeOperation='lighter';const gx=cx+tw/2-(tw)*p;const gr=X.createRadialGradient(gx,cy,0,gx,cy,size*.6);gr.addColorStop(0,`rgba(255,236,190,${.6*Math.sin(Math.PI*p)})`);gr.addColorStop(1,'rgba(255,220,150,0)');X.fillStyle=gr;X.fillRect(gx-size,cy-size,size*2,size*2);X.restore();}
 const ea=a*sm(ton+.25,ton+.6,t);if(en)TX(en,cx,cy+size*.78,`italic 400 ${Math.round(size*.34)}px Newsreader`,IVORY,ea);
 if(ref)TX(ref,cx,cy+size*.78+size*.42,'300 28px Fraunces',GOLD,ea,'center','5px');}

// ---------- verse banners (VO times) ----------
const BN=[
 {a:25.02,b:27.24,ref:'1 SAMUEL 17:6',he:'וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו',en:'and a bronze “forehead” on his legs',gold:{'וּמִצְחַת':25.74},hot:{forehead:25.74},hs:68,es:46},
 {a:35.06,b:43.20,ref:'1 SAMUEL 17:5–6',he:'וְכוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ … וּמִשְׁקַל הַשִּׁרְיוֹן חֲמֵשֶׁת־אֲלָפִים שְׁקָלִים נְחֹשֶׁת / וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו וְכִידוֹן נְחֹשֶׁת בֵּין כְּתֵפָיו',
  en:'A bronze helmet on his head … the coat weighed five thousand shekels of bronze / a bronze “forehead” on his legs, and a bronze javelin between his shoulders',gold:{'נְחֹשֶׁת':[36.18,39.34,40.34,41.94]},hot:{bronze:[36.18,39.34,40.34,41.94]},hs:58,es:42},
 {a:43.20,b:46.00,ref:'1 SAMUEL 17:7',he:'וְלַהֶבֶת חֲנִיתוֹ שֵׁשׁ־מֵאוֹת שְׁקָלִים בַּרְזֶל',en:'and his spearhead weighed six hundred shekels of iron',gold:{'בַּרְזֶל':44.54},hot:{iron:44.54},hs:64,es:44},
 {a:55.12,b:62.80,ref:'NUMBERS 21:9',he:'וַיַּעַשׂ מֹשֶׁה נְחַשׁ נְחֹשֶׁת וַיְשִׂמֵהוּ עַל־הַנֵּס',en:'Moses made a serpent of bronze and set it on a pole',gold:{'נְחַשׁ':59.06,'נְחֹשֶׁת':59.80},hot:{serpent:60.98,bronze:61.60},hs:64,es:44},
 {a:68.76,b:72.90,ref:'1 SAMUEL 17:5',he:'וְשִׁרְיוֹן קַשְׂקַשִּׂים הוּא לָבוּשׁ',en:'and he was dressed in a coat of scales',gold:{'קַשְׂקַשִּׂים':71.60},hot:{scales:69.74},hs:68,es:46},
 {a:72.90,b:75.44,ref:'LEVITICUS 11:9',he:'כֹּל אֲשֶׁר־לוֹ סְנַפִּיר וְקַשְׂקֶשֶׂת בַּמַּיִם',en:'everything in the water that has fins and scales',gold:{'וְקַשְׂקֶשֶׂת':73.96},hot:{scales:73.96},hs:68,es:46},
 {a:78.52,b:82.60,ref:'EZEKIEL 29:3',he:'פַּרְעֹה מֶלֶךְ־מִצְרַיִם הַתַּנִּים הַגָּדוֹל הָרֹבֵץ בְּתוֹךְ יְאֹרָיו',en:'Pharaoh, king of Egypt, the great dragon lying in the midst of his rivers',gold:{'הַתַּנִּים':80.80},hot:{dragon:80.80},hs:62,es:42},
 {a:82.60,b:86.12,ref:'EZEKIEL 29:4',he:'וְהִדְבַּקְתִּי דְגַת־יְאֹרֶיךָ בְּקַשְׂקְשֹׂתֶיךָ',en:'and I will make the fish of your rivers stick to your scales',gold:{'בְּקַשְׂקְשֹׂתֶיךָ':84.46},hot:{scales:84.90},hs:66,es:44},
 {a:97.36,b:100.16,ref:'GENESIS 3:14',he:'עַל־גְּחֹנְךָ תֵלֵךְ וְעָפָר תֹּאכַל',en:'On your belly you will go, and dust you will eat',gold:{'עַל־גְּחֹנְךָ':98.24,'וְעָפָר':99.18},hot:{belly:98.24,dust:99.18},hs:68,es:46},
 {a:100.16,b:105.52,ref:'GENESIS 3:15',he:'וּבֵין זַרְעֲךָ וּבֵין זַרְעָהּ הוּא יְשׁוּפְךָ רֹאשׁ',en:'and between your offspring and hers. They will strike your head',gold:{'רֹאשׁ':102.36},hot:{head:104.72},hs:66,es:44},
 {a:109.38,b:114.40,ref:'1 SAMUEL 17:16',he:'וַיִּגַּשׁ הַפְּלִשְׁתִּי הַשְׁכֵּם וְהַעֲרֵב וַיִּתְיַצֵּב אַרְבָּעִים יוֹם',en:'The Philistine came out morning and evening and took his stand, forty days',gold:{'אַרְבָּעִים':110.16,'יוֹם':110.82,'הַשְׁכֵּם':113.26,'וְהַעֲרֵב':113.88},hot:{forty:111.60,days:111.80,morning:113.26,evening:113.88},hs:60,es:42},
 {a:114.40,b:117.10,ref:'1 SAMUEL 17:8',he:'בְּרוּ־לָכֶם אִישׁ וְיֵרֵד אֵלָי',en:'Choose a man for yourselves, and let him come down to me',gold:{'אִישׁ':115.88},hot:{man:115.88},hs:68,es:46},
 {a:119.76,b:122.50,ref:'1 SAMUEL 17:24',he:'וְכֹל אִישׁ יִשְׂרָאֵל בִּרְאוֹתָם אֶת־הָאִישׁ וַיָּנֻסוּ מִפָּנָיו',en:'All the men of Israel, when they saw the man, fled from him',gold:{'וַיָּנֻסוּ':121.54},hot:{fled:121.54},hs:62,es:44},
 {a:129.02,b:130.98,ref:'1 SAMUEL 17:35',he:'וַיָּקָם עָלַי וְהֶחֱזַקְתִּי בִּזְקָנוֹ',en:'It rose against me, and I grabbed it by its beard',gold:{'בִּזְקָנוֹ':130.02},hot:{beard:130.02},hs:68,es:46},
 {a:135.06,b:138.26,ref:'1 SAMUEL 17:6',he:'וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו',en:'and a bronze “forehead” on his legs',gold:{'וּמִצְחַת':137.30,'נְחֹשֶׁת':137.70},hot:{forehead:135.28},hs:68,es:46},
 {a:151.00,b:156.70,ref:'1 SAMUEL 17:49',he:'וַיַּךְ אֶת־הַפְּלִשְׁתִּי אֶל־מִצְחוֹ וַתִּטְבַּע הָאֶבֶן בְּמִצְחוֹ',en:'He struck the Philistine on his forehead, and the stone sank into his forehead',gold:{'אֶל־מִצְחוֹ':152.16,'בְּמִצְחוֹ':155.50},hot:{forehead:[153.34,155.70]},hs:62,es:44},
 {a:163.58,b:169.16,ref:'1 SAMUEL 17:49',he:'וַיִּפֹּל עַל־פָּנָיו אָרְצָה',en:'and he fell on his face to the ground',gold:{'וַיִּפֹּל':164.68,'עַל־פָּנָיו':165.30,'אָרְצָה':165.88},hot:{fell:167.00,face:167.62,ground:168.32},hs:72,es:48},
];
const conv=m=>{if(!m)return m;const o={};for(const k in m)o[k]=Array.isArray(m[k])?m[k].map(T):T(m[k]);return o;};
BN.forEach(b=>{b.t0=T(b.a);b.t1=T(b.b);b.g=conv(b.gold);b.h=conv(b.hot);});
const BC={};
function banner(t,B){const a=Math.min(sm(B.t0,B.t0+.3,t),1-sm(B.t1-.12,B.t1,t));if(a<=0.003)return;
 const hs=B.hs||60,es=B.es||42,mw=1640,k=B.ref+B.a;
 if(!BC[k])BC[k]={h:B.he.split(' / ').flatMap(s=>wrap(s,`500 ${hs}px "Frank Ruhl Libre"`,mw,true)),e:B.en.split(' / ').flatMap(s=>wrap(s,`italic 400 ${es}px Newsreader`,mw,false))};
 const L=BC[k],lh=hs*1.42,le=es*1.32,tot=34+L.h.length*lh+10+L.e.length*le;const y0=H-60-tot;
 X.save();const bg=X.createLinearGradient(0,y0-150,0,H);bg.addColorStop(0,'rgba(4,3,2,0)');bg.addColorStop(.28,`rgba(4,3,2,${.62*a})`);bg.addColorStop(.55,`rgba(4,3,2,${.82*a})`);bg.addColorStop(1,`rgba(4,3,2,${.9*a})`);X.fillStyle=bg;X.fillRect(0,y0-150,W,H-y0+150);X.restore();
 let yy=y0+12;TX(B.ref,W/2,yy,'300 28px Fraunces',GOLD,a,'center','5px');yy+=22+lh*0.5;
 const occ={};L.h.forEach((ln,i)=>{heb(ln,W/2,yy,hs,a,{t,t0:B.t0+i*.15,gold:B.g,step:.045,occ});yy+=lh;});
 yy+=10-lh*0.5+le*0.5;const oc2={};L.e.forEach(ln=>{eng(ln,W/2,yy,es,a*sm(B.t0+.15,B.t0+.5,t),{t,hot:B.h,occ:oc2});yy+=le;});}

// ---------- shot list (VO times) ----------
const S=(a,b,im,z0,z1,f0,f1,o)=>({a,b,k:'img',im,z0,z1,f0,f1,o:o||{}});
const G=(a,b,k,o)=>({a,b,k,o:o||{}});
const SH=[
 S(0.00,3.06,'s10',1.00,1.14,[.5,.46],[.5,.36],{fx:['dust'],rg:[[0.30,.51,.33,105]]}),
 S(3.06,3.44,'s06',1.12,1.18,[.55,.25],[.55,.22],{wh:1,tick:1}),
 S(3.44,3.82,'s07',1.05,1.12,[.5,.5],[.5,.45],{wh:-1,tick:1}),
 S(3.82,4.18,'n11',1.00,1.08,[.5,.45],[.5,.4],{wh:1,tick:1}),
 S(4.18,4.54,'s08',1.05,1.12,[.5,.4],[.5,.35],{wh:-1,tick:1}),
 S(4.54,7.64,'s10',1.04,1.00,[.5,.5],[.5,.5],{fx:['dust'],arm:'open',tick:1}),
 S(7.64,10.58,'s02',1.00,1.16,[.5,.5],[.54,.46],{fx:['sweep'],wc:[[9.05,'נְחֹשֶׁת','bronze','1 SAMUEL 17:5',960,500,190]]}),
 S(10.58,13.44,'s03',1.00,1.12,[.5,.58],[.5,.62],{fx:['dust'],wh:1,wc:[[11.95,'נָחָשׁ','serpent','GENESIS 3:1',960,280,190]]}),
 G(13.44,17.60,'G1'),
 S(17.60,19.98,'n11',1.00,1.16,[.5,.62],[.5,.36],{fx:['dust','sweep']}),
 G(19.98,25.02,'FH'),
 S(25.02,27.24,'n11',1.10,1.18,[.5,.3],[.5,.26],{fx:['sweep'],rg:[[25.74,.50,.20,150]]}),
 S(27.24,31.40,'s05',1.00,1.08,[.5,.45],[.5,.38],{fx:['dust'],tk:0}),
 S(31.40,33.74,'n06',1.00,1.20,[.52,.42],[.52,.36],{fx:['slow'],ret:[31.60,.52,.355]}),
 S(33.74,35.40,'s01',1.00,1.07,[.5,.5],[.5,.44],{fx:['dust'],tk:1,tke:35.06}),
 S(35.40,37.30,'s06',1.15,1.26,[.55,.24],[.55,.2],{fx:['sweep'],wh:1}),
 S(37.30,40.20,'s07',1.00,1.12,[.5,.45],[.5,.38],{fx:['sweep'],wh:-1}),
 S(40.20,41.70,'n11',1.00,1.12,[.5,.4],[.5,.32],{fx:['dust'],wh:1}),
 S(41.70,43.20,'s08',1.05,1.16,[.5,.35],[.5,.28],{fx:['sweep'],wh:-1}),
 S(43.20,46.00,'s09',1.00,1.14,[.5,.4],[.5,.32],{fx:['cool'],wh:1}),
 S(46.00,48.04,'s01',1.12,1.20,[.5,.36],[.5,.32],{fx:['dust']}),
 S(48.04,52.32,'s10',1.04,1.00,[.5,.5],[.5,.5],{fx:['dust'],arm:'x4'}),
 S(52.32,55.12,'s12',1.00,1.16,[.5,.5],[.5,.4],{fx:['sweep','dust'],wh:1}),
 S(55.12,58.62,'n01',1.00,1.12,[.5,.4],[.44,.36],{fx:['embers','haze']}),
 S(58.62,62.80,'s11',1.00,1.14,[.5,.32],[.5,.24],{fx:['embers'],wh:1}),
 S(62.80,64.78,'s13',1.00,1.10,[.5,.5],[.45,.45],{fx:['sweep']}),
 S(64.78,66.88,'s13',1.35,1.48,[.45,.35],[.5,.3],{fx:['sweep'],wh:1}),
 S(66.88,68.76,'s07',1.10,1.17,[.5,.5],[.5,.45],{fx:['dust'],tk:2}),
 S(68.76,72.90,'s14',1.00,1.14,[.5,.42],[.56,.38],{fx:['sweep'],rg:[[69.74,.56,.36,140]]}),
 S(72.90,75.44,'s15b',1.00,1.12,[.5,.44],[.5,.4],{fx:['sweep'],wh:1}),
 S(75.44,78.52,'s16',1.00,1.28,[.5,.5],[.62,.58],{fx:['haze'],fl:77.52}),
 S(78.52,82.60,'n02',1.00,1.14,[.45,.4],[.4,.36],{fx:['haze','dust'],wh:1}),
 S(82.60,86.12,'s16',1.70,1.86,[.62,.6],[.60,.58],{fx:['sweep'],rg:[[84.46,.60,.62,150]]}),
 G(86.12,89.90,'TRI'),
 S(89.90,92.30,'s03',1.00,1.12,[.5,.55],[.5,.6],{fx:['dust'],lab:[90.40,'GENESIS 3']}),
 S(92.30,94.22,'s18',1.00,1.10,[.5,.5],[.4,.45],{fx:['dust'],wh:1}),
 S(94.22,97.36,'s18',1.40,1.55,[.36,.42],[.33,.4],{fx:['dust']}),
 S(97.36,100.16,'s19',1.20,1.32,[.62,.66],[.70,.66],{fx:['dust'],wh:1}),
 S(100.16,105.52,'s20',1.00,1.14,[.42,.5],[.45,.5],{fx:['dust'],rg:[[104.72,.50,.50,105]]}),
 S(105.52,107.76,'s01',1.00,1.38,[.5,.45],[.5,.25],{fx:['dust'],rg:[[105.70,.505,.205,95]],rosh:105.80}),
 S(107.76,109.38,'s05',1.10,1.00,[.45,.45],[.5,.5],{fx:['dust']}),
 G(109.38,114.40,'MAP'),
 S(114.40,117.10,'n04',1.00,1.12,[.5,.36],[.45,.30],{fx:['dust'],kick:114.58}),
 S(117.10,119.76,'n03',1.00,1.10,[.5,.45],[.45,.45],{fx:['dust']}),
 S(119.76,122.50,'n05',1.10,1.22,[.5,.6],[.5,.66],{fx:['dust'],wh:1}),
 S(122.50,124.46,'d01',1.00,1.08,[.5,.45],[.55,.42],{fx:['dust']}),
 S(124.46,126.64,'d01',1.45,1.56,[.55,.30],[.56,.28],{fx:['dust'],wh:1}),
 S(126.64,129.02,'d02',1.00,1.12,[.5,.45],[.45,.45],{fx:['dust'],kick:126.64}),
 S(129.02,130.98,'d03',1.12,1.24,[.62,.4],[.66,.38],{fx:['dust'],wh:1}),
 S(130.98,133.96,'s04',1.00,1.14,[.5,.45],[.5,.35],{fx:['dust','haze']}),
 S(133.96,138.26,'n11',1.00,1.12,[.5,.42],[.5,.32],{fx:['sweep','dust'],tk:3,tke:135.06}),
 S(138.26,145.64,'s10',1.00,1.00,[.5,.5],[.5,.5],{fx:['dust'],arm:'ht',cam:[[138.26,1.04,.5,.5],[143.30,1.0,.5,.5],[145.40,1.95,.51,.13]],ret:[143.94,.51,.115]}),
 S(145.64,147.26,'d04',1.00,1.14,[.5,.5],[.55,.4],{fx:['dust']}),
 S(147.26,148.36,'d05',1.00,1.16,[.5,.5],[.4,.35],{fx:['dust'],wh:1}),
 S(148.36,150.54,'n07',1.00,1.22,[.5,.45],[.56,.30],{fx:['slow','dust']}),
 S(150.54,154.34,'n08',1.06,1.16,[.5,.32],[.55,.28],{fx:['dust'],imp:[150.54,.50,.13]}),
 S(154.34,156.70,'n07',1.45,1.62,[.56,.26],[.57,.24],{fx:['slow']}),
 G(156.70,159.48,'X2'),
 G(159.48,163.58,'ROOT'),
 S(163.58,166.80,'n09',1.00,1.10,[.5,.45],[.45,.45],{fx:['dust']}),
 S(166.80,169.16,'n09',1.25,1.36,[.62,.5],[.58,.56],{fx:['dust'],imp2:[167.00,.62,.75]}),
 G(169.16,174.82,'SPLIT'),
 S(174.82,178.42,'d06',1.00,1.14,[.5,.5],[.6,.4],{fx:['dust','sweep']}),
 G(178.42,180.90,'RC'),
 S(180.90,183.00,'s05',1.25,1.36,[.24,.45],[.2,.45],{fx:['dust','haze']}),
];
window.SHOTS=SH;
// ---------- engine ----------
const st=i=>i>0?T(SH[i].a):0, en=i=>i<SH.length-1?T(SH[i].b):END_T;
function shotAt(t){for(let i=0;i<SH.length;i++){if(t>=st(i)&&t<en(i))return i;}return SH.length-1;}
function geo(s,t,t0,t1){let z,fx,fy;const o=s.o;
 if(o.cam){const ks=o.cam.map(k=>[T(k[0]),k[1],k[2],k[3]]);let j=0;while(j+1<ks.length&&t>=ks[j+1][0])j++;const A=ks[j],B=ks[Math.min(j+1,ks.length-1)];const u=(A===B||t<=A[0])?0:ease((t-A[0])/(B[0]-A[0]));z=lerp(A[1],B[1],u);fx=lerp(A[2],B[2],u);fy=lerp(A[3],B[3],u);}
 else{const x=(t-t0)/Math.max(1e-3,t1-t0),u=0.25*x+0.75*eo(x);z=s.z0+(s.z1-s.z0)*u;fx=s.f0[0]+(s.f1[0]-s.f0[0])*u;fy=s.f0[1]+(s.f1[1]-s.f0[1])*u;}
 if(o.kick!==undefined){const k=t-T(o.kick);if(k>=0)z*=1+0.05*Math.exp(-k*7)*(k<0.04?k/0.04:1);}
 const im=IM[s.im],sw=im.width,sh=im.height,ww=sw/z,hh=ww*H/W;const cx=Math.min(Math.max(fx*sw,ww/2),sw-ww/2),cy=Math.min(Math.max(fy*sh,hh/2),sh-hh/2);
 return {im,x0:cx-ww/2,y0:cy-hh/2,ww,hh,sc:ww/W,sw,sh};}
const P=(g,fx,fy)=>[(fx*g.sw-g.x0)/g.sc,(fy*g.sh-g.y0)/g.sc];
function drawOv(n,a,dy,dx){const o=OI[n];if(!o||a<=0)return;X.globalAlpha=Math.min(1,a);X.drawImage(o.im,o.x+(dx||0),o.y+(dy||0));X.globalAlpha=1;}
function drawOvAt(n,cx,cy,a,sc){const o=OI[n];if(!o||a<=0)return;sc=sc||1;const w=o.im.width*sc,h=o.im.height*sc;X.globalAlpha=Math.min(1,a);X.drawImage(o.im,cx-w/2,cy-h/2,w,h);X.globalAlpha=1;}
let WT=null;
function writeOn(n,p,a){const o=OI[n];if(!o)return;const w=o.im.width,h=o.im.height;p=clamp(p);if(p>=1){drawOv(n,a);return;}
 if(!WT){WT=document.createElement('canvas');WT.width=W;WT.height=H;}const x=WT.getContext('2d');x.clearRect(0,0,w+4,h+4);x.globalCompositeOperation='source-over';x.drawImage(o.im,0,0);
 const soft=Math.max(140,w*0.22),e=ease(p),edge=w+soft-(w+2*soft)*e;x.globalCompositeOperation='destination-in';const gm=x.createLinearGradient(edge-soft,0,edge+soft,0);gm.addColorStop(0,'rgba(0,0,0,0)');gm.addColorStop(1,'rgba(0,0,0,1)');x.fillStyle=gm;x.fillRect(0,0,w,h);
 X.globalAlpha=Math.min(1,a);X.drawImage(WT,0,0,w,h,o.x,o.y,w,h);X.globalAlpha=1;}
function ring(px,py,R,k,t){const scl=(1.18-0.18*eo(k))*(1+0.025*Math.sin(t*4.2));X.save();X.globalAlpha=clamp(k*1.5);
 X.strokeStyle='rgba(255,196,100,1)';X.lineWidth=10;X.shadowColor='rgba(255,180,80,.95)';X.shadowBlur=26;X.beginPath();X.arc(px,py,R*scl,-Math.PI/2,-Math.PI/2+Math.PI*2*eo(k*1.6));X.stroke();
 X.shadowBlur=0;X.strokeStyle='rgba(255,238,195,1)';X.lineWidth=4;X.stroke();X.restore();}
function reticle(px,py,k,t){const R=140*(1.6-0.6*eo(k));X.save();X.globalAlpha=clamp(k*1.4);X.strokeStyle='rgba(255,214,140,.95)';X.lineWidth=3;X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=16;
 X.beginPath();X.arc(px,py,R,0,Math.PI*2);X.stroke();X.beginPath();X.arc(px,py,R*0.45,0,Math.PI*2);X.stroke();
 for(let q=0;q<4;q++){const a=q*Math.PI/2+t*0.4;X.beginPath();X.moveTo(px+Math.cos(a)*R*1.12,py+Math.sin(a)*R*1.12);X.lineTo(px+Math.cos(a)*R*0.62,py+Math.sin(a)*R*0.62);X.stroke();}X.restore();}
function glow(x,y,r,a){if(a<=0)return;X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,220,160,${.75*a})`);g.addColorStop(.3,`rgba(240,175,85,${.32*a})`);g.addColorStop(1,'rgba(240,175,85,0)');X.fillStyle=g;X.fillRect(x-r,y-r,2*r,2*r);X.restore();}
// particles
function dust(t,seed,n,warm){rs=seed;X.save();X.globalCompositeOperation='lighter';
 for(let i=0;i<n;i++){const x0=rnd()*W,y0=rnd()*H,vx=(rnd()-.3)*14,vy=-(4+rnd()*12),sz=0.6+rnd()*2.6,ph=rnd()*6.28,fl=0.5+0.5*Math.sin(t*(0.8+rnd()*1.6)+ph);
  let x=(x0+vx*t+Math.sin(t*0.6+ph)*18)%W;if(x<0)x+=W;let y=(y0+vy*t)%H;if(y<0)y+=H;X.globalAlpha=(0.10+0.40*fl)*(warm||1);const s=sz*6;X.drawImage(DOT,x-s/2,y-s/2,s,s);}X.restore();}
function embers(t,seed,n){rs=seed;X.save();X.globalCompositeOperation='lighter';
 for(let i=0;i<n;i++){const x0=rnd()*W,sp=30+rnd()*60,ph=rnd()*6.28,sz=1+rnd()*2.4,life=4+rnd()*4;const tt=(t+rnd()*life)%life;
  const x=x0+Math.sin(tt*1.3+ph)*40+tt*8,y=H+20-tt*sp*1.6;X.globalAlpha=0.65*Math.sin(Math.PI*tt/life);const s=sz*7;X.drawImage(EMB,x-s/2,y-s/2,s,s);}X.restore();}
function burst(t,t0,px,py,n,seed,noring){const k=t-t0;if(k<0||k>2.2)return;rs=seed;X.save();X.globalCompositeOperation='lighter';
 for(let i=0;i<n;i++){const an=rnd()*Math.PI*2,sp=300+rnd()*900,dr=1.8+rnd()*1.5,x=px+Math.cos(an)*sp*(1-Math.exp(-k*dr))/dr,y=py+Math.sin(an)*sp*(1-Math.exp(-k*dr))/dr+40*k*k;
  X.globalAlpha=clamp(1-k/1.6)*(0.4+0.6*rnd());const s=(2+rnd()*5)*7;X.drawImage(DOT,x-s/2,y-s/2,s,s);}X.restore();
 if(!noring&&k<0.6){X.save();X.globalCompositeOperation='lighter';const r=80+900*eo(k/0.6);X.strokeStyle=`rgba(255,226,170,${0.7*(1-k/0.6)})`;X.lineWidth=6*(1-k/0.6)+1;X.beginPath();X.arc(px,py,r,0,Math.PI*2);X.stroke();X.restore();}}
function sweep(t,t0,t1){const u=(t-t0)/Math.max(0.5,t1-t0);const x=-W*0.5+u*W*2.0;X.save();X.globalCompositeOperation='soft-light';
 const g=X.createLinearGradient(x-420,0,x+420,H*0.35);g.addColorStop(0,'rgba(255,230,180,0)');g.addColorStop(.5,'rgba(255,236,196,.55)');g.addColorStop(1,'rgba(255,230,180,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();}
function haze(t){X.save();X.globalAlpha=0.16;X.globalCompositeOperation='screen';const ox=(t*14)%W;X.drawImage(FOG,-ox,0,W,H);X.drawImage(FOG,W-ox,0,W,H);X.restore();}
function dim(a){X.fillStyle=`rgba(0,0,0,${a})`;X.fillRect(0,0,W,H);}
// ---------- four-clue tracker ----------
const CL=[['נְחֹשֶׁת','bronze'],['קַשְׂקַשִּׂים','scales'],['מִצְחַת','“forehead”'],['?','']];
function tracker(t,m,t0,tend){const a=sm(t0,t0+.3,t)*(tend?1-sm(tend-.2,tend,t):1);if(a<=0)return;const cy=640,R=74,gap=250,x0=960-1.5*gap;
 dim(0.5*a);X.save();const g=X.createRadialGradient(960,cy+20,40,960,cy+20,760);g.addColorStop(0,`rgba(4,3,2,${.72*a})`);g.addColorStop(1,'rgba(4,3,2,0)');X.fillStyle=g;X.fillRect(0,cy-520,W,1040);X.restore();
 TX('FOUR CLUES',960,cy-150,'300 34px Fraunces',GOLD,a,'center','10px');
 const tl=m===0?T(30.46):t0;
 for(let n=1;n<=4;n++){const x=x0+(n-1)*gap,ap=m===0?sm(T(28.14)+(n-1)*.16,T(28.14)+(n-1)*.16+.3,t):a;if(ap<=0)continue;
  const act=(m===0&&n===3&&t>=tl)||(m===n),done=m>0&&n<m,ka=act?sm(tl,tl+.3,t):0;
  X.save();X.globalAlpha=ap;X.fillStyle=done?'rgba(217,180,106,.20)':'rgba(8,5,2,.65)';X.beginPath();X.arc(x,cy,R,0,Math.PI*2);X.fill();
  X.lineWidth=act?6:4;X.strokeStyle=act?`rgba(243,207,134,${.6+.4*ka})`:done?'rgba(217,180,106,.85)':'rgba(217,180,106,.5)';if(act){X.shadowColor='rgba(250,180,70,.9)';X.shadowBlur=30*ka;}X.stroke();X.restore();
  X.save();X.globalAlpha=ap;X.font='500 82px Newsreader';X.fontVariantNumeric='lining-nums';X.textAlign='center';X.textBaseline='middle';X.fillStyle=act?gv(cy-40,cy+40):done?'#e9cf96':'rgba(239,230,212,.72)';X.fillText(String(n),x,cy+4);X.restore();
  if(m===0&&n===3)TX('where the stone lands',x,cy+R+46,'italic 400 38px Newsreader',GL,ka);
  else if((act||done)&&n<4){heb(CL[n-1][0],x,cy+R+48,40,ap*(act?ka:1),{allGold:act});TX(CL[n-1][1],x,cy+R+94,'italic 400 32px Newsreader',IVORY,ap*(act?ka:.85));}}}
// ---------- armor callouts on s10 ----------
const AP={helm:[.51,.10],jav:[.575,.16],coat:[.51,.33],leg:[.565,.78]};
function callout(px,py,lx,ly,p,a){if(p<=0||a<=0)return;X.save();X.globalAlpha=a;X.strokeStyle='rgba(246,220,152,.95)';X.lineWidth=2.5;X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=10;
 const ex=lx+(px<lx?-30:30);const p1=clamp(p*2),p2=clamp(p*2-1);X.beginPath();X.moveTo(px,py);X.lineTo(lerp(px,ex,p1),lerp(py,ly,p1));if(p2>0)X.lineTo(lerp(ex,lx,p2),ly);X.stroke();
 X.fillStyle='#fff0c4';X.beginPath();X.arc(px,py,7,0,Math.PI*2);X.fill();X.restore();glow(px,py,40,a*.8);}
function ARM(t,g,mode){const L=[],add=(key,lx,ly,al,on,lab,he,sub,lit)=>L.push({key,lx,ly,al,on,lab,he,sub,lit});
 if(mode==='open'){add('helm',700,160,'right',4.62,'HELMET',null,'bronze',6.56);add('coat',640,420,'right',4.80,'COAT OF SCALES',null,'bronze',6.62);add('jav',1260,230,'left',4.98,'JAVELIN',null,'bronze',6.68);add('leg',1260,790,'left',5.16,'LEG GUARDS',null,'bronze',6.74);}
 if(mode==='x4'){add('helm',700,160,'right',48.10,'HELMET','נְחֹשֶׁת',null,48.18);add('coat',640,420,'right',48.10,'COAT OF SCALES','נְחֹשֶׁת',null,48.36);add('leg',1260,790,'left',48.10,'LEG GUARDS','נְחֹשֶׁת',null,48.54);add('jav',1260,230,'left',48.10,'JAVELIN','נְחֹשֶׁת',null,48.72);}
 if(mode==='ht'){add('helm',700,200,'right',139.22,null,'כּוֹבַע נְחֹשֶׁת','a bronze helmet · 17:5',139.52);add('leg',1260,790,'left',140.80,null,'מִצְחַת נְחֹשֶׁת','a bronze “forehead” · 17:6',141.20);}
 const fade=mode==='ht'?1-sm(T(143.30),T(143.70),t):1;
 if(mode==='ht'){const tl=T(141.82);if(t>=tl){const [hx,hy]=P(g,...AP.helm),[lx,ly]=P(g,...AP.leg),p=eo((t-tl)/0.7);X.save();X.globalAlpha=fade;X.strokeStyle='rgba(246,220,152,.9)';X.lineWidth=3;X.setLineDash([10,12]);X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=12;
   X.beginPath();X.moveTo(hx+90,hy);X.lineTo(hx+90,lerp(hy,ly,p));X.stroke();X.restore();}}
 for(const c of L){const ton=T(c.on);if(t<ton)continue;const p=eo((t-ton)/0.45),a=clamp((t-ton)/0.2)*fade;const [px,py]=P(g,...AP[c.key]);callout(px,py,c.lx,c.ly,p,a);
  const la=a*sm(ton+.25,ton+.5,t),tl=T(c.lit),lk=sm(tl,tl+.25,t),xa=c.al==='right'?c.lx-14:c.lx+14;
  X.save();const sw=420,sh=c.he?170:120;const gx=c.al==='right'?c.lx-sw/2:c.lx+sw/2;const sg=X.createRadialGradient(gx,c.ly+20,10,gx,c.ly+20,sw*.6);sg.addColorStop(0,`rgba(4,3,2,${.6*la})`);sg.addColorStop(1,'rgba(4,3,2,0)');X.fillStyle=sg;X.fillRect(gx-sw,c.ly-sh,sw*2,sh*2);X.restore();
  let y=c.ly;if(c.lab){TX(c.lab,xa,y,'300 36px Fraunces',IVORY,la,c.al,'6px');y+=50;}
  if(c.he){X.save();X.font='500 60px "Frank Ruhl Libre"';const w=X.measureText(c.he).width;X.restore();const hx=c.al==='right'?xa-w/2:xa+w/2;heb(c.he,hx,y+6,60,la*(1-lk));if(lk>0){heb(c.he,hx,y+6,60,la*lk,{allGold:true});glow(hx,y+6,110,lk*(1-sm(tl+.3,tl+1.2,t))*.7);}y+=60;}
  if(c.sub){const sa=c.lab?la*lk:la;TX(c.sub,xa,y,'italic 400 46px Newsreader',c.lab?GL:IVORY,sa,c.al);if(c.lab&&lk>0)glow(xa+(c.al==='right'?-60:60),y,90,lk*(1-sm(tl+.3,tl+1.0,t))*.6);}}
 if(mode==='x4'){const ts=T(51.30);if(t>=ts){const p=clamp((t-ts)/0.3),sc=1.7-0.7*eob(p);X.save();X.globalAlpha=clamp((t-ts)/0.08);X.translate(1560,560);X.scale(sc,sc);X.font='500 170px Newsreader';X.fontVariantNumeric='lining-nums';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(-80,80);X.shadowColor='rgba(250,180,70,.85)';X.shadowBlur=30;X.fillText('×4',0,0);X.restore();}
  const tr=T(49.16);if(t>=tr)TX('1 SAMUEL 17:5–6',1560,680,'300 28px Fraunces',GOLD,sm(tr,tr+.3,t),'center','5px');}}
// ---------- graphics shots ----------
function bg(name){X.drawImage(IM[name],0,0);}
function G1(t,t0,t1){bg('B_s02');const a=clamp((t-t0)/0.3);const tb=T(15.36);X.save();const z=1+0.04*eo((t-t0)/(t1-t0));X.translate(960,540);X.scale(z,z);X.translate(-960,-540);
 if(t<tb){writeOn('g1a',(t-t0-0.05)/0.6,a);}else if(t<tb+0.4){const k=(t-tb)/0.4;drawOv('g1a',1-k);drawOv('g1b',k);}else{drawOv('g1b',1);}
 // a gold serpent of light slides through the shared letters נ ח ש
 if(t>=tb){const k=(t-tb)/1.3;X.globalCompositeOperation='lighter';for(let i=0;i<80;i++){const u=k-i*0.008;if(u<0||u>1.25)continue;const x=lerp(1230,840,clamp(u)),y=330+Math.sin(u*Math.PI*3.0)*62;const s=(70-i*.7);X.globalAlpha=clamp(1.25-u)*(1-i/80);X.drawImage(DOT,x-s/2,y-s/2,s,s);if(i===0)glow(x,y,110,clamp(1.25-u)*.8);}X.globalCompositeOperation='source-over';X.globalAlpha=1;}
 X.restore();}
function panel(im,cx,cy,pw,ph,cr,p,a){const i=IM[im];const sx=cr[0]*i.width,sy=cr[1]*i.height,sw=cr[2]*i.width,sh=sw*ph/pw;
 X.save();X.globalAlpha=a*(0.35+0.65*p);X.filter=p<1?`saturate(${0.3+0.7*p}) brightness(${0.5+0.5*p})`:'none';X.drawImage(i,sx,sy,sw,sh,cx-pw/2,cy-ph/2,pw,ph);X.filter='none';
 X.strokeStyle=`rgba(250,214,140,${0.35+0.65*p})`;X.lineWidth=3+2*p;X.shadowColor='rgba(255,180,80,.8)';X.shadowBlur=30*p;X.strokeRect(cx-pw/2,cy-ph/2,pw,ph);X.restore();
 return (fx,fy)=>[cx-pw/2+(fx*i.width-sx)/sw*pw,cy-ph/2+(fy*i.height-sy)/sh*ph];}
function lineTo(x1,y1,x2,y2,t,ton){if(t<ton)return;const p=eo((t-ton)/0.45);X.save();X.strokeStyle='rgba(250,214,140,.9)';X.lineWidth=3;X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=14;X.beginPath();X.moveTo(x1,y1);X.lineTo(x1+(x2-x1)*p,y1+(y2-y1)*p);X.stroke();X.restore();}
function FH(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);const tl=T(21.74),tw=T(22.50)+0.05,tr=T(22.94);
 const pl=panel('s06',500,620,800,560,[.36,.06,.5],sm(tl,tl+.4,t),a),pr=panel('n11',1420,620,800,560,[.18,.0,.64],sm(tr,tr+.4,t),a);
 const [fx,fy]=pl(.62,.29),[gx,gy]=pr(.5,.2);if(t>=tl)ring(fx,fy,95,(t-tl)/0.35,t);if(t>=tr)ring(gx,gy,120,(t-tr)/0.35,t);
 wordCard(t,tw,'מֵצַח','forehead',null,960,170,140);lineTo(860,210,fx+60,fy-80,t,tw+.2);lineTo(1060,210,gx-60,gy-90,t,tr+.1);}
function TRI(t,t0,t1){X.fillStyle='#050302';X.fillRect(0,0,W,H);const pw=W/3;
 const pans=[['s03',[.3,.1,.4],T(87.94),'tri_s'],['s01',[.36,.04,.28],T(86.12)-0.3,'tri_g'],['s16',[.42,.36,.45],T(88.86),'tri_d']];
 for(let k=0;k<3;k++){const [im,cr,ton,lb]=pans[k];const i=IM[im];const p=clamp((t-ton+0.2)/0.45);
  const sx=cr[0]*i.width,sy=cr[1]*i.height,sw=cr[2]*i.width,sh=sw*H/pw;const dy=(1-eob(p))*90;const drift=(t-t0)*6;
  X.save();X.globalAlpha=0.22+0.78*p;X.filter=p<1?`saturate(${0.2+0.8*p}) brightness(${0.4+0.6*p})`:'none';X.beginPath();X.rect(k*pw+6,0,pw-12,H);X.clip();X.drawImage(i,sx+drift,sy,sw,Math.min(sh,i.height-sy),k*pw+6,dy,pw-12,H);X.filter='none';X.restore();
  X.save();X.strokeStyle=`rgba(217,180,106,${0.3+0.4*p})`;X.lineWidth=2;X.strokeRect(k*pw+6,dy+4,pw-12,H-8);X.restore();
  if(t>=ton+0.2)drawOv(lb,clamp((t-ton-0.2)/0.3));}}
// Valley of Elah (1 Sam 17:2–3): Philistines on one hill, Israel on the other, the valley between
function ridge(pts,a){X.save();X.beginPath();X.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))X.lineTo(p[0],p[1]);X.lineTo(pts[pts.length-1][0],H);X.lineTo(pts[0][0],H);X.closePath();
 const g=X.createLinearGradient(0,260,0,H);g.addColorStop(0,`rgba(70,48,22,${a})`);g.addColorStop(.5,`rgba(28,19,9,${a})`);g.addColorStop(1,`rgba(8,6,3,${a})`);X.fillStyle=g;X.fill();X.restore();
 for(let k=0;k<5;k++){X.save();X.globalAlpha=a*(k?0.42-k*0.07:1);X.strokeStyle=k?GOLD:GL;X.lineWidth=k?2:4;if(!k){X.shadowColor='rgba(255,180,80,.85)';X.shadowBlur=16;}
  X.beginPath();pts.forEach((p,i)=>{const y=p[1]+k*30;i?X.lineTo(p[0],y):X.moveTo(p[0],y);});X.stroke();X.restore();}}
const LR=[[0,520],[170,380],[400,290],[620,370],[850,600],[915,630]],RR=[[1005,630],[1070,600],[1300,370],[1520,290],[1750,380],[1920,520]];
function MAP(t,t0,t1){X.fillStyle='#070503';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);
 const sky=X.createRadialGradient(960,250,50,960,250,1000);sky.addColorStop(0,`rgba(95,64,28,${.55*a})`);sky.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=sky;X.fillRect(0,0,W,H);
 ridge(LR,a);ridge(RR,a);
 X.save();X.globalAlpha=a;X.strokeStyle='rgba(250,226,160,.95)';X.lineWidth=4;X.shadowColor='rgba(255,200,120,.95)';X.shadowBlur=16;X.beginPath();for(let x=880;x<=1040;x+=5){const y=640+Math.sin(x*0.07+t*3)*6;x>880?X.lineTo(x,y):X.moveTo(x,y);}X.stroke();X.restore();
 const army=(x0,x1,yy,seed)=>{rs=seed;for(let i=0;i<60;i++){const r=Math.floor(i/30),x=lerp(x0,x1,(i%30)/29)+(rnd()-.5)*6,y=yy+r*20+Math.abs(x-(x0+x1)/2)*0.32;X.save();X.globalAlpha=a*0.95;X.fillStyle='#f3dca0';X.shadowColor='rgba(255,190,90,.8)';X.shadowBlur=8;X.beginPath();X.arc(x,y,5,0,Math.PI*2);X.fill();X.restore();}};
 army(280,520,268,3);army(1400,1640,268,9);
 TX('PHILISTINES',400,205,'300 38px Fraunces',GL,a,'center','10px');TX('ISRAEL',1520,205,'300 38px Fraunces',GL,a,'center','10px');
 TX('THE VALLEY OF ELAH',960,700,'300 30px Fraunces',GOLD,a*.9,'center','8px');
 const tA=T(110.0),tB=T(113.0),tC=T(114.2);let ph,day;
 if(t<tA){ph=0;day=1;}else if(t<tB){ph=Math.sin(Math.PI*clamp((t-tA)/(tB-tA)));day=1;}else{const d=1+39*eo(clamp((t-tB)/(tC-tB)));day=Math.floor(d);ph=Math.abs(Math.sin(Math.PI*d));}
 const gpos=q=>[lerp(470,900,q),lerp(300,620,q)-Math.sin(q*Math.PI)*24];const [gx,gy]=gpos(ph);
 for(let k=1;k<12&&t>=tB;k++){const d=1+39*eo(clamp((t-k*0.025-tB)/(tC-tB)));const [qx,qy]=gpos(Math.abs(Math.sin(Math.PI*d)));glow(qx,qy,60,(1-k/12)*.45);}
 glow(gx,gy,130,a);X.save();X.globalAlpha=a;X.fillStyle='#fff0c4';X.shadowColor='rgba(255,190,90,1)';X.shadowBlur=30;X.beginPath();X.arc(gx,gy,16,0,Math.PI*2);X.fill();X.restore();
 if(t<tB)TX('GOLIATH',gx+(ph>0.5?-10:0),gy-58,'300 32px Fraunces',IVORY,a*sm(tA-.3,tA,t),'center','8px');
 const mo=t<tB?(t<(tA+tB)/2?'morning':'evening'):((day%2)?'morning':'evening');
 TX('DAY',960,92,'300 32px Fraunces',GOLD,a,'center','10px');X.save();X.globalAlpha=a;X.font='500 120px Newsreader';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(130,250);X.shadowColor='rgba(250,180,70,.8)';X.shadowBlur=24;X.fillText(String(day),960,186);X.restore();
 TX(mo,960,278,'italic 400 46px Newsreader',IVORY,a*sm(tA-.2,tA+.2,t));}
function X2(t,t0){bg('B_n07');const a=clamp((t-t0)/0.3);const t1=T(157.52),t2=T(158.32);
 const sg=X.createRadialGradient(960,520,40,960,520,900);sg.addColorStop(0,`rgba(4,3,2,${.7*a})`);sg.addColorStop(1,'rgba(4,3,2,0)');X.fillStyle=sg;X.fillRect(0,0,W,H);
 TX('1 SAMUEL 17:49',960,250,'300 30px Fraunces',GOLD,a,'center','6px');
 const w=(he,en,x,tl)=>{const k=sm(tl,tl+.25,t);heb(he,x,470,120,a*.55*(1-k));if(k>0){heb(he,x,470,120,a*k,{allGold:true});glow(x,470,220,k*(1-sm(tl+.3,tl+1.2,t))*.8);}TX(en,x,580,'italic 400 44px Newsreader',IVORY,a*(.55+.45*k));};
 w('אֶל־מִצְחוֹ','on his forehead',1360,t1);w('בְּמִצְחוֹ','into his forehead',560,t2);
 if(t>=t2){const p=clamp((t-t2)/0.3),sc=1.6-0.6*eob(p);X.save();X.globalAlpha=clamp((t-t2)/0.08);X.translate(960,760);X.scale(sc,sc);X.font='500 150px Newsreader';X.fontVariantNumeric='lining-nums';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(-70,70);X.shadowColor='rgba(250,180,70,.85)';X.shadowBlur=30;X.fillText('×2',0,0);X.restore();}}
function ROOT(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);
 const pw=760,ph=470,ly=610;const tl=T(160.48),tr=T(162.64),tc=T(159.90);
 panel('n11',520,ly,pw,ph,[.25,.05,.5],sm(tl,tl+.5,t),a);panel('n06',1400,ly,pw,ph,[.3,.08,.42],sm(tr,tr+.5,t),a);
 if(t>=tc)drawOv('root_c',clamp((t-tc)/0.4));
 lineTo(900,300,600,ly-ph/2,t,tl);lineTo(1020,300,1320,ly-ph/2,t,tr);
 if(t>=tl)drawOv('root_l',clamp((t-tl)/0.4));if(t>=tr)drawOv('root_r',clamp((t-tr)/0.4));}
function SPLIT(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);const tl=T(169.16),tr=T(172.04);
 panel('s19',500,500,820,620,[.40,.32,.5],sm(tl,tl+.4,t),a);panel('n10',1420,500,820,620,[.3,.26,.55],sm(tr,tr+.4,t),a);
 TX('THE SERPENT',500,872,'300 36px Fraunces',IVORY,a,'center','8px');TX('“dust you will eat”  ·  GENESIS 3:14',500,930,'italic 400 42px Newsreader',GL,a);
 const ra=sm(tr,tr+.4,t);TX('THE GIANT',1420,872,'300 36px Fraunces',IVORY,ra,'center','8px');TX('“on his face to the ground”  ·  1 SAMUEL 17:49',1420,930,'italic 400 42px Newsreader',GL,ra);}
function RC(t,t0){X.drawImage(IM.d06,0,0,IM.d06.width,IM.d06.height,-30,-20,W+60,H+40);dim(0.62);const a=clamp((t-t0)/0.3);const t1=T(178.42),t2=T(179.62),tw1=T(178.60),tw2=T(179.62)+.15;
 const row=(ref,he,en,gold,y,ton,tg)=>{const k=sm(ton,ton+.35,t);if(k<=0)return;TX(ref,960,y-92,'300 28px Fraunces',GOLD,k,'center','5px');heb(he,960,y,92,k,{t,gold:{[gold]:tg}});eng(en,960,y+84,46,k,{t,hot:{head:tg}});};
 row('1 SAMUEL 17:51','וַיִּכְרָת־בָּהּ אֶת־רֹאשׁוֹ','and with it he cut off his head','אֶת־רֹאשׁוֹ',380,t1,tw1);
 row('GENESIS 3:15','הוּא יְשׁוּפְךָ רֹאשׁ','they will strike your head','רֹאשׁ',760,t2,tw2);
 if(t>=tw2+.2){X.save();const p=eo((t-tw2-.2)/0.5);X.strokeStyle='rgba(250,214,140,.9)';X.lineWidth=3;X.setLineDash([8,10]);X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=12;X.beginPath();X.moveTo(860,440);X.lineTo(860+(780-860)*p,440+(700-440)*p);X.stroke();X.restore();}}
const GF={G1,FH,TRI,MAP,X2,ROOT,SPLIT,RC};
// ---------- frame ----------
window.renderFrame=t=>{
 X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.fillStyle='#000';X.fillRect(0,0,W,H);
 if(t>=END_T)return;
 const i=shotAt(t),s=SH[i],t0=st(i),t1=en(i),o=s.o||{};let g=null;
 let shx=0,shy=0;const sk=o.imp?[T(o.imp[0]),20]:o.imp2?[T(o.imp2[0]),12]:null;if(sk&&t>=sk[0]){const k=t-sk[0],amp=sk[1]*Math.exp(-k*9);shx=Math.sin(k*61)*amp;shy=Math.cos(k*47)*amp*0.7;}
 X.save();X.translate(shx,shy);
 if(s.k==='img'){g=geo(s,t,t0,t1);const cool=o.fx&&o.fx.includes('cool');if(o.fx&&o.fx.includes('slow'))X.filter='saturate(.5) contrast(1.08)';
  if(o.wh&&t-t0<0.2){const k=eo((t-t0)/0.2),off=o.wh*(1-k)*260;for(let q=3;q>=1;q--){X.globalAlpha=0.22;X.drawImage(g.im,g.x0,g.y0,g.ww,g.hh,-8+off*(1+q*.35),-8,W+16,H+16);}X.globalAlpha=1;X.drawImage(g.im,g.x0,g.y0,g.ww,g.hh,-8+off,-8,W+16,H+16);}
  else X.drawImage(g.im,g.x0,g.y0,g.ww,g.hh,-8,-8,W+16,H+16);X.filter='none';
  if(o.fx){if(o.fx.includes('sweep'))sweep(t,t0,t1);if(o.fx.includes('haze'))haze(t);if(cool){X.save();X.globalCompositeOperation='soft-light';X.fillStyle='rgba(120,150,190,.45)';X.fillRect(0,0,W,H);X.restore();}}}
 else GF[s.k](t,t0,t1);
 X.restore();
 if(o.fx){if(o.fx.includes('dust'))dust(t,11+i*7,90,1);if(o.fx.includes('embers'))embers(t,5+i,46);if(o.fx.includes('slow'))dust(t*0.25,99,60,1.2);}
 if(s.k==='G1'||s.k==='MAP'||s.k==='X2'||s.k==='RC')dust(t,300+i,50,0.8);
 // overlays on image shots
 if(g){
  if(o.arm)ARM(t,g,o.arm);
  if(o.rg)for(const [on,fx,fy,R] of o.rg){const ton=T(on);if(t<ton)continue;const [px,py]=P(g,fx,fy);ring(px,py,R,(t-ton)/0.35,t);}
  if(o.ret){const ton=T(o.ret[0]);if(t>=ton){const [px,py]=P(g,o.ret[1],o.ret[2]);reticle(px,py,(t-ton)/0.5,t);}}
  if(o.rosh&&t>=T(o.rosh)){const [px,py]=P(g,.505,.205);drawOvAt('rosh',px+230,py+20,clamp((t-T(o.rosh))/0.35));}
  if(o.wc)for(const [on,he,enn,ref,x,y,sz] of o.wc)wordCard(t,T(on),he,enn,ref,x,y,sz);
  if(o.lab){const ton=T(o.lab[0]);TX(o.lab[1],960,1000,'300 34px Fraunces',GOLD,sm(ton,ton+.3,t),'center','10px');}
  if(o.imp){const ton=T(o.imp[0]);const [px,py]=P(g,o.imp[1],o.imp[2]);burst(t,ton,px,py,90,77);}
  if(o.imp2){const ton=T(o.imp2[0]);const [px,py]=P(g,o.imp2[1],o.imp2[2]);burst(t,ton,px,py,70,55,true);}
  if(o.tk!==undefined)tracker(t,o.tk,o.tk===0?T(28.14)-0.1:t0+0.05,o.tke?T(o.tke):0);
 }
 if(o.tick){const tk=[3.06,3.28,3.50].map(T);const a=Math.min(1,sm(tk[0],tk[0]+.2,t));X.save();const bgr=X.createLinearGradient(0,H-200,0,H);bgr.addColorStop(0,'rgba(4,3,2,0)');bgr.addColorStop(1,`rgba(4,3,2,${.75*a})`);X.fillStyle=bgr;X.fillRect(0,H-200,W,200);X.restore();
  const refs=['1 SAMUEL 17:5','17:6','17:7'];X.save();X.font='300 36px Fraunces';X.letterSpacing='6px';const ws=refs.map(r=>X.measureText(r).width),sep=70,tot=ws.reduce((p,q)=>p+q,0)+sep*2;X.restore();let x=960-tot/2;
  refs.forEach((r,k)=>{TX(r,x+ws[k]/2,1010,'300 36px Fraunces',GL,sm(tk[k],tk[k]+.2,t),'center','6px');if(k<2)TX('·',x+ws[k]+sep/2,1010,'300 36px Fraunces',GOLD,sm(tk[k+1],tk[k+1]+.2,t));x+=ws[k]+sep;});}
 // flashes
 const fl=o.imp?T(o.imp[0]):o.fl?T(o.fl):null;if(fl!==null&&t>=fl&&t<fl+0.3){X.save();X.globalCompositeOperation='lighter';X.fillStyle=`rgba(255,236,200,${(o.imp?0.95:0.45)*(1-(t-fl)/0.3)})`;X.fillRect(0,0,W,H);X.restore();}
 // verse banner
 for(const B of BN)if(t>=B.t0-.01&&t<B.t1+.01)banner(t,B);
 // vignette + grain
 const vg=X.createRadialGradient(W/2,H/2,H*0.42,W/2,H/2,H*1.08);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.36)');X.fillStyle=vg;X.fillRect(0,0,W,H);
 X.globalCompositeOperation='soft-light';X.globalAlpha=.5;X.drawImage(GRN[Math.floor(t*30)%GRN.length],0,0,W,H);X.globalAlpha=1;X.globalCompositeOperation='source-over';
 if(t<PRE+0.15){X.fillStyle='rgba(0,0,0,'+(1-Math.max(0,t/(PRE+0.15)))+')';X.fillRect(0,0,W,H);}
};
// ---------- load ----------
const A=window.ASSETS;let pend=1;const done=()=>{if(--pend===0)prep();};
for(const [n,d] of Object.entries(A.img)){pend++;const im=new Image();im.onload=done;im.src=d;IM[n]=im;}
for(const [n,o] of Object.entries(A.ov)){pend++;const im=new Image();im.onload=done;im.src=o.d;OI[n]={im,x:o.x,y:o.y};}
Promise.all(['500 60px "Frank Ruhl Libre"','400 60px "Frank Ruhl Libre"','300 30px Fraunces','400 30px Fraunces','italic 400 40px Newsreader','400 40px Newsreader'].map(f=>document.fonts.load(f,'אבג abc 123'))).then(done,done);
function bgOf(src,blur,mix){const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='rgb(6,4,2)';x.fillRect(0,0,W,H);
 x.filter='blur('+blur+'px)';x.globalAlpha=mix;x.drawImage(IM[src],-40,-24,W+80,H+48);x.filter='none';x.globalAlpha=1;return c;}
function sprite(r,g,b){const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');const gr=x.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,`rgba(${r},${g},${b},1)`);gr.addColorStop(.35,`rgba(${r},${g},${b},.45)`);gr.addColorStop(1,`rgba(${r},${g},${b},0)`);x.fillStyle=gr;x.fillRect(0,0,32,32);return c;}
function prep(){IM.B_s02=bgOf('s02',14,.38);IM.B_n07=bgOf('n07',18,.34);
 DOT=sprite(255,226,170);EMB=sprite(255,150,60);
 for(let k=0;k<6;k++){const c=document.createElement('canvas');c.width=960;c.height=540;const x=c.getContext('2d'),d=x.createImageData(960,540);
  for(let p=0;p<d.data.length;p+=4){const v=128+(Math.random()+Math.random()+Math.random()-1.5)*34;d.data[p]=d.data[p+1]=d.data[p+2]=v;d.data[p+3]=255;}x.putImageData(d,0,0);GRN.push(c);}
 const f=document.createElement('canvas');f.width=480;f.height=270;const fx=f.getContext('2d');rs=7;for(let q=0;q<70;q++){const x=rnd()*480,y=rnd()*270,r=30+rnd()*90;const gr=fx.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(220,190,150,.35)');gr.addColorStop(1,'rgba(220,190,150,0)');fx.fillStyle=gr;fx.fillRect(x-r,y-r,2*r,2*r);}
 FOG=document.createElement('canvas');FOG.width=W;FOG.height=H;const g2=FOG.getContext('2d');g2.filter='blur(30px)';g2.drawImage(f,0,0,W,H);
 window.READY=true;}
})();
