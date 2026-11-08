import numpy as np, soundfile as sf, scipy.signal as ss, subprocess
sr=48000; D='/tmp/claude-0/lf12/b09/'
PRE=.4; VEND=423.7; DUR=PRE+VEND+3.2; N=int(DUR*sr); rng=np.random.default_rng(9)
K=lambda v: PRE+v
# ---------- voice ----------
subprocess.run(['ffmpeg','-v','error','-y','-i','/root/.claude/uploads/c0e0ef4e-798f-5357-87f9-ac8976a01e17/785bfe16-ElevenLabs_2026-11-08T10_47_13_Tomer_ivc_s50_sim75_v4.mp3','-ac','2','-ar',str(sr),D+'vo48.wav'],check=True)
vo,_=sf.read(D+'vo48.wav'); v=np.zeros((N,2)); o=int(PRE*sr); n=min(len(vo),N-o); v[o:o+n]=vo[:n]
# ---------- score: warm, moving, with a pulse in the tense and battle passages ----------
NOTE=lambda m: 440*2**((m-69)/12)
def env(n,a,r):
    x=np.ones(n);A=int(a*sr);R=int(r*sr);x[:A]=np.linspace(0,1,A)**1.5;x[-R:]*=np.linspace(1,0,R)**1.5;return x
def strings(freqs,dur,bright=1400):
    n=int(dur*sr);t=np.arange(n)/sr;y=np.zeros(n)
    for f in freqs:
        for dd,ph in ((-.0035,0),(0,1.3),(.004,2.1)):
            vib=1+.0025*np.sin(2*np.pi*(4.6+dd*90)*t+ph); y+=2*((np.cumsum(f*(1+dd)*vib)/sr)%1)-1
    y=ss.sosfilt(ss.butter(2,bright,'low',fs=sr,output='sos'),y)
    return y*env(n,1.2,2.0)/(len(freqs)*3)
def choir(freqs,dur):
    n=int(dur*sr);t=np.arange(n)/sr;y=np.zeros(n)
    for f in freqs:
        vib=1+.004*np.sin(2*np.pi*5.1*t); ph=2*np.pi*np.cumsum(f*vib)/sr; y+=np.sin(ph)+.35*np.sin(2*ph)+.12*np.sin(3*ph)
    y=ss.sosfilt(ss.butter(2,[300,2400],'band',fs=sr,output='sos'),y)
    return y*env(n,2.0,2.0)/len(freqs)
def ks(freq,dur,decay=1.4):
    n=int(dur*sr);p=int(sr/freq);buf=rng.uniform(-1,1,p);out=np.zeros(n)
    for i in range(n): out[i]=buf[i%p]; buf[i%p]=.5*(buf[i%p]+buf[(i+1)%p])*.996
    out=ss.sosfilt(ss.butter(2,2600,'low',fs=sr,output='sos'),out); return out*np.exp(-np.arange(n)/sr*decay)
def kick(d=.5):
    t=np.arange(int(d*sr))/sr; f=46+70*np.exp(-t*28); y=np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-t*7); return y
def tom(d=.7,f0=90):
    t=np.arange(int(d*sr))/sr; f=f0*(1+.5*np.exp(-t*20)); y=np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-t*5.5)
    nz=ss.sosfilt(ss.butter(2,[150,900],'band',fs=sr,output='sos'),rng.normal(0,1,len(t)))*np.exp(-t*18)*.3; return y+nz
mus=np.zeros((N,2))
def put(x,t0,g,pan=0.):
    i=int(t0*sr)
    if i>=N or i<0: return
    j=min(N,i+len(x)); mus[i:j,0]+=x[:j-i]*g*(1-pan); mus[i:j,1]+=x[:j-i]*g*(1+pan)
# mood map in VO seconds
SEC=[(0,28.6,'myst'),(28.6,53,'build'),(53,63.5,'dark'),(63.5,128,'calm'),(128,139.9,'dark'),(139.9,164.9,'calm'),(164.9,195,'bright'),
     (195,213,'dark'),(213,255.6,'calm'),(255.6,300.7,'build'),(300.7,343,'build2'),(343,377,'battle'),(377,394,'reveal'),(394,DUR,'bright')]
mood=lambda tv: next((m for a,b,m in SEC if a<=tv<b),'calm')
P={'calm':[[50,54,57],[47,50,54],[43,47,50],[45,49,52]],          # D Bm G A
   'bright':[[50,54,57,62],[43,47,50,59],[45,49,52,57],[50,54,57,66]],
   'myst':[[50,53,57],[46,50,53],[48,52,55],[45,49,52]],             # Dm Bb C A
   'dark':[[50,53,57],[46,50,53],[43,46,50],[45,49,52]],
   'build':[[50,53,57],[48,52,55],[46,50,53],[45,49,52]],
   'build2':[[50,53,57],[48,52,55],[46,50,53],[45,49,52]],
   'battle':[[50,53,57],[46,50,53],[48,52,55],[45,49,52]],
   'reveal':[[50,54,57,62],[47,50,54,59],[43,47,50,55],[45,49,52,57]]}
CH=4.0
for k in range(int(DUR/CH)+1):
    t0=k*CH; m=mood(t0-PRE); ch=P[m][k%4]
    br={'dark':1000,'myst':1100}.get(m,1500)
    put(strings([NOTE(x) for x in ch],CH+2.0,br),t0,.30 if m not in ('battle','build2') else .34)
    put(strings([NOTE(ch[0]-12),NOTE(ch[0]-24)],CH+2.0,500),t0,.26)
    if m in ('calm','bright','reveal'): put(choir([NOTE(x+12) for x in ch[:2]],CH+2.0),t0,.05 if m=='calm' else .08)
# harp / ostinato
cache={}
BPM=88; beat=60/BPM
tv=0.0; k=0
while tv<DUR-3:
    m=mood(tv-PRE)
    if m in ('calm','bright','myst','reveal'):
        sc=[62,64,66,69,71,74,76] if m!='myst' else [62,64,65,69,70,74,77]
        mm=sc[(k*3)%7]+(12 if m=='bright' and k%2 else 0)
        if mm not in cache: cache[mm]=ks(NOTE(mm),2.2)
        put(cache[mm],tv,.05 if m!='bright' else .065,pan=.25*np.sin(k*.9)); tv+=beat*2
    else:
        # eighth-note ostinato on D minor: drives the tense and battle passages
        sc=[62,65,69,65,62,65,70,65]; mm=sc[k%8]
        key=('o',mm)
        if key not in cache: cache[key]=ks(NOTE(mm),.9,4.0)
        put(cache[key],tv,.045 if m in ('build','dark') else .06,pan=.2*np.sin(k*1.3)); tv+=beat/2
    k+=1
# pulse: a soft kick on every beat in build/dark; toms join in the battle
KI,TO=kick(),tom()
tv=0.0; b=0
while tv<DUR-2:
    m=mood(tv-PRE)
    if m in ('build','build2','dark','battle'):
        put(KI,tv,.22 if m!='battle' else .3)
        if m=='battle' and b%2==1: put(TO,tv+beat/2,.16,pan=-.2)
        if m in ('battle','build2') and b%4==3: put(TO,tv+beat*.75,.12,pan=.2)
    tv+=beat; b+=1
# swells and hits at the big moments (VO seconds)
def swell(t1,d=2.4,g=.18,f=73.4):
    n=int(d*sr);t=np.arange(n)/sr;y=np.sin(2*np.pi*f*t)*(t/d)**2*np.exp(-np.maximum(0,t-d+.4)*6)
    nz=ss.sosfilt(ss.butter(2,180,'low',fs=sr,output='sos'),rng.normal(0,1,n))*(t/d)**2*.4; put(y+nz,t1-d,g)
for vv in (14.6,52.4,62.5,76.4,123.0,133.5,166.0,205.2,228.0,307.6,330.5,358.0,366.4,386.0,404.0,419.1): swell(K(vv))
for vv in (62.6,205.6,358.2,386.4): put(np.stack([tom(1.2,62)]*1,0)[0],K(vv),.35)
mus=ss.sosfilt(ss.butter(2,35,'high',fs=sr,output='sos'),mus,axis=0)
rev=np.zeros_like(mus)
for dl,g in ((.043,.32),(.071,.26),(.113,.2),(.167,.15),(.241,.11),(.337,.08)):
    s=int(dl*sr); rev[s:,0]+=mus[:-s,1]*g; rev[s:,1]+=mus[:-s,0]*g
mus=mus+ss.sosfilt(ss.butter(2,3000,'low',fs=sr,output='sos'),rev,axis=0)
fi=int(1.0*sr); mus[:fi]*=np.linspace(0,1,fi)[:,None]; fo=int(2.6*sr); mus[N-fo:]*=np.linspace(1,0,fo)[:,None]
# ---------- effects, only where something happens ----------
fx=np.zeros((N,2))
def place(t,x,g):
    i=int(t*sr)
    if i<0 or i>=N: return
    j=min(N,i+len(x)); fx[i:j]+=x[:j-i]*g
def st(y): y=y/np.abs(y).max(); return np.stack([y,y],1)
def shimmer(d=1.8):
    t=np.arange(int(d*sr))/sr; y=sum(np.sin(2*np.pi*f*t+p)*a for f,a,p in [(880,.5,0),(1318.5,.35,1),(1760,.25,2)]); return st(y*np.exp(-t*2.4)*(1-np.exp(-t*40)))
def rumble(d=3.0):
    t=np.arange(int(d*sr))/sr; y=ss.sosfilt(ss.butter(4,160,'low',fs=sr,output='sos'),rng.normal(0,1,len(t)))*np.exp(-t*1.2)*(1-np.exp(-t*15)); return st(y)
def smash(d=1.2):
    t=np.arange(int(d*sr))/sr; y=ss.sosfilt(ss.butter(2,[900,7000],'band',fs=sr,output='sos'),rng.normal(0,1,len(t)))*np.exp(-t*7)
    for k in range(14): s=int(rng.uniform(.02,.5)*sr); y[s:s+400]+=rng.normal(0,.8,min(400,len(y)-s))*np.exp(-np.arange(min(400,len(y)-s))/80)
    return st(y)
def horn(d=2.2,f=196):
    t=np.arange(int(d*sr))/sr; fr=f*(1+.03*np.sin(2*np.pi*5*t))*(1-.04*np.exp(-t*6)); ph=2*np.pi*np.cumsum(fr)/sr
    y=(np.sin(ph)+.5*np.sin(2*ph)+.3*np.sin(3*ph)+.15*np.sin(4*ph))*np.minimum(1,t*8)*np.exp(-np.maximum(0,t-d+.6)*5)
    return st(ss.sosfilt(ss.butter(2,[150,2500],'band',fs=sr,output='sos'),y))
def whoosh(d=1.0):
    t=np.arange(int(d*sr))/sr; y=ss.sosfilt(ss.butter(2,[300,3000],'band',fs=sr,output='sos'),rng.normal(0,1,len(t)))*np.sin(np.pi*t/d)**2; return st(y)
SHM,RU,SM,HO,WH=shimmer(),rumble(),smash(),horn(),whoosh()
for vv in (15.8,38.0,56.0,76.5,107.2,123.0,166.0,228.0,292.0,334.0,386.6,404.5,420.0): place(K(vv),SHM,.03)
for vv in (62.5,205.2,374.5): place(K(vv),RU,.12)
place(K(358.0),SM,.09); place(K(357.2),HO,.06); place(K(357.5),HO[:, :],.04)
for vv in (122.9,): place(K(vv),WH,.05)
# ---------- mix ----------
mono=np.abs(v).mean(1); on=(mono>0.01).astype(float); Kk=int(.35*sr); c=np.concatenate([[0],np.cumsum(on)])
lo=np.clip(np.arange(N)-Kk//2,0,N); hi=np.clip(np.arange(N)+Kk//2,0,N); e=(c[hi]-c[lo])/Kk
duck=1-0.45*np.clip(e*3,0,1)
mus*= .03/max(1e-6,np.sqrt((mus**2).mean()))
out=v+mus*duck[:,None]+fx
pk=np.abs(out).max(); out*= .95/pk if pk>.95 else 1
sf.write(D+'mix09.wav',out,sr)
subprocess.run(['ffmpeg','-v','error','-y','-i',D+'mix09.wav','-af','loudnorm=I=-15:TP=-1.5:LRA=9','-ar','48000','-c:a','libmp3lame','-b:a','160k',D+'mix09.mp3'],check=True)
print('DUR',DUR)
