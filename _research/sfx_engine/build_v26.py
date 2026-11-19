"""s19 v16: the new storyboard, animated. Clean v8 parchment, v8 lettering. Each animation has its own sound."""
import subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, 'sb')
import base
from base import crop, font, INK, RED, MUTED
from letters import get, AB
W, H, FPS = 1080, 1920, 30
PLATE = Image.open('sb/plate_kit.png').convert('RGBA')
LT = get()
EX = dict(zip(AB, [68,30,2,14,48,53,1,10,0,62,41,52,50,19,2,29,5,8,6,30,42,48]))
ease = lambda x: float(np.clip(x, 0, 1)) ** 2 * (3 - 2 * float(np.clip(x, 0, 1)))
def fade(im, a):
    if a >= .999: return im
    r, g, b, al = im.split(); return Image.merge('RGBA', (r, g, b, al.point(lambda v: int(v * a))))
def tint(im, col):
    a = np.asarray(im)[..., 3]; return Image.fromarray(np.dstack([np.broadcast_to(np.array(col, np.uint8), a.shape + (3,)), a]), 'RGBA')
def sc(im, k): return im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS)

class Item:
    t0 = 0; static = True
    def ev(s): return []
class Gap(Item):
    def __init__(s, h): s.w, s.h = 4, h
    def draw(s, *a): pass
class Line(Item):
    def __init__(s, segs, size, t0, italic=False, track=0, stag=.1, col=None):
        if isinstance(segs, str): segs = [(segs, col or INK)]
        f = font(size, italic); s.t0, s.stag = t0, stag; s.words = []; x = 4.0; s.h = int(size * 1.28)
        for text, c in segs:
            parts = [text] if track else text.replace(' ', ' \0').split('\0')
            for wd in parts:
                wl = sum(f.getlength(ch) + track for ch in wd) if track else f.getlength(wd)
                if wd.strip():
                    im = Image.new('RGBA', (int(wl) + 12, s.h), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
                    if track:
                        cx = 2
                        for ch in wd: d.text((cx, 0), ch, font=f, fill=c); cx += f.getlength(ch) + track
                    else: d.text((2, 0), wd, font=f, fill=c)
                    s.words.append((im, int(x)))
                x += wl
        s.w = int(x) + 8
    def ev(s): return [(s.t0, 'line', 0)]
    def draw(s, c, x, y, t):
        for i, (im, wx) in enumerate(s.words):
            a = ease((t - s.t0 - i * s.stag) / .5)
            if a > 0: c.alpha_composite(fade(im, a), (x + wx, y + int((1 - a) * 14)))
def Label(t, t0, size=44, col=MUTED): return Line([(t, col)], size, t0, track=5)
GOLD = (184, 134, 12)
GLOW_GOLD = (246, 204, 88)
class GlowLine(Line):                  # a gold line with a warm glow behind it (the 5:29 wish)
    PAD = 70
    def __init__(s, text, size, t0, italic=False, stag=.12):
        super().__init__([(text, GOLD)], size, t0, italic, stag=stag)
        base = Image.new('RGBA', (s.w + 2 * s.PAD, s.h + 2 * s.PAD), (0, 0, 0, 0))
        for im, wx in s.words: base.alpha_composite(im, (s.PAD + wx, s.PAD))
        g = gaussian_filter(np.asarray(base.split()[3]).astype(np.float32), 24); g = g / (g.max() + 1e-6) * 190
        s.glow = Image.fromarray(np.dstack([np.broadcast_to(np.array(GLOW_GOLD, np.uint8), g.shape + (3,)), g.astype(np.uint8)]), 'RGBA')
    def draw(s, c, x, y, t):
        q = ease((t - s.t0) / .7)
        if q > 0: c.alpha_composite(fade(s.glow, q), (x - s.PAD, y - s.PAD))
        super().draw(c, x, y, t)
class Wipe(Item):                      # Hebrew written in right to left; optional letter lit red later
    def __init__(s, im, t0, dur=1.0, lit=None, kind='heb', col=None, gcol=None):
        s.im, s.t0, s.dur, s.w, s.h, s.lit, s.kind = im, t0, dur, im.width, im.height, lit, kind
        s.al = np.asarray(im.split()[3]).astype(np.float32)
        if lit:
            x0, x1, s.tl = lit; m = np.zeros_like(s.al); m[:, x0:x1] = 1; s.red = tint(im, col or RED); s.red.putalpha(Image.fromarray((s.al * m).astype(np.uint8)))
            g = gaussian_filter(s.al * m, 22); g = g / (g.max() + 1e-6) * 110
            s.glow = Image.fromarray(np.dstack([np.broadcast_to(np.array(gcol or GLOW, np.uint8), g.shape + (3,)), g.astype(np.uint8)]), 'RGBA')
    def ev(s):
        e = [(s.t0, s.kind, s.dur)]
        if s.lit: e.append((s.tl, 'lit', 0))
        return e
    def draw(s, c, x, y, t):
        p = (t - s.t0) / s.dur
        if p <= 0: return
        if p >= 1: c.alpha_composite(s.im, (x, y))
        else:
            xr = s.w - p * (s.w + 80); m = np.clip((np.arange(s.w) - xr) / 80, 0, 1)[None, :]
            im = s.im.copy(); im.putalpha(Image.fromarray((s.al * m).astype(np.uint8))); c.alpha_composite(im, (x, y))
        if s.lit and t > s.tl:
            q = ease((t - s.tl) / .5); c.alpha_composite(fade(s.glow, q), (x, y)); c.alpha_composite(fade(s.red, min(1, q * 1.4)), (x, y))
class Pop(Item):
    def __init__(s, im, t0): s.im, s.t0, s.w, s.h = im, t0, im.width, im.height
    def ev(s): return [(s.t0, 'stamp', 0)]
    def draw(s, c, x, y, t):
        a = ease((t - s.t0) / .35)
        if a <= 0: return
        k = 1.25 - .25 * a; im = s.im.resize((int(s.w * k), int(s.h * k)), Image.BICUBIC)
        c.alpha_composite(fade(im, a), (x + (s.w - im.width) // 2, y + (s.h - im.height) // 2))
class Counter(Item):
    def __init__(s, n, size, t0, dur, suffix=''):
        s.n, s.t0, s.dur, s.f, s.suf = n, t0, dur, font(size), suffix; s.h = int(size * 1.2); s.w = int(s.f.getlength(f'{n}{suffix}')) + 10
    def ev(s): return [(s.t0, 'count', s.dur)]
    def draw(s, c, x, y, t):
        if t < s.t0: return
        p = ease((t - s.t0) / s.dur); txt = f'{int(round(s.n * p))}{s.suf}'
        ImageDraw.Draw(c).text((x + (s.w - s.f.getlength(f'{s.n}{s.suf}')) / 2, y), txt, font=s.f, fill=INK)
class CounterSwap(Counter):               # counts to n, then the same slot says the point
    def __init__(s, n, size, t0, dur, suffix, t_sw, msg, msize=96):
        super().__init__(n, size, t0, dur, suffix); s.t_sw, s.mf, s.msg = t_sw, font(msize), msg; s.w = 900
    def ev(s): return [(s.t0, 'count', s.dur)]
    def draw(s, c, x, y, t):
        if t < s.t_sw: return super().draw(c, x, y, t)
        a = ease((t - s.t_sw) / .3)
        im = Image.new('RGBA', (s.w, s.h), (0, 0, 0, 0)); ImageDraw.Draw(im).text(((s.w - s.mf.getlength(s.msg)) / 2, 0), s.msg, font=s.mf, fill=INK)
        c.alpha_composite(fade(im, a), (x, y))
class Hair(Item):
    def __init__(s, t0, w=360): s.t0, s.w, s.h = t0, w, 30
    def ev(s): return [(s.t0, 'hair', 0)]
    def draw(s, c, x, y, t):
        p = ease((t - s.t0) / .5)
        if p > 0: ImageDraw.Draw(c).line((x + s.w / 2 * (1 - p), y + 15, x + s.w / 2 * (1 + p), y + 15), fill=(*MUTED, 170), width=2)

from scipy.ndimage import gaussian_filter
GLOW = (214, 140, 60)
def glow_img(w, h, sig, peak):
    p = int(sig * 3); m = np.zeros((h + 2 * p, w + 2 * p), np.float32); m[p:p + h, p:p + w] = 1
    g = gaussian_filter(m, sig); g = g / g.max() * peak
    return Image.fromarray(np.dstack([np.broadcast_to(np.array(GLOW, np.uint8), g.shape + (3,)), g.astype(np.uint8)]), 'RGBA'), p
def letter_at(c, ch, cx, base, k, col=None, a=1.0, dy=0):
    L = sc(LT[ch], k)
    if col == RED and a > 0:
        gi, gp = glow_img(L.width, L.height, 16 * k, 105 * a)
        c.alpha_composite(gi, (int(cx - L.width / 2) - gp, int(base - L.height + dy) - gp))
    if col: L = tint(L, col)
    drop = {'ק': 34, 'י': -26}.get(ch, 0) * k
    c.alpha_composite(fade(L, a), (int(cx - L.width / 2), int(base - L.height + drop + dy)))

class Alphabet(Item):
    """mode 'hole': letters drop in one by one, teth slot gets a red dashed circle.
       mode 'fill': all letters there, teth drops in red at t0."""
    def __init__(s, t0, mode, k=1.1, pitch=78, stag=.065):
        s.t0, s.mode, s.k, s.p, s.stag = t0, mode, k, pitch * k, stag; s.w = int(s.p * 11); s.rh = int(150 * k); s.h = s.rh * 2
        s.order = [ch for ch in AB if ch != 'ט']; s.tc = t0 + len(s.order) * stag + .3
    def ev(s):
        if s.mode == 'fill': return [(s.t0, 'final', 0)]
        return [(s.t0 + i * s.stag, 'drop', 0) for i in range(len(s.order))] + [(s.tc, 'circle', 0)]
    def draw(s, c, x, y, t):
        d = ImageDraw.Draw(c)
        for i, ch in enumerate(AB):
            r, kk = divmod(i, 11); cx = x + s.w - s.p * (kk + .5); base = y + s.rh * r + 110 * s.k
            if ch == 'ט':
                if s.mode == 'hole':
                    p = ease((t - s.tc) / .6); R = 46 * s.k; cy = base - 38 * s.k; cx = cx - 9
                    gi, gp = glow_img(int(R), int(R), 14, 85 * p); c.alpha_composite(gi, (int(cx - R / 2) - gp, int(cy - R / 2) - gp))
                    for a0 in range(0, int(360 * p), 20): d.arc((cx - R, cy - R, cx + R, cy + R), a0 - 90, a0 - 79, fill=RED, width=4)
                else:
                    a = ease((t - s.t0 + .3) / .3); letter_at(c, ch, cx, base, s.k, RED, a, -(1 - a) * 60) if a > 0 else None
                continue
            if s.mode == 'fill': letter_at(c, ch, cx, base, s.k); continue
            a = ease((t - s.t0 - s.order.index(ch) * s.stag) / .28)
            if a > 0: letter_at(c, ch, cx, base, s.k, None, a, -(1 - a) * 50)

class Chart(Item):
    def __init__(s, t0, stag=.12):
        s.t0, s.stag = t0, stag; s.rowh, s.colw = 84, 430; s.w, s.h = s.colw * 2 + 40, s.rowh * 11; s.f = font(66)
        s.order = [ch for ch in AB if ch != 'ט']; s.tz = t0 + len(s.order) * stag + .6
    def start(s, ch): return s.tz if ch == 'ט' else s.t0 + s.order.index(ch) * s.stag
    def ev(s): return [(s.start(ch), 'row', 0) for ch in s.order] + [(s.tz, 'zero', 0)]
    def draw(s, c, x, y, t):
        d = ImageDraw.Draw(c)
        for i, ch in enumerate(AB):
            cc, r = divmod(i, 11); x0 = x + ((s.colw + 40) if cc == 0 else 0); yy = y + r * s.rowh
            a = ease((t - s.start(ch)) / .25)
            if a <= 0: continue
            red = ch == 'ט'; col = INK
            letter_at(c, ch, x0 + s.colw - 50, yy + 73, .86, RED if red else None, a)
            g = ease((t - s.start(ch)) / .45); n = int(round(EX[ch] * g)); bw = int(EX[ch] / 68 * 210 * g)
            if bw: d.rounded_rectangle((x0 + s.colw - 118 - bw, yy + 31, x0 + s.colw - 118, yy + 53), 6, fill=(*MUTED, int(200 * a)))
            txt = str(n); tw = s.f.getlength(txt)
            d.text((x0 + s.colw - 132 - bw - tw, yy + 2), txt, font=s.f, fill=(*col, int(255 * a)))

class Score(Item):
    def __init__(s, t0):
        s.t0, s.w, s.h = t0, 900, 470; s.lab, s.big = font(66), font(230)
    def ev(s): return [(s.t0, 'thud', 0), (s.t0 + 1.0, 'thud', 0), (s.t0 + 1.6, 'step', 0), (s.t0 + 2.2, 'lit', 0)]
    def draw(s, c, x, y, t):
        d = ImageDraw.Draw(c)
        for k, (t1, t2) in enumerate((('EXODUS', '20'), ('DEUT.', '5'))):
            a = ease((t - s.t0 - k * 1.0) / .35)
            if a <= 0: continue
            cx = x + s.w * (.25 + .5 * k)
            tx = t1 + ' ' + t2; tw = sum(s.lab.getlength(ch) + 3 for ch in tx); xx = cx - tw / 2
            for ch in tx: d.text((xx, y), ch, font=s.lab, fill=(*MUTED, int(255 * a))); xx += s.lab.getlength(ch) + 3
            n = '0' if k == 0 else ('0' if t < s.t0 + 1.6 else '1' if t < s.t0 + 2.2 else '2')
            col = INK
            letter_at(c, 'ט', cx - 70, y + 380, 1.25, RED if k else INK, a)
            d.text((cx + 10, y + 120 + (1 - a) * 20), n, font=s.big, fill=(*col, int(255 * a)))
        p = ease((t - s.t0 - .6) / .4)
        if p > 0: d.line((x + s.w / 2, y + 20, x + s.w / 2, y + 20 + (s.h - 30) * p), fill=(*MUTED, 160), width=2)

# ---- v8 lettering ----
PADH = 36
def padim(im): 
    o = Image.new('RGBA', (im.width + 2 * PADH, im.height + 2 * PADH), (0, 0, 0, 0)); o.alpha_composite(im, (PADH, PADH)); return o
tov = padim(crop('20.8', 450, 625, 380, 700, scale=1.0, recolor=INK))
def rightmost(im, k):
    a = np.asarray(im)[..., 3] > 60; col = a.sum(0); x = len(col) - 1
    while col[x] == 0: x -= 1
    r = x
    while x > 0 and col[max(0, x - 5):x].any(): x -= 1
    p = im.crop((max(0, x - 4), 0, r + 5, im.height)); ys = np.where(np.asarray(p)[..., 3] > 30)[0]
    return sc(p.crop((0, ys.min() - 4, p.width, ys.max() + 5)), k)
_bt = rightmost(crop('20.8', 450, 625, 380, 700, recolor=RED), 3.0)
_gi, _gp = glow_img(_bt.width, _bt.height, 38, 110)
big_teth = Image.new('RGBA', _gi.size, (0, 0, 0, 0)); big_teth.alpha_composite(_gi); big_teth.alpha_composite(_bt, (_gp, _gp))
big_teth = sc(big_teth, .62)
h515 = padim(crop('38.5', 345, 485, scale=.98, recolor=INK))
h516 = padim(crop('47.8', 305, 495, scale=1.15, recolor=INK))
h529a = padim(crop('68.3', 505, 690, scale=1.2, recolor=INK)); h529b = crop('72.0', 505, 685, scale=1.2, recolor=INK)
TETH515 = (105 + PADH, 166 + PADH)
R = lambda s: [(s, INK)]

SCENES = [
 (4.3, [Line('One Hebrew letter', 92, 0), Line('never appears in the', 92, .3), Line(R('Ten Commandments.'), 92, .65), Gap(90), Alphabet(1.0, 'hole', k=1.0)]),
 (6.9, [CounterSwap(620, 110, 0, 1.4, ' letters.', 5.1, 'One count is zero.'), Label('EXODUS 20:2–17', .5, 66), Gap(30), Chart(1.6)]),
 (4.6, [Pop(big_teth, 0), Gap(30), Label('TETH', .9, 66), Gap(40), Line('the first letter of', 80, 1.5), Gap(10), Wipe(tov, 2.1, .8, lit=(191 + PADH, 313 + PADH, 3.0), kind='heb'),
        Line('“good.”', 84, 3.0, italic=True)]),
 (3.4, [Line('So the word', 96, 0), Line('“good” is nowhere', 96, .45), Line('in these', 96, .95), Line(R('Ten Commandments.'), 96, 1.35)]),
 (6.7, [Line('Forty years later, Moses', 76, 0), Line('repeats the commandments.', 76, .45), Gap(70), Score(1.5), Gap(60), Line(R('This time, something is added.'), 72, 4.4)]),
 (7.4, [Label('DEUT. 5:15', 0, 66), Gap(30), Wipe(h515, .3, 1.2, lit=(*TETH515, 1.9)), Gap(20), Line('“with a mighty hand and', 70, 2.5, italic=True),
        Line([('an ', INK), ('outstretched', RED), (' arm”', INK)], 70, 2.95, italic=True), Gap(70),
        Line('The arm that brought', 76, 4.8), Line('them out of Egypt.', 76, 5.2)]),
 (8.2, [Label('EXODUS 20:12', 0, 66), Line('“…so that your days', 70, .5, italic=True), Line('may be long”', 70, .95, italic=True),
         Gap(40), Hair(2.0), Gap(40), Label('DEUT. 5:16', 2.6, 66), Line('“…so that your days', 70, 2.8, italic=True), Line('may be long,', 70, 3.25, italic=True),
         Line('and so that it may', 70, 4.2, italic=True), Line([('go well', RED), (' with you”', INK)], 70, 4.65, italic=True), Gap(0), Wipe(h516, 5.6, 1.1, lit=(281 + PADH, 353 + PADH, 6.9))]),
 (5.0, [Label('DEUT. 5:25–27', 0, 66), Gap(30), Line('At Sinai, the people feared', 84, .2, stag=.12), Line('God’s voice, and promised:', 84, .8, stag=.12), Gap(30),
        Line('“We will hear and do.”', 84, 1.7, italic=True, stag=.12)]),
 (4.6, [Line('God responded:', 92, 0, stag=.12), Gap(20), Line('“If only their hearts were', 70, .6, italic=True), Line('always like this, to fear Me', 70, 1.1, italic=True),
        Line('and keep all My commands…”', 70, 1.6, italic=True)]),
 (7.0, [Label('DEUT. 5:29', 0, 66), Gap(20), Wipe(h529a, 0, 1.3, lit=(386 + PADH, 461 + PADH, 1.8), kind='pay', col=GOLD, gcol=GLOW_GOLD), Gap(30), Line('“…so that it may', 72, 1.5, italic=True), GlowLine('go well with them', 96, 2.0, italic=True), Gap(50),
        Wipe(h529b, 3.6, 1.0), Gap(20), Line('and with their children', 66, 4.6, italic=True), Line('forever.”', 66, 5.1, italic=True)]),
]
starts = np.cumsum([0] + [d for d, _ in SCENES]); TOTAL = float(starts[-1])
EV = [(0.05, 'hook', 0), (float(starts[4]), 'rehook', 0), (float(starts[8]) - 2.2 + .3, 'swell', 0)]
for (d, items), s0 in zip(SCENES, starts):
    for it in items:
        for t, k, a in it.ev(): EV.append((float(s0 + t), k, a))
# 5:16 red clause and teth word on טוב
EV += [(float(starts[6]) + 4.2, 'red', 0), (float(starts[2]) + 2.9, 'tov', 0)]

def ink_dx(it):
    if not isinstance(it, (Line, Wipe, Pop)): return 0
    c = Image.new('RGBA', (it.w + 80, it.h + 40), (0, 0, 0, 0)); it.draw(c, 40, 20, 99.0)
    cols = np.where((np.asarray(c.split()[3]) > 120).sum(0) >= 2)[0]
    return int(round((it.w + 80) / 2 - (cols.min() + cols.max()) / 2))
def layout(items, center=900):
    tot = sum(i.h for i in items); assert tot <= 1200, tot
    center = min(max(center, 240 + tot // 2), 1440 - tot // 2); y = center - tot // 2; out = []
    for it in items:
        assert it.w <= 960, (type(it).__name__, it.w)
        out.append((it, (W - it.w) // 2 + ink_dx(it), y)); y += it.h
    return out

LOGO_F0, LOGO_F1 = 2219, 2303          # v8's own logo scene: starts on the blank paper, ends on the held logo
LOGO_D = (LOGO_F1 - LOGO_F0) / FPS
V8 = '/root/.claude/uploads/62f68cc9-e7d6-59b7-8dc3-4eaf3d05d3d7/4cdcf86c-s19_tencommandments_v8.mp4'
SCENES_END = TOTAL
TOTAL_ALL = SCENES_END + LOGO_D

if __name__ == '__main__':
    wr = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                           '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'sb/pic26.mp4'], stdin=subprocess.PIPE)
    for si, ((dur, items), s0) in enumerate(zip(SCENES, starts)):
        lay = layout(items); n = int(round(dur * FPS))
        for k in range(n):
            c = PLATE.copy(); t = k / FPS
            for it, x, y in lay: it.draw(c, x, y, t)
            if k == n - 1: c.convert('RGB').save(f'sb/c25_{si}.jpg', quality=80)
            wr.stdin.write(c.convert('RGB').tobytes())
    rd = subprocess.Popen(['ffmpeg', '-v', 'error', '-ss', f'{LOGO_F0 / FPS:.4f}', '-i', V8, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    from scipy.ndimage import grey_closing
    for k in range(LOGO_F1 - LOGO_F0):
        f = np.frombuffer(rd.stdout.read(W * H * 3), np.uint8).reshape(H, W, 3).astype(np.float32)
        r = f[450:1300]; bg = np.stack([gaussian_filter(grey_closing(r[..., c], size=(31, 31)), 6) for c in range(3)], 2)
        a = np.zeros((H, W), np.float32); a[450:1300] = np.clip(((bg - r).max(2) - 8) / 40, 0, 1) ** .8
        ink = Image.fromarray(np.dstack([f, a * 255]).astype(np.uint8), 'RGBA')
        c = PLATE.copy(); c.alpha_composite(ink)
        if k in (0, 40, 83): c.convert('RGB').save(f'sb/logo25_{k}.jpg', quality=80)
        wr.stdin.write(c.convert('RGB').tobytes())
    rd.kill(); wr.stdin.close(); wr.wait(); print('done', TOTAL_ALL)
