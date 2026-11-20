// Cover for s21 (Psalm 119, "good" five times): the posted covers' recipe: big title in the Shorts face with the turn in red, the video's one graphic (the word טוֹב), INK OF SINAI small at the bottom, on parchment.
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
document.fonts.load("500 80px 'Frank Ruhl Libre'", 'Abc 123');
addP('COVER', 2, (v, a, b) => {
  KIT.STAGE(v, -5, { cx: 540, cy: 900 });
  KIT.CY = 520; KIT.LINES(v, a, b, { lines: [['Five verses', -5], ['in Psalm 119', -5], ['open with “*good*.”', -5]], size: 124 }); KIT.CY = undefined;
  KIT.heb('טוֹב', 540, 1230, 260, v, { hot: ['טוֹב'], hotAt: -5 });
  KIT.rich('INK OF SINAI', 540, 1580, 66, v, { caps: true, ls: 10, color: KIT.INK(.6) });
});
