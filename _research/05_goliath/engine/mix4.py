import numpy as np, soundfile as sf, scipy.signal as ss, json, sys
D='/tmp/claude-0/lf12/lf05v/'
HALF=int(sys.argv[1]); sr=48000; PRE=0.5
INS=json.load(open(D+'ins.json'))
TG=lambda t: t+sum(d for v,d in INS if t>=v)
VO0=0 if HALF==1 else 180.55
T=lambda t: PRE+TG(t)-TG(VO0)
END1=PRE+TG(179.98)+2.4; DUR1=END1+0.25
END=END1 if HALF==1 else T(328.74)+4.5; DUR=END+0.25; N=int(DUR*sr)
vo,_=sf.read(D+'vo_spliced.wav')
if vo.ndim==1: vo=np.stack([vo,vo],1)
# insert silent pauses (the 22.50 entry is the spliced word, already in vo_spliced)
S=lambda v: v+(1.10 if v>=22.5 else 0)
segs=[];prev=0
for v,d in INS:
    if v==22.5: continue
    p=int(S(v)*sr); seg=vo[prev:p].copy(); f=int(.01*sr); seg[-f:]*=np.linspace(1,0,f)[:,None]
    if prev>0: seg[:f]*=np.linspace(0,1,f)[:,None]
    segs.append(seg); segs.append(np.zeros((int(d*sr),2))); prev=p
segs.append(vo[prev:]); ed=np.concatenate(segs)
v=np.zeros((N,2)); a0=int(TG(VO0)*sr); s0=int(PRE*sr); n=min(len(ed)-a0,N-s0); v[s0:s0+n]=ed[a0:a0+n]
if HALF==1:
    cut=int((T(179.98)+0.35)*sr); fz=int(.04*sr); v[cut:cut+fz]*=np.linspace(1,0,fz)[:,None]; v[cut+fz:]=0
mus,msr=sf.read('/tmp/claude-0/lf12/out/music_v7.wav')
if msr!=sr: mus=ss.resample_poly(mus,sr,msr,axis=0)
mo=0 if HALF==1 else int(DUR1*sr)
m=np.zeros((N,2)); seg=mus[mo:mo+N]; m[:len(seg)]=seg
fi=int((1.2 if HALF==1 else 0.3)*sr); m[:fi]*=np.linspace(0,1,fi)[:,None]; fo=int((1.0 if HALF==1 else 3.0)*sr); m[N-fo:]*=np.linspace(1,0,fo)[:,None]
mono=np.abs(v).mean(1); on=(mono>0.01).astype(float); K=int(.3*sr); c=np.concatenate([[0],np.cumsum(on)])
lo=np.clip(np.arange(N)-K//2,0,N); hi=np.clip(np.arange(N)+K//2,0,N); env=(c[hi]-c[lo])/K
duck=1-0.58*np.clip(env*3,0,1)
tt=np.arange(N)/sr
if HALF==1:  # music drops away from "Now watch where the stone goes" until the stone hits
    a,b=T(143.70),T(150.54); g=np.ones(N); g-=0.8*np.clip((tt-a)/0.8,0,1)*(tt<b); g[tt>=b]=1-0.8*np.clip(1-(tt[tt>=b]-b)/0.6,0,1); duck*=g
rng=np.random.default_rng(3)
fx=np.zeros((N,2))
def place(t,x,g):
    i=int(t*sr)
    if i<0 or i>=N: return
    j=min(N,i+len(x)); fx[i:j]+=x[:j-i]*g
def thump(f0=48,d=1.2):
    t_=np.arange(int(d*sr))/sr; f=f0*(1+1.5*np.exp(-t_*18)); ph=2*np.pi*np.cumsum(f)/sr
    x=np.sin(ph)*np.exp(-t_*4.5); nz=rng.normal(0,1,len(t_))*np.exp(-t_*30); nz=ss.sosfilt(ss.butter(4,900,'low',fs=sr,output='sos'),nz)*0.6; y=x+nz; return np.stack([y,y],1)/np.abs(y).max()
def whoosh(d=0.9,f1=300,f2=2400):
    nz=rng.normal(0,1,int(d*sr)); t_=np.arange(len(nz))/sr; out=np.zeros_like(nz); seg=int(.02*sr)
    for k in range(0,len(nz),seg):
        fc=f1+(f2-f1)*(k/len(nz)); sos=ss.butter(2,[fc*0.7,fc*1.3],'band',fs=sr,output='sos'); out[k:k+seg]=ss.sosfilt(sos,nz[k:k+seg])
    e=np.sin(np.pi*np.clip(t_/d,0,1))**2; y=out*e; return np.stack([y,y*0.9],1)/np.abs(y).max()
def shimmer(d=1.4):
    t_=np.arange(int(d*sr))/sr; y=sum(np.sin(2*np.pi*f*t_+p)*a for f,a,p in [(880,.5,0),(1318.5,.35,1),(1760,.25,2),(2637,.12,.5)])
    y*=np.exp(-t_*3.2)*(1-np.exp(-t_*60)); return np.stack([y,y],1)/np.abs(y).max()
def ting(d=0.9,f=1900):
    t_=np.arange(int(d*sr))/sr; y=sum(np.sin(2*np.pi*f*r*t_+p)*a for r,a,p in [(1,.6,0),(2.76,.3,1),(5.4,.15,2),(1.5,.2,.4)])
    y*=np.exp(-t_*7)*(1-np.exp(-t_*400)); return np.stack([y,y],1)/np.abs(y).max()
TI=lambda t,g=.05,f=1900: place(T(t),ting(0.9,f),g)
if HALF==1:
    place(T(0)+0.05,thump(40,1.6),0.30)
    for t in [3.06,3.28,3.50]: TI(t,.03,2200)
    for t in [4.30,4.90,5.50,6.00]: TI(t,.035,2400)
    place(T(6.56),shimmer(1.4),0.09)
    place(T(7.64)-0.25,whoosh(0.7,300,1800),0.07)
    place(T(9.20),shimmer(1.2),0.08); place(T(12.10),shimmer(1.2),0.08); place(T(15.36),thump(52,1.0),0.14); place(T(15.36),shimmer(1.6),0.08)
    place(T(22.50)-1.02,shimmer(1.2),0.08); TI(24.10,.05,1700); TI(25.74)
    for k in range(4): place(T(28.14)+k*0.16,ting(0.5,1500+200*k),0.04)
    place(T(30.46),shimmer(1.0),0.08); place(T(31.60),thump(46,1.4),0.12)
    for t in [33.74,66.88,133.96]: place(T(t),shimmer(0.9),0.07)
    for t in [36.18,39.34,40.34,41.94]: TI(t,.06)
    TI(44.54,.06,900)
    for t in [48.18,48.36,48.54,48.72]: TI(t,.05,2100)
    place(T(48.54),thump(60,0.9),0.18)
    TI(59.06); TI(69.74,.04); TI(71.60); TI(73.96,.04); TI(77.52,.05); TI(80.80,.04); TI(84.46,.05)
    for t in [86.12,87.94,88.86]: place(T(t)-0.05,thump(64,0.5),0.06)
    TI(102.36); place(T(104.72),shimmer(1.0),0.06); place(T(105.70),shimmer(1.0),0.06)
    TI(110.16); place(T(114.58),thump(70,0.6),0.10); TI(115.88,.04); TI(121.54,.04); TI(130.02,.04); TI(137.30)
    TI(139.52,.04,1600); TI(141.20,.04,1600); place(T(143.94),shimmer(1.0),0.07)
    place(T(147.26)-0.2,whoosh(0.8),0.14)
    place(T(150.54)-0.02,thump(42,1.8),0.55); place(T(150.54)-0.3,whoosh(0.35,800,3500),0.12)
    TI(152.16); TI(155.50); TI(157.52,.06,1800); place(T(158.32),thump(58,0.9),0.18)
    place(T(159.90),shimmer(1.0),0.07); TI(160.48,.04); TI(162.64,.05)
    place(T(167.00),thump(38,1.8),0.36); TI(176.80,.04); TI(178.60,.05,1500); place(T(179.62)+0.15,shimmer(1.6),0.09)
else:
    place(T(183.46),shimmer(1.0),0.05)
    TI(191.90,.05); TI(192.84,.04); place(T(194.56),shimmer(1.2),0.07); TI(199.88,.05); TI(200.48,.05)
    place(T(201.50),shimmer(0.9),0.07); TI(206.82,.04,1500); TI(208.20,.04)
    place(T(210.56),thump(70,0.6),0.10); TI(214.26,.04)
    TI(219.66,.05); TI(221.04,.05); place(T(225.06),shimmer(1.4),0.08)
    TI(232.42,.05); TI(233.48,.05); TI(242.10,.04); place(T(244.42),shimmer(1.2),0.08); TI(245.34,.05)
    TI(247.38,.04); TI(248.48,.04); TI(249.78,.04); TI(251.00,.05,1400)
    place(T(255.62),thump(66,0.6),0.10); TI(260.08,.04)
    for t in [264.84,265.56,266.24]: TI(t,.05,1700)
    TI(271.56,.06); TI(272.02,.05); TI(276.44,.05); TI(279.04,.05)
    place(T(284.82),ting(0.9),0.05); place(T(290.24),thump(48,1.2),0.16); TI(291.90,.05); place(T(292.50)-0.2,whoosh(0.9,250,1600),0.10)
    TI(296.26,.05); TI(305.20,.04); place(T(309.44),shimmer(1.2),0.08); TI(309.88,.05)
    TI(314.28,.05); place(T(324.38),shimmer(2.0),0.07); place(T(328.46),shimmer(2.4),0.08)
mix=m*(duck[:,None]*0.42)+v*0.92+fx
mix/=np.abs(mix).max()/0.9
sf.write(D+f'mix4_h{HALF}.wav',mix.astype(np.float32),sr); print('mix',HALF,round(DUR,2))
