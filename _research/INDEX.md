# Ink of Sinai: where everything lives

Open this when a task needs past work. It points to every rule, note, script and engine in the repo. It also covers the large media files, which are in the repo but skipped by search.

## Two repos
- `rade-crypto/inkofsinai` (this one): the website, rules, research, scripts and media.
- `rade-crypto/inkofsinai-studio`: production. It holds scripts in progress (16, 17…), `work/reviews/` with the owner review briefs, and the Westminster Leningrad Codex check tool. Attach it with add_repo if it isn't in the session.

## Rules
- `CLAUDE.md`: every standing rule from the owner (working style, content, scripts, titles and thumbnails, on screen).
- `_research/scripts_playbook.md`: the owner's quoted notes plus the formula of the finished scripts (hooks, structure, endings, checklist). Read it in full before writing any script, hook, title or caption.
- `_research/hooks.md`: the hook research and its checklist.
- `_research/copywriting.md`: the copywriting research.
- `_research/retention_techniques.md`: 14 YouTube retention techniques for long-form scripts (Nov 22, from the Eden session).

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

## Large media (in the repo, skipped by search to save tokens)
About 480 MB, listed in `.ignore` so search never pulls it into the conversation. Open a file by its path only when a task needs it.
- `_handoff09/09_shots/`: generated stills for video 09. `rest/` and `user/` hold more shots and the owner's picks.
- `_handoff09/b09/` and `_handoff09/b09p/`: the VO (`vo16.wav`), the mixes (`mix09.mp3`, `mixfull.mp3`) and render outputs.
- `_research/shorts/*.mp4`: rendered Shorts s19–s24.
- `_research/sfx_review/`: sound-effect review audio.

## Every branch, and what it was for
- `claude/answer-first-rules`, `claude/video09-handoff`: video 09 and the Nov 8 rules. Its rules and playbook are now in CLAUDE.md and `_research/`.
- `claude/great-allen-3a1lbe`, `claude/babel-short`: Shorts s19–s24 and the sound-effects engine.
- `claude/eden-research`: the One Sin script and the Eden research.
- `claude/zen-goldberg-732dnd`, `claude/zen-turing-oovuto`: the 100 ideas and 100 reel ideas.
- `claude/adoring-pascal-eu4hbk`: packaging research for the "six predictions" video.
- `research/faith-digital-products`: digital products research.
- `claude/focused-lamport-8c9jid`: this consolidation, the viewer panel and David and Bathsheba.
- `main`: the website and the shared rules.

Every file from those branches, media included, is now in main. When a new branch adds rules or notes, merge them into main so the next session starts with them.
