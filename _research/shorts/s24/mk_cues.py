#!/usr/bin/env python3
"""s24 Babel cue sheet, in the posted Shorts' palette (synth_ep9.py: D-major pad, plucks, quill, soft cut whoosh), sparse, no risers, no bells.
The sound follows the picture: quill on every line as it inks on, a soft low swell under each still, a pluck pair when a Hebrew word turns red,
and the moment itself: a breath of air as the vowel points dissolve, a hollow tick as the ל lifts out, a slow falling pluck line while the נ comes down,
and a low hit + bright pluck chord when it lands as ל. Reads TM (the timing block) from scenes.js, so it follows retime.py automatically.
Usage: python3 mk_cues.py s24  ->  s24/cues.json ; then python3 synth_s24.py s24/cues.json mix.wav (or the studio's synth_ep9.py)"""
import json, re, sys
B = sys.argv[1].rstrip('/')
TM = json.loads(re.search(r'/\*TIMING\*/(.*?)/\*END\*/', open(f'{B}/scenes.js').read(), re.S).group(1))
st, t = {}, 0
for n, v in TM.items(): st[n] = t; t += v[0]
st['LOGO'] = t; DUR = round(t + 3.25, 2)
sub = lambda n, i: st[n] + TM[n][i]
c = []
def add(ty, at, **k): c.append(dict(type=ty, t=round(max(0, at), 3), **k))
def q(at, d=.5, v=.3): add('quill', at, d=d, v=v)
def pl(at, *notes, v=.26, gap=.1): [add('pluck', at + i * gap, note=nt, v=v - i * .04) for i, nt in enumerate(notes)]
for n in list(st)[1:]: add('whoosh', st[n] - .15, d=.7, v=.16)
# hook: the two phrases and the stack inking on
q(st['HOOK'] + .15); q(sub('HOOK', 1)); add('swell', st['HOOK'] + .2, d=1.4, v=.22)
for i in range(4): add('tick', st['HOOK'] + .2 + i * .07, v=.16); add('tick', sub('HOOK', 1) + .1 + i * .07, v=.16)
q(st['APART'] + .1); pl(st['APART'] + 1.2, 'A4', 'D5', v=.28)
# the stills: a low swell as each plate inks on
for n in ['SAY', 'TOWER', 'ANSWER', 'DOWN', 'NAME']: add('swell', st[n] + .1, d=2.2, v=.2)
q(st['SAY'] + .1); q(sub('SAY', 1), d=.7); pl(sub('SAY', 1) + .45, 'A4', 'D4')
q(st['COME'] + .1)
q(st['TOWER'] + .1); q(sub('TOWER', 1)); pl(sub('TOWER', 1) + .35, 'D5')
q(st['ANSWER'] + .1); q(sub('ANSWER', 1)); add('boom', sub('ANSWER', 2), v=.18); pl(sub('ANSWER', 2) + .45, 'F#4', 'A4')
q(st['DOWN'] + .1); q(sub('DOWN', 1)); pl(sub('DOWN', 1) + .35, 'B3'); q(sub('DOWN', 2), d=.7); pl(sub('DOWN', 2) + .45, 'A4', 'F#4')
# side by side: each letter inks on, each word lights as it is said
q(st['SIDE'] + .1)
for r, t0 in enumerate([st['SIDE'] + .35, st['SIDE'] + .8]):
    for i in range(4): add('tick', t0 + i * .07, v=.14)
pl(st['BUILD'] + .05, 'D4', 'A4'); q(sub('BUILD', 1))
pl(st['CONFUSE'] + .05, 'A4', 'F#4'); q(sub('CONFUSE', 1))
# THE MOMENT
x = st['CHANGED']; q(x + .1); add('air', x + .2, d=1.0, v=.16); add('tick', x + .7, v=.3); add('swell', x + .7, d=1.4, v=.18)
m = sub('CHANGED', 1) + .2; q(sub('CHANGED', 1))
pl(m + .1, 'A4', 'F#4', 'D4', 'A3', v=.22, gap=.32)   # falling as it comes down
add('hit', m + 1.6, v=.34); pl(m + 1.62, 'D4', 'A4', 'D5', 'F#5', v=.34, gap=.07)
# name / Babel: the same ל, red again
q(st['NAME'] + .1); q(st['CITY'] + .1); q(sub('CITY', 1), d=.7); pl(sub('CITY', 1) + .8, 'D5', 'A4', v=.3)
x = st['END VERSE']; add('swell', x + .2, d=2.6); q(x + .35, d=.9); q(sub('END VERSE', 1) + .35, d=.9); pl(x + 2.4, 'D4', 'A4', v=.3)
x = st['LOGO']; add('roll', x, d=.7); add('quill', x + 1.0, d=.7, v=.45); add('hit', x + 1.45, v=.5)
for i, n in enumerate(['D4', 'A4', 'D5', 'F#5']): add('pluck', x + 1.45 + i * .16, note=n, v=.45 - i * .05)
c.sort(key=lambda z: z['t'])
CH = ['D', 'D', 'G', 'G', 'D', 'Bm', 'Bm', 'G', 'D', 'A', 'Bm', 'G', 'G', 'D', 'D']
chords = [[round(st[n], 2), CH[i % len(CH)]] for i, n in enumerate(st)]
phrases = [[0.3, ['D4', 'E4', 'F#4'], .3], [round(st['SIDE'] + .2, 2), ['A4', 'B4', 'A4'], .32], [round(st['END VERSE'] + 3.4, 2), ['F#4', 'E4', 'D4'], .4]]
json.dump({'cues': c, 'meta': {'DUR': DUR, 'music': {'pad': .3, 'chords': chords, 'phrases': phrases}, 'starts': st}}, open(f'{B}/cues.json', 'w'), indent=0)
print(DUR, len(c), 'cues', {k: round(v, 2) for k, v in st.items()})
