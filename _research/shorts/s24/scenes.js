// Short s24 "God changes one letter" (Babel, Gen 11): parchment Shorts kit, engine-only (no photo stills). Nov 20, 2026. v2.
// Script: the approved one with a new hook (hooks.md: famous subject first, a contrast, the loop left open). One step per line; the on-screen text is the
// voiceover word for word, landing word by word, and Hebrew is written on when it is spoken.
// WLC: Gen 11:4 וַיֹּאמְרוּ הָבָה נִבְנֶה לָּנוּ עִיר וּמִגְדָּל וְרֹאשׁוֹ בַשָּׁמַיִם וְנַעֲשֶׂה לָּנוּ שֵׁם; Gen 11:7 (God speaking, per 11:6) הָבָה נֵרְדָה וְנָבְלָה שָׁם שְׂפָתָם;
// Gen 11:8 וַיַּחְדְּלוּ לִבְנֹת הָעִיר ("the building stops"); Gen 11:9 קָרָא שְׁמָהּ בָּבֶל, and that verse has the Divine Name, so its line is shown in English only.
// נִבְנֶה (root בנה) and נָבְלָה (root בלל) are different roots: the only claim on screen is that the written words differ by one letter, so the vowel points
// dissolve before "One letter changed" and the bare letters נבנה / נבלה stay.
// Pictures, a new one on every line (the posted reels' vocabulary): the word with its letter ringed; a verse banner; the drawn tower; two verses linked by an
// arrow; a split comparison; a letter grid; one giant crowned letter that morphs נ → ל; the giant שֵׁם; the giant בָּבֶל with the same red ל; the verse alone.
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

const eio = KIT.eio, eo = KIT.eo, sm = KIT.sm;
const ST_ = o => v => KIT.STAM(v, o);
const LAB = (str, x, y, t, o) => v => KIT.LABEL(str, x, y, v, t, o);
const EN1 = (str, y, t, end, o = {}) => v => KIT.WORDS(v, { s: str, y, size: o.size || 80, t, end, italic: o.italic ?? true });
const RING_ = (key, word, idx, t, o = {}) => v => { const p = KIT.SP[key + word + idx]; if (!p || v < t) return; KIT.RING(p.x, p.y - p.size * .5, p.w * .5 + 14, p.size * .66, v, t, { d: o.d ?? .5, solid: o.solid ? v >= o.solid : false, glow: o.glow ?? 1, lw: 4 }); };

// 1. HOOK: the builders' word, huge and crowned; one of its letters already ringed. On "one letter" it turns red; on "stops" it lifts out and leaves a "?"
const stopT = s('HOOK2', 1) + .3;
const HOOKW = v => { const lift = eio((v - stopT) / .6);
  KIT.STAM(v, { key: 'H', s: 'נבנה', y: 1080, size: 330, t: .05, step: .12, red: { word: 'נבנה', idx: 2, at: ST.HOOK2 + 1.0 }, skip: { word: 'נבנה', idx: 2, t: stopT } });
  const p = KIT.SP['Hנבנה2']; if (!p) return;
  KIT.RING(p.x, p.y - p.size * .34, 100, 150, v, .9, { d: .6, solid: v >= ST.HOOK2 + 1.0, glow: v >= ST.HOOK2 + 1.0 ? 1.3 : .5, lw: 4 });
  if (v >= stopT) { const X = KIT.X; X.save(); X.translate(p.x, p.y - lift * 240); X.rotate(-.12 * lift); X.font = `330px ${KIT.F.s}`; X.textAlign = 'center'; X.fillStyle = KIT.HOT; X.fillText('נ', 0, 0); X.restore();
    KIT.ink(v, stopT + .35, () => { const X = KIT.X; X.save(); X.font = KIT.font(150, { italic: true }); X.textAlign = 'center'; X.fillStyle = KIT.INK(.45); X.fillText('?', p.x, p.y - 40); X.restore(); }); } };
P('HOOK', all(STG(), HOOKW, CAP([['The builders of Babel say,', 0, s('HOOK', 1)], ['“Let us *build*.”', s('HOOK', 1), EN('HOOK')]], { pre: 1 })));
P('HOOK2', all(STG(), HOOKW, CAP([['God changes *one letter*,', ST.HOOK2, s('HOOK2', 1)], ['and the building *stops*.', s('HOOK2', 1), EN('HOOK2')]])));
// 2. the verse banner, Genesis 11:4
const B4 = all(REF('Genesis 11:4', 640, s('SAY', 1) + .3), ST_({ s: 'הָבָה נִבְנֶה', y: 880, size: 210, t: s('SAY', 1), hot: ['נִבְנֶה'], hotAt: s('SAY', 1) + .8 }));
P('SAY', all(STG(), CAP([['In Hebrew, they say:', ST.SAY, s('SAY', 1)]]), B4));
P('COME', all(STG(), CAP([['In Hebrew, they say:', -9, -9]], { pre: 1 }), B4, EN1('“Come, let us *build*.”', 1060, ST.COME, EN('COME') - .5)));
// 3. the tower, drawn and rising, for this line only
P('TOWER', all(STG(), v => KIT.ETOWER(v, { p: lerp(.15, 1, eio((v - ST.TOWER) / (TM.TOWER[0] - .5))), base: 1480, scale: .74, sky: { t: s('TOWER', 1) - .2 } }), v => KIT.CITY(v, ST.TOWER + .2, 1480),
  CAP([['A city, and a tower', ST.TOWER, s('TOWER', 1)], ['with its top in the *sky*.', s('TOWER', 1), EN('TOWER') - .4]])));
// 4. two verses, one under the other; a red arrow links the same word
const RX = 975, Y1 = 830, Y2 = 1150, MZ = 120;
const MATCH = v => { const tm = s('ANSWER', 2), off = s('DOWN', 3) + .3;
  LAB('Genesis 11:4', RX - 160, Y1 - 190, ST.ANSWER)(v); KIT.STAM(v, { key: 'M1', s: 'הָבָה נִבְנֶה', right: RX, y: Y1, size: MZ, t: ST.ANSWER, step: .04, hot: ['הָבָה'], hotAt: tm + .5, hotOff: off });
  if (v >= tm) LAB('Genesis 11:7', RX - 160, Y2 - 190, tm)(v);
  const r1 = KIT.STAM(v, { key: 'M2', s: 'הָבָה', right: RX, y: Y2, size: MZ, t: tm, hot: ['הָבָה'], hotAt: tm + .5, hotOff: off });
  const r2 = KIT.STAM(v, { key: 'M2', s: 'נֵרְדָה', right: r1.left - MZ * .3, y: Y2, size: MZ, t: s('DOWN', 1) });
  KIT.STAM(v, { key: 'M2', s: 'וְנָבְלָה', right: r2.left - MZ * .3, y: Y2, size: MZ, t: s('DOWN', 3), hot: ['וְנָבְלָה'], hotAt: s('DOWN', 3) + .5 });
  const a = KIT.SP['M1הָבָה1'], b = KIT.SP['M2הָבָה1']; if (a && b) KIT.ARROW(RX + 20, Y1 - 70, RX + 20, Y2 - 110, 70, eo((v - tm - .45) / .5)); };
P('ANSWER', all(STG(), MATCH, CAP([['Then God answers', ST.ANSWER, s('ANSWER', 1)], ['with their own *word*.', s('ANSWER', 1), s('ANSWER', 2)]])));
P('DOWN', all(STG(), MATCH, CAP([['“Come, let us go down…', ST.DOWN, s('DOWN', 2)], ['and *confuse*.”', s('DOWN', 2), s('DOWN', 3)]], { italic: true, size: 82 })));
// 5. side by side: a split panel, builders on the right, God on the left
const XR = 765, XL = 315, SZ5 = 165;
const SPLIT = v => { const t0 = ST.SIDE + .1, k = eo((v - t0) / .7);
  KIT.RULE(540, 620, 540, 1240, eo((v - t0) / .6));
  KIT.LABEL('Genesis 11:4', XR, 700, v, t0 + .1); KIT.LABEL('Genesis 11:7', XL, 700, v, t0 + .3);
  KIT.X.save(); KIT.X.translate((1 - k) * 60, 0); KIT.STAM(v, { key: 'S', s: 'נִבְנֶה', x: XR, y: 960, size: SZ5, t: t0 + .2, step: .05, hot: ['נִבְנֶה'], hotAt: ST.BUILD + .05 }); KIT.X.restore();
  KIT.X.save(); KIT.X.translate(-(1 - eo((v - t0 - .25) / .7)) * 60, 0); KIT.STAM(v, { key: 'S', s: 'נָבְלָה', x: XL, y: 960, size: SZ5, t: t0 + .45, step: .05, hot: ['נָבְלָה'], hotAt: ST.CONFUSE + .05 }); KIT.X.restore();
  if (v >= s('BUILD', 1)) KIT.WORDS(v, { s: '*Build*.', x: XR, y: 1140, size: 84, t: s('BUILD', 1) });
  if (v >= s('CONFUSE', 1)) KIT.WORDS(v, { s: '*Confuse*.', x: XL, y: 1140, size: 84, t: s('CONFUSE', 1) }); };
P('SIDE', all(STG(), SPLIT, CAP([['Put them side by side.', ST.SIDE, ST.SIDE + 1.3]])));
P('BUILD', all(STG(), SPLIT));
P('CONFUSE', all(STG(), SPLIT));
// 6. one letter changed: the letters in a grid (matches joined, the odd one ringed), then ONE giant crowned letter that turns from נ into ל
const tg = ST.CHANGED, tm6 = s('CHANGED', 1);
const GRID = v => { if (v >= tm6) return; const cw = 200, cx = i => 540 + (1.5 - i) * cw, ya = 820, yb = 1140, A = ['נ', 'ב', 'נ', 'ה'], B = ['נ', 'ב', 'ל', 'ה'], X = KIT.X;
  [[A, ya, 0], [B, yb, .2]].forEach(([L, y, d]) => L.forEach((c, i) => { const k = (v - tg - d - i * .06) / .4; if (k <= 0) return; const e = KIT.back(Math.min(1, k)), dim = i !== 2 ? 1 - .4 * sm((v - tg - .9) / .5) : 1;
    X.save(); X.globalAlpha = sm(k * 2) * dim; X.font = `230px ${KIT.F.s}`; X.textAlign = 'center'; X.fillStyle = i === 2 ? KIT.mix(sm((v - tg - .8) / .4)) : KIT.INKC; X.fillText(c, cx(i), y - (1 - e) * 40); X.restore(); }));
  [0, 1, 3].forEach((i, q) => KIT.RULE(cx(i), ya + 40, cx(i), yb - 210, eo((v - tg - .7 - q * .12) / .3)));
  KIT.RING(cx(2), (ya - 200 + yb + 40) / 2, 110, (yb - ya + 260) / 2, v, tg + .9, { d: .5, glow: 1, lw: 4 }); };
P('CHANGED', all(STG(), GRID, v => { if (v >= tm6) KIT.GIANT(v, { x: 540, y: 1250, size: 560, in: tm6, t: tm6 + .5, d: 1.3 }); },
  CAP([['*One letter* changed.', ST.CHANGED, tm6], ['{נ} became {ל}.', tm6, tm6 + 1.5]])));
// 7. the name they wanted, and the name the city got
P('NAME', all(STG(), CAP([['They wanted', ST.NAME, ST.NAME + .7], ['to make a *name*.', ST.NAME + .7, EN('NAME') - .5]]),
  ST_({ s: 'שֵׁם', y: 1080, size: 360, t: ST.NAME + .25, step: .15, hot: ['שֵׁם'], hotAt: ST.NAME + 1.2 }), EN1('“a name”', 1220, ST.NAME + 1.1, ST.NAME + 1.6, { size: 72 }), REF('Genesis 11:4', 1310, ST.NAME + 1.6)));
const tb = s('CITY', 1);
P('CITY', all(STG(), CAP([['The city got one:', ST.CITY, tb]]), v => { if (v < tb) KIT.STAM(v, { s: 'שֵׁם', y: 1080, size: 360, t: -9 }); },
  ST_({ key: 'C', s: 'בָּבֶל', y: 1080, size: 360, t: tb, step: .15, red: { word: 'בָּבֶל', idx: 2, at: tb + .7 } }), RING_('C', 'בָּבֶל', 2, tb + .8, { solid: tb + .8, glow: 1.3, d: .25 }),
  LAB('Babel', 540, 1220, tb + .9, { size: 56 }), REF('Genesis 11:9', 1310, tb + 1.3)));
// 8. END VERSE, alone (Gen 11:9 has the Divine Name: English only)
const ENDV = (v, a, b) => { const e = TM['END VERSE']; KIT.STAGE(v, a, { cy: 900 }); KIT.REF('Genesis 11:9', 620, v, a + .1);
  KIT.WLINES(v, { cy: 960, size: 98, lh: 128, italic: true, lines: [['“Because there,', a + .05, a + .9], ['God *confused*', a + .8, a + e[1]], ['the language', a + e[1], a + e[1] + .8], ['of all the earth.”', a + e[1] + .7, a + e[1] + 1.8]] }); };
P('END VERSE', ENDV);
P('LOGO', (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - TM['END VERSE'][0], pb: a, next: KIT.LOGO }));
