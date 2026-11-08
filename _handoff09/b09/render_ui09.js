(function(){
const box=document.createElement('div');box.style.cssText='display:flex;gap:10px;align-items:center;font:13px system-ui,sans-serif;color:#cdbf9f';
const btn=document.createElement('button');btn.textContent='Render';btn.style.cssText='padding:6px 14px;font:600 14px system-ui,sans-serif;cursor:pointer;background:#1a1208;color:#e9dfc9;border:1px solid #6b5530;border-radius:6px';
const msg=document.createElement('span');msg.textContent='Render saves the full video as an MP4 (best in Chrome or Edge). Keep this tab open until it finishes.';
const prog=document.createElement('progress');prog.max=1;prog.value=0;prog.style.cssText='flex:1;display:none';
box.append(btn,prog,msg);msg.textContent='MP4, Chrome/Edge';const bar=document.getElementById('bar');(bar||document.body).append(box);
const FPS=30,Wd=1920,Ht=1080,SR=48000,TESTN=+(new URLSearchParams(location.search).get('test')||0),NF=TESTN||Math.round(DUR*FPS);
const fmt=s=>{s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');};
async function pickCodec(list,test){for(const c of list){try{const r=await test(c);if(r&&r.supported)return c;}catch(e){}}return null;}
btn.onclick=async()=>{
  if(!window.VideoEncoder||!window.AudioEncoder){msg.textContent='This browser can’t render video. Please open this file in Chrome or Edge.';return;}
  btn.disabled=true;
  try{
    const vcodec=await pickCodec(['avc1.640028','avc1.4d0028','avc1.42e028','vp09.00.40.08'],c=>VideoEncoder.isConfigSupported({codec:c,width:Wd,height:Ht,bitrate:10e6,framerate:FPS}));
    if(!vcodec)throw new Error('Video encoding is not available in this browser.');
    const acfg={sampleRate:SR,numberOfChannels:2,bitrate:192000};
    let acodec=await pickCodec(['mp4a.40.2'],c=>AudioEncoder.isConfigSupported({codec:c,...acfg})),amux='aac';
    if(!acodec){acodec=await pickCodec(['opus'],c=>AudioEncoder.isConfigSupported({codec:c,...acfg}));amux='opus';}
    if(!acodec)throw new Error('Audio encoding is not available in this browser.');
    // where to save: stream straight to disk when the browser allows it
    let target,stream=null,useStream=!!window.showSaveFilePicker&&!TESTN;
    if(useStream){try{const fh=await showSaveFilePicker({suggestedName:'09_younger_brother.mp4',types:[{description:'MP4 video',accept:{'video/mp4':['.mp4']}}]});stream=await fh.createWritable();target=new Mp4Muxer.FileSystemWritableFileStreamTarget(stream);}catch(e){if(e&&e.name==='AbortError'){btn.disabled=false;msg.textContent='Cancelled.';return;}useStream=false;}}
    if(!useStream)target=new Mp4Muxer.ArrayBufferTarget();
    const muxer=new Mp4Muxer.Muxer({target,video:{codec:vcodec.startsWith('avc')?'avc':'vp9',width:Wd,height:Ht,frameRate:FPS},audio:{codec:amux,numberOfChannels:2,sampleRate:SR},fastStart:useStream?false:'in-memory',firstTimestampBehavior:'offset'});
    // soundtrack: decode, encode, keep the chunks to interleave with the picture
    msg.textContent='Preparing the soundtrack…';prog.style.display='';
    const bin=Uint8Array.from(atob(AUDIO_B64),ch=>ch.charCodeAt(0));
    const oac=new OfflineAudioContext(2,Math.ceil(SR*DUR),SR);const abuf=await oac.decodeAudioData(bin.buffer);
    const achunks=[];const aenc=new AudioEncoder({output:(c,m)=>achunks.push([c,m]),error:e=>{throw e;}});aenc.configure({codec:acodec,...acfg});
    const total=Math.min(abuf.length,Math.round(SR*DUR)),step=SR/2;
    for(let s=0;s<total;s+=step){const n=Math.min(step,total-s),data=new Float32Array(n*2);for(let ch=0;ch<2;ch++)data.set(abuf.getChannelData(Math.min(ch,abuf.numberOfChannels-1)).subarray(s,s+n),ch*n);
      const ad=new AudioData({format:'f32-planar',sampleRate:SR,numberOfFrames:n,numberOfChannels:2,timestamp:Math.round(s/SR*1e6),data});aenc.encode(ad);ad.close();}
    await aenc.flush();aenc.close();let ai=0;
    const pushAudioUpTo=us=>{while(ai<achunks.length&&achunks[ai][0].timestamp<=us){muxer.addAudioChunk(achunks[ai][0],achunks[ai][1]);ai++;}};
    // picture: every frame drawn and encoded in order
    let vErr=null;const venc=new VideoEncoder({output:(c,m)=>{pushAudioUpTo(c.timestamp);muxer.addVideoChunk(c,m);},error:e=>{vErr=e;}});
    venc.configure({codec:vcodec,width:Wd,height:Ht,bitrate:10e6,framerate:FPS,latencyMode:'quality'});
    const cv=document.getElementById('c'),t0=performance.now();
    for(let i=0;i<NF;i++){if(vErr)throw vErr;
      renderFrame(i/FPS);const fr=new VideoFrame(cv,{timestamp:Math.round(i*1e6/FPS),duration:Math.round(1e6/FPS)});venc.encode(fr,{keyFrame:i%(FPS*2)===0});fr.close();
      while(venc.encodeQueueSize>6)await new Promise(r=>setTimeout(r,4));
      if(i%15===0){prog.value=i/NF;const el=(performance.now()-t0)/1000,eta=el/(i+1)*(NF-i-1);msg.textContent='Rendering '+fmt(i/FPS)+' / '+fmt(DUR)+'  ·  about '+fmt(eta)+' left';await new Promise(r=>setTimeout(r,0));}}
    await venc.flush();venc.close();pushAudioUpTo(Infinity);muxer.finalize();
    if(useStream){await stream.close();msg.textContent='Done. The video is saved.';}
    else{window.LASTMP4=target.buffer;const url=URL.createObjectURL(new Blob([target.buffer],{type:'video/mp4'}));const a=document.createElement('a');a.href=url;a.download='09_younger_brother.mp4';document.body.append(a);a.click();msg.textContent='Done. The video downloaded as 09_younger_brother.mp4.';}
    prog.value=1;
  }catch(e){msg.textContent='Render stopped: '+(e&&e.message?e.message:e);btn.disabled=false;}
};
const iv=setInterval(()=>{if(window.READY){clearInterval(iv);renderFrame(0.5);}},100);
})();

