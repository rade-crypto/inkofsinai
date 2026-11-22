// kit_beats.js: the posted reels' graphic vocabulary, one new graphic per beat (from the contact sheets of s19, s20, s23 and the posted Shorts):
// crowned STaM lettering (StamAshkenazCLM, vowel points laid in from Frank Ruhl), verse banners, two verses linked by a drawn arrow,
// a split comparison panel, a letter-by-letter grid, one giant crowned letter that morphs (true STaM outlines), the ring on the detail named.
(() => {
const K = KIT;
K.F.s = "'Stam'";
const PF = {};
function pointsFR(c, size, col) {   // the vowel points of cluster c alone (Frank Ruhl), to lay over a STaM letter
  const key = c + size + col; if (PF[key]) return PF[key];
  const cv = document.createElement('canvas'); cv.width = Math.ceil(size * 1.4); cv.height = Math.ceil(size * 1.7); const x = cv.getContext('2d');
  x.font = K.font(size, { face: K.F.g }); x.textAlign = 'center'; x.direction = 'rtl'; x.textBaseline = 'alphabetic'; x.fillStyle = col;
  const bx = cv.width / 2, by = cv.height * .62; x.fillText(c, bx, by); x.globalCompositeOperation = 'destination-out'; x.lineWidth = Math.max(3, size * .03); x.strokeStyle = '#000';
  const base = c.replace(/[֑-ׇ]/g, ''); x.fillText(base, bx, by); x.strokeText(base, bx, by); return PF[key] = cv; }
K.SP = {};
// STAM: a Hebrew phrase in crowned STaM letters, centred on x (or right-aligned at o.right). Letters land one by one, right to left (drop 0.22 size, small overshoot).
// o: s, x?, right?, y, size, t, step?, hot?:[words], hotAt?, hotOff?, red?:{word, idx, at}, key?, alpha?, points? (default true)
K.STAM = (v, o) => {
  const X = K.X, size = o.size, words = o.s.split(' '), sp = size * .3, fnt = `${size}px ${K.F.s}`;
  X.save(); X.font = fnt; const W = words.map(w => K.clusters(w).map(c => X.measureText(c.replace(/[֑-ׇ]/g, '')).width)); X.restore();
  const tot = W.reduce((a, ws) => a + ws.reduce((p, q) => p + q, 0), 0) + sp * (words.length - 1), right = o.right ?? (o.x ?? 540) + tot / 2;
  K.inSafe(right - tot, o.y - size * 1.05, right, o.y + size * .3, 'stam ' + o.s);
  let r = right, n = 0; const step = o.step ?? .07;
  words.forEach((w, wi) => { const cs = K.clusters(w), hot = (o.hot || []).includes(w);
    const hk = hot ? K.sm((v - (o.hotAt ?? o.t + .5)) / .5) * (o.hotOff == null ? 1 : 1 - K.sm((v - o.hotOff) / .45)) : 0;
    cs.forEach((c, ci) => { const cw = W[wi][ci], cx = r - cw / 2; r -= cw; K.SP[(o.key || '') + w + ci] = { x: cx, y: o.y, w: cw, size };
      const k = (v - o.t - n++ * step) / .45; if (k <= 0) return;
      let col = hk; if (o.red && o.red.word === w && o.red.idx === ci) col = Math.max(col, K.sm((v - o.red.at) / .45));
      if (o.skip && o.skip.word === w && o.skip.idx === ci && v >= o.skip.t) return;
      const e = K.back(Math.min(1, k)), sc = K.lerp(.75, 1, e), dy = -(1 - e) * size * .22, fill = K.mix(col);
      X.save(); X.globalAlpha *= K.sm(k * 2.2) * (o.alpha ?? 1); X.translate(cx, o.y - size * .35 + dy); X.scale(sc, sc); X.translate(-cx, -(o.y - size * .35));
      X.font = fnt; X.textAlign = 'center'; X.direction = 'rtl'; X.textBaseline = 'alphabetic'; X.fillStyle = fill; X.fillText(c.replace(/[֑-ׇ]/g, ''), cx, o.y);
      if (o.points !== false && c.length > 1) { const pc = pointsFR(c, size * .78, fill); X.drawImage(pc, cx - pc.width / 2, o.y - pc.height * .62 + size * .04); }
      X.restore(); });
    r -= sp; });
  return { right, left: right - tot, w: tot };
};
// ARROW: a curved red arrow drawn on from (x0,y0) to (x1,y1), bending out by `bend` px, with a small head
K.ARROW = (x0, y0, x1, y1, bend, p) => {
  if (p <= 0) return; const X = K.X, mx = (x0 + x1) / 2 + bend, my = (y0 + y1) / 2, n = 40, m = Math.max(1, Math.round(n * Math.min(1, p)));
  const pt = u => [(1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1];
  X.save(); X.strokeStyle = K.HOT; X.lineWidth = 4; X.lineCap = 'round'; X.lineJoin = 'round'; X.beginPath(); for (let i = 0; i <= m; i++) { const [x, y] = pt(i / n); i ? X.lineTo(x, y) : X.moveTo(x, y); } X.stroke();
  if (p >= 1) { const [ax, ay] = pt(1), [bx, by] = pt(.93), a = Math.atan2(ay - by, ax - bx); X.beginPath(); X.moveTo(ax, ay); X.lineTo(ax - 22 * Math.cos(a - .45), ay - 22 * Math.sin(a - .45)); X.moveTo(ax, ay); X.lineTo(ax - 22 * Math.cos(a + .45), ay - 22 * Math.sin(a + .45)); X.stroke(); }
  X.restore();
};
// CITY: low flat-roofed houses in ink line either side of the tower base, rising one by one from t
K.CITY = (v, t, base) => { const X = K.X, H = [[-425, 40, 80], [-378, 46, 120], [-325, 50, 90], [325, 50, 100], [378, 46, 75], [425, 40, 115]];
  X.save(); X.strokeStyle = K.INK(.85); X.lineWidth = 3; X.lineJoin = 'round';
  H.forEach(([dx, w, h], i) => { const k = K.eo((v - t - i * .12) / .45); if (k <= 0) return; const x = 540 + dx - w / 2, hh = h * k;
    X.fillStyle = 'rgba(250,242,222,.6)'; X.beginPath(); X.rect(x, base - hh, w, hh); X.fill(); X.stroke();
    if (k > .8) { X.beginPath(); X.rect(x + w / 2 - 9, base - 30, 18, 30); X.stroke(); X.beginPath(); X.moveTo(x - 4, base - hh); X.lineTo(x + w + 4, base - hh); X.stroke(); } });
  X.restore(); };
K.LABEL = (s, x, y, v, t, o = {}) => K.ink(v, t, () => K.rich(s, x, y, o.size || 46, v, { caps: true, ls: 5, color: K.INK(.62), plain: true }), { blur: 3 });
K.RULE = (x0, y0, x1, y1, p, o = {}) => { if (p <= 0) return; const X = K.X; X.save(); X.strokeStyle = o.col || K.INK(.45); X.lineWidth = o.lw || 3; X.lineCap = 'round'; X.beginPath(); X.moveTo(x0, y0); X.lineTo(x0 + (x1 - x0) * Math.min(1, p), y0 + (y1 - y0) * Math.min(1, p)); X.stroke(); X.restore(); };
// GIANT: one crowned letter, very large, that morphs (true STaM outlines) from נ into ל between t and t+d, ink to red; ring after it lands
K.GIANT = (v, o) => {
  const X = K.X, fr = K.MORPH_STAM.frames, k = K.eio((v - o.t) / (o.d || 1.2)), path = new Path2D(fr[Math.round(k * (fr.length - 1))]), sc = o.size / 1000;
  const land = (v - o.t - (o.d || 1.2)), pulse = land > 0 ? 1 + .05 * Math.sin(Math.PI * K.cl(land / .35)) : 1, a0 = K.sm((v - o.in) / .35);
  if (land > 0) K.RING(o.x, o.y - o.size * .54, o.size * .56, o.size * .7, v, o.t + (o.d || 1.2) + .05, { d: .6, glow: 1.4, solid: true, lw: 5 });
  X.save(); X.globalAlpha *= a0; X.translate(o.x, o.y - o.size * .4); X.scale(pulse * K.lerp(.85, 1, K.back((v - o.in) / .5)), pulse * K.lerp(.85, 1, K.back((v - o.in) / .5))); X.translate(0, o.size * .4);
  X.scale(sc, sc); X.fillStyle = K.mix(K.sm((v - o.t - .2) / .8)); X.fill(path); X.restore();
};
})();
