// ---------- STARS (Shorts, parchment): a field of stars drawn as ink dots, counted, named, one of them yours (new, s23 "He counts the stars") ----------
// KIT.STARS(v,a,b,{ at?, n?=190, y0?=900, y1?=1400, appear?:{t,d}, count?:{t}, names?:{t,d}, ring?:{t}, lit?:{t}, stage? })
// A fixed, hand-scattered field of `n` ink dots (a few larger), inside x 130–950 and y0–y1. appear: each dot inks on at its own moment between t and t+d.
// count: the number of dots so far is drawn big above the field (>= 66 px) and rises as they land. names: from t, over d, every star gets a short ink stroke
// under it (its name), from the middle outwards. ring: from t one chosen star turns scarlet and a fine ring draws round it (the one that is you), with a warm
// glow behind it; lit: from t every star darkens a little. Pure functions of absolute time: pass the same options in the next step to keep the field up.
(() => {
const K = KIT, X = K.X;
const rnd = (i, k) => { const s = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return s - Math.floor(s); };
K.STARS = (v, a, b, o = {}) => {
  if (!K.live(v, a, b)) return; const at = o.at ?? a, n = o.n || 190, y0 = o.y0 ?? 900, y1 = o.y1 ?? 1400, x0 = 130, x1 = 950, ap = o.appear || { t: at, d: 2.4 };
  if (o.stage !== false) K.STAGE(v, at, { cx: 540, cy: (y0 + y1) / 2 });
  const P = []; for (let i = 0; i < n; i++) P.push({ x: x0 + rnd(i, 1) * (x1 - x0), y: y0 + rnd(i, 2) * (y1 - y0), r: 4.2 + rnd(i, 3) * 4 + (rnd(i, 5) > .93 ? 5 : 0), t: ap.t + rnd(i, 4) * ap.d, w: 10 + rnd(i, 6) * 14 });
  const yc = (y0 + y1) / 2, byMid = P.map((p, i) => [Math.hypot(p.x - 540, p.y - yc), i]).sort((p, q) => p[0] - q[0]), rank = []; byMid.forEach(([, i], k) => rank[i] = k / n);
  K.inSafe(x0 - 10, y0 - 10, x1 + 10, y1 + 10, 'STARS');
  const me = { x: o.me?.x ?? 400, y: o.me?.y ?? yc + 20 };
  if (o.ring && v >= o.ring.t) { const k = K.sm((v - o.ring.t) / .8), g = X.createRadialGradient(me.x, me.y, 4, me.x, me.y, 190); g.addColorStop(0, `rgba(236,178,84,${.5 * k})`); g.addColorStop(1, 'rgba(236,178,84,0)'); X.fillStyle = g; X.fillRect(me.x - 200, me.y - 200, 400, 400); }
  const dark = o.lit && v >= o.lit.t ? .2 * K.sm((v - o.lit.t) / .8) : 0; let landed = 0;
  P.forEach(p => { if (v < p.t) return; landed++; const al = K.on(v, p.t); X.save(); X.fillStyle = K.INK(Math.min(1, (.42 + dark) * al)); X.beginPath(); X.arc(p.x, p.y, p.r, 0, 6.2832); X.fill(); X.restore();
    if (o.names && v >= o.names.t + rank[P.indexOf(p)] * (o.names.d || 2.2)) { const tn = o.names.t + rank[P.indexOf(p)] * (o.names.d || 2.2); X.save(); X.globalAlpha = K.on(v, tn) * .8; X.strokeStyle = K.INK(.55); X.lineWidth = 2.8; X.lineCap = 'round'; X.beginPath(); X.moveTo(p.x - p.w / 2, p.y + p.r + 7); X.lineTo(p.x + p.w / 2, p.y + p.r + 7); X.stroke(); X.restore(); } });
  { const t = ap.t, al = v >= t ? 1 : 0; if (al) { X.save(); X.fillStyle = o.ring && v >= o.ring.t ? K.HOT : K.INK(.55 * K.on(v, t + ap.d * .5)); X.beginPath(); X.arc(me.x, me.y, 8, 0, 6.2832); X.fill(); X.restore(); } }
  if (o.ring && v >= o.ring.t) { const p = K.eo((v - o.ring.t) / .7); X.save(); X.strokeStyle = K.HOT; X.lineWidth = 3.5; X.setLineDash([9, 7]); X.lineCap = 'round'; X.beginPath(); X.arc(me.x, me.y, 30, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); X.stroke(); X.restore(); }
  if (o.count) { const s = String(landed), sz = 120; X.save(); X.font = K.font(sz, { weight: 500 }); X.fontVariantNumeric = 'lining-nums'; X.fillStyle = K.INKC; X.textAlign = 'center'; X.textBaseline = 'alphabetic'; X.globalAlpha = v >= o.count.t ? 1 : 0; X.fillText(s, 540, y0 - 60); X.restore(); }
};
})();
