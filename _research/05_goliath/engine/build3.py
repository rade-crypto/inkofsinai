from PIL import Image
import json, base64, io, os
D='/tmp/claude-0/lf12/lf05v/'
A=json.load(open(D+'web/assets2.json'))
for n in list(A['ov'].keys()):
    im=Image.open(D+'ov/'+n+'.png').convert('RGBA'); bb=im.getchannel('A').getbbox(); c=im.crop(bb)
    b=io.BytesIO(); c.save(b,'WEBP',quality=90,method=6,alpha_quality=95); A['ov'][n]={'x':bb[0],'y':bb[1],'d':'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()}
json.dump(A,open(D+'web/assets2.json','w'))
muxer=open(D+'muxer_block.html').read()
old=open(D+'old_render_stripped.html').read(); h0=old.find('<script>\n// ---------- Render'); k=old.find('";',h0)+2
harness=old[k:old.find('</script>',k)].replace('04_goat_and_garment.mp4','05_goliath_first_half.mp4')
aud=base64.b64encode(open(D+'web/mix3.ogg','rb').read()).decode()
html=f'''<!doctype html><html><head><meta charset="utf-8"><title>05 Goliath – first half</title>
<style>{open(D+'fonts_embed.css').read()}
html,body{{margin:0;background:#000;color:#eee}}#c{{display:block;width:100vw;max-width:1920px;height:auto;margin:0 auto 64px}}
#pv{{position:fixed;top:12px;right:16px;z-index:9;padding:7px 18px;font:600 14px system-ui,sans-serif;cursor:pointer}}</style></head><body>
<canvas id="c" width="1920" height="1080"></canvas><button id="pv">Preview with sound</button>
<script>window.ASSETS={json.dumps(A)};</script>
<script>{open(D+'web/player3.js').read()}</script>
{muxer}
<script>
const AUDIO_B64="{aud}";
{harness}
</script>
<script>
(function(){{const b=document.getElementById('pv');let au=null,raf=0;
b.onclick=()=>{{if(au&&!au.paused){{au.pause();cancelAnimationFrame(raf);b.textContent='Preview with sound';return;}}
 if(!au){{const bin=Uint8Array.from(atob(AUDIO_B64),c=>c.charCodeAt(0));au=new Audio(URL.createObjectURL(new Blob([bin],{{type:'audio/ogg'}})));}}
 au.play();b.textContent='Pause';const loop=()=>{{renderFrame(au.currentTime);if(!au.paused&&!au.ended)raf=requestAnimationFrame(loop);else b.textContent='Preview with sound';}};loop();}};}})();
</script></body></html>'''
open('/home/user/inkofsinai/_share/05_goliath_first_half_render.html','w').write(html)
print('html MB',round(len(html)/1e6,1))
