const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [,,file,t0,t1,step,out]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+file);await p.waitForFunction(()=>window.READY,null,{timeout:120000});
for(let t=+t0;t<+t1;t+=+step){const d=await p.evaluate(t=>{renderFrame(t);const c=document.getElementById('c');const o=document.createElement('canvas');o.width=480;o.height=270;o.getContext('2d').drawImage(c,0,0,480,270);return o.toDataURL('image/jpeg',.8);},t);
fs.writeFileSync(`${out}/f_${t.toFixed(1).padStart(6,'0')}.jpg`,Buffer.from(d.split(',')[1],'base64'));}await b.close();})();
