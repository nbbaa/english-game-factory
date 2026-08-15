# 内容规范 · content-spec.md

> 每次根据新素材（YouTube 字幕 / 视频文字稿 / 播客转录）生成 `data.js` 时，**必须逐条对照本规范**。
> 规范 = 字段 schema（决定程序能跑）+ 数量要求（决定游戏可玩）+ 质量标准（决定教学效果）。
> 生成完成后，运行 `tests/regression.test.js`，全绿才算交付。

## 0. 全局原则

1. **全英文沉浸**：所有释义、提示、词源故事都用**简单英文**（CEFR B2 能读懂），不出现中文。
2. **例句源于素材**：`example` / `usage` / 金句尽量直接取自原稿原句；原稿没有合适句子时，用原稿**主题句**改写并注明。
3. **答案必须唯一**：选择题正确项只有 1 个，干扰项要"像但错"；排序/配对题要消除"两个都说得通"的弱约束句对。
4. **主题词表中立**：`GAMES`/`BADGES`/`LEVELS` 属于**框架配置**，不含任何特定素材主题词（如 Habit），换素材时不用改。
5. **数量达标**：下表"数量"列是最低要求，素材不够时可酌情减少，但每个游戏至少要能完整玩一局。

## 0.5. GAME_META — 游戏标题与副标题（页面顶部展示）

放在 `data.js` **最顶部**（VOCAB 之前），引擎启动时自动读取并填充页面 `<title>`、hero 区 `<h1>` 和 tagline。

| 字段 | 类型 | 说明 |
|---|---|---|
| `title` | string | 游戏标题（显示在浏览器标签页与首页 hero 区），取自素材主题，如 "The Science of Luck" |
| `tagline` | string | 一句英文副标题（≤16 词），点明素材主题与学习价值 |

- **必须**为每个新素材定制，不得沿用上一份素材的标题。
- 引擎对旧版 `data.js` 向后兼容：缺失 `GAME_META` 时保留 HTML 中默认标题。

## 1. VOCAB — 核心词汇（用于 Vocabulary Blitz）

| 字段 | 类型 | 说明 |
|---|---|---|
| `word` | string | 词汇原形（小写） |
| `phonetic` | string | 美式音标，格式 `/.../` |
| `meaning` | string | 简单英文释义（≤12 词），不是词典释义 |
| `example` | string | 原稿原句，目标词替换为 `___` |

- **数量**：15–20 词
- **选词标准**：从原稿挑"有教学价值"的词——高频、可迁移、B2-C1 难度；避开过于简单的日常词和过于生僻的术语。
- `example` 必须是真实原句挖空，不能自己编。

## 2. PHRASES — 短语表（用于 Phrase Match）

| 字段 | 类型 | 说明 |
|---|---|---|
| `phrase` | string | 短语/习语 |
| `meaning` | string | 简单英文释义（≤8 词） |

- **数量**：12–15 条
- 与 `PHRASE_DETECTIVE` 可部分重叠（不同游戏侧重点不同：Match 考识别，Detective 考理解）。

## 3. GOLD_SENTENCES — 金句库（用于 Quote Fill-in + Sentence Scramble）

按难度分三组，每组 ≥8 句：

| 字段 | 类型 | 说明 |
|---|---|---|
| `en` | string | 金句原文（原稿或主题句改写） |
| `hint` | string | 英文提示（换种说法解释句意，不直接给答案词） |
| `blanks` | `[easyPos, hardPos]` | 挖空词的**单词下标**（0 起，按空格分词）。easy 位挖常见词，hard 位挖抽象/关键动词 |

- **数量**：easy 8 + medium 8 + hard 8 = 24 句
- **难度标准**：easy = 短句、口语化；medium = 中等长度、含从句；hard = 长句、抽象观点。
- `blanks` 两个位置**不能是同一个词**，且下标必须在句子的实际词数范围内。

## 4. PHRASE_DETECTIVE — 短语侦探

| 字段 | 类型 | 说明 |
|---|---|---|
| `desc` | string | 简单英文描述（= meaning，题目） |
| `answer` | string | 正确短语 |
| `options` | string[4] | 4 个选项，**必须包含 answer**；3 个干扰项要"像但错" |
| `story` | string | 词源/演变解读，简单英文（3–5 句），讲清"为什么是这个说法" |
| `usage` | string | 原稿中该短语的原句；原稿未出现时，用同义主题句并注明 |

- **数量**：10 条
- `story` 是灵魂——要真的讲词源（如棒球、游戏、历史），不是复述释义。
- 渲染时选项会 shuffle，不要把 answer 固定写在某位。

## 5. WRITING_QUESTS — 写作闯关（Hard 模式）

| 字段 | 类型 | 说明 |
|---|---|---|
| `topic` | string | 写作主题（一句话任务） |
| `requiredWords` | string[] | 必用词 5 个（从 VOCAB 挑） |
| `requiredPatterns` | `{pattern, hint}[]` | 必用句型 2 个 |
| `minWords` | number | 最低词数，通常 100 |
| `modelAnswer` | string | 参考范文（≥minWords，自然用到 requiredWords/Patterns） |

- **数量**：3 题

## 6. SENTENCE_BUILDER — 连句成段

| 字段 | 类型 | 说明 |
|---|---|---|
| `topic` | string | 段落主题 |
| `sentences` | string[4] | 4 句，**按正确顺序**排列（程序会打乱） |

- **数量**：5–6 组
- **答案唯一性（关键）**：用指代链（this/that）、连接词（but/so/that is why/for example）、时间顺序锁死顺序；**消除对称句、同义句、可互换句**——这是本题型最大的坑。

## 7. PARAPHRASE_TASKS — 改述竞技场（Hard）

| 字段 | 类型 | 说明 |
|---|---|---|
| `original` | string | 原金句 |
| `hint` | string | 改述提示 |
| `models` | string[3] | 3 个参考改述（意思不变、用词不同） |

- **数量**：3–4 题

## 8. EXPANDER_TASKS — 金句扩展（Hard）

| 字段 | 类型 | 说明 |
|---|---|---|
| `quote` | string | 原金句 |
| `hint` | string | 扩展提示（加例子/原因） |
| `connectors` | string[] | 目标连接词（because / for example / when / instead of 等） |
| `modelAnswer` | string | 3–4 句范文，自然用到 connectors |

- **数量**：3 题

## 9. CLOZE_DATA — 填空模式（写作类游戏的 Easy 难度）

分 `writing` / `paraphrase` / `expander` 三类。共同结构：

| 字段 | 类型 | 说明 |
|---|---|---|
| `parts` | string[] | 文章片段数组，空格即片段之间的缺口 |
| `answers` | string[] | 依次填入的正确答案（数量 = parts.length - 1） |
| `bank` | string[] | 词库 = answers + 干扰词（比 answers 多 2–4 个） |

各类额外字段：`writing` 加 `title`；`paraphrase` 加 `original`；`expander` 加 `quote`。
- **数量**：writing 3 / paraphrase 4 / expander 3
- **交互一致性**：Easy 模式是"点词填空"（不打字），与选择题手感一致——这是降低写作门槛的关键设计。

## 10. FRAME_DATA — 引导写作（写作类游戏的 Medium 难度）

分 `writing` / `paraphrase` / `expander` 三类。结构（比 Hard 降低要求）：

| 字段 | 类型 | 说明 |
|---|---|---|
| `topic` / `original` / `quote` | string | 三类各自的题目载体 |
| `starters` | string[] | 句首提示（写作类），降低开写难度 |
| `requiredWords` | string[] | 必用词降到 2 个 |
| `requiredPatterns` | `{pattern, hint}[]` | 必用句型降到 1 个 |
| `minWords` | number | 40–50 |
| `modelAnswer` | string | 参考范文 |

- **数量**：每类 2 题
- 难度梯度：Easy(20-25 XP) < Medium(35-50) < Hard(40-80)

## 11. MATCHING_ENDINGS — 句首句尾配对

| 字段 | 类型 | 说明 |
|---|---|---|
| `stem` | string | 句首（含引导词，末尾常带逗号） |
| `endings` | string[4] | 4 个候选结尾，**第 1 个为正确**；干扰项含语法错 + 语义错 |
| `note` | string | 讲解为什么对/错（1–2 句） |

- **数量**：10 题（游戏一轮取 5 题）
- **语法+语义双锁定**：干扰项要么语法接不上，要么语义讲不通，保证答案唯一。

## 12. KNOWLEDGE_BANK — 知识点库

分 4 类：

| key | 条数 | 条目字段 | 来源 |
|---|---|---|---|
| `words` | 20 | `term, phonetic, meaning, example, source` | 直接 `VOCAB.map(...)` 复用，无需手写 |
| `phrases` | 15–17 | `term, meaning, example, source` | 从 PHRASES / PHRASE_DETECTIVE 提炼 |
| `patterns` | 12–14 | `term, meaning, example, source` | 从 GOLD_SENTENCES / MATCHING 提炼句式 |
| `expressions` | 10–12 | `term, meaning, example, source` | 连接词、理念表达 |

- `source` 标注来源（如 "Podcast Vocabulary" / "Phrase Detective"），方便溯源。

## 13. 框架行为规范（引擎逻辑，非 data.js 字段）

以下行为由引擎 `index.html` 实现，换素材时无需改动；列在此处供生成时理解游戏体验。

### Daily Streak（每日打卡连胜）

- **单一真值**：连胜天数始终由 `calcStreakFromDates()` 从 `state.playedDates` 派生——**不维护独立的 `state.streak` 计数器**。顶栏数字、streakInfo 文案、streak toast、`streak_3`/`streak_7` 徽章判定**全部读这一个派生值**，杜绝"数字与日历对不上"。
- **日历**：渲染最近 7 天窗口——已完成日打 ✓、今日显示日期、断档日标红；连胜 > 7 时窗口只展示近况，数字仍以派生值为准。
- **跨天容错**：今日尚未打卡时从昨天起回数，避免一打开页面连胜就归零。
- **状态字段**：`playedDates`（string[]，本地日期 YYYY-MM-DD）、`lastPlayDate`（string）。`state.streak` 不再使用（保留仅为旧存档兼容）。

### 自适应难度（Adaptive Difficulty）

- **覆盖范围**：所有"有对错判定、可算正确率"的**选择类游戏**——Vocabulary Blitz、Quote Fill-in、Phrase Match、Phrase Detective、Sentence Scramble、Sentence Builder、Sentence Endings。写作类（Writing Quest / Paraphrase Arena / Quote Expander）不接入（无对错判定）。
- **状态字段**：每个游戏一个 `state.<game>Difficulty`（1=Easy 2=Medium 3=Hard），持久化在 localStorage，默认 1。字段名：`blitzDifficulty` / `fillDifficulty` / `matchDifficulty` / `detectiveDifficulty` / `scrambleDifficulty` / `builderDifficulty` / `matchingDifficulty`。
- **升降级规则**（每局结算按本轮正确率 pct）：
  - pct ≥ 80 且未到 Hard(3) → 升一级
  - pct ≤ 40 且未到 Easy(1) → 降一级
  - 其余保持
- **UI**：游戏头部显示难度标签 `diff-chip`（绿/黄/红），结算页显示升降级提示 `diff-msg`（⬆️/⬇️/保持）。
- **难度如何影响题目**：由各 `startXxx()` 根据当前等级选题或设干扰项——如 Blitz 高难取更生僻词、Match/Matching 高难增配对数或干扰项、Scramble/Builder 高难取更长句。

## 14. 交付前检查清单

- [ ] 13 个数据常量全部生成（含 `GAME_META`），数量达标
- [ ] 所有选择题 `options` 包含 `answer` 且只有 1 个正确项
- [ ] `GOLD_SENTENCES` 的 `blanks` 下标不越界、easy/hard 不重复
- [ ] `SENTENCE_BUILDER` 无弱约束句对
- [ ] `CLOZE_DATA` 的 `answers.length === parts.length - 1`
- [ ] `KNOWLEDGE_BANK.words` 用 `VOCAB.map` 复用
- [ ] 各选择类游戏的 `state.<game>Difficulty` 默认为 1、结算升降级逻辑就位
- [ ] Daily Streak 顶栏/streakInfo/toast/徽章均读 `calcStreakFromDates()` 派生值
- [ ] `node tests/regression.test.js` 全绿
- [ ] 部署并 curl 验证线上 data.js 是最新
