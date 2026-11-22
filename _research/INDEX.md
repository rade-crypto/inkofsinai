# Ink of Sinai: where everything lives

Read this first in any new session. It points to every rule, note, script and engine in the repo. It also lists the large media files that stay on their branches.

## Rules (read before any work)
- `CLAUDE.md`: every standing rule from the owner (working style, content, scripts, titles and thumbnails, on screen).
- `_research/scripts_playbook.md`: the owner's quoted notes plus the formula of the finished scripts (hooks, structure, endings, checklist). Read it in full before writing any script, hook, title or caption.
- `_research/hooks.md`: the hook research and its checklist.
- `_research/copywriting.md`: the copywriting research.

## Research and topic history
- `_research/notes.md`: all research so far.
  - demand data and channel numbers
  - topic scouts and the owner's topic verdicts
  - verified Hebrew, by topic
  - visual style and image research
  - newsletter, lead magnet and paid-offer research
- `_research/100_ideas.md` and `_research/reel_ideas_100.md`: idea lists checked against the Westminster Leningrad Codex.
- `_research/ssr_panel/`: the AI viewer panel (semantic similarity rating). It contains the personas, the scorer and the Nov 21 run.
- `reports/` and `research_notes/`: research on faith creators selling digital products.

## Scripts
- `_research/05_goliath/`: the 05 Goliath script, image prompts, next steps and the engine builds (`engine/`).
- `_research/one_sin_script.md`: "The One Sin the Bible Keeps Repeating" (Eden, Ai, David's roof, Moses).
- `_research/david_bathsheba/`: the "send" ×12 script, dropped by the owner on Nov 22 (see notes).
- `_handoff09/`: video 09 (younger brother).
  - VO word timings: `vo_words.txt`
  - SRT captions
  - shot prompts: `09_shots/SHOTS.md`, `prompts_nov8.md`
  - review packs
  - full engine code: `b09/`, `b09p/`, `b06_v2/`
  - `README.md` has the state and next steps.
- `_research/shorts/`: Shorts s19, s20, s23 and s24.
  - packaging notes: `sNN_packaging.md`
  - scene code, cue files, fal prompts
  - the s24 engine
- `_research/sfx_engine/`, `_research/sfx_library/`, `_research/sfx_review/`: the sound-effects scoring engine and its small effect files.

## Large media left on their branches (not copied, ~750 MB)
Fetch a file with `git show origin/<branch>:<path> > <path>`. You can also `git checkout origin/<branch> -- <path>` to get it.
- **`claude/video09-handoff`:**
  - `_handoff09/09_shots/` (generated stills, ~150 MB)
  - `_handoff09/b09/` (vo16.wav, mix09.mp3)
  - `_handoff09/b09p/` (mixfull.mp3)
- **`claude/babel-short`** (this includes everything on `claude/great-allen-3a1lbe`):
  - `_research/shorts/*.mp4` (rendered Shorts s19–s24, ~290 MB)
  - `_research/sfx_review/`

## Every branch, and what it was for
- `claude/answer-first-rules`, `claude/video09-handoff`: video 09 and the Nov 8 rules. Its rules and playbook are now in CLAUDE.md and `_research/`.
- `claude/great-allen-3a1lbe`, `claude/babel-short`: Shorts s19–s24 and the sound-effects engine.
- `claude/eden-research`: the One Sin script and the Eden research.
- `claude/zen-goldberg-732dnd`, `claude/zen-turing-oovuto`: the 100 ideas and 100 reel ideas.
- `claude/adoring-pascal-eu4hbk`: packaging research for the "six predictions" video.
- `research/faith-digital-products`: digital products research.
- `claude/focused-lamport-8c9jid`: this consolidation, the viewer panel and David and Bathsheba.
- `main`: the website and the shared rules.

Every text file from those branches is copied here. When a new branch adds rules or notes, merge them into main so the next session starts with them.
