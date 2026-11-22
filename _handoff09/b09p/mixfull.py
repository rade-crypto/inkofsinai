import numpy as np, soundfile as sf, scipy.signal as ss, subprocess
sr=48000; D='/tmp/claude-0/lf12/b09p/'; PRE=.4; K=lambda v:PRE+v; rng=np.random.default_rng(4)
subprocess.run(['ffmpeg','-v','error','-y','-i','/tmp/claude-0/lf12/b09/mix09.mp3','-ar',str(sr),'-ac','2',D+'base.wav'],check=True)
base,_=sf.read(D+'base.wav');N=len(base);fx=np.zeros((N,2))
def st(y,pan=0.):y=y/(np.abs(y).max()+1e-9);return np.stack([y*(1-max(0,pan)),y*(1+min(0,pan))],1)
def place(t,x,g):
  i=int(t*sr);j=min(N,i+len(x));fx[i:j]+=x[:j-i]*g
T=lambda d:np.arange(int(d*sr))/sr
def tom(d=.8,f0=70):t=T(d);f=f0*(1+1.2*np.exp(-t*18));return st(np.sin(2*np.pi*np.cumsum(f)/sr)*np.exp(-t*4.5)*(1-np.exp(-t*300)))
def rustle(d=.4):t=T(d);return st(ss.sosfilt(ss.butter(2,[1200,6000],'band',fs=sr,output='sos'),rng.normal(0,1,len(t)))*np.sin(np.pi*t/d)**1.5*(.6+.4*np.sin(2*np.pi*23*t)))
def chime():t=T(1.6);y=sum(np.sin(2*np.pi*f*t+p)*a for f,a,p in [(1046.5,.5,0),(1568,.3,1),(2093,.2,2)]);return st(y*np.exp(-t*3)*(1-np.exp(-t*60)))
def tick():t=T(.08);return st(ss.sosfilt(ss.butter(2,[2000,8000],'band',fs=sr,output='sos'),rng.normal(0,1,len(t)))*np.exp(-t*80))
def whoosh(d=.9):t=T(d);return st(ss.sosfilt(ss.butter(2,[300,3000],'band',fs=sr,output='sos'),rng.normal(0,1,len(t)))*np.sin(np.pi*t/d)**2)
def scratch(d=1.7):t=T(d);return st(ss.sosfilt(ss.butter(2,[2500,9000],'band',fs=sr,output='sos'),rng.normal(0,1,len(t)))*(.5+.5*np.abs(np.sin(2*np.pi*7*t)))*np.minimum(1,t*6)*np.minimum(1,(d-t)*6))
def crackle(d):
  n=int(d*sr);y=ss.sosfilt(ss.butter(2,[200,1200],'band',fs=sr,output='sos'),rng.normal(0,.25,n))
  for k in range(int(d*14)):s=int(rng.uniform(0,d-.02)*sr);L=int(rng.uniform(60,300));y[s:s+L]+=rng.normal(0,1,L)*np.exp(-np.arange(L)/(L/4))*rng.uniform(.3,1)
  y*=np.minimum(1,np.arange(n)/(.25*sr))*np.minimum(1,(n-np.arange(n))/(.25*sr));return st(y)
def horn(d=2.4,f=196):t=T(d);fr=f*(1+.03*np.sin(2*np.pi*5*t))*(1-.04*np.exp(-t*6));ph=2*np.pi*np.cumsum(fr)/sr;y=(np.sin(ph)+.5*np.sin(2*ph)+.3*np.sin(3*ph))*np.minimum(1,t*6)*np.exp(-np.maximum(0,t-d+.7)*5);return st(ss.sosfilt(ss.butter(2,[150,2500],'band',fs=sr,output='sos'),y))
def swell(d=2.2,f=146.8):t=T(d);y=sum(np.sin(2*np.pi*f*m*t)*a for m,a in [(1,.6),(1.5,.3),(2,.25)]);return st(y*(t/d)**2*np.exp(-np.maximum(0,t-d+.3)*12))
place(K(2.75),tom(.9,58),.16)
place(K(5.42),whoosh(.6),.025);place(K(5.95),chime(),.03)
place(K(12.05),tom(1.1,52),.32);place(K(12.05),rustle(.45),.05)
place(K(16.5),chime(),.035)
place(K(19.9),tom(.5,110),.22);place(K(19.92),rustle(.3),.06)
place(K(25.6),swell(2.2),.05)
for vv in (29.2,31.95,34.0,36.1,38.6):place(K(vv),tick(),.05)
for vv in (39.75,40.55,41.3):place(K(vv),tom(.7,66),.18)
place(K(44.9),scratch(1.7),.03);place(K(46.55),whoosh(.7),.04)
place(K(46.7),crackle(6.4),.05);place(K(47.4),horn(2.4),.035);place(K(49.5),chime(),.025)
place(K(57.25),tom(1.4,46),.14)
out=base+fx;pk=np.abs(out).max();out*= .97/pk if pk>.97 else 1

sf.write(D+'fullfx.wav',out,sr)
subprocess.run(['ffmpeg','-v','error','-y','-i',D+'fullfx.wav','-c:a','libmp3lame','-b:a','192k',D+'mixfull.mp3'],check=True)
import os;os.remove(D+'base.wav');os.remove(D+'fullfx.wav');print('ok')
