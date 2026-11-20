#!/usr/bin/env python3
"""s22 Psalm 119 cue sheet (the posted Shorts' palette via synth_ep9.py: D-major pad, plucks, quill, soft cut whoosh), sparse, no risers, no bells.
The sound follows the picture: soft ticks as the dots and letters land and as the sweep lights each column, a rising pluck for each of the five "good" openings, a tick for the other three."""
import json, re, sys
B = sys.argv[1].rstrip('/')
st = {}; t = 0
for m in re.finditer(r"^P\('([^']+)', ([0-9.]+)", open(f'{B}/scenes.js').read(), re.M): st[m.group(1)] = t; t += float(m.group(2))
DUR = round(t, 2); c = []
def add(ty, at, **k): c.append(dict(type=ty, t=round(max(0, at), 3), **k))
def q(n, *ts, d=.5, v=.3): [add('quill', st[n] + x, d=d, v=v) for x in ts]
def pl(n, x, *notes, v=.26): [add('pluck', st[n] + x + i * .1, note=nt, v=v - i * .04) for i, nt in enumerate(notes)]
for n in list(st)[1:]: add('whoosh', st[n] - .15, d=.7, v=.18)
q('HOOK', .1, .8)
for i in range(16): add('tick', st['HOOK'] + .4 + i * .17, v=.24)
q('SECTIONS', 0, .9)
for i in range(22): add('tick', st['SECTIONS'] + .6 + i * .05, v=.28)
q('RULE', 0, .9)
for i in range(22): add('tick', st['RULE'] + 1.3 + i * .13, v=.3)
q('NINTH', 0, .8); pl('NINTH', .5, 'A4', 'D4'); q('FIVE', 0, .6)
GOOD = ['D4', 'E4', 'F#4', 'A4', 'B4']; g = 0
for i, isg in enumerate([1, 1, 0, 1, 0, 0, 1, 1]):
    x = .5 + i * .65
    if isg: pl('OPENINGS', x, GOOD[g], v=.3); g += 1
    else: add('tick', st['OPENINGS'] + x, v=.38)
q('IN71', 0); q('PS119-71A', .1); add('swell', st['PS119-71A'] + .4, d=1.6); pl('PS119-71A', 1.3, 'A4')
q('PS119-71B', .1); pl('PS119-71B', 1.1, 'D4')
q('WHY', 0, .8); q('PS119-67', .1); pl('PS119-67', 1.4, 'D4')
x = st['END VERSE']; add('swell', x + .2, d=2.6); add('quill', x + .3, d=.9, v=.3); pl('END VERSE', 2.5, 'D4', 'A4', v=.32); pl('END VERSE', 3.7, 'A4', 'D5', v=.26)
x = st['LOGO']; add('roll', x, d=.7); add('quill', x + 1.0, d=.7, v=.45); add('hit', x + 1.45, v=.5)
for i, n in enumerate(['D4', 'A4', 'D5', 'F#5']): add('pluck', x + 1.45 + i * .16, note=n, v=.45 - i * .05)
c.sort(key=lambda z: z['t'])
CH = ['D', 'G', 'D', 'A', 'Bm', 'G', 'A', 'D', 'G', 'D', 'A', 'Bm', 'G', 'D']
chords = [[round(st[n], 2), CH[i % len(CH)]] for i, n in enumerate(st)]
phrases = [[0.3, ['D4', 'E4', 'F#4'], .35], [round(st['OPENINGS'] + 5.6, 2), ['A4', 'B4', 'A4', 'F#4'], .4], [round(st['END VERSE'] + 4.4, 2), ['F#4', 'E4', 'D4'], .45]]
json.dump({'cues': c, 'meta': {'DUR': DUR, 'music': {'pad': .32, 'chords': chords, 'phrases': phrases}, 'starts': st}}, open(f'{B}/cues.json', 'w'), indent=0)
print(DUR, len(c), 'cues')
