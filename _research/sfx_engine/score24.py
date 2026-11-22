"""s19 v24 score: the lev reel's sound engine (sb/levkit.py) applied to s19's animations the way the lev reel applies it.
Pad throughout. Each new line or item = the next harp note. Words and letters = typing clicks. Scene change = whoosh.
A result landing = low drum (with a riser before the two big ones). Single-letter highlight = bar chime."""
import sys, subprocess; sys.path.insert(0, 'sb')
import numpy as np, soundfile as sf
import build_v16 as V
from levkit import *
K = Kit(24); TOTAL = V.TOTAL; N = int(TOTAL * sr)
mus = np.zeros((N + sr * 6, 2)); fx = np.zeros((N + sr * 6, 2))
def put(bus, t, x, g, pan=0.):
    i = int(t * sr)
    if i < 0 or i >= N: return
    bus[i:i + len(x), 0] += x * g * (1 - pan); bus[i:i + len(x), 1] += x * g * (1 + pan)
D4, EB4, FS4, G4, A4, BB4, C5, D5, EB5, FS5 = SCALE
nk = [0]
def note(t, f, g=-18):
    put(mus, t, K.harp(f), db(g), .25 * np.sin(nk[0] * .9)); nk[0] += 1
def chime(t, f, g=-23.5): put(mus, t, K.chime(f), db(g))
def clicks(t, n, gap=.045, lv=-6):
    for k in range(n): put(fx, t + k * gap - .003, K.click(), db(lv + K.rng.uniform(-9, 0)), K.rng.uniform(-.3, .3))
def drum(t, g=-11): put(fx, t, K.drum(), db(g))
def whoosh(t_center, d=.9): put(fx, t_center - d / 2, K.whoosh(d), db(-19.5))
def riser(t_end, d=.7): put(fx, t_end - d, K.riser(d), db(-25))
def ping(t, g=-30):
    tt = T(.12); put(fx, t, np.sin(2 * np.pi * 1174.7 * tt) * np.exp(-tt * 35), db(g) * 1.414)

S = [float(x) for x in V.starts]
# which note each Line/Wipe gets, by item index in the scene (None = clicks only)
NOTES = {
 0: {0: D4, 1: EB4, 2: FS4},
 1: {1: None, 5: D4},
 2: {2: D4, 4: FS4, 6: A4, 7: D5},
 3: {0: A4, 1: G4, 2: FS4, 3: EB4},
 4: {0: D4, 1: EB4, 5: A4},
 5: {0: D4, 2: EB4, 4: FS4, 5: G4, 7: None, 9: A4, 10: D5},
 6: {0: D4, 2: None, 3: EB4, 4: FS4, 8: None, 9: EB4, 10: FS4, 11: G4, 12: A4, 14: D5},
 7: {0: A4, 1: G4, 2: FS4, 6: D4, 7: EB4, 8: FS4},
 8: {0: None, 2: D4, 4: FS4, 5: G4, 6: A4, 8: D5},
 9: {2: D4, 3: FS5},
}
for si, (dur, items) in enumerate(V.SCENES):
    s0 = S[si]
    if si not in (0, 8): whoosh(s0)
    for k, it in enumerate(items):
        n = type(it).__name__
        if n == 'Line':
            for w in range(len(it.words)): clicks(s0 + it.t0 + w * it.stag, 2)
            f = NOTES[si].get(k)
            if f: note(s0 + it.t0, f)
        elif n == 'Wipe':
            clicks(s0 + it.t0, int(it.dur / .08), .08)
            f = NOTES[si].get(k)
            if f: note(s0 + it.t0, f)
            if it.lit: chime(s0 + it.tl, 880)
        elif n == 'Alphabet' and it.mode == 'hole':
            for j in range(len(it.order)): clicks(s0 + it.t0 + j * it.stag, 1, lv=-9)
            note(s0 + it.t0, G4); note(s0 + it.t0 + 10 * it.stag, A4)            # one note per row of letters
            chime(s0 + it.tc + .05, 880)                                          # the circle round the missing letter
        elif n == 'Alphabet':
            chime(s0 + it.t0, 1174.7); drum(s0 + it.t0, -14)                      # the teth lands in its place
        elif n == 'Counter':
            put(fx, s0 + it.t0, K.rush(it.dur), db(-21))
            for j in range(9): ping(s0 + it.t0 + .1 + j * .11, -30 - j)
            drum(s0 + it.t0 + it.dur); note(s0 + it.t0 + it.dur, D4)
        elif n == 'Chart':
            for j, ch in enumerate(it.order):
                clicks(s0 + it.start(ch), 1, lv=-9)
                if j % 3 == 0: note(s0 + it.start(ch), SCALE[j // 3], -20)        # D4 up to C5 while the rows fill
            riser(s0 + it.tz, .6); drum(s0 + it.tz); chime(s0 + it.tz, 740)       # the red zero
        elif n == 'Pop':
            drum(s0 + it.t0); chime(s0 + it.t0, 880)                              # the big teth
        elif n == 'Score':
            note(s0 + it.t0, FS4); clicks(s0 + it.t0, 2); note(s0 + it.t0 + 1.0, G4); clicks(s0 + it.t0 + 1.0, 2)
            note(s0 + it.t0 + 1.6, A4); clicks(s0 + it.t0 + 1.6, 1)
            drum(s0 + it.t0 + 2.2); chime(s0 + it.t0 + 2.2, 1174.7); note(s0 + it.t0 + 2.2, D5)   # the 2 lands
# payoff: riser across the cut, drum and the lev reel's own rising G, Bb, D as the Hebrew writes in
p0 = S[8] + .3
riser(p0, .8); drum(p0)
for j, f in enumerate((G4, BB4, D5)): note(p0 + j * .18, f)
chime(S[8] + 4.1 + .45, 880, -26)                                                # "go well"

mus = mus[:N]; fx = fx[:N]
wet = np.zeros_like(mus)
for dl, g in ((.043, .32), (.071, .26), (.113, .2), (.167, .15), (.241, .11), (.337, .08)):   # the 09 engine's small room, on the notes
    s = int(dl * sr); wet[s:, 0] += mus[:-s, 1] * g; wet[s:, 1] += mus[:-s, 0] * g
pad = K.pad(TOTAL)[:N] * np.minimum(1, T(TOTAL)[:N] / .25)
o = mus + .5 * wet + fx + pad[:, None]
fo = int(.03 * sr); o[-fo:] *= np.linspace(1, 0, fo)[:, None]
print('raw peak', round(float(np.abs(o).max()), 2), 'rms dB', round(20 * np.log10(np.sqrt((o ** 2).mean())), 1))
sf.write('sb/v24_raw.wav', o * .5, sr, subtype='FLOAT')
