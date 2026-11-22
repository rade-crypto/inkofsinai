#!/usr/bin/env python3
"""Packs the whole Short into ONE self-contained HTML file (engine, scenes, fonts and the audio mix inlined) that plays in any browser:
click or space = play / pause, the bar scrubs. The picture follows the audio clock, so what you see is what the MP4 render will be.
Usage: python3 mk_html.py s24 mix.wav ../s24_babel.html"""
import base64, subprocess, sys, pathlib
B = pathlib.Path(sys.argv[1]); wav, out = sys.argv[2], sys.argv[3]
b64 = lambda p: base64.b64encode(pathlib.Path(p).read_bytes()).decode()
mp3 = '/tmp/_s24_mix.mp3'; subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', wav, '-b:a', '160k', mp3], check=True)
js = '\n'.join((B / f).read_text(encoding='utf-8') for f in ['engine/kit_core.js', 'morph_data.js', 'morph_stam.js', 'kit_babel.js', 'kit_beats.js', 'scenes.js'])
F = B / 'engine/fonts'
html = f"""<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>s24 Babel</title><style>
@font-face{{font-family:'Frank Ruhl Libre';font-weight:500;src:url(data:font/ttf;base64,{b64(F / 'FrankRuhlLibre-Medium.ttf')})}}
@font-face{{font-family:'Newsreader';font-style:italic;font-weight:400;src:url(data:font/ttf;base64,{b64(F / 'Newsreader-Italic.ttf')})}}
@font-face{{font-family:'Newsreader';font-weight:400;src:url(data:font/ttf;base64,{b64(F / 'Newsreader-Regular.ttf')})}}
@font-face{{font-family:'Stam';src:url(data:font/ttf;base64,{b64(F / 'StamAshkenazCLM.ttf')})}}
html,body{{margin:0;height:100%;background:#111;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Georgia,serif;color:#cbb994}}
canvas{{height:calc(100vh - 44px);max-width:100vw;aspect-ratio:9/16;object-fit:contain;cursor:pointer;background:#e4d5b6}}
#bar{{width:min(100vw,calc((100vh - 44px)*9/16));height:44px;display:flex;align-items:center;gap:10px;padding:0 10px;box-sizing:border-box;font-size:14px}}
#bar input{{flex:1;accent-color:#a63a22}}</style></head><body>
<canvas id="c" width="1080" height="1920"></canvas>
<div id="bar"><span id="pp">▶</span><input id="sc" type="range" min="0" max="1000" value="0"><span id="tm">0.0</span></div>
<audio id="au" src="data:audio/mpeg;base64,{b64(mp3)}"></audio>
<script>{js}</script>
<script>(async()=>{{await Promise.all(["500 80px 'Frank Ruhl Libre'","italic 400 80px 'Newsreader'","400 80px 'Newsreader'","80px 'Stam'"].map(f=>document.fonts.load(f,'Abc אב')));
const cv=document.getElementById('c'),au=document.getElementById('au'),sc=document.getElementById('sc'),pp=document.getElementById('pp'),tm=document.getElementById('tm');KIT.init(cv);const D=KIT.DUR();
let t=0,playing=false,last=0;const draw=()=>{{KIT.draw(Math.min(t,D-.001));sc.value=t/D*1000;tm.textContent=t.toFixed(1)}};
const tick=now=>{{if(playing){{t=au.currentTime||t+(now-last)/1000;if(t>=D-.03){{playing=false;pp.textContent='▶';au.pause()}}}}last=now;draw();requestAnimationFrame(tick)}};
const toggle=()=>{{playing=!playing;pp.textContent=playing?'❚❚':'▶';if(playing){{if(t>=D-.05)t=0;au.currentTime=t;au.play()}}else au.pause()}};
cv.onclick=pp.onclick=toggle;document.onkeydown=e=>{{if(e.code==='Space'){{e.preventDefault();toggle()}}}};
sc.oninput=()=>{{t=sc.value/1000*D;au.currentTime=t}};requestAnimationFrame(tick)}})();</script></body></html>"""
pathlib.Path(out).write_text(html, encoding='utf-8'); print('wrote', out, round(len(html) / 1e6, 2), 'MB')
