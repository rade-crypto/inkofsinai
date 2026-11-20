// ---------- ACROSTIC (Shorts, parchment): a psalm written as an alphabet, one dot per verse, 22 columns of 8, a Hebrew letter over each column (new, s22 Psalm 119) ----------
// KIT.ACROSTIC(v,a,b,{ at?, dotsAt?, dotStep?=.016, lettersAt?, letterStep?=.05, sweep?:{t, step?=.16}, focus?:{ch, t}, cy?=1050, stage? })
// Two panels of 11 columns (א…כ above, ל…ת below, read right to left like KIT.ALEFBET). Each column: its letter (STaM, 96 px) over 8 ink dots,
// one dot per verse. Dots land one after another from dotsAt (each in its final place, nothing scales), letters from lettersAt.
// sweep: each column in turn goes full ink for a moment, left behind it a warm flash. focus: from t every other column fades to a ghost and
// column `ch` turns scarlet with a warm glow behind it. Everything is a pure function of absolute time: pass the same options in the next step.
// Text lines: the 22 letters count as the two rows of letters (<= 2); the dots are a picture.
(() => {
const K = KIT, X = K.X, AB = 'אבגדהוזחטיכלמנסעפצקרשת';
K.ACROSTIC = (v, a, b, o = {}) => {
  if (!K.live(v, a, b)) return; const at = o.at ?? a, S = K.SAFE, sp = 80, cy = o.cy ?? 1050; if (o.stage !== false) K.STAGE(v, at, { cx: S.cx, cy: cy - 200 });
  const d0 = o.dotsAt ?? at, ds = o.dotStep ?? .016, l0 = o.lettersAt ?? 1e9, ls = o.letterStep ?? .05, pitch = 26, ph = 96 + 20 + 7 * pitch + 20, gap = 54, top = cy - (2 * ph + gap) / 2;
  K.inSafe(S.cx - 5 * sp - 50, top, S.cx + 5 * sp + 50, top + 2 * ph + gap, 'ACROSTIC');
  const colX = i => S.cx + (5 - (i % 11)) * sp, panelY = i => top + Math.floor(i / 11) * (ph + gap);
  const fo = o.focus && v >= o.focus.t ? K.sm((v - o.focus.t) / .6) : 0, fi = o.focus ? AB.indexOf(o.focus.ch) : -1;
  if (fo > 0) { const x = colX(fi), y = panelY(fi) + 150, g = X.createRadialGradient(x, y, 6, x, y, 250); g.addColorStop(0, `rgba(236,178,84,${.5 * fo})`); g.addColorStop(1, 'rgba(236,178,84,0)'); X.fillStyle = g; X.fillRect(x - 260, y - 260, 520, 520); }
  for (let i = 0; i < 22; i++) {
    const x = colX(i), y0 = panelY(i); let lit = 0, hot = false, base = .4;
    if (o.sweep) { const t = o.sweep.t + i * (o.sweep.step ?? .16); if (v >= t && v < t + .55) lit = 1 - K.sm((v - t) / .55); }
    if (fo > 0) { if (i === fi) hot = true; else base = .4 * (1 - .72 * fo); }
    if (lit > 0) { const g = X.createRadialGradient(x, y0 + 150, 4, x, y0 + 150, 120); g.addColorStop(0, `rgba(236,178,84,${.42 * lit})`); g.addColorStop(1, 'rgba(236,178,84,0)'); X.fillStyle = g; X.fillRect(x - 130, y0 + 20, 260, 260); }
    for (let j = 0; j < 8; j++) { const t = d0 + (i * 8 + j) * ds; if (v < t) break; const al = K.on(v, t), yy = y0 + 96 + 24 + j * pitch;
      X.save(); X.fillStyle = hot ? K.HOT : K.INK(Math.min(1, (base + .5 * lit) * al)); X.globalAlpha = hot ? al : 1; X.beginPath(); X.arc(x, yy, 9.5, 0, 6.2832); X.fill(); X.restore(); }
    const tl = l0 + i * ls; if (v >= tl) { X.save(); X.globalAlpha *= K.on(v, tl) * (fo > 0 && !hot ? 1 - .72 * fo : 1); K.heb(AB[i], x, y0 + 70, 96, v, hot ? { hot: [AB[i]], hotAt: o.focus.t } : {}); X.restore(); }
  }
};
})();
