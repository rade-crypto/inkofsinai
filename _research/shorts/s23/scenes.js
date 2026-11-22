// Short s23 "He counts the stars, and the verse right before it is about you" (text-only, parchment Shorts kit). Nov 20, 2026. Replaces the Psalm 119 cut (no point).
// WLC (tools/wlc.py): Gen 15:5 וּסְפֹר הַכּוֹכָבִים אִם־תּוּכַל לִסְפֹּר אֹתָם; Jer 33:22 אֲשֶׁר לֹא־יִסָּפֵר צְבָא הַשָּׁמַיִם; Ps 147:4 מוֹנֶה מִסְפָּר לַכּוֹכָבִים לְכֻלָּם שֵׁמוֹת יִקְרָא,
// and the verse right before it, Ps 147:3 הָרֹפֵא לִשְׁבוּרֵי לֵב וּמְחַבֵּשׁ לְעַצְּבוֹתָם; Isa 40:26 … לְכֻלָּם בְּשֵׁם יִקְרָא … אִישׁ לֹא נֶעְדָּר (נעדר occurs only here in Isaiah),
// 40:27 לָמָּה תֹאמַר יַעֲקֹב … נִסְתְּרָה דַרְכִּי מֵה׳ (shown as the fragment נִסְתְּרָה דַרְכִּי), 40:28 … אֵין חֵקֶר לִתְבוּנָתוֹ. No Divine Name on screen.
// Through-line: KIT.STARS (new): a field of stars as ink dots that is counted, named, and has one star that is yours.
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
document.fonts.load("500 80px 'Frank Ruhl Libre'", 'Abc 123'); document.fonts.load("italic 400 80px 'Newsreader'", 'Abc 123');
let T = 0; const P = (n, d, f) => { addP(n, d, f); T += d; };
const txt = (cy, f) => (v, a, b) => { KIT.CY = cy; try { f(v, a, b); } finally { KIT.CY = undefined; } };
const L = (cy, lines, size) => txt(cy, (v, a, b) => KIT.LINES(v, a, b, { lines: lines(a), ...(size ? { size } : {}) }));
const V = (cy, o) => txt(cy, (v, a, b) => KIT.VERSE(v, a, b, { enAt: a + .6, refAt: a + 1.0, ...o }));
const ST = { n: 190, y0: 930, y1: 1400, appear: { t: .4, d: 2.6 }, me: { x: 400, y: 1180 }, stage: false };
const S = (extra, f) => (v, a, b) => { KIT.STAGE(v, a, { cx: 540, cy: 760 }); KIT.STARS(v, a, b, { ...ST, ...extra }); f(v, a, b); };

// 1. HOOK: the stars land with a running count
P('HOOK', 4.6, S({ count: { t: .4 } }, L(480, a => [['God told Abraham', a], ['to count the stars.', a + .7]], 96)));   // sfx: hook | write@0.1,0.8 | tick*14@0.4:0.17
// 2. Genesis 15:5, clause by clause
P('GEN', 3.8, S({}, V(560, { ref: 'Genesis 15:5', heb: 'וּסְפֹר הַכּוֹכָבִים', hot: [['וּסְפֹר', T + .9]], hotAt: T + 1.0, en: ['“*Count* the stars…”'] })));   // sfx: verse
// 3. nobody can
P('JER-A', 3.0, S({}, V(560, { ref: 'Jeremiah 33:22', heb: 'לֹא־יִסָּפֵר', hot: [['לֹא־יִסָּפֵר', T + 1.0]], hotAt: T + 1.1, en: ['“…*cannot be counted*,”'] })));   // sfx: verse
P('JER-B', 3.0, S({}, V(560, { ref: 'Jeremiah 33:22', heb: 'צְבָא הַשָּׁמַיִם', hot: [['הַשָּׁמַיִם', T + 1.0]], hotAt: T + 1.1, en: ['“the host of heaven.”'] })));   // sfx: write@0.1
// 4. but He counts them, and names every one
ST.names = { t: T + 1.6, d: 4.6 };
P('PS147-A', 3.2, S({}, V(560, { ref: 'Psalm 147:4', heb: 'מוֹנֶה מִסְפָּר', hot: [['מוֹנֶה', T + 1.2]], hotAt: T + 1.3, en: ['“He *counts* the number”'] })));   // sfx: verse | pluck@1.2
P('PS147-A2', 2.6, S({}, V(560, { ref: 'Psalm 147:4', heb: 'לַכּוֹכָבִים', hot: [['לַכּוֹכָבִים', T + .8]], hotAt: T + .9, en: ['“of the *stars*;”'] })));   // sfx: write@0.1
P('PS147-B', 4.0, S({}, V(560, { ref: 'Psalm 147:4', heb: 'לְכֻלָּם שֵׁמוֹת יִקְרָא', hot: [['שֵׁמוֹת', T + 1.2]], hotAt: T + 1.3, en: ['“He gives all of them', '*names*.”'] })));   // sfx: write@0.1 | tick*40@0:0.1
P('ISA-26', 3.8, S({}, V(560, { ref: 'Isaiah 40:26', heb: 'אִישׁ לֹא נֶעְדָּר', hot: [['נֶעְדָּר', T + 1.2]], hotAt: T + 1.3, en: ['“…not one', 'is *missing*.”'] })));   // sfx: verse
// 5. so why say "my way is hidden"? one star is you
ST.ring = { t: T + 1.8 };
P('ISA-27', 4.6, S({}, V(560, { ref: 'Isaiah 40:27', heb: 'נִסְתְּרָה דַרְכִּי', hot: [['נִסְתְּרָה', T + 1.2]], hotAt: T + 1.3, en: ['“Why do you say,', '‘My way is *hidden*’?”'] })));   // sfx: verse | pluck@1.8
// 6. the verse right before the stars
P('LOOK', 3.0, S({}, L(500, a => [['Now read the verse', a], ['right before the stars.', a + .6]], 92)));   // sfx: write@0,0.6
P('HEAL-A', 3.4, S({}, V(560, { ref: 'Psalm 147:3', heb: 'הָרֹפֵא לִשְׁבוּרֵי לֵב', hot: [['הָרֹפֵא', T + 1.0]], hotAt: T + 1.1, en: ['“He *heals* the', 'brokenhearted,”'] })));   // sfx: verse
P('HEAL-B', 3.6, S({}, V(560, { ref: 'Psalm 147:3', heb: 'וּמְחַבֵּשׁ לְעַצְּבוֹתָם', hot: [['וּמְחַבֵּשׁ', T + 1.0]], hotAt: T + 1.1, en: ['“and *binds up*', 'their wounds.”'] })));   // sfx: write@0.1
// 7. the point
P('POINT', 4.8, S({}, L(500, a => [['The One who counts the stars', a], ['is the One who binds', a + .8], ['your *wounds*.', a + 1.5]], 86)));   // sfx: write@0,0.8,1.5 | pluck@1.6
// 8. END VERSE, alone
const ENDV = (v, a, b) => KIT.ENDVERSE(v, a, b, { ref: 'Isaiah 40:28', heb: 'אֵין חֵקֶר לִתְבוּנָתוֹ', hot: ['לִתְבוּנָתוֹ'], en: ['“His understanding', 'cannot be searched out.”'], hs: 170 });
P('END VERSE', 7.0, (v, a, b) => { if (v < a + .8) { KIT.X.save(); KIT.X.globalAlpha = 1 - KIT.sm((v - a) / .8); KIT.STARS(v, a, b, { ...ST, stage: false }); KIT.X.restore(); } ENDV(v, a, b); });   // sfx: endsoft
// 9. the posted logo outro
P('LOGO', 3.25, (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - 7.0, pb: a, next: KIT.LOGO }));   // sfx: logo
