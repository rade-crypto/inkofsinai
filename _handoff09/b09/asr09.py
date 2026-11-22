from faster_whisper import WhisperModel
import soundfile as sf, json
a,sr=sf.read('/tmp/claude-0/lf12/b09/vo16.wav',dtype='float32')
a=a[:int(sr*80)]
m=WhisperModel('small.en',device='cpu',compute_type='int8',cpu_threads=4)
segs,_=m.transcribe(a,word_timestamps=True,beam_size=5,condition_on_previous_text=False,vad_filter=False,initial_prompt="Jacob, Isaac, Esau, Rebekah, Abel, Cain, Ishmael, Gideon, Manasseh, Ephraim.")
out=[]
for s in segs:
    out.append({'s':s.start,'e':s.end,'t':s.text,'w':[[w.start,w.end,w.word] for w in s.words]})
    print(f'{s.start:7.2f} {s.end:7.2f} {s.text}',flush=True)
json.dump(out,open('/tmp/claude-0/lf12/b09/asr.json','w'))
print('DONE',flush=True)
