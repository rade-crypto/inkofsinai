"""s19 v25 score: bright and soft. D major pentatonic only, high register (D5 and up), no drone, no clicks, no low hits.
Plucked harp + glass pings for the animations, a warm chord bloom whenever the teth is shown, breath-soft swells for text.
Quiet. Timing and velocity are slightly humanized so nothing repeats exactly."""
import sys, subprocess; sys.path.insert(0, 'sb')
import numpy as np, scipy.signal as ss, soundfile as sf
import build_v25 as V
sr = 48000
P = [587.33, 659.26, 739.99, 880.0, 987.77, 1174.66, 1318.51, 1479.98, 1760.0, 1975.5, 2349.3]   # D5 E5 F#5 A5 B5 D6 E6 F#6 A6 B6 D7
D5, E5, FS5, A5, B5, D6, E6, FS6, A6, B6, D7 = P
rng = np.random.default_rng(25); TOTAL = V.TOTAL_ALL; N = int(TOTAL * sr)
T = lambda d: np.arange(int(d * sr)) / sr
db = lambda x: 10 ** (x / 20)
L = np.zeros(N + sr * 6); R = np.zeros(N + sr * 6)
def put(t, x, g, pan=0.0):
    i = int(t * sr)
    if i < 0 or i >= N: return
    p = (pan + 1) / 2; L[i:i + len(x)] += x * g * np.cos(p * np.pi / 2); R[i:i + len(x)] += x * g * np.sin(p * np.pi / 2)
def pluck(f, dur=2.4):
    n = int(dur * sr); per = int(round(sr / f)); buf = rng.uniform(-1, 1, per); out = np.empty(n)
    for k in range(0, n, per):
        m = min(per, n - k); out[k:k + m] = buf[:m]
        nb = np.empty(per); nb[:-1] = .5 * (buf[:-1] + buf[1:]) * .9985; nb[-1] = .5 * (buf[-1] + nb[0]) * .9985; buf = nb
    out = ss.sosfilt(ss.butter(2, 3800, 'low', fs=sr, output='sos'), out)
    t = T(dur)[:n]; out = out * np.exp(-t * 1.5) * np.minimum(1, t / .006)
    out = out / np.sqrt((out[:int(.2 * sr)] ** 2).mean()) + .8 * np.sin(2 * np.pi * f * t) * np.exp(-t * 2.2)   # soft fundamental under the pluck
    f_ = int(.25 * sr); out[-f_:] *= np.linspace(1, 0, f_); return out / np.sqrt((out[:int(.2 * sr)] ** 2).mean())
def glass(f, dur=1.0):
    t = T(dur); y = np.sin(2 * np.pi * f * t) + .22 * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-t * 6)
    y *= np.exp(-t * 4.2) * np.minimum(1, t / .004); return y / np.sqrt((y[:int(.2 * sr)] ** 2).mean())
def bloom(notes, dur=3.2, att=.1):
    t = T(dur); y = np.zeros(len(t))
    for f in notes:
        for det in (-.0015, .0015): y += np.sin(2 * np.pi * f * (1 + det) * t + rng.uniform(0, 6))
        y += .2 * np.sin(2 * np.pi * f * 2 * t)
    y = ss.sosfilt(ss.butter(2, 3200, 'low', fs=sr, output='sos'), y) * np.minimum(1, t / att) ** 2 * np.exp(-t * 1.25)
    f_ = int(.3 * sr); y[-f_:] *= np.linspace(1, 0, f_); return y / np.sqrt((y ** 2).mean())
def breath(d=.4, lo=700, hi=3500):
    t = T(d); x = ss.sosfilt(ss.butter(2, [lo, hi], 'band', fs=sr, output='sos'), rng.normal(0, 1, len(t))) * np.sin(np.pi * t / d) ** 2
    return x / np.sqrt((x ** 2).mean())
J = lambda: rng.uniform(-.008, .008)
V_ = lambda: rng.uniform(-2, 1)
cnt = [0]
SEQ = [D5, F5 if False else FS5, A5, B5, D6, A5, FS5, B5, D6, E6]
def pl(t, f=None, g=-20):
    if f is None: f = SEQ[cnt[0] % len(SEQ)]; cnt[0] += 1
    put(t + J(), pluck(f), db(g + V_()), rng.uniform(-.35, .35))
def gl(t, f, g=-30): put(t + J(), glass(f), db(g + V_()), rng.uniform(-.5, .5))
def bl(t, notes, g=-27): put(t, bloom(notes), db(g))
def br(t, d=.4, g=-36): put(t, breath(d), db(g), rng.uniform(-.2, .2))
BRIGHT = (D5, FS5, A5, E6)
S = [float(x) for x in V.starts]
for si, ((dur, items), s0) in enumerate(zip(V.SCENES, S)):
    if si: br(s0 - .35, .45, -38)
    for it in items:
        n = type(it).__name__
        if n == 'Line': br(it.t0 + s0 - .03, .22 + .05 * len(it.words), -37); pl(it.t0 + s0)
        elif n == 'Wipe':
            br(it.t0 + s0, it.dur + .2, -37)
            for j in range(4): gl(it.t0 + s0 + j * it.dur / 4, P[2 + j], -33)
            if it.lit: bl(it.tl + s0, BRIGHT); gl(it.tl + s0 + .04, A6, -28); gl(it.tl + s0 + .16, D7, -33)
        elif n == 'Alphabet':
            for j in range(0, len(it.order), 3): gl(it.t0 + s0 + j * it.stag, P[(j // 3) % 8], -34)
            gl(it.tc + s0, A5, -28); gl(it.tc + s0 + .2, D6, -28); gl(it.tc + s0 + .4, FS6, -28); bl(it.tc + s0 + .45, (D5, A5), -34)
        elif n == 'Counter':
            m = 11
            for j in range(m): gl(it.t0 + s0 + it.dur * (np.arccos(1 - 2 * (j + 1) / (m + 1)) / np.pi), P[j % 9], -35)
            bl(it.t0 + s0 + it.dur, (D5, A5, D6), -31)
        elif n == 'Chart':
            for j, ch in enumerate(it.order): gl(it.start(ch) + s0, P[j % 9], -37 + min(3, j / 8))
            gl(it.tz + s0 - .05, A5, -27); gl(it.tz + s0 + .22, D6, -27)                 # the zero: a question, rising
            bl(it.tz + s0 + .25, BRIGHT, -33)
        elif n == 'Pop': bl(it.t0 + s0, (D5, FS5, A5, D6), -24); gl(it.t0 + s0 + .1, E6, -29); gl(it.t0 + s0 + .3, A6, -31)
        elif n == 'Score':
            pl(it.t0 + s0, D5, -21); pl(it.t0 + s0 + 1.0, FS5, -21); gl(it.t0 + s0 + 1.6, A5, -29)
            bl(it.t0 + s0 + 2.2, BRIGHT, -26); gl(it.t0 + s0 + 2.3, D7, -31)
        elif n == 'Hair': br(it.t0 + s0, .5, -42)
# payoff: a bright arpeggio under the Hebrew, as in the lev reel's G Bb D climb but in major
p0 = S[8] + .3
for j, f in enumerate((D5, FS5, A5, D6, FS6)): pl(p0 + j * .14, f, -20)
# the logo scene
l0 = V.SCENES_END
gl(l0 + .08, D6, -33); gl(l0 + .13, D6, -35); br(l0 + .25, .6, -37)
bl(l0 + .65, (D5, A5, D6), -25); gl(l0 + .72, FS6, -29)
for j in range(10): gl(l0 + .95 + j * .05 + rng.uniform(-.01, .01), P[(j * 2) % 9 + 1], -39)
gl(l0 + 1.45, A6, -33); pl(l0 + 1.55, D6, -23)
L, R = L[:N], R[:N]; o = np.stack([L, R], 1)
o = ss.sosfiltfilt(ss.butter(2, 260, 'high', fs=sr, output='sos'), o, axis=0)
irt = T(2.4); ir = rng.normal(0, 1, (len(irt), 2)) * np.exp(-irt * 2.6)[:, None]
ir = ss.sosfilt(ss.butter(2, 5500, 'low', fs=sr, output='sos'), ir, axis=0); ir[:int(.012 * sr)] *= np.linspace(0, 1, int(.012 * sr))[:, None]; ir /= np.sqrt((ir ** 2).sum(0))
wet = np.stack([ss.fftconvolve(o[:, c], ir[:, c])[:N] for c in range(2)], 1)
o = o + .45 * wet
fo = int(.03 * sr); o[-fo:] *= np.linspace(1, 0, fo)[:, None]
sf.write('sb/v25_raw.wav', o, sr, subtype='FLOAT'); print('events done, peak', round(float(np.abs(o).max()), 3))
