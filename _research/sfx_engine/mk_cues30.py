"""s19 cue sheet in the posted Shorts' sound palette (engine/lf12/s18: synth_ep9.py D-major pad + plucks + quill + soft cut whoosh).
Owner notes honoured: sparse, no doorbell bells, no risers/build-ups, quiet. Counting gets soft ticks."""
import sys, json; sys.path.insert(0, 'sb')
import numpy as np
import build_v26 as V
c = []; S = [float(x) for x in V.starts]
def add(ty, at, **k): c.append(dict(type=ty, t=round(max(0, at), 3), **k))
def inv_ease(q):
    lo, hi = 0.0, 1.0
    for _ in range(40):
        m = (lo + hi) / 2
        if V.ease(m) < q: lo = m
        else: hi = m
    return lo
CHORD = ['D', 'G', 'D', 'A', 'Bm', 'G', 'A', 'D', 'G']
chords = []
for si, ((dur, items), s0) in enumerate(zip(V.SCENES, S)):
    chords.append([round(s0, 2), CHORD[si % len(CHORD)]])
    if si: add('whoosh', s0 - .15, d=.7, v=.18)                                  # soft cut
    first_line = True
    for it in items:
        n = type(it).__name__
        if n == 'Line':
            if first_line: add('quill', it.t0 + s0, d=.5, v=.3); first_line = False
        elif n == 'Wipe':
            add('quill', it.t0 + s0, d=min(it.dur, 1.2), v=.3)                   # Hebrew written
            if it.lit: add('pluck', it.tl + s0, note='A4', v=.26); add('pluck', it.tl + s0 + .08, note='D4', v=.2)
        elif n == 'Alphabet':
            for j in range(0, len(it.order), 2): add('tick', it.t0 + s0 + j * it.stag, v=.18)
            add('quill', it.tc + s0 - .3, d=.5, v=.3); add('pluck', it.tc + s0 + .2, note='A4', v=.26)
        elif n == 'Counter':
            m = 36
            for j in range(m): add('tick', it.t0 + s0 + it.dur * inv_ease((j + 1) / (m + 1)), v=.45)
        elif n == 'Chart':
            for ch in it.order: add('tick', it.start(ch) + s0, v=.3)
            add('pluck', it.tz + s0, note='A4', v=.26); add('pluck', it.tz + s0 + .12, note='D4', v=.2)
        elif n == 'Pop': add('hit', it.t0 + s0, v=.25); add('pluck', it.t0 + s0 + .05, note='D4', v=.28)
        elif n == 'Score':
            add('quill', it.t0 + s0, d=.4, v=.3); add('quill', it.t0 + s0 + 1.0, d=.4, v=.3); add('tick', it.t0 + s0 + 1.6, v=.5)
            add('pluck', it.t0 + s0 + 2.2, note='A4', v=.26); add('pluck', it.t0 + s0 + 2.3, note='D4', v=.2)
x = S[9]; add('swell', x + .9, d=1.8); add('pluck', x + 2.0, note='D4', v=.3); add('pluck', x + 2.15, note='A4', v=.24)   # payoff verse, like END VERSE
l0 = V.SCENES_END; chords.append([round(l0, 2), 'D'])
add('roll', l0, d=.7); add('quill', l0 + 1.0, d=.7, v=.45); add('hit', l0 + 1.45, v=.5)                               # the standard logo outro
for i, n in enumerate(['D4', 'A4', 'D5', 'F#5']): add('pluck', l0 + 1.45 + i * .16, note=n, v=.45 - i * .05)
c.sort(key=lambda q: q['t'])
phrases = [[0.3, ['D4', 'E4', 'F#4'], .35], [round(S[5] + 1.0, 2), ['A4', 'B4', 'A4', 'F#4'], .4], [round(S[9] + 4.4, 2), ['F#4', 'E4', 'D4'], .45]]
json.dump({'cues': c, 'meta': {'DUR': round(V.TOTAL_ALL, 2), 'music': {'pad': .32, 'chords': chords, 'phrases': phrases}}}, open('sb/cues30.json', 'w'), indent=0)
print(len(c), 'cues', V.TOTAL_ALL)
