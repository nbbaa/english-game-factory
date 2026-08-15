# English Game Factory · 英语游戏内容工厂

把任何英文视频/播客文字稿，变成一套**可玩的英语学习游戏网页**。
Turn any English video/podcast transcript into a playable English-learning game web app.

![license](https://img.shields.io/badge/license-MIT-blue)

---

## 这是什么 · What it is

一套「内容工厂」：**固定的游戏框架引擎** + **可替换的内容数据**。
A content factory: a **fixed game framework engine** + **replaceable content data**.

- 框架引擎（`game/index.html`）已实现 **10 个游戏** + 错题本 + 知识库 + 每日打卡，逻辑固定不变。
- 内容数据（`game/data.js`）是唯一需要换的文件 —— 换一个视频/播客，只需重新生成这一个文件。
- The framework (`game/index.html`) ships **10 games** + mistake book + knowledge bank + daily streak. Logic never changes. To reuse with new material, only regenerate `game/data.js`.

**10 个游戏 · The 10 games:**
Vocabulary Blitz · Quote Fill-in · Phrase Match · Phrase Detective · Sentence Scramble · Writing Quest · Sentence Builder · Sentence Endings · Paraphrase Arena · Quote Expander

## 快速开始 · Quick start

### 方式一：直接玩示例（无需构建）
Play the bundled sample (no build step):

```bash
cd game
# 用任意静态服务器打开 index.html，例如：
python3 -m http.server 8000
# 浏览器访问 http://localhost:8000
```

> 注意：需通过 http(s) 访问，不能用 `file://` 双击打开（`data.js` 是外部脚本）。

### 方式二：换成你自己的内容
Replace `game/data.js` with content generated from your own video/podcast transcript, following `skills/english-game-factory/references/content-spec.md`. Then run the tests:

```bash
node tests/regression.test.js   # 必须全绿 / must pass
```

## 用 AI Agent 自动生成内容 · Generate content with an AI agent

本仓库同时是一个 **Agent Skill**。装上后，你只需丢给 agent 一个 YouTube 链接或一段文字稿，它自动走完整流水线：抓字幕 → 按教学计划分析 → 生成 `data.js` → 测试 → 部署。

This repo is also an **Agent Skill**. Once installed, hand your agent a YouTube link or a transcript and it runs the full pipeline: fetch subtitles → analyze per teaching plan → generate `data.js` → test → deploy.

**重要 · Important**: Skill 依赖完整仓库（`game/index.html` 引擎 + `tests/` 测试套件），不能只复制 `skills/` 子目录。请先 clone 整个仓库：

The skill depends on the **full repo** (`game/index.html` engine + `tests/` suite). Clone the whole repo first, then register the skill with your agent:

```bash
# 1. Clone the repo
git clone https://github.com/nbbaa/english-game-factory.git ~/english-game-factory

# 2. Register the skill with your agent (choose one):
# WorkBuddy:
cp -r ~/english-game-factory/skills/english-game-factory ~/.workbuddy/skills/
# Claude Code:
cp -r ~/english-game-factory/skills/english-game-factory ~/.claude/skills/
# Codex:
cp -r ~/english-game-factory/skills/english-game-factory ~/.codex/skills/
```

Skill 依赖一个字幕抓取脚本（`scripts/fetch_transcript.py`），需要 `pip install youtube-transcript-api`。
The skill's transcript script needs `pip install youtube-transcript-api`.

## 目录结构 · Repository layout

```
english-game-factory/
├── game/
│   ├── index.html        # 框架引擎（10 游戏 + 复习系统，逻辑固定）
│   └── data.js           # 内容数据（原创示例，可替换）
├── tests/
│   └── regression.test.js # 回归测试（改内容/框架后必跑）
├── skills/
│   └── english-game-factory/
│       ├── SKILL.md                  # Agent 技能说明
│       ├── references/content-spec.md # 内容规范（字段/数量/质量标准）
│       └── scripts/fetch_transcript.py # YouTube 字幕抓取
├── LICENSE               # MIT
└── README.md
```

## 内容是怎么设计的 · Teaching design

内容不是简单提取，而是按**英语教学计划**设计（CEFR B2-C1）：词汇配简单英文释义和原稿例句、短语配**词源故事**、金句按**三级难度**、写作题分**填空/引导/自由**三档。完整标准见 `references/content-spec.md`。

Content follows a teaching plan (CEFR B2-C1): simple-English definitions, phrase **etymology stories**, **three difficulty tiers** for quotes, and **cloze/guided/free** writing tasks. See `references/content-spec.md`.

## 版权说明 · Content & copyright

- **框架代码**（`game/index.html`、`tests/`、skill）：MIT，可自由使用。
- **`game/data.js` 示例内容**：为本仓库**原创撰写**，采用与代码相同的 MIT 许可，可自由使用。
- **你自己生成的 `data.js`**：版权归你。请注意——如果你用受版权保护的转录文本（如某播客/视频原文）生成内容，内容使用权归原版权方，建议仅作个人学习用途，不要公开分发。

The framework code and the **original sample `data.js`** are MIT-licensed. Content you generate yourself belongs to you — but if it derives from copyrighted transcripts, keep it for personal study and do not redistribute.

## License

[MIT](LICENSE) © english-game-factory contributors
