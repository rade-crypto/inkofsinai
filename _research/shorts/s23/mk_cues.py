#!/usr/bin/env python3
"""s23 'He counts the stars' cue sheet (the posted Shorts' palette via synth_ep9.py: D-major pad, plucks, quill, soft cut whoosh), sparse, no risers, no bells.
The sound follows the picture: soft ticks as the stars land, a very soft tick for every name written, a pluck when the star that is yours is ringed."""
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
for i in range(14): add('tick', st['HOOK'] + .4 + i * .17, v=.26)
for n in ['GEN', 'JER-A', 'PS147-A', 'ISA-26', 'ISA-27', 'HEAL-A']: q(n, .1)
for n in ['JER-B', 'PS147-A2', 'PS147-B', 'HEAL-B']: q(n, .1)
add('swell', st['GEN'] + .4, d=1.6); pl('GEN', 1.0, 'A4'); pl('JER-A', 1.0, 'D4'); pl('PS147-A', 1.2, 'A4', 'D4')
for i in range(30): add('tick', st['PS147-A'] + 1.6 + i * .15, v=.2)
pl('PS147-B', 1.2, 'D5'); pl('ISA-26', 1.2, 'A4'); pl('ISA-27', 1.8, 'D4', 'A4', v=.3)
q('LOOK', 0, .6); pl('HEAL-A', 1.0, 'F#4'); pl('HEAL-B', 1.0, 'A4')
q('POINT', 0, .8, 1.5); pl('POINT', 1.6, 'D4', 'A4', v=.3)
x = st['END VERSE']; add('swell', x + .2, d=2.6); add('quill', x + .3, d=.9, v=.3); pl('END VERSE', 2.4, 'D4', 'A4', v=.32); pl('END VERSE', 3.6, 'A4', 'D5', v=.26)
x = st['LOGO']; add('roll', x, d=.7); add('quill', x + 1.0, d=.7, v=.45); add('hit', x + 1.45, v=.5)
for i, n in enumerate(['D4', 'A4', 'D5', 'F#5']): add('pluck', x + 1.45 + i * .16, note=n, v=.45 - i * .05)
c.sort(key=lambda z: z['t'])
CH = ['D', 'G', 'D', 'A', 'Bm', 'G', 'A', 'D', 'G', 'D', 'A', 'Bm', 'G', 'D', 'A']
chords = [[round(st[n], 2), CH[i % len(CH)]] for i, n in enumerate(st)]
phrases = [[0.3, ['D4', 'E4', 'F#4'], .35], [round(st['ISA-26'] + 2.0, 2), ['A4', 'B4', 'A4', 'F#4'], .4], [round(st['END VERSE'] + 4.0, 2), ['F#4', 'E4', 'D4'], .45]]
json.dump({'cues': c, 'meta': {'DUR': DUR, 'music': {'pad': .32, 'chords': chords, 'phrases': phrases}, 'starts': st}}, open(f'{B}/cues.json', 'w'), indent=0)
print(DUR, len(c), 'cues')
