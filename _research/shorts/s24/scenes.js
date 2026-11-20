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
const TM = /*TIMING*/{"HOOK": [3.0, 1.7], "HOOK2": [3.4, 1.7], "SAY": [3.2, 1.5], "COME": [2.2], "TOWER": [3.6, 1.5], "ANSWER": [3.8, 1.4, 2.6], "DOWN": [4.6, 0.9, 1.9, 3.0], "SIDE": [2.4], "BUILD": [2.4, 1.0], "CONFUSE": [2.6, 1.1], "CHANGED": [5.0, 1.6], "NAME": [2.8], "CITY": [3.6, 1.4], "END VERSE": [5.4, 1.9]}/*END*/;
let T = 0; const ST = {}; for (const k in TM) { ST[k] = T; T += TM[k][0]; } T = 0;
const EN = n => ST[n] + TM[n][0];
const P = (n, f) => { const d = n === 'LOGO' ? 3.25 : TM[n][0]; addP(n, d, f); T += d; };
const s = (n, i) => ST[n] + TM[n][i];   // absolute time of sub-line i of step n
const all = (...fs) => (v, a, b) => fs.forEach(f => f(v, a, b));
const STG = (cy = 880) => (v, a) => KIT.STAGE(v, a, { cy });
const W = (str, y, size, t, end, o = {}) => v => KIT.WORDS(v, { s: str, y, size, t, end, ...o });
const WL = (cy, size, lines, o = {}) => v => KIT.WLINES(v, { cy, size, lines, ...o });
const HW = o => v => KIT.HEBW(v, o);
const REF = (str, y, t) => v => KIT.REF(str, y, v, t);
const LABEL = (str, y, t) => v => KIT.ink(v, t, () => KIT.rich(str, 540, y, 42, v, { caps: true, ls: 7, color: KIT.INK(.6), plain: true }), { blur: 3 });

// 1. HOOK: the tower is being laid from the first frame; on "the building stops" it stops
const TW1 = v => KIT.TOWER(v, { t0: 0, t1: s('HOOK2', 1) + .45, p0: .06, p1: .8, base: 1490 });
P('HOOK', all(STG(), WL(420, 78, [['The builders of Babel say,', .1, s('HOOK', 1)], ['“Let us *build*.”', s('HOOK', 1), EN('HOOK')]]), TW1));   // sfx: write | bricks
P('HOOK2', all(STG(), WL(420, 78, [['God changes *one letter*,', ST.HOOK2 + .1, s('HOOK2', 1)], ['and the building *stops*.', s('HOOK2', 1), EN('HOOK2')]]), TW1));   // sfx: write | bricks stop
// 2. the builders' words (Gen 11:4): the verse builds up while the tower does
const TW2 = v => KIT.TOWER(v, v < ST.TOWER ? { t0: ST.SAY, t1: EN('COME'), p0: .1, p1: .5, base: 1490 } : { t0: ST.TOWER, t1: EN('TOWER') - .7, p0: .5, p1: 1, base: 1490, sky: { t: s('TOWER', 1) - .2 } });
const V4 = all(W('In Hebrew, they say:', 400, 76, ST.SAY + .1, s('SAY', 1)), HW({ s: 'הָבָה נִבְנֶה', y: 600, size: 170, t: s('SAY', 1), hot: ['נִבְנֶה'] }));
P('SAY', all(STG(), V4, TW2));   // sfx: write | heb@sub1
P('COME', all(STG(), V4, W('“Come, let us *build*.”', 730, 76, ST.COME + .1, EN('COME') - .5, { italic: true }), REF('Genesis 11:4', 820, ST.COME + .9), TW2));   // sfx: write
P('TOWER', all(STG(), WL(400, 84, [['A city, and a tower', ST.TOWER + .1, s('TOWER', 1)], ['with its top in the *sky*.', s('TOWER', 1), EN('TOWER') - .4]]), TW2));   // sfx: write | bricks
// 3. God answers with their word (Gen 11:7): the same word, exactly above itself
const RX = 905, hw = (w, size) => { KIT.X.save(); KIT.X.font = KIT.font(size, { face: KIT.F.g }); const m = KIT.X.measureText(w).width; KIT.X.restore(); return m; };
const ROWS = (v) => { const tm = s('ANSWER', 2), sz = 132, sp = sz * .28;
  LABEL('The builders', 400, -9)(v); KIT.HEBW(v, { key: 'A', s: 'הָבָה נִבְנֶה', right: RX, y: 550, size: sz, t: -9, hot: ['הָבָה'], hotAt: tm + .55 });
  if (v >= s('ANSWER', 1) + .5) LABEL('God', 710, s('ANSWER', 1) + .5)(v);
  KIT.HEBW(v, { key: 'B', s: 'הָבָה', right: RX, y: 860, size: sz, t: tm, hot: ['הָבָה'], hotAt: tm + .55 });
  if (v >= tm + .5) { const X = KIT.X, k = KIT.eo((v - tm - .5) / .6), x = RX - hw('הָבָה', sz) / 2; X.save(); X.strokeStyle = KIT.HOTA(.8); X.lineWidth = 4; X.lineCap = 'round'; X.setLineDash([3, 13]); X.beginPath(); X.moveTo(x, 590); X.lineTo(x, 590 + 150 * k); X.stroke(); X.restore(); }   // the link between the two
  let r = RX - hw('הָבָה', sz) - sp; const t1 = s('DOWN', 1), t2 = s('DOWN', 3);
  KIT.HEBW(v, { key: 'B', s: 'נֵרְדָה', right: r, y: 860 - (1 - KIT.eo((v - t1) / .8)) * 46, size: sz, t: t1 }); r -= hw('נֵרְדָה', sz) + sp;
  KIT.HEBW(v, { key: 'B', s: 'וְנָבְלָה', right: r, y: 860, size: sz, t: t2, hot: ['וְנָבְלָה'] }); };
P('ANSWER', all(STG(820), ROWS, WL(1110, 80, [['Then God answers', ST.ANSWER + .1, s('ANSWER', 1)], ['with their own *word*.', s('ANSWER', 1), s('ANSWER', 2)]])));   // sfx: write | heb@sub2 | pluck
P('DOWN', all(STG(820), ROWS, WL(1100, 76, [['“Come, let us go down…', ST.DOWN + .1, s('DOWN', 2)], ['and *confuse*.”', s('DOWN', 2), s('DOWN', 3)]], { italic: true }), REF('Genesis 11:7', 1270, s('DOWN', 3) + .5)));   // sfx: write | heb@sub1,sub3
// 4. side by side: the two words leave their lines and settle letter over letter; each lights as it is said
const SK = { size: 230, cw: 212, rows: [{ cl: ['נִ', 'בְ', 'נֶ', 'ה'], y: 810, t: 0 }, { cl: ['נָ', 'בְ', 'לָ', 'ה'], y: 1180, t: 0 }],
  hot: [{ row: 0, t0: ST.BUILD + .05, t1: ST.CONFUSE }, { row: 1, t0: ST.CONFUSE + .05, t1: ST.CHANGED + .2 }] };
const STACK = extra => (v, a, b) => { KIT.HEBW(-99, { key: 'A', s: 'הָבָה נִבְנֶה', right: RX, y: 550, size: 132, t: 0 }); const A = KIT.pos['Aנִבְנֶה'];
  const bx = RX - hw('הָבָה', 132) - hw('נֵרְדָה', 132) - 2 * 132 * .28 - hw('וְנָבְלָה', 132) / 2;
  KIT.STACK(v, a, b, { ...SK, from: { t: ST.SIDE, d: 1.0, size: 132, rows: [{ cx: A.cx, y: 550 }, { cx: bx - 20, y: 860 }] }, ...extra }); };
P('SIDE', all(STG(900), W('Put them side by side.', 480, 84, ST.SIDE + .1, EN('SIDE') - .5), STACK({})));   // sfx: write | glide
P('BUILD', all(STG(900), STACK({ gloss: [{ row: 0, s: '*Build*.', t: s('BUILD', 1), t1: ST.CONFUSE }] })));   // sfx: pluck@0.05 | write@sub1
P('CONFUSE', all(STG(900), STACK({ gloss: [{ row: 1, s: '*Confuse*.', t: s('CONFUSE', 1), t1: ST.CHANGED }] })));   // sfx: pluck@0.05 | write@sub1
// 5. THE MOMENT: the points dissolve, the ל lifts out, the נ comes down and becomes ל
P('CHANGED', all(STG(900), WL(440, 84, [['*One letter* changed.', ST.CHANGED + .1, s('CHANGED', 1)], ['{נ} became {ל}.', s('CHANGED', 1), s('CHANGED', 1) + 1.2]]),
  STACK({ strip: { t: ST.CHANGED + .2, d: .9 }, dim: { t: ST.CHANGED + .5, keep: 2 }, gap: { row: 1, i: 2, t: ST.CHANGED + .7 }, morph: { t: s('CHANGED', 1) + .2, d: 1.6, i: 2 } })));   // sfx: write | morph | land
// 6. the name they wanted, and the name the city got (Gen 11:4, 11:9): the same slot, and the same ל
P('NAME', all(STG(900), WL(520, 88, [['They wanted', ST.NAME + .1, ST.NAME + .8], ['to make a *name*.', ST.NAME + .7, EN('NAME') - .5]]), HW({ s: 'שֵׁם', y: 1040, size: 300, t: ST.NAME + 1.2, hot: ['שֵׁם'] }), REF('Genesis 11:4', 1190, ST.NAME + 1.7)));   // sfx: write | heb
P('CITY', all(STG(900), WL(520, 88, [['The city got one:', ST.CITY + .1, s('CITY', 1)]]),
  HW({ s: 'בָּבֶל', y: 1040, size: 300, t: s('CITY', 1), hot: [], hotLetter: { word: 'בָּבֶל', idx: 2, at: s('CITY', 1) + .9 } }),
  v => { const l = KIT.lastLetter; if (l && v >= s('CITY', 1) + .9) KIT.RING(l.x, l.y - 10, 112, 152, v, s('CITY', 1) + .95, { glow: .9 }); },
  REF('Genesis 11:9', 1230, s('CITY', 1) + 1.3)));   // sfx: write | heb@sub1 | pluck
// 7. END VERSE, alone (Gen 11:9 has the Divine Name: English only)
const ENDV = (v, a, b) => { KIT.STAGE(v, a, { cy: 900 }); KIT.REF('Genesis 11:9', 740, v, a + .1);
  KIT.WLINES(v, { cy: 930, size: 76, italic: true, lines: [['“Because there, God *confused*', a + .15, a + TM['END VERSE'][1]], ['the language of all the earth.”', a + TM['END VERSE'][1], a + TM['END VERSE'][0] - 1.6]] }); };
P('END VERSE', ENDV);   // sfx: endsoft
// 8. the posted logo outro
P('LOGO', (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - TM['END VERSE'][0], pb: a, next: KIT.LOGO }));   // sfx: logo
