const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file:///tmp/claude-0/lf12/b06/v2/index.html');await p.waitForFunction(()=>window.READY===true,null,{timeout:90000});
for(const t of process.argv.slice(2)){const d=await p.evaluate(t=>{window.renderFrame(+t);return document.getElementById('c').toDataURL('image/jpeg',.8);},t);
fs.writeFileSync(`/tmp/claude-0/lf12/b09/chk/r06_${t}.jpg`,Buffer.from(d.split(',')[1],'base64'));}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
