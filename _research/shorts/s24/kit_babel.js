// ---------- BABEL (Shorts, parchment): photoreal plates, the stacked words, and the נ that comes down and becomes ל (new, s24 "Let us build / let us confuse") ----------
// KIT.WORDS(v,{s,x?,y,size,t,end?,italic?}): one rich line that lands word by word on the voiceover's pace (each word rises 12 px out of a soft blur); a key word
//   (*word*) blooms red as it lands and a quill underline is drawn under it. KIT.WLINES: a centred block of such lines.
// KIT.HEBW(v,{s,x?,right?,y,size,t,hot?,hotAt?,hotLetter?}): a Hebrew phrase written on right to left with a soft-edged wipe, the way the posted reels write Hebrew.
// KIT.TOWER(v,{t0,t1,p0,p1,base?,stop?}): a stepped brick tower laid brick by brick (running bond, each brick settles 10 px), from share p0 to p1 of its bricks
//   between t0 and t1. Ink line and wash only, no people. sky:{t}: two thin cloud lines the top course reaches.
// KIT.MATCH rows are composed in scenes.js from HEBW with right-aligned rows, so the same word sits exactly above itself.
// KIT.STACK(v,a,b,{rows,size?,cw?,strip?,dim?,hot?,col?,gloss?,gap?,morph?,heads?}): two Hebrew words stacked letter over letter in fixed columns (right to left), so the
//   one differing letter sits in its own column. rows: [{cl:[clusters], y, t}] (letters ink on right to left from t). strip:{t,d}: the vowel points dissolve and the bare
//   letters stay (the claim is about the written letters נבנה / נבלה). dim:{t,keep}: every column but `keep` sinks to light ink. hot:[{row,t0,t1}]: a row blooms red (and back).
//   col:{i,t}: the column turns red and a dashed capsule draws round it (the "look here" cue). gloss:[{row,s,t,t1}]: the English under a row.
//   red:{row,i}: that one letter is drawn red (cover). gap:{row,i,t}: that letter lifts out, leaving a dashed glowing ring. morph:{t,d,i}: a copy of the top row's letter in column i comes down into the ring and, on the way,
//   its outline morphs (KIT.MORPH_DATA, true glyph outlines) from נ into ל, ink to red; it lands, the ring closes and glows.
(() => {
const K = KIT;
const cache = {};
const off = (k, w, h) => { const c = cache[k] || (cache[k] = document.createElement('canvas')); if (c.width !== w || c.height !== h) { c.width = w; c.height = h; } return c; };
function mask(w, h) { const k = `m${w}x${h}`; if (cache[k]) return cache[k]; const c = off(k, w, h), x = c.getContext('2d'), f = 52;
  x.filter = `blur(${f * .55}px)`; x.fillStyle = '#fff'; x.beginPath(); x.roundRect(f, f, w - 2 * f, h - 2 * f, 26); x.fill();
  x.filter = 'none'; x.globalCompositeOperation = 'destination-in'; x.drawImage(c, 0, 0); x.globalCompositeOperation = 'source-over'; return c; }   // alpha squared: the feather reaches true zero at the edge
// a dashed stadium / circle drawn on progressively (p 0..1), with a warm glow behind (a)
K.ringPath = (cx, cy, rx, ry, p) => { const X = K.X, n = 120, m = Math.max(2, Math.round(n * p)); X.beginPath();
  for (let i = 0; i <= m; i++) { const t = -Math.PI / 2 + (i / n) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
    const px = cx + rx * Math.sign(c) * Math.pow(Math.abs(c), ry > rx * 1.4 ? .55 : 1), py = cy + ry * Math.sign(s) * Math.pow(Math.abs(s), ry > rx * 1.4 ? .55 : 1);
    i ? X.lineTo(px, py) : X.moveTo(px, py); } };
K.RING = (cx, cy, rx, ry, v, t, o = {}) => {
  if (v < t) return; const X = K.X, p = K.eo((v - t) / (o.d || .8)), ga = (o.glow ?? 1) * K.sm((v - t) / .9) * (1 + .18 * Math.sin((v - t) * 3.2));
  K.GLOWOK = true; K.glow(cx, cy, rx * 1.9, ry * 1.6, ga * .9); K.GLOWOK = false;
  X.save(); X.strokeStyle = K.HOT; X.lineWidth = o.lw || 4; X.lineCap = 'round'; X.setLineDash(o.solid ? [] : [12, 10]); K.ringPath(cx, cy, rx, ry, p); X.stroke(); X.restore();
};

K.STACK = (v, a, b, o) => {
  const X = K.X, f = o.from, n = o.rows[0].cl.length, size0 = o.size || 230, cw0 = o.cw || 212;
  const k1 = f ? K.eio((v - f.t) / f.d1) : 1, u2 = f ? (v - f.t - f.d1 - f.hold) / f.d2 : 1, k2 = u2 >= 1 ? 1 : K.eio((u2 - .3) / .7), ky = K.eio(u2 / .6), kx = K.eio((u2 - .35) / .65), fk = k2;   // the lower word drops first, then both centre and grow   // phase 1: onto one line, side by side; phase 2: one under the other
  const rows = o.rows.map((r, ri) => { if (!f || k2 >= 1) return { ...r, cx: 540, t: f ? -9 : r.t }; const m = f.mid.rows[ri], s0 = f.rows[ri];
    return { ...r, t: -9, cx: K.lerp(K.lerp(s0.cx, m.cx, k1), 540, kx), y: K.lerp(K.lerp(s0.y, m.y, k1), r.y, ky) }; });
  const size = f ? K.lerp(K.lerp(f.size, f.mid.size, k1), size0, k2) : size0, cw = f ? K.lerp(K.lerp(f.size * .5, f.mid.cw, k1), cw0, k2) : cw0; let rowCx = 540; const colX = i => rowCx + (1.5 - i) * cw;
  if (fk >= 1) K.inSafe(540 - cw * n / 2, rows[0].y - size * .9, 540 + cw * n / 2, rows[rows.length - 1].y + size * .3, 'STACK');
  const strip = o.strip ? K.sm((v - o.strip.t) / (o.strip.d || .9)) : (o.bare ? 1 : 0), dim = o.dim ? K.sm((v - o.dim.t) / .8) : 0;
  const colHot = o.col ? K.sm((v - o.col.t - .3) / .6) : 0, mk = o.morph ? (v - o.morph.t) / (o.morph.d || 1.5) : -1;
  if (o.col) { const yt = rows[0].y - size * .98, yb = rows[rows.length - 1].y + size * .24; K.RING(colX(o.col.i), (yt + yb) / 2, cw * .48, (yb - yt) / 2, v, o.col.t, { d: .9 }); }
  if (o.gap) { const r = rows[o.gap.row], cy = r.y - size * .36; K.RING(colX(o.gap.i), cy - 8, 135, 135, v, o.gap.t + .25, { d: .8, glow: mk >= 1 ? 1.5 : .8, solid: mk >= 1, lw: mk >= 1 ? 4 + 2.5 * K.sm((v - o.morph.t - (o.morph.d || 1.5)) / 2) : 4 }); }
  rows.forEach((r, ri) => r.cl.forEach((c, i) => {
    rowCx = r.cx ?? 540; const t = r.t + i * .07; if (v < t) return;
    let al = 1; if (dim && !(o.dim.keep === i)) al *= 1 - .66 * dim;
    if (o.gap && ri === o.gap.row && i === o.gap.i) { al *= 1 - K.sm((v - o.gap.t) / .55); if (al <= 0) return; }
    let hk = 0; (o.hot || []).forEach(h => { if (h.row === ri) hk = Math.max(hk, K.on(v, h.t0, .55) * (1 - K.on(v, h.t1 ?? 1e9, .45))); });
    if (o.col && i === o.col.i) hk = Math.max(hk, colHot);
    if (o.red && o.red.row === ri && o.red.i === i) hk = 1;
    if (hk > .02 && (!o.dim || o.dim.keep === i || dim < 1)) K.glow(colX(i), r.y - size * .36, cw * .62, size * .6, hk * .45 * al);
    let wave = 0; (o.hot || []).forEach(h => { if (h.row === ri) wave = Math.max(wave, Math.sin(Math.PI * K.cl((v - h.t0 - i * .08) / .5))); });
    K.ink(v, t, () => { X.font = K.font(size, { face: K.F.g }); X.textAlign = 'center'; X.direction = 'rtl'; X.textBaseline = 'alphabetic'; X.fillStyle = K.mix(hk);
      if (wave > 0) { const cx0 = colX(i), cy0 = r.y - size * .3, sw = 1 + .09 * wave; X.translate(cx0, cy0 - wave * 10); X.scale(sw, sw); X.translate(-cx0, -cy0); }
      X.globalAlpha *= al; X.fillText(c[0], colX(i), r.y); if (strip < 1 && c.length > 1) { X.globalAlpha *= 1 - strip; X.fillText(c, colX(i), r.y); } }, { rise: 10 });
  }));
  (o.gloss || []).forEach(g => { if (g.t1 == null || v < g.t1) K.WORDS(v, { s: g.s, y: g.y, size: 88, t: g.t }); });
  if (mk >= 0) {   // the letter comes down into the ring, then changes there
    const fr = K.MORPH_DATA.frames, i = o.morph.i, p = K.cl(mk), pe = K.eio(p / .5), y = K.lerp(rows[0].y, rows[1].y, pe), x = colX(i);
    const sk = K.eio((p - .5) / .5), path = new Path2D(fr[Math.round(sk * (fr.length - 1))]), ck = K.sm((p - .1) / .5), sc = size / 1000;
    if (pe > .02) { X.save(); X.translate(x, y); X.scale(sc, sc); X.fillStyle = K.mix(ck); X.fill(path); X.restore(); }
  }
};

// ---------- word-by-word English ----------
K.wsplit = str => { const out = []; K.parse(str).forEach(sg => { if (sg.heb) out.push({ ...sg }); else sg.t.split(/(\s+)/).forEach(w => { if (w) out.push({ t: w, hot: sg.hot, sp: /^\s+$/.test(w) }); }); }); return out; };
K.WORDS = (v, o) => {
  const X = K.X, size = o.size, it = !!o.italic, ws = K.wsplit(o.s), fnt = w => w.heb ? K.font(size * 1.5, { face: K.F.g }) : K.font(size, { italic: it });
  let tot = 0; ws.forEach(w => { X.font = fnt(w); w.w = X.measureText(w.t).width; tot += w.w; });
  const n = ws.filter(w => !w.sp).length, step = o.end ? K.cl(((o.end - o.t) * .8) / Math.max(1, n)) * 1 : .17, st = Math.max(.07, Math.min(.3, step));
  K.inSafe((o.x ?? 540) - tot / 2, o.y - size, (o.x ?? 540) + tot / 2, o.y + size * .3, 'words ' + o.s.slice(0, 22));
  let x = (o.x ?? 540) - tot / 2, k = 0;
  ws.forEach(w => { if (w.sp) { x += w.w; return; } const t = o.t + k * st; k++; const wx = x; x += w.w; if (v < t && o.pre == null) return;
    const hk = w.hot ? K.sm((v - t - .12) / .5) : 0; if (v < t) { X.save(); X.globalAlpha *= o.pre; X.font = fnt(w); X.fillStyle = K.INKC; X.textBaseline = 'alphabetic'; X.direction = 'ltr'; X.textAlign = 'left'; X.fillText(w.t, wx, o.y); X.restore(); return; }
    if (w.hot) K.glow(wx + w.w / 2, o.y - size * .32, w.w * .7 + 26, size * .85, hk * .6);
    const put = () => { X.font = fnt(w); X.textBaseline = 'alphabetic'; X.fillStyle = w.hot ? K.mix(hk) : K.INKC;
      if (w.heb) { X.direction = 'rtl'; X.textAlign = 'right'; X.fillText(w.t, wx + w.w, o.y); } else { X.direction = 'ltr'; X.textAlign = 'left'; X.fillText(w.t, wx, o.y); } };
    const pop = w.hot ? 1 + .16 * (1 - K.back((v - t) / .5)) : 1, cxw = wx + w.w / 2;
    X.save(); if (pop !== 1) { X.translate(cxw, o.y - size * .3); X.scale(pop, pop); X.translate(-cxw, -(o.y - size * .3)); }
    if (o.pre != null) { X.globalAlpha *= K.lerp(o.pre, 1, K.sm((v - t) / .25)); put(); }
    else { const k = K.eo((v - t) / .38); X.globalAlpha *= K.sm((v - t) / .16); X.beginPath(); X.rect(wx - 10, o.y - size * 1.3, (w.w + 20) * k, size * 1.9); X.clip(); X.translate(-(1 - k) * 22, (1 - k) * 8); put(); }   // written on: wipe + settle
    X.restore();
    w.x0 = wx; w.tt = t;
  });
  let run = null; const runs = []; ws.forEach(w => { if (w.hot && !w.heb && !w.sp) { if (!run) runs.push(run = { a: w, b: w }); else run.b = w; } else if (!w.sp) run = null; });
  runs.forEach(r => { if (r.b.tt == null) return; X.font = fnt(r.b); const core = r.b.t.replace(/[.,:;!?”’"]+$/, ''), xe = r.b.x0 + X.measureText(core).width, xs = r.a.x0 + (/^[“"‘]/.test(r.a.t) ? X.measureText(r.a.t[0]).width : 0), p = K.eo((v - r.b.tt - .15) / .5);
    if (p > 0) { X.save(); X.strokeStyle = K.HOTA(.9); X.lineWidth = Math.max(3.5, size * .05); X.lineCap = 'round'; X.beginPath(); const y = o.y + size * .17;   // one quill stroke under the key words
      for (let i = 0; i <= 24 * p; i++) { const u = i / 24, px = xs + (xe - xs) * u, py = y - Math.sin(u * 3.1) * size * .035; i ? X.lineTo(px, py) : X.moveTo(px, py); } X.stroke(); X.restore(); } });
};
K.WLINES = (v, o) => { const n = o.lines.length, size = o.size || 84, lh = o.lh || size * 1.3, y0 = o.top ?? o.cy - (n - 1) * lh / 2 + size * .34;
  o.lines.forEach(([s, t, end], i) => K.WORDS(v, { s, y: y0 + i * lh, size, t, end, italic: o.italic, pre: o.pre })); };

// ---------- Hebrew write-on (right to left, soft wipe) ----------
K.pos = {};
K.HEBW = (v, o) => {
  const X = K.X, size = o.size; X.save(); X.font = K.font(size, { face: K.F.g }); const words = o.s.split(' '), sp = size * .28;
  const tot = words.reduce((p, w) => p + X.measureText(w).width, 0) + sp * (words.length - 1); X.restore();
  const cx = o.right != null ? o.right - tot / 2 : (o.x ?? 540), x0 = cx - tot / 2, x1 = cx + tot / 2;
  let r = x1; X.save(); X.font = K.font(size, { face: K.F.g }); words.forEach(w => { const ww = X.measureText(w).width; K.pos[(o.key || '') + w] = { cx: r - ww / 2, y: o.y, w: ww, size }; r -= ww + sp; }); X.restore();
  if (v < o.t) return;
  if (!o.wipe && !o.hotLetter) {   // letters land one by one, right to left, each dropping in with a small overshoot
    const hotAt = o.hotAt ?? o.t + .5, hk = K.sm((v - hotAt) / .5) * (o.hotOff == null ? 1 : 1 - K.sm((v - o.hotOff) / .45)); let rr = x1, n = 0;
    X.save(); X.font = K.font(size, { face: K.F.g }); X.direction = 'rtl'; X.textAlign = 'right'; X.textBaseline = 'alphabetic';
    words.forEach(w => { const ww = X.measureText(w).width, cs = K.clusters(w), hot = (o.hot || []).includes(w); let pre = '';
      cs.forEach(c => { const xr = rr - X.measureText(pre).width, cw = X.measureText(c).width; pre += c; const k = (v - o.t - n * (o.step || .075)) / .42; n++; if (k <= 0) return;
        const e = K.back(k), sc = K.lerp(.72, 1, e); X.save(); X.globalAlpha *= K.sm(k * 2.2); X.translate(xr - cw / 2, o.y - size * .3 - (1 - e) * size * .22); X.scale(sc, sc);
        X.fillStyle = hot ? K.mix(hk) : (o.color || K.INKC); X.fillText(c, cw / 2, size * .3); X.restore(); });
      rr -= ww + sp; });
    X.restore(); return; }
  const d = o.d || Math.max(.45, Math.min(1.1, tot / 700)), p = (v - o.t) / d;
  const draw = () => K.heb(o.s, cx, o.y, size, v, { hot: o.hot || [], hotAt: o.hotAt ?? o.t + d * .8, hotOff: o.hotOff, hotLetter: o.hotLetter, color: o.color });
  if (p >= 1) return draw();
  const pad = 60, bw = Math.ceil(tot + pad * 2), bh = Math.ceil(size * 2), c = off('hebw', K.W, K.H), x = c.getContext('2d'), soft = 70;
  x.save(); x.clearRect(x0 - pad, o.y - size * 1.3, bw, bh); const keep = K.X; K.X = x; try { draw(); } finally { K.X = keep; }
  const edge = x1 + pad - K.eio(p) * (tot + pad + soft), g = x.createLinearGradient(edge, 0, edge + soft, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,1)');
  x.globalCompositeOperation = 'destination-in'; x.fillStyle = g; x.fillRect(x0 - pad, o.y - size * 1.3, bw, bh); x.restore();
  X.drawImage(c, x0 - pad, o.y - size * 1.3, bw, bh, x0 - pad, o.y - size * 1.3, bw, bh);
};

// ---------- the tower ----------
const rnd = (i, k) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };
const BR = (() => { const tiers = [12, 10, 8, 6, 4, 3], rowsT = [6, 6, 6, 5, 5, 5], bw = 54, bh = 26, out = []; let row = 0;
  tiers.forEach((n, ti) => { for (let r = 0; r < rowsT[ti]; r++, row++) { const W = n * bw, odd = row % 2; let x = -W / 2;
    const ws = odd ? [bw / 2, ...Array(n - 1).fill(bw), bw / 2] : Array(n).fill(bw); ws.forEach(w => { out.push({ x, w, row, i: out.length }); x += w; }); } });
  return { list: out, bw, bh, rows: row }; })();
K.towerTop = (p, base = 1500) => base - (BR.list[Math.min(BR.list.length - 1, Math.floor(p * BR.list.length))].row + 1) * BR.bh;
K.TOWER = (v, o) => {
  const X = K.X, base = o.base ?? 1500, sc = o.scale || 1, n = BR.list.length, k = o.p != null ? 0 : K.cl((v - o.t0) / Math.max(.01, o.t1 - o.t0)), placed = (o.p ?? (o.p0 + (o.p1 - o.p0) * k)) * n, { bw, bh } = BR;
  
  X.save(); X.translate(540, base); X.scale(sc, sc); X.translate(-540, -base); X.strokeStyle = K.INK(.6); X.lineWidth = 3; X.lineCap = 'round'; X.beginPath(); X.moveTo(100, base + 2); X.lineTo(980, base + 2); X.stroke();   // ground
  if (o.sky && v >= o.sky.t) { const a = K.sm((v - o.sky.t) / 1.2), top = base - BR.rows * bh; X.strokeStyle = K.INK(.5 * a); X.lineWidth = 4;   // cloud lines the top reaches
    [[-330, 20, 300], [60, 60, 280], [-160, 104, 220]].forEach(([dx, dy, w], q) => { const sh = ((v - o.sky.t) * 15) * (q % 2 ? -1 : 1); X.beginPath(); X.moveTo(540 + dx + sh, top + dy); X.bezierCurveTo(540 + dx + w * .3 + sh, top + dy - 16, 540 + dx + w * .6 + sh, top + dy + 12, 540 + dx + w + sh, top + dy - 4); X.stroke(); }); }
  const brick = (x, y, w, a) => { X.globalAlpha = a; X.fillStyle = 'rgba(244,234,208,.55)'; X.strokeStyle = K.INK(.88); X.lineWidth = 3; X.lineJoin = 'round'; X.beginPath(); X.rect(x, y, w, bh); X.fill(); X.stroke(); };
  BR.list.forEach(b => { let f = placed - b.i; if (f <= 0) return; f += o.settle || 0; /* when the building stops, the bricks already thrown still land */ const e = K.eo(Math.min(1, f / 2.4)); brick(540 + b.x, base - (b.row + 1) * bh - (1 - K.back(Math.min(1, f / 3.2))) * 70, b.w, Math.min(1, f / 1.4)); });
  if (o.city && v >= o.city.t) [-1, 1].forEach(sd => { for (let r = 0; r < 3; r++) for (let i = 0; i < 2; i++) { const q = r * 2 + i, f = (v - o.city.t) / .09 - q; if (f <= 0) continue; const e = K.eo(Math.min(1, f / 2.4));   // "a city": low houses
    brick(540 + sd * 386 + (i - 1) * 46 + (r % 2 ? 0 : 0), base - (r + 1) * bh - (1 - e) * 12, 46, Math.min(1, f / 1.2)); } });
  if (o.hang && v >= o.hang.t) { const b = BR.list[Math.min(n - 1, Math.ceil(placed))], fall = o.hang.drop != null ? K.eio((v - o.hang.drop) / .45) : 0, sw = fall ? 0 : Math.sin((v - o.hang.t) * 1.7) * .05;   // the brick that does not land
    if (fall < 1) { X.globalAlpha = K.sm((v - o.hang.t) / .25); X.translate(540 + b.x + b.w / 2, base - (b.row + 1) * bh + bh / 2 - 64 * (1 - fall)); X.rotate((-.17 + sw) * (1 - fall)); X.fillStyle = 'rgba(244,234,208,.6)'; X.strokeStyle = K.HOT; X.lineWidth = 3.5;
      X.beginPath(); X.rect(-b.w / 2, -bh / 2, b.w, bh); X.fill(); X.stroke(); } }
  X.restore();
};

// ---------- the tower built of the word נבנה ("let us build") ----------
// KIT.WTOWER(v,{p,base?,size?,hang?:{t,drop?},red?:{t,t1},wave?:{t},sky?:{t},city?:{t}}): a stepped tower whose bricks are the word נבנה,
//   laid course by course (each word drops 26 px and settles). p = share of words placed. hang: from t, the next word stays half-written (two letters)
//   until drop; red: from t to t1, the נ in the third place of the top word turns red inside a small glowing ring (the letter that will change);
//   wave: a red light runs up the courses (every brick is "let us build"); sky: cloud strokes the top reaches; city: low word-houses either side.
const WT = (() => { const tiers = [6, 5, 4, 3, 2, 1], per = [2, 2, 2, 2, 2, 2], out = []; let row = 0;
  tiers.forEach((n, ti) => { for (let r = 0; r < per[ti]; r++, row++) { const odd = row % 2, m = Math.max(1, n - (odd ? 1 : 0));
    for (let i = 0; i < m; i++) out.push({ k: (i - (m - 1) / 2), row, i: out.length, ti }); } });
  return { list: out, rows: row }; })();
K.WTOWER = (v, o) => {
  const X = K.X, base = o.base ?? 1500, fs = o.size || 62, cw = fs * 2.08, ch = fs * 1.14, n = WT.list.length, placed = o.p * n;
  X.save(); X.font = K.font(fs, { face: K.F.g }); X.direction = 'rtl'; X.textBaseline = 'alphabetic';
  const L = ['נ', 'ב', 'נ', 'ה'], lw = L.map(c => X.measureText(c).width), W = lw.reduce((a, b) => a + b, 0);
  const word = (cx, by, cnt, alpha, col3, wv) => { let r = cx + W / 2; for (let j = 0; j < cnt; j++) { X.globalAlpha = alpha; const c = j === 2 && col3 ? col3 : (wv > 0 ? K.mix(wv * .75) : K.INKC);
      X.fillStyle = c; X.textAlign = 'right'; X.fillText(L[j], r, by); r -= lw[j]; } };
  X.strokeStyle = K.INK(.55); X.lineWidth = 3; X.lineCap = 'round'; X.beginPath(); X.moveTo(130, base + 16); X.lineTo(950, base + 16); X.stroke();
  if (o.sky && v >= o.sky.t) { const a = K.sm((v - o.sky.t) / 1.2), top = base - WT.rows * ch; X.strokeStyle = K.INK(.45 * a); X.lineWidth = 4;
    [[-340, 6, 290], [70, 44, 270], [-170, 86, 230]].forEach(([dx, dy, w], q) => { const sh = ((v - o.sky.t) * 14) * (q % 2 ? -1 : 1); X.beginPath(); X.moveTo(540 + dx + sh, top + dy); X.bezierCurveTo(540 + dx + w * .3 + sh, top + dy - 14, 540 + dx + w * .6 + sh, top + dy + 12, 540 + dx + w + sh, top + dy - 4); X.stroke(); }); }
  if (o.city && v >= o.city.t) [-1, 1].forEach(sd => { for (let r = 0; r < 2; r++) { const f = (v - o.city.t) / .18 - r - (sd > 0 ? .5 : 0); if (f <= 0) continue; const e = K.eo(Math.min(1, f));
    word(540 + sd * 400, base - r * ch - (1 - e) * 26, 4, Math.min(1, f), null, 0); } });
  let top = null;
  WT.list.forEach(b => { const f = placed - b.i; if (f <= 0) return; const e = K.back(Math.min(1, f / 2.2)), cx = 540 + b.k * cw, by = base - b.row * ch - (1 - e) * 40;
    const wv = o.wave ? Math.sin(Math.PI * K.cl((v - o.wave.t - (WT.rows - b.row) * .035) / .55)) : 0;
    const isTop = f >= 1 && Math.floor(placed) - 1 === b.i, red = o.red && isTop && v >= o.red.t && v < (o.red.t1 ?? 1e9);
    word(cx, by, 4, Math.min(1, f / 1.4), red ? K.mix(K.sm((v - o.red.t) / .4)) : null, wv); if (isTop) top = { cx, by }; });
  if (o.hang && v >= o.hang.t && (o.hang.drop == null || v < o.hang.drop)) { const b = WT.list[Math.min(n - 1, Math.floor(placed))], cx = 540 + b.k * cw, by = base - b.row * ch;   // a word left half-written
    word(cx, by, 2, 1, null, 0); X.globalAlpha = .25 + .15 * Math.sin((v - o.hang.t) * 4); X.fillStyle = K.INKC; X.textAlign = 'right'; X.fillText('נ', cx + W / 2 - lw[0] - lw[1], by); }
  X.restore();
  if (o.red && top && v >= o.red.t && v < (o.red.t1 ?? 1e9)) { const x = top.cx + W / 2 - lw[0] - lw[1] - lw[2] / 2; K.RING(x, top.by - fs * .3, 27, 34, v, o.red.t + .1, { d: .5, glow: 1.2, solid: true, lw: 4 }); }
};
})();
