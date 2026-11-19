import sys; sys.path.insert(0, 'sb')
import numpy as np
from PIL import Image, ImageDraw
import build_v26 as V
from build_v26 import *
c = PLATE.copy()
def put(it, y, t=99.0):
    ink = ink_dx(it); it.draw(c, (W - it.w) // 2 + ink, y, t); return y + it.h
y = 330
y = put(Line('The Ten Commandments', 84, 0), y)
y = put(Line([('never say “', INK), ('good', RED), ('.”', INK)], 84, 0), y + 6)
al = Alphabet(0, 'hole', k=1.0); al.tc = -10     # circle fully drawn
y2 = 800
al.draw(c, (W - al.w) // 2, y2, 99.0)
tp = Pop(big_teth, 0); put(tp, 1140)
d = ImageDraw.Draw(c); f = font(46)
tw = sum(f.getlength(ch) + 8 for ch in 'INK OF SINAI'); xx = 540 - tw / 2
for ch in 'INK OF SINAI': d.text((xx, 1790), ch, font=f, fill=(*MUTED, 255)); xx += f.getlength(ch) + 8
c.convert('RGB').save('sb/s19_cover.jpg', quality=95)
im = c.convert('RGB'); im.resize((360, 640)).save('/tmp/cov_small.png'); im.crop((0, 240, 1080, 1680)).resize((270, 360)).save('/tmp/cov_grid.png')
