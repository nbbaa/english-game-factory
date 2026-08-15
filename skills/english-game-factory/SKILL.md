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
- **Content (per material)**: `data.js` defines 12 data arrays: VOCAB, PHRASES, GOLD_SENTENCES, PHRASE_DETECTIVE, WRITING_QUESTS, SENTENCE_BUILDER, PARAPHRASE_TASKS, EXPANDER_TASKS, CLOZE_DATA, MATCHING_ENDINGS, KNOWLEDGE_BANK, FRAME_DATA.
- **To make a new game set**: only replace `data.js`. Never touch game logic.

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

### 4. Assemble and test

- Place the new `data.js` next to the framework `index.html`.
- Run the regression test suite (supports a target-directory argument):
  - `node tests/regression.test.js` — tests the framework root (`data.js` + `podcast-english-game.html`)
  - `node tests/regression.test.js <dir>` — tests a content directory, e.g. `node tests/regression.test.js ted-procrastination` or `node tests/regression.test.js english-game-factory/game`
- All tests must pass. The suite validates: data constants exist, structures match spec, engine functions load without errors.

### 5. Deploy

Deploy the directory containing `index.html` + `data.js` (+ optional study guide) as a static site.

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
