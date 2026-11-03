(function(){
const HALF=window.HALF||1;
const W=1920,H=1080,PRE=0.5;
// VO insertions [vo time, seconds]: the spliced word מֵצַח at 22.50, the rest are silent pauses
const INS=window.INS;
const TG=t=>{let s=t;for(const [v,d] of INS)if(t>=v)s+=d;return s;};
const VO0=HALF===1?0:180.55;
const T=t=>PRE+TG(t)-TG(VO0);
const END_T=HALF===1?T(179.98)+2.4:T(328.74)+4.5; window.DUR=END_T+0.25;
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
function heb(s,x,y,size,a,o={}){if(a<=0.003)return;X.save();X.font=`500 ${size}px "Frank Ruhl Libre"`;X.direction='rtl';X.textAlign='right';X.textBaseline='middle';
 const ws=s.split(' '),sp=X.measureText(' ').width*1.1,wd=ws.map(w=>X.measureText(w).width),tot=wd.reduce((p,q)=>p+q,0)+sp*(ws.length-1);let xr=x+tot/2;const occ=o.occ||{};
 ws.forEach((w,i)=>{const st=o.step??.05,wa=o.t0!==undefined?sm(o.t0+i*st,o.t0+i*st+.3,o.t):1;const gt=gtime(o.gold,w,occ),gk=gt!==undefined?sm(gt-.05,gt+.25,o.t):(o.allGold?1:0);
  X.globalAlpha=clamp(a*wa*(1-gk));X.fillStyle=o.col||IVORY;X.fillText(w,xr,y);
  if(gk>0){X.globalAlpha=clamp(a*wa*gk);X.fillStyle=gg(xr-wd[i],y-size/2,xr,y+size/2);X.shadowColor='rgba(240,180,80,.8)';X.shadowBlur=18;X.fillText(w,xr,y);X.shadowBlur=0;}
  xr-=wd[i]+sp;});X.restore();return tot;}
function eng(s,x,y,size,a,o={}){if(a<=0.003)return;X.save();X.font=`italic 400 ${size}px Newsreader`;X.textBaseline='middle';
 const ws=s.split(' '),sp=X.measureText(' ').width,tw=X.measureText(s).width;let xx=x-tw/2;const occ=o.occ||{};
 ws.forEach((w,i)=>{const key=w.toLowerCase().replace(/[^a-z]/g,'');const ht=gtime(o.hot,key,occ),hk=ht!==undefined?sm(ht-.05,ht+.25,o.t):0;const wa=o.rev?sm(o.rev[i]-.05,o.rev[i]+.25,o.t):1;
  X.globalAlpha=clamp(a*wa);X.fillStyle=hk>0?`rgb(${lerp(239,246,hk)},${lerp(230,214,hk)},${lerp(212,140,hk)})`:IVORY;X.shadowColor='rgba(240,180,80,.75)';X.shadowBlur=14*hk;X.fillText(w,xx,y);xx+=X.measureText(w).width+sp;});X.restore();}
function wrap(txt,font,maxW,rtl){X.save();X.font=font;if(rtl)X.direction='rtl';const ws=txt.split(' '),out=[];let cur='';ws.forEach(w=>{const tt=cur?cur+' '+w:w;if(X.measureText(tt).width>maxW&&cur){out.push(cur);cur=w;}else cur=tt;});out.push(cur);X.restore();return out;}
function scrim(cx,cy,rw,rh,a){if(a<=0)return;X.save();X.translate(cx,cy);X.scale(1,rh/rw);const sg=X.createRadialGradient(0,0,0,0,0,rw*1.2);sg.addColorStop(0,`rgba(4,3,2,${.78*a})`);sg.addColorStop(.55,`rgba(4,3,2,${.5*a})`);sg.addColorStop(1,'rgba(4,3,2,0)');X.fillStyle=sg;X.fillRect(-rw*1.2,-rw*1.2,rw*2.4,rw*2.4);X.restore();}
// gold Hebrew word card: fades in and rises, with an English gloss and a reference
function wordCard(t,ton,he,en,ref,cx,cy,size){const k=t-ton;if(k<0)return;const a=sm(ton,ton+.35,t),dy=(1-eo(k/0.6))*16;
 scrim(cx,cy+size*.3,size*2.6,size*1.6,a);
 X.save();X.globalAlpha=a;X.font=`500 ${size}px "Frank Ruhl Libre"`;X.direction='rtl';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(cy+dy-size*.55,cy+dy+size*.55);X.shadowColor='rgba(240,170,70,.7)';X.shadowBlur=26;X.fillText(he,cx,cy+dy);X.restore();
 const ea=sm(ton+.15,ton+.5,t);if(en)TX(en,cx,cy+size*.8,`italic 400 ${Math.max(40,Math.round(size*.3))}px Newsreader`,IVORY,ea);
 if(ref)TX(ref,cx,cy+size*.8+Math.max(52,size*.38),'300 30px Fraunces',GOLD,ea,'center','5px');}

// ---------- verse banners (VO times) ----------
const BN1=[
 {a:25.02,b:27.24,ref:'1 SAMUEL 17:6',he:'וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו',en:'and a bronze “forehead” on his legs',gold:{'וּמִצְחַת':25.74},hot:{forehead:25.74},hs:70,es:48},
 {a:35.40,b:40.20,ref:'1 SAMUEL 17:5',he:'וְכוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ … וּמִשְׁקַל הַשִּׁרְיוֹן חֲמֵשֶׁת־אֲלָפִים שְׁקָלִים נְחֹשֶׁת',en:'A bronze helmet on his head … the coat weighed five thousand shekels of bronze',gold:{'נְחֹשֶׁת':[36.18,39.34]},hot:{bronze:[36.18,39.34]},hs:60,es:44},
 {a:40.20,b:43.20,ref:'1 SAMUEL 17:6',he:'וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו וְכִידוֹן נְחֹשֶׁת בֵּין כְּתֵפָיו',en:'A bronze “forehead” on his legs, and a bronze javelin between his shoulders',gold:{'נְחֹשֶׁת':[40.34,41.94]},hot:{bronze:[40.34,41.94]},hs:62,es:44},
 {a:43.20,b:46.02,ref:'1 SAMUEL 17:7',he:'וְלַהֶבֶת חֲנִיתוֹ שֵׁשׁ־מֵאוֹת שְׁקָלִים בַּרְזֶל',en:'…and his spearhead weighed six hundred shekels of iron',gold:{'בַּרְזֶל':44.54},hot:{iron:44.54},hs:66,es:46},
 {a:58.62,b:62.80,ref:'NUMBERS 21:9',he:'וַיַּעַשׂ מֹשֶׁה נְחַשׁ נְחֹשֶׁת וַיְשִׂמֵהוּ עַל־הַנֵּס',en:'Moses made a serpent of bronze and set it on a pole',gold:{'נְחַשׁ':59.06,'נְחֹשֶׁת':59.80},hot:{serpent:60.98,bronze:61.60},hs:66,es:46},
 {a:68.76,b:72.90,ref:'1 SAMUEL 17:5',he:'וְשִׁרְיוֹן קַשְׂקַשִּׂים הוּא לָבוּשׁ',en:'…and he was dressed in a coat of scales',gold:{'קַשְׂקַשִּׂים':71.60},hot:{scales:69.74},hs:70,es:48},
 {a:72.90,b:75.44,ref:'LEVITICUS 11:9',he:'כֹּל אֲשֶׁר־לוֹ סְנַפִּיר וְקַשְׂקֶשֶׂת בַּמַּיִם',en:'…everything in the water that has fins and scales',gold:{'וְקַשְׂקֶשֶׂת':73.96},hot:{scales:73.96},hs:70,es:48},
 {a:78.52,b:82.60,ref:'EZEKIEL 29:3',he:'פַּרְעֹה מֶלֶךְ־מִצְרַיִם הַתַּנִּים הַגָּדוֹל הָרֹבֵץ בְּתוֹךְ יְאֹרָיו',en:'…Pharaoh, king of Egypt, the great dragon lying in the midst of his rivers',gold:{'הַתַּנִּים':80.80},hot:{dragon:80.80},hs:62,es:44},
 {a:82.60,b:86.12,ref:'EZEKIEL 29:4',he:'… בְּקַשְׂקְשֹׂתֶיךָ',en:'…to your scales',gold:{'בְּקַשְׂקְשֹׂתֶיךָ':84.46},hot:{scales:84.90},hs:84,es:54},
 {a:97.36,b:100.16,ref:'GENESIS 3:14',he:'עַל־גְּחֹנְךָ תֵלֵךְ וְעָפָר תֹּאכַל',en:'…on your belly you will go, and dust you will eat',gold:{'עַל־גְּחֹנְךָ':98.24,'וְעָפָר':99.18},hot:{belly:98.24,dust:99.18},hs:70,es:48},
 {a:100.16,b:105.52,ref:'GENESIS 3:15',he:'וּבֵין זַרְעֲךָ וּבֵין זַרְעָהּ הוּא יְשׁוּפְךָ רֹאשׁ',en:'…and between your offspring and hers. They will strike your head',gold:{'רֹאשׁ':102.36},hot:{head:104.72},hs:68,es:46},
 {a:109.38,b:114.40,ref:'1 SAMUEL 17:16',he:'וַיִּגַּשׁ הַפְּלִשְׁתִּי הַשְׁכֵּם וְהַעֲרֵב וַיִּתְיַצֵּב אַרְבָּעִים יוֹם',en:'The Philistine came out morning and evening and took his stand, forty days',gold:{'אַרְבָּעִים':110.16,'יוֹם':110.82,'הַשְׁכֵּם':113.26,'וְהַעֲרֵב':113.88},hot:{forty:111.60,days:111.80,morning:113.26,evening:113.88},hs:62,es:44},
 {a:114.40,b:117.10,ref:'1 SAMUEL 17:8',he:'בְּרוּ־לָכֶם אִישׁ וְיֵרֵד אֵלָי',en:'…choose a man for yourselves, and let him come down to me',gold:{'אִישׁ':115.88},hot:{man:115.88},hs:70,es:48},
 {a:119.76,b:122.50,ref:'1 SAMUEL 17:24',he:'וְכֹל אִישׁ יִשְׂרָאֵל בִּרְאוֹתָם אֶת־הָאִישׁ וַיָּנֻסוּ מִפָּנָיו',en:'All the men of Israel, when they saw the man, fled from him',gold:{'וַיָּנֻסוּ':121.54},hot:{fled:121.54},hs:64,es:46},
 {a:129.02,b:132.30,ref:'1 SAMUEL 17:35',he:'וַיָּקָם עָלַי וְהֶחֱזַקְתִּי בִּזְקָנוֹ',en:'…it rose against me, and I grabbed it by its beard',gold:{'בִּזְקָנוֹ':130.02},hot:{beard:130.02},hs:70,es:48},
 {a:135.28,b:138.26,ref:'1 SAMUEL 17:6',he:'וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו',en:'and a bronze “forehead” on his legs',gold:{'וּמִצְחַת':137.30,'נְחֹשֶׁת':137.70},hot:{forehead:135.28},hs:70,es:48},
 {a:151.00,b:156.70,ref:'1 SAMUEL 17:49',he:'וַיַּךְ אֶת־הַפְּלִשְׁתִּי אֶל־מִצְחוֹ וַתִּטְבַּע הָאֶבֶן בְּמִצְחוֹ',en:'…he struck the Philistine on his forehead, and the stone sank into his forehead',gold:{'אֶל־מִצְחוֹ':152.16,'בְּמִצְחוֹ':155.50},hot:{forehead:[153.34,155.70]},hs:64,es:46},
 {a:163.58,b:169.16,ref:'1 SAMUEL 17:49',he:'וַיִּפֹּל עַל־פָּנָיו אָרְצָה',en:'…and he fell on his face to the ground',gold:{'וַיִּפֹּל':164.68,'עַל־פָּנָיו':165.30,'אָרְצָה':165.88},hot:{fell:167.00,face:167.62,ground:168.32},hs:74,es:50},
 {a:175.88,b:178.42,ref:'1 SAMUEL 17:51',he:'וַיִּקַּח אֶת־חַרְבּוֹ וַיִּשְׁלְפָהּ מִתַּעְרָהּ',en:'…he took his sword and drew it from its sheath',gold:{'אֶת־חַרְבּוֹ':176.80},hot:{sword:176.80},hs:68,es:48},
];
const BN2=[
 {a:189.30,b:193.50,ref:'1 SAMUEL 5:3',he:'וְהִנֵּה דָגוֹן נֹפֵל לְפָנָיו אַרְצָה',en:'…and there was Dagon, fallen on his face to the ground',gold:{'נֹפֵל':191.90,'לְפָנָיו':192.30,'אַרְצָה':192.84},hot:{fallen:191.90,face:192.30,ground:192.84},hs:70,es:48},
 {a:197.28,b:201.50,ref:'1 SAMUEL 5:4',he:'וְרֹאשׁ דָּגוֹן וּשְׁתֵּי כַּפּוֹת יָדָיו כְּרֻתוֹת אֶל־הַמִּפְתָּן',en:'…and Dagon’s head and both his hands lay cut off on the threshold',gold:{'וְרֹאשׁ':199.88,'כְּרֻתוֹת':200.48},hot:{head:199.88,cut:200.48,off:200.68},hs:66,es:46},
 {a:207.88,b:211.60,ref:'1 SAMUEL 9:2',he:'מִשִּׁכְמוֹ וָמַעְלָה גָּבֹהַּ מִכָּל־הָעָם',en:'…from his shoulders up he was taller than all the people',gold:{'גָּבֹהַּ':208.20},hot:{taller:208.20},hs:70,es:48},
 {a:212.40,b:216.40,ref:'1 SAMUEL 17:11',he:'וַיִּשְׁמַע שָׁאוּל וְכָל־יִשְׂרָאֵל אֶת־דִּבְרֵי הַפְּלִשְׁתִּי הָאֵלֶּה וַיֵּחַתּוּ וַיִּרְאוּ מְאֹד',en:'When Saul and all Israel heard these words of the Philistine, they were dismayed and terribly afraid',gold:{'וַיֵּחַתּוּ':214.26,'וַיִּרְאוּ':215.46,'מְאֹד':215.46},hot:{dismayed:214.26,terribly:215.46,afraid:215.96},hs:58,es:42},
 {a:216.40,b:224.38,ref:'1 SAMUEL 17:38',he:'וַיַּלְבֵּשׁ שָׁאוּל אֶת־דָּוִד מַדָּיו וְנָתַן קוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ',en:'Saul dressed David in his own garments and put a bronze helmet on his head',gold:{'מַדָּיו':218.42,'קוֹבַע':219.66,'נְחֹשֶׁת':220.34,'עַל־רֹאשׁוֹ':221.04},hot:{garments:218.42,helmet:222.26,bronze:222.80,head:223.58},hs:62,es:44},
 {a:228.12,b:231.80,ref:'1 SAMUEL 17:39',he:'לֹא אוּכַל לָלֶכֶת בָּאֵלֶּה',en:'…I cannot walk in these',gold:{'לָלֶכֶת':230.44},hot:{walk:230.44},hs:74,es:50},
 {a:231.80,b:237.06,ref:'1 SAMUEL 17:39',he:'וַיְסִרֵם דָּוִד מֵעָלָיו',en:'…and David removed them from upon himself',gold:{'וַיְסִרֵם':232.42,'מֵעָלָיו':233.48},hot:{removed:234.80,upon:235.78},hs:76,es:50},
 {a:246.64,b:250.62,ref:'1 SAMUEL 17:40',he:'וַיִּקַּח מַקְלוֹ בְּיָדוֹ וַיִּבְחַר־לוֹ חֲמִשָּׁה חַלֻּקֵי־אֲבָנִים … וְקַלְּעוֹ בְיָדוֹ',en:'He took his staff in his hand and chose five smooth stones … and his sling was in his hand',gold:{'מַקְלוֹ':247.38,'חֲמִשָּׁה':248.32,'חַלֻּקֵי־אֲבָנִים':248.48,'וְקַלְּעוֹ':249.78},hot:{staff:247.38,five:248.32,smooth:248.48,stones:248.90,sling:249.78},hs:60,es:42},
 {a:255.22,b:258.08,ref:'1 SAMUEL 17:43',he:'הֲכֶלֶב אָנֹכִי כִּי־אַתָּה בָא־אֵלַי בַּמַּקְלוֹת',en:'…am I a dog, that you come to me with sticks?',gold:{'הֲכֶלֶב':255.62,'בַּמַּקְלוֹת':257.16},hot:{dog:255.62,sticks:257.16},hs:70,es:48},
 {a:258.08,b:262.84,ref:'1 SAMUEL 17:44',he:'לְכָה אֵלַי וְאֶתְּנָה אֶת־בְּשָׂרְךָ לְעוֹף הַשָּׁמַיִם וּלְבֶהֱמַת הַשָּׂדֶה',en:'…come to me, and I will give your flesh to the birds of the sky and the beasts of the field',gold:{'אֶת־בְּשָׂרְךָ':259.44,'לְעוֹף':260.08,'הַשָּׁמַיִם':260.60,'וּלְבֶהֱמַת':261.38,'הַשָּׂדֶה':262.00},hot:{flesh:259.44,birds:260.08,sky:260.60,beasts:261.38,field:262.00},hs:60,es:42},
 {a:263.98,b:268.98,ref:'1 SAMUEL 17:45',he:'',en:'You come to me with sword and spear and javelin, / and I come to you in the name of God …',hot:{sword:264.84,spear:265.56,javelin:266.24,god:268.62},hs:60,es:50},
 {a:269.80,b:276.12,ref:'1 SAMUEL 17:50',he:'וְחֶרֶב אֵין בְּיַד־דָּוִד',en:'…and there was no sword in David’s hand',gold:{'וְחֶרֶב':271.56,'אֵין':272.02,'בְּיַד־דָּוִד':272.42},hot:{no:274.00,sword:274.32,hand:275.32},hs:78,es:52},
 {a:276.12,b:279.80,ref:'1 SAMUEL 17:51',he:'וַיִּקַּח אֶת־חַרְבּוֹ … וַיִּכְרָת־בָּהּ אֶת־רֹאשׁוֹ',en:'…he took his sword … and cut off his head with it',gold:{'אֶת־חַרְבּוֹ':276.44,'אֶת־רֹאשׁוֹ':279.04},hot:{sword:276.44,head:279.04},hs:68,es:48},
 {a:282.40,b:285.80,ref:'1 SAMUEL 17:51',he:'וַיִּרְאוּ הַפְּלִשְׁתִּים כִּי־מֵת גִּבּוֹרָם וַיָּנֻסוּ',en:'…the Philistines saw that their champion was dead, and they fled',gold:{'גִּבּוֹרָם':283.58,'וַיָּנֻסוּ':284.82},hot:{champion:283.58,dead:284.00,fled:284.82},hs:68,es:48},
 {a:285.80,b:290.24,ref:'1 SAMUEL 17:24',he:'וְכֹל אִישׁ יִשְׂרָאֵל … וַיָּנֻסוּ מִפָּנָיו',en:'All the men of Israel … fled from him',gold:{'וַיָּנֻסוּ':289.00},hot:{fled:289.00},hs:68,es:48},
 {a:290.24,b:293.68,ref:'1 SAMUEL 17:52',he:'וַיָּקֻמוּ אַנְשֵׁי יִשְׂרָאֵל וִיהוּדָה וַיָּרִעוּ וַיִּרְדְּפוּ אֶת־הַפְּלִשְׁתִּים',en:'The men of Israel and Judah rose with a shout and pursued the Philistines',gold:{'וַיָּקֻמוּ':291.10,'וַיָּרִעוּ':291.90,'וַיִּרְדְּפוּ':292.50},hot:{rose:291.10,shout:291.90,pursued:292.50},hs:62,es:44},
 {a:293.68,b:297.60,ref:'1 SAMUEL 17:52',he:'וַיִּפְּלוּ חַלְלֵי פְלִשְׁתִּים בְּדֶרֶךְ שַׁעֲרַיִם וְעַד־גַּת וְעַד־עֶקְרוֹן',en:'…and the Philistine dead fell along the road … as far as Gath and Ekron',gold:{'וַיִּפְּלוּ':294.40,'וְעַד־גַּת':296.26},hot:{fell:294.40,gath:296.26},hs:64,es:46},
 {a:301.38,b:308.36,ref:'1 SAMUEL 17:46',he:'וְנָתַתִּי פֶּגֶר מַחֲנֵה פְלִשְׁתִּים הַיּוֹם הַזֶּה לְעוֹף הַשָּׁמַיִם וּלְחַיַּת הָאָרֶץ',en:'…and I will give the bodies of the Philistine army this day to the birds of the sky and the wild animals of the earth',gold:{'פֶּגֶר':303.34,'לְעוֹף':305.20,'הַשָּׁמַיִם':305.76,'וּלְחַיַּת':306.54,'הָאָרֶץ':307.64},hot:{bodies:303.34,birds:305.20,sky:305.76,animals:306.86,earth:307.64},hs:58,es:42},
 {a:313.86,b:318.94,ref:'1 SAMUEL 17:46',he:'וְיֵדְעוּ כָּל־הָאָרֶץ …',en:'…so the whole earth will know that there is a God in Israel',gold:{'וְיֵדְעוּ':313.86,'כָּל־הָאָרֶץ':314.28},hot:{whole:315.96,earth:316.26,know:316.84},hs:84,es:52},
];
const BN=HALF===1?BN1:BN2;
const conv=m=>{if(!m)return m;const o={};for(const k in m)o[k]=Array.isArray(m[k])?m[k].map(T):T(m[k]);return o;};
BN.forEach(b=>{b.t0=T(b.a);b.t1=T(b.b);b.g=conv(b.gold);b.h=conv(b.hot);});
const BC={};
function banner(t,B){const a=Math.min(sm(B.t0,B.t0+.3,t),1-sm(B.t1-.12,B.t1,t));if(a<=0.003)return;
 const hs=B.hs||60,es=B.es||42,mw=1640,k=B.ref+B.a;
 if(!BC[k])BC[k]={h:B.he?B.he.split(' / ').flatMap(s=>wrap(s,`500 ${hs}px "Frank Ruhl Libre"`,mw,true)):[],e:B.en.split(' / ').flatMap(s=>wrap(s,`italic 400 ${es}px Newsreader`,mw,false))};
 const L=BC[k],lh=hs*1.42,le=es*1.32,tot=34+L.h.length*lh+10+L.e.length*le;const y0=H-60-tot;
 X.save();const bg=X.createLinearGradient(0,y0-150,0,H);bg.addColorStop(0,'rgba(4,3,2,0)');bg.addColorStop(.28,`rgba(4,3,2,${.62*a})`);bg.addColorStop(.55,`rgba(4,3,2,${.82*a})`);bg.addColorStop(1,`rgba(4,3,2,${.9*a})`);X.fillStyle=bg;X.fillRect(0,y0-150,W,H-y0+150);X.restore();
 let yy=y0+12;TX(B.ref,W/2,yy,'300 30px Fraunces',GOLD,a,'center','5px');yy+=22+(L.h.length?lh*0.5:0);
 const occ={};L.h.forEach((ln,i)=>{heb(ln,W/2,yy,hs,a,{t,t0:B.t0+i*.15,gold:B.g,step:.045,occ});yy+=lh;});
 yy+=(L.h.length?10-lh*0.5:18)+le*0.5;const oc2={};L.e.forEach(ln=>{eng(ln,W/2,yy,es,a*sm(B.t0+.15,B.t0+.5,t),{t,hot:B.h,occ:oc2});yy+=le;});}

// ---------- shot lists (VO times) ----------
const S=(a,b,im,z0,z1,f0,f1,o)=>({a,b,k:'img',im,z0,z1,f0,f1,o:o||{}});
const G=(a,b,k,o)=>({a,b,k,o:o||{}});
const SH1=[
 S(0.00,7.64,'s10',1.00,1.10,[.5,.5],[.5,.46],{fx:['dust'],arm:'open',tick:1,spot:1}),
 S(7.64,10.58,'s02',1.00,1.12,[.5,.5],[.53,.47],{fx:['sweep'],xin:[.51,.33],wc:[[9.20,'נְחֹשֶׁת','bronze','1 SAMUEL 17:5',960,470,190]]}),
 S(10.58,13.44,'s03',1.00,1.10,[.5,.6],[.5,.62],{fx:['dust'],wc:[[12.10,'נָחָשׁ','serpent','GENESIS 3:1',960,270,190]]}),
 G(13.44,17.60,'G1'),
 S(17.60,21.74,'n11',1.00,1.12,[.5,.22],[.5,.6],{fx:['dust']}),
 G(21.74,25.02,'FH'),
 S(25.02,27.24,'s04',1.00,1.08,[.5,.4],[.5,.36],{fx:['sweep']}),
 S(27.24,33.74,'s05',1.00,1.00,[.5,.5],[.5,.5],{fx:['dust'],tk:0,tke:31.40,cam:[[27.24,1.0,.5,.5],[31.20,1.03,.5,.48],[33.45,2.15,.522,.16]],ret:[31.60,.522,.15]}),
 S(33.74,35.40,'s05',1.00,1.03,[.5,.5],[.5,.48],{fx:['dust'],tk:1,tke:35.25}),
 S(35.40,37.30,'s06',1.12,1.20,[.55,.22],[.55,.2],{fx:['sweep']}),
 S(37.30,40.20,'s07',1.00,1.10,[.5,.45],[.5,.4],{fx:['sweep']}),
 S(40.20,41.70,'n11',1.00,1.10,[.5,.4],[.5,.34],{fx:['dust']}),
 S(41.70,43.20,'s08',1.05,1.14,[.5,.35],[.5,.3],{fx:['sweep']}),
 S(43.20,46.02,'s09',1.00,1.10,[.5,.4],[.5,.35],{fx:['cool']}),
 S(46.02,52.32,'s10',1.04,1.00,[.5,.5],[.5,.5],{fx:['dust'],arm:'x4'}),
 S(52.32,55.12,'s12',1.00,1.12,[.5,.5],[.5,.42],{fx:['sweep','dust']}),
 S(55.12,62.80,'s11',1.00,1.32,[.5,.55],[.5,.3],{fx:['embers']}),
 S(62.80,66.88,'s17',1.00,1.10,[.5,.55],[.5,.62],{fx:['dust','haze']}),
 S(66.88,72.90,'s14',1.00,1.12,[.5,.42],[.56,.38],{fx:['sweep'],tk:2,tke:68.70,rg:[[69.74,.56,.36,140]]}),
 S(72.90,75.44,'s15b',1.00,1.10,[.5,.44],[.5,.4],{fx:['sweep']}),
 S(75.44,78.52,'s16',1.00,1.22,[.5,.55],[.58,.62],{fx:['haze'],rg:[[77.52,.62,.73,140]]}),
 S(78.52,82.60,'n02',1.00,1.12,[.45,.42],[.4,.38],{fx:['haze','dust']}),
 S(82.60,86.12,'s16',1.55,1.70,[.6,.66],[.6,.65],{fx:['sweep'],rg:[[84.46,.62,.73,140]]}),
 G(86.12,89.90,'TRI'),
 S(89.90,92.30,'s03',1.00,1.10,[.5,.55],[.5,.6],{fx:['dust'],lab:[90.40,'GENESIS 3',1000]}),
 S(92.30,95.96,'s18',2.40,2.50,[.18,.25],[.19,.26],{fx:['dust']}),
 S(95.96,100.16,'s19',1.20,1.32,[.62,.66],[.70,.66],{fx:['dust']}),
 S(100.16,105.52,'s20',1.00,1.12,[.42,.5],[.45,.5],{fx:['dust'],rg:[[104.72,.50,.50,105]]}),
 S(105.52,109.38,'s01',1.00,1.40,[.5,.45],[.5,.25],{fx:['dust'],rg:[[105.70,.505,.205,95]],rosh:105.80}),
 G(109.38,114.40,'MAP'),
 S(114.40,117.10,'n04',1.00,1.10,[.5,.36],[.46,.32],{fx:['dust'],kick:114.58}),
 S(117.10,119.76,'n03',1.00,1.08,[.5,.45],[.46,.45],{fx:['dust']}),
 S(119.76,122.50,'n05',1.10,1.20,[.5,.6],[.5,.65],{fx:['dust']}),
 S(122.50,126.64,'d01',2.00,2.12,[.55,.25],[.56,.24],{fx:['dust']}),
 S(126.64,129.02,'d02',1.00,1.10,[.5,.45],[.46,.45],{fx:['dust']}),
 S(129.02,130.98,'d03',1.10,1.20,[.62,.4],[.65,.38],{fx:['dust']}),
 S(130.98,138.26,'s04',1.00,1.22,[.5,.4],[.5,.55],{fx:['dust','haze'],tk:3,tks:133.96,tke:135.20}),
 S(138.26,145.64,'s10',1.00,1.00,[.5,.5],[.5,.5],{fx:['dust'],arm:'ht',cam:[[138.26,1.04,.5,.5],[143.30,1.0,.5,.5],[145.40,1.95,.51,.13]],ret:[143.94,.51,.115]}),
 S(145.64,147.26,'d04',1.00,1.10,[.5,.5],[.55,.42],{fx:['dust']}),
 S(147.26,150.54,'d05',1.00,1.28,[.5,.5],[.42,.3],{fx:['slow','dust']}),
 S(150.54,156.70,'n07',1.25,1.55,[.55,.3],[.57,.26],{fx:['dust'],imp:[150.54,.56,.26]}),
 G(156.70,159.48,'X2'),
 G(159.48,163.58,'ROOT'),
 S(163.58,166.80,'n09',1.00,1.10,[.5,.45],[.45,.45],{fx:['dust']}),
 S(166.80,172.04,'n10',1.08,1.20,[.55,.55],[.6,.58],{fx:['dust'],imp2:[167.00,.66,.62]}),
 S(172.04,178.42,'d06',1.00,1.16,[.5,.5],[.6,.42],{fx:['dust','sweep']}),
 G(178.42,183.0,'RC'),
];
const SH2=[
 S(180.55,185.00,'n12',1.00,1.07,[.5,.5],[.5,.46],{fx:['haze','dust'],lab:[183.46,'1 SAMUEL 5',100]}),
 S(185.00,188.50,'n12',1.30,1.45,[.5,.42],[.5,.45],{fx:['dust']}),
 S(188.50,193.50,'n13',1.00,1.10,[.45,.55],[.42,.6],{fx:['dust','haze']}),
 G(193.50,197.28,'CMP',{bg:'n13',rows:[
   {ref:'1 SAMUEL 17:49 · GOLIATH',he:'וַיִּפֹּל עַל־פָּנָיו אָרְצָה',en:'he fell on his face to the ground',on:193.50,gold:{'עַל־פָּנָיו':194.56,'אָרְצָה':195.20},hot:{face:194.56,ground:195.20}},
   {ref:'1 SAMUEL 5:3 · DAGON',he:'נֹפֵל לְפָנָיו אַרְצָה',en:'fallen on his face to the ground',on:194.00,gold:{'לְפָנָיו':194.56,'אַרְצָה':195.20},hot:{face:194.56,ground:195.20}}]}),
 S(197.28,201.50,'n14',1.00,1.14,[.5,.55],[.5,.65],{fx:['dust']}),
 S(201.50,203.82,'d01',2.00,2.08,[.55,.25],[.56,.24],{fx:['dust'],tk:4,tks:201.50,tke:203.70}),
 S(203.82,209.88,'n15',1.00,1.16,[.45,.45],[.42,.32],{fx:['dust'],lab:[206.82,'KING SAUL',96]}),
 S(209.88,212.40,'n04',1.00,1.08,[.5,.36],[.46,.32],{fx:['dust'],kick:210.56}),
 S(212.40,216.40,'n15',1.40,1.55,[.42,.26],[.42,.23],{fx:['dust']}),
 S(216.40,224.38,'n16',1.00,1.16,[.5,.45],[.56,.3],{fx:['dust']}),
 G(224.38,228.12,'HELM'),
 S(228.12,231.80,'n16',1.45,1.56,[.63,.3],[.64,.28],{fx:['dust']}),
 S(231.80,237.06,'n17',1.00,1.12,[.42,.42],[.36,.36],{fx:['dust']}),
 S(237.06,241.60,'n18',1.00,1.10,[.5,.5],[.45,.48],{fx:['dust','haze']}),
 G(241.60,246.64,'CMP',{bg:'n18',rows:[
   {ref:'1 SAMUEL 17:39 · DAVID TAKES OFF THE ARMOR',he:'וַיְסִרֵם דָּוִד מֵעָלָיו',en:'David removed them from upon himself',on:241.60,gold:{'וַיְסִרֵם':242.10,'מֵעָלָיו':242.50},hot:{removed:242.10,upon:242.50}},
   {ref:'1 SAMUEL 17:46 · DAVID TO GOLIATH',he:'וַהֲסִרֹתִי אֶת־רֹאשְׁךָ מֵעָלֶיךָ',en:'I will remove your head from upon you',on:243.40,gold:{'וַהֲסִרֹתִי':244.42,'אֶת־רֹאשְׁךָ':245.04,'מֵעָלֶיךָ':245.34},hot:{remove:244.42,head:245.04,upon:245.56}}]}),
 S(246.64,250.62,'n19',1.50,1.58,[.36,.55],[.36,.52],{fx:['dust']}),
 S(250.62,252.76,'n19',1.50,1.50,[.36,.55],[.36,.55],{fx:['dust'],arm:'dv'}),
 S(252.76,255.22,'s06',1.05,1.15,[.6,.4],[.62,.38],{fx:['dust']}),
 S(255.22,258.08,'n04',1.05,1.15,[.5,.36],[.45,.32],{fx:['dust'],kick:255.62}),
 S(258.08,262.84,'n20',1.00,1.12,[.5,.4],[.5,.35],{fx:['haze']}),
 S(262.84,267.00,'s10',1.04,1.00,[.5,.5],[.5,.5],{fx:['dust'],arm:'sw'}),
 S(267.00,268.98,'n18',1.20,1.30,[.3,.5],[.28,.48],{fx:['dust']}),
 S(268.98,276.12,'n21',1.00,1.14,[.6,.5],[.68,.5],{fx:['dust']}),
 S(276.12,279.80,'d06',1.00,1.10,[.5,.5],[.58,.42],{fx:['dust','sweep']}),
 S(279.80,282.40,'n10',1.00,1.08,[.5,.5],[.45,.5],{fx:['dust','haze']}),
 S(282.40,285.80,'n22',1.00,1.12,[.5,.5],[.5,.45],{fx:['dust']}),
 G(285.80,293.68,'MAP2'),
 S(293.68,297.60,'n23',1.00,1.12,[.5,.5],[.58,.4],{fx:['dust','haze'],gath:1}),
 S(297.60,300.28,'n18',1.30,1.40,[.28,.5],[.27,.48],{fx:['dust']}),
 S(300.28,308.36,'n20',1.15,1.25,[.45,.4],[.55,.4],{fx:['haze']}),
 G(308.36,312.38,'CMP',{bg:'n20',rows:[
   {ref:'1 SAMUEL 17:44 · GOLIATH',he:'וְאֶתְּנָה אֶת־בְּשָׂרְךָ לְעוֹף הַשָּׁמַיִם וּלְבֶהֱמַת הַשָּׂדֶה',en:'I will give your flesh to the birds of the sky and the beasts of the field',on:308.36,gold:{'לְעוֹף':309.44,'הַשָּׁמַיִם':309.44},hot:{birds:309.44,sky:309.44}},
   {ref:'1 SAMUEL 17:46 · DAVID',he:'וְנָתַתִּי פֶּגֶר מַחֲנֵה פְלִשְׁתִּים … לְעוֹף הַשָּׁמַיִם וּלְחַיַּת הָאָרֶץ',en:'I will give the bodies of the Philistine army … to the birds of the sky and the wild animals of the earth',on:308.90,gold:{'לְעוֹף':309.88,'הַשָּׁמַיִם':309.88},hot:{birds:309.88,sky:309.88}}],hs:62,es:44}),
 S(312.38,318.94,'n18',1.00,1.00,[.5,.5],[.5,.5],{fx:['haze','dust'],cam:[[312.38,1.14,.5,.45],[318.9,1.0,.5,.5]]}),
 S(318.94,324.38,'n21',1.10,1.25,[.7,.5],[.72,.45],{fx:['dust']}),
 G(324.38,340,'END'),
];
const SH=HALF===1?SH1:SH2;
window.SHOTS=SH;
// ---------- engine ----------
const st=i=>i>0?T(SH[i].a):0, en=i=>i<SH.length-1?T(SH[i].b):END_T;
function shotAt(t){for(let i=0;i<SH.length;i++){if(t>=st(i)&&t<en(i))return i;}return SH.length-1;}
function geo(s,t,t0,t1){let z,fx,fy;const o=s.o;
 if(o.cam){const ks=o.cam.map(k=>[T(k[0]),k[1],k[2],k[3]]);let j=0;while(j+1<ks.length&&t>=ks[j+1][0])j++;const A=ks[j],B=ks[Math.min(j+1,ks.length-1)];const u=(A===B||t<=A[0])?0:ease((t-A[0])/(B[0]-A[0]));z=lerp(A[1],B[1],u);fx=lerp(A[2],B[2],u);fy=lerp(A[3],B[3],u);}
 else{const x=(t-t0)/Math.max(1e-3,t1-t0),u=ease(x);z=s.z0+(s.z1-s.z0)*u;fx=s.f0[0]+(s.f1[0]-s.f0[0])*u;fy=s.f0[1]+(s.f1[1]-s.f0[1])*u;}
 if(o.kick!==undefined){const k=t-T(o.kick);if(k>=0)z*=1+0.04*Math.exp(-k*6)*(k<0.05?k/0.05:1);}
 if(o.imp){const k=t-T(o.imp[0]);if(k>=0)z*=1+0.06*Math.exp(-k*5)*(k<0.04?k/0.04:1);}
 if(s.zx){z*=s.zx;fx=s.zf[0];fy=s.zf[1];}
 const im=IM[s.im],sw=im.width,sh=im.height,ww=sw/z,hh=ww*H/W;const cx=Math.min(Math.max(fx*sw,ww/2),sw-ww/2),cy=Math.min(Math.max(fy*sh,hh/2),sh-hh/2);
 return {im,x0:cx-ww/2,y0:cy-hh/2,ww,hh,sc:ww/W,sw,sh};}
const P=(g,fx,fy)=>[(fx*g.sw-g.x0)/g.sc,(fy*g.sh-g.y0)/g.sc];
function drawOv(n,a,dy,dx){const o=OI[n];if(!o||a<=0)return;X.globalAlpha=Math.min(1,a);X.drawImage(o.im,o.x+(dx||0),o.y+(dy||0));X.globalAlpha=1;}
function drawOvAt(n,cx,cy,a,sc){const o=OI[n];if(!o||a<=0)return;sc=sc||1;const w=o.im.width*sc,h=o.im.height*sc;X.globalAlpha=Math.min(1,a);X.drawImage(o.im,cx-w/2,cy-h/2,w,h);X.globalAlpha=1;}
function ring(px,py,R,k,t){const scl=(1.18-0.18*eo(k))*(1+0.025*Math.sin(t*4.2));X.save();X.globalAlpha=clamp(k*1.5);
 X.strokeStyle='rgba(255,196,100,1)';X.lineWidth=10;X.shadowColor='rgba(255,180,80,.95)';X.shadowBlur=26;X.beginPath();X.arc(px,py,R*scl,-Math.PI/2,-Math.PI/2+Math.PI*2*eo(k*1.6));X.stroke();
 X.shadowBlur=0;X.strokeStyle='rgba(255,238,195,1)';X.lineWidth=4;X.stroke();X.restore();}
function reticle(px,py,k,t){const R=140*(1.6-0.6*eo(k));X.save();X.globalAlpha=clamp(k*1.4);X.strokeStyle='rgba(255,214,140,.95)';X.lineWidth=3;X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=16;
 X.beginPath();X.arc(px,py,R,0,Math.PI*2);X.stroke();X.beginPath();X.arc(px,py,R*0.45,0,Math.PI*2);X.stroke();
 for(let q=0;q<4;q++){const a=q*Math.PI/2+t*0.4;X.beginPath();X.moveTo(px+Math.cos(a)*R*1.12,py+Math.sin(a)*R*1.12);X.lineTo(px+Math.cos(a)*R*0.62,py+Math.sin(a)*R*0.62);X.stroke();}X.restore();}
function glow(x,y,r,a){if(a<=0)return;X.save();X.globalCompositeOperation='lighter';const g=X.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(255,220,160,${.75*a})`);g.addColorStop(.3,`rgba(240,175,85,${.32*a})`);g.addColorStop(1,'rgba(240,175,85,0)');X.fillStyle=g;X.fillRect(x-r,y-r,2*r,2*r);X.restore();}
function dust(t,seed,n,warm){rs=seed;X.save();X.globalCompositeOperation='lighter';
 for(let i=0;i<n;i++){const x0=rnd()*W,y0=rnd()*H,vx=(rnd()-.3)*14,vy=-(4+rnd()*12),sz=0.6+rnd()*2.6,ph=rnd()*6.28,fl=0.5+0.5*Math.sin(t*(0.8+rnd()*1.6)+ph);
  let x=(x0+vx*t+Math.sin(t*0.6+ph)*18)%W;if(x<0)x+=W;let y=(y0+vy*t)%H;if(y<0)y+=H;X.globalAlpha=(0.10+0.40*fl)*(warm||1);const s=sz*6;X.drawImage(DOT,x-s/2,y-s/2,s,s);}X.restore();}
function embers(t,seed,n){rs=seed;X.save();X.globalCompositeOperation='lighter';
 for(let i=0;i<n;i++){const x0=rnd()*W,sp=30+rnd()*60,ph=rnd()*6.28,sz=1+rnd()*2.4,life=4+rnd()*4;const tt=(t+rnd()*life)%life;
  const x=x0+Math.sin(tt*1.3+ph)*40+tt*8,y=H+20-tt*sp*1.6;X.globalAlpha=0.65*Math.sin(Math.PI*tt/life);const s=sz*7;X.drawImage(EMB,x-s/2,y-s/2,s,s);}X.restore();}
function burst(t,t0,px,py,n,seed){const k=t-t0;if(k<0||k>2.2)return;rs=seed;X.save();X.globalCompositeOperation='lighter';
 for(let i=0;i<n;i++){const an=rnd()*Math.PI*2,sp=300+rnd()*900,dr=1.8+rnd()*1.5,x=px+Math.cos(an)*sp*(1-Math.exp(-k*dr))/dr,y=py+Math.sin(an)*sp*(1-Math.exp(-k*dr))/dr+40*k*k;
  X.globalAlpha=clamp(1-k/1.6)*(0.4+0.6*rnd());const s=(2+rnd()*5)*7;X.drawImage(DOT,x-s/2,y-s/2,s,s);}X.restore();}
function sweep(t,t0,t1){const u=(t-t0)/Math.max(0.5,t1-t0);const x=-W*0.5+u*W*2.0;X.save();X.globalCompositeOperation='soft-light';
 const g=X.createLinearGradient(x-420,0,x+420,H*0.35);g.addColorStop(0,'rgba(255,230,180,0)');g.addColorStop(.5,'rgba(255,236,196,.5)');g.addColorStop(1,'rgba(255,230,180,0)');X.fillStyle=g;X.fillRect(0,0,W,H);X.restore();}
function haze(t){X.save();X.globalAlpha=0.16;X.globalCompositeOperation='screen';const ox=(t*14)%W;X.drawImage(FOG,-ox,0,W,H);X.drawImage(FOG,W-ox,0,W,H);X.restore();}
function dim(a){X.fillStyle=`rgba(0,0,0,${a})`;X.fillRect(0,0,W,H);}
// ---------- four-clue tracker ----------
const CL=[['נְחֹשֶׁת','bronze'],['קַשְׂקַשִּׂים','scales'],['מִצְחַת','“forehead”'],['','on David']];
function tracker(t,m,t0,tend){const a=sm(t0,t0+.3,t)*(tend?1-sm(tend-.2,tend,t):1);if(a<=0)return;const cy=600,R=78,gap=270,x0=960-1.5*gap;
 dim(0.55*a);scrim(960,cy+40,820,330,a);
 TX('FOUR CLUES',960,cy-160,'300 40px Fraunces',GL,a,'center','12px');
 const tl=m===0?T(30.46):t0;
 for(let n=1;n<=4;n++){const x=x0+(n-1)*gap,ap=m===0?a*sm(T(28.14)+(n-1)*.16,T(28.14)+(n-1)*.16+.3,t):a;if(ap<=0)continue;
  const act=(m===0&&n===3&&t>=tl)||(m===n),done=m>0&&n<m,ka=act?sm(tl,tl+.3,t):0;
  X.save();X.globalAlpha=ap;X.fillStyle=done?'rgba(217,180,106,.22)':'rgba(8,5,2,.7)';X.beginPath();X.arc(x,cy,R,0,Math.PI*2);X.fill();
  X.lineWidth=act?6:4;X.strokeStyle=act?`rgba(243,207,134,${.6+.4*ka})`:done?'rgba(217,180,106,.9)':'rgba(217,180,106,.55)';if(act){X.shadowColor='rgba(250,180,70,.9)';X.shadowBlur=30*ka;}X.stroke();X.restore();
  X.save();X.globalAlpha=ap;X.font='500 86px Newsreader';X.textAlign='center';X.textBaseline='middle';X.fillStyle=act?gv(cy-42,cy+42):done?'#e9cf96':'rgba(239,230,212,.75)';X.fillText(String(n),x,cy+4);X.restore();
  if(m===0&&n===3)TX('where the stone lands',x,cy+R+52,'italic 400 44px Newsreader',GL,ka*ap);
  else if(act||done){let y=cy+R+54;if(CL[n-1][0]){heb(CL[n-1][0],x,y,48,ap*(act?ka:1),{allGold:act});y+=50;}TX(CL[n-1][1],x,y,'italic 400 38px Newsreader',IVORY,ap*(act?ka:.9));}}}
// ---------- callouts ----------
const AP={helm:[.51,.10],jav:[.575,.16],coat:[.51,.33],leg:[.565,.78],sword:[.43,.18],spear:[.445,.62],staff:[.29,.45],bag:[.37,.62],sling:[.53,.80]};
function callout(px,py,lx,ly,p,a){if(p<=0||a<=0)return;X.save();X.globalAlpha=a;X.strokeStyle='rgba(246,220,152,.95)';X.lineWidth=2.5;X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=10;
 const ex=lx+(px<lx?-30:30);const p1=clamp(p*2),p2=clamp(p*2-1);X.beginPath();X.moveTo(px,py);X.lineTo(lerp(px,ex,p1),lerp(py,ly,p1));if(p2>0)X.lineTo(lerp(ex,lx,p2),ly);X.stroke();
 X.fillStyle='#fff0c4';X.beginPath();X.arc(px,py,7,0,Math.PI*2);X.fill();X.restore();glow(px,py,40,a*.8);}
function ARM(t,g,mode){const L=[],add=(key,lx,ly,al,on,lab,he,sub,lit)=>L.push({key,lx,ly,al,on,lab,he,sub,lit});
 if(mode==='open'){add('helm',700,160,'right',4.30,'HELMET',null,'bronze',6.56);add('coat',640,420,'right',4.90,'COAT OF SCALES',null,'bronze',6.62);add('leg',1260,790,'left',5.50,'LEG GUARDS',null,'bronze',6.68);add('jav',1260,230,'left',6.00,'JAVELIN',null,'bronze',6.74);}
 if(mode==='x4'){add('helm',700,160,'right',46.30,'HELMET','נְחֹשֶׁת',null,48.18);add('coat',640,420,'right',46.45,'COAT OF SCALES','נְחֹשֶׁת',null,48.36);add('leg',1260,790,'left',46.60,'LEG GUARDS','נְחֹשֶׁת',null,48.54);add('jav',1260,230,'left',46.75,'JAVELIN','נְחֹשֶׁת',null,48.72);}
 if(mode==='ht'){add('helm',700,200,'right',139.22,null,'כּוֹבַע נְחֹשֶׁת','a bronze helmet · 17:5',139.52);add('leg',1260,790,'left',140.80,null,'מִצְחַת נְחֹשֶׁת','a bronze “forehead” · 17:6',141.20);}
 if(mode==='sw'){add('sword',640,210,'right',264.84,'SWORD',null,null,264.84);add('spear',640,640,'right',265.56,'SPEAR',null,null,265.56);add('jav',1260,230,'left',266.24,'JAVELIN',null,null,266.24);}
 if(mode==='dv'){add('staff',560,300,'right',250.70,'STAFF',null,null,250.70);add('bag',600,700,'right',250.85,'BAG',null,null,250.85);add('sling',1620,860,'left',251.00,'SLING',null,null,251.00);}
 const fade=mode==='ht'?1-sm(T(143.30),T(143.70),t):1;
 if(mode==='ht'){const tl=T(141.82);if(t>=tl){const [hx,hy]=P(g,...AP.helm),[lx,ly]=P(g,...AP.leg),p=eo((t-tl)/0.7);X.save();X.globalAlpha=fade;X.strokeStyle='rgba(246,220,152,.9)';X.lineWidth=3;X.setLineDash([10,12]);X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=12;
   X.beginPath();X.moveTo(hx+90,hy);X.lineTo(hx+90,lerp(hy,ly,p));X.stroke();X.restore();}}
 for(const c of L){const ton=T(c.on);if(t<ton)continue;const p=eo((t-ton)/0.45),a=clamp((t-ton)/0.2)*fade;const [px,py]=P(g,...AP[c.key]);callout(px,py,c.lx,c.ly,p,a);
  const la=a*sm(ton+.2,ton+.45,t),tl=T(c.lit),lk=sm(tl,tl+.25,t),xa=c.al==='right'?c.lx-14:c.lx+14;
  scrim(c.al==='right'?c.lx-180:c.lx+180,c.ly+20,260,c.he?110:70,la);
  let y=c.ly;if(c.lab){TX(c.lab,xa,y,'300 38px Fraunces',IVORY,la,c.al,'6px');y+=54;}
  if(c.he){X.save();X.font='500 62px "Frank Ruhl Libre"';const w=X.measureText(c.he).width;X.restore();const hx=c.al==='right'?xa-w/2:xa+w/2;heb(c.he,hx,y+6,62,la*(1-lk));if(lk>0){heb(c.he,hx,y+6,62,la*lk,{allGold:true});glow(hx,y+6,110,lk*(1-sm(tl+.3,tl+1.2,t))*.7);}y+=64;}
  if(c.sub){const sa=c.lab?la*lk:la;TX(c.sub,xa,y,'italic 400 46px Newsreader',c.lab?GL:IVORY,sa,c.al);if(c.lab&&lk>0)glow(xa+(c.al==='right'?-60:60),y,90,lk*(1-sm(tl+.3,tl+1.0,t))*.6);}
  if(!c.he&&!c.sub&&lk>0)glow(px,py,70,lk*(1-sm(tl+.3,tl+1.0,t)));}
 if(mode==='x4'){const ts=T(48.54);if(t>=ts){const p=clamp((t-ts)/0.3),sc=1.7-0.7*eob(p);X.save();X.globalAlpha=clamp((t-ts)/0.08);X.translate(1560,560);X.scale(sc,sc);X.font='500 170px Newsreader';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(-80,80);X.shadowColor='rgba(250,180,70,.85)';X.shadowBlur=30;X.fillText('×4',0,0);X.restore();}
  const tr=T(49.16);if(t>=tr)TX('1 SAMUEL 17:5–6',1560,690,'300 30px Fraunces',GOLD,sm(tr,tr+.3,t),'center','5px');}
 if(mode==='dv'){const tn=T(251.00);TX('no bronze',1500,300,'italic 400 56px Newsreader',GL,sm(tn,tn+.3,t),'center');}}
// ---------- graphics shots ----------
function bg(name){X.drawImage(IM[name],0,0);}
function G1(t,t0,t1){bg('B_s03');const a=clamp((t-t0)/0.3);const tb=T(15.36);X.save();const z=1+0.04*eo((t-t0)/(t1-t0));X.translate(960,540);X.scale(z,z);X.translate(-960,-540);
 if(t<tb)drawOv('g1a',a);else if(t<tb+0.4){const k=(t-tb)/0.4;drawOv('g1a',1-k);drawOv('g1b',k);}else drawOv('g1b',1);
 if(t>=tb){const k=t-tb;glow(1030,330,260,0.9*Math.exp(-k*1.6)*sm(0,.15,k));}
 X.restore();}
function panel(im,cx,cy,pw,ph,cr,p,a,base){const i=IM[im];const sx=cr[0]*i.width,sy=cr[1]*i.height,sw=cr[2]*i.width,sh=sw*ph/pw;base=base??0.35;
 X.save();X.globalAlpha=a*(base+(1-base)*p);X.filter=p<1?`saturate(${0.4+0.6*p}) brightness(${0.6+0.4*p})`:'none';X.drawImage(i,sx,sy,sw,sh,cx-pw/2,cy-ph/2,pw,ph);X.filter='none';
 X.strokeStyle=`rgba(250,214,140,${0.35+0.65*p})`;X.lineWidth=3+2*p;X.shadowColor='rgba(255,180,80,.8)';X.shadowBlur=30*p;X.strokeRect(cx-pw/2,cy-ph/2,pw,ph);X.restore();
 return (fx,fy)=>[cx-pw/2+(fx*i.width-sx)/sw*pw,cy-ph/2+(fy*i.height-sy)/sh*ph];}
function lineTo(x1,y1,x2,y2,t,ton){if(t<ton)return;const p=eo((t-ton)/0.45);X.save();X.strokeStyle='rgba(250,214,140,.9)';X.lineWidth=3;X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=14;X.beginPath();X.moveTo(x1,y1);X.lineTo(x1+(x2-x1)*p,y1+(y2-y1)*p);X.stroke();X.restore();}
function FH(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.25);const tw=T(22.50)-1.10+0.08,tr=T(24.10);
 const pl=panel('s06',500,620,800,560,[.36,.06,.5],sm(tw,tw+.4,t),a,0.75),pr=panel('n11',1420,620,800,560,[.18,.0,.64],sm(tr,tr+.4,t),a,0.75);
 const [fx,fy]=pl(.62,.29),[gx,gy]=pr(.5,.2);if(t>=tw)ring(fx,fy,95,(t-tw)/0.35,t);if(t>=tr)ring(gx,gy,120,(t-tr)/0.35,t);
 wordCard(t,tw,'מֵצַח','forehead',null,960,170,140);lineTo(860,210,fx+60,fy-80,t,tw+.2);lineTo(1060,210,gx-60,gy-90,t,tr);
 TX('HIS FOREHEAD',500,935,'300 32px Fraunces',IVORY,a*sm(tw,tw+.3,t),'center','8px');TX('HIS LEGS',1420,935,'300 32px Fraunces',IVORY,a*sm(tr,tr+.3,t),'center','8px');}
function HELM(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.25);const tg=T(225.06);
 panel('s06',500,470,800,520,[.38,.0,.5],1,a);panel('n16',1420,470,800,520,[.44,.0,.42],1,a);
 const row=(he,lab,ref,x)=>{heb(he,x,800,66,a,{t,gold:{'וְכוֹבַע':tg,'קוֹבַע':tg,'נְחֹשֶׁת':tg,'עַל־רֹאשׁוֹ':tg}});TX(lab,x,880,'italic 400 42px Newsreader',IVORY,a);TX(ref,x,936,'300 28px Fraunces',GOLD,a,'center','5px');};
 row('וְכוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ','Goliath: a bronze helmet on his head','1 SAMUEL 17:5',500);row('קוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ','David: a bronze helmet on his head','1 SAMUEL 17:38',1420);
 if(t>=tg)glow(960,800,300,0.6*Math.exp(-(t-tg)*1.5));}
function TRI(t,t0,t1){X.fillStyle='#050302';X.fillRect(0,0,W,H);const pw=W/3;
 const pans=[['s03',[.3,.1,.4],T(87.94),'נָחָשׁ','the serpent'],['s01',[.36,.04,.28],T(86.12)-0.3,null,'the giant'],['s16',[.42,.36,.45],T(88.86),'הַתַּנִּים','the dragon']];
 for(let k=0;k<3;k++){const [im,cr,ton,he,enl]=pans[k];const i=IM[im];const p=clamp((t-ton+0.2)/0.45);
  const sx=cr[0]*i.width,sy=cr[1]*i.height,sw=cr[2]*i.width,sh=sw*H/pw;const drift=(t-t0)*6;
  X.save();X.globalAlpha=0.22+0.78*p;X.filter=p<1?`saturate(${0.2+0.8*p}) brightness(${0.4+0.6*p})`:'none';X.beginPath();X.rect(k*pw+6,0,pw-12,H);X.clip();X.drawImage(i,sx+drift,sy,sw,Math.min(sh,i.height-sy),k*pw+6,0,pw-12,H);X.filter='none';X.restore();
  X.save();X.strokeStyle=`rgba(217,180,106,${0.3+0.4*p})`;X.lineWidth=2;X.strokeRect(k*pw+6,4,pw-12,H-8);X.restore();
  const la=clamp((t-ton-0.15)/0.3),cx=k*pw+pw/2;if(la>0){scrim(cx,930,300,110,la);if(he)heb(he,cx,900,70,la,{allGold:true});TX(enl,cx,he?975:940,'italic 400 46px Newsreader',IVORY,la);}}}
function ridge(pts,a){X.save();X.beginPath();X.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))X.lineTo(p[0],p[1]);X.lineTo(pts[pts.length-1][0],H);X.lineTo(pts[0][0],H);X.closePath();
 const g=X.createLinearGradient(0,260,0,H);g.addColorStop(0,`rgba(70,48,22,${a})`);g.addColorStop(.5,`rgba(28,19,9,${a})`);g.addColorStop(1,`rgba(8,6,3,${a})`);X.fillStyle=g;X.fill();X.restore();
 for(let k=0;k<5;k++){X.save();X.globalAlpha=a*(k?0.42-k*0.07:1);X.strokeStyle=k?GOLD:GL;X.lineWidth=k?2:4;if(!k){X.shadowColor='rgba(255,180,80,.85)';X.shadowBlur=16;}
  X.beginPath();pts.forEach((p,i)=>{const y=p[1]+k*30;i?X.lineTo(p[0],y):X.moveTo(p[0],y);});X.stroke();X.restore();}}
const LR=[[0,520],[170,380],[400,290],[620,370],[850,600],[915,630]],RR=[[1005,630],[1070,600],[1300,370],[1520,290],[1750,380],[1920,520]];
function mapBase(t,a){X.fillStyle='#070503';X.fillRect(0,0,W,H);const sky=X.createRadialGradient(960,250,50,960,250,1000);sky.addColorStop(0,`rgba(95,64,28,${.55*a})`);sky.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=sky;X.fillRect(0,0,W,H);
 ridge(LR,a);ridge(RR,a);X.save();X.globalAlpha=a;X.strokeStyle='rgba(250,226,160,.95)';X.lineWidth=4;X.shadowColor='rgba(255,200,120,.95)';X.shadowBlur=16;X.beginPath();for(let x=880;x<=1040;x+=5){const y=640+Math.sin(x*0.07+t*3)*6;x>880?X.lineTo(x,y):X.moveTo(x,y);}X.stroke();X.restore();
 TX('PHILISTINES',400,205,'300 38px Fraunces',GL,a,'center','10px');TX('ISRAEL',1520,205,'300 38px Fraunces',GL,a,'center','10px');TX('THE VALLEY OF ELAH',960,700,'300 30px Fraunces',GOLD,a*.9,'center','8px');}
function armyPts(x0,x1,yy,seed){rs=seed;const o=[];for(let i=0;i<60;i++){const r=Math.floor(i/30),x=lerp(x0,x1,(i%30)/29)+(rnd()-.5)*6,y=yy+r*20+Math.abs(x-(x0+x1)/2)*0.32;o.push([x,y,rnd()]);}return o;}
function dot(x,y,r,a){X.save();X.globalAlpha=a;X.fillStyle='#f3dca0';X.shadowColor='rgba(255,190,90,.8)';X.shadowBlur=8;X.beginPath();X.arc(x,y,r,0,Math.PI*2);X.fill();X.restore();}
const gpos=q=>[lerp(470,900,q),lerp(300,620,q)-Math.sin(q*Math.PI)*24];
function dayCounter(day,mo,a){TX('DAY',960,92,'300 32px Fraunces',GOLD,a,'center','10px');X.save();X.globalAlpha=a;X.font='500 120px Newsreader';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(130,250);X.shadowColor='rgba(250,180,70,.8)';X.shadowBlur=24;X.fillText(String(day),960,186);X.restore();if(mo)TX(mo,960,278,'italic 400 46px Newsreader',IVORY,a);}
function MAP(t,t0,t1){const a=clamp((t-t0)/0.3);mapBase(t,a);
 for(const [x,y] of armyPts(280,520,268,3))dot(x,y,5,a*.95);for(const [x,y] of armyPts(1400,1640,268,9))dot(x,y,5,a*.95);
 const tA=T(110.16),tC=T(113.90);const u=clamp((t-tA)/(tC-tA));const d=1+39*u;const day=t<tA?1:Math.min(40,Math.floor(d));const ph=t<tA?0:(t>=tC?1:Math.abs(Math.sin(Math.PI*d)));
 for(let k=1;k<10&&t>=tA&&t<tC;k++){const dd=1+39*clamp((t-k*0.03-tA)/(tC-tA));const [qx,qy]=gpos(Math.abs(Math.sin(Math.PI*dd)));glow(qx,qy,60,(1-k/10)*.45);}
 const [gx,gy]=gpos(ph);glow(gx,gy,130,a);dot(gx,gy,16,a);TX('GOLIATH',gx,gy+52,'300 30px Fraunces',IVORY,a*(t<tA?1:1-sm(tA,tA+.4,t)),'center','8px');
 const mo=t>=tC?'':((day%2)?'morning':'evening');dayCounter(day,mo,a);}
function MAP2(t,t0,t1){const a=clamp((t-t0)/0.3);mapBase(t,a);const tr=T(288.60),tf=T(290.24),tg=T(290.70);
 const back=sm(tr,tr+1.0,t);
 const P1=armyPts(280,520,268,3),P2=armyPts(1400,1640,268,9);
 P1.forEach(([x,y,r],i)=>{const k=sm(tg+.3+r*.6,tg+2.4+r*.6,t);dot(x-k*(700+r*300),y+k*(r-.5)*40,5,a*.95*(1-k*.6));});
 P2.forEach(([x,y,r],i)=>{let px=x+back*(60+r*50),py=y-back*20;const k=sm(tg+r*.5,tg+2.6+r*.5,t);if(k>0){const q=k;px=lerp(px,lerp(980,420+r*200,clamp(q*1.4-.4)),clamp(q*1.6));py=lerp(py,q<.6?lerp(py,640,q/.6):lerp(640,300+r*60,(q-.6)/.4),1);}dot(px,py,5,a*.95);});
 const [gx,gy]=gpos(1);const fall=sm(tf,tf+.6,t);glow(gx,gy,130,a*(1-fall*.85));dot(gx,gy,16,a*(1-fall*.7));if(fall>0)TX('✕',gx,gy,'300 44px Fraunces',GOLD,fall*.9);
 dayCounter(40,null,a*(1-sm(tf,tf+.5,t)));}
function X2(t,t0){bg('B_n07');const a=clamp((t-t0)/0.3);const t1=T(157.52),t2=T(158.32);
 scrim(960,520,900,500,a);TX('1 SAMUEL 17:49',960,250,'300 32px Fraunces',GOLD,a,'center','6px');
 const w=(he,enx,x,tl)=>{const k=sm(tl,tl+.25,t);heb(he,x,470,120,a*.55*(1-k));if(k>0){heb(he,x,470,120,a*k,{allGold:true});glow(x,470,220,k*(1-sm(tl+.3,tl+1.2,t))*.8);}TX(enx,x,585,'italic 400 46px Newsreader',IVORY,a*(.6+.4*k));};
 w('אֶל־מִצְחוֹ','on his forehead',1360,t1);w('בְּמִצְחוֹ','into his forehead',560,t2);
 if(t>=t2){const p=clamp((t-t2)/0.3),sc=1.6-0.6*eob(p);X.save();X.globalAlpha=clamp((t-t2)/0.08);X.translate(960,770);X.scale(sc,sc);X.font='500 150px Newsreader';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(-70,70);X.shadowColor='rgba(250,180,70,.85)';X.shadowBlur=30;X.fillText('×2',0,0);X.restore();}}
function ROOT(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);
 const pw=760,ph=470,ly=600;const tl=T(160.48),tr=T(162.64),tc=T(159.90);
 panel('n06',520,ly,pw,ph,[.3,.08,.42],sm(tr,tr+.5,t),a,0.6);panel('n11',1400,ly,pw,ph,[.25,.05,.5],sm(tl,tl+.5,t),a,0.6);
 wordCard(t,tc,'מצח','forehead',null,960,150,130);
 lineTo(880,240,640,ly-ph/2,t,tr);lineTo(1040,240,1280,ly-ph/2,t,tl);
 const lab=(he,enx,ref,x,ton)=>{const k=sm(ton,ton+.35,t);if(k<=0)return;heb(he,x,ly+ph/2+70,78,a*k,{allGold:true});TX(enx,x,ly+ph/2+140,'italic 400 44px Newsreader',IVORY,a*k);TX(ref,x,ly+ph/2+190,'300 26px Fraunces',GOLD,a*k,'center','5px');};
 lab('מִצְחַת','on his legs','1 SAMUEL 17:6',1400,tl);lab('מִצְחוֹ','his forehead','1 SAMUEL 17:49',520,tr);}
function RC(t,t0){X.drawImage(IM.d06,0,0,IM.d06.width,IM.d06.height,-30,-20,W+60,H+40);dim(0.62);const t1=T(178.42),t2=T(179.62),tw1=T(178.60),tw2=T(179.62)+.15;
 const row=(ref,he,enx,gold,y,ton,tg)=>{const k=sm(ton,ton+.35,t);if(k<=0)return;TX(ref,960,y-96,'300 30px Fraunces',GOLD,k,'center','5px');heb(he,960,y,96,k,{t,gold:{[gold]:tg}});eng(enx,960,y+88,50,k,{t,hot:{head:tg}});};
 row('1 SAMUEL 17:51','וַיִּכְרָת־בָּהּ אֶת־רֹאשׁוֹ','and with it he cut off his head','אֶת־רֹאשׁוֹ',370,t1,tw1);
 row('GENESIS 3:15','הוּא יְשׁוּפְךָ רֹאשׁ','they will strike your head','רֹאשׁ',750,t2,tw2);
 if(t>=tw2+.2){X.save();const p=eo((t-tw2-.2)/0.5);X.strokeStyle='rgba(250,214,140,.9)';X.lineWidth=3;X.setLineDash([8,10]);X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=12;X.beginPath();X.moveTo(860,430);X.lineTo(860+(780-860)*p,430+(690-430)*p);X.stroke();X.restore();}}
function CMP(t,t0,t1,o){const i=IM[o.bg];X.drawImage(i,0,0,i.width,i.height,-30,-20,W+60,H+40);dim(0.66);const hs=o.hs||72,es=o.es||46;
 o.rows.forEach((r,k)=>{const y=k?720:330,ton=T(r.on),a=sm(ton,ton+.35,t);if(a<=0)return;
  const key='c'+r.ref+hs;if(!BC[key])BC[key]={h:wrap(r.he,`500 ${hs}px "Frank Ruhl Libre"`,1700,true),e:wrap(r.en,`italic 400 ${es}px Newsreader`,1700,false)};const Lh=BC[key].h,Le=BC[key].e;
  TX(r.ref,960,y-hs*.95,'300 30px Fraunces',GOLD,a,'center','6px');const g=conv(r.gold),h=conv(r.hot);const occ={},oc2={};
  Lh.forEach((ln,j)=>heb(ln,960,y+j*hs*1.3,hs,a,{t,gold:g,occ}));Le.forEach((ln,j)=>eng(ln,960,y+(Lh.length-1)*hs*1.3+hs*.95+j*es*1.3,es,a,{t,hot:h,occ:oc2}));});}
function END(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.5);glow(960,560,700,0.22*a);
 TX('1 SAMUEL 17:47',960,330,'300 34px Fraunces',GOLD,a,'center','8px');
 const w1='…God does not save with sword and spear,',w2='for the battle belongs to God …';
 const r1=[324.38,324.38,324.62,324.82,325.08,325.44,325.68,326.04,326.22].map(T),r2=[327.00,327.26,327.40,327.70,328.14,328.46,328.60].map(T);
 const G={god:[T(324.38),T(328.46)],battle:T(327.40)};
 eng(w1,960,500,78,a,{t,rev:r1.slice(1),hot:{god:G.god[0]}});eng(w2,960,622,78,a,{t,rev:r2,hot:{battle:G.battle,god:G.god[1]}});}
const GF={G1,FH,HELM,TRI,MAP,MAP2,X2,ROOT,RC,CMP,END};
// ---------- frame ----------
function drawShot(i,t,alpha){const s=SH[i],t0=st(i),t1=en(i),o=s.o||{};const g=geo(s,t,t0,t1);
 X.save();X.globalAlpha=alpha;if(o.fx&&o.fx.includes('slow'))X.filter='saturate(.5) contrast(1.08)';X.drawImage(g.im,g.x0,g.y0,g.ww,g.hh,-8,-8,W+16,H+16);X.filter='none';X.restore();return g;}
window.renderFrame=t=>{
 X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.fillStyle='#000';X.fillRect(0,0,W,H);
 if(t>=END_T)return;
 const i=shotAt(t),s=SH[i],t0=st(i),t1=en(i),o=s.o||{};let g=null;
 let shx=0,shy=0;const sk=o.imp?[T(o.imp[0]),16]:o.imp2?[T(o.imp2[0]),10]:null;if(sk&&t>=sk[0]){const k=t-sk[0],amp=sk[1]*Math.exp(-k*10);shx=Math.sin(k*61)*amp;shy=Math.cos(k*47)*amp*0.7;}
 X.save();X.translate(shx,shy);
 if(s.k==='img'){
  if(o.xin&&i>0&&t-t0<0.6){const k=eo((t-t0)/0.6),pv=SH[i-1];const fake={...pv,zx:1+2.2*k,zf:o.xin};const gp=geo(fake,t0,st(i-1),t0);X.drawImage(gp.im,gp.x0,gp.y0,gp.ww,gp.hh,-8,-8,W+16,H+16);g=drawShot(i,t,k);}
  else g=drawShot(i,t,1);
  if(o.fx){if(o.fx.includes('sweep'))sweep(t,t0,t1);if(o.fx.includes('haze'))haze(t);if(o.fx.includes('cool')){X.save();X.globalCompositeOperation='soft-light';X.fillStyle='rgba(120,150,190,.45)';X.fillRect(0,0,W,H);X.restore();}}}
 else GF[s.k](t,t0,t1,o);
 X.restore();
 if(o.fx){if(o.fx.includes('dust'))dust(t,11+i*7,90,1);if(o.fx.includes('embers'))embers(t,5+i,46);if(o.fx.includes('slow'))dust(t*0.25,99,60,1.2);}
 if(['G1','MAP','MAP2','X2','RC','CMP','END'].includes(s.k))dust(t,300+i,50,0.7);
 if(g){
  if(o.spot){dim(1-sm(t0+0.05,t0+0.5,t));}
  if(o.arm)ARM(t,g,o.arm);
  if(o.rg)for(const [on,fx,fy,R] of o.rg){const ton=T(on);if(t<ton)continue;const [px,py]=P(g,fx,fy);ring(px,py,R,(t-ton)/0.35,t);}
  if(o.ret){const ton=T(o.ret[0]);if(t>=ton){const [px,py]=P(g,o.ret[1],o.ret[2]);reticle(px,py,(t-ton)/0.5,t);}}
  if(o.rosh&&t>=T(o.rosh)){const [px,py]=P(g,.505,.205);const k=sm(T(o.rosh),T(o.rosh)+.35,t);scrim(px+250,py+20,170,90,k*.45);heb('רֹאשׁ',px+250,py,80,k,{allGold:true});TX('head',px+250,py+70,'italic 400 44px Newsreader',IVORY,k);}
  if(o.wc)for(const [on,he,enn,ref,x,y,sz] of o.wc)wordCard(t,T(on),he,enn,ref,x,y,sz);
  if(o.lab){const ton=T(o.lab[0]);const ly=o.lab[2]||1000;scrim(960,ly,420,60,sm(ton,ton+.3,t));TX(o.lab[1],960,ly,'300 38px Fraunces',GL,sm(ton,ton+.3,t),'center','12px');}
  if(o.imp){const ton=T(o.imp[0]);const [px,py]=P(g,o.imp[1],o.imp[2]);burst(t,ton,px,py,90,77);if(t>=ton)glow(px,py,260,0.8*Math.exp(-(t-ton)*3));}
  if(o.imp2){const ton=T(o.imp2[0]);const [px,py]=P(g,o.imp2[1],o.imp2[2]);burst(t,ton,px,py,70,55);}
  if(o.tk!==undefined)tracker(t,o.tk,o.tk===0?T(28.14)-0.1:T(o.tks??s.a)+0.05,o.tke?T(o.tke):0);
  if(o.gath){const [px,py]=P(g,.65,.25);const k=sm(T(296.26),T(296.26)+.35,t);callout(px,py+10,1500,180,eo((t-T(296.0))/0.45),k);scrim(1640,200,260,90,k);TX('GATH',1530,170,'300 40px Fraunces',GL,k,'left','10px');TX('Goliath’s hometown · 17:4',1530,226,'italic 400 38px Newsreader',IVORY,k,'left');}
 }
 if(o.tick){const tk=[3.06,3.28,3.50].map(T);const a=sm(tk[0],tk[0]+.2,t);X.save();const bgr=X.createLinearGradient(0,H-200,0,H);bgr.addColorStop(0,'rgba(4,3,2,0)');bgr.addColorStop(1,`rgba(4,3,2,${.75*a})`);X.fillStyle=bgr;X.fillRect(0,H-200,W,200);X.restore();
  const refs=['1 SAMUEL 17:5','17:6','17:7'];X.save();X.font='300 40px Fraunces';X.letterSpacing='6px';const ws=refs.map(r=>X.measureText(r).width),sep=70,tot=ws.reduce((p,q)=>p+q,0)+sep*2;X.restore();let x=960-tot/2;
  refs.forEach((r,k)=>{TX(r,x+ws[k]/2,1008,'300 40px Fraunces',GL,sm(tk[k],tk[k]+.2,t),'center','6px');if(k<2)TX('·',x+ws[k]+sep/2,1008,'300 40px Fraunces',GOLD,sm(tk[k+1],tk[k+1]+.2,t));x+=ws[k]+sep;});}
 for(const B of BN)if(t>=B.t0-.01&&t<B.t1+.01)banner(t,B);
 const vg=X.createRadialGradient(W/2,H/2,H*0.42,W/2,H/2,H*1.08);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.36)');X.fillStyle=vg;X.fillRect(0,0,W,H);
 X.globalCompositeOperation='soft-light';X.globalAlpha=.5;X.drawImage(GRN[Math.floor(t*30)%GRN.length],0,0,W,H);X.globalAlpha=1;X.globalCompositeOperation='source-over';
 if(t<PRE+0.15){X.fillStyle='rgba(0,0,0,'+(1-Math.max(0,t/(PRE+0.15)))+')';X.fillRect(0,0,W,H);}
};
// ---------- load ----------
const A=window.ASSETS;let pend=1;const done=()=>{if(--pend===0)prep();};
for(const [n,d] of Object.entries(A.img)){pend++;const im=new Image();im.onload=done;im.src=d;IM[n]=im;}
for(const [n,o] of Object.entries(A.ov)){pend++;const im=new Image();im.onload=done;im.src=o.d;OI[n]={im,x:o.x,y:o.y};}
Promise.all(['500 60px "Frank Ruhl Libre"','400 60px "Frank Ruhl Libre"','300 30px Fraunces','400 30px Fraunces','italic 400 40px Newsreader','400 40px Newsreader','500 40px Newsreader'].map(f=>document.fonts.load(f,'אבג abc 123'))).then(done,done);
function bgOf(src,blur,mix){const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.fillStyle='rgb(6,4,2)';x.fillRect(0,0,W,H);
 x.filter='blur('+blur+'px)';x.globalAlpha=mix;x.drawImage(IM[src],-40,-24,W+80,H+48);x.filter='none';x.globalAlpha=1;return c;}
function sprite(r,g,b){const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d');const gr=x.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,`rgba(${r},${g},${b},1)`);gr.addColorStop(.35,`rgba(${r},${g},${b},.45)`);gr.addColorStop(1,`rgba(${r},${g},${b},0)`);x.fillStyle=gr;x.fillRect(0,0,32,32);return c;}
function prep(){if(IM.s03)IM.B_s03=bgOf('s03',14,.40);if(IM.n07)IM.B_n07=bgOf('n07',18,.34);
 DOT=sprite(255,226,170);EMB=sprite(255,150,60);
 for(let k=0;k<6;k++){const c=document.createElement('canvas');c.width=960;c.height=540;const x=c.getContext('2d'),d=x.createImageData(960,540);
  for(let p=0;p<d.data.length;p+=4){const v=128+(Math.random()+Math.random()+Math.random()-1.5)*34;d.data[p]=d.data[p+1]=d.data[p+2]=v;d.data[p+3]=255;}x.putImageData(d,0,0);GRN.push(c);}
 const f=document.createElement('canvas');f.width=480;f.height=270;const fx=f.getContext('2d');rs=7;for(let q=0;q<70;q++){const x=rnd()*480,y=rnd()*270,r=30+rnd()*90;const gr=fx.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(220,190,150,.35)');gr.addColorStop(1,'rgba(220,190,150,0)');fx.fillStyle=gr;fx.fillRect(x-r,y-r,2*r,2*r);}
 FOG=document.createElement('canvas');FOG.width=W;FOG.height=H;const g2=FOG.getContext('2d');g2.filter='blur(30px)';g2.drawImage(f,0,0,W,H);
 window.READY=true;}
})();
