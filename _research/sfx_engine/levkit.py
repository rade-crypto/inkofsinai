"""The lev reel's sound engine, rebuilt from measurements of its audio (reel DeuLj5bOgT4).
Elements: D-drone pad, Karplus-Strong harp notes in D Phrygian dominant, typing clicks, whoosh, riser, low drum, bar chime, counter rush."""
import numpy as np, scipy.signal as ss
sr = 48000
SCALE = [293.66, 311.13, 369.99, 392.00, 440.00, 466.16, 523.25, 587.33, 622.25, 739.99]   # D4 Eb4 F#4 G4 A4 Bb4 C5 D5 Eb5 F#5
BB3 = 233.08
T = lambda d: np.arange(int(d * sr)) / sr
db = lambda x: 10 ** (x / 20)
class Kit:
    def __init__(s, seed=1): s.rng = np.random.default_rng(seed)
    def harp(s, freq, dur=3.2, loss=.999, decay=.6, lp=420):
        """Karplus-Strong pluck, as in the reel: integer period at 48k, random start buffer, long ring."""
        n = int(dur * sr); p = int(round(sr / freq)); buf = s.rng.uniform(-1, 1, p); out = np.empty(n)
        for k in range(0, n, p):
            m = min(p, n - k); out[k:k + m] = buf[:m]
            nb = np.empty(p); nb[:-1] = .5 * (buf[:-1] + buf[1:]) * loss; nb[-1] = .5 * (buf[-1] + nb[0]) * loss; buf = nb
        out = ss.sosfilt(ss.butter(2, lp, 'low', fs=sr, output='sos'), out); t = T(dur)[:n]
        out *= np.exp(-t * decay) * np.minimum(1, t / .004); f = int(.3 * sr); out[-f:] *= np.linspace(1, 0, f)
        return out / np.sqrt((out[:int(.2 * sr)] ** 2).mean())           # unit RMS over the first 200 ms
    def chime(s, f, dur=3.0):
        """Bar chime: free-bar partials 1, 2.76, 5.4, 8.93; long ring (about 6.5 dB/s on the fundamental)."""
        t = T(dur); y = sum(np.sin(2 * np.pi * f * r * t + ph) * db(a) * np.exp(-t * k)
                           for r, a, k, ph in ((1, 0, .75, 0), (2.756, -8, 1.15, 1), (5.404, -11, 1.4, 2), (8.933, -19, 2.9, .5)))
        y *= (1 - np.exp(-t * 400)); f_ = int(.4 * sr); y[-f_:] *= np.linspace(1, 0, f_)
        return y / np.sqrt((y[:int(.15 * sr)] ** 2).mean())
    def click(s):
        """One typed character: ~30 ms broadband burst."""
        t = T(.045); x = s.rng.normal(0, 1, len(t)); x = ss.sosfilt(ss.butter(2, [1000, 8000], 'band', fs=sr, output='sos'), x)
        x *= np.exp(-t * 90) * np.minimum(1, t / .002); return x / np.abs(x).max()
    def whoosh(s, d=.9):
        t = T(d); x = ss.sosfilt(ss.butter(2, [900, 6000], 'band', fs=sr, output='sos'), s.rng.normal(0, 1, len(t)))
        x = ss.sosfilt(ss.butter(2, 7000, 'low', fs=sr, output='sos'), x)
        x *= np.sin(np.pi * t / d) ** 2; return x / np.sqrt((x[int(.4 * d * sr):int(.6 * d * sr)] ** 2).mean())
    def riser(s, d=.7):
        t = T(d); x = s.rng.normal(0, 1, len(t)) * db(-15 * (1 - t / d)); x[-int(.01 * sr):] *= np.linspace(1, 0, int(.01 * sr))
        return x / np.sqrt((x[-int(.1 * sr):] ** 2).mean())
    def rush(s, d):
        """Counter running: noise that grows and brightens, stops when the number lands."""
        t = T(d); n = s.rng.normal(0, 1, len(t)); lo = ss.sosfilt(ss.butter(2, [500, 8000], 'band', fs=sr, output='sos'), n)
        hi = .5 * ss.sosfilt(ss.butter(2, 8000, 'high', fs=sr, output='sos'), n); g = t / d
        x = (lo * db(-20 * (1 - g)) + hi * db(-26 * (1 - g))) * np.minimum(1, t / .15); x[-int(.03 * sr):] *= np.linspace(1, 0, int(.03 * sr))
        return x / np.sqrt((x[-int(.25 * sr):] ** 2).mean())
    def drum(s, f0=50, d=1.5):
        t = T(d); f = f0 * (1 + 1.2 * np.exp(-t * 18)); x = np.sin(2 * np.pi * np.cumsum(f) / sr) * np.exp(-t * 2.2) * (1 - np.exp(-t * 300))
        return x / np.sqrt((x[:int(.1 * sr)] ** 2).mean())
    def pad(s, dur):
        """D drone: D2, D3, A3, D4, F#4, each a slowly beating pair, at the reel's levels."""
        t = T(dur); y = np.zeros(len(t))
        for f, lv, beat in ((73.42, -24, .45), (146.83, -27, 1.0), (220.0, -30, .7), (293.66, -29, .6), (369.99, -31, .85)):
            y += db(lv) * 1.414 * (np.sin(2 * np.pi * f * t) * .75 + np.sin(2 * np.pi * (f + beat) * t + s.rng.uniform(0, 6)) * .45)
        return y
