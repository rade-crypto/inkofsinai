# s24 Babel: build files

Approved script, one step per line. Every timing lives in the `/*TIMING*/` block at the top of scenes.js.

The voiceover isn't recorded yet. Once it is, time everything to it:
1. Put the line starts into `vo_marks.txt`, on the VO file's own clock.
2. Run `python3 retime.py .` to rewrite the timing block.
3. Run `python3 mk_cues.py .` to rebuild cues.json.
4. Run `python3 synth_s24.py cues.json mix.wav vo.wav 0.3`: the score, ducked under the VO.
5. Run `node engine/render.cjs video ../s24_babel.mp4 mix.wav` to render the final video.

Stills: put S1–S5 into `img/` (prompts in `../s24_fal_prompts.md`, JSON in `fal/`). Without them, the render draws labelled placeholders.

Engine setup:
- Run `cd engine && npm i opentype.js flubber` (only needed to rebuild morph_data.js).
- Playwright and Chromium are already installed in the cloud container.

Other commands:
- `node engine/render.cjs cover ../s24_cover.png` renders the cover.
- `node engine/render.cjs frames sheet.png 2,10,33` renders a contact sheet for review.
- The render prints a warning if anything leaves the 9:16 safe zone (x 90–990, y 250–1560).
