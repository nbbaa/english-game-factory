---
name: english-game-factory
description: This skill should be used when the user provides a YouTube link, video transcript, or podcast transcript and wants to generate a full English-learning game web app from it. It covers the complete pipeline — fetch subtitles/transcript, analyze content against a teaching plan, generate a data.js content file (vocabulary/phrases/quotes/writing tasks), plug it into the game framework, run regression tests, and deploy. Trigger phrases include "用这个视频生成英语游戏", "turn this YouTube video into an English game", "给你一段文字稿，做成学习游戏", "generate game content from this transcript".
agent_created: true
disable: false
---

# English Game Factory

Turn any English video/podcast transcript into a complete English-learning game web app.

## What This Produces

A single-page HTML game app with 10 games (Vocabulary Blitz, Quote Fill-in, Phrase Match, Phrase Detective, Sentence Scramble, Writing Quest, Sentence Builder, Sentence Endings, Paraphrase Arena, Quote Expander) + mistake book + knowledge bank + daily streak. The **framework logic is fixed**; only `data.js` (the content) changes per material.

## Core Architecture

- **Framework (fixed)**: `index.html` contains all game logic, loads content via `<script src="data.js"></script>`.
- **Content (per material)**: `data.js` defines 13 data arrays: GAME_META, VOCAB, PHRASES, GOLD_SENTENCES, PHRASE_DETECTIVE, WRITING_QUESTS, SENTENCE_BUILDER, PARAPHRASE_TASKS, EXPANDER_TASKS, CLOZE_DATA, MATCHING_ENDINGS, KNOWLEDGE_BANK, FRAME_DATA.
- **To make a new game set**: only replace `data.js`. Never touch game logic.

## Prerequisites — Framework Repo

This skill depends on the **full framework repo**, not just the skill definition. The repo provides:

| File | Purpose |
|------|---------|
| `game/index.html` | Game engine (10 games, fixed logic) |
| `tests/regression.test.js` | 91-check regression suite |
| `skills/english-game-factory/` | This skill (SKILL.md + content-spec + fetch script) |

**Setup** (one-time, per machine):

```bash
git clone https://github.com/nbbaa/english-game-factory.git ~/english-game-factory
# Then make the skill discoverable by your agent:
# WorkBuddy:  cp -r ~/english-game-factory/skills/english-game-factory ~/.workbuddy/skills/
# Claude Code: cp -r ~/english-game-factory/skills/english-game-factory ~/.claude/skills/
# Codex:      cp -r ~/english-game-factory/skills/english-game-factory ~/.codex/skills/
```

**At runtime**, the skill needs to locate the repo to access `game/index.html` and `tests/regression.test.js`. The agent should:

1. Check if `~/english-game-factory/game/index.html` exists — if so, use that path.
2. If not, search common locations or ask the user: "Where did you clone the english-game-factory repo?"
3. Once found, use `<repo>/game/index.html` as the engine and `<repo>/tests/regression.test.js` as the test suite.

All paths below assume `REPO = <path-to-cloned-repo>`.

## Pipeline

Follow these steps in order. Read `references/content-spec.md` BEFORE generating any data — it defines every field's schema, quantity, and quality bar.

### 1. Get the transcript

Input may be a YouTube link or pasted text.

- **YouTube link**: extract the video ID, then run `scripts/fetch_transcript.py <video_id_or_url>`. It prints the transcript to stdout. Requires the `youtube-transcript-api` package (install into the managed python venv if missing).
  - If the video has no English subtitle: fall back to audio download + Whisper transcription (needs `yt-dlp` and `ffmpeg`), or ask the user to paste the transcript.
- **Pasted text**: use it directly. If very long, the user may paste in chunks — concatenate.

### 2. Analyze the material (teaching plan)

Read the transcript and extract teaching points at CEFR B2-C1 level:
- Core vocabulary worth teaching (high-frequency, transferable)
- Useful phrases/idioms, with their origin stories
- Memorable quotable sentences (gold sentences), sorted by difficulty
- Sentence patterns and connective expressions
- Writing prompts based on the material's theme

### 3. Generate data.js

Write `data.js` following `references/content-spec.md` exactly. Key rules:
- All definitions/hints in simple English (no Chinese)
- Examples and usages must come from the actual transcript
- Every multiple-choice option set must contain exactly one correct answer
- SENTENCE_BUILDER must have no swappable/synonymous sentence pairs
- `KNOWLEDGE_BANK.words` reuses VOCAB via `VOCAB.map(...)`
- **`GOLD_SENTENCES` is a grouped object, not an array**: `{ easy: [...], medium: [...], hard: [...] }`, 8 sentences each. Other arrays are plain arrays.
- **`GOLD_SENTENCES.blanks` must be in range**: each blank index must be `>= 0` and `< wordCount` where wordCount = `en.split(' ').length`. Blanks must not repeat. The regression test checks this.
- **Safe JS serialization**: When writing `data.js`, escape all double quotes (`"` → `\"`), backslashes (`\` → `\\`), and newlines (`\n`) inside string values. A raw `</script>` in any string would break the page — replace with `<\/script>`. Use template literals or `JSON.stringify()` for complex values to avoid syntax errors.

### 4. Assemble and test

- Place the new `data.js` next to the framework `index.html` (i.e., in `REPO/game/` or in a new content directory under the repo).
- Run the regression test suite from the repo root:
  - `node REPO/tests/regression.test.js game` — tests the bundled sample (`game/data.js` + `game/index.html`)
  - `node REPO/tests/regression.test.js <dir>` — tests a custom content directory (relative to repo root)
- All 91 checks must pass. The suite validates: data constants exist, structures match spec, blanks are in range and unique, CLOZE_DATA parts/answers align, choice questions have exactly one correct answer, model answers meet minimum word counts, and engine functions load without errors.

### 5. Deploy

Deploy the content directory (containing `index.html` + `data.js`) as a static site. Copy `REPO/game/index.html` into your content directory first if it's not already there.

- **WorkBuddy**: use the cloudstudio-deploy capability; returns a shareable link.
- **Claude Code / Codex / other**: deploy with any static host (GitHub Pages, Vercel, Netlify). The app is pure front-end — just serve the folder.

### 6. Verify

Confirm the deployed site serves the new `data.js` (check a marker string) and the page loads.

## Quality Bar

The value of this pipeline is teaching design quality, not just extraction. Always:
- Write phrase origin stories that genuinely explain etymology (not restated definitions)
- Choose blank positions in gold sentences that test meaningful words (easy mode = common word, hard mode = abstract/key verb)
- Make writing task model answers natural and on-theme
- Run the full regression suite before delivering

## Framework Repo

The reusable framework (engine + sample data + spec + tests + this skill) lives in the english-game-factory project. When generating content, reuse the existing framework files rather than rewriting game logic.
