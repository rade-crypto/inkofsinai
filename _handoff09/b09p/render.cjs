const {chromium}=require('playwright');const {spawn}=require('child_process');
(async()=>{const [,,file,t0s,t1s,out]=process.argv;const fps=30,t0=+t0s,t1=+t1s;
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','veryfast','-crf','22','-pix_fmt','yuv420p','-r',String(fps),out],{stdio:['pipe','inherit','inherit']});
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+file);await p.waitForFunction(()=>window.READY,null,{timeout:400000});await p.waitForTimeout(300);
const n0=Math.round(t0*fps),n1=Math.round(t1*fps);
for(let i=n0;i<n1;i++){const d=await p.evaluate(t=>{window.renderFrame(t);return document.getElementById('c').toDataURL('image/jpeg',.93);},i/fps);
  if(!ff.stdin.write(Buffer.from(d.slice(d.indexOf(',')+1),'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();})().catch(e=>{console.error(e);process.exit(1)});
