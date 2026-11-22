#!/bin/bash
cd /tmp/claude-0/lf12/b09p
pkill -f "node render.cjs"; sleep 1
find /tmp -maxdepth 1 -name 'playwright_chromiumdev_profile-*' -exec rm -rf {} + 2>/dev/null
mkdir -p segG; rm -f segG/*.mp4
F=/tmp/claude-0/lf12/b09p/render_noaudio.html
fr(){ ffprobe -v error -select_streams v -show_entries stream=nb_frames -of csv=p=0 "$1" 2>/dev/null; }
piece(){ i=$1; t0=$2; t1=$3; want=$(( $(python3 -c "print(round($t1*30))") - $(python3 -c "print(round($t0*30))") ))
  for try in 1 2 3; do timeout 300 node render.cjs $F $t0 $t1 segG/p$i.mp4 >/dev/null 2>&1; n=$(fr segG/p$i.mp4); echo "piece $i ($t0-$t1) try$try frames=$n want=$want"; [ "$n" = "$want" ] && return 0; done; echo "piece $i FAILED"; }
export -f piece fr; export F
N=12; D=427.3
for ((r=0; r<N; r+=3)); do
  for ((k=r; k<r+3 && k<N; k++)); do t0=$(python3 -c "print(round($D*$k/$N,3))"); t1=$(python3 -c "print(round($D*($k+1)/$N,3))"); piece $k $t0 $t1 & sleep 6; done; wait
done
: > segG/list.txt; T=0; for ((k=0;k<N;k++)); do echo "file '$PWD/segG/p$k.mp4'" >> segG/list.txt; n=$(fr segG/p$k.mp4); T=$((T+${n:-0})); done; echo total=$T
if [ $T -ge 12815 ]; then ffmpeg -y -loglevel error -f concat -safe 0 -i segG/list.txt -i mixfull.mp3 -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -t 427.3 -movflags +faststart /home/user/inkofsinai/_share/09_younger_brother_v2.mp4 && echo MUXED $(fr /home/user/inkofsinai/_share/09_younger_brother_v2.mp4); else echo INCOMPLETE; fi
