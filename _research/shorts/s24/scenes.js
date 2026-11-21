// Short s24 "God changes one letter" (Babel, Gen 11): parchment Shorts kit, engine-only (no photo stills). Nov 20, 2026. v2.
// Script: the approved one with a new hook (hooks.md: famous subject first, a contrast, the loop left open). One step per line; the on-screen text is the
// voiceover word for word, landing word by word, and Hebrew is written on when it is spoken.
// WLC: Gen 11:4 וַיֹּאמְרוּ הָבָה נִבְנֶה לָּנוּ עִיר וּמִגְדָּל וְרֹאשׁוֹ בַשָּׁמַיִם וְנַעֲשֶׂה לָּנוּ שֵׁם; Gen 11:7 (God speaking, per 11:6) הָבָה נֵרְדָה וְנָבְלָה שָׁם שְׂפָתָם;
// Gen 11:8 וַיַּחְדְּלוּ לִבְנֹת הָעִיר ("the building stops"); Gen 11:9 קָרָא שְׁמָהּ בָּבֶל, and that verse has the Divine Name, so its line is shown in English only.
// נִבְנֶה (root בנה) and נָבְלָה (root בלל) are different roots: the only claim on screen is that the written words differ by one letter, so the vowel points
// dissolve before "One letter changed" and the bare letters נבנה / נבלה stay.
// Pictures: (1) the tower laid brick by brick, which stops on "the building stops"; (2) the builders' line and God's line, the same word above itself;
// (3) the two words letter over letter, and the נ that comes down and becomes ל (true outline morph); (4) שֵׁם, then בָּבֶל with the same ל ringed.
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
// TIMING on the video clock: [step length, ...offsets from the step start where a later part of the line is spoken]. retime.py rewrites this block from vo_marks.txt.
const TM = /*TIMING*/{"HOOK": [3.0, 1.7], "HOOK2": [3.4, 1.7], "SAY": [3.0, 1.4], "COME": [2.2], "TOWER": [3.2, 1.4], "ANSWER": [3.8, 1.4, 2.6], "DOWN": [4.6, 0.9, 1.9, 3.0], "SIDE": [3.2], "BUILD": [2.4, 1.0], "CONFUSE": [2.6, 1.1], "CHANGED": [5.8, 1.6], "NAME": [2.8], "CITY": [4.6, 1.4], "END VERSE": [5.6, 1.9]}/*END*/;
let T = 0; const ST = {}; for (const k in TM) { ST[k] = T; T += TM[k][0]; } T = 0;
const EN = n => ST[n] + TM[n][0];
const P = (n, f) => { const d = n === 'LOGO' ? 3.25 : TM[n][0]; addP(n, d, f); T += d; };
const s = (n, i) => ST[n] + TM[n][i];   // absolute time of sub-line i of step n
const all = (...fs) => (v, a, b) => fs.forEach(f => f(v, a, b));
const STG = (cy = 900) => (v, a) => KIT.STAGE(v, a, { cy });
const CAP = (lines, o = {}) => v => KIT.WLINES(v, { top: 380, size: 78, lines, ...o });   // the spoken line: always at the same height
const HW = o => v => KIT.HEBW(v, o);
const REF = (str, y, t) => v => KIT.REF(str, y, v, t);
const lerp = KIT.lerp, cl = KIT.cl;

// ONE CENTRAL GRAPHIC, frame 1 to the payoff (the way the posted Shorts carry a bead chain or a slot): a drawn stepped tower, and on its top
// the builders' word נִבְנֶה with a ring already round one letter (the open question). The tower rises, stops, finishes into the sky; God's words
// come down from above onto the same word; the two words stack letter over letter on the tower; the ringed letter changes; the same ל ends in בָּבֶל.
const eio = KIT.eio, eo = KIT.eo, sm = KIT.sm;
const hw = (w, size) => { KIT.X.save(); KIT.X.font = KIT.font(size, { face: KIT.F.g }); const m = KIT.X.measureText(w).width; KIT.X.restore(); return m; };
const letterX = (word, idx, right, size) => { const c = KIT.clusters(word); return right - (hw(c.slice(0, idx).join(''), size) + hw(c.slice(0, idx + 1).join(''), size)) / 2; };
const stopT = s('HOOK2', 1) + .35;
const towerP = v => v < stopT ? lerp(.5, .62, cl(v / stopT)) : v < ST.COME ? .62 : v < ST.TOWER ? lerp(.62, .7, eio((v - ST.COME) / TM.COME[0])) : lerp(.7, 1, eio((v - ST.TOWER) / (TM.TOWER[0] - .6)));
const towerS = v => v < ST.SIDE ? 1 : lerp(1, .5, eio((v - ST.SIDE) / .9));
const TW = v => KIT.ETOWER(v, { p: towerP(v), scale: towerS(v), stop: { t: stopT, drop: ST.COME }, sky: { t: s('TOWER', 1) - .3 } });
// the builders' word on the tower's top
const BS = 150, SPc = 36, GS = 112, GY = 650; let LZ = null;   // widths are measured on first draw, once the fonts are in
const M = () => LZ || (LZ = (() => { const wN = hw('נִבְנֶה', BS), wH = hw('הָבָה', BS), GW = hw('הָבָה', GS) + hw('נֵרְדָה', GS) + hw('וְנָבְלָה', GS) + 2 * SPc, BW = hw('בָּבֶל', 200), BR = 540 + BW / 2;
  return { wN, wH, GW, GR: 540 + GW / 2, BW, BR, lxB: letterX('בָּבֶל', 2, BR, 200) }; })());
const bandY = v => KIT.etTop(towerP(v)) - 36;
const band = v => { const kj = eio((v - s('SAY', 1)) / .6), tot = M().wH + SPc + M().wN, kA = eio((v - s('ANSWER', 2) - .2) / .7);
  let rN = lerp(540 + M().wN / 2, 540 - tot / 2 + M().wN, kj), rH = 540 + tot / 2; const dx = kA * (M().GR - rH); return { rN: rN + dx, rH: rH + dx, y: bandY(v) }; };
const BAND = v => { const b = band(v), hotA = s('ANSWER', 2) + .45, off = s('DOWN', 3);
  const redL = v >= ST.HOOK2 + 1.0 && v < ST.SAY + .2;
  KIT.HEBW(v, { key: 'B', s: 'נִבְנֶה', right: b.rN, y: b.y, size: BS, t: -9, hotLetter: redL ? { word: 'נִבְנֶה', idx: 2, at: ST.HOOK2 + 1.0 } : null });
  if (v >= s('SAY', 1)) KIT.HEBW(v, { key: 'B', s: 'הָבָה', right: b.rH, y: b.y, size: BS, t: s('SAY', 1) + .15, hot: ['הָבָה'], hotAt: hotA, hotOff: off });
  if (v < s('ANSWER', 2)) { const lx = letterX('נִבְנֶה', 2, b.rN, BS); KIT.RING(lx, b.y - BS * .36, 50, 64, v, v < .01 ? -9 : -9, { d: .5, glow: redL ? 1.3 : .5, solid: redL, lw: redL ? 4 : 3 }); } };
// God's words come down from above, the first word exactly over the builders' הָבָה
const GOD = v => { const tm = s('ANSWER', 2), off = s('DOWN', 3); let r = M().GR;
  [['הָבָה', tm], ['נֵרְדָה', s('DOWN', 1)], ['וְנָבְלָה', s('DOWN', 3)]].forEach(([w, t], i) => { const y = GY - (1 - eo((v - t) / .6)) * 150;
    if (v >= t) KIT.HEBW(v, { key: 'G', s: w, right: r, y, size: GS, t, hot: i === 1 ? [] : [w], hotAt: t + .45, hotOff: i === 0 ? off : null, step: .06 }); r -= hw(w, GS) + SPc; });
  if (v >= tm + .5 && v < off + .4) { const X = KIT.X, k = eo((v - tm - .5) / .35), b = band(v), x = M().GR - hw('הָבָה', GS) / 2, y0 = GY + 26, y1 = b.y - BS * .82;
    X.save(); X.globalAlpha = 1 - sm((v - off) / .4); X.strokeStyle = KIT.HOT; X.lineWidth = 4; X.lineCap = 'round'; X.setLineDash([10, 12]); X.beginPath(); X.moveTo(x, y0); X.lineTo(x, y0 + (y1 - y0) * k); X.stroke(); X.restore(); } };

P('HOOK', all(STG(), TW, BAND, CAP([['The builders of Babel say,', 0, s('HOOK', 1)], ['“Let us *build*.”', s('HOOK', 1), EN('HOOK')]], { pre: 1 })));
P('HOOK2', all(STG(), TW, BAND, CAP([['God changes *one letter*,', ST.HOOK2, s('HOOK2', 1)], ['and the building *stops*.', s('HOOK2', 1), EN('HOOK2')]])));
P('SAY', all(STG(), TW, BAND, CAP([['In Hebrew, they say:', ST.SAY, s('SAY', 1)]])));
P('COME', all(STG(), TW, BAND, CAP([['“Come, let us *build*.”', ST.COME, EN('COME') - .5]], { italic: true, size: 84 }), REF('Genesis 11:4', 312, ST.COME + .8)));
P('TOWER', all(STG(), TW, BAND, CAP([['A city, and a tower', ST.TOWER, s('TOWER', 1)], ['with its top in the *sky*.', s('TOWER', 1), EN('TOWER') - .4]])));
P('ANSWER', all(STG(), TW, BAND, GOD, CAP([['Then God answers', ST.ANSWER, s('ANSWER', 1)], ['with their own *word*.', s('ANSWER', 1), s('ANSWER', 2)]])));
P('DOWN', all(STG(), TW, BAND, GOD, CAP([['“Come, let us go down…', ST.DOWN, s('DOWN', 2)], ['and *confuse*.”', s('DOWN', 2), s('DOWN', 3)]], { italic: true, size: 80 }), REF('Genesis 11:7', 312, s('DOWN', 3) + .5)));
// side by side: the two words leave their lines, stand side by side, then one slides under the other on top of the (now smaller) tower
const SY0 = 700, SY1 = 965, SK = { size: 200, cw: 190, rows: [{ cl: ['נִ', 'בְ', 'נֶ', 'ה'], y: SY0, t: 0 }, { cl: ['נָ', 'בְ', 'לָ', 'ה'], y: SY1, t: 0 }],
  hot: [{ row: 0, t0: ST.BUILD + .05, t1: ST.CONFUSE }, { row: 1, t0: ST.CONFUSE + .05, t1: ST.CHANGED + .2 }] };
const colX2 = 540 - .5 * SK.cw;
const STACK = extra => (v, a, b) => { const bb = band(ST.SIDE - .01), gx = M().GR - hw('הָבָה', GS) - hw('נֵרְדָה', GS) - 2 * SPc, vav = hw('וְ', GS), wb = hw('וְנָבְלָה', GS);
  if (v < ST.SIDE + .6) { const X = KIT.X; X.save(); X.globalAlpha = 1 - sm((v - ST.SIDE) / .3); X.font = KIT.font(GS, { face: KIT.F.g }); X.direction = 'rtl'; X.textAlign = 'right'; X.fillStyle = KIT.INKC; X.fillText('וְ', gx, GY); X.restore(); }   // "and" stays behind
  KIT.STACK(v, a, b, { ...SK, from: { t: ST.SIDE + .1, d1: .001, hold: 0, d2: 1.1, size: 121, rows: [{ cx: bb.rN - M().wN / 2, y: bb.y }, { cx: gx - vav - (wb - vav) / 2, y: GY }], mid: { size: 150, cw: 100, rows: [{ cx: 770, y: 800 }, { cx: 310, y: 800 }] } },
    join: { t: ST.SIDE + 1.1, diff: 2, t1: ST.CHANGED }, col: { i: 2, t: ST.SIDE + 1.6, t1: ST.CHANGED + .5 }, ...extra }); };
const GL = [{ row: 0, s: '*Build*.', y: 478, t: s('BUILD', 1), t1: ST.CHANGED }, { row: 1, s: '*Confuse*.', y: 1072, t: s('CONFUSE', 1), t1: ST.CHANGED }];
P('SIDE', all(STG(), TW, CAP([['Put them side by side.', ST.SIDE, ST.SIDE + 1.3]]), STACK({})));
P('BUILD', all(STG(), TW, STACK({ gloss: GL })));
P('CONFUSE', all(STG(), TW, STACK({ gloss: GL })));
// THE MOMENT: the vowel points fall away, the ל lifts out and leaves a ring; the נ comes down into the ring, and there it becomes ל
P('CHANGED', all(STG(), TW, CAP([['*One letter* changed.', ST.CHANGED, s('CHANGED', 1)], ['{נ} became {ל}.', s('CHANGED', 1), s('CHANGED', 1) + 1.5]]),
  STACK({ strip: { t: ST.CHANGED + .15, d: .7 }, dim: { t: ST.CHANGED + .4, keep: 2 }, gap: { row: 1, i: 2, t: ST.CHANGED + .5 }, morph: { t: s('CHANGED', 1) + .05, d: 2.0, i: 2 } })));
// the name they wanted, and the name the city got: the same red ל, in its ring, travels into בָּבֶל
const LR = (x, y, v, t) => { const X = KIT.X; KIT.RING(x, y - 200 * .36 - 8, 84, 112, v, -9, { glow: 1.3, solid: true, lw: 5 }); X.save(); X.font = KIT.font(200, { face: KIT.F.g }); X.textAlign = 'center'; X.direction = 'rtl'; X.fillStyle = KIT.HOT; X.fillText('ל', x, y); X.restore(); };
const tb = s('CITY', 1);
const SHEM = HW({ s: 'שֵׁם', y: 650, size: 200, t: ST.NAME + .9, hot: ['שֵׁם'], hotOff: ST.CITY + .1 });
P('NAME', all(STG(), TW, CAP([['They wanted', ST.NAME, ST.NAME + .7], ['to make a *name*.', ST.NAME + .7, EN('NAME') - .5]]), SHEM, v => LR(lerp(colX2, 540, eio((v - ST.NAME) / .6)), SY1, v)));
P('CITY', all(STG(), TW, CAP([['The city got one:', ST.CITY, tb]]), SHEM,
  v => { const k = eio((v - tb) / .7), x = lerp(540, M().lxB - 30, k), y = SY1 - Math.sin(Math.PI * k) * 90; LR(x, y, v); },
  v => { if (v < tb) return; const X = KIT.X, k = eio((v - tb) / .7); X.save(); X.globalAlpha = sm((v - tb) / .3); const wb = hw('בָּבֶ', 200), xr = lerp(1000 + wb / 2, M().BR + 15 - wb / 2, k); KIT.heb('בָּבֶ', xr, SY1, 200, v, {}); X.restore(); },
  v => KIT.ink(v, tb + .9, () => KIT.rich('Babel', 540, 1075, 54, v, { caps: true, ls: 6, color: KIT.INK(.66), plain: true }), { blur: 3 })));
// END VERSE, alone (Gen 11:9 has the Divine Name: English only)
const ENDV = (v, a, b) => { const e = TM['END VERSE']; KIT.STAGE(v, a, { cy: 900 }); KIT.REF('Genesis 11:9', 620, v, a + .1);
  KIT.WLINES(v, { cy: 960, size: 98, lh: 128, italic: true, lines: [['“Because there,', a + .05, a + .9], ['God *confused*', a + .8, a + e[1]], ['the language', a + e[1], a + e[1] + .8], ['of all the earth.”', a + e[1] + .7, a + e[1] + 1.8]] }); };
P('END VERSE', ENDV);
P('LOGO', (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - TM['END VERSE'][0], pb: a, next: KIT.LOGO }));
