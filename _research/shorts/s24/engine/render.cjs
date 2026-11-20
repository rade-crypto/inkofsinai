// Renders s24 in headless Chromium (Playwright) with kit_core.js + ../morph_data.js + ../kit_babel.js + a scenes file.
//   node render.cjs video  <out.mp4> [audio.wav]     whole Short, 30 fps, H.264 (+ audio if given)
//   node render.cjs frames <out.png> t1,t2,...       contact sheet of frames at those times (review)
//   node render.cjs frame  <out.png> t               one full-size frame
//   node render.cjs cover  <out.png>                 ../cover_scenes.js, 1080x1920 PNG
// Stills: ../img/S1.png … S5.png are used when present; otherwise labelled placeholders are drawn.
const { chromium } = require('playwright'), fs = require('fs'), path = require('path'), { spawn } = require('child_process');
const D = path.resolve(__dirname, '..'), E = __dirname, [mode, out, arg] = process.argv.slice(2);
const url = p => 'file://' + path.resolve(p);
const imgs = fs.existsSync(D + '/img') ? fs.readdirSync(D + '/img').filter(f => /^S\d+\.(png|jpe?g|webp)$/i.test(f)) : [];
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Frank Ruhl Libre';font-weight:500;src:url('${url(E + '/fonts/FrankRuhlLibre-Medium.ttf')}')}
@font-face{font-family:'Newsreader';font-style:italic;font-weight:400;src:url('${url(E + '/fonts/Newsreader-Italic.ttf')}')}
@font-face{font-family:'Newsreader';font-weight:400;src:url('${url(E + '/fonts/Newsreader-Regular.ttf')}')}
html,body{margin:0;background:#000}</style><canvas id="c" width="1080" height="1920"></canvas>
<script src="${url(E + '/kit_core.js')}"></script><script src="${url(D + '/morph_data.js')}"></script><script src="${url(D + '/kit_babel.js')}"></script>
<script>window.ready=(async()=>{await Promise.all(["500 80px 'Frank Ruhl Libre'","italic 400 80px 'Newsreader'","400 80px 'Newsreader'"].map(f=>document.fonts.load(f,'Abc אב')));
for(const f of ${JSON.stringify(imgs)}){const im=new Image();im.src=${JSON.stringify(url(D + '/img'))}+'/'+f;await im.decode().catch(()=>{});KIT.IMG=KIT.IMG||{};KIT.IMG[f.split('.')[0]]=im;}
KIT.init(document.getElementById('c'));})();</script>
<script src="${url(D + (mode === 'cover' ? '/cover_scenes.js' : '/scenes.js'))}"></script>`;
(async () => {
  const tmp = path.join(require('os').tmpdir(), 's24_render.html'); fs.writeFileSync(tmp, html);
  const br = await chromium.launch(), pg = await br.newPage({ viewport: { width: 1080, height: 1920 } });
  pg.on('pageerror', e => console.error('PAGE ERROR', e.message)); pg.on('console', m => console.log('page:', m.text()));
  await pg.goto('file://' + tmp); await pg.evaluate(() => window.ready);
  const shot = async (t, q) => Buffer.from((await pg.evaluate(([t, q]) => { KIT.draw(t); return KIT.CV.toDataURL(q ? 'image/jpeg' : 'image/png', q || undefined).split(',')[1]; }, [t, q])), 'base64');
  const dur = await pg.evaluate(() => KIT.DUR());
  if (mode === 'video') {
    const fps = 30, N = Math.round(dur * fps), args = ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-'];
    if (arg) args.push('-i', arg, '-c:a', 'aac', '-b:a', '192k', '-shortest');
    args.push('-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out);
    const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] });
    for (let i = 0; i < N; i++) { const b = await shot(i / fps, .93); if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 150 === 0) console.log('frame', i, '/', N); }
    ff.stdin.end(); await new Promise(r => ff.on('close', r));
  } else if (mode === 'frame' || mode === 'cover') { fs.writeFileSync(out, await shot(mode === 'cover' ? 1 : +arg));
  } else if (mode === 'frames') {
    const ts = arg.split(',').map(Number), dir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'fr'));
    for (const [i, t] of ts.entries()) fs.writeFileSync(`${dir}/${String(i).padStart(3, '0')}.png`, await shot(t));
    const cols = Math.min(ts.length, 6), rows = Math.ceil(ts.length / cols);
    await new Promise(r => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-pattern_type', 'glob', '-i', `${dir}/*.png`, '-vf', `scale=360:-1,tile=${cols}x${rows}:padding=6:color=black`, '-frames:v', '1', out], { stdio: 'inherit' }).on('close', r));
  }
  const warn = await pg.evaluate(() => [...KIT.warn]); if (warn.length) console.log('SAFE-ZONE WARNINGS:', warn);
  console.log('duration', dur.toFixed(2)); await br.close();
})();
