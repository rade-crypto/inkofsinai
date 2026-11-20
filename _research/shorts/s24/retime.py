#!/usr/bin/env python3
"""Times s24 to the owner's voiceover. Reads vo_marks.txt (VO-clock seconds for each line and each later part of a line), rewrites the
/*TIMING*/ block in scenes.js, so every step, every Hebrew word and every sub-line lands where it is spoken. mk_cues.py reads the same block.
Video clock = VO clock + LEAD (the VO starts LEAD s into the video). The closing verse holds HOLD s after the last word, then the logo outro (3.25 s).
Usage: python3 retime.py s24 [LEAD=0.3] [HOLD=1.8]   then: python3 mk_cues.py s24 ; python3 synth_s24.py s24/cues.json mix.wav vo.wav LEAD ; node engine/render.cjs video out.mp4 mix.wav"""
import json, re, sys
B = sys.argv[1].rstrip('/'); LEAD = float(sys.argv[2]) if len(sys.argv) > 2 else .3; HOLD = float(sys.argv[3]) if len(sys.argv) > 3 else 1.8
marks = {}
for ln in open(f'{B}/vo_marks.txt', encoding='utf-8'):
    ln = ln.split('#')[0].strip()
    if ln: *name, t = ln.split(); marks[' '.join(name)] = float(t) + LEAD
src = open(f'{B}/scenes.js', encoding='utf-8').read()
TM = json.loads(re.search(r'/\*TIMING\*/(.*?)/\*END\*/', src, re.S).group(1)); steps = list(TM)
starts = [0.0] + [marks[n] - .12 for n in steps[1:]] + [marks['END'] + HOLD]   # cut just before each line is spoken
new = {}
for i, n in enumerate(steps):
    subs = sorted((k, v) for k, v in marks.items() if k.startswith(n + '.'))
    new[n] = [round(starts[i + 1] - starts[i], 2)] + [round(v - starts[i] - .05, 2) for _, v in subs]   # text lands a hair before the word
    assert len(new[n]) == len(TM[n]), f'{n}: expected {len(TM[n]) - 1} sub-marks, got {len(new[n]) - 1}'
    assert new[n][0] > 0.8, f'{n}: step only {new[n][0]} s'
out = re.sub(r'/\*TIMING\*/.*?/\*END\*/', '/*TIMING*/' + json.dumps(new, ensure_ascii=False) + '/*END*/', src, flags=re.S)
open(f'{B}/scenes.js', 'w', encoding='utf-8').write(out)
print('retimed:', ', '.join(f'{n} {v[0]}' for n, v in new.items()), '| total', round(sum(v[0] for v in new.values()) + 3.25, 2), 's')
