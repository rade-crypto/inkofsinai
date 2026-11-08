const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];
p.on('pageerror',e=>errs.push('PE '+e.message+' '+(e.stack||'').split('\n')[1]));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///tmp/claude-0/lf12/b09/index.html');await p.waitForTimeout(4000);console.log(errs.slice(0,8).join('\n'));await b.close();})();
