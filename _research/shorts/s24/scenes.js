// Short s24 "Let us build / let us confuse" (Babel, Gen 11): parchment Shorts kit + five fal stills (img/S1–S5.png, prompts in s24_fal_prompts.md). Nov 20, 2026.
// Approved script, one step per line; the on-screen text is the voiceover word for word, and Hebrew appears when it is spoken.
// WLC: Gen 11:4 וַיֹּאמְרוּ הָבָה נִבְנֶה לָּנוּ עִיר וּמִגְדָּל וְרֹאשׁוֹ בַשָּׁמַיִם וְנַעֲשֶׂה לָּנוּ שֵׁם; Gen 11:7 (God speaking, per 11:6) הָבָה נֵרְדָה וְנָבְלָה שָׁם שְׂפָתָם;
// Gen 11:9 קָרָא שְׁמָהּ בָּבֶל, and the verse has the Divine Name, so its line is shown in English only. נִבְנֶה (root בנה) and נָבְלָה (root בלל) are different roots:
// the only claim on screen is that the written words differ by one letter, so the vowel points dissolve before "One letter changed" and the bare letters נבנה / נבלה stay.
// Through-line: KIT.STACK, the two words letter over letter; the hook teases the ringed column, the payoff brings the נ down into the ring as a ל (true outline morph).
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
// TIMING on the video clock: [step length, ...offsets from the step start where a later part of the line is spoken]. retime.py rewrites this block from vo_marks.txt.
const TM = /*TIMING*/{"HOOK": [3.2, 1.3], "APART": [2.6], "SAY": [3.6, 1.9], "COME": [2.0], "TOWER": [3.4, 1.5], "ANSWER": [3.6, 1.4, 2.5], "DOWN": [4.6, 1.9, 3.0], "SIDE": [2.2], "BUILD": [2.4, 1.0], "CONFUSE": [2.6, 1.1], "CHANGED": [4.8, 1.6], "NAME": [2.6], "CITY": [3.4, 1.4], "END VERSE": [5.4, 1.9]}/*END*/;
let T = 0; const ST = {}; for (const k in TM) { ST[k] = T; T += TM[k][0]; } T = 0;
const P = (n, f) => { const d = n === 'LOGO' ? 3.25 : TM[n][0]; addP(n, d, f); T += d; };
const s = (n, i) => ST[n] + TM[n][i];   // absolute time of sub-line i of step n
const txt = (cy, f) => (v, a, b) => { KIT.CY = cy; try { f(v, a, b); } finally { KIT.CY = undefined; } };
const L = (cy, lines, size) => txt(cy, (v, a, b) => KIT.LINES(v, a, b, { lines: lines(a), ...(size ? { size } : {}) }));
const H = (heb, y, size, t, o = {}) => (v) => KIT.ink(v, t, () => KIT.heb(heb, 540, y, size, v, { hot: o.hot || [heb], hotAt: t + .45, ...o }), { rise: 10 });
const all = (...fs) => (v, a, b) => fs.forEach(f => f(v, a, b));
const STG = (cy = 860) => (v, a) => KIT.STAGE(v, a, { cy });

// the stack: unpointed in the hook, pointed from "Put them side by side" until the points dissolve
const HK = { size: 190, cw: 172, bare: true, rows: [{ cl: ['נ', 'ב', 'נ', 'ה'], y: 980, t: ST.HOOK + .2 }, { cl: ['נ', 'ב', 'ל', 'ה'], y: 1250, t: s('HOOK', 1) + .1 }] };
const SK = { size: 230, cw: 212, rows: [{ cl: ['נִ', 'בְ', 'נֶ', 'ה'], y: 800, t: ST.SIDE + .35 }, { cl: ['נָ', 'בְ', 'לָ', 'ה'], y: 1170, t: ST.SIDE + .8 }],
  hot: [{ row: 0, t0: ST.BUILD + .05, t1: ST.CONFUSE }, { row: 1, t0: ST.CONFUSE + .05, t1: ST.CHANGED + .2 }] };
const STACK = extra => (v, a, b) => KIT.STACK(v, a, b, { ...SK, ...extra });
// the stills: one slow push per still, continuous across its steps
const PL = (img, label, n0, n1, o = {}) => v => KIT.PLATE(v, { img, label, t0: ST[n0], t1: ST[n1] + TM[n1][0], y0: 300, h: 720, ...o });

// 1. HOOK: the two phrases, and the stack that holds the answer (the ringed column is the open loop)
P('HOOK', all(STG(860), L(470, a => [['“Let us build”', a + .15], ['and “let us *confuse*.”', s('HOOK', 1)]], 92), (v, a, b) => KIT.STACK(v, a, b, HK)));   // sfx: hook | write@0.15,sub1
P('APART', all(STG(860), L(470, a => [['In Hebrew, they’re', a + .1], ['*one letter* apart.', a + .1]], 92), (v, a, b) => KIT.STACK(v, a, b, { ...HK, col: { i: 2, t: ST.APART + .9 } })));   // sfx: write@0.1 | pluck@1.2
// 2. the builders' words (Gen 11:4)
P('SAY', all(STG(), PL('S1', 'builders at the brick kilns, the tower rising', 'SAY', 'COME', { inAt: ST.SAY }), L(1150, a => [['At Babel, the builders say:', a + .1]], 76), H('הָבָה נִבְנֶה', 1350, 150, s('SAY', 1), { hot: ['נִבְנֶה'] })));   // sfx: write@0.1 | heb@sub1
P('COME', all(STG(), PL('S1', 'builders at the brick kilns, the tower rising', 'SAY', 'COME'), L(1200, a => [['Come, let us *build*.', a + .1]], 88)));   // sfx: write@0.1
P('TOWER', all(STG(), PL('S2', 'the tower, its top in the sky', 'TOWER', 'TOWER', { inAt: ST.TOWER, push: [1.0, 1.06], drift: [0, 24], focus: [.5, .35] }), L(1200, a => [['A city, and a tower', a + .1], ['with its top in the *sky*.', s('TOWER', 1)]], 80)));   // sfx: write@0.1,sub1
// 3. God answers with their word (Gen 11:7)
P('ANSWER', all(STG(), PL('S3', 'the sky above the tower opens, light comes down', 'ANSWER', 'ANSWER', { inAt: ST.ANSWER, push: [1.07, 1.0] }), L(1140, a => [['Then God answers', a + .1], ['with their own *word*.', s('ANSWER', 1)]], 76), H('הָבָה', 1400, 170, s('ANSWER', 2))));   // sfx: write@0.1,sub1 | heb@sub2
P('DOWN', all(STG(), PL('S4', 'two builders face to face, no longer understood', 'DOWN', 'DOWN', { inAt: ST.DOWN }), L(1140, a => [['Come, let us go down…', a + .1], ['and *confuse*.', s('DOWN', 1)]], 76), H('וְנָבְלָה', 1400, 170, s('DOWN', 2))));   // sfx: write@0.1,sub1 | heb@sub2
// 4. side by side: the stack returns, pointed, and each word lights as it is said
P('SIDE', all(STG(900), L(470, a => [['Put them side by side.', a + .1]], 80), STACK({})));   // sfx: write@0.1 | heb@0.35,0.8
P('BUILD', all(STG(900), STACK({ gloss: [{ row: 0, s: '*Build*.', t: s('BUILD', 1), t1: ST.CONFUSE }] })));   // sfx: pluck@0.05 | write@sub1
P('CONFUSE', all(STG(900), STACK({ gloss: [{ row: 1, s: '*Confuse*.', t: s('CONFUSE', 1), t1: ST.CHANGED }] })));   // sfx: pluck@0.05 | write@sub1
// 5. THE MOMENT: the points dissolve, the ל lifts out, the נ comes down and becomes ל
P('CHANGED', all(STG(900), L(440, a => [['*One letter* changed.', a + .1], ['{נ} became {ל}.', s('CHANGED', 1)]], 80),
  STACK({ strip: { t: ST.CHANGED + .2, d: .9 }, dim: { t: ST.CHANGED + .5, keep: 2 }, gap: { row: 1, i: 2, t: ST.CHANGED + .7 }, morph: { t: s('CHANGED', 1) + .2, d: 1.6, i: 2 } })));   // sfx: write@0.1,sub1 | dissolve@0.2 | lift@0.7 | morph@sub1+0.2 | land@sub1+1.8
// 6. the name they wanted, and the name the city got (Gen 11:4, 11:9)
P('NAME', all(STG(), PL('S5', 'the unfinished tower, abandoned at dusk', 'NAME', 'CITY', { inAt: ST.NAME }), L(1170, a => [['They wanted', a + .1], ['to make a *name*.', a + .1]], 84)));   // sfx: write@0.1
P('CITY', all(STG(), PL('S5', 'the unfinished tower, abandoned at dusk', 'NAME', 'CITY'), L(1140, a => [['The city got one:', a + .1]], 78),
  H('בָּבֶל', 1390, 220, s('CITY', 1), { hot: [], hotLetter: { word: 'בָּבֶל', idx: 2, at: s('CITY', 1) + .8 } }),
  v => { const l = KIT.lastLetter; if (l && v >= s('CITY', 1) + .8) KIT.RING(l.x, l.y - 8, 84, 116, v, s('CITY', 1) + .85, { glow: .9 }); }));   // sfx: write@0.1 | heb@sub1 | pluck@sub1+0.8
// 7. END VERSE, alone (Gen 11:9 has the Divine Name: English only)
const ENDV = (v, a, b) => KIT.ENDVERSE(v, a, b, { ref: 'Genesis 11:9', en: ['“Because there, God *confused*', 'the language of all the earth.”'], es: 70, enAt: .1, enStep: TM['END VERSE'][1] - .1 });
P('END VERSE', ENDV);   // sfx: endsoft
// 8. the posted logo outro
P('LOGO', (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - TM['END VERSE'][0], pb: a, next: KIT.LOGO }));   // sfx: logo
