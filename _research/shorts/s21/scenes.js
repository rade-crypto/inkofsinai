// Short s21 "Psalm 119: the longest chapter has one stanza that opens 'good' five times" (text-only, parchment Shorts kit). Nov 20, 2026.
// WLC (tools/wlc.py): Ps 119 = 176 verses, the longest chapter of the Tanakh (next: Num 7, 89); 22 stanzas x 8 verses, every verse starts with its stanza's letter (176/176);
// the ט stanza (119:65–72): vv. 65 טוֹב, 66 טוּב, 68 טוֹב־, 71 טוֹב־, 72 טוֹב־ open with "good" (no other stanza repeats an opening word more than 4 times: ד has דֶּרֶךְ ×4);
// v. 67 טֶרֶם אֶעֱנֶה אֲנִי שֹׁגֵג, v. 68 טוֹב־אַתָּה וּמֵטִיב, v. 71 טוֹב־לִי כִי־עֻנֵּיתִי לְמַעַן אֶלְמַד חֻקֶּיךָ. No Divine Name on screen (hebrew fragments only).
// Through-line: KIT.ALEFBET (the 22 letters) under the first four beats; ט lights when the stanza is named.
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
document.fonts.load("500 80px 'Frank Ruhl Libre'", 'Abc 123'); document.fonts.load("italic 400 80px 'Newsreader'", 'Abc 123');
let T = 0; const P = (n, d, f) => { addP(n, d, f); T += d; };
const txt = (cy, f) => (v, a, b) => { KIT.CY = cy; try { f(v, a, b); } finally { KIT.CY = undefined; } };
const L = (cy, lines, size) => txt(cy, (v, a, b) => KIT.LINES(v, a, b, { lines: lines(a), ...(size ? { size } : {}) }));
const V = (cy, o) => txt(cy, (v, a, b) => KIT.VERSE(v, a, b, { enAt: a + .6, refAt: a + 1.0, ...o }));
const ABC = 'אבגדהוזחטיכלמנסעפצקרשת', GCY = 1215;
const AB = { hotT: {}, flash: {}, mark: { ch: 'ט', t: 1e9 }, dimAll: null, glowCh: null };
const ALEF = (v, a, b) => KIT.ALEFBET(v, a, b, { t: .4, step: .06, cy: GCY, size: 96, sp: 80, ...AB, stage: false });
const W = f => (v, a, b) => { KIT.STAGE(v, a, { cx: 540, cy: 640 }); ALEF(v, a, b); f(v, a, b); };

// 1. HOOK: the insight first
P('HOOK', 4.6, W(L(620, a => [['In the Bible’s longest chapter,', a], ['five verses open “*good*.”', a + .8]], 92)));   // sfx: hook | write@0.1,0.9
// 2. the pain
P('PAIN', 3.6, W(L(620, a => [['And it is the stanza', a], ['where he talks about his *pain*.', a + .7]], 88)));   // sfx: write@0,0.7
// 3. how it is built: 22 stanzas, one per letter
ABC.split('').forEach((ch, i) => AB.flash[ch] = [T + .3 + i * .11]);
AB.hotT['ט'] = T + 3.0; AB.glowCh = { ch: 'ט', t: T + 3.0 };
P('BUILT', 4.6, W(L(620, a => [['It is built like an alphabet:', a], ['22 stanzas, one for each letter.', a + .9]], 84)));   // sfx: write@0,0.8,1.5 | tick*22@0.3:0.11
// 4. the ninth letter
AB.mark = { ch: 'ט', t: T + .4, until: T + 3.6 };
P('NINTH', 3.6, W(L(620, a => [['In the ninth stanza, every verse', a], ['starts with the letter of *good*.', a + .9]], 84)));   // sfx: write@0,0.7
// 5. five times
P('FIVE', 2.6, L(560, a => [['Five times, a verse', a], ['begins: “*good*.”', a + .6]], 100));   // sfx: write@0,0.6
// 6. טוֹב five times, one landing after another (verses 65, 66, 68, 71, 72)
P('TABLE', 5.2, (v, a, b) => KIT.WORDTABLE(v, a, b, { posted: true, hs: 112, cols: [{ head: 'Good' }],
  rows: ['טוֹב', 'טוּב', 'טוֹב', 'טוֹב', 'טוֹב'].map((h, i) => ({ name: '', t: a + .5 + i * .75, cells: [{ heb: h, t: a + .5 + i * .75 }] })) }));   // sfx: tick*5@0.5:0.75
// 7. verse 71, card by card
P('PS119-71A', 4.4, V(600, { ref: 'Psalm 119:71', heb: 'טוֹב־לִי כִי־עֻנֵּיתִי', hot: [['טוֹב', T + 1.2]], hotAt: T + 1.3, en: ['“It was *good* for me', 'that I was afflicted,”'] }));   // sfx: verse
P('PS119-71B', 3.8, V(600, { ref: 'Psalm 119:71', heb: 'לְמַעַן אֶלְמַד חֻקֶּיךָ', hot: [['אֶלְמַד', T + 1.0]], hotAt: T + 1.1, en: ['“so that I would', '*learn* Your laws.”'] }));   // sfx: write@0.1
// 8. the answer to "how can pain be good?"
P('WHY', 4.6, L(580, a => [['He doesn’t call the pain good.', a], ['He calls it good because', a + .9], ['it brought him *back*.', a + 1.6]], 88));   // sfx: write@0,0.9,1.6
P('PS119-67', 4.2, V(600, { ref: 'Psalm 119:67', heb: 'טֶרֶם אֶעֱנֶה אֲנִי שֹׁגֵג', hot: [['שֹׁגֵג', T + 1.3]], hotAt: T + 1.4, en: ['“Before I was afflicted,', 'I *went astray*…”'] }));   // sfx: verse
// 9. END VERSE, alone, held
const ENDV = (v, a, b) => KIT.ENDVERSE(v, a, b, { ref: 'Psalm 119:68', heb: 'טוֹב־אַתָּה וּמֵטִיב', hot: ['טוֹב', 'וּמֵטִיב'], en: ['“You are *good*,', 'and You do *good*.”'], hs: 190 });
P('END VERSE', 7.4, ENDV);   // sfx: endsoft
// 10. the posted logo outro
P('LOGO', 3.25, (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - 7.4, pb: a, next: KIT.LOGO }));   // sfx: logo
