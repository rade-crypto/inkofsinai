// Cover for s23 ("He counts the stars"): the posted covers' recipe: big title in the Shorts face with the turn in red, the video's one graphic (the star field, every star named, one of them ringed), INK OF SINAI small at the bottom, on parchment.
KIT.F.g = KIT.F.c = "'Frank Ruhl Libre'"; KIT.F.i = "'Newsreader'";
document.fonts.load("500 80px 'Frank Ruhl Libre'", 'Abc 123');
addP('COVER', 2, (v, a, b) => {
  KIT.STAGE(v, -5, { cx: 540, cy: 900 });
  KIT.CY = 470; KIT.LINES(v, a, b, { lines: [['He counts the stars.', -5], ['He heals the *brokenhearted*.', -5]], size: 92 }); KIT.CY = undefined;
  KIT.STARS(v, a, b, { n: 210, y0: 800, y1: 1440, appear: { t: -9, d: 1 }, names: { t: -9, d: 1 }, ring: { t: -9 }, me: { x: 400, y: 1130 }, stage: false });
  KIT.rich('INK OF SINAI', 540, 1700, 66, v, { caps: true, ls: 10, color: KIT.INK(.6) });
});
