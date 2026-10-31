"""Refresh data/<kind>.json from the channel's public YouTube feed.

Usage: python scripts/update_videos.py longform|shorts
YouTube keeps two automatic playlists per channel: UULF… holds long videos, UUSH… holds Shorts.
"""
import json, sys, urllib.request, xml.etree.ElementTree as ET
from pathlib import Path

CHANNEL = "UCfcZ-N_05te_XgBPm0zcYhQ"
PLAYLIST = {"longform": "UULF" + CHANNEL[2:], "shorts": "UUSH" + CHANNEL[2:]}
LIMIT = {"longform": 6, "shorts": 8}
NS = {"a": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}

kind = sys.argv[1]
url = "https://www.youtube.com/feeds/videos.xml?playlist_id=" + PLAYLIST[kind]
with urllib.request.urlopen(url, timeout=30) as r:
    feed = ET.fromstring(r.read())

videos = [
    {"id": e.findtext("yt:videoId", namespaces=NS),
     "title": e.findtext("a:title", namespaces=NS),
     "published": e.findtext("a:published", namespaces=NS)}
    for e in feed.findall("a:entry", NS)
]
videos.sort(key=lambda v: v["published"], reverse=True)
out = Path(__file__).resolve().parent.parent / "data" / f"{kind}.json"
out.write_text(json.dumps(videos[: LIMIT[kind]], ensure_ascii=False, indent=2) + "\n")
print(f"{kind}: {len(videos[: LIMIT[kind]])} videos -> {out}")
