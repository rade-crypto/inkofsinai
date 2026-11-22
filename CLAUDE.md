# Ink of Sinai website

## Why Ink of Sinai exists (read first, every chat)

- **The goal:** people come to love the Hebrew Bible and learn it.
- **How:** Hebrew insights they've never heard, shown beautifully.
- **Retention serves the insight.** Hooks, pacing and open loops exist so viewers stay long enough to receive the insight. They are the means, never the point.
- Judge every topic, script, title, thumbnail and edit by one question: will this make someone love the Hebrew Bible more and learn something real from it?

This repo is the channel's website. It also holds the media archive from old chats: renders, voiceovers, mixes and stills in `_handoff09/` and `_research/shorts/`, which are too big for the studio.

All other Ink of Sinai work lives in **`rade-crypto/inkofsinai-studio`**: the owner's rules, research, scripts, engine, tools and reviewers. Its `CLAUDE.md` and `rules/CLAUDE.md` are the owner's rules for every chat.

- If the studio repo isn't in this session, attach it before doing any channel work (scripts, Shorts, videos, titles, captions, research, replies). Use add_repo with rade-crypto/inkofsinai-studio, clone it to /home/user/inkofsinai-studio, register it, then follow its CLAUDE.md. If attaching is blocked, tell the user in one line to switch the permission mode off Auto or start the chat with the studio repo selected.
- New rules and research go to the studio repo, never here. The rules and notes that used to be here are already copied there (`rules/_research/notes.md`, "From the website repo"; `archive/website/`).
- Website work stays here: pages, `data/*.json` (refreshed by `scripts/update_videos.py`) and the sitemap. Site copy follows the studio's content rules: say "God", never "Hashem", write the Divine Name as ה׳, and use the Tanakh as the only source.
- Don't open media here unless a task needs that exact file. Search skips media on purpose (`.ignore`). `_research/INDEX.md` maps the old files.
