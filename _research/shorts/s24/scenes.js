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
const CAP = (lines, o = {}) => v => KIT.WLINES(v, { top: 400, size: 78, lines, ...o });   // the spoken line: always at the same height
const HW = o => v => KIT.HEBW(v, o);
const REF = (str, y, t) => v => KIT.REF(str, y, v, t);
const lerp = KIT.lerp, cl = KIT.cl;

// 1–2. ONE OPENING SCENE (0–15 s): the tower is being laid from the first frame; on "the building stops" one brick hangs and never lands;
// it stays frozen under the builders' words, falls into place on "Come, let us build", and the tower is finished into the sky.
const stopT = s('HOOK2', 1) + .35;
const towerP = v => v < stopT ? lerp(.42, .7, cl(v / stopT)) : v < ST.COME + .5 ? .7 : v < ST.TOWER ? lerp(.7, .8, cl((v - ST.COME - .5) / (EN('COME') - ST.COME - .5))) : lerp(.8, 1, cl((v - ST.TOWER) / (TM.TOWER[0] - .7)));
const TW = v => KIT.TOWER(v, { p: towerP(v), settle: v > stopT && v < ST.COME + .5 ? (v - stopT) * 9 : 0, hang: { t: stopT, drop: ST.COME + .1 }, city: { t: ST.TOWER + .15 }, sky: { t: s('TOWER', 1) - .3 } });
P('HOOK', all(STG(), TW, CAP([['The builders of Babel say,', .15, s('HOOK', 1)], ['“Let us *build*.”', s('HOOK', 1), EN('HOOK')]], { pre: .34 })));
P('HOOK2', all(STG(), TW, CAP([['God changes *one letter*,', ST.HOOK2, s('HOOK2', 1)], ['and the building *stops*.', s('HOOK2', 1), EN('HOOK2')]])));
const V4 = all(CAP([['In Hebrew, they say:', ST.SAY, s('SAY', 1)]]), HW({ s: 'הָבָה נִבְנֶה', y: 650, size: 176, t: s('SAY', 1), hot: ['נִבְנֶה'] }));
P('SAY', all(STG(), TW, V4));
P('COME', all(STG(), TW, V4, v => KIT.WORDS(v, { s: '“Come, let us *build*.”', y: 780, size: 80, t: ST.COME, end: EN('COME') - .5, italic: true }), REF('Genesis 11:4', 872, ST.COME + .9)));
P('TOWER', all(STG(), TW, CAP([['A city, and a tower', ST.TOWER, s('TOWER', 1)], ['with its top in the *sky*.', s('TOWER', 1), EN('TOWER') - .4]])));
// 3. God answers with their word (Gen 11:7): the builders' line, God's line under it, the same word exactly above itself
const SZ = 132, SP = SZ * .28, hw = (w, size = SZ) => { KIT.X.save(); KIT.X.font = KIT.font(size, { face: KIT.F.g }); const m = KIT.X.measureText(w).width; KIT.X.restore(); return m; };
const rowB = () => hw('הָבָה') + hw('נֵרְדָה') + hw('וְנָבְלָה') + 2 * SP, RXf = () => 540 + rowB() / 2 - 14, YA = 850, YB = 1150;
const LBL = (str, y, t) => v => KIT.ink(v, t, () => { const X = KIT.X; X.save(); X.font = KIT.font(52); X.letterSpacing = '4px'; X.textAlign = 'right'; X.fillStyle = KIT.INK(.66); X.fillText(str.toUpperCase(), RXf(), y); X.restore(); }, { blur: 3 });
const ROWS = v => { const RX = RXf(), tm = s('ANSWER', 2), off = s('DOWN', 3);
  LBL('The builders', YA - 150, -9)(v); KIT.HEBW(v, { key: 'A', s: 'הָבָה נִבְנֶה', right: RX, y: YA, size: SZ, t: -9, hot: ['הָבָה'], hotAt: tm + .5, hotOff: off });
  LBL('God', YB - 150, s('ANSWER', 1) + .4)(v);
  KIT.HEBW(v, { key: 'B', s: 'הָבָה', right: RX, y: YB, size: SZ, t: tm, hot: ['הָבָה'], hotAt: tm + .5, hotOff: off });
  if (v >= tm + .5 && v < off + .4) { const X = KIT.X, k = KIT.eo((v - tm - .5) / .5), x = RX + 14, y0 = YA - 46, y1 = YB - 46; X.save(); X.globalAlpha = 1 - KIT.sm((v - off) / .4); X.strokeStyle = KIT.HOT; X.lineWidth = 4; X.lineCap = 'round'; X.setLineDash([10, 12]);   // the link: same word
    X.beginPath(); X.moveTo(x, y0); X.lineTo(x + 22, y0); X.lineTo(x + 22, y0 + (y1 - y0) * k); if (k >= 1) X.lineTo(x, y1); X.stroke(); X.restore(); }
  let r = RX - hw('הָבָה') - SP; const t1 = s('DOWN', 1), t2 = s('DOWN', 3);
  KIT.HEBW(v, { key: 'B', s: 'נֵרְדָה', right: r, y: YB - (1 - KIT.eo((v - t1) / .8)) * 50, size: SZ, t: t1 }); r -= hw('נֵרְדָה') + SP;
  KIT.HEBW(v, { key: 'B', s: 'וְנָבְלָה', right: r, y: YB, size: SZ, t: t2, hot: ['וְנָבְלָה'] }); };
P('ANSWER', all(STG(), ROWS, CAP([['Then God answers', ST.ANSWER, s('ANSWER', 1)], ['with their own *word*.', s('ANSWER', 1), s('ANSWER', 2)]])));
P('DOWN', all(STG(), ROWS, CAP([['“Come, let us go down…', ST.DOWN, s('DOWN', 2)], ['and *confuse*.”', s('DOWN', 2), s('DOWN', 3)]], { italic: true, size: 80 }), REF('Genesis 11:7', 1290, s('DOWN', 3) + .5)));
// 4. side by side: the two words leave their lines, stand on one line, then one slides under the other, letter over letter
const SK = { size: 230, cw: 212, rows: [{ cl: ['נִ', 'בְ', 'נֶ', 'ה'], y: 830, t: 0 }, { cl: ['נָ', 'בְ', 'לָ', 'ה'], y: 1200, t: 0 }],
  hot: [{ row: 0, t0: ST.BUILD + .05, t1: ST.CONFUSE }, { row: 1, t0: ST.CONFUSE + .05, t1: ST.CHANGED + .2 }] };
const STACK = extra => (v, a, b) => { const RX = RXf(), ax = RX - hw('הָבָה') - SP - hw('נִבְנֶה') / 2, wb = hw('וְנָבְלָה'), bxr = RX - hw('הָבָה') - hw('נֵרְדָה') - 2 * SP, vav = hw('וְ');
  if (v < ST.SIDE + .7) { const X = KIT.X; X.save(); X.globalAlpha = 1 - KIT.sm((v - ST.SIDE - .1) / .6); X.font = KIT.font(SZ, { face: KIT.F.g }); X.direction = 'rtl'; X.textAlign = 'right'; X.fillStyle = KIT.INKC; X.fillText('וְ', bxr, YB); X.restore(); }   // the "and" stays behind
  KIT.STACK(v, a, b, { ...SK, from: { t: ST.SIDE, d1: .9, hold: .5, d2: .9, size: SZ, rows: [{ cx: ax, y: YA }, { cx: bxr - vav - (wb - vav) / 2, y: YB }], mid: { size: 150, cw: 98, rows: [{ cx: 780, y: 960 }, { cx: 300, y: 960 }] } }, ...extra }); };
const GL = [{ row: 0, s: '*Build*.', y: 590, t: s('BUILD', 1), t1: ST.CHANGED }, { row: 1, s: '*Confuse*.', y: 1370, t: s('CONFUSE', 1), t1: ST.CHANGED }];
P('SIDE', all(STG(), CAP([['Put them side by side.', ST.SIDE, ST.SIDE + 1.3]]), STACK({})));
P('BUILD', all(STG(), STACK({ gloss: GL })));
P('CONFUSE', all(STG(), STACK({ gloss: GL })));
// 5. THE MOMENT: the points dissolve, the ל lifts out and leaves a ring; the נ comes down into the ring, and there it becomes ל
P('CHANGED', all(STG(), CAP([['*One letter* changed.', ST.CHANGED, s('CHANGED', 1)], ['{נ} became {ל}.', s('CHANGED', 1), s('CHANGED', 1) + 1.5]]),
  STACK({ strip: { t: ST.CHANGED + .15, d: .8 }, dim: { t: ST.CHANGED + .4, keep: 2 }, gap: { row: 1, i: 2, t: ST.CHANGED + .5 }, morph: { t: s('CHANGED', 1) + .05, d: 2.0, i: 2 } })));
// 6. the name they wanted, and the name the city got (Gen 11:4, 11:9): שֵׁם stays, בָּבֶל lands under it, and its ל comes down the same way
const SHEM = HW({ s: 'שֵׁם', y: 800, size: 270, t: ST.NAME + .9, hot: ['שֵׁם'], hotOff: ST.CITY + .1 }), tb = s('CITY', 1);
P('NAME', all(STG(), CAP([['They wanted', ST.NAME, ST.NAME + .7], ['to make a *name*.', ST.NAME + .7, EN('NAME') - .5]]), SHEM));
P('CITY', all(STG(), CAP([['The city got one:', ST.CITY, tb]]), SHEM,
  HW({ s: 'בָּבֶל', y: 1190, size: 270, t: tb, hot: [], hotLetter: { word: 'בָּבֶל', idx: 2, gap: 64, drop: { t: tb + .35, d: 1.0, h: 210 } } }),
  v => { const l = KIT.lastLetter; if (l && v >= tb + 1.3) KIT.RING(l.x, l.y + 14, 135, 135, v, tb + 1.3, { d: .7, glow: 1.3, solid: true, lw: 4 + 2.5 * KIT.sm((v - tb - 2) / 2) }); },
  HW({ s: 'בָּבֶל', y: 1190, size: 270, t: tb, hot: [], hotLetter: { word: 'בָּבֶל', idx: 2, gap: 64, drop: { t: tb + .35, d: 1.0, h: 210 } } }),   // again, on top of the ring's glow
  v => KIT.ink(v, tb + .5, () => KIT.rich('Babel', 540, 1340, 54, v, { caps: true, ls: 6, color: KIT.INK(.66), plain: true }), { blur: 3 })));
// 7. END VERSE, alone (Gen 11:9 has the Divine Name: English only)
const ENDV = (v, a, b) => { const e = TM['END VERSE']; KIT.STAGE(v, a, { cy: 900 }); KIT.REF('Genesis 11:9', 620, v, a + .1);
  KIT.WLINES(v, { cy: 960, size: 98, lh: 128, italic: true, lines: [['“Because there,', a + .05, a + .9], ['God *confused*', a + .8, a + e[1]], ['the language', a + e[1], a + e[1] + .8], ['of all the earth.”', a + e[1] + .7, a + e[1] + 1.8]] }); };
P('END VERSE', ENDV);
// 8. the posted logo outro
P('LOGO', (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - TM['END VERSE'][0], pb: a, next: KIT.LOGO }));
