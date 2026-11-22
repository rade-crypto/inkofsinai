D='/tmp/claude-0/lf12/b09/'
sc=open(D+'scenes09.js').read()
html='<!doctype html>\n<html><head><meta charset="utf-8"><link rel="stylesheet" href="fonts/local.css">\n<style>html,body{margin:0;background:#000}canvas{display:block}</style></head><body>\n<canvas id="c" width="1920" height="1080"></canvas>\n<script>\n'+open(D+'lib.js').read()+'\n'+open(D+'headF.js').read()+'\n'+open(D+'words.js').read()+'\n(()=>{\n'+sc+'\n})();\n</script></body></html>'
open(D+'index.html','w').write(html)
