#!/usr/bin/env python3
"""s21 Psalm 119 cue sheet (the posted Shorts' palette via synth_ep9.py: D-major pad, plucks, quill, soft cut whoosh), sparse, no risers, no bells.
Usage: python3 mk_cues.py engine/lf12/s21 -> cues.json ; then synth_ep9.py cues.json mix.wav"""
import json, re, sys
B = sys.argv[1].rstrip('/')
st = {}; t = 0
for m in re.finditer(r"^P\('([^']+)', ([0-9.]+)", open(f'{B}/scenes.js').read(), re.M): st[m.group(1)] = t; t += float(m.group(2))
DUR = round(t, 2); c = []
def add(ty, at, **k): c.append(dict(type=ty, t=round(max(0, at), 3), **k))
def q(n, *ts, d=.5, v=.3): [add('quill', st[n] + x, d=d, v=v) for x in ts]
def pl(n, x, *notes, v=.26): [add('pluck', st[n] + x + i * .1, note=nt, v=v - i * .04) for i, nt in enumerate(notes)]
for n in list(st)[1:]: add('whoosh', st[n] - .15, d=.7, v=.18)
q('HOOK', .1, .9); q('PAIN', 0, .7); q('BUILT', 0, .9)
for i in range(22): add('tick', st['BUILT'] + .3 + i * .11, v=.28)
pl('BUILT', 3.0, 'A4', 'D4'); q('NINTH', 0, .9); q('FIVE', 0, .6)
for i in range(5): add('tick', st['TABLE'] + .5 + i * .75, v=.42)
pl('TABLE', .5 + 4 * .75 + .1, 'D4', 'A4')
q('PS119-71A', .1); add('swell', st['PS119-71A'] + .4, d=1.6); pl('PS119-71A', 1.3, 'A4')
q('PS119-71B', .1); pl('PS119-71B', 1.1, 'D4')
q('WHY', 0, .9, 1.6); q('PS119-67', .1); pl('PS119-67', 1.4, 'D4')
x = st['END VERSE']; add('swell', x + .2, d=2.6); add('quill', x + .3, d=.9, v=.3); pl('END VERSE', 2.5, 'D4', 'A4', v=.32); pl('END VERSE', 3.7, 'A4', 'D5', v=.26)
x = st['LOGO']; add('roll', x, d=.7); add('quill', x + 1.0, d=.7, v=.45); add('hit', x + 1.45, v=.5)
for i, n in enumerate(['D4', 'A4', 'D5', 'F#5']): add('pluck', x + 1.45 + i * .16, note=n, v=.45 - i * .05)
c.sort(key=lambda z: z['t'])
CH = ['D', 'G', 'D', 'A', 'Bm', 'G', 'A', 'D', 'G', 'D', 'A', 'Bm', 'G', 'D']
chords = [[round(st[n], 2), CH[i % len(CH)]] for i, n in enumerate(st)]
phrases = [[0.3, ['D4', 'E4', 'F#4'], .35], [round(st['TABLE'] + 4.0, 2), ['A4', 'B4', 'A4', 'F#4'], .4], [round(st['END VERSE'] + 4.4, 2), ['F#4', 'E4', 'D4'], .45]]
json.dump({'cues': c, 'meta': {'DUR': DUR, 'music': {'pad': .32, 'chords': chords, 'phrases': phrases}, 'starts': st}}, open(f'{B}/cues.json', 'w'), indent=0)
print(DUR, len(c), 'cues', {k: round(v, 1) for k, v in st.items()})
