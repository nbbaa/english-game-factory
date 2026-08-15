# English Game Factory · 参赛技术文档

> **项目名称**：English Game Factory（英语游戏内容工厂）
> **仓库地址**：https://github.com/nbbaa/english-game-factory
> **许可证**：MIT
> **一句话定位**：把任意英文视频/播客文字稿，自动转化为一套可玩的英语学习游戏网页——"固定引擎 + 可替换内容"的内容工厂模式。

---

## 一、技术路线

### 1.1 整体架构

本项目采用 **"框架引擎 + 可替换内容"** 的解耦架构：

- **框架引擎**（`game/index.html`，4040 行）：包含 10 个游戏 + 错题本 + 知识库 + 每日打卡连胜 + 7 个选择类游戏的自适应难度系统。引擎逻辑固定不变，通过 `<script src="data.js">` 加载内容。
- **内容数据**（`game/data.js`，606 行）：定义 13 个数据常量（GAME_META + 12 个游戏数据数组），是唯一需要根据素材重新生成的文件。
- **Agent Skill**（`skills/english-game-factory/`）：定义从"素材输入"到"游戏交付"的完整自动化流水线。

### 1.2 端到端流水线（7 步）

```
用户输入 YouTube 链接/文字稿
        │
        ▼
┌──────────────────────────────────┐
│ 1. 字幕抓取                        │  fetch_transcript.py
│    YouTube API → 纯文本字幕        │  (youtube-transcript-api)
└──────────────┬───────────────────┘
               ▼
┌──────────────────────────────────┐
│ 2. 教学分析                        │  Agent + LLM
│    按 CEFR B2-C1 教学计划提取      │  (content-spec.md 为规范)
│    词汇/短语/金句/写作题           │
└──────────────┬───────────────────┘
               ▼
┌──────────────────────────────────┐
│ 3. 结构化生成 data.js              │  LLM 按 content-spec.md
│    13 个数据常量，全英文沉浸        │  字段 schema 生成
└──────────────┬───────────────────┘
               ▼
┌──────────────────────────────────┐
│ 4. 回归测试                        │  regression.test.js
│    73 项断言：结构/数量/引擎函数    │  (Node.js, 零依赖)
└──────────────┬───────────────────┘
               ▼
┌──────────────────────────────────┐
│ 5. 部署上线                        │  GitHub Pages /
│    纯静态文件，任意静态托管         │  CloudStudio / Vercel
└──────────────┬───────────────────┘
               ▼
┌──────────────────────────────────┐
│ 6. 线上验证                        │  curl 检查 data.js
│    确认线上内容为最新              │
└──────────────┬───────────────────┘
               ▼
┌──────────────────────────────────┐
│ 7. 交付                            │  可分享链接 + 可下载
└──────────────────────────────────┘
```

### 1.3 引擎核心特性

| 特性 | 实现方式 | 技术亮点 |
|------|---------|---------|
| **10 个游戏** | 词汇闪电战、金句填空、短语配对、短语侦探、句子拼图、写作闯关、连句成段、句尾配对、改述竞技、金句扩展 | 涵盖词汇/短语/语法/写作四个维度 |
| **自适应难度** | 7 个选择类游戏按每局正确率自动升降级（≥80%升、≤40%降），3 档难度（Easy/Medium/Hard）持久化在 localStorage | 通用 `adjustDifficulty()` 函数，所有游戏共享同一套升降级规则 |
| **每日打卡连胜** | `calcStreakFromDates()` 从 `playedDates` 派生单一真值，顶栏数字/日历/toast/徽章全读同一值 | 杜绝"数字与日历不一致"的常见 bug |
| **动态标题** | `GAME_META = { title, tagline }` 由 data.js 提供，引擎 `applyGameMeta()` 自动填充 | 换素材只需换 data.js，零代码改动 |
| **错题本** | 选择题答错自动入册，写作题 AI 批改反馈 | 知识点闭环复习 |

### 1.4 内容规范体系

`content-spec.md`（208 行）是整个系统的"知识核心"，定义了：

- **13 个数据常量的字段 schema**：每个字段的类型、含义、约束
- **数量要求**：如 VOCAB ≥15 词、GOLD_SENTENCES 24 句（easy/medium/hard 各 8）、KNOWLEDGE_BANK 57 条
- **质量标准**：如 PHRASE_DETECTIVE 的 `story` 字段必须讲真实词源（不是复述释义）、SENTENCE_BUILDER 必须消除"两个都说得通"的弱约束句对
- **框架行为规范**：Daily Streak 单一真值原则、自适应难度覆盖范围与升降级规则
- **交付前检查清单**：14 项检查确保质量

---

## 二、所使用模型

### 2.1 模型选型

本项目 **不绑定特定模型**，采用 Agent Skill 架构，模型由宿主 Agent 决定。已验证可用的模型包括：

| 模型 | 角色 | 说明 |
|------|------|------|
| GPT-4o / Claude 3.5 Sonnet 及以上 | 内容生成 | 按 content-spec.md 生成结构化 data.js，要求强推理 + 长上下文 |
| 任意支持 function calling 的模型 | Agent 宿主 | 执行 SKILL.md 定义的流水线 |

### 2.2 模型在流水线中的作用

模型仅在 **第 2-3 步**（教学分析 + 内容生成）参与，其余步骤（字幕抓取、测试、部署）由确定性工具完成：

- **输入**：YouTube 字幕纯文本 + content-spec.md 规范
- **输出**：符合 schema 的 13 个 JavaScript 数据常量（约 600 行 data.js）
- **关键约束**：全英文沉浸、例句源于原稿、答案唯一性、数量达标

### 2.3 模型无关性设计

`content-spec.md` 本质上是一份精心设计的 **结构化 prompt**——它定义了所有字段结构、数量要求和质量标准。这意味着：

- 当前通过 Agent（WorkBuddy/Claude Code/Codex）调用模型
- 未来可直接作为 LLM API 的 system prompt，从网页前端调用（无需 Agent）
- 模型升级时只需更新 content-spec.md，无需改动引擎或流水线

---

## 三、Agent 架构

### 3.1 Skill 架构

```
skills/english-game-factory/
├── SKILL.md                          # Agent 技能定义（82 行）
│                                      # - frontmatter: name/description/trigger
│                                      # - 7 步流水线指令
│                                      # - 质量标准
│                                      # - 框架仓库引用
├── references/
│   └── content-spec.md               # 内容规范（208 行）
│                                      # - 13 个数据常量的 schema
│                                      # - 框架行为规范
│                                      # - 交付检查清单
└── scripts/
    └── fetch_transcript.py            # YouTube 字幕抓取脚本（94 行）
```

### 3.2 工作机制

1. **触发**：用户对 Agent 说"用这个视频生成英语游戏"或提供 YouTube 链接/文字稿
2. **加载**：Agent 加载 SKILL.md 到上下文，获得完整流水线指令
3. **执行**：Agent 按指令依次调用工具（脚本执行、文件读写、LLM 推理）
4. **规范遵循**：生成内容前，Agent 必须先读 content-spec.md，逐条对照规范生成
5. **验证**：生成后必须运行回归测试，全绿才算交付

### 3.3 跨 Agent 兼容

Skill 定义为标准 Markdown + Python 脚本，不依赖特定 Agent 运行时：

| Agent 平台 | 安装方式 |
|------------|---------|
| WorkBuddy | 复制到 `~/.workbuddy/skills/` |
| Claude Code | 复制到 `~/.claude/skills/` |
| Codex | 复制到 `~/.codex/skills/` |

---

## 四、工具接口

### 4.1 字幕抓取脚本

**文件**：`scripts/fetch_transcript.py`
**接口**：命令行工具

```bash
python3 fetch_transcript.py <video_id_or_url> [--lang en]
```

- 输入：YouTube 视频 ID 或完整 URL，可选语言参数
- 输出：纯文本字幕（句子拼接，无时间戳），输出到 stdout
- 依赖：`youtube-transcript-api` Python 库
- 容错策略：优先手动字幕 → 自动生成字幕 → 翻译字幕 → 失败提示
- 降级方案：无字幕时回退到 `yt-dlp` + `ffmpeg` 音频下载 + Whisper 转录

### 4.2 回归测试

**文件**：`tests/regression.test.js`
**接口**：Node.js 脚本，零依赖

```bash
node tests/regression.test.js [target_directory]
```

- 验证 73 项断言：
  - A. 数据常量存在性（13 个）
  - B. GAME_META 结构与内容
  - C. 各数据数组的字段 schema 与数量
  - D. 数据质量（答案唯一性、下标不越界、弱约束检测）
  - E. 引擎函数完整性（startGame、adjustDifficulty、calcStreakFromDates 等）
- 支持目录参数：可对任意内容目录运行测试

### 4.3 部署接口

- **GitHub Pages**：通过 GitHub Actions 工作流自动部署 `game/` 目录
- **CloudStudio**：WorkBuddy 内置部署能力，返回可分享链接
- **任意静态托管**：Vercel / Netlify / 本地 `python3 -m http.server`

---

## 五、知识库

### 5.1 content-spec.md — 内容生成知识库

这是系统的核心知识资产，定义了从"原始字幕"到"结构化教学内容"的转换规则：

| 知识维度 | 内容 |
|---------|------|
| **选词标准** | 高频、可迁移、CEFR B2-C1 难度，避开过于简单和过于生僻的词 |
| **词源故事** | PHRASE_DETECTIVE 的 `story` 字段必须讲真实词源（如棒球起源、游戏演变），不是复述释义 |
| **金句分级** | easy=短句口语化 / medium=中等含从句 / hard=长句抽象观点；挖空位置 easy 常见词 / hard 抽象关键动词 |
| **写作三档** | Easy=点词填空（不打字）/ Medium=句首引导+必用词 / Hard=自由写作+范文 |
| **答案唯一性** | 选择题干扰项要"像但错"；排序题用指代链/连接词/时间顺序锁死顺序 |
| **难度梯度** | Easy(20-25 XP) < Medium(35-50) < Hard(40-80) |

### 5.2 游戏内置知识库（KNOWLEDGE_BANK）

游戏引擎内置一个可浏览的知识库，分 4 类，共 57+ 条目：

| 类别 | 条数 | 内容 |
|------|------|------|
| words | 20 | 核心词汇（音标/释义/例句/来源），复用 VOCAB 数据 |
| phrases | 15-17 | 短语习语（释义/例句/来源） |
| patterns | 12-14 | 句式结构（从金句和配对题提炼） |
| expressions | 10-12 | 连接词与理念表达 |

每条标注 `source` 来源，方便学习者溯源。

---

## 六、数据处理与部署方式

### 6.1 数据处理流程

```
YouTube 字幕（纯文本）
     │
     ▼  Agent + LLM 按 content-spec.md 分析
     │
     ▼  结构化生成
data.js（13 个 JavaScript 数据常量）
     │
     ▼  引擎加载
     │
     ▼  浏览器渲染
10 个可交互游戏 + 错题本 + 知识库
```

- **输入数据**：YouTube 字幕纯文本或用户粘贴的文字稿
- **处理方式**：LLM 按 content-spec.md 规范生成结构化数据，无人工干预
- **数据格式**：标准 JavaScript 常量定义，引擎直接 `<script>` 加载
- **数据验证**：73 项回归断言，覆盖结构/数量/质量三个维度
- **数据存储**：用户游戏进度存储在浏览器 localStorage，不上传任何服务器

### 6.2 部署方式

| 方式 | 说明 | 适用场景 |
|------|------|---------|
| GitHub Pages | GitHub Actions 自动部署 `game/` 目录 | 公开演示、长期托管 |
| CloudStudio | WorkBuddy 内置部署 | 快速分享 |
| Vercel/Netlify | 连接 GitHub 仓库自动部署 | 自定义域名 |
| 本地服务器 | `python3 -m http.server` | 本地开发测试 |

纯静态文件部署（`index.html` + `data.js`），无需后端服务器、数据库或 API。

---

## 七、数据来源

### 7.1 框架代码

- **来源**：本团队原创开发
- **包含**：`game/index.html`（引擎）、`tests/regression.test.js`（测试）、`skills/`（Agent 技能定义）
- **许可**：MIT

### 7.2 示例内容数据

- **来源**：本团队原创撰写，以 Atomic Habits 主题为示例
- **包含**：`game/data.js` 中的 13 个数据常量
- **许可**：MIT

### 7.3 用户生成内容

- **来源**：用户通过 Agent 从 YouTube 视频/播客字幕自动生成
- **包含**：用户自行生成的 `data.js`
- **版权归属**：归用户所有（详见合规边界部分）

### 7.4 第三方依赖

| 依赖 | 用途 | 许可 |
|------|------|------|
| youtube-transcript-api | 抓取 YouTube 字幕 | MIT |
| Node.js | 运行回归测试 | MIT |
| Python 3 | 运行字幕抓取脚本 | PSF |

---

## 八、合规边界

### 8.1 数据授权

1. **框架代码与示例内容**：采用 MIT 许可证，可自由使用、修改、分发。
2. **用户生成内容**：版权归生成者所有。但需注意——如果用户使用受版权保护的转录文本（如某播客/视频原文）作为输入，生成内容的**使用权归原版权方**。建议仅作个人学习用途，不要公开分发。
3. **YouTube 字幕**：通过 `youtube-transcript-api` 库获取，该库调用 YouTube 公开的字幕接口。使用需遵守 [YouTube 服务条款](https://www.youtube.com/t/terms)。字幕数据的著作权归原视频创作者所有。
4. **第三方素材**：如使用 TED 演讲等公开素材，需遵守相应素材的使用条款（如 TED 的 [CC BY-NC-ND](https://www.ted.com/about/our-organization/our-policies-terms) 许可）。

### 8.2 隐私保护

1. **无后端、无数据库**：游戏是纯前端应用，不收集、不存储、不上传任何用户数据。
2. **本地存储**：用户游戏进度（XP、宝石、打卡记录、错题本等）仅存储在浏览器 localStorage，清除浏览器数据即删除。
3. **API Key（未来版本）**：若未来实现独立网页版，用户输入的 API Key 仅存储在浏览器 localStorage，不发送到任何第三方服务器（BYO Key 模式）。
4. **无追踪**：不使用 Google Analytics、Cookie 追踪或任何用户行为分析工具。

### 8.3 风险提示

1. **内容准确性**：游戏内容由 LLM 生成，可能存在释义不精确、词源错误或语法偏差。content-spec.md 和回归测试已设置质量门槛，但不保证 100% 准确。建议用户将游戏作为辅助学习工具，不替代权威教材。
2. **版权风险**：用户使用受版权保护的视频/播客字幕生成内容时，需自行确保不侵犯原版权方权益。本项目仅提供技术工具，不对用户生成的具体内容承担版权责任。
3. **模型偏差**：LLM 生成的内容可能存在文化偏见或表述偏好。content-spec.md 要求"全英文沉浸、例句源于原稿"以尽量减少模型自由发挥，但仍建议用户审阅生成内容。
4. **依赖风险**：YouTube 字幕抓取依赖第三方 API，YouTube 可能随时更改接口或限制访问。fetch_transcript.py 提供了多级降级策略（手动字幕→自动字幕→翻译字幕→Whisper 转录）。

### 8.4 行业边界

1. **定位**：本产品是**英语学习辅助工具**，不是 certified 语言能力评估系统。游戏中的 XP、等级、徽章仅作激励用途，不代表官方认证的语言水平。
2. **适用人群**：面向 CEFR B2-C1 水平的英语学习者（中高级）。不适用于零基础学习者或专业语言考试备考。
3. **非医疗/心理咨询**：每日打卡连胜等游戏化设计仅为学习激励，不构成行为干预建议。
4. **非商业转载工具**：本项目不鼓励、不支持用户将受版权保护的素材生成内容用于商业分发。

---

## 九、可开放、可复用的资产

本项目以"可复用模板"为设计目标，提供以下开放资产：

### 9.1 应用模板

| 资产 | 路径 | 复用方式 |
|------|------|---------|
| 游戏引擎模板 | `game/index.html` | 直接使用，加载不同 data.js 即可生成新游戏 |
| 内容规范模板 | `skills/.../content-spec.md` | 作为 LLM prompt 生成新内容 |
| Agent Skill 模板 | `skills/.../SKILL.md` | 安装到任意 Agent 即可启用自动化流水线 |

### 9.2 工具组件

| 组件 | 路径 | 功能 |
|------|------|------|
| 字幕抓取工具 | `scripts/fetch_transcript.py` | YouTube 字幕→纯文本 |
| 回归测试工具 | `tests/regression.test.js` | 73 项数据质量断言 |
| GitHub Pages 部署 | `.github/workflows/deploy-pages.yml` | 自动部署静态游戏 |

### 9.3 示例数据

| 数据 | 路径 | 主题 |
|------|------|------|
| 示例 data.js | `game/data.js` | Atomic Habits（原创内容） |

### 9.4 技术文档

| 文档 | 路径 | 内容 |
|------|------|------|
| README.md | 仓库根目录 | 项目介绍、快速开始、安装指南 |
| content-spec.md | `skills/.../references/` | 完整内容规范（字段 schema + 质量标准 + 检查清单） |
| SKILL.md | `skills/.../` | Agent 流水线定义 |
| 参赛技术文档 | 本文件 | 技术路线、合规边界、迭代计划 |

### 9.5 复用示例

一行命令安装 Skill 到任意 Agent：
```bash
gh repo clone nbbaa/english-game-factory /tmp/egf && cp -r /tmp/egf/skills/english-game-factory ~/.workbuddy/skills/
```

一行命令运行示例游戏：
```bash
git clone https://github.com/nbbaa/english-game-factory.git && cd english-game-factory/game && python3 -m http.server 8000
```

---

## 十、后续迭代计划

### 10.1 短期（1-2 月）

| 计划 | 说明 |
|------|------|
| **独立网页生成器** | 做一个网页，用户输入 YouTube 链接 + API Key → 浏览器直接调用 LLM API 生成游戏，无需安装 Agent Skill。content-spec.md 直接作 system prompt |
| **多模型支持** | 独立网页版支持 OpenAI / Anthropic / Google Gemini 等多种 API |
| **内容审核流程** | 生成后增加自动审核步骤（词频分析、语法检查、敏感词过滤） |

### 10.2 中期（3-6 月）

| 计划 | 说明 |
|------|------|
| **后端服务版** | 用户只需粘贴链接，无需 API Key，由后端调用 LLM（用户付费或广告支持） |
| **多语言扩展** | 支持日语、韩语等目标语言（当前仅英语学习） |
| **教师后台** | 教师可批量生成课程游戏，管理学生进度（需后端支持） |
| **AI 批改优化** | 写作题 AI 批改增加更细粒度的反馈（语法/词汇/连贯性分项评分） |

### 10.3 长期愿景

| 计划 | 说明 |
|------|------|
| **开放内容市场** | 用户可上传自己生成的 data.js，形成"学习游戏社区" |
| **CEFR 自适应** | 根据用户游戏表现自动调整 CEFR 难度等级 |
| **多模态输入** | 支持视频画面分析（不仅依赖字幕，还能从画面提取教学素材） |

---

## 十一、项目规模

| 维度 | 数量 |
|------|------|
| 引擎代码 | 4,040 行（index.html） |
| 内容规范 | 208 行（content-spec.md） |
| Skill 定义 | 82 行（SKILL.md） |
| 字幕抓取脚本 | 94 行（fetch_transcript.py） |
| 回归测试 | 205 行、73 项断言（regression.test.js） |
| 示例内容 | 606 行（data.js，13 个数据常量） |
| 游戏数量 | 10 个 |
| 数据常量 | 13 个 |
| 回归测试覆盖 | 73 项全绿 |
| 仓库文件 | 10 个（含 CI 工作流） |

---

## 十二、总结

English Game Factory 的核心创新在于**"内容工厂"模式**——将游戏引擎（固定）与教学内容（可替换）完全解耦，通过 Agent Skill + LLM 实现从"任意英文视频/播客"到"可玩学习游戏"的自动化流水线。

**技术价值**：content-spec.md 作为"结构化 prompt"的知识工程实践，证明了一个精心设计的内容规范可以让 LLM 稳定输出符合复杂 schema 的结构化数据。

**社会价值**：降低英语学习内容的创作门槛——任何有 YouTube 链接的人，都能在几分钟内获得一套基于该素材的专业英语学习游戏。

**开放价值**：MIT 许可、GitHub 公开、跨 Agent 兼容、纯静态部署，最大化降低复用门槛。
