#!/usr/bin/env python3
"""s20 Hallelujah cue sheet: the posted Shorts' palette (synth_ep9.py: D-major pad, plucks, quill, soft cut whoosh), sparse, no risers, no bells.
Writing sound on every text line, soft ticks for the table rows and the 13 praises, a pluck pair when a key word turns scarlet, the standard logo outro.
Usage: python3 mk_cues.py engine/lf12/s20 -> cues.json ; then synth_ep9.py cues.json mix.wav"""
import json, re, sys
B = sys.argv[1].rstrip('/')
st = {}; t = 0; dur = {}
for m in re.finditer(r"^P\('([^']+)', ([0-9.]+)", open(f'{B}/scenes.js').read(), re.M): st[m.group(1)] = t; dur[m.group(1)] = float(m.group(2)); t += float(m.group(2))
DUR = round(t, 2); c = []
def add(ty, at, **k): c.append(dict(type=ty, t=round(max(0, at), 3), **k))
def cut(n): add('whoosh', st[n] - .15, d=.7, v=.18)
def q(n, *ts, d=.5, v=.3): [add('quill', st[n] + x, d=d, v=v) for x in ts]
def pl(n, x, *notes, v=.26): [add('pluck', st[n] + x + i * .1, note=nt, v=v - i * .04) for i, nt in enumerate(notes)]
q('HOOK', 0, .7); q('WORD', .2); pl('WORD', 1.1, 'A4', 'D4')
for n in list(st)[1:]: cut(n)
q('LAST5', 0, .6)
for i in range(5): add('tick', st['LAST5-T'] + 1.0 + i * .75, v=.4); add('tick', st['LAST5-T'] + 1.25 + i * .75, v=.32)
q('LAST5-T', .8)
q('SAYS', 0, .6)
q('PS150-3', .1); add('swell', st['PS150-3'] + .4, d=1.6); pl('PS150-3', 1.3, 'A4')
for i in range(13): add('tick', st['TALLY'] + .8 + i * .38, v=.45)
pl('TALLY', .8 + 12 * .38 + .1, 'D4', 'A4')
q('BREATH', 0, .7)
add('boom', st['NESHAMA'] + 1.0, v=.2); q('NESHAMA', .2); pl('NESHAMA', 1.0, 'D4', 'A4')
q('ADAM', 0, .8)
q('MATCH', .1, 2.0); pl('MATCH', 3.6, 'D4', 'A4', 'D5')
q('MEANS', 0, 1.0)
x = st['END VERSE']; add('swell', x + .2, d=2.6); add('quill', x + .3, d=.9, v=.3); pl('END VERSE', 2.4, 'D4', 'A4', v=.32)
x = st['LOGO']; add('roll', x, d=.7); add('quill', x + 1.0, d=.7, v=.45); add('hit', x + 1.45, v=.5)
for i, n in enumerate(['D4', 'A4', 'D5', 'F#5']): add('pluck', x + 1.45 + i * .16, note=n, v=.45 - i * .05)
c.sort(key=lambda z: z['t'])
CH = ['D', 'G', 'D', 'A', 'Bm', 'G', 'A', 'D', 'G', 'D', 'A', 'Bm', 'G', 'D']
chords = [[round(st[n], 2), CH[i % len(CH)]] for i, n in enumerate(st)]
phrases = [[0.3, ['D4', 'E4', 'F#4'], .35], [round(st['MATCH'] + 4.6, 2), ['A4', 'B4', 'A4', 'F#4'], .4], [round(st['END VERSE'] + 3.8, 2), ['F#4', 'E4', 'D4'], .45]]
json.dump({'cues': c, 'meta': {'DUR': DUR, 'music': {'pad': .32, 'chords': chords, 'phrases': phrases}, 'starts': st}}, open(f'{B}/cues.json', 'w'), indent=0)
print(DUR, len(c), 'cues', {k: round(v, 1) for k, v in st.items()})
