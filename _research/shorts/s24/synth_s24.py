#!/usr/bin/env python3
"""Renders a cues.json (s20/s23/s24 format) to a stereo WAV. The studio's synth_ep9.py is not in the repo, so this one was rebuilt by
measurement against the posted s23 reel's audio (same cue sheet in, band levels per cue type compared until they matched within ~3 dB):
- pad: a steady D drone (D2 strongest, D3, A3, D4, a detuned F#4 trio, D5), no swelling per chord; the chord list only colours two soft upper tones
- quill: broadband paper scratch 1–10 kHz with a room tail; whoosh: softer, lower (1–2.5 kHz); tick: barely there
- pluck: bright Karplus-Strong with a long ring; swell: a mid tone (400–1000 Hz) that peaks late; roll: loud paper roll; hit: low thump (60–150 Hz)
Overall level as s23: about -31 dB mean, -10 dB peak. Usage: python3 synth_s24.py cues.json out.wav [vo.wav [vo_offset_s]]  (with a VO the bed ducks under it)"""
import json, sys
import numpy as np, scipy.signal as ss, soundfile as sf
sr = 48000; rng = np.random.default_rng(24)
J = json.load(open(sys.argv[1])); DUR = J['meta']['DUR'] + .4; N = int(DUR * sr); L = np.zeros(N); R = np.zeros(N)
NOTE = {'A3': 220.0, 'B3': 246.94, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.0, 'A4': 440.0, 'B4': 493.88, 'D5': 587.33, 'E5': 659.26, 'F#5': 739.99}
COLOR = {'D': [440.0, 739.99], 'G': [392.0, 493.88], 'A': [329.63, 554.37], 'Bm': [493.88, 739.99]}
T = lambda d: np.arange(int(d * sr)) / sr
def put(x, at, pan=0., g=1.):
    i = int(at * sr); x = x[:max(0, N - i)]; L[i:i + len(x)] += x * g * (1 - pan) ** .5; R[i:i + len(x)] += x * g * (1 + pan) ** .5
def bp(x, lo, hi, o=2): return ss.sosfilt(ss.butter(o, [lo, hi], 'band', fs=sr, output='sos'), x)
def lp(x, f, o=2): return ss.sosfilt(ss.butter(o, f, 'low', fs=sr, output='sos'), x)
def hp(x, f, o=2): return ss.sosfilt(ss.butter(o, f, 'high', fs=sr, output='sos'), x)
def pluck(f, d=3.2):
    p = int(sr / f); buf = rng.uniform(-1, 1, p); out = np.zeros(int(d * sr))
    for i in range(len(out)): out[i] = buf[i % p]; buf[i % p] = .9985 * .5 * (buf[i % p] + buf[(i + 1) % p])
    return lp(out, 2600, 1) * np.exp(-T(d) * .9) * .13
def quill(d=.5):
    t = T(d); n = rng.standard_normal(len(t)); env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** .6 * (.7 + .5 * np.abs(np.sin(2 * np.pi * 17 * t + 2 * np.sin(2 * np.pi * 4 * t))))
    return (bp(n, 1000, 9000) + .5 * bp(n, 2500, 6000)) * env * .02
def whoosh(d=.7): t = T(d); n = rng.standard_normal(len(t)); return (bp(n, 900, 2600) + .7 * bp(n, 2500, 6000)) * np.sin(np.pi * t / d) ** 2 * .055
def tick(): t = T(.04); return bp(rng.standard_normal(len(t)), 1500, 4000) * np.exp(-t * 160) * .012
def swell(d=1.6): t = T(d + 1.0); x = sum(np.sin(2 * np.pi * f * t) for f in (440.0, 587.33, 739.99)); return x * np.clip(t / d, 0, 1) ** 2 * np.clip((d + 1.0 - t) / 1.0, 0, 1) * .006
def boom(): t = T(1.6); return np.sin(2 * np.pi * (55 + 25 * np.exp(-t * 6)) * t) * np.exp(-t * 2.4) * .12
def hit(): t = T(1.4); return np.sin(2 * np.pi * (73.42 + 40 * np.exp(-t * 12)) * t) * np.exp(-t * 3) * .085 + lp(rng.standard_normal(len(t)), 500) * np.exp(-t * 25) * .012
def roll(d=.7): t = T(d); return bp(rng.standard_normal(len(t)), 400, 9000) * np.sin(np.pi * t / d) ** 1.5 * .075
FX = {'quill': lambda c: quill(c.get('d', .5)), 'whoosh': lambda c: whoosh(c.get('d', .7)), 'tick': lambda c: tick(), 'swell': lambda c: swell(c.get('d', 1.6)),
      'boom': lambda c: boom(), 'hit': lambda c: hit(), 'roll': lambda c: roll(c.get('d', .7)), 'pluck': lambda c: pluck(NOTE[c['note']])}
VREF = {'quill': .3, 'whoosh': .18, 'tick': .26, 'pluck': .26, 'hit': .5, 'boom': .2}
for i, c in enumerate(J['cues']):
    ty = c['type']; put(FX[ty](c), c['t'], pan=((-.15 if i % 2 else .15) if ty == 'pluck' else (.08 if i % 2 else -.08) if ty == 'quill' else 0), g=c.get('v', VREF.get(ty, 1)) / VREF.get(ty, 1))
mu = J['meta']['music']
for t0, notes, v in mu['phrases']:
    for k, n in enumerate(notes): put(pluck(NOTE[n]), t0 + k * .42, pan=.3 - .2 * k, g=v / .4)
ir = rng.standard_normal(int(1.4 * sr)) * np.exp(-T(1.4) * 4.5); ir = hp(lp(ir, 3200), 250) * .03   # small room, on the effects only
L += ss.fftconvolve(L, ir)[:N]; R += ss.fftconvolve(R, np.roll(ir, 331))[:N]
# pad: steady D drone, measured partials (Hz, dB re D2)
t = T(DUR)[:N]; pad = np.zeros(N); padR = np.zeros(N)
for f, db, det in [(73.42, 0, 0), (146.83, -4, .05), (220.0, -5, .07), (293.66, 0, .1), (368.2, -7, 0), (370.0, -8, 0), (371.9, -8, 0), (587.33, -10, .15)]:
    a = 10 ** (db / 20); pad += a * np.sin(2 * np.pi * f * t); padR += a * np.sin(2 * np.pi * (f + det * .3) * t + rng.uniform(0, .6))
ch = mu['chords'] + [[DUR, None]]; col = np.zeros(N)
for (t0, name), (t1, _) in zip(ch, ch[1:]):
    i0, i1 = int(t0 * sr), min(N, int((t1 + 1.0) * sr)); tt = np.arange(i1 - i0) / sr; env = np.minimum(1, tt / 1.2) * np.minimum(1, np.maximum(0, (tt[-1] - tt) / 1.0))
    col[i0:i1] += sum(np.sin(2 * np.pi * f * tt) for f in COLOR[name]) * env * 10 ** (-17 / 20)
g = mu.get('pad', .32) / .32 * .0145; fin = np.minimum(1, t / .6)
L += (pad + col) * g * fin; R += (padR + col) * g * fin
mus = np.stack([L, R], 1)
if len(sys.argv) > 3:   # final mix with the owner's VO: duck the bed a little under speech
    vo, vsr = sf.read(sys.argv[3]); vo = vo.mean(1) if vo.ndim > 1 else vo
    if vsr != sr: vo = ss.resample_poly(vo, sr, vsr)
    vo = vo / (np.abs(vo).max() + 1e-9) * .7; off = int(float(sys.argv[4]) * sr) if len(sys.argv) > 4 else 0; v = np.zeros(N); v[off:off + len(vo)] = vo[:max(0, N - off)]
    envv = lp(np.abs(v), 6); duck = 1 - .35 * np.clip(envv / (envv.max() * .25 + 1e-9), 0, 1); mus = mus * duck[:, None] + v[:, None]
mus = np.clip(mus, -.98, .98); fade = np.minimum(1, (N - np.arange(N)) / (.35 * sr)); mus *= fade[:, None]
sf.write(sys.argv[2], mus.astype(np.float32), sr); print('wrote', sys.argv[2], round(DUR, 2), 's')
