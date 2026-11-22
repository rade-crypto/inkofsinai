const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file:///tmp/claude-0/lf12/b09/index.html');await p.waitForFunction(()=>window.READY===true,null,{timeout:60000});
const step=+process.argv[2]||2.5,t0=+process.argv[3]||0,t1=+process.argv[4]||1e9;const dur=await p.evaluate(()=>window.DUR);
for(let t=t0;t<Math.min(dur,t1);t+=step){const d=await p.evaluate(t=>{window.renderFrame(t);const c=document.getElementById('c');const o=document.createElement('canvas');o.width=960;o.height=540;o.getContext('2d').drawImage(c,0,0,960,540);return o.toDataURL('image/jpeg',.82);},t);
fs.writeFileSync(`/tmp/claude-0/lf12/b09/frames/f_${t.toFixed(1).padStart(6,'0')}.jpg`,Buffer.from(d.split(',')[1],'base64'));}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
