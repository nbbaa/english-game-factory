/**
 * english-game-factory 回归测试
 * 每次修改框架引擎或替换 data.js 后，在每次生成新内容后运行。
 * 运行: node tests/regression.test.js
 *
 * 测试用 mock DOM + vm 沙箱加载 data.js + 引擎 JS，验证:
 *   A. 数据结构完整性（所有数据数组符合 content-spec）
 *   B. 引擎能引用全部数据常量（无 ReferenceError）
 *   C. 关键函数存在（10 个游戏入口 + 复习系统）
 */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// 用法: node tests/regression.test.js [内容目录]
//   无参数  -> 工作区根 (data.js + podcast-english-game.html)
//   传参    -> 相对工作区的目录, 如 "ted-procrastination" 或 "english-game-factory/game"
const target = (process.argv[2] || "").trim();
const ROOT = target
  ? path.resolve(__dirname, "..", target)
  : path.resolve(__dirname, "..");
const DATA_JS = path.join(ROOT, "data.js");
const GAME_HTML = fs.existsSync(path.join(ROOT, "index.html"))
  ? path.join(ROOT, "index.html")
  : path.join(ROOT, "podcast-english-game.html");
console.log(`[回归测试] 目标: ${path.relative(path.resolve(__dirname,'..'), ROOT) || '(工作区根)'}`);

// ---------- 提取引擎 JS ----------
const html = fs.readFileSync(GAME_HTML, "utf-8");
const inline = html.match(/<script>([\s\S]*?)<\/script>/);
if (!inline) { console.error("FAIL: 未找到引擎 inline script"); process.exit(1); }
const engineJS = inline[1];
const dataJS = fs.readFileSync(DATA_JS, "utf-8");

// ---------- 极简断言 ----------
let pass = 0, fail = 0;
const failures = [];
function ok(cond, name) {
  if (cond) { pass++; }
  else { fail++; failures.push(name); console.error("  ✗ " + name); }
}
function section(t) { console.log("\n== " + t + " =="); }

// ---------- mock DOM ----------
function makeEl(tag = "div") {
  const el = {
    tagName: tag.toUpperCase(), children: [], style: {}, dataset: {},
    _html: "", _text: "", className: "", id: "", disabled: false,
    classList: {
      _s: new Set(),
      add(...c){c.forEach(x=>this._s.add(x));}, remove(...c){c.forEach(x=>this._s.delete(x));},
      contains(c){return this._s.has(c);}, toggle(c,f){f===undefined?(this._s.has(c)?this._s.delete(c):this._s.add(c)):(f?this._s.add(c):this._s.delete(c));}
    },
    appendChild(c){this.children.push(c);return c;},
    removeChild(c){const i=this.children.indexOf(c);if(i>=0)this.children.splice(i,1);return c;},
    insertAdjacentHTML(pos,h){this._html+=h;},
    addEventListener(){}, removeEventListener(){},
    querySelector(){return makeEl();}, querySelectorAll(){return [];},
    setAttribute(){}, getAttribute(){return null;}, remove(){},
    getBoundingClientRect(){return {top:0,left:0,width:0,height:0};},
    focus(){}, click(){},
  };
  Object.defineProperty(el, "innerHTML", { get(){return this._html;}, set(v){this._html=v;this.children=[];} });
  Object.defineProperty(el, "textContent", { get(){return this._text;}, set(v){this._text=v;} });
  Object.defineProperty(el, "className", {
    get(){return Array.from(this.classList._s).join(" ");},
    set(v){this.classList._s=new Set(v.split(/\s+/).filter(Boolean));}
  });
  return el;
}
const elements = {};
function reg(id){ if(!elements[id]){elements[id]=makeEl();elements[id].id=id;} return elements[id]; }

const documentMock = {
  getElementById: reg,
  querySelector: () => makeEl(),
  querySelectorAll: () => [],
  createElement: (t) => makeEl(t),
  addEventListener(){}, removeEventListener(){},
  body: makeEl("body"), documentElement: makeEl("html"),
};
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
    clear: () => { store = {}; },
  };
})();

// ---------- 加载沙箱 ----------
const sandbox = {
  console, document: documentMock, localStorage: localStorageMock,
  setTimeout: (fn) => 0, clearTimeout: () => {}, setInterval: () => 0, clearInterval: () => {},
  Math, JSON, Date, Array, Object, String, Number, Boolean, RegExp, Promise,
  parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent,
  globalThis: {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

let engineLoaded = true, engineErr = null;
try {
  vm.runInContext(dataJS + "\n" + engineJS + "\n;globalThis.__keys = Object.keys(globalThis);", sandbox);
} catch (e) { engineLoaded = false; engineErr = e; }

// ---------- A. 引擎加载 ----------
section("A. 引擎 + 数据加载");
ok(engineLoaded, "data.js + 引擎 JS 合并后无运行时错误" + (engineErr ? " — " + engineErr.message : ""));

function getConst(name) {
  try { return vm.runInContext(name, sandbox); }
  catch (e) { return undefined; }
}

// ---------- B. 数据常量存在且结构合法 ----------
section("B. 数据常量存在");
const DATA_CONSTS = ["GAME_META","VOCAB","PHRASES","GOLD_SENTENCES","PHRASE_DETECTIVE","WRITING_QUESTS",
  "SENTENCE_BUILDER","PARAPHRASE_TASKS","EXPANDER_TASKS","CLOZE_DATA","MATCHING_ENDINGS","KNOWLEDGE_BANK","FRAME_DATA"];
const FRAMEWORK_CONSTS = ["GAMES","BADGES","LEVELS"];
DATA_CONSTS.forEach(c => ok(getConst(c) !== undefined, `数据常量 ${c} 存在`));
FRAMEWORK_CONSTS.forEach(c => ok(getConst(c) !== undefined, `框架常量 ${c} 存在`));

section("C. 数据结构完整性（对照 content-spec）");
const VOCAB = getConst("VOCAB");
if (VOCAB) {
  ok(Array.isArray(VOCAB) && VOCAB.length >= 15, "VOCAB ≥15 词");
  ok(VOCAB.every(v => v.word && v.phonetic && v.meaning && v.example && v.example.includes("___")),
     "VOCAB 每条含 word/phonetic/meaning/example(含___)");
}
const META = getConst("GAME_META");
if (META) {
  ok(typeof META.title === "string" && META.title.trim().length > 0, "GAME_META.title 非空字符串");
  ok(typeof META.tagline === "string" && META.tagline.trim().length > 0, "GAME_META.tagline 非空字符串");
}
const GOLD = getConst("GOLD_SENTENCES");
if (GOLD) {
  ["easy","medium","hard"].forEach(d => {
    ok(Array.isArray(GOLD[d]) && GOLD[d].length >= 8, `GOLD_SENTENCES.${d} ≥8 句`);
    ok(GOLD[d].every(q => q.en && q.hint && Array.isArray(q.blanks) && q.blanks.length === 2),
       `GOLD_SENTENCES.${d} 每条含 en/hint/blanks[2]`);
    // blanks 下标范围 + 不重复检查
    let blanksOk = true;
    GOLD[d].forEach((q, i) => {
      const words = q.en.split(" ");
      const maxIdx = words.length - 1;
      const inRange = q.blanks.every(b => b >= 0 && b <= maxIdx);
      const unique = new Set(q.blanks).size === q.blanks.length;
      if (!inRange || !unique) {
        blanksOk = false;
        console.error(`    ✗ ${d}[${i}] blanks=[${q.blanks}] maxIdx=${maxIdx} words=${words.length} "${q.en.slice(0,50)}"`);
      }
    });
    ok(blanksOk, `GOLD_SENTENCES.${d} blanks 下标在范围内且不重复`);
  });
}
const PHRASES = getConst("PHRASES");
if (PHRASES) {
  ok(PHRASES.length >= 12, "PHRASES ≥12 条");
  ok(PHRASES.every(p => p.phrase && p.meaning), "PHRASES 每条含 phrase/meaning");
}
const PD = getConst("PHRASE_DETECTIVE");
if (PD) {
  ok(PD.length >= 10, "PHRASE_DETECTIVE ≥10 条");
  ok(PD.every(q => q.desc && q.answer && Array.isArray(q.options) && q.options.length === 4 && q.options.includes(q.answer) && q.story && q.usage),
     "PHRASE_DETECTIVE 每条含 desc/answer/options[4]含answer/story/usage");
  // 选项唯一正确答案检查
  ok(PD.every(q => q.options.filter(o => o === q.answer).length === 1),
     "PHRASE_DETECTIVE 每条 options 中 answer 恰好出现 1 次");
}
const WQ = getConst("WRITING_QUESTS");
if (WQ) {
  ok(WQ.length >= 3, "WRITING_QUESTS ≥3 题");
  ok(WQ.every(q => q.topic && Array.isArray(q.requiredWords) && q.minWords && q.modelAnswer),
     "WRITING_QUESTS 每条含 topic/requiredWords/minWords/modelAnswer");
  ok(WQ.every(q => q.modelAnswer.split(/\s+/).length >= q.minWords),
     "WRITING_QUESTS modelAnswer 字数 ≥ minWords");
}
const PT = getConst("PARAPHRASE_TASKS");
if (PT) {
  ok(PT.length >= 4, "PARAPHRASE_TASKS ≥4 题");
  ok(PT.every(q => q.original && q.hint && Array.isArray(q.models) && q.models.length >= 2),
     "PARAPHRASE_TASKS 每条含 original/hint/models[≥2]");
  ok(PT.every(q => q.models.every(m => m.split(/\s+/).length >= 5)),
     "PARAPHRASE_TASKS 每个 model 至少 5 词");
}
const ET = getConst("EXPANDER_TASKS");
if (ET) {
  ok(ET.length >= 3, "EXPANDER_TASKS ≥3 题");
  ok(ET.every(q => q.quote && q.hint && Array.isArray(q.connectors) && q.modelAnswer),
     "EXPANDER_TASKS 每条含 quote/hint/connectors/modelAnswer");
  ok(ET.every(q => q.modelAnswer.split(/\s+/).length >= 30),
     "EXPANDER_TASKS modelAnswer 至少 30 词");
}
const ME = getConst("MATCHING_ENDINGS");
if (ME) {
  ok(ME.length >= 10, "MATCHING_ENDINGS ≥10 条");
  ok(ME.every(q => q.stem && Array.isArray(q.endings) && q.endings.length === 4 && q.note),
     "MATCHING_ENDINGS 每条含 stem/endings[4]/note");
  // endings[0] 是正确答案，必须在数组中唯一出现（不与干扰项重复）
  ok(ME.every(q => q.endings.filter(e => e === q.endings[0]).length === 1),
     "MATCHING_ENDINGS endings[0]（正确答案）在 endings 中唯一出现");
}
const SB = getConst("SENTENCE_BUILDER");
if (SB) {
  ok(SB.length >= 5, "SENTENCE_BUILDER ≥5 组");
  ok(SB.every(g => Array.isArray(g.sentences) && g.sentences.length === 4), "SENTENCE_BUILDER 每组 4 句");
}
const KB = getConst("KNOWLEDGE_BANK");
if (KB) {
  ["words","phrases","patterns","expressions"].forEach(k => ok(Array.isArray(KB[k]) && KB[k].length > 0, `KNOWLEDGE_BANK.${k} 非空`));
}
const CLOZE = getConst("CLOZE_DATA");
if (CLOZE) {
  ["writing","paraphrase","expander"].forEach(k => {
    ok(Array.isArray(CLOZE[k]) && CLOZE[k].length > 0, `CLOZE_DATA.${k} 非空`);
    // answers.length === parts.length - 1
    if (Array.isArray(CLOZE[k])) {
      let partsOk = true;
      CLOZE[k].forEach((item, i) => {
        if (!item.parts || !item.answers || item.parts.length !== item.answers.length + 1) {
          partsOk = false;
          console.error(`    ✗ CLOZE_DATA.${k}[${i}] parts.len=${item.parts?.length} answers.len=${item.answers?.length}`);
        }
      });
      ok(partsOk, `CLOZE_DATA.${k} 每条 answers.length === parts.length - 1`);
      // 每个答案必须存在于 bank 中，否则用户在词库里点不到正确答案
      let bankOk = true;
      CLOZE[k].forEach((item, i) => {
        if (!item.bank || !item.answers) return;
        const missing = item.answers.filter(a => !item.bank.includes(a));
        if (missing.length > 0) {
          bankOk = false;
          console.error(`    ✗ CLOZE_DATA.${k}[${i}] answers 不在 bank 中: [${missing.join(", ")}]`);
        }
      });
      ok(bankOk, `CLOZE_DATA.${k} 每个 answer 都存在于 bank 中`);
    }
  });
}
const FRAME = getConst("FRAME_DATA");
if (FRAME) {
  ["writing","paraphrase","expander"].forEach(k => ok(Array.isArray(FRAME[k]) && FRAME[k].length > 0, `FRAME_DATA.${k} 非空`));
}

section("D. 框架配置");
const GAMES = getConst("GAMES");
if (GAMES) {
  ok(GAMES.length === 10, "GAMES 恰好 10 个游戏");
  const ids = ["blitz","fillblank","match","detective","scramble","writing","builder","matching","paraphrase","expander"];
  ids.forEach(id => ok(GAMES.some(g => g.id === id), `游戏 ${id} 在 GAMES 中`));
}

// ---------- E. 引擎函数存在 ----------
section("E. 引擎关键函数存在");
const ENGINE_FNS = ["startGame","startBlitz","startFillBlank","startMatch","startDetective","startScramble",
  "startBuilder","startMatching","startClozeGame","recordMistake","calcStreakFromDates","markPlayedToday","addXP","analyzeWriting",
  "applyGameMeta","getDiff","setDiff","adjustDifficulty","diffChipHtml"];
ENGINE_FNS.forEach(fn => {
  let exists = false;
  try { exists = typeof vm.runInContext(`typeof ${fn}`, sandbox) === "function" || typeof getConst(fn) === "function"; } catch(e){}
  ok(exists, `函数 ${fn} 存在`);
});

// ---------- 汇总 ----------
console.log(`\n========================================`);
console.log(`通过 ${pass} / ${pass + fail}`);
if (fail > 0) {
  console.log("失败项:");
  failures.forEach(f => console.log("  - " + f));
  process.exit(1);
} else {
  console.log("全部通过 ✅");
}
