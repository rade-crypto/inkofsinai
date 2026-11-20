#!/usr/bin/env python3
"""Renders a cues.json (s20/s23/s24 format) to a stereo WAV: a stand-in for the studio's synth_ep9.py, which is not in the repo.
Palette: soft D-major pad that follows meta.music.chords, Karplus-Strong plucks, quill (filtered paper-noise scratch), soft cut whoosh,
ticks, low swell, boom, hit, roll, air. Quiet and sparse: the voiceover sits on top.
Usage: python3 synth_s24.py cues.json out.wav [vo.wav [vo_offset_s]]   (with a VO: music ducks under it, then a gentle limiter)"""
import json, sys
import numpy as np, scipy.signal as ss, soundfile as sf
sr = 48000; rng = np.random.default_rng(24)
J = json.load(open(sys.argv[1])); DUR = J['meta']['DUR'] + .6; N = int(DUR * sr); L = np.zeros(N); R = np.zeros(N)
NOTE = {'A3': 220.0, 'B3': 246.94, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.0, 'A4': 440.0, 'B4': 493.88, 'D5': 587.33, 'E5': 659.26, 'F#5': 739.99}
CHORD = {'D': [146.83, 220.0, 293.66, 369.99], 'G': [196.0, 246.94, 293.66, 392.0], 'A': [220.0, 277.18, 329.63, 440.0], 'Bm': [123.47, 246.94, 293.66, 369.99]}
T = lambda d: np.arange(int(d * sr)) / sr
def put(x, at, pan=0., g=1.):
    i = int(at * sr); x = x[:max(0, N - i)]; L[i:i + len(x)] += x * g * (1 - pan) ** .5 * .9; R[i:i + len(x)] += x * g * (1 + pan) ** .5 * .9
def bp(x, lo, hi, o=2): return ss.sosfilt(ss.butter(o, [lo, hi], 'band', fs=sr, output='sos'), x)
def lp(x, f, o=2): return ss.sosfilt(ss.butter(o, f, 'low', fs=sr, output='sos'), x)
def pluck(f, d=2.6):
    p = int(sr / f); buf = rng.uniform(-1, 1, p); buf = lp(buf, 2400); out = np.zeros(int(d * sr))
    for i in range(len(out)): out[i] = buf[i % p]; buf[i % p] = .996 * .5 * (buf[i % p] + buf[(i + 1) % p])
    return lp(out, 3200) * np.exp(-T(d) * 1.1) * .5
def quill(d=.5):
    t = T(d); n = rng.standard_normal(len(t)); env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** .7 * (1 + .6 * np.sin(2 * np.pi * 23 * t + 3 * np.sin(2 * np.pi * 5 * t)))
    return bp(n, 2500, 7000) * env * .08
def whoosh(d=.7):
    t = T(d); n = rng.standard_normal(len(t)); sweep = np.concatenate([bp(n[i:i + 2400], 300 + 2500 * (i / len(n)), 900 + 4000 * (i / len(n))) for i in range(0, len(n), 2400)])
    return sweep[:len(t)] * np.sin(np.pi * t / d) ** 2 * .22
def tick(): t = T(.05); return bp(rng.standard_normal(len(t)), 1800, 5200) * np.exp(-t * 140) * .5
def swell(d=1.6):
    t = T(d + 1.2); f = 73.42; x = sum(np.sin(2 * np.pi * f * k * t) / k ** 1.5 for k in (1, 2, 3, 4)); return lp(x, 600) * np.sin(np.pi * np.clip(t / (d + 1.2), 0, 1)) ** 2 * .16
def boom(): t = T(1.8); return np.sin(2 * np.pi * (48 + 30 * np.exp(-t * 6)) * t) * np.exp(-t * 2.2) * .55
def hit(): t = T(1.2); return np.sin(2 * np.pi * (60 + 50 * np.exp(-t * 10)) * t) * np.exp(-t * 4) * .6 + bp(rng.standard_normal(len(t)), 200, 1800) * np.exp(-t * 30) * .25
def roll(d=.7): t = T(d); return bp(rng.standard_normal(len(t)), 400, 2600) * (t / d) ** 2 * .25
def air(d=1.0): t = T(d); return bp(rng.standard_normal(len(t)), 900, 9000) * np.sin(np.pi * t / d) ** 2 * .1
FX = {'quill': lambda c: quill(c.get('d', .5)), 'whoosh': lambda c: whoosh(c.get('d', .7)), 'tick': lambda c: tick(), 'swell': lambda c: swell(c.get('d', 1.6)),
      'boom': lambda c: boom(), 'hit': lambda c: hit(), 'roll': lambda c: roll(c.get('d', .7)), 'air': lambda c: air(c.get('d', 1.0)), 'pluck': lambda c: pluck(NOTE[c['note']])}
for i, c in enumerate(J['cues']):
    put(FX[c['type']](c), c['t'], pan=(-.25 if c['type'] == 'pluck' and i % 2 else .25 if c['type'] == 'pluck' else 0), g=c.get('v', .3) * 2.2)
# music bed: pad on the chord changes, three short pluck phrases
mu = J['meta']['music']; ch = mu['chords'] + [[DUR, None]]
for (t0, name), (t1, _) in zip(ch, ch[1:]):
    d = t1 - t0 + 1.2; t = T(d); env = np.minimum(1, t / .9) * np.minimum(1, np.maximum(0, (d - t) / 1.1))
    x = sum(np.sin(2 * np.pi * f * t + .002 * np.sin(2 * np.pi * .3 * t)) * (.5 if j == 0 else .3) + .15 * np.sin(2 * np.pi * f * 2.003 * t) for j, f in enumerate(CHORD[name]))
    x = lp(x, 900) * env * mu['pad'] * .09; put(x, t0, pan=-.15); put(np.roll(x, 900), t0, pan=.15)
for t0, notes, v in mu['phrases']:
    for k, n in enumerate(notes): put(pluck(NOTE[n], 3.0), t0 + k * .42, pan=.3 - .2 * k, g=v * .7)
# room: a short, soft reverb
ir = rng.standard_normal(int(1.6 * sr)) * np.exp(-T(1.6) * 4.2); ir = lp(ir, 5000) * .05
L += ss.fftconvolve(L, ir)[:N] * .5; R += ss.fftconvolve(R, np.roll(ir, 311))[:N] * .5
mus = np.stack([L, R], 1)
if len(sys.argv) > 3:   # final mix with the owner's VO: duck the bed under speech
    vo, vsr = sf.read(sys.argv[3]); vo = vo.mean(1) if vo.ndim > 1 else vo
    if vsr != sr: vo = ss.resample_poly(vo, sr, vsr)
    off = int(float(sys.argv[4]) * sr) if len(sys.argv) > 4 else 0; v = np.zeros(N); v[off:off + len(vo)] = vo[:max(0, N - off)]
    envv = lp(np.abs(v), 6); duck = 1 - .45 * np.clip(envv / (envv.max() * .25 + 1e-9), 0, 1)
    mus = mus * duck[:, None] + v[:, None] * .9
pk = np.abs(mus).max(); mus = np.tanh(mus / pk * 1.2) * (.85 if len(sys.argv) > 3 else .5) if pk > 0 else mus   # bed alone sits at about -6 dB peak, under where the VO will go
fade = np.minimum(1, (N - np.arange(N)) / (.5 * sr)); mus *= fade[:, None]
sf.write(sys.argv[2], mus.astype(np.float32), sr); print('wrote', sys.argv[2], round(DUR, 2), 's')
