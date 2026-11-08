const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+process.argv[2]);await p.waitForFunction(()=>window.READY,null,{timeout:90000});
const sh=await p.evaluate(()=>window.SHOTS.map(s=>[s.a,s.b]));console.log(JSON.stringify(sh));await b.close();})();
