import json, base64, io, sys
from PIL import Image
D='/tmp/claude-0/lf12/lf05v/'
HALF=int(sys.argv[1])
A=json.load(open(D+'web/assets2.json'))
IMG={0:'s01 s02 s03 s04 s05 s06 s07 s08 s09 s10 s11 s12 s14 s15b s16 s17 s18 s19 s20 n02 n03 n04 n05 n06 n07 n09 n10 n11 d01 d02 d03 d04 d05 d06 n12 n13 n14 n15 n16 n17 n18 n19 n20 n21 n22 n23',1:'s01 s02 s03 s04 s05 s06 s07 s08 s09 s10 s11 s12 s14 s15b s16 s17 s18 s19 s20 n02 n03 n04 n05 n06 n07 n09 n10 n11 d01 d02 d03 d04 d05 d06',
     2:'n12 n13 n14 n15 n16 n17 n18 n19 n20 n21 n22 n23 d01 n04 s06 s10 d06 n10'}[HALF].split()
OVS={0:['g1a','g1b'],1:['g1a','g1b'],2:[]}[HALF]
ov={}
for n in OVS:
    im=Image.open(D+'ov/'+n+'.png').convert('RGBA'); bb=im.getchannel('A').getbbox(); c=im.crop(bb)
    b=io.BytesIO(); c.save(b,'WEBP',quality=90,method=6,alpha_quality=95); ov[n]={'x':bb[0],'y':bb[1],'d':'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode()}
AS={'img':{k:A['img'][k] for k in IMG},'ov':ov}
INS=json.load(open(D+'ins.json'))
muxer=open(D+'muxer_block.html').read()
old=open(D+'old_render_stripped.html').read(); h0=old.find('<script>\n// ---------- Render'); k=old.find('";',h0)+2
name={0:'05_goliath',1:'05_goliath_first_half',2:'05_goliath_second_half'}[HALF]
harness=old[k:old.find('</script>',k)].replace('04_goat_and_garment.mp4',name+'.mp4')
aud=base64.b64encode(open(D+f'web/mix4_h{HALF}.ogg','rb').read()).decode()
html=f'''<!doctype html><html><head><meta charset="utf-8"><title>{'05 Goliath' if HALF==0 else '05 Goliath – '+('first' if HALF==1 else 'second')+' half'}</title>
<style>{open(D+'fonts_embed.css').read()}
html,body{{margin:0;background:#000;color:#eee}}#c{{display:block;width:100vw;max-width:1920px;height:auto;margin:0 auto 64px}}
#pv{{position:fixed;top:12px;right:16px;z-index:9;padding:7px 18px;font:600 14px system-ui,sans-serif;cursor:pointer}}</style></head><body>
<canvas id="c" width="1920" height="1080"></canvas><button id="pv">Preview with sound</button>
<script>window.HALF={HALF};window.INS={json.dumps(INS)};window.ASSETS={json.dumps(AS)};</script>
<script>{open(D+'web/player6.js').read()}</script>
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
out=f'/home/user/inkofsinai/_share/{name}_render.html'
open(out,'w').write(html); print(out,'MB',round(len(html)/1e6,1))
