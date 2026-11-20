// kit_core.js: the parchment Shorts kit, rebuilt for s24 because the studio KIT (engine/lf12) is not in the repo.
// Same API shape as the posted reels' scenes.js (addP, KIT.STAGE / LINES / heb / rich / ENDVERSE / LOGO / ROLLTO, KIT.X, KIT.INK, KIT.HOT, sm/eo/on/live/inSafe),
// so s24/scenes.js also reads like s20/s23. Pure functions of absolute time v (seconds). 1080x1920.
// Motion rules: text inks on (fade + 14 px rise + a soft blur that resolves); key words bloom from ink to red with a warm glow;
// nothing fades out: a step holds, then the next one cuts in.
const SCENES = [];
function addP(n, d, f) { const a = SCENES.length ? SCENES[SCENES.length - 1].b : 0; SCENES.push({ n, a, b: a + d, f }); }
const KIT = {};
(() => {
const K = KIT, W = 1080, H = 1920;
K.W = W; K.H = H; K.F = { g: "'Frank Ruhl Libre'", c: "'Frank Ruhl Libre'", i: "'Newsreader'" };
const cl = x => Math.max(0, Math.min(1, x));
K.cl = cl; K.lerp = (p, q, k) => p + (q - p) * k;
K.sm = x => { x = cl(x); return x * x * (3 - 2 * x); };
K.eo = x => { x = cl(x); return 1 - Math.pow(1 - x, 3); };
K.eio = x => { x = cl(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
K.on = (v, t, d = .5) => K.sm((v - t) / d);
K.live = (v, a, b) => v >= a - 1e-6 && v < b + 1e-6;
K.INKC = '#2a1e12'; K.INK = a => `rgba(42,30,18,${a})`; K.HOT = '#a63a22'; K.HOTA = a => `rgba(166,58,34,${a})`; K.GOLD = a => `rgba(236,178,84,${a})`;
K.mix = (k, a = 1) => `rgba(${Math.round(42 + (166 - 42) * k)},${Math.round(30 + (58 - 30) * k)},${Math.round(18 + (34 - 18) * k)},${a})`;   // ink -> red
// Shorts safe zone: clear of the YouTube / IG / TikTok title, caption and button overlays.
K.SAFE = { x0: 90, y0: 250, x1: 990, y1: 1560 }; K.warn = new Set();
K.inSafe = (x0, y0, x1, y1, l) => { const s = K.SAFE; if (x0 < s.x0 || y0 < s.y0 || x1 > s.x1 || y1 > s.y1) K.warn.add(`${l}: ${[x0, y0, x1, y1].map(Math.round)}`); };
K.font = (size, o = {}) => `${o.italic ? 'italic ' : ''}${o.weight || (o.italic ? 400 : 500)} ${size}px ${o.italic ? K.F.i : (o.face || K.F.c)}`;
K.init = cv => { K.CV = cv; K.X = cv.getContext('2d'); K.PAPER = paper(); };

// ---------- parchment ----------
function paper() {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
  x.fillStyle = '#e4d5b6'; x.fillRect(0, 0, W, H);
  const id = x.getImageData(0, 0, W, H), d = id.data, rnd = (i, k) => { const s = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453; return s - Math.floor(s); };
  const g = 48, gw = Math.ceil(W / g) + 2, gh = Math.ceil(H / g) + 2, cells = []; for (let i = 0; i < gw * gh; i++) cells.push(rnd(i, 1));
  const vn = (px, py) => { const fx = px / g, fy = py / g, ix = Math.floor(fx), iy = Math.floor(fy), tx = fx - ix, ty = fy - iy, s = t => t * t * (3 - 2 * t);
    const q = (a, b) => cells[(b % gh) * gw + (a % gw)]; return K.lerp(K.lerp(q(ix, iy), q(ix + 1, iy), s(tx)), K.lerp(q(ix, iy + 1), q(ix + 1, iy + 1), s(tx)), s(ty)); };
  for (let y = 0; y < H; y++) for (let xx = 0; xx < W; xx++) {
    const i = (y * W + xx) * 4, n = (vn(xx, y) - .5) * 14 + (vn(xx * 3.1, y * 3.1) - .5) * 7 + (rnd(i, 2) - .5) * 9;
    d[i] += n; d[i + 1] += n * .95; d[i + 2] += n * .85; }
  x.putImageData(id, 0, 0);
  x.globalAlpha = .05; x.strokeStyle = '#6b5434'; x.lineWidth = 1;   // fibres
  for (let i = 0; i < 900; i++) { const px = rnd(i, 3) * W, py = rnd(i, 4) * H, a = rnd(i, 5) * 6.28, l = 6 + rnd(i, 6) * 26; x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + Math.cos(a) * l * .5 + 3, py + Math.sin(a) * l * .5, px + Math.cos(a) * l, py + Math.sin(a) * l); x.stroke(); }
  x.globalAlpha = 1;
  const v = x.createRadialGradient(W / 2, H * .46, 300, W / 2, H * .46, 1250); v.addColorStop(0, 'rgba(120,90,50,0)'); v.addColorStop(1, 'rgba(110,80,44,.34)'); x.fillStyle = v; x.fillRect(0, 0, W, H);
  return c;
}
K.STAGE = (v, at, o = {}) => {
  const X = K.X; X.drawImage(K.PAPER, 0, 0);
  const cx = o.cx ?? 540, cy = o.cy ?? 860, g = X.createRadialGradient(cx, cy, 20, cx, cy, o.r || 760);
  g.addColorStop(0, `rgba(255,247,222,${.55 * (o.k ?? 1)})`); g.addColorStop(1, 'rgba(255,247,222,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H);
};

// ---------- text ----------
// Rich line syntax: *word* = key word (blooms to red), {עברית} = Hebrew run inside an English line.
K.parse = s => { const out = []; let re = /(\*[^*]+\*|\{[^}]+\})/g, last = 0, m;
  while ((m = re.exec(s))) { if (m.index > last) out.push({ t: s.slice(last, m.index) }); const z = m[0]; out.push(z[0] === '*' ? { t: z.slice(1, -1), hot: 1 } : { t: z.slice(1, -1), heb: 1, hot: 1 }); last = m.index + z.length; }
  if (last < s.length) out.push({ t: s.slice(last) }); return out; };
K.ink = (v, t, draw, o = {}) => {   // the ink-on reveal used by every text element
  if (v < t) return; const X = K.X, k = (v - t) / (o.d || .6); X.save();
  X.globalAlpha *= K.sm(k * 1.1); const blur = (1 - K.eo(k)) * (o.blur ?? 6); if (blur > .3) X.filter = `blur(${blur.toFixed(2)}px)`;
  X.translate(0, (1 - K.eo(k)) * (o.rise ?? 14)); draw(); X.restore(); };
K.glow = (x, y, rx, ry, a) => { if (a <= 0) return; const X = K.X; X.save(); X.translate(x, y); X.scale(1, ry / rx);
  const g = X.createRadialGradient(0, 0, 0, 0, 0, rx); g.addColorStop(0, K.GOLD(.55 * a)); g.addColorStop(.55, K.GOLD(.2 * a)); g.addColorStop(1, K.GOLD(0)); X.fillStyle = g; X.fillRect(-rx, -rx, rx * 2, rx * 2); X.restore(); };
// one rich line, centred on x; size = Latin size; Hebrew runs are drawn 1.18x in the Hebrew face
K.rich = (s, x, y, size, v, o = {}) => {
  const X = K.X, segs = typeof s === 'string' ? K.parse(s) : s, it = !!o.italic;
  const fnt = sg => sg.heb ? K.font(size * 1.18, { face: K.F.g }) : K.font(size, { italic: it, weight: o.weight });
  let tot = 0; const ws = segs.map(sg => { X.font = fnt(sg); X.letterSpacing = o.ls && !sg.heb ? o.ls + 'px' : '0px'; let t = o.caps ? sg.t.toUpperCase() : sg.t; const w = X.measureText(t).width; tot += w; return w; });
  let cx = x - tot / 2; const hk = o.hotAt == null ? 1 : K.sm((v - o.hotAt) / .55);
  K.inSafe(x - tot / 2, y - size, x + tot / 2, y + size * .3, 'text ' + (typeof s === 'string' ? s.slice(0, 24) : ''));
  segs.forEach((sg, i) => { const t = o.caps ? sg.t.toUpperCase() : sg.t, w = ws[i];
    if (sg.hot && !o.plain) K.glow(cx + w / 2, y - size * .32, w * .75 + 30, size * .9, hk * .7);
    X.save(); X.font = fnt(sg); X.letterSpacing = o.ls && !sg.heb ? o.ls + 'px' : '0px'; X.textBaseline = 'alphabetic';
    X.fillStyle = sg.hot && !o.plain ? K.mix(hk) : (o.color || K.INKC);
    if (sg.heb) { X.direction = 'rtl'; X.textAlign = 'right'; X.fillText(t, cx + w, y); } else { X.direction = 'ltr'; X.textAlign = 'left'; X.fillText(t, cx, y); }
    X.restore(); cx += w; });
  return tot;
};
// LINES: a centred block of rich lines at KIT.CY (default 760); each line [text, t] inks on at t; key words bloom at t + .35
K.LINES = (v, a, b, o) => {
  const n = o.lines.length, size = o.size || 88, lh = o.lh || size * 1.3, cy = o.cy ?? K.CY ?? 760, y0 = cy - (n - 1) * lh / 2 + size * .34;
  o.lines.forEach(([s, t], i) => K.ink(v, t, () => K.rich(s, 540, y0 + i * lh, size, v, { italic: o.italic, hotAt: t + .35 })));
};
// heb: a Hebrew phrase centred on x. o.hot: words that bloom red at o.hotAt; o.hotLetter: {word, idx, at} reddens one letter (cluster) of a word.
K.clusters = w => w.match(/[א-תיִ-ﭏ][֑-ׇ]*|[^א-ת]/g) || [];
K.heb = (s, x, y, size, v, o = {}) => {
  const X = K.X, words = s.split(' '); X.save(); X.font = K.font(size, { face: K.F.g }); X.direction = 'rtl'; X.textAlign = 'right'; X.textBaseline = 'alphabetic';
  const sp = size * .28, ws = words.map(w => X.measureText(w).width), tot = ws.reduce((p, q) => p + q, 0) + sp * (words.length - 1);
  K.inSafe(x - tot / 2, y - size * .95, x + tot / 2, y + size * .35, 'heb ' + s);
  let r = x + tot / 2; const hk = o.hotAt == null ? 1 : K.sm((v - o.hotAt) / .55);
  words.forEach((w, i) => { const hot = (o.hot || []).includes(w);
    if (hot) K.glow(r - ws[i] / 2, y - size * .3, ws[i] * .7 + 30, size * .85, hk * .75);
    X.fillStyle = hot ? K.mix(hk) : (o.color || K.INKC); X.fillText(w, r, y);
    const hl = o.hotLetter; if (hl && hl.word === w && v >= hl.at) {   // one letter: clip its advance box and redraw in red
      const c = K.clusters(w), pre = X.measureText(c.slice(0, hl.idx).join('')).width, upto = X.measureText(c.slice(0, hl.idx + 1).join('')).width, k = K.sm((v - hl.at) / .55);
      const x1 = r - pre, x0 = r - upto; K.glow((x0 + x1) / 2, y - size * .4, (x1 - x0) * .9 + 30, size * .9, k * .8);
      X.save(); X.beginPath(); X.rect(x0 - 1, y - size * 1.2, x1 - x0 + 2, size * 1.6); X.clip(); X.fillStyle = K.mix(k); X.fillText(w, r, y); X.restore();
      K.lastLetter = { x: (x0 + x1) / 2, y: y - size * .42, w: x1 - x0 }; }
    r -= ws[i] + sp; });
  X.restore(); return tot;
};
K.REF = (s, y, v, t) => K.ink(v, t, () => K.rich(s, 540, y, 44, v, { caps: true, ls: 6, color: K.INK(.62), plain: true }), { blur: 3 });
// ENDVERSE: the closing verse alone. English-only when o.heb is absent (verses with the Divine Name).
K.ENDVERSE = (v, a, b, o) => {
  K.STAGE(v, a, { cy: 900 }); const cy = o.cy ?? 900, en = o.en, es = o.es || 76, lh = es * 1.32;
  K.REF(o.ref, cy - (o.heb ? 260 : 170), v, a + .1);
  if (o.heb) K.ink(v, a + .3, () => K.heb(o.heb, 540, cy - 40, o.hs || 150, v, { hot: o.hot, hotAt: a + 1.2 }));
  const y0 = o.heb ? cy + 110 : cy - (en.length - 1) * lh / 2 + es * .3;
  en.forEach((s, i) => K.ink(v, a + (o.enAt ?? .35) + i * (o.enStep ?? .9), () => K.rich(s, 540, y0 + i * lh, es, v, { italic: true, hotAt: a + 1.0 + i * .9 })));
};
// LOGO: the channel name in spaced capitals, a quill hairline drawn under it
K.LOGO = (v, a, b) => {
  K.STAGE(v, a, { cy: 900 }); const X = K.X;
  K.ink(v, a + .55, () => K.rich('INK OF SINAI', 540, 930, 84, v, { caps: true, ls: 14, color: K.INKC, plain: true }), { blur: 4 });
  const p = K.eio((v - a - 1.0) / .7); if (p > 0) { X.save(); X.strokeStyle = K.HOT; X.lineWidth = 3; X.lineCap = 'round'; X.beginPath(); X.moveTo(540 - 230 * p, 990); X.lineTo(540 + 230 * p, 990); X.stroke(); X.restore(); }
};
// ROLLTO: the previous step rolls up and off as the next rolls in from below (the posted outro move), .75 s
K.ROLLTO = (v, a, b, o) => {
  const X = K.X, k = K.eio((v - a) / .75);
  if (k < 1) { X.save(); X.translate(0, -H * k); o.prev(Math.min(v, o.pb - .001), o.pa, o.pb); X.restore(); }
  X.save(); X.translate(0, H * (1 - k)); o.next(v, a, b); X.restore();
};
// frame entry point
K.draw = v => { const s = SCENES.find(z => v >= z.a && v < z.b) || SCENES[SCENES.length - 1]; K.X.save(); s.f(v, s.a, s.b); K.X.restore(); return s.n; };
K.DUR = () => SCENES[SCENES.length - 1].b;
})();
