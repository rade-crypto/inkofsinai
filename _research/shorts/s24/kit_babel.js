// ---------- BABEL (Shorts, parchment): photoreal plates, the stacked words, and the נ that comes down and becomes ל (new, s24 "Let us build / let us confuse") ----------
// KIT.PLATE(v,{img,label,t0,t1,inAt?,y0?,w?,h?,push?,drift?}): a fal still (img/<img>.png) set into the page: graded warm (sepia .38, saturation .78), paper multiplied in,
//   edges feathered into the parchment (no frame line). A slow, even push-in runs from t0 to t1, so one still continues across several steps without a jump.
//   inAt: the plate inks on (first step only). With no file yet, a labelled dark placeholder of the same size is drawn, so timing can be checked before the stills exist.
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
K.IMG = K.IMG || {};
K.PLATE = (v, o) => {
  const X = K.X, w = o.w || 880, h = o.h || 700, x0 = (o.x ?? 540) - w / 2, y0 = o.y0 ?? 300, c = off('plate', w, h), x = c.getContext('2d');
  K.inSafe(x0, y0, x0 + w, y0 + h, 'PLATE ' + o.img);
  const k = K.cl((v - o.t0) / Math.max(.1, o.t1 - o.t0)), push = o.push || [1.0, 1.075], sc = K.lerp(push[0], push[1], k), dr = o.drift || [0, -10];
  x.save(); x.clearRect(0, 0, w, h); const im = K.IMG[o.img];
  if (im && im.naturalWidth) {
    const s = Math.max(w / im.naturalWidth, h / im.naturalHeight) * sc, iw = im.naturalWidth * s, ih = im.naturalHeight * s, fx = o.focus?.[0] ?? .5, fy = o.focus?.[1] ?? .5;
    x.filter = 'sepia(.38) saturate(.78) contrast(1.06)';
    x.drawImage(im, (w - iw) * fx + dr[0] * k, (h - ih) * fy + dr[1] * k, iw, ih); x.filter = 'none';
  } else {   // placeholder until the still exists
    const g = x.createRadialGradient(w / 2, h * .45, 40, w / 2, h / 2, w * .7); g.addColorStop(0, '#5a4329'); g.addColorStop(1, '#17110a'); x.fillStyle = g; x.fillRect(0, 0, w, h);
    x.fillStyle = 'rgba(236,224,196,.85)'; x.textAlign = 'center'; x.font = K.font(40, {}); x.letterSpacing = '6px'; x.fillText('STILL ' + o.img, w / 2, h / 2 - 14);
    x.font = K.font(34, { italic: true }); x.letterSpacing = '0px'; x.fillText(o.label || '', w / 2, h / 2 + 40);
  }
  x.globalCompositeOperation = 'multiply'; x.globalAlpha = .45; x.drawImage(K.PAPER, x0, y0, w, h, 0, 0, w, h); x.globalAlpha = 1;   // the paper's grain shows through
  const vg = x.createRadialGradient(w / 2, h / 2, h * .35, w / 2, h / 2, w * .72); vg.addColorStop(0, 'rgba(255,255,255,1)'); vg.addColorStop(1, 'rgba(176,150,112,1)'); x.fillStyle = vg; x.fillRect(0, 0, w, h);
  x.globalCompositeOperation = 'destination-in'; x.drawImage(mask(w, h), 0, 0); x.restore();
  const ia = o.inAt == null ? 1 : K.sm((v - o.inAt) / .7), is = o.inAt == null ? 1 : K.lerp(1.035, 1, K.eo((v - o.inAt) / 1.1));
  if (ia <= 0) return; X.save(); X.globalAlpha *= ia; X.translate(x0 + w / 2, y0 + h / 2); X.scale(is, is); X.drawImage(c, -w / 2, -h / 2); X.restore();
};

// a dashed stadium / circle drawn on progressively (p 0..1), with a warm glow behind (a)
K.ringPath = (cx, cy, rx, ry, p) => { const X = K.X, n = 120, m = Math.max(2, Math.round(n * p)); X.beginPath();
  for (let i = 0; i <= m; i++) { const t = -Math.PI / 2 + (i / n) * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
    const px = cx + rx * Math.sign(c) * Math.pow(Math.abs(c), ry > rx * 1.4 ? .55 : 1), py = cy + ry * Math.sign(s) * Math.pow(Math.abs(s), ry > rx * 1.4 ? .55 : 1);
    i ? X.lineTo(px, py) : X.moveTo(px, py); } };
K.RING = (cx, cy, rx, ry, v, t, o = {}) => {
  if (v < t) return; const X = K.X, p = K.eo((v - t) / (o.d || .8)), ga = (o.glow ?? 1) * K.sm((v - t) / .9);
  K.glow(cx, cy, rx * 1.9, ry * 1.6, ga * .9);
  X.save(); X.strokeStyle = K.HOT; X.lineWidth = o.lw || 4; X.lineCap = 'round'; X.setLineDash(o.solid ? [] : [12, 10]); K.ringPath(cx, cy, rx, ry, p); X.stroke(); X.restore();
};

K.STACK = (v, a, b, o) => {
  const X = K.X, size = o.size || 230, cw = o.cw || 212, rows = o.rows, colX = i => 540 + (1.5 - i) * cw, n = rows[0].cl.length;
  K.inSafe(540 - cw * n / 2, rows[0].y - size * .9, 540 + cw * n / 2, rows[rows.length - 1].y + size * .3, 'STACK');
  const strip = o.strip ? K.sm((v - o.strip.t) / (o.strip.d || .9)) : (o.bare ? 1 : 0), dim = o.dim ? K.sm((v - o.dim.t) / .8) : 0;
  const colHot = o.col ? K.sm((v - o.col.t - .3) / .6) : 0, mk = o.morph ? (v - o.morph.t) / (o.morph.d || 1.5) : -1;
  if (o.col) { const yt = rows[0].y - size * .98, yb = rows[rows.length - 1].y + size * .24; K.RING(colX(o.col.i), (yt + yb) / 2, cw * .48, (yb - yt) / 2, v, o.col.t, { d: .9 }); }
  if (o.gap) { const r = rows[o.gap.row], cy = r.y - size * .36; K.RING(colX(o.gap.i), cy, size * .52, size * .62, v, o.gap.t + .25, { d: .8, glow: mk >= 1 ? 1.5 : .8, solid: mk >= 1 }); }
  rows.forEach((r, ri) => r.cl.forEach((c, i) => {
    const t = r.t + i * .07; if (v < t) return;
    let al = 1; if (dim && !(o.dim.keep === i)) al *= 1 - .66 * dim;
    if (o.gap && ri === o.gap.row && i === o.gap.i) { al *= 1 - K.sm((v - o.gap.t) / .55); if (al <= 0) return; }
    let hk = 0; (o.hot || []).forEach(h => { if (h.row === ri) hk = Math.max(hk, K.on(v, h.t0, .55) * (1 - K.on(v, h.t1 ?? 1e9, .45))); });
    if (o.col && i === o.col.i) hk = Math.max(hk, colHot);
    if (o.red && o.red.row === ri && o.red.i === i) hk = 1;
    if (hk > .02 && (!o.dim || o.dim.keep === i || dim < 1)) K.glow(colX(i), r.y - size * .36, cw * .62, size * .6, hk * .45 * al);
    K.ink(v, t, () => { X.font = K.font(size, { face: K.F.g }); X.textAlign = 'center'; X.direction = 'rtl'; X.textBaseline = 'alphabetic'; X.fillStyle = K.mix(hk);
      X.globalAlpha *= al; X.fillText(c[0], colX(i), r.y); if (strip < 1 && c.length > 1) { X.globalAlpha *= 1 - strip; X.fillText(c, colX(i), r.y); } }, { rise: 10 });
  }));
  (o.gloss || []).forEach(g => { if (v < g.t1 || g.t1 == null) K.ink(v, g.t, () => K.rich(g.s, 540, rows[g.row].y + 112, 66, v, { italic: true, hotAt: g.t + .3 })); });
  if (mk >= 0) {   // the letter comes down and changes
    const fr = K.MORPH_DATA.frames, i = o.morph.i, p = K.cl(mk), pe = K.eio(p), y = K.lerp(rows[0].y, rows[1].y, pe), x = colX(i);
    const sk = K.eio((p - .18) / .62), path = new Path2D(fr[Math.round(sk * (fr.length - 1))]), ck = K.sm((p - .25) / .5), sc = (size / 1000) * (1 + .07 * Math.sin(Math.PI * p));
    K.glow(x, y - size * .4, size * .7, size * .8, .35 + .45 * Math.sin(Math.PI * Math.min(1, p)) + (p >= 1 ? .25 : 0));
    X.save(); X.translate(x, y); X.scale(sc, sc); X.fillStyle = K.mix(ck); X.fill(path); X.restore();
  }
};
})();
