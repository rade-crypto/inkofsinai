#!/usr/bin/env python3
"""s24 Babel cue sheet. Quiet on purpose (the owner found a busy track distracting): the reels' own pad under everything, the soft scene-change
whoosh only where the picture really changes, and one soft pluck (or a short chord) only when something turns red or lands. No ticks, no
per-word quill; the quill only where Hebrew is written big. Reads the timing block from scenes.js, so it follows retime.py.
Usage: python3 mk_cues.py s24 -> s24/cues.json ; then python3 mix_s24.py s24/cues.json mix.wav [vo.wav lead]"""
import json, re, sys
B = sys.argv[1].rstrip('/')
TM = json.loads(re.search(r'/\*TIMING\*/(.*?)/\*END\*/', open(f'{B}/scenes.js').read(), re.S).group(1))
st, t = {}, 0
for n, v in TM.items(): st[n] = t; t += v[0]
st['LOGO'] = t; DUR = round(t + 3.25, 2); sub = lambda n, i: st[n] + TM[n][i]
c = []
def add(ty, at, **k): c.append(dict(type=ty, t=round(max(0, at), 3), **k))
def pl(at, *notes, v=.22): [add('pluck', at + i * .09, note=nt, v=v - i * .03) for i, nt in enumerate(notes)]
for n in ['ANSWER', 'SIDE', 'NAME', 'END VERSE']: add('cut', st[n] - .15)
pl(st['HOOK2'] + 1.0, 'A4')                                   # the letter turns red in the tower
pl(sub('SAY', 1) + .2, 'D4'); add('quill', sub('SAY', 1), d=.5, v=.22)   # הָבָה נִבְנֶה written
pl(st['TOWER'] + 2.6, 'D5', v=.18)                             # the top reaches the sky
pl(sub('ANSWER', 2) + .5, 'D4', 'A4'); add('quill', sub('ANSWER', 2), d=.5, v=.22)   # the same word, answered
pl(sub('DOWN', 3) + .5, 'F#4')                                 # וְנָבְלָה
pl(st['BUILD'] + .05, 'D4'); pl(st['CONFUSE'] + .05, 'A4')
m = sub('CHANGED', 1) + .05; pl(m + 2.0, 'D4', 'A4', 'D5', v=.3)   # THE MOMENT: ל lands
pl(sub('CITY', 1) + 1.35, 'D4', 'A4', 'D5', v=.26)              # the same ל in בָּבֶל
add('quill', st['END VERSE'] + .2, d=.9, v=.24); pl(st['END VERSE'] + 2.6, 'D4', 'A4', v=.24)
add('outro', st['LOGO'])
c.sort(key=lambda z: z['t'])
CH = ['D', 'G', 'D', 'A', 'Bm', 'G', 'A', 'D', 'G', 'D', 'A', 'Bm', 'G', 'D', 'A']
chords = [[round(st[n], 2), CH[i % len(CH)]] for i, n in enumerate(st)]
json.dump({'cues': c, 'meta': {'DUR': DUR, 'music': {'pad': .32, 'chords': chords, 'phrases': [[0.3, ['D4', 'E4', 'F#4'], .3]]}, 'starts': st}}, open(f'{B}/cues.json', 'w'), indent=0)
print(DUR, len(c), 'cues')
