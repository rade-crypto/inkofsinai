import base64,sys,subprocess,os
D='/tmp/claude-0/lf12/b09p/';D9='/tmp/claude-0/lf12/b09/';D6='/tmp/claude-0/lf12/b06/v2/'
mode=sys.argv[1] if len(sys.argv)>1 else 'full'
MIN1=['00_before','02b_grabs','00b_grip','21_esau_plan','27_brothers_hate','01_jacob_boys','02_crossing','b_joseph','03_jacob_closeup','c_twins','04_isaac','05_cain_abel','d_300','e_offering','f_cain_rises','11_isaac_ishmael']
keys=MIN1 if mode=='min1' else [f[:-5] for f in sorted(os.listdir(D+'img')) if f.endswith('.webp')]
WEB=mode=='web'
imgs='window.IMGS={'+','.join((f'"{k}":"img/{k}.webp"' if WEB else f'"{k}":"data:image/webp;base64,'+base64.b64encode(open(D+'img/'+k+'.webp','rb').read()).decode()+'"') for k in keys)+'};'
if mode=='min1':
  subprocess.run(['python3',D+'mixmin1.py'],check=True)
  audf='/tmp/claude-0/lf12/b09p/min1.mp3';dur='window.DUR=69.7;';out='/home/user/inkofsinai/_share/09_first_minute.html';title='09 Younger Brother · first minute'
elif mode=='render':
  audf=None;dur='';out='/tmp/claude-0/lf12/b09p/render_noaudio.html';title='render'
elif WEB:
  audf=None;dur='';out='/tmp/claude-0/lf12/web/index.html';title='Younger Brother Cut'
else:
  audf=D+'mixfull.mp3';dur='';out='/home/user/inkofsinai/_share/09_younger_brother_render.html';title='09 Younger Brother'
aud=base64.b64encode(open(audf,'rb').read()).decode() if audf else ''
js=open(D9+'lib.js').read()+'\n'+open(D9+'words.js').read()+'\n'+imgs+'\n(()=>{\n'+open(D+'scenes09p.js').read()+'\n})();\n'+dur
fonts=open(D6+'fonts_embed06.css').read()
html=f'''<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{title}</title>
<style>{fonts}
html,body{{margin:0;height:100%;background:#000;color:#e9dfc9;font:15px system-ui,sans-serif;overflow:hidden}}
#wrap{{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center}}
#c{{display:block;width:min(100vw,calc((100vh - 52px)*16/9));height:auto;aspect-ratio:16/9;background:#000}}
#bar{{display:flex;align-items:center;gap:12px;height:52px;box-sizing:border-box;padding:0 14px;width:min(100vw,calc((100vh - 52px)*16/9));background:#0d0a07}}
#pp{{padding:8px 18px;font:600 14px system-ui;cursor:pointer;background:#d9b46a;color:#1a1208;border:0;border-radius:6px}}
#sk{{flex:1}}#sp{{font:600 14px system-ui;padding:6px 8px;background:#1a1208;color:#e9dfc9;border:1px solid #6b5530;border-radius:6px;cursor:pointer}}#tm{{font-variant-numeric:tabular-nums;min-width:96px;text-align:right}}</style></head><body>
<div id="wrap"><canvas id="c" width="1920" height="1080"></canvas>
<div id="bar"><button id="pp">▶ Play</button><input id="sk" type="range" min="0" max="1000" value="0"><span id="tm">0:00</span><select id="sp" title="Speed"><option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></div></div>
<audio id="au" preload="auto" src="{'mixfull.mp3' if WEB else 'data:audio/mpeg;base64,'+aud}"></audio>
<script>{js}</script>
<script>{open(D6+'render_lib.js').read()}</script>
{'' if WEB else "<script>const AUDIO_B64=document.getElementById('au').src.split(',')[1];"+open(D9+'render_ui09.js').read()+"</script>"}
<script>
(function(){{const au=document.getElementById('au'),pp=document.getElementById('pp'),sk=document.getElementById('sk'),tm=document.getElementById('tm');let raf=0,drag=false;
const fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
let CK={{a:0,p:0}};const clock=()=>{{const a=au.currentTime,p=performance.now();if(au.paused||au.ended){{CK={{a,p}};return a;}}const pred=CK.a+(p-CK.p)/1000*au.playbackRate;if(Math.abs(a-pred)>.2){{CK={{a,p}};return a;}}const t=Math.max(CK.a,pred+(a-pred)*.03);CK={{a:t,p}};return t;}};
const draw=()=>{{const t=Math.min(clock(),window.DUR);renderFrame(t);tm.textContent=fmt(t)+' / '+fmt(window.DUR);if(!drag)sk.value=Math.round(1000*t/window.DUR);}};
const loop=()=>{{draw();if(!au.paused&&!au.ended&&au.currentTime<window.DUR)raf=requestAnimationFrame(loop);else if(au.currentTime>=window.DUR){{au.pause();pp.textContent='▶ Play';}}}};
const ready=()=>{{if(!window.READY)return setTimeout(ready,50);draw();}};ready();
pp.onclick=()=>{{if(au.paused){{if(au.currentTime>=window.DUR-.05)au.currentTime=0;au.play();pp.textContent='❚❚ Pause';cancelAnimationFrame(raf);loop();}}else{{au.pause();pp.textContent='▶ Play';}}}};
au.onended=()=>{{pp.textContent='▶ Play';draw();}};
const sp=document.getElementById('sp');sp.onchange=()=>{{au.playbackRate=+sp.value;au.preservesPitch=true;}};
sk.oninput=()=>{{drag=true;au.currentTime=window.DUR*sk.value/1000;if(window.READY)draw();}};sk.onchange=()=>{{drag=false;}};
document.addEventListener('keydown',e=>{{if(e.code==='Space'){{e.preventDefault();pp.click();}}}});}})();
</script></body></html>'''
os.makedirs(os.path.dirname(out),exist_ok=True)
if WEB:
  import shutil;shutil.copytree(D+'img',os.path.dirname(out)+'/img',dirs_exist_ok=True);shutil.copy(D+'mixfull.mp3',os.path.dirname(out)+'/mixfull.mp3')
open(out,'w').write(html);print(out,round(len(html)/1e6,2),'MB')
