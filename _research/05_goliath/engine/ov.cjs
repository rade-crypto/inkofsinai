const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const specs=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+__dirname+'/ov.html');await p.evaluate(()=>document.fonts.ready);
for(const [name,spec] of Object.entries(specs)){await p.evaluate(s=>window.R(s),spec);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(60);
 await p.locator('#st').screenshot({path:__dirname+'/ov/'+name+'.png',omitBackground:true});}
await b.close();console.log('ok',Object.keys(specs).length);})();
