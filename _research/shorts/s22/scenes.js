// Short s22 "Psalm 119 is written like an alphabet, and one letter says 'good' five times" (text-only, parchment Shorts kit). Nov 20, 2026. v2: redesigned around its own picture.
// WLC (tools/wlc.py): Ps 119 = 176 verses, the longest chapter of the Tanakh (next: Num 7, 89); 22 sections x 8 verses; every verse starts with its section's letter (176/176);
// the ט section (119:65–72): vv. 65 טוֹב, 66 טוּב, 68 טוֹב־, 71 טוֹב־, 72 טוֹב־ open with "good" (other openings: 67 טֶרֶם before, 69 טָפְלוּ smeared, 70 טָפַשׁ dull; no other letter repeats an opening word more than 4 times).
// vv. 67, 71 speak of being afflicted. No Divine Name on screen (Hebrew fragments only). Plain words for the viewer: "section", not "stanza".
// Through-line: KIT.ACROSTIC (new): one dot per verse, 22 columns of 8, the ט column stands out; it opens into the eight verse openings (WORDTABLE); the page dims lightly for the pain verses and lifts for the last line.
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
document.fonts.load("500 80px 'Frank Ruhl Libre'", 'Abc 123'); document.fonts.load("italic 400 80px 'Newsreader'", 'Abc 123');
let T = 0; const P = (n, d, f) => { addP(n, d, f); T += d; };
const txt = (cy, f) => (v, a, b) => { KIT.CY = cy; try { f(v, a, b); } finally { KIT.CY = undefined; } };
const L = (cy, lines, size) => txt(cy, (v, a, b) => KIT.LINES(v, a, b, { lines: lines(a), ...(size ? { size } : {}) }));
const V = (cy, o) => txt(cy, (v, a, b) => KIT.VERSE(v, a, b, { enAt: a + .6, refAt: a + 1.0, ...o }));
const AC = { dotsAt: .4, dotStep: .016, stage: false };            // absolute times are filled in below
const DIMO = { from: 1e9, to: 1e9, k: .13 };
const G = f => (v, a, b) => { KIT.DIM(v, DIMO); KIT.STAGE(v, a, { cx: 540, cy: 760 }); KIT.ACROSTIC(v, a, b, AC); f(v, a, b); };

// 1. HOOK: the picture draws itself: 176 dots, one per verse
P('HOOK', 4.6, G(L(470, a => [['The longest chapter in the Bible', a], ['is written like an alphabet.', a + .7]], 84)));   // sfx: hook | write@0.1,0.8 | tick*16@0.4:0.17
// 2. 22 sections, 8 verses each
AC.lettersAt = T + .6;
P('SECTIONS', 4.6, G(L(470, a => [['176 verses, in 22 sections:', a], ['one for each Hebrew letter.', a + .9]], 84)));   // sfx: write@0,0.9 | tick*22@0.6:0.05
// 3. every verse starts with its letter
AC.sweep = { t: T + 1.3, step: .13 };
P('RULE', 4.8, G(L(470, a => [['Every verse in a section', a], ['starts with that section’s letter.', a + .9]], 82)));   // sfx: write@0,0.9 | tick*22@1.3:0.13
// 4. the ninth letter says "good"
AC.focus = { ch: 'ט', t: T + .5 };
P('NINTH', 4.2, G(L(470, a => [['One letter stands out:', a], ['it starts the word “*good*.”', a + .8]], 88)));   // sfx: write@0,0.8 | pluck@0.5
// 5. five of eight
P('FIVE', 2.8, L(560, a => [['Five of its eight verses', a], ['begin with that word.', a + .6]], 92));   // sfx: write@0,0.6
// 6. the eight verse openings (65–72)
const OP = [['טוֹב', 'good', 1], ['טוּב', 'good', 1], ['טֶרֶם', 'before', 0], ['טוֹב', 'good', 1], ['טָפְלוּ', 'smeared', 0], ['טָפַשׁ', 'dull', 0], ['טוֹב', 'good', 1], ['טוֹב', 'good', 1]];
P('OPENINGS', 7.4, (v, a, b) => KIT.WORDTABLE(v, a, b, { posted: true, hs: 108, rowH: 132, cy: 850, cols: [{ head: 'Opens' }],
  rows: OP.map((r, i) => ({ name: '', t: a + .5 + i * .65, cells: [{ heb: r[0], t: a + .5 + i * .65, hot: !!r[2] }] })) }));   // sfx: tick*3@0.5 | pluck*5
// 7. the pain verses: the page dims a little
DIMO.from = T + .3;
P('IN71', 2.8, (v, a, b) => { KIT.DIM(v, DIMO); L(580, a => [['In verse 71, the writer says:', a]], 92)(v, a, b); });   // sfx: write@0
P('PS119-71A', 4.4, (v, a, b) => { KIT.DIM(v, DIMO); V(600, { ref: 'Psalm 119:71', heb: 'טוֹב־לִי כִי־עֻנֵּיתִי', hot: [['טוֹב', T + 1.2]], hotAt: T + 1.3, en: ['“It was *good* for me', 'that I was afflicted,”'] })(v, a, b); });   // sfx: verse
P('PS119-71B', 3.8, (v, a, b) => { KIT.DIM(v, DIMO); V(600, { ref: 'Psalm 119:71', heb: 'לְמַעַן אֶלְמַד חֻקֶּיךָ', hot: [['אֶלְמַד', T + 1.0]], hotAt: T + 1.1, en: ['“so that I would', '*learn* Your laws.”'] })(v, a, b); });   // sfx: write@0.1
P('WHY', 3.4, (v, a, b) => { KIT.DIM(v, DIMO); L(580, a => [['How can pain be good?', a], ['He answers in verse 67:', a + .8]], 90)(v, a, b); });   // sfx: write@0,0.8
P('PS119-67', 4.2, (v, a, b) => { KIT.DIM(v, DIMO); V(600, { ref: 'Psalm 119:67', heb: 'טֶרֶם אֶעֱנֶה אֲנִי שֹׁגֵג', hot: [['שֹׁגֵג', T + 1.3]], hotAt: T + 1.4, en: ['“Before I was afflicted,', 'I *went astray*…”'] })(v, a, b); });   // sfx: verse
// 8. END VERSE: the light comes back
DIMO.to = T + .2;
const ENDV = (v, a, b) => { KIT.DIM(v, DIMO); KIT.ENDVERSE(v, a, b, { ref: 'Psalm 119:68', heb: 'טוֹב־אַתָּה וּמֵטִיב', hot: ['טוֹב', 'וּמֵטִיב'], en: ['“You are *good*,', 'and You do *good*.”'], hs: 190 }); };
P('END VERSE', 7.4, ENDV);   // sfx: endsoft
// 9. the posted logo outro
P('LOGO', 3.25, (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - 7.4, pb: a, next: KIT.LOGO }));   // sfx: logo
