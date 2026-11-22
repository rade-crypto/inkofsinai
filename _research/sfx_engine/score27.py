"""s19 v27 score: bright and soft. D major pentatonic only, high register (D5 and up), no drone, no clicks, no low hits.
Plucked harp + glass pings for the animations, a warm chord bloom whenever the teth is shown, breath-soft swells for text.
Quiet. Timing and velocity are slightly humanized so nothing repeats exactly."""
import sys, subprocess; sys.path.insert(0, 'sb')
import numpy as np, scipy.signal as ss, soundfile as sf
import build_v25 as V
sr = 48000
P = [587.33, 659.26, 739.99, 880.0, 987.77, 1174.66, 1318.51, 1479.98, 1760.0, 1975.5, 2349.3]   # D5 E5 F#5 A5 B5 D6 E6 F#6 A6 B6 D7
D5, E5, FS5, A5, B5, D6, E6, FS6, A6, B6, D7 = P
rng = np.random.default_rng(27); TOTAL = V.TOTAL_ALL; N = int(TOTAL * sr)
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

def chime(f, dur=2.6):
    t = T(dur); y = np.zeros(len(t))
    for r, a, d in ((1, 1, 1.9), (2.756, .30, 3.4), (5.4, .09, 7.0)): y += a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * d)
    y *= np.minimum(1, t / .005); return y / np.sqrt((y[:int(.3 * sr)] ** 2).mean())
def swish(d=.5, rise=True):
    t = T(d); x = rng.normal(0, 1, len(t)); out = np.zeros(len(t)); k = 14
    seg = np.linspace(900, 3800, k) if rise else np.linspace(3800, 900, k)
    for i in range(k):
        a, b = int(i * len(t) / k), int((i + 1) * len(t) / k)
        lo = seg[i]; sos = ss.butter(2, [lo, lo * 1.6], 'band', fs=sr, output='sos'); out[a:b] = ss.sosfilt(sos, x)[a:b]
    out *= np.sin(np.pi * t / d) ** 1.6; return out / np.sqrt((out ** 2).mean())
def padchord(notes, dur):
    t = T(dur); y = np.zeros(len(t))
    for f in notes:
        for det in (-.002, .002): y += np.sin(2 * np.pi * f * (1 + det) * t + rng.uniform(0, 6))
        y += .15 * np.sin(2 * np.pi * f * 2 * t)
    y = ss.sosfilt(ss.butter(2, 2400, 'low', fs=sr, output='sos'), y)
    e = np.minimum(1, t / 1.6) ** 2 * np.minimum(1, (dur - t) / 1.6) ** 2; return y * e / np.sqrt((y ** 2).mean())
J = lambda: rng.uniform(-.008, .008)
V_ = lambda: rng.uniform(-2, 1)
def ch(t, f, g=-28): put(t + J(), chime(f), db(g + V_()), rng.uniform(-.3, .3))
def pl(t, f, g=-22): put(t + J(), pluck(f, 2.0), db(g + V_()), rng.uniform(-.3, .3))
def sw(t, d=.5, g=-38, rise=True): put(t, swish(d, rise), db(g), rng.uniform(-.2, .2))
def pad(t, notes, dur, g=-33): put(t, padchord(notes, dur), db(g))
D4, FS4, A4, E4, CS5, G4, B4 = 293.66, 369.99, 440.0, 329.63, 554.37, 392.0, 493.88
CH = [(D4, A4, D5, E5), (E4, A4, CS5, E5), (D4, G4, B4, FS5), (D4, FS4, A4, E5)]
def tick(f, dur=.12):
    t = T(dur); y = (np.sin(2 * np.pi * f * t) + .35 * np.sin(2 * np.pi * f * 2.3 * t)) * np.exp(-t * 55) * np.minimum(1, t / .0015)
    return y / np.sqrt((y[:int(.05 * sr)] ** 2).mean())
def tk(t, f, g=-34): put(t + rng.uniform(-.004, .004), tick(f), db(g + rng.uniform(-1.5, 1)), rng.uniform(-.3, .3))
def inv_ease(q):
    lo, hi = 0.0, 1.0
    for _ in range(40):
        m = (lo + hi) / 2
        if V.ease(m) < q: lo = m
        else: hi = m
    return lo
S = [float(x) for x in V.starts]
for si, ((dur, items), s0) in enumerate(zip(V.SCENES, S)):
    pad(s0 - .3, CH[si % 4], dur + 1.2, -32)
    for it in items:
        n = type(it).__name__
        if n == 'Line': sw(it.t0 + s0 - .02, .25 + .04 * len(it.words), -40)
        elif n == 'Wipe':
            sw(it.t0 + s0, it.dur + .15, -38)
            if it.lit: ch(it.tl + s0, A5, -26); ch(it.tl + s0 + .02, D5, -31); pad(it.tl + s0 - .2, (D5, FS5, A5, E6), 3.4, -34)
        elif n == 'Alphabet':
            for j in range(len(it.order)): tk(it.t0 + s0 + j * it.stag, 1500 + 40 * j, -35)      # a soft tap per letter dropping in
            sw(it.tc + s0 - .3, .5, -39)                                                           # the red circle being drawn
            ch(it.tc + s0 + .2, A4, -27); ch(it.tc + s0 + .5, D5, -27)
        elif n == 'Counter':
            m = 34
            for j in range(m):                                                                      # a tick every ~18 on the way to 620, riding the same easing
                tk(it.t0 + s0 + it.dur * inv_ease((j + 1) / (m + 1)), 1100 + 1400 * (j / m), -33)
            ch(it.t0 + s0 + it.dur, D5, -27)
        elif n == 'Chart':
            for j, chr_ in enumerate(it.order): tk(it.start(chr_) + s0, 1300 + 45 * j, -35)         # one soft tick per bar growing
            ch(it.tz + s0 - .05, A4, -25); ch(it.tz + s0 + .3, D5, -27)
        elif n == 'Pop': ch(it.t0 + s0, D5, -26); ch(it.t0 + s0 + .02, A5, -31); pad(it.t0 + s0 - .2, (D5, A5, D6), 2.6, -35)
        elif n == 'Score':
            pl(it.t0 + s0, D5, -22); pl(it.t0 + s0 + 1.0, FS5, -22); tk(it.t0 + s0 + 1.6, 1800, -31)
            ch(it.t0 + s0 + 2.2, A5, -26); ch(it.t0 + s0 + 2.22, D5, -30)
p0 = S[8] + .3
for j, f in enumerate((D5, A5, D6)): pl(p0 + j * .2, f, -21)
l0 = V.SCENES_END
sw(l0 + .1, .9, -37); ch(l0 + .75, D5, -26); ch(l0 + .77, A5, -31); pad(l0 + .6, (D5, A5, D6, FS6), 3.0, -34); pl(l0 + 1.6, D6, -23)
L, R = L[:N], R[:N]; o = np.stack([L, R], 1)
o = ss.sosfiltfilt(ss.butter(2, 260, 'high', fs=sr, output='sos'), o, axis=0)
irt = T(2.4); ir = rng.normal(0, 1, (len(irt), 2)) * np.exp(-irt * 2.6)[:, None]
ir = ss.sosfilt(ss.butter(2, 5500, 'low', fs=sr, output='sos'), ir, axis=0); ir[:int(.012 * sr)] *= np.linspace(0, 1, int(.012 * sr))[:, None]; ir /= np.sqrt((ir ** 2).sum(0))
wet = np.stack([ss.fftconvolve(o[:, c], ir[:, c])[:N] for c in range(2)], 1)
o = o + .45 * wet
fo = int(.03 * sr); o[-fo:] *= np.linspace(1, 0, fo)[:, None]
sf.write('sb/v27_raw.wav', o, sr, subtype='FLOAT'); print('events done, peak', round(float(np.abs(o).max()), 3))
