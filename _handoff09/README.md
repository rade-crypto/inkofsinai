# Video 09 handoff

Where each folder came from (the scripts use these absolute paths):

- `b09p/` = /tmp/claude-0/lf12/b09p: scenes09p.js (current scene code), build09p.py (`full` / `render` / `min1`), render.cjs, render_all.sh, stills.cjs, shoot.cjs, mixfull.py (SFX mix → mixfull.mp3), img/ (cut-outs), parts/ (backups), review_text_timing.md (the 3 text reviewer reports)
- `b09/` = /tmp/claude-0/lf12/b09: lib.js, words.js (VO word timings), render_ui09.js, mix09.mp3 (VO + music bed, input to mixfull.py), vo16.wav
- `b06_v2/` = /tmp/claude-0/lf12/b06/v2: fonts_embed06.css, render_lib.js
- `vo_words.txt` = every VO word with its start time (VO clock; video time = VO + 0.4 s)
- `09_shots/` = source PNGs of the generated images

State: the text-timing fixes in review_text_timing.md are NOT applied yet. The only change after those reviews is in drawAt (scenes09p.js): at each shot change, old text now fades out before the cut and new text fades in just after it.
