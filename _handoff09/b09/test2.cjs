const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});const errs=new Set();
p.on('pageerror',e=>errs.add('PE '+e.message));p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.add(m.text())});
await p.goto('file:///tmp/claude-0/lf12/b09/index.html');await p.waitForFunction(()=>window.READY===true,null,{timeout:60000});
const r=await p.evaluate(()=>{for(let t=0;t<window.DUR;t+=0.25){window.renderFrame(t);}return {DUR:window.DUR,miss:window.MISS||[],shots:window.SHOTS.map(s=>[+s.a.toFixed(2),+s.b.toFixed(2)])};});
console.log(JSON.stringify(r.miss),r.DUR);
// gaps / overlaps
const s=r.shots.slice().sort((a,b)=>a[0]-b[0]);for(let i=1;i<s.length;i++){if(Math.abs(s[i][0]-s[i-1][1])>.06)console.log('gap/overlap',s[i-1],s[i]);}
console.log([...errs].slice(0,12).join('\n'));await b.close();})();
