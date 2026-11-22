// Cover for s24 (Babel): the posted covers' recipe: big statement in the Shorts face with the key word in red, the video's one graphic
// (נבנה over נבלה, letter over letter, the ל ringed with the glowing circle: the "look here" cue), INK OF SINAI small at the bottom, on parchment.
// The cover text adds a second hook and does not repeat the title.
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
addP('COVER', 2, (v, a, b) => {
  KIT.STAGE(v, -5, { cx: 540, cy: 1000 });
  KIT.CY = 470; KIT.LINES(v, a, b, { lines: [['Their own *word*.', -5]], size: 132 }); KIT.CY = undefined;
  KIT.STACK(v, a, b, { size: 270, cw: 232, bare: true, rows: [{ cl: ['נ', 'ב', 'נ', 'ה'], y: 940, t: -9 }, { cl: ['נ', 'ב', 'ל', 'ה'], y: 1360, t: -9 }],
    red: { row: 1, i: 2 }, gap: { row: 1, i: 2, t: -99 }, morph: { t: -99, d: 1, i: 2 } });
  KIT.rich('INK OF SINAI', 540, 1700, 66, v, { caps: true, ls: 10, color: KIT.INK(.6), plain: true });
});
