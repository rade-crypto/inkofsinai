const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];
p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file:///home/user/inkofsinai/_share/09_younger_brother_render.html');await p.waitForFunction(()=>window.READY===true,null,{timeout:60000});
const r=await p.evaluate(()=>{const out=[];for(let t=0;t<window.DUR;t+=0.5){window.renderFrame(t);}return window.DUR;});
await p.screenshot({path:'/tmp/claude-0/lf12/b09/chk/page.jpg'});console.log('DUR',r,'errors',errs.slice(0,5));await b.close();})();
