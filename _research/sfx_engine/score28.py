"""s19 v28 score: only the channel's usual effects (the 05/09 set in _research/sfx_review), placed where each one fits what is on screen.
whoosh = text reveal, scratch = Hebrew written / circle drawn, ticks = counting, shimmer + chime = the teth lights, rising tings = payoff, whoosh+chime = logo."""
import sys, subprocess, glob; sys.path.insert(0, 'sb')
import numpy as np, scipy.signal as ss, soundfile as sf, librosa
import build_v25 as V
sr = 48000; rng = np.random.default_rng(28); TOTAL = V.TOTAL_ALL; N = int(TOTAL * sr)
RV = '/home/user/inkofsinai/_research/sfx_review/'
def load(n):
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', RV + n + '.mp3', '-ac', '1', '-ar', str(sr), '/tmp/_l.wav']); y, _ = sf.read('/tmp/_l.wav'); return y
db = lambda x: 10 ** (x / 20)
WH, SH, TING, RISE = load('05_02_whoosh'), load('05_03_shimmer'), load('05_04_ting_x3'), load('05_05_rising_tings')
THS, CHIME, TICKS, SCR, WCH = load('05_06_thump_plus_shimmer'), load('09_04_chime'), load('09_05_ticks'), load('09_07_scratch'), load('09_08_whoosh_then_chime')
SWL = librosa.effects.pitch_shift(load('09_10_swell'), sr=sr, n_steps=12); SWL = SWL[:int(1.7 * sr)] * np.minimum(1, np.arange(min(len(SWL), int(1.7 * sr))) / (.25 * sr)) ; SWL[-int(.3*sr):] *= np.linspace(1, 0, int(.3*sr))
on = librosa.onset.onset_detect(y=TICKS, sr=sr, units='samples', backtrack=True)
tick_bank = [TICKS[o:o + int(.09 * sr)] * np.hanning(2 * int(.09 * sr))[int(.09 * sr):] ** .5 for o in on]
print('ticks found', len(tick_bank))
L = np.zeros(N + sr * 5); R = np.zeros(N + sr * 5)
def put(t, x, g, pan=0.0):
    i = int(t * sr)
    if i < 0 or i >= N: return
    p = (pan + 1) / 2; L[i:i + len(x)] += x * db(g) * np.cos(p * np.pi / 2); R[i:i + len(x)] += x * db(g) * np.sin(p * np.pi / 2)
def fit(x, d):        # trim to d seconds with a soft tail
    n = min(len(x), int(d * sr)); y = x[:n].copy(); f = min(n, int(.12 * sr)); y[-f:] *= np.linspace(1, 0, f); return y
def tick(t, g=-3): put(t + rng.uniform(-.004, .004), tick_bank[rng.integers(len(tick_bank))], g + rng.uniform(-2, 1), rng.uniform(-.3, .3))
def inv_ease(q):
    lo, hi = 0.0, 1.0
    for _ in range(40):
        m = (lo + hi) / 2
        if V.ease(m) < q: lo = m
        else: hi = m
    return lo
S = [float(x) for x in V.starts]
for si, ((dur, items), s0) in enumerate(zip(V.SCENES, S)):
    for it in items:
        n = type(it).__name__
        if n == 'Line': put(it.t0 + s0 - .05, fit(WH, .25 + .06 * len(it.words)), -17)                 # text reveal
        elif n == 'Wipe':
            put(it.t0 + s0, fit(SCR, it.dur + .1), -19)                                                  # Hebrew written
            if it.lit: put(it.tl + s0, SH, -18)                                                          # teth lights
        elif n == 'Alphabet':
            for j in range(0, len(it.order), 2): tick(it.t0 + s0 + j * it.stag, -4)
            put(it.tc + s0 - .35, fit(SCR, .5), -20)                                                     # circle drawn
        elif n == 'Counter':
            m = 40
            for j in range(m): tick(it.t0 + s0 + it.dur * inv_ease((j + 1) / (m + 1)), -2)
        elif n == 'Chart':
            for chr_ in it.order: tick(it.start(chr_) + s0, -4)
            put(it.tz + s0, SH, -18)
        elif n == 'Pop': put(it.t0 + s0, THS, -15)
        elif n == 'Score':
            tick(it.t0 + s0, -1); tick(it.t0 + s0 + 1.0, -1); tick(it.t0 + s0 + 1.6, -1); put(it.t0 + s0 + 2.2, SH, -18)
put(S[8] + .3, SH, -17)                                                                                # payoff
put(V.SCENES_END + .1, fit(WH, 1.0), -16); put(V.SCENES_END + .8, SH, -17)                                                                         # logo
L, R = L[:N], R[:N]; o = np.stack([L, R], 1)
o = ss.sosfiltfilt(ss.butter(2, 200, 'high', fs=sr, output='sos'), o, axis=0)
fo = int(.03 * sr); o[-fo:] *= np.linspace(1, 0, fo)[:, None]
sf.write('sb/v28d_raw.wav', o, sr, subtype='FLOAT'); print('peak', round(float(np.abs(o).max()), 3))
