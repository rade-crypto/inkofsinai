const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('console',m=>errs.push(m.type()+': '+m.text()));p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
await p.goto('file://'+process.argv[2]);await p.waitForTimeout(6000);console.log(errs.slice(0,15).join('\n'));console.log('READY',await p.evaluate(()=>window.READY));await b.close();})();
