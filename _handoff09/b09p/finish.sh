#!/bin/bash
cd /tmp/claude-0/lf12/b09p
pkill -f "node render.cjs"; sleep 1
find /tmp -maxdepth 1 -name 'playwright_chromiumdev_profile-*' -exec rm -rf {} + 2>/dev/null
rm -f segF/s3*.mp4
F=/tmp/claude-0/lf12/b09p/render_noaudio.html
fr(){ ffprobe -v error -select_streams v -show_entries stream=nb_frames -of csv=p=0 "$1" 2>/dev/null; }
piece(){ # name t0 t1 expected
  for try in 1 2; do timeout 240 node render.cjs $F $2 $3 segF/$1.mp4; n=$(fr segF/$1.mp4); echo "$1 try$try frames=$n want=$4"; [ "$n" = "$4" ] && return 0; done; return 1; }
(piece s3a 320.475 356 1066 & sleep 12; piece s3b 356 392 1080 & wait)
piece s3c 392 427.3 1059
printf "file '%s'\n" $PWD/segF/s0.mp4 $PWD/segF/s1.mp4 $PWD/segF/s2.mp4 $PWD/segF/s3a.mp4 $PWD/segF/s3b.mp4 $PWD/segF/s3c.mp4 > segF/list3.txt
T=0; for f in s0 s1 s2 s3a s3b s3c; do n=$(fr segF/$f.mp4); T=$((T+${n:-0})); done; echo total=$T
if [ $T -ge 12815 ]; then ffmpeg -y -loglevel error -f concat -safe 0 -i segF/list3.txt -i mixfull.mp3 -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -t 427.3 -movflags +faststart /home/user/inkofsinai/_share/09_younger_brother.mp4 && echo MUXED $(fr /home/user/inkofsinai/_share/09_younger_brother.mp4) frames; else echo INCOMPLETE; fi
