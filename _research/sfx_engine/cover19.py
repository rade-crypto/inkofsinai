import sys; sys.path.insert(0, 'sb')
import numpy as np
from PIL import Image, ImageDraw
import build_v26 as V
from build_v26 import *
c = PLATE.copy()
def put(it, y, t=99.0):
    ink = ink_dx(it); it.draw(c, (W - it.w) // 2 + ink, y, t); return y + it.h
y = 300
y = put(Line('One Hebrew letter', 112, 0), y)
y = put(Line([('never appears', RED)], 112, 0), y + 2)
y = put(Line('in Exodus 20.', 112, 0), y + 2)
al = Alphabet(0, 'hole', k=1.0); al.tc = -10     # circle fully drawn
al.draw(c, (W - al.w) // 2, 770, 99.0)
tp = Pop(big_teth, 0); put(tp, 1090)
d = ImageDraw.Draw(c); f = font(46)
tw = sum(f.getlength(ch) + 8 for ch in 'INK OF SINAI'); xx = 540 - tw / 2
for ch in 'INK OF SINAI': d.text((xx, 1790), ch, font=f, fill=(*MUTED, 255)); xx += f.getlength(ch) + 8
c.convert('RGB').save('sb/s19_cover.jpg', quality=95)
