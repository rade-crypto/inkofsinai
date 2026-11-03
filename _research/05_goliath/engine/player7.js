(function(){
const HALF=window.HALF??0;
const W=1920,H=1080,PRE=0.5;
// VO insertions [vo time, seconds]: the spliced word מֵצַח at 22.50, the rest are silent pauses
const INS=window.INS;
const TG=t=>{let s=t;for(const [v,d] of INS)if(t>=v)s+=d;return s;};
const VO0=HALF===2?180.55:0;
const T=t=>PRE+TG(t)-TG(VO0);
const END_T=HALF===1?T(179.98)+2.4:T(328.74)+2.6; window.DUR=END_T+0.25;
const IVORY='#efe6d4',GOLD='#d9b46a',GL='#f6dc98';
const clamp=v=>Math.max(0,Math.min(1,v)),sm=(a,b,t)=>{const x=clamp((t-a)/(b-a));return x*x*(3-2*x)},eo=x=>1-Math.pow(1-clamp(x),3),lerp=(a,b,k)=>a+(b-a)*k;
const ease=x=>0.5-0.5*Math.cos(Math.PI*clamp(x));
const eob=x=>{x=clamp(x);const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
const cv=document.getElementById('c');let X=cv.getContext('2d');const OC=document.createElement('canvas');OC.width=1920;OC.height=1080;const OX=OC.getContext('2d');
const IM={},OI={};let GRN=[],FOG=null,DOT=null,EMB=null;
let rs=1;const rnd=()=>{rs=(rs*16807)%2147483647;return rs/2147483647;};
const gg=(x0,y0,x1,y1)=>{const g=X.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,'#a8741f');g.addColorStop(.35,'#f6dc98');g.addColorStop(.55,'#c9952f');g.addColorStop(1,'#f0cf7c');return g;};
const gv=(y0,y1)=>{const g=X.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'#fff0c4');g.addColorStop(.5,'#e9bb67');g.addColorStop(1,'#b07a33');return g;};
// ---------- text ----------
let TA=1;const PR=0.18;
function TX(s,x,y,font,col,a,al='center',ls='0px'){a*=TA;if(a<=0.003)return;X.save();X.globalAlpha=clamp(a);X.font=font;X.letterSpacing=ls;X.fillStyle=col;X.textAlign=al;X.textBaseline='middle';X.fillText(s,x,y);X.restore();}
const NF=s=>s.normalize('NFC');
function gtime(map,w,occ){if(!map)return undefined;const n=NF(w);let v;for(const k in map)if(NF(k)===n){v=map[k];break;}if(v===undefined)return undefined;
 if(Array.isArray(v)){const c=occ[n]||0;occ[n]=c+1;return v[Math.min(c,v.length-1)];}return v;}
function heb(s,x,y,size,a,o={}){a*=TA;if(a<=0.003)return;X.save();X.font=`500 ${size}px "Frank Ruhl Libre"`;X.direction='rtl';X.textAlign='right';X.textBaseline='middle';
 const ws=s.split(' '),sp=X.measureText(' ').width*1.1,wd=ws.map(w=>X.measureText(w).width),tot=wd.reduce((p,q)=>p+q,0)+sp*(ws.length-1);let xr=x+tot/2;const occ=o.occ||{};
 ws.forEach((w,i)=>{const st=o.step??.05,wa=o.t0!==undefined?sm(o.t0+i*st,o.t0+i*st+.3,o.t):1;const gt=gtime(o.gold,w,occ),gk=gt!==undefined?sm(gt-.05,gt+.25,o.t):(o.allGold?1:0);
  X.globalAlpha=clamp(a*wa*(1-gk));X.fillStyle=o.col||IVORY;X.fillText(w,xr,y);
  if(gk>0){X.globalAlpha=clamp(a*wa*gk);X.fillStyle=gg(xr-wd[i],y-size/2,xr,y+size/2);X.shadowColor='rgba(240,180,80,.8)';X.shadowBlur=18;X.fillText(w,xr,y);X.shadowBlur=0;}
  xr-=wd[i]+sp;});X.restore();return tot;}
function eng(s,x,y,size,a,o={}){a*=TA;if(a<=0.003)return;X.save();X.font=`italic 400 ${size}px Newsreader`;X.textBaseline='middle';
 const ws=s.split(' '),sp=X.measureText(' ').width,tw=X.measureText(s).width;let xx=x-tw/2;const occ=o.occ||{};
 ws.forEach((w,i)=>{const key=w.toLowerCase().replace(/[^a-z]/g,'');const ht=gtime(o.hot,key,occ),hk=ht!==undefined?sm(ht-.05,ht+.25,o.t):0;const wa=o.rev?sm(o.rev[i]-.05,o.rev[i]+.25,o.t):1;
  X.globalAlpha=clamp(a*wa);X.fillStyle=hk>0?`rgb(${lerp(239,246,hk)},${lerp(230,214,hk)},${lerp(212,140,hk)})`:IVORY;X.shadowColor='rgba(240,180,80,.75)';X.shadowBlur=14*hk;X.fillText(w,xx,y);xx+=X.measureText(w).width+sp;});X.restore();}
function wrap(txt,font,maxW,rtl){X.save();X.font=font;if(rtl)X.direction='rtl';const ws=txt.split(' '),out=[];let cur='';ws.forEach(w=>{const tt=cur?cur+' '+w:w;if(X.measureText(tt).width>maxW&&cur){out.push(cur);cur=w;}else cur=tt;});out.push(cur);X.restore();return out;}
function scrim(cx,cy,rw,rh,a){if(a<=0)return;X.save();X.translate(cx,cy);X.scale(1,rh/rw);const sg=X.createRadialGradient(0,0,0,0,0,rw*1.2);sg.addColorStop(0,`rgba(4,3,2,${.78*a})`);sg.addColorStop(.55,`rgba(4,3,2,${.5*a})`);sg.addColorStop(1,'rgba(4,3,2,0)');X.fillStyle=sg;X.fillRect(-rw*1.2,-rw*1.2,rw*2.4,rw*2.4);X.restore();}
// gold Hebrew word card: fades in and rises, with an English gloss and a reference
function wordCard(t,ton,he,en,ref,cx,cy,size,toff){const k=t-ton;if(k<0)return;const a=TA*sm(ton,ton+.35,t)*(toff?1-sm(toff-.25,toff,t):1),dy=(1-eo(k/0.6))*16;if(a<=0)return;
 scrim(cx,cy+size*.3,size*2.6,size*1.6,a);
 X.save();X.globalAlpha=a;X.font=`500 ${size}px "Frank Ruhl Libre"`;X.direction='rtl';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(cy+dy-size*.55,cy+dy+size*.55);X.shadowColor='rgba(240,170,70,.7)';X.shadowBlur=26;X.fillText(he,cx,cy+dy);X.restore();
 const ea=sm(ton+.15,ton+.5,t);if(en)TX(en,cx,cy+size*.8,`italic 400 ${Math.max(40,Math.round(size*.3))}px Newsreader`,IVORY,ea);
 if(ref)TX(ref,cx,cy+size*.8+Math.max(52,size*.38),'300 30px Fraunces',GOLD,ea,'center','5px');}

// ---------- verse banners (VO times) ----------
const BN=[
 {a:25.02,b:27.24,ref:'1 SAMUEL 17:6',he:'וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו',en:'and a bronze “forehead” on his legs',tag:'THIS WORD APPEARS ONLY HERE',tagt:25.94,gold:{'וּמִצְחַת':25.74},hot:{forehead:25.74},hs:76,es:52},
 {a:35.90,b:40.20,ref:'1 SAMUEL 17:5',he:'וְכוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ … וּמִשְׁקַל הַשִּׁרְיוֹן חֲמֵשֶׁת־אֲלָפִים שְׁקָלִים נְחֹשֶׁת',en:'A bronze helmet on his head … the coat weighed five thousand shekels of bronze',gold:{'נְחֹשֶׁת':[36.18,39.34]},hot:{bronze:[36.18,39.34]},hs:66,es:48},
 {a:40.20,b:43.20,ref:'1 SAMUEL 17:6',he:'וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו וְכִידוֹן נְחֹשֶׁת בֵּין כְּתֵפָיו',en:'A bronze “forehead” on his legs, and a bronze javelin between his shoulders',gold:{'נְחֹשֶׁת':[40.34,41.94]},hot:{bronze:[40.34,41.94]},hs:66,es:48},
 {a:43.20,b:46.02,ref:'1 SAMUEL 17:7',he:'וְלַהֶבֶת חֲנִיתוֹ שֵׁשׁ־מֵאוֹת שְׁקָלִים בַּרְזֶל',en:'…and his spearhead weighed six hundred shekels of iron',gold:{'בַּרְזֶל':44.54},hot:{iron:44.54},hs:68,es:50},
 {a:58.62,b:62.80,ref:'NUMBERS 21:9',he:'וַיַּעַשׂ מֹשֶׁה נְחַשׁ נְחֹשֶׁת וַיְשִׂמֵהוּ עַל־הַנֵּס',en:'Moses made a serpent of bronze and set it on a pole',gold:{'נְחַשׁ':59.06,'נְחֹשֶׁת':59.80},hot:{serpent:60.98,bronze:61.60},hs:70,es:50},
 {a:70.60,b:72.90,ref:'1 SAMUEL 17:5',he:'וְשִׁרְיוֹן קַשְׂקַשִּׂים הוּא לָבוּשׁ',en:'…and he was dressed in a coat of scales',gold:{'קַשְׂקַשִּׂים':71.60},hot:{scales:71.60},hs:76,es:52},
 {a:72.90,b:77.10,ref:'LEVITICUS 11:9',he:'כֹּל אֲשֶׁר־לוֹ סְנַפִּיר וְקַשְׂקֶשֶׂת בַּמַּיִם',en:'…everything in the water that has fins and scales',gold:{'וְקַשְׂקֶשֶׂת':73.96},hot:{scales:73.96},hs:76,es:52},
 {a:78.52,b:82.60,ref:'EZEKIEL 29:3',he:'פַּרְעֹה מֶלֶךְ־מִצְרַיִם הַתַּנִּים הַגָּדוֹל הָרֹבֵץ בְּתוֹךְ יְאֹרָיו',en:'…Pharaoh, king of Egypt, the great dragon lying in the midst of his rivers',gold:{'הַתַּנִּים':80.80},hot:{dragon:80.80},hs:68,es:48},
 {a:82.60,b:86.12,ref:'EZEKIEL 29:4',he:'וְהִדְבַּקְתִּי דְגַת־יְאֹרֶיךָ בְּקַשְׂקְשֹׂתֶיךָ',en:'…and I will make the fish of your rivers stick to your scales',tag:'THE SAME WORD AS GOLIATH’S COAT',tagt:84.46,gold:{'בְּקַשְׂקְשֹׂתֶיךָ':84.46},hot:{scales:84.90},hs:72,es:50},
 {a:97.36,b:100.16,ref:'GENESIS 3:14',he:'עַל־גְּחֹנְךָ תֵלֵךְ וְעָפָר תֹּאכַל',en:'…on your belly you will go, and dust you will eat',gold:{'עַל־גְּחֹנְךָ':98.24,'וְעָפָר':99.18},hot:{belly:98.24,dust:99.18},hs:76,es:52},
 {a:100.16,b:105.52,ref:'GENESIS 3:15',he:'וְאֵיבָה אָשִׁית בֵּינְךָ וּבֵין הָאִשָּׁה וּבֵין זַרְעֲךָ וּבֵין זַרְעָהּ הוּא יְשׁוּפְךָ רֹאשׁ',en:'I will put enmity between you and the woman, and between your offspring and hers. Her offspring will strike your head',gold:{'וְאֵיבָה':101.26,'רֹאשׁ':102.36},hot:{enmity:101.26,head:104.72},hs:66,es:46},
 {a:109.38,b:114.40,ref:'1 SAMUEL 17:16',he:'וַיִּגַּשׁ הַפְּלִשְׁתִּי הַשְׁכֵּם וְהַעֲרֵב וַיִּתְיַצֵּב אַרְבָּעִים יוֹם',en:'The Philistine came out morning and evening and took his stand, forty days',gold:{'אַרְבָּעִים':110.16,'יוֹם':110.82,'הַשְׁכֵּם':113.26,'וְהַעֲרֵב':113.88},hot:{forty:111.60,days:111.80,morning:113.26,evening:113.88},hs:62,es:44},
 {a:114.40,b:117.66,ref:'1 SAMUEL 17:8',he:'בְּרוּ־לָכֶם אִישׁ וְיֵרֵד אֵלָי',en:'…choose a man for yourselves, and let him come down to me',gold:{'אִישׁ':115.88},hot:{man:115.88},hs:76,es:52},
 {a:119.76,b:122.50,ref:'1 SAMUEL 17:24',he:'וְכֹל אִישׁ יִשְׂרָאֵל בִּרְאוֹתָם אֶת־הָאִישׁ וַיָּנֻסוּ מִפָּנָיו',en:'All the men of Israel, when they saw the man, fled from him',gold:{'וַיָּנֻסוּ':121.42},hot:{fled:121.42},hs:68,es:48},
 {a:129.02,b:131.52,ref:'1 SAMUEL 17:35',he:'וַיָּקָם עָלַי וְהֶחֱזַקְתִּי בִּזְקָנוֹ',en:'…it rose against me, and I grabbed it by its beard',gold:{'בִּזְקָנוֹ':130.02},hot:{beard:130.02},hs:76,es:52},
 {a:136.40,b:138.26,ref:'1 SAMUEL 17:6',he:'וּמִצְחַת נְחֹשֶׁת עַל־רַגְלָיו',en:'and a bronze “forehead” on his legs',gold:{'וּמִצְחַת':137.30,'נְחֹשֶׁת':137.70},hot:{forehead:137.30},hs:76,es:52},
 {a:151.00,b:156.70,ref:'1 SAMUEL 17:49',he:'וַיַּךְ אֶת־הַפְּלִשְׁתִּי אֶל־מִצְחוֹ וַתִּטְבַּע הָאֶבֶן בְּמִצְחוֹ',en:'…he struck the Philistine on his forehead, and the stone sank into his forehead',gold:{'אֶל־מִצְחוֹ':152.16,'בְּמִצְחוֹ':155.50},hot:{forehead:[153.34,155.70]},hs:68,es:48},
 {a:163.58,b:169.16,ref:'1 SAMUEL 17:49',he:'וַיִּפֹּל עַל־פָּנָיו אָרְצָה',en:'…and he fell on his face to the ground',gold:{'וַיִּפֹּל':164.68,'עַל־פָּנָיו':165.30,'אָרְצָה':165.88},hot:{fell:167.00,face:167.62,ground:168.32},hs:80,es:54},
 {a:169.16,b:172.04,ref:'GENESIS 3:14',he:'עַל־גְּחֹנְךָ תֵלֵךְ וְעָפָר תֹּאכַל',en:'…on your belly you will go, and dust you will eat',gold:{'עַל־גְּחֹנְךָ':170.52,'וְעָפָר':171.20},hot:{belly:170.52,dust:171.20},hs:76,es:52},
 {a:172.04,b:174.82,ref:'1 SAMUEL 17:49',he:'וַיִּפֹּל עַל־פָּנָיו אָרְצָה',en:'…and he fell on his face to the ground',gold:{'עַל־פָּנָיו':172.96,'אָרְצָה':173.86},hot:{face:172.96,ground:173.86},hs:80,es:54},
 {a:175.88,b:178.42,ref:'1 SAMUEL 17:51',he:'וַיִּקַּח אֶת־חַרְבּוֹ וַיִּשְׁלְפָהּ מִתַּעְרָהּ',en:'…he took the Philistine’s sword and drew it from its sheath',gold:{'אֶת־חַרְבּוֹ':176.80},hot:{sword:177.04},hs:74,es:50},
 {a:178.42,b:180.80,rows:[{ref:'1 SAMUEL 17:51',he:'וַיִּכְרָת־בָּהּ אֶת־רֹאשׁוֹ',en:'and with it he cut off his head',gold:{'אֶת־רֹאשׁוֹ':178.60},hot:{head:178.60}},{ref:'GENESIS 3:15',he:'הוּא יְשׁוּפְךָ רֹאשׁ',en:'her offspring will strike your head',gold:{'רֹאשׁ':179.62},hot:{head:179.62},on:179.50}],hs:76,es:50},
 {a:189.30,b:193.50,ref:'1 SAMUEL 5:3',he:'וְהִנֵּה דָגוֹן נֹפֵל לְפָנָיו אַרְצָה',en:'…and there was Dagon, fallen on his face to the ground',gold:{'נֹפֵל':191.90,'לְפָנָיו':192.30,'אַרְצָה':192.84},hot:{fallen:191.90,face:192.30,ground:192.84},hs:76,es:52},
 {a:193.50,b:199.68,rows:[{ref:'1 SAMUEL 17:49 · GOLIATH',he:'וַיִּפֹּל עַל־פָּנָיו אָרְצָה',en:'he fell on his face to the ground',gold:{'וַיִּפֹּל':194.00,'עַל־פָּנָיו':194.56,'אָרְצָה':195.20},hot:{fell:194.00,face:194.56,ground:195.20}},{ref:'1 SAMUEL 5:3 · DAGON',he:'נֹפֵל לְפָנָיו אַרְצָה',en:'fallen on his face to the ground',gold:{'נֹפֵל':194.00,'לְפָנָיו':194.56,'אַרְצָה':195.20},hot:{fallen:194.00,face:194.56,ground:195.20}}],hs:76,es:50},
 {a:199.68,b:201.50,rows:[{ref:'1 SAMUEL 5:4 · DAGON',he:'וְרֹאשׁ דָּגוֹן … כְּרֻתוֹת',en:'Dagon’s head … cut off',gold:{'וְרֹאשׁ':199.88,'כְּרֻתוֹת':200.48},hot:{head:199.88,cut:200.48,off:200.68}},{ref:'1 SAMUEL 17:51 · GOLIATH',he:'וַיִּכְרָת־בָּהּ אֶת־רֹאשׁוֹ',en:'he cut off his head',gold:{'וַיִּכְרָת־בָּהּ':200.48,'אֶת־רֹאשׁוֹ':199.88},hot:{cut:200.48,off:200.68,head:199.88}}],hs:74,es:50},
 {a:207.88,b:210.56,ref:'1 SAMUEL 9:2',he:'מִשִּׁכְמוֹ וָמַעְלָה גָּבֹהַּ מִכָּל־הָעָם',en:'…from his shoulders up he was taller than all the people',gold:{'גָּבֹהַּ':208.20},hot:{taller:208.20},hs:76,es:52},
 {a:212.40,b:216.40,ref:'1 SAMUEL 17:11',he:'וַיִּשְׁמַע שָׁאוּל וְכָל־יִשְׂרָאֵל אֶת־דִּבְרֵי הַפְּלִשְׁתִּי הָאֵלֶּה וַיֵּחַתּוּ וַיִּרְאוּ מְאֹד',en:'When Saul and all Israel heard these words of the Philistine, they were dismayed and terribly afraid',gold:{'וַיֵּחַתּוּ':214.26,'וַיִּרְאוּ':215.46,'מְאֹד':215.46},hot:{dismayed:214.26,terribly:215.46,afraid:215.96},hs:62,es:46},
 {a:216.40,b:224.38,ref:'1 SAMUEL 17:38',he:'וַיַּלְבֵּשׁ שָׁאוּל אֶת־דָּוִד מַדָּיו וְנָתַן קוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ',en:'Saul dressed David in his own garments and put a bronze helmet on his head',gold:{'מַדָּיו':218.42,'קוֹבַע':219.66,'נְחֹשֶׁת':220.34,'עַל־רֹאשׁוֹ':221.04},hot:{garments:218.42,helmet:222.26,bronze:222.80,head:223.58},hs:66,es:48},
 {a:228.12,b:231.80,ref:'1 SAMUEL 17:39',he:'לֹא אוּכַל לָלֶכֶת בָּאֵלֶּה',en:'…I cannot walk in these',gold:{'לָלֶכֶת':230.44},hot:{walk:230.44},hs:80,es:54},
 {a:231.80,b:237.06,ref:'1 SAMUEL 17:39',he:'וַיְסִרֵם דָּוִד מֵעָלָיו',en:'…and David removed them from upon himself',gold:{'וַיְסִרֵם':232.42,'מֵעָלָיו':233.48},hot:{removed:234.80,upon:235.78},hs:82,es:54},
 {a:241.60,b:246.64,rows:[{ref:'1 SAMUEL 17:39 · DAVID TAKES OFF THE ARMOR',he:'וַיְסִרֵם דָּוִד מֵעָלָיו',en:'David removed them from upon himself',gold:{'וַיְסִרֵם':242.10,'מֵעָלָיו':242.50},hot:{removed:242.10,upon:242.50}},{ref:'1 SAMUEL 17:46 · DAVID TO GOLIATH',he:'וַהֲסִרֹתִי אֶת־רֹאשְׁךָ מֵעָלֶיךָ',en:'I will remove your head from upon you',gold:{'וַהֲסִרֹתִי':244.42,'אֶת־רֹאשְׁךָ':245.04,'מֵעָלֶיךָ':245.34},hot:{remove:244.42,head:245.04,upon:245.56},on:243.40}],hs:74,es:50},
 {a:246.64,b:250.62,ref:'1 SAMUEL 17:40',he:'וַיִּקַּח מַקְלוֹ בְּיָדוֹ וַיִּבְחַר־לוֹ חֲמִשָּׁה חַלֻּקֵי־אֲבָנִים … וְקַלְּעוֹ בְיָדוֹ',en:'He took his staff in his hand and chose five smooth stones … and his sling was in his hand',gold:{'מַקְלוֹ':247.38,'חֲמִשָּׁה':248.32,'חַלֻּקֵי־אֲבָנִים':248.48,'וְקַלְּעוֹ':249.78},hot:{staff:247.38,five:248.32,smooth:248.48,stones:248.90,sling:249.78},hs:64,es:46},
 {a:255.22,b:258.08,ref:'1 SAMUEL 17:43',he:'הֲכֶלֶב אָנֹכִי כִּי־אַתָּה בָא־אֵלַי בַּמַּקְלוֹת',en:'…am I a dog, that you come to me with sticks?',gold:{'הֲכֶלֶב':255.62,'בַּמַּקְלוֹת':257.16},hot:{dog:255.62,sticks:257.16},hs:76,es:52},
 {a:258.08,b:262.84,ref:'1 SAMUEL 17:44',he:'לְכָה אֵלַי וְאֶתְּנָה אֶת־בְּשָׂרְךָ לְעוֹף הַשָּׁמַיִם וּלְבֶהֱמַת הַשָּׂדֶה',en:'…come to me, and I will give your flesh to the birds of the sky and the beasts of the field',gold:{'אֶת־בְּשָׂרְךָ':259.44,'לְעוֹף':260.08,'הַשָּׁמַיִם':260.60,'וּלְבֶהֱמַת':261.38,'הַשָּׂדֶה':262.00},hot:{flesh:259.44,birds:260.08,sky:260.60,beasts:261.38,field:262.00},hs:64,es:46},
 {a:263.98,b:268.98,top:1,ref:'1 SAMUEL 17:45',he:'',en:'You come to me with sword and spear and javelin, / and I come to you in the name of God …',hot:{sword:264.84,spear:265.56,javelin:266.24,god:268.62},hs:60,es:52},
 {a:269.80,b:276.12,ref:'1 SAMUEL 17:50',he:'וְחֶרֶב אֵין בְּיַד־דָּוִד',en:'…and there was no sword in David’s hand',gold:{'וְחֶרֶב':271.56,'אֵין':272.02,'בְּיַד־דָּוִד':272.42},hot:{no:274.00,sword:274.32,hand:275.32},hs:84,es:56},
 {a:276.12,b:279.80,ref:'1 SAMUEL 17:51',he:'וַיִּקַּח אֶת־חַרְבּוֹ … וַיִּכְרָת־בָּהּ אֶת־רֹאשׁוֹ',en:'…he took the Philistine’s sword … and cut off his head with it',gold:{'אֶת־חַרְבּוֹ':276.44,'אֶת־רֹאשׁוֹ':279.04},hot:{sword:276.44,head:279.04},hs:72,es:50},
 {a:282.40,b:285.80,ref:'1 SAMUEL 17:51',he:'וַיִּרְאוּ הַפְּלִשְׁתִּים כִּי־מֵת גִּבּוֹרָם וַיָּנֻסוּ',en:'…the Philistines saw that their champion was dead, and they fled',gold:{'גִּבּוֹרָם':283.58,'וַיָּנֻסוּ':284.82},hot:{champion:283.58,dead:284.00,fled:284.82},hs:72,es:50},
 {a:285.80,b:290.24,ref:'1 SAMUEL 17:24',he:'וְכֹל אִישׁ יִשְׂרָאֵל … וַיָּנֻסוּ מִפָּנָיו',en:'All the men of Israel … fled from him',gold:{'וַיָּנֻסוּ':289.00},hot:{fled:289.00},hs:68,es:48},
 {a:290.24,b:293.68,ref:'1 SAMUEL 17:52',he:'וַיָּקֻמוּ אַנְשֵׁי יִשְׂרָאֵל וִיהוּדָה וַיָּרִעוּ וַיִּרְדְּפוּ אֶת־הַפְּלִשְׁתִּים',en:'The men of Israel and Judah rose with a shout and pursued the Philistines',gold:{'וַיָּקֻמוּ':291.10,'וַיָּרִעוּ':291.90,'וַיִּרְדְּפוּ':292.50},hot:{rose:291.10,shout:291.90,pursued:292.50},hs:62,es:44},
 {a:293.68,b:297.60,cy:660,ref:'1 SAMUEL 17:52',he:'וַיִּפְּלוּ חַלְלֵי פְלִשְׁתִּים בְּדֶרֶךְ שַׁעֲרַיִם וְעַד־גַּת וְעַד־עֶקְרוֹן',en:'…and the Philistine dead fell along the road to Shaaraim, as far as Gath and Ekron',gold:{'וַיִּפְּלוּ':294.40,'וְעַד־גַּת':296.26},hot:{fell:294.40,gath:296.26},hs:66,es:48},
 {a:300.28,b:308.36,ref:'1 SAMUEL 17:46',he:'וְנָתַתִּי פֶּגֶר מַחֲנֵה פְלִשְׁתִּים הַיּוֹם הַזֶּה לְעוֹף הַשָּׁמַיִם וּלְחַיַּת הָאָרֶץ',en:'…and I will give the bodies of the Philistine army this day to the birds of the sky and the wild animals of the earth',gold:{'פֶּגֶר':303.34,'לְעוֹף':305.20,'הַשָּׁמַיִם':305.76,'וּלְחַיַּת':306.54,'הָאָרֶץ':307.64},hot:{bodies:303.34,birds:305.20,sky:305.76,animals:306.86,earth:307.64},hs:64,es:46},
 {a:308.36,b:312.38,rows:[{ref:'1 SAMUEL 17:44 · GOLIATH',he:'וְאֶתְּנָה אֶת־בְּשָׂרְךָ לְעוֹף הַשָּׁמַיִם …',en:'I will give your flesh to the birds of the sky …',gold:{'וְאֶתְּנָה':309.44,'לְעוֹף':309.44,'הַשָּׁמַיִם':309.44},hot:{give:309.44,birds:309.44,sky:309.44}},{ref:'1 SAMUEL 17:46 · DAVID',he:'וְנָתַתִּי פֶּגֶר מַחֲנֵה פְלִשְׁתִּים … לְעוֹף הַשָּׁמַיִם',en:'I will give the bodies of the Philistine army … to the birds of the sky',gold:{'וְנָתַתִּי':309.88,'לְעוֹף':309.88,'הַשָּׁמַיִם':309.88},hot:{give:309.88,birds:309.88,sky:309.88},on:308.90}],hs:66,es:46},
 {a:313.86,b:318.94,ref:'1 SAMUEL 17:46',he:'וְיֵדְעוּ כָּל־הָאָרֶץ …',en:'…so the whole earth will know that there is a God in Israel',gold:{'וְיֵדְעוּ':313.86,'כָּל־הָאָרֶץ':314.28},hot:{whole:315.96,earth:316.26,know:316.84},hs:90,es:56},
];
const TQ=t=>T(t)-PR;const conv=m=>{if(!m)return m;const o={};for(const k in m)o[k]=Array.isArray(m[k])?m[k].map(TQ):TQ(m[k]);return o;};
BN.forEach(b=>{b.t0=T(b.a)-0.22;b.t1=T(b.b);b.g=conv(b.gold);b.h=conv(b.hot);if(b.rows)b.rows.forEach(r=>{r.g=conv(r.gold);r.h=conv(r.hot);});});window.__extendBanners=()=>{BN.forEach((b,i)=>{const nx=BN[i+1];const j=shotAt(b.t1-0.02);const shotEnd=en(j);const lim=Math.min(nx?nx.t0:1e9,shotEnd);if(b.t1-b.t0<4.0)b.t1=Math.min(lim,b.t0+4.0);if(b.t1<lim)b.t1=Math.min(lim,b.t1+0.5);if(nx)b.t1=Math.min(b.t1,nx.t0-0.02);});};
const BC={};
function bannerPanel(t,B,cx){const a=Math.min(sm(B.t0,B.t0+.35,t),1-sm(B.t1-.4,B.t1,t));if(a<=0.003)return 0;
 const mw=700;const lay=(r,hs,es,key)=>{if(!BC[key])BC[key]={h:r.he?r.he.split(' / ').flatMap(s=>wrap(s,`500 ${hs}px "Frank Ruhl Libre"`,mw,true)):[],e:r.en.split(' / ').flatMap(s=>wrap(s,`italic 400 ${es}px Newsreader`,mw,false))};return BC[key];};
 const rows=B.rows||[{ref:B.ref,he:B.he,en:B.en,g:B.g,h:B.h,tag:B.tag,tagt:B.tagt}];
 const hs=Math.max(B.rows?60:66,Math.min(84,B.hs||66)),es=Math.max(B.rows?44:48,Math.min(56,B.es||48));const lh=hs*1.36,le=es*1.32,gap=B.rows?58:0;
 const Ls=rows.map((r,k)=>lay(r,hs,es,'p'+(r.ref||'')+B.a+'_'+k));
 const hOf=(L,r)=>40+L.h.length*lh+14+L.e.length*le+(r.tag?56:0);let tot=Ls.reduce((p,L,k)=>p+hOf(L,rows[k]),0)+gap*(rows.length-1);
 const cy=B.cy||(B.top?330:540);let yy=cy-tot/2;
 rows.forEach((r,k)=>{const L=Ls[k],ra=a*(r.on?sm(TQ(r.on),TQ(r.on)+.35,t):1);
  TX(r.ref,cx,yy+12,'300 30px Fraunces',GOLD,ra,'center','6px');yy+=40+(L.h.length?lh*0.5:0);
  const occ={};L.h.forEach((ln,i)=>{heb(ln,cx,yy,hs,ra,{t,t0:B.t0+i*.15+(r.on?TQ(r.on)-B.t0:0),gold:r.g,step:.045,occ});yy+=lh;});
  yy+=(L.h.length?14-lh*0.5:18)+le*0.5;const oc2={};L.e.forEach(ln=>{eng(ln,cx,yy,es,ra*sm(B.t0+.15,B.t0+.5,t),{t,hot:r.h,occ:oc2});yy+=le;});
  if(r.tag){yy+=10;TX(r.tag,cx,yy+12,'300 28px Fraunces',GL,ra*sm(TQ(r.tagt),TQ(r.tagt)+.4,t),'center','6px');yy+=46;}
  yy+=gap-le*0.5+(k<rows.length-1?0:0);
  if(k<rows.length-1){X.save();X.globalAlpha=0.5*ra*TA;X.strokeStyle=GOLD;X.lineWidth=1.5;X.beginPath();X.moveTo(cx-140,yy-gap/2);X.lineTo(cx+140,yy-gap/2);X.stroke();X.restore();}});
 return a;}
function phrases(t,list,cx,busy){if(!list||busy>=1)return;const LH={c:66,i:78};const lines=list.map(([tv,txt,sty,te])=>{const font=sty==='c'?'300 46px Fraunces':'italic 400 60px Newsreader';return {tv,te,sty,font,ws:wrap(txt,font,sty==='c'?620:680,false)};});
 let tot=0;for(const L of lines)tot+=L.ws.length*LH[L.sty]+16;let y=540-tot/2;
 for(const L of lines){const ton=T(L.tv),a=sm(ton,ton+.35,t)*(1-busy)*(L.te?1-sm(T(L.te)-.25,T(L.te),t):1),dy=(1-eo((t-ton)/0.6))*12;for(const w of L.ws){y+=LH[L.sty]/2;if(a>0)TX(w,cx,y+dy,L.font,L.sty==='c'?IVORY:GL,a,'center',L.sty==='c'?'6px':'0px');y+=LH[L.sty]/2;}y+=16;}}
function banner(t,B){const a=Math.min(sm(B.t0,B.t0+.35,t),1-sm(B.t1-.4,B.t1,t));if(a<=0.003)return;
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
const SH=[
 S(0.00,10.58,'s10',1.00,1.07,[.5,.5],[.5,.46],{fx:['dust'],arm:'open',arme:7.64,tick:1,spot:1,wc:[[9.20,'נְחֹשֶׁת','bronze','1 SAMUEL 17:5',380,500,180]]}),
 S(10.58,17.60,'s03',1.00,1.06,[.5,.6],[.5,.62],{fx:['dust'],g1:1}),
 S(17.60,22.40,'n11',1.00,1.06,[.5,.3],[.5,.36],{fx:['dust'],wc:[[19.98,'מִצְחַת','the leg guards','1 SAMUEL 17:6',380,520,170]]}),
 G(22.40,25.02,'FH'),
 S(25.02,27.24,'s04',1.00,1.06,[.5,.4],[.5,.36],{fx:['sweep'],rg:[[24.10,.44,.2,110]]}),
 S(27.24,35.90,'s05',1.00,1.08,[.52,.42],[.52,.36],{fx:['dust'],tk:[[0,28.04,33.74],[1,33.60,35.90]],ret:[31.60,.522,.15]}),
 S(35.90,37.30,'s06',1.12,1.18,[.55,.22],[.55,.2],{fx:['sweep']}),
 S(37.30,40.20,'s07',1.00,1.07,[.5,.45],[.5,.4],{fx:['sweep']}),
 S(40.20,41.70,'n11',1.00,1.06,[.5,.4],[.5,.36],{fx:['dust']}),
 S(41.70,43.20,'s08',1.05,1.12,[.5,.35],[.5,.3],{fx:['sweep']}),
 S(43.20,46.02,'s09',1.00,1.07,[.5,.4],[.5,.36],{fx:['cool']}),
 S(46.02,55.12,'s10',1.04,1.00,[.5,.5],[.5,.5],{fx:['dust'],arm:'x4'}),
 S(55.12,62.80,'s11',1.00,1.07,[.5,.5],[.5,.44],{fx:['embers']}),
 S(62.80,66.88,'s13',1.00,1.07,[.5,.5],[.47,.47],{fx:['sweep']}),
 S(66.88,72.90,'s14',1.00,1.07,[.5,.42],[.53,.4],{fx:['sweep'],tk:[[2,66.70,70.60]],rg:[[69.74,.56,.36,140]]}),
 S(72.90,77.10,'s15b',1.00,1.06,[.5,.44],[.5,.4],{fx:['sweep']}),
 S(77.10,78.52,'s16',1.00,1.07,[.55,.6],[.57,.62],{fx:['haze']}),
 S(78.52,82.60,'n02',1.00,1.07,[.45,.42],[.42,.38],{fx:['haze','dust']}),
 S(82.60,86.12,'s16',1.50,1.58,[.6,.66],[.6,.65],{fx:['sweep'],rg:[[84.46,.62,.73,140]]}),
 G(86.12,89.90,'TRI'),
 S(89.90,92.30,'s03',1.00,1.06,[.5,.55],[.5,.6],{fx:['dust']}),
 S(92.30,95.96,'s18',1.80,1.88,[.18,.25],[.19,.26],{fx:['dust']}),
 S(95.96,100.16,'s19',1.20,1.27,[.62,.66],[.66,.66],{fx:['dust']}),
 S(100.16,105.52,'s20',1.00,1.07,[.42,.5],[.45,.5],{fx:['dust'],rg:[[104.72,.50,.50,105]]}),
 S(105.52,109.38,'s01',1.00,1.07,[.5,.4],[.5,.36],{fx:['dust'],rg:[[105.70,.505,.205,95]],wc:[[105.70,'רֹאשׁ','head',null,380,500,170]]}),
 G(109.38,114.40,'MAP'),
 S(114.40,117.66,'n04',1.00,1.07,[.5,.36],[.47,.33],{fx:['dust']}),
 S(117.66,119.76,'n03',1.00,1.06,[.5,.45],[.47,.45],{fx:['dust']}),
 S(119.76,122.50,'n05',1.10,1.17,[.5,.6],[.5,.64],{fx:['dust']}),
 S(122.50,126.64,'d01',1.80,1.88,[.55,.25],[.56,.24],{fx:['dust']}),
 S(126.64,129.02,'d02',1.00,1.07,[.5,.45],[.47,.45],{fx:['dust']}),
 S(129.02,131.52,'d03',1.10,1.17,[.62,.4],[.64,.38],{fx:['dust']}),
 S(131.52,138.26,'s04',1.00,1.07,[.5,.4],[.5,.46],{fx:['dust','haze'],tk:[[3,133.80,136.40]]}),
 S(138.26,145.64,'s10',1.00,1.05,[.5,.5],[.5,.46],{fx:['dust'],arm:'ht',arme:143.40,ret:[143.94,.51,.115]}),
 S(145.64,147.26,'d04',1.00,1.06,[.5,.5],[.53,.44],{fx:['dust']}),
 S(147.26,150.54,'d05',1.00,1.07,[.5,.5],[.46,.42],{fx:['slow','dust']}),
 S(150.54,156.70,'n07',1.05,1.12,[.55,.3],[.56,.28],{fx:['dust'],imp:[150.54,.56,.26]}),
 G(156.70,159.90,'X2'),
 G(159.90,163.58,'ROOT'),
 S(163.58,166.80,'n09',1.00,1.07,[.5,.45],[.47,.45],{fx:['dust']}),
 S(166.80,169.16,'n10',1.08,1.15,[.55,.55],[.58,.57],{fx:['dust'],imp2:[167.00,.66,.62]}),
 S(169.16,172.04,'s19',1.00,1.06,[.62,.66],[.66,.66],{fx:['dust']}),
 S(172.04,174.82,'n10',1.00,1.06,[.5,.5],[.47,.5],{fx:['dust','haze']}),
 S(174.82,180.80,'d06',1.00,1.07,[.5,.5],[.56,.45],{fx:['dust','sweep']}),
 S(180.80,188.50,'n12',1.00,1.07,[.52,.5],[.53,.46],{fx:['haze','dust']}),
 S(188.50,199.68,'n13',1.00,1.07,[.5,.52],[.5,.58],{fx:['dust','haze']}),
 S(199.68,201.50,'n14',1.00,1.06,[.5,.5],[.48,.5],{fx:['dust']}),
 S(201.50,203.82,'d01',2.00,2.08,[.55,.25],[.56,.24],{fx:['dust'],tk:[[4,201.60,203.70]]}),
 S(203.82,210.56,'n15',1.00,1.07,[.45,.45],[.43,.38],{fx:['dust']}),
 S(210.56,212.40,'n04',1.00,1.06,[.5,.36],[.47,.33],{fx:['dust']}),
 S(212.40,216.40,'n15',1.40,1.48,[.42,.26],[.42,.24],{fx:['dust']}),
 S(216.40,224.38,'n16',1.00,1.07,[.5,.45],[.53,.38],{fx:['dust']}),
 G(224.38,228.12,'HELM'),
 S(228.12,231.80,'n16',1.45,1.52,[.63,.3],[.64,.28],{fx:['dust']}),
 S(231.80,237.06,'n17',1.00,1.07,[.42,.42],[.38,.38],{fx:['dust']}),
 S(237.06,246.64,'n18',1.00,1.07,[.5,.5],[.47,.48],{fx:['dust','haze']}),
 S(246.64,252.76,'n19',1.50,1.55,[.36,.55],[.36,.53],{fx:['dust'],arm:'dv'}),
 S(252.76,255.22,'s06',1.05,1.12,[.6,.4],[.62,.38],{fx:['dust']}),
 S(255.22,258.08,'n04',1.05,1.12,[.5,.36],[.46,.32],{fx:['dust']}),
 S(258.08,262.84,'n20',1.00,1.07,[.5,.4],[.5,.36],{fx:['haze']}),
 S(262.84,267.00,'s10',1.04,1.00,[.5,.5],[.5,.5],{fx:['dust'],arm:'sw'}),
 S(267.00,268.98,'n18',1.20,1.27,[.3,.5],[.29,.48],{fx:['dust']}),
 S(268.98,276.12,'n21',1.00,1.07,[.6,.5],[.64,.5],{fx:['dust']}),
 S(276.12,279.80,'d06',1.00,1.07,[.5,.5],[.55,.44],{fx:['dust','sweep']}),
 S(279.80,282.40,'n10',1.00,1.06,[.5,.5],[.47,.5],{fx:['dust','haze']}),
 S(282.40,285.80,'n22',1.00,1.07,[.5,.5],[.5,.46],{fx:['dust']}),
 G(285.80,293.68,'MAP2'),
 S(293.68,297.60,'n23',1.00,1.07,[.5,.5],[.55,.44],{fx:['dust','haze'],gath:1}),
 S(297.60,300.28,'n18',1.30,1.38,[.28,.5],[.27,.48],{fx:['dust']}),
 S(300.28,312.38,'n20',1.10,1.17,[.45,.4],[.5,.4],{fx:['haze']}),
 S(312.38,318.94,'n18',1.07,1.00,[.5,.46],[.5,.5],{fx:['haze','dust']}),
 S(318.94,324.38,'n21',1.10,1.17,[.7,.5],[.72,.46],{fx:['dust']}),
 G(324.38,340,'END'),
];
SH.forEach(s=>{if(s.k!=='img')return;const o=s.o;delete o.kick;delete o.xin;delete o.ph;
 if(o.cam){const a=o.cam[0];s.z0=a[1];s.z1=a[1]*1.07;s.f0=[a[2],a[3]];s.f1=[a[2],a[3]];delete o.cam;}
 s.z0=Math.min(s.z0,1.9);s.z1=Math.min(s.z1,1.95);const r=s.z1/s.z0;if(r>1.07)s.z1=s.z0*1.07;if(r<1/1.07)s.z1=s.z0/1.07;
 for(const k of [0,1]){const d=s.f1[k]-s.f0[k];if(Math.abs(d)>0.06)s.f1[k]=s.f0[k]+Math.sign(d)*0.06;}});
window.SHOTS=SH;
// ---------- engine ----------
const st=i=>i>0?T(SH[i].a):0, en=i=>i<SH.length-1?T(SH[i].b):END_T;
function shotAt(t){for(let i=0;i<SH.length;i++){if(t>=st(i)&&t<en(i))return i;}return SH.length-1;}
window.__extendBanners();
function region(s){return s.o.side==='L'?{x:0,y:0,w:1280,h:H}:{x:640,y:0,w:1280,h:H};}
const PCX=s=>s&&s.o&&s.o.side==='L'?1540:380;
function geo(s,t,t0,t1){let z,fx,fy;const o=s.o;
 if(o.cam){const ks=o.cam.map(k=>[T(k[0]),k[1],k[2],k[3]]);let j=0;while(j+1<ks.length&&t>=ks[j+1][0])j++;const A=ks[j],B=ks[Math.min(j+1,ks.length-1)];const u=(A===B||t<=A[0])?0:ease((t-A[0])/(B[0]-A[0]));z=lerp(A[1],B[1],u);fx=lerp(A[2],B[2],u);fy=lerp(A[3],B[3],u);}
 else{const x=(t-t0)/Math.max(1e-3,t1-t0),u=ease(x);z=s.z0+(s.z1-s.z0)*u;fx=s.f0[0]+(s.f1[0]-s.f0[0])*u;fy=s.f0[1]+(s.f1[1]-s.f0[1])*u;}
 if(o.kick!==undefined){const k=t-T(o.kick);if(k>=0)z*=1+0.04*Math.exp(-k*6)*(k<0.05?k/0.05:1);}
  if(s.zx){z*=s.zx;fx=s.zf[0];fy=s.zf[1];}
 const R=region(s),im=IM[s.im],sw=im.width,sh=im.height;let hh=sh/z,ww=hh*R.w/R.h;if(ww>sw){ww=sw;hh=ww*R.h/R.w;}
 const cx=Math.min(Math.max(fx*sw,ww/2),sw-ww/2),cy=Math.min(Math.max(fy*sh,hh/2),sh-hh/2);
 return {im,x0:cx-ww/2,y0:cy-hh/2,ww,hh,R,sw,sh};}
const P=(g,fx,fy)=>[g.R.x+(fx*g.sw-g.x0)/g.ww*g.R.w,g.R.y+(fy*g.sh-g.y0)/g.hh*g.R.h];
function drawOv(n,a,dy,dx){const o=OI[n];if(!o||a<=0)return;X.globalAlpha=Math.min(1,a);X.drawImage(o.im,o.x+(dx||0),o.y+(dy||0));X.globalAlpha=1;}
function drawOvAt(n,cx,cy,a,sc){const o=OI[n];if(!o||a<=0)return;sc=sc||1;const w=o.im.width*sc,h=o.im.height*sc;X.globalAlpha=Math.min(1,a);X.drawImage(o.im,cx-w/2,cy-h/2,w,h);X.globalAlpha=1;}
function ring(px,py,R,k,t){const scl=(1.18-0.18*eo(k))*(1+0.025*Math.sin(t*4.2));X.save();X.globalAlpha=clamp(k*1.5)*TA;
 X.strokeStyle='rgba(255,196,100,1)';X.lineWidth=10;X.shadowColor='rgba(255,180,80,.95)';X.shadowBlur=26;X.beginPath();X.arc(px,py,R*scl,-Math.PI/2,-Math.PI/2+Math.PI*2*eo(k*1.6));X.stroke();
 X.shadowBlur=0;X.strokeStyle='rgba(255,238,195,1)';X.lineWidth=4;X.stroke();X.restore();}
function reticle(px,py,k,t){const R=140*(1.6-0.6*eo(k));X.save();X.globalAlpha=clamp(k*1.4)*TA;X.strokeStyle='rgba(255,214,140,.95)';X.lineWidth=3;X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=16;
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
const CL=[['נְחֹשֶׁת','bronze'],['קַשְׂקַשִּׂים','scales'],['מִצְחַת','“forehead”'],['','']];const CLT={1:34.82,2:69.74,3:135.28};
function tracker(t,m,t0,tend,cx){const a=sm(t0,t0+.3,t)*(tend?1-sm(tend-.2,tend,t):1);if(a<=0)return 0;const cy=560,R=68,gap=182,x0=cx-1.5*gap;
 TX('FOUR CLUES',cx,cy-128,'300 38px Fraunces',GL,a,'center','12px');
 const tl=m===0?T(30.46):t0;
 for(let n=1;n<=4;n++){const x=x0+(n-1)*gap,ap=m===0?a*sm(T(28.14)+(n-1)*.16,T(28.14)+(n-1)*.16+.3,t):a;if(ap<=0)continue;
  const act=(m===0&&n===3&&t>=tl)||(m===n),done=m>0&&n<m,ka=act?sm(tl,tl+.3,t):0;
  X.save();X.globalAlpha=ap;X.fillStyle=done?'rgba(217,180,106,.22)':'rgba(14,10,5,.9)';X.beginPath();X.arc(x,cy,R,0,Math.PI*2);X.fill();
  X.lineWidth=act?5:3;X.strokeStyle=act?`rgba(243,207,134,${.6+.4*ka})`:done?'rgba(217,180,106,.9)':'rgba(217,180,106,.55)';if(act){X.shadowColor='rgba(250,180,70,.9)';X.shadowBlur=28*ka;}X.stroke();X.restore();
  X.save();X.globalAlpha=ap;X.font='500 76px Newsreader';X.textAlign='center';X.textBaseline='middle';X.fillStyle=act?gv(cy-34,cy+34):done?'#e9cf96':'rgba(239,230,212,.75)';X.fillText(String(n),x,cy+3);X.restore();
  if(m===0&&n===3)TX('where the stone lands',cx,cy+R+56,'italic 400 44px Newsreader',GL,ka*ap);
  else if((act||done)&&(CL[n-1][0]||CL[n-1][1])){const la=act&&CLT[n]?sm(TQ(CLT[n]),TQ(CLT[n])+.35,t):1,apl=ap*la;let y=cy+R+50;if(CL[n-1][0]){heb(CL[n-1][0],x,y,46,apl*(act?ka:1),{allGold:act});y+=52;}TX(CL[n-1][1],x,y,'italic 400 36px Newsreader',IVORY,apl*(act?ka:.9));}}
 return a;}
// ---------- the pattern so far (fills in as each clue is shown)
const PB=[[51.80,'נְחֹשֶׁת · נָחָשׁ','bronze sounds like serpent'],[85.24,'קַשְׂקַשִּׂים','the scales of fish, and of the dragon'],[104.98,'הוּא יְשׁוּפְךָ רֹאשׁ','“they will strike your head”'],
 [163.10,'מִצְחַת · מִצְחוֹ','a “forehead” on his legs, then his own'],[168.32,'עַל־פָּנָיו אָרְצָה','he falls face down to the ground'],[246.28,'הֵסִיר … מֵעַל','removed from upon: the armor, then the head']];
const BOARD=new Set([52.32,55.12,62.80,75.44,89.90,92.30,95.96,105.52,117.10,122.50,126.64,130.98,166.80,172.04,180.80,185.00,203.82,209.88,237.06,252.76,279.80,297.60,312.38,318.94]);
function board(t,cx,a0){const items=PB.filter(p=>t>=T(p[0]));if(!items.length||a0<=0)return;const rh=128,tot=80+items.length*rh;let y=540-tot/2;
 TX('THE PATTERN SO FAR',cx,y+16,'300 36px Fraunces',GL,a0,'center','10px');y+=80;
 items.forEach((p,k)=>{const tn=T(p[0]),fresh=1-sm(tn+2.5,tn+4,t),a=a0*sm(tn,tn+.5,t);heb(p[1],cx,y+24,56,a,{allGold:true});if(fresh>0)glow(cx,y+24,180,0.5*fresh*a0*sm(tn,tn+.4,t));TX(p[2],cx,y+80,'italic 400 40px Newsreader',IVORY,a);y+=rh;});}
// ---------- callouts ----------
const AP={helm:[.51,.10],jav:[.575,.16],coat:[.51,.33],leg:[.565,.78],sword:[.43,.18],spear:[.445,.62],staff:[.29,.45],bag:[.37,.62],sling:[.53,.80]};
function callout(px,py,lx,ly,p,a){a*=TA;if(p<=0||a<=0)return;X.save();X.globalAlpha=a;X.strokeStyle='rgba(246,220,152,.95)';X.lineWidth=2.5;X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=10;
 const ex=lx+(px<lx?-30:30);const p1=clamp(p*2),p2=clamp(p*2-1);X.beginPath();X.moveTo(px,py);X.lineTo(lerp(px,ex,p1),lerp(py,ly,p1));if(p2>0)X.lineTo(lerp(ex,lx,p2),ly);X.stroke();
 X.fillStyle='#fff0c4';X.beginPath();X.arc(px,py,7,0,Math.PI*2);X.fill();X.restore();glow(px,py,40,a*.8);}
function ARM(t,g,mode,arme){const L=[],add=(key,lx,ly,al,on,lab,he,sub,lit)=>L.push({key,lx,ly,al,on,lab,he,sub,lit});
 if(mode==='open'){add('helm',740,190,'right',4.30,'HELMET',null,'bronze',6.56);add('coat',740,500,'right',4.90,'COAT OF SCALES',null,'bronze',6.62);add('leg',740,790,'right',5.50,'LEG GUARDS',null,'bronze',6.68);add('jav',740,340,'right',6.00,'JAVELIN',null,'bronze',6.74);}
 if(mode==='x4'){add('helm',740,150,'right',46.30,'HELMET','נְחֹשֶׁת',null,48.18);add('jav',740,330,'right',46.45,'JAVELIN','נְחֹשֶׁת',null,48.36);add('coat',740,510,'right',46.60,'COAT OF SCALES','נְחֹשֶׁת',null,48.54);add('leg',740,780,'right',46.75,'LEG GUARDS','נְחֹשֶׁת',null,48.72);}
 if(mode==='ht'){add('helm',740,220,'right',139.22,null,'כּוֹבַע נְחֹשֶׁת','a bronze helmet · 17:5',139.52);add('leg',740,760,'right',140.80,null,'מִצְחַת נְחֹשֶׁת','a bronze “forehead” · 17:6',141.20);}
 if(mode==='sw'){add('sword',740,660,'right',264.84,'SWORD',null,null,264.84);add('spear',740,790,'right',265.56,'SPEAR',null,null,265.56);add('jav',740,920,'right',266.24,'JAVELIN',null,null,266.24);}
 if(mode==='dv'){add('staff',740,330,'right',250.70,'STAFF',null,null,250.70);add('bag',740,560,'right',250.85,'BAG',null,null,250.85);add('sling',740,790,'right',251.00,'SLING',null,null,251.00);}
 const fade=arme?1-sm(T(arme)-.35,T(arme),t):1;
 if(mode==='ht'){const tl=T(141.82);if(t>=tl){const [hx,hy]=P(g,...AP.helm),[lx,ly]=P(g,...AP.leg),p=eo((t-tl)/0.7);X.save();X.globalAlpha=fade;X.strokeStyle='rgba(246,220,152,.9)';X.lineWidth=3;X.setLineDash([10,12]);X.shadowColor='rgba(255,180,80,.9)';X.shadowBlur=12;
   X.beginPath();X.moveTo(hx+90,hy);X.lineTo(hx+90,lerp(hy,ly,p));X.stroke();X.restore();}}
 for(const c of L){const ton=TQ(c.on)+0.06;if(t<ton)continue;const p=eo((t-ton)/0.45),a=clamp((t-ton)/0.2)*fade;const [px,py]=P(g,...AP[c.key]);callout(px,py,c.lx,c.ly,p,a);
  const la=a*sm(ton+.2,ton+.45,t),tl=TQ(c.lit),lk=sm(tl,tl+.25,t),xa=c.al==='right'?c.lx-14:c.lx+14;
  scrim(c.al==='right'?c.lx-180:c.lx+180,c.ly+20,260,c.he?110:70,la);
  let y=c.ly;if(c.lab){TX(c.lab,xa,y,'300 38px Fraunces',IVORY,la,c.al,'6px');y+=54;}
  if(c.he){X.save();X.font='500 62px "Frank Ruhl Libre"';const w=X.measureText(c.he).width;X.restore();const hx=c.al==='right'?xa-w/2:xa+w/2;heb(c.he,hx,y+6,62,la*(1-lk));if(lk>0){heb(c.he,hx,y+6,62,la*lk,{allGold:true});glow(hx,y+6,110,lk*(1-sm(tl+.3,tl+1.2,t))*.7);}y+=64;}
  if(c.sub){const sa=c.lab?la*lk:la;TX(c.sub,xa,y,'italic 400 46px Newsreader',c.lab?GL:IVORY,sa,c.al);if(c.lab&&lk>0)glow(xa+(c.al==='right'?-60:60),y,90,lk*(1-sm(tl+.3,tl+1.0,t))*.6);}
  if(!c.he&&!c.sub&&lk>0)glow(px,py,70,lk*(1-sm(tl+.3,tl+1.0,t)));}
 if(mode==='x4'){const ts=TQ(48.18);if(t>=ts){const p=clamp((t-ts)/0.3),sc=1.7-0.7*eob(p);X.save();X.globalAlpha=clamp((t-ts)/0.08)*TA;X.translate(230,610);X.scale(sc,sc);X.font='500 150px Newsreader';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(-80,80);X.shadowColor='rgba(250,180,70,.85)';X.shadowBlur=30;X.fillText('×4',0,0);X.restore();}
  const tr=T(49.16);if(t>=tr)TX('1 SAMUEL 17:5–6',230,705,'300 28px Fraunces',GOLD,sm(tr,tr+.3,t),'center','5px');}
 if(mode==='dv'){const tn=T(251.00);TX('no bronze',380,980,'italic 400 60px Newsreader',GL,sm(tn,tn+.3,t),'center');}}
function g1(t,cx){const a1=TA*sm(TQ(10.58),TQ(10.58)+.4,t),a2=TA*sm(TQ(12.10),TQ(12.10)+.4,t),tb=TQ(15.36),k=sm(tb,tb+.5,t);
 const draw=(y,size,dimTav)=>{X.save();X.font=`500 ${size}px "Frank Ruhl Libre"`;X.direction='rtl';X.textAlign='right';X.textBaseline='middle';const wF=X.measureText('נְחֹשֶׁת').width,wH=X.measureText('נְחֹשֶׁ').width;const xr=cx+wF/2;
  X.fillStyle=gv(y-size*.55,y+size*.55);X.shadowColor='rgba(240,170,70,.7)';X.shadowBlur=24;X.globalAlpha=a1;X.fillText('נְחֹשֶׁ',xr,y);X.globalAlpha=a1*(1-0.8*dimTav);X.fillText('ת',xr-wH,y);X.restore();};
 draw(330,170,k);TX('bronze',cx,445,'italic 400 46px Newsreader',IVORY,a1);
 X.save();X.globalAlpha=a2;X.font='500 170px "Frank Ruhl Libre"';X.direction='rtl';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(700-94,700+94);X.shadowColor='rgba(240,170,70,.7)';X.shadowBlur=24;X.fillText('נָחָשׁ',cx,700);X.restore();
 TX('serpent',cx,815,'italic 400 46px Newsreader',IVORY,a2);TX('GENESIS 3:1',cx,872,'300 28px Fraunces',GOLD,a2,'center','6px');
 if(k>0){const pu=Math.exp(-(t-tb)*1.4);glow(cx+25,330,250,0.85*pu*TA);glow(cx,700,230,0.7*pu*TA);TX('the same three letters',cx,560,'italic 400 44px Newsreader',GL,k*TA);}}
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
function half(im,side,f,z,p,a){const R={x:side?960:0,y:0,w:960,h:H};const i=IM[im],sw=i.width,sh=i.height;let hh=sh/z,ww=hh*R.w/R.h;if(ww>sw){ww=sw;hh=ww*R.h/R.w;}
 const cx=Math.min(Math.max(f[0]*sw,ww/2),sw-ww/2),cy=Math.min(Math.max(f[1]*sh,hh/2),sh-hh/2),x0=cx-ww/2,y0=cy-hh/2;
 X.save();X.globalAlpha=a;X.filter=p<1?`brightness(${0.45+0.55*p}) saturate(${0.45+0.55*p})`:'none';X.drawImage(i,x0,y0,ww,hh,R.x,R.y,R.w,R.h);X.filter='none';X.restore();
 return (fx,fy)=>[R.x+(fx*sw-x0)/ww*R.w,R.y+(fy*sh-y0)/hh*R.h];}
function halvesFrame(){const tg=X.createLinearGradient(0,0,0,H);tg.addColorStop(0,'rgba(0,0,0,.88)');tg.addColorStop(.3,'rgba(0,0,0,0)');tg.addColorStop(.6,'rgba(0,0,0,0)');tg.addColorStop(1,'rgba(0,0,0,.94)');X.fillStyle=tg;X.fillRect(0,0,W,H);
 const cg=X.createLinearGradient(880,0,1040,0);cg.addColorStop(0,'rgba(0,0,0,0)');cg.addColorStop(.5,'rgba(0,0,0,.92)');cg.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=cg;X.fillRect(880,0,160,H);}
function FH_OLD(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.25);const tw=T(22.50)-1.10+0.08,tr=T(24.10);
 const pl=panel('s06',500,620,800,560,[.36,.06,.5],sm(tw,tw+.4,t),a,0.75),pr=panel('n11',1420,620,800,560,[.18,.0,.64],sm(tr,tr+.4,t),a,0.75);
 const [fx,fy]=pl(.62,.29),[gx,gy]=pr(.5,.2);if(t>=tw)ring(fx,fy,95,(t-tw)/0.35,t);if(t>=tr)ring(gx,gy,120,(t-tr)/0.35,t);
 wordCard(t,tw,'מֵצַח','forehead',null,960,170,140);lineTo(860,210,fx+60,fy-80,t,tw+.2);lineTo(1060,210,gx-60,gy-90,t,tr);
 TX('HIS FOREHEAD',500,935,'300 32px Fraunces',IVORY,a*sm(tw,tw+.3,t),'center','8px');TX('HIS LEGS',1420,935,'300 32px Fraunces',IVORY,a*sm(tr,tr+.3,t),'center','8px');}
function HELM_OLD(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.25);const tg=T(225.06);
 panel('s06',500,470,800,520,[.38,.0,.5],1,a);panel('n16',1420,470,800,520,[.44,.0,.42],1,a);
 const row=(he,lab,ref,x)=>{heb(he,x,800,66,a,{t,gold:{'וְכוֹבַע':tg,'קוֹבַע':tg,'נְחֹשֶׁת':tg,'עַל־רֹאשׁוֹ':tg}});TX(lab,x,880,'italic 400 42px Newsreader',IVORY,a);TX(ref,x,936,'300 28px Fraunces',GOLD,a,'center','5px');};
 row('וְכוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ','Goliath: a bronze helmet on his head','1 SAMUEL 17:5',500);row('קוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ','David: a bronze helmet on his head','1 SAMUEL 17:38',1420);
 if(t>=tg)glow(960,800,300,0.6*Math.exp(-(t-tg)*1.5));}
function TRI(t,t0,t1){X.fillStyle='#050302';X.fillRect(0,0,W,H);const pw=W/3;
 const pans=[['s03',[.3,.1,.4],T(87.94),'נָחָשׁ','the serpent'],['s01',[.36,.04,.28],T(86.12)-0.3,null,'the giant'],['s16',[.42,.36,.45],T(88.86),'הַתַּנִּים','the dragon']];
 for(let k=0;k<3;k++){const [im,cr,ton,he,enl]=pans[k];const i=IM[im];const p=0.45+0.55*clamp((t-ton+0.2)/0.45);
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
function dot(x,y,r,a){X.save();X.globalAlpha=a;X.fillStyle='#e9cf96';X.shadowColor='rgba(255,190,90,.5)';X.shadowBlur=2;X.beginPath();X.arc(x,y,r,0,Math.PI*2);X.fill();X.restore();}
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
function X2(t,t0){bg('B_n07');const a=clamp((t-t0)/0.3);const t1=TQ(157.52),t2=TQ(158.32);
 scrim(960,520,900,500,a);TX('1 SAMUEL 17:49',960,250,'300 32px Fraunces',GOLD,a,'center','6px');
 const w=(he,enx,x,tl)=>{const k=sm(tl,tl+.25,t);heb(he,x,470,120,a*.55*(1-k));if(k>0){heb(he,x,470,120,a*k,{allGold:true});glow(x,470,220,k*(1-sm(tl+.3,tl+1.2,t))*.8);}TX(enx,x,585,'italic 400 46px Newsreader',IVORY,a*(.6+.4*k));};
 w('אֶל־מִצְחוֹ','on his forehead',1360,t1);w('בְּמִצְחוֹ','into his forehead',560,t2);
 if(t>=t2){const p=clamp((t-t2)/0.3),sc=1.6-0.6*eob(p);X.save();X.globalAlpha=clamp((t-t2)/0.08);X.translate(960,770);X.scale(sc,sc);X.font='500 150px Newsreader';X.textAlign='center';X.textBaseline='middle';X.fillStyle=gv(-70,70);X.shadowColor='rgba(250,180,70,.85)';X.shadowBlur=30;X.fillText('×2',0,0);X.restore();}}
function ROOT_OLD(t,t0){X.fillStyle='#050302';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);
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
function FH(t,t0){X.fillStyle='#000';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);const tw=T(22.50)-1.10+0.02,tr=TQ(24.10);
 const pl=half('s06',0,[.62,.3],1.2,sm(tw,tw+.4,t),a),pr=half('n11',1,[.5,.32],1.05,sm(tr,tr+.4,t),a);halvesFrame();
 const [fx,fy]=pl(.62,.29),[gx,gy]=pr(.5,.2);if(t>=tw)ring(fx,fy,105,(t-tw)/0.35,t);if(t>=tr)ring(gx,gy,130,(t-tr)/0.35,t);
 wordCard(t,tw,'מֵצַח','forehead',null,960,140,140);lineTo(870,190,fx+70,fy-90,t,tw+.2);lineTo(1050,190,gx-70,gy-100,t,tr);
 TX('HIS FOREHEAD',480,990,'300 36px Fraunces',IVORY,TA*a*sm(tw,tw+.3,t),'center','8px');TX('HIS LEGS',1440,990,'300 36px Fraunces',IVORY,TA*a*sm(tr,tr+.3,t),'center','8px');}
function ROOT(t,t0){X.fillStyle='#000';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);const tl=TQ(160.48),tr=TQ(162.64),tc=TQ(159.90);
 half('n06',0,[.52,.38],1.15,sm(tr,tr+.5,t),a);half('n11',1,[.5,.32],1.05,sm(tl,tl+.5,t),a);halvesFrame();
 wordCard(t,tc,'מצח','forehead',null,960,140,130);
 const lab=(he,enx,ref,x,ton)=>{const k=sm(ton,ton+.35,t);if(k<=0)return;heb(he,x,850,86,a*k,{allGold:true});TX(enx,x,925,'italic 400 46px Newsreader',IVORY,a*k);TX(ref,x,985,'300 28px Fraunces',GOLD,a*k,'center','6px');};
 lab('מִצְחוֹ','his forehead','1 SAMUEL 17:49',480,tr);lab('מִצְחַת','on his legs','1 SAMUEL 17:6',1440,tl);}
function HELM(t,t0){X.fillStyle='#000';X.fillRect(0,0,W,H);const a=clamp((t-t0)/0.3);const tg=TQ(225.06);
 half('s06',0,[.55,.22],1.25,1,a);half('n16',1,[.62,.24],1.35,1,a);halvesFrame();
 heb('כּוֹבַע · קוֹבַע',960,110,64,a*sm(tg,tg+.4,t),{allGold:true});TX('the same word, spelled two ways',960,178,'italic 400 40px Newsreader',IVORY,a*sm(tg,tg+.4,t));
 const row=(he,lab,ref,x)=>{heb(he,x,850,70,a,{t,gold:{'וְכוֹבַע':tg,'קוֹבַע':tg,'נְחֹשֶׁת':tg,'עַל־רֹאשׁוֹ':tg}});TX(lab,x,928,'italic 400 44px Newsreader',IVORY,a);TX(ref,x,985,'300 28px Fraunces',GOLD,a,'center','6px');};
 row('וְכוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ','Goliath: a bronze helmet on his head','1 SAMUEL 17:5',480);row('קוֹבַע נְחֹשֶׁת עַל־רֹאשׁוֹ','David: a bronze helmet on his head','1 SAMUEL 17:38',1440);}
const GF={FH,HELM,TRI,MAP,MAP2,X2,ROOT,END};
// ---------- frame ----------
function drawImg(g,alpha,slow){X.save();X.globalAlpha=alpha;if(slow)X.filter='saturate(.5) contrast(1.08)';const R=g.R;X.drawImage(g.im,g.x0,g.y0,g.ww,g.hh,R.x,R.y,R.w,R.h);X.filter='none';X.restore();}
function fadeEdge(g){const R=g.R;X.save();
 if(R.x>0){const gr=X.createLinearGradient(R.x,0,R.x+480,0);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(.4,'rgba(0,0,0,.62)');gr.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gr;X.fillRect(R.x-2,0,484,H);X.fillStyle='#000';X.fillRect(0,0,R.x,H);}
 else{const xe=R.x+R.w;const gr=X.createLinearGradient(xe,0,xe-480,0);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(.4,'rgba(0,0,0,.62)');gr.addColorStop(1,'rgba(0,0,0,0)');X.fillStyle=gr;X.fillRect(xe-482,0,484,H);X.fillStyle='#000';X.fillRect(xe,0,W-xe,H);}
 const tb=X.createLinearGradient(0,0,0,H);tb.addColorStop(0,'rgba(0,0,0,.5)');tb.addColorStop(.16,'rgba(0,0,0,0)');tb.addColorStop(.84,'rgba(0,0,0,0)');tb.addColorStop(1,'rgba(0,0,0,.55)');X.fillStyle=tb;X.fillRect(R.x,0,R.w,H);X.restore();}
function drawShot(i,t,alpha){const s=SH[i],t0=st(i),t1=en(i),o=s.o||{};const g=geo(s,t,t0,t1);drawImg(g,alpha,o.fx&&o.fx.includes('slow'));return g;}
function scene(i,t){const s=SH[i],t0=st(i),t1=en(i),o=s.o||{};let g=null;
 X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.fillStyle='#000';X.fillRect(0,0,W,H);
 let shx=0,shy=0;const sk=o.imp?[T(o.imp[0]),9]:o.imp2?[T(o.imp2[0]),6]:null;if(sk&&t>=sk[0]){const k=t-sk[0],amp=sk[1]*Math.exp(-k*10);shx=Math.sin(k*61)*amp;shy=Math.cos(k*47)*amp*0.7;}
 X.save();X.translate(shx,shy);
 if(s.k==='img'){g=drawShot(i,t,1);
  if(o.fx){if(o.fx.includes('sweep'))sweep(t,t0,t1);if(o.fx.includes('haze'))haze(t);if(o.fx.includes('cool')){X.save();X.globalCompositeOperation='soft-light';X.fillStyle='rgba(120,150,190,.45)';X.fillRect(0,0,W,H);X.restore();}}
  fadeEdge(g);}
 else GF[s.k](t,t0,t1,o);
 X.restore();
 if(o.fx){if(o.fx.includes('dust'))dust(t,11+i*7,90,1);if(o.fx.includes('embers'))embers(t,5+i,46);if(o.fx.includes('slow'))dust(t*0.25,99,60,1.2);}
 if(['MAP','MAP2','X2','END'].includes(s.k))dust(t,300+i,50,0.7);
 if(g){const cx=PCX(s);
  if(o.spot){dim(1-sm(t0+0.05,t0+0.6,t));}
  if(o.arm)ARM(t,g,o.arm,o.arme);
  if(o.g1)g1(t,cx);
  if(o.rg)for(const [on,fx,fy,R] of o.rg){const ton=TQ(on)+0.06;if(t<ton)continue;const [px,py]=P(g,fx,fy);ring(px,py,R,(t-ton)/0.35,t);}
  if(o.ret){const ton=TQ(o.ret[0]);if(t>=ton){const [px,py]=P(g,o.ret[1],o.ret[2]);reticle(px,py,(t-ton)/0.5,t);}}
  if(o.wc)for(const [on,he,enn,ref,x,y,sz,off] of o.wc)wordCard(t,TQ(on)-0.04,he,enn,ref,x,y,sz,off?T(off):0);
  if(o.imp){const ton=T(o.imp[0]);const [px,py]=P(g,o.imp[1],o.imp[2]);burst(t,ton,px,py,90,77);if(t>=ton)glow(px,py,260,0.8*Math.exp(-(t-ton)*3));}
  if(o.imp2){const ton=T(o.imp2[0]);const [px,py]=P(g,o.imp2[1],o.imp2[2]);burst(t,ton,px,py,70,55);}
  if(o.tk)for(const [m,ta,tb] of o.tk)tracker(t,m,m===0?TQ(ta):TQ(ta),T(tb),cx);
  if(o.gath){const [px,py]=P(g,.65,.25);const k=sm(TQ(296.26),TQ(296.26)+.35,t);callout(px,py+10,740,190,eo((t-TQ(296.0))/0.45),k);TX('GATH',726,180,'300 40px Fraunces',GL,k,'right','10px');TX('Goliath’s hometown · 17:4',726,236,'italic 400 38px Newsreader',IVORY,k,'right');}
 }
 if(o.tick){const tk=[3.06,3.28,3.50].map(TQ);const fo=o.arme?1-sm(T(o.arme)-.35,T(o.arme),t):1;
  const refs=['1 SAMUEL 17:5','17:6','17:7'];X.save();X.font='300 40px Fraunces';X.letterSpacing='6px';const ws=refs.map(r=>X.measureText(r).width),sep=50,tot=ws.reduce((p,q)=>p+q,0)+sep*2;X.restore();let x=380-tot/2;
  refs.forEach((r,k)=>{TX(r,x+ws[k]/2,990,'300 40px Fraunces',GL,fo*sm(tk[k],tk[k]+.2,t),'center','6px');if(k<2)TX('·',x+ws[k]+sep/2,990,'300 40px Fraunces',GOLD,fo*sm(tk[k+1],tk[k+1]+.2,t));x+=ws[k]+sep;});}
}
window.renderFrame=t=>{
 X.globalAlpha=1;X.globalCompositeOperation='source-over';X.filter='none';X.fillStyle='#000';X.fillRect(0,0,W,H);
 if(t>=END_T)return;
 // dissolve centred on the cut: starts 0.2 s before it, ends 0.35 s after
 const j=shotAt(t+0.2),c=st(j),XA=0.2,XB=0.35;
 if(j>0&&t>=c-XA&&t<c+XB){const k=(t-(c-XA))/(XA+XB);TA=1-sm(0,0.5,k);scene(j-1,t);const keep=X;X=OX;TA=sm(0.5,1,k);scene(j,t);X=keep;TA=1;X.save();X.globalAlpha=ease(k);X.drawImage(OC,0,0);X.restore();}
 else{TA=1;scene(shotAt(t),t);}
 {const sN=SH[shotAt(t)];TA=1;for(const B of BN)if(t>=B.t0-.01&&t<B.t1+.01){if(sN.k==='img')bannerPanel(t,B,PCX(sN));else if(!B.rows)banner(t,B);}}
 const vg=X.createRadialGradient(W/2,H/2,H*0.42,W/2,H/2,H*1.08);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.36)');X.fillStyle=vg;X.fillRect(0,0,W,H);
 X.globalCompositeOperation='soft-light';X.globalAlpha=.5;X.drawImage(GRN[Math.floor(t*30)%GRN.length],0,0,W,H);X.globalAlpha=1;X.globalCompositeOperation='source-over';
 if(t<PRE+0.15){X.fillStyle='rgba(0,0,0,'+(1-Math.max(0,t/(PRE+0.15)))+')';X.fillRect(0,0,W,H);}
 if(t>END_T-0.8){X.fillStyle='rgba(0,0,0,'+sm(END_T-0.8,END_T,t)+')';X.fillRect(0,0,W,H);}
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
