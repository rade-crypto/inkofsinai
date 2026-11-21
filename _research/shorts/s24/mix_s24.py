#!/usr/bin/env python3
"""Renders cues.json to a stereo WAV using the REAL sounds of our own reels: every effect in sfx/ was lifted from the s23 / s20 audio
(the studio synth's output), with the pad removed by spectral subtraction, so nothing here is an imitation:
quill, quill_long, cut (the soft whoosh + quill of a scene change), pluck_D4/Fs4/A4/D5 (other notes are these, re-pitched), tick, and the
whole logo outro. The bed is the reels' own pad, re-woven from short overlapping grains of its pad-only stretches so it never loops audibly.
Usage: python3 mix_s24.py cues.json out.wav [vo.wav [vo_offset_s]]   (with a VO the bed ducks a little under it)"""
import json, sys, pathlib
import numpy as np, scipy.signal as ss, soundfile as sf
sr = 48000; rng = np.random.default_rng(24); D = pathlib.Path(__file__).parent / 'sfx'
J = json.load(open(sys.argv[1])); DUR = J['meta']['DUR'] + .3; N = int(DUR * sr); M = np.zeros((N, 2))
S = {p.stem: sf.read(p)[0] for p in D.glob('*.wav')}
def put(x, at, g=1.):
    i = max(0, int(at * sr)); x = x[:max(0, N - i)]; M[i:i + len(x)] += x * g
F = {'A3': 220.0, 'B3': 246.94, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.0, 'A4': 440.0, 'B4': 493.88, 'D5': 587.33, 'E5': 659.26, 'F#5': 739.99}
SRC = {'D4': 293.66, 'Fs4': 369.99, 'A4': 440.0, 'D5': 587.33}
def pluck(note):
    f = F[note]; k = min(SRC, key=lambda n: abs(np.log(SRC[n] / f))); x = S['pluck_' + k]
    if abs(SRC[k] - f) < 1: return x
    r = SRC[k] / f; return ss.resample_poly(x, int(round(r * 1000)), 1000, axis=0)   # re-pitched from the nearest real pluck
VREF = {'quill': .3, 'tick': .45, 'pluck': .26, 'cut': .18}
qi = 0
for c in J['cues']:
    ty, g = c['type'], c.get('v', 0)
    if ty == 'quill': x = S['quill_long'] if c.get('d', .5) >= .8 else (S['quill'] if qi % 2 == 0 else S['quill2']); qi += 1; put(x, c['t'] - .03, g / VREF['quill'])
    elif ty == 'cut': put(S['cut'], c['t'] - .05, 1.)
    elif ty == 'tick': put(S['tick'], c['t'] - .01, g / VREF['tick'])
    elif ty == 'pluck': put(pluck(c['note']), c['t'] - .02, g / VREF['pluck'])
    elif ty == 'outro': put(S['outro'], c['t'] - .02, 1.)
for t0, notes, v in J['meta']['music'].get('phrases', []):
    for k, n in enumerate(notes): put(pluck(n), t0 + k * .42, v / .4 * .8)
# the pad: grains of the reels' own pad-only audio, 0.7 s Hann windows, 4x overlap
src = [S[k] for k in sorted(S) if k.startswith('pad')]; G = int(.7 * sr); win = np.hanning(G)[:, None]; bed = np.zeros((N + G, 2)); hop = G // 4
for i in range(0, N, hop):
    s = src[rng.integers(len(src))]; o = rng.integers(0, len(s) - G); bed[i:i + G] += s[o:o + G] * win
bed = bed[:N] * (.5 * J['meta']['music'].get('pad', .32) / .32); bed *= np.minimum(1, np.arange(N) / (.5 * sr))[:, None]
M += bed
if len(sys.argv) > 3:   # final mix with the owner's VO
    vo, vsr = sf.read(sys.argv[3]); vo = vo.mean(1) if vo.ndim > 1 else vo
    if vsr != sr: vo = ss.resample_poly(vo, sr, vsr)
    vo = vo / (np.abs(vo).max() + 1e-9) * .7; off = int(float(sys.argv[4]) * sr) if len(sys.argv) > 4 else 0; v = np.zeros(N); v[off:off + len(vo)] = vo[:max(0, N - off)]
    env = ss.sosfilt(ss.butter(2, 6, 'low', fs=sr, output='sos'), np.abs(v)); duck = 1 - .35 * np.clip(env / (env.max() * .25 + 1e-9), 0, 1); M = M * duck[:, None] + v[:, None]
M = np.clip(M, -.98, .98); M *= np.minimum(1, (N - np.arange(N)) / (.3 * sr))[:, None]
sf.write(sys.argv[2], M.astype(np.float32), sr); print('wrote', sys.argv[2], round(DUR, 2), 's')
