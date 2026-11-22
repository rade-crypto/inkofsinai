import numpy as np, soundfile as sf, scipy.signal as ss
D='/tmp/claude-0/lf12/lf05v/'
sr=48000; PRE=0.5; SPL=22.50; INS=1.10
T=lambda t: PRE+t+(INS if t>=SPL else 0)
END=T(182.28)+0.75; DUR=END+0.25; N=int(DUR*sr)
vo,_=sf.read(D+'vo_spliced.wav')
v=np.zeros((N,2)); s0=int(PRE*sr); n=min(len(vo),N-s0); v[s0:s0+n]=vo[:n]
cut=int((T(182.28)+0.30)*sr); fz=int(.04*sr); v[cut:cut+fz]*=np.linspace(1,0,fz)[:,None]; v[cut+fz:]=0
mus,msr=sf.read('/tmp/claude-0/lf12/out/music_v7.wav')
if msr!=sr: mus=ss.resample_poly(mus,sr,msr,axis=0)
m=np.zeros((N,2)); m[:min(N,len(mus))]=mus[:N]
fi=int(1.2*sr); m[:fi]*=np.linspace(0,1,fi)[:,None]; fo=int(2.0*sr); m[N-fo:]*=np.linspace(1,0,fo)[:,None]
mono=np.abs(v).mean(1); on=(mono>0.01).astype(float); K=int(.3*sr); c=np.concatenate([[0],np.cumsum(on)])
lo=np.clip(np.arange(N)-K//2,0,N); hi=np.clip(np.arange(N)+K//2,0,N); env=(c[hi]-c[lo])/K
duck=1-0.58*np.clip(env*3,0,1)
rng=np.random.default_rng(3)
def place(buf,t,x,g):
    i=int(t*sr); j=min(N,i+len(x)); buf[i:j]+=x[:j-i]*g
fx=np.zeros((N,2))
def thump(f0=48,d=1.2):
    tt=np.arange(int(d*sr))/sr; f=f0*(1+1.5*np.exp(-tt*18)); ph=2*np.pi*np.cumsum(f)/sr
    x=np.sin(ph)*np.exp(-tt*4.5); nz=rng.normal(0,1,len(tt))*np.exp(-tt*30)
    nz=ss.sosfilt(ss.butter(4,900,'low',fs=sr,output='sos'),nz)*0.6; y=x+nz; return np.stack([y,y],1)/np.abs(y).max()
def whoosh(d=0.9,f1=300,f2=2400):
    nz=rng.normal(0,1,int(d*sr)); tt=np.arange(len(nz))/sr; out=np.zeros_like(nz); seg=int(.02*sr)
    for k in range(0,len(nz),seg):
        fc=f1+(f2-f1)*(k/len(nz)); sos=ss.butter(2,[fc*0.7,fc*1.3],'band',fs=sr,output='sos'); out[k:k+seg]=ss.sosfilt(sos,nz[k:k+seg])
    e=np.sin(np.pi*np.clip(tt/d,0,1))**2; y=out*e; return np.stack([y,y*0.9],1)/np.abs(y).max()
def shimmer(d=1.4):
    tt=np.arange(int(d*sr))/sr; y=sum(np.sin(2*np.pi*f*tt+p)*a for f,a,p in [(880,.5,0),(1318.5,.35,1),(1760,.25,2),(2637,.12,.5)])
    y*=np.exp(-tt*3.2)*(1-np.exp(-tt*60)); return np.stack([y,y],1)/np.abs(y).max()
def ting(d=0.9,f=1900):
    tt=np.arange(int(d*sr))/sr; y=sum(np.sin(2*np.pi*f*r*tt+p)*a for r,a,p in [(1,.6,0),(2.76,.3,1),(5.4,.15,2),(1.5,.2,.4)])
    y*=np.exp(-tt*7)*(1-np.exp(-tt*400)); return np.stack([y,y],1)/np.abs(y).max()
W=lambda t,g=0.07: place(fx,T(t)-0.12,whoosh(0.28,500,3000),g)
for t in [3.06,3.44,3.82,4.18,10.58,35.40,37.30,40.20,41.70,43.20,52.32,58.62,64.78,72.90,78.52,92.30,97.36,119.76,124.46,129.02]: W(t)
place(fx,T(0.30),shimmer(1.2),0.06)
for t in [4.62,4.80,4.98,5.16]: place(fx,T(t),ting(0.5,2400),0.035)
place(fx,T(6.56),shimmer(1.4),0.09)
place(fx,T(9.05),shimmer(1.2),0.08); place(fx,T(11.95),shimmer(1.2),0.08); place(fx,T(15.36),shimmer(1.6),0.10)
place(fx,T(21.74),ting(0.8,1700),0.05); place(fx,T(22.50)+0.05,shimmer(1.2),0.08); place(fx,T(22.94),ting(0.8,1700),0.05)
place(fx,T(25.74),ting(0.8),0.05)
for k in range(4): place(fx,T(28.14)+k*0.16,ting(0.5,1500+200*k),0.04)
place(fx,T(30.46),shimmer(1.0),0.08)
for t in [33.74,66.88,133.96]: place(fx,T(t),shimmer(0.9),0.07)
for t in [36.18,39.34,40.34,41.94]: place(fx,T(t),ting(0.9,1900),0.06)
place(fx,T(44.54),ting(0.9,900),0.05)
for t in [48.18,48.36,48.54,48.72]: place(fx,T(t),ting(0.6,2100),0.05)
place(fx,T(51.30),thump(60,0.9),0.20)
place(fx,T(59.06),ting(0.9),0.05); place(fx,T(71.60),ting(0.9),0.05); place(fx,T(73.96),ting(0.9),0.04)
place(fx,T(77.52),thump(42,1.2),0.16); place(fx,T(80.80),ting(0.9),0.04); place(fx,T(84.46),ting(0.9),0.04)
for t in [86.12,87.94,88.86]: place(fx,T(t)-0.1,whoosh(0.3,400,2600),0.06)
place(fx,T(102.36),ting(0.9),0.05); place(fx,T(104.72),shimmer(1.0),0.06); place(fx,T(105.70),shimmer(1.0),0.06)
place(fx,T(110.16),ting(0.9),0.05)
place(fx,T(114.58),thump(70,0.6),0.12); place(fx,T(126.64),thump(64,0.6),0.10)
place(fx,T(121.54),ting(0.8),0.04); place(fx,T(130.02),ting(0.8),0.04); place(fx,T(137.30),ting(0.8),0.05)
place(fx,T(139.52),ting(0.8,1600),0.04); place(fx,T(141.20),ting(0.8,1600),0.04); place(fx,T(143.94),shimmer(1.0),0.07)
place(fx,T(147.26)-0.2,whoosh(0.8),0.16)
place(fx,T(150.54)-0.02,thump(44,1.6),0.48); place(fx,T(150.54)-0.25,whoosh(0.3,800,3500),0.12)
place(fx,T(152.16),ting(0.9),0.05); place(fx,T(155.50),ting(0.9),0.05)
place(fx,T(157.52),ting(0.8,1800),0.06); place(fx,T(158.32),thump(58,0.9),0.18)
place(fx,T(159.90),shimmer(1.0),0.07); place(fx,T(160.48),ting(0.8),0.04); place(fx,T(162.64),ting(0.8),0.04)
place(fx,T(167.00),thump(38,1.8),0.38)
place(fx,T(169.16)-0.1,whoosh(0.3,400,2600),0.05); place(fx,T(172.04)-0.1,whoosh(0.3,400,2600),0.05)
place(fx,T(178.42),ting(0.9,1500),0.05); place(fx,T(179.62)+0.15,shimmer(1.4),0.08)
place(fx,T(180.90)-0.1,whoosh(0.4,300,2000),0.06)
mix=m*(duck[:,None]*0.42)+v*0.92+fx
mix/=np.abs(mix).max()/0.9
sf.write(D+'mix3.wav',mix.astype(np.float32),sr); print('mix3',round(DUR,2))
