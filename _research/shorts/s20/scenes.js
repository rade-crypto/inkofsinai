// Short s20 "Hallelujah is in one book, and the last line of that book is a breath" (text-only, parchment Shorts kit). Nov 20, 2026.
// Script: owner's Reel 5 outline, optimised. WLC (tools/wlc.py): הַלְלוּ־יָהּ occurs 24 times, all in Psalms; Ps 146–150 each open (146:1, 147:1, 148:1, 149:1, 150:1) and close
// (146:10, 147:20, 148:14, 149:9, 150:6) with it. Psalm 150 has 13 praise words in six verses (12 הַלְלוּ forms + תְּהַלֵּל in 150:6), 9 of them הַלְלוּהוּ.
// Gen 2:7 נִשְׁמַת חַיִּים (construct of נְשָׁמָה); Ps 150:6 is the last verse of the book. The Divine Name never appears on screen (Hebrew fragments only; יָהּ is the short form).
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
document.fonts.load("500 80px 'Frank Ruhl Libre'", 'Abc 123'); document.fonts.load("italic 400 80px 'Newsreader'", 'Abc 123');
let T = 0; const P = (n, d, f) => { addP(n, d, f); T += d; };

// 1. HOOK: the claim in two lines, the Hebrew word as the proof
P('HOOK', 4.2, (v, a, b) => KIT.HOOK(v, a, b, { lines: [['“Hallelujah” appears', a], ['24 times, all in *Psalms*.', a + .7]], size: 100, word: { heb: 'הַלְלוּ־יָהּ', t: a + 1.7, hs: 170 } }));   // sfx: hook | write@0.1,0.8

// 2. what the word says
P('WORD', 4.4, (v, a, b) => KIT.WORD(v, a, b, { heb: 'הַלְלוּ־יָהּ', gloss: [['“Praise God.”', a + 1.0]], hotAt: a + 1.1, hs: 250 }));   // sfx: write@0.2

// 3. the last five psalms
P('LAST5', 2.8, (v, a, b) => KIT.LINES(v, a, b, { lines: [['The last five psalms', a], ['*open* and *close* with it.', a + .6]], size: 92 }));   // sfx: write@0,0.6
P('LAST5-T', 6.4, (v, a, b) => KIT.WORDTABLE(v, a, b, { posted: true, cols: [{ head: 'Opens' }, { head: 'Closes' }],
  rows: [146, 147, 148, 149, 150].map((p, i) => ({ name: String(p), t: a + .8 + i * .75, cells: [{ en: 'Hallelujah', t: a + 1.0 + i * .75 }, { en: 'Hallelujah', t: a + 1.25 + i * .75 }] })) }));   // sfx: tick*5@1.0:0.75

// 4. Psalm 150 says “praise” 13 times in six verses: one example, then the count
P('SAYS', 2.8, (v, a, b) => KIT.LINES(v, a, b, { lines: [['Psalm 150 says “praise”', a], ['in just six verses.', a + .6]], size: 92 }));   // sfx: write@0,0.6
P('PS150-3', 4.2, (v, a, b) => KIT.VERSE(v, a, b, { ref: 'Psalm 150:3', heb: 'בְּתֵקַע שׁוֹפָר', hot: [['שׁוֹפָר', a + 1.3]], hotAt: a + 1.4, en: ['“Praise Him with the blast', 'of the *shofar*…”'], enAt: a + .8, refAt: a + 1.2 }));   // sfx: verse

P('TALLY', 6.4, (v, a, b) => KIT.TALLY(v, a, b, { marks: [...Array(13)].map((_, i) => a + .8 + i * .38), label: '“Praise”', labelAt: a + .5, sp: 54, gsp: 90 }));   // sfx: tick*13@0.8:0.38

// 6. the thirteenth belongs to everything that breathes
P('BREATH', 3.6, (v, a, b) => KIT.LINES(v, a, b, { lines: [['The last verse says who praises:', a], ['everything that has *breath*.', a + .8]], size: 84 }));   // sfx: write@0,0.7
P('NESHAMA', 4.2, (v, a, b) => KIT.WORD(v, a, b, { heb: 'נְשָׁמָה', gloss: [['“breath”', a + 1.0]], hotAt: a + 1.1, ref: 'Psalm 150:6', refAt: a + 1.5, hs: 260 }));   // sfx: boom@1.0 | write@0.2
P('ADAM', 3.6, (v, a, b) => KIT.LINES(v, a, b, { lines: [['It is the word for the breath', a], ['God blew into the first *man*.', a + .8]], size: 84 }));   // sfx: write@0,0.8

// 7. the same word, Genesis 2:7 and the last verse of the Psalms
P('MATCH', 7.4, (v, a, b) => KIT.MATCH(v, a, b, { top: { ref: 'Gen 2:7', heb: 'נִשְׁמַת חַיִּים', en: 'the breath of life' }, bottom: { ref: 'Ps 150:6', heb: 'כֹּל הַנְּשָׁמָה', en: 'all that has breath' },
  word: ['נִשְׁמַת', 'הַנְּשָׁמָה'], enWord: ['breath', 'breath'], t2: a + 1.9, at: a + 3.6 }));   // sfx: write@0.1,2.0 | chime@3.6

// 8. the turn: what it means
P('MEANS', 4.0, (v, a, b) => KIT.LINES(v, a, b, { lines: [['The breath God gave at the start', a], ['is the breath the Psalms *end* on.', a + 1.0]], size: 84 }));   // sfx: write@0,1.0

// 9. END VERSE, alone
const ENDV = (v, a, b) => KIT.ENDVERSE(v, a, b, { ref: 'Psalm 150:6', heb: 'כֹּל הַנְּשָׁמָה תְּהַלֵּל', hot: ['הַנְּשָׁמָה'], en: ['“Let everything that has', '*breath* praise…”'], hs: 140 });
P('END VERSE', 6.2, ENDV);   // sfx: endsoft

// 10. the posted logo outro
P('LOGO', 3.25, (v, a, b) => KIT.ROLLTO(v, a, b, { prev: ENDV, pa: a - 6.2, pb: a, next: KIT.LOGO }));   // sfx: logo
