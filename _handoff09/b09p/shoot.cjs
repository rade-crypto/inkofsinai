const {chromium}=require('playwright');
(async()=>{const [,,file,outdir,...ts]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1200},deviceScaleFactor:1});
const errs=[];p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.goto('file://'+file);await p.waitForFunction(()=>window.READY,null,{timeout:60000});await p.waitForTimeout(400);
console.log('MISS',await p.evaluate(()=>JSON.stringify(window.MISS||[])));
for(const t of ts){await p.evaluate(t=>renderFrame(+t),t);const c=await p.$('#c');await c.screenshot({path:`${outdir}/${String(t).padStart(6,'0')}.png`});}
console.log(errs.slice(0,10).join('\n'));await b.close();})();
