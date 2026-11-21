#!/usr/bin/env python3
"""s24 Babel cue sheet, in the posted Shorts' palette only (the real sounds, lifted from the s23 / s20 reels by mix_s24.py: pad, plucks, quill, the soft scene-change whoosh, ticks; no risers, bells or booms).
The sound follows the picture: soft ticks while bricks are laid (they stop when the building stops), quill when a line or a Hebrew word is written,
a pluck when a key word turns red, a three-note pluck when the נ lands as ל, the standard logo outro. Reads the timing block from scenes.js,
so it follows retime.py. Usage: python3 mk_cues.py s24 -> s24/cues.json ; then python3 mix_s24.py s24/cues.json mix.wav [vo.wav lead]"""
import json, re, sys
B = sys.argv[1].rstrip('/')
TM = json.loads(re.search(r'/\*TIMING\*/(.*?)/\*END\*/', open(f'{B}/scenes.js').read(), re.S).group(1))
st, t = {}, 0
for n, v in TM.items(): st[n] = t; t += v[0]
st['LOGO'] = t; DUR = round(t + 3.25, 2); en = lambda n: st[n] + TM[n][0]; sub = lambda n, i: st[n] + TM[n][i]
c = []
def add(ty, at, **k): c.append(dict(type=ty, t=round(max(0, at), 3), **k))
def q(at, d=.5, v=.3): add('quill', at, d=d, v=v)
def pl(at, *notes, v=.26): [add('pluck', at + i * .1, note=nt, v=v - i * .04) for i, nt in enumerate(notes)]
def bricks(t0, t1, every=.16, v=.3):
    x = t0
    while x < t1: add('tick', x, v=v); x += every
CUTS = ['ANSWER', 'SIDE', 'NAME', 'END VERSE']   # 0–15 s is one scene   # real scene changes only; steps inside one scene don't whoosh
for n in CUTS: add('cut', st[n] - .15)   # the reels' own scene change: soft whoosh, then the new line's quill
q(.1); q(sub('HOOK', 1)); bricks(.1, sub('HOOK2', 1) + .3); pl(sub('HOOK', 1) + .5, 'D4')
q(st['HOOK2'] + .1); q(sub('HOOK2', 1)); pl(sub('HOOK2', 1) + .9, 'A3', 'D4', v=.3)
q(st['SAY'] + .1); q(sub('SAY', 1), d=.8); pl(sub('SAY', 1) + .7, 'A4', 'D4'); bricks(st['COME'] + .5, en('COME'), .16, .22)
q(st['COME'] + .1); pl(st['COME'] + .8, 'F#4')
q(st['TOWER'] + .1); q(sub('TOWER', 1)); bricks(st['TOWER'], en('TOWER') - .7, .1, .22); pl(en('TOWER') - .7, 'D5', 'A4')
q(st['ANSWER'] + .1); q(sub('ANSWER', 1)); q(sub('ANSWER', 2), d=.7); pl(sub('ANSWER', 2) + .55, 'D4', 'A4', v=.3)
q(st['DOWN'] + .1); q(sub('DOWN', 1), d=.7); q(sub('DOWN', 2)); q(sub('DOWN', 3), d=.8); pl(sub('DOWN', 3) + .7, 'A4', 'F#4')
q(st['SIDE'] + .1); 
pl(st['BUILD'] + .05, 'D4', 'A4'); q(sub('BUILD', 1))
pl(st['CONFUSE'] + .05, 'A4', 'F#4'); q(sub('CONFUSE', 1))
x = st['CHANGED']; q(x + .1); add('tick', x + .7, v=.3); m = sub('CHANGED', 1) + .05; q(sub('CHANGED', 1)); 
pl(m + 2.0, 'D4', 'A4', 'D5', v=.34)
q(st['NAME'] + .1); q(st['NAME'] + .9, d=.8); pl(st['NAME'] + 1.6, 'F#4')
q(st['CITY'] + .1); q(sub('CITY', 1), d=.8); pl(sub('CITY', 1) + 1.35, 'D4', 'A4', 'D5', v=.34)
x = st['END VERSE']; q(x + .3, d=.9); q(sub('END VERSE', 1), d=.9); pl(x + 2.6, 'D4', 'A4', v=.32)
add('outro', st['LOGO'])   # the posted logo outro, as recorded
c.sort(key=lambda z: z['t'])
CH = ['D', 'G', 'D', 'A', 'Bm', 'G', 'A', 'D', 'G', 'D', 'A', 'Bm', 'G', 'D', 'A']
chords = [[round(st[n], 2), CH[i % len(CH)]] for i, n in enumerate(st)]
phrases = [[0.3, ['D4', 'E4', 'F#4'], .35], [round(st['SIDE'] + .3, 2), ['A4', 'B4', 'A4', 'F#4'], .4], [round(st['END VERSE'] + 3.6, 2), ['F#4', 'E4', 'D4'], .45]]
json.dump({'cues': c, 'meta': {'DUR': DUR, 'music': {'pad': .32, 'chords': chords, 'phrases': phrases}, 'starts': st}}, open(f'{B}/cues.json', 'w'), indent=0)
print(DUR, len(c), 'cues')
