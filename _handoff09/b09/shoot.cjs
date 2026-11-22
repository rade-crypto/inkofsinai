const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text())});
await p.goto('file:///tmp/claude-0/lf12/b09/index.html');await p.waitForFunction(()=>window.READY===true,null,{timeout:60000});
for(const t of process.argv.slice(2)){const d=await p.evaluate(t=>{window.renderFrame(+t);return document.getElementById('c').toDataURL('image/jpeg',.85);},t);
fs.writeFileSync(`/tmp/claude-0/lf12/b09/chk/s_${t}.jpg`,Buffer.from(d.split(',')[1],'base64'));}
await b.close();})().catch(e=>{console.error(e);process.exit(1)});
