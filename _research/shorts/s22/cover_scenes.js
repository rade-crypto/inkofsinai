// Cover for s22 (Psalm 119, one letter says "good" five times): the posted covers' recipe: big title in the Shorts face with the turn in red, the video's one graphic (176 verse-dots in 22 columns, the ט column scarlet), INK OF SINAI small at the bottom, on parchment.
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
document.fonts.load("500 80px 'Frank Ruhl Libre'", 'Abc 123');
addP('COVER', 2, (v, a, b) => {
  KIT.STAGE(v, -5, { cx: 540, cy: 900 });
  KIT.CY = 430; KIT.LINES(v, a, b, { lines: [['One letter in Psalm 119', -5], ['says “*good*” five times.', -5]], size: 100 }); KIT.CY = undefined;
  KIT.ACROSTIC(v, a, b, { dotsAt: -5, dotStep: 0, lettersAt: -5, letterStep: 0, focus: { ch: 'ט', t: -5 }, cy: 1060, stage: false });
  KIT.rich('INK OF SINAI', 540, 1700, 66, v, { caps: true, ls: 10, color: KIT.INK(.6) });
});
