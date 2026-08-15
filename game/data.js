// ===== Sample Content Data — All English, No Chinese =====
// This is ORIGINAL sample content written for this framework (theme: learning & growth).
// Replace this entire file with content generated from your own material.
// Follow skills/english-game-factory/references/content-spec.md when generating.

// ===== Game Meta — 游戏标题与副标题（引擎启动时读取并填充页面） =====
const GAME_META = {
  title: "The English Game Challenge",
  tagline: "Learn English from any video or podcast — play your way to fluency"
};

const VOCAB = [
  { word:"fluent", phonetic:"/ˈfluːənt/", meaning:"able to speak smoothly and easily", example:"She became ___ after years of daily practice." },
  { word:"consistent", phonetic:"/kənˈsɪstənt/", meaning:"doing something regularly without stopping", example:"Small ___ effort beats occasional big effort." },
  { word:"immerse", phonetic:"/ɪˈmɜːrs/", meaning:"to surround yourself completely with something", example:"The best way to learn is to ___ yourself in the language." },
  { word:"vocabulary", phonetic:"/voʊˈkæbjəleri/", meaning:"all the words you know in a language", example:"Reading widely grows your ___ fast." },
  { word:"pronunciation", phonetic:"/prəˌnʌnsiˈeɪʃn/", meaning:"the way a word is spoken", example:"Good ___ matters more than a perfect accent." },
  { word:"practice", phonetic:"/ˈpræktɪs/", meaning:"doing something again and again to improve", example:"Daily ___ turns effort into skill." },
  { word:"progress", phonetic:"/ˈprɑːɡres/", meaning:"steady improvement over time", example:"You cannot see ___ day by day, but it adds up." },
  { word:"confidence", phonetic:"/ˈkɑːnfɪdəns/", meaning:"the feeling that you can do something well", example:"Speaking often builds real ___." },
  { word:"mistake", phonetic:"/mɪˈsteɪk/", meaning:"something done wrongly, a chance to learn", example:"Every ___ is a lesson in disguise." },
  { word:"curiosity", phonetic:"/ˌkjʊriˈɑːsəti/", meaning:"the desire to learn and know more", example:"Follow your ___ and learning feels like play." },
  { word:"persistent", phonetic:"/pərˈsɪstənt/", meaning:"refusing to give up", example:"A ___ learner wins in the long run." },
  { word:"exposure", phonetic:"/ɪkˈspoʊʒər/", meaning:"the experience of meeting something often", example:"Regular ___ to real English trains your ear." },
  { word:"improve", phonetic:"/ɪmˈpruːv/", meaning:"to get better at something", example:"You ___ fastest when you get feedback." },
  { word:"meaningful", phonetic:"/ˈmiːnɪŋfəl/", meaning:"having real purpose or value", example:"Learn words in ___ context, not from lists." },
  { word:"gradually", phonetic:"/ˈɡrædʒuəli/", meaning:"slowly, little by little", example:"Skill grows ___, not overnight." },
  { word:"challenge", phonetic:"/ˈtʃælɪndʒ/", meaning:"a task that tests your ability", example:"Seek out a ___ just beyond your level." },
];

const PHRASES = [
  { phrase:"little by little", meaning:"slowly, in small steps" },
  { phrase:"stick with it", meaning:"to keep going and not quit" },
  { phrase:"pick up", meaning:"to learn something naturally without formal study" },
  { phrase:"over time", meaning:"as days and months pass" },
  { phrase:"step by step", meaning:"one stage at a time, in order" },
  { phrase:"out loud", meaning:"speaking so others can hear" },
  { phrase:"in the long run", meaning:"over a long period, eventually" },
  { phrase:"on a daily basis", meaning:"every day" },
  { phrase:"get the hang of", meaning:"to learn how to do something" },
  { phrase:"brush up on", meaning:"to practise to improve a skill you once had" },
  { phrase:"pay off", meaning:"to bring good results over time" },
  { phrase:"keep at it", meaning:"to continue working on something" },
];

const GOLD_SENTENCES = {
  easy: [
    { en:"Practice makes progress.", hint:"Doing it again and again moves you forward", blanks:[0,2] },
    { en:"Little by little, you get better.", hint:"Small steps lead to improvement", blanks:[0,5] },
    { en:"Mistakes help you learn.", hint:"Errors are teachers", blanks:[0,3] },
    { en:"Speak a little every day.", hint:"Use your voice daily", blanks:[1,4] },
    { en:"Consistency beats intensity.", hint:"Regular small effort wins over rare big effort", blanks:[0,3] },
    { en:"Read something daily.", hint:"Look at English text each day", blanks:[0,3] },
    { en:"Listen before you speak.", hint:"Hearing comes first", blanks:[0,4] },
    { en:"Start where you are.", hint:"Begin from your current level", blanks:[1,3] },
  ],
  medium: [
    { en:"The best time to start learning was yesterday; the second best time is now.", hint:"Do not wait — begin today", blanks:[4,13] },
    { en:"You do not need to be perfect; you only need to keep going.", hint:"Progress matters more than perfection", blanks:[6,12] },
    { en:"Real fluency comes from using the language, not just studying it.", hint:"Speaking beats only reading books", blanks:[1,7] },
    { en:"What you practise in private shows up in public.", hint:"Hidden effort becomes visible skill", blanks:[2,8] },
    { en:"Learning a language is a marathon, not a sprint.", hint:"It is a long journey, not a quick race", blanks:[4,9] },
    { en:"The more you use a word, the more it belongs to you.", hint:"Repetition builds ownership", blanks:[2,9] },
    { en:"Small daily wins build unshakable confidence.", hint:"Tiny victories create strong self-belief", blanks:[1,5] },
    { en:"Your ear learns before your mouth does.", hint:"Listening comes before speaking", blanks:[1,6] },
  ],
  hard: [
    { en:"Exposure to real language trains your brain faster than memorising rules.", hint:"Real input beats rote grammar", blanks:[1,7] },
    { en:"Deliberate practice, not mindless repetition, is what sharpens a skill.", hint:"Focused effort beats empty drilling", blanks:[1,8] },
    { en:"The discomfort you feel while stretching is the feeling of growth itself.", hint:"Struggle means you are improving", blanks:[2,9] },
    { en:"Vocabulary learned in context stays; vocabulary memorised in isolation fades.", hint:"Words in sentences stick, word lists slip away", blanks:[2,10] },
    { en:"Feedback is the compass that keeps your practice moving in the right direction.", hint:"Correction guides improvement", blanks:[0,8] },
    { en:"To think in a new language, you must first stop translating from your old one.", hint:"Stop converting in your head", blanks:[4,12] },
    { en:"Consistency, repeated over months, quietly outperforms bursts of motivation.", hint:"Steady habit beats short enthusiasm", blanks:[0,8] },
    { en:"Every fluent speaker was once a beginner who refused to give up.", hint:"Experts started as stubborn novices", blanks:[2,9] },
  ],
};

const PHRASE_DETECTIVE = [
  {
    desc: "slowly, in small steps",
    answer: "little by little",
    options: ["little by little", "step to step", "bit by bit slowly", "small and small"],
    story: "English loves doubling words to show gradual change: 'bit by bit', 'step by step', 'little by little'. The repetition paints a picture of many tiny pieces adding up. It suggests patience — you will not see a big jump, but the small pieces never stop arriving.",
    usage: "You do not become fluent overnight. You get there little by little, one conversation at a time."
  },
  {
    desc: "to learn something naturally without formal study",
    answer: "pick up",
    options: ["pick up", "lift up", "take on", "hold over"],
    story: "Imagine walking along a path and casually picking up interesting stones. That is the image behind 'pick up' a language: you collect it almost by accident, just by being around it. No classroom, no textbook — you simply gather it as you go.",
    usage: "Children pick up languages just by hearing them every day."
  },
  {
    desc: "to keep going and not quit",
    answer: "stick with it",
    options: ["stick with it", "glue to it", "hold on it", "stay over it"],
    story: "Think of glue. When something sticks, it stays attached and does not come loose. To 'stick with it' means to stay attached to your goal the way glue stays attached to paper — through boredom, difficulty, and slow days.",
    usage: "Learning gets hard in the middle, but if you stick with it, the progress comes."
  },
  {
    desc: "to learn how to do something",
    answer: "get the hang of",
    options: ["get the hang of", "catch the swing of", "grab the hook of", "find the loop of"],
    story: "This phrase likely comes from learning to use a tool — getting the 'hang' or feel of how it hangs and swings in your hand. Once you 'get the hang of' something, it stops feeling awkward and starts to feel natural in your hands.",
    usage: "Do not worry if speaking feels strange at first. You will get the hang of it."
  },
  {
    desc: "to bring good results over time",
    answer: "pay off",
    options: ["pay off", "cash out", "pay up", "give back"],
    story: "This comes from money. When you 'pay off' a debt, you finish it completely. In everyday speech, hard work 'pays off' when it finally brings the reward — as if all that effort was money you invested, and now it returns with interest.",
    usage: "All those early mornings of practice finally paid off when she passed the exam."
  },
  {
    desc: "to practise to improve a skill you once had",
    answer: "brush up on",
    options: ["brush up on", "polish over", "sweep through", "wipe down"],
    story: "Picture brushing dust off an old coat you have not worn in years. The coat is still good — it just needs refreshing. To 'brush up on' a skill means to clean off the rust and make an old ability shine again.",
    usage: "Before the trip, I need to brush up on my English."
  },
  {
    desc: "over a long period, eventually",
    answer: "in the long run",
    options: ["in the long run", "on the far road", "at the slow end", "by the late turn"],
    story: "This comes from running. A short run is a sprint — fast but brief. 'The long run' is the full distance. So 'in the long run' means: judge results over the whole race, not the first hundred metres.",
    usage: "Cramming feels fast, but daily practice wins in the long run."
  },
  {
    desc: "speaking so others can hear",
    answer: "out loud",
    options: ["out loud", "in voice", "with sound", "on speaker"],
    story: "The opposite of reading silently in your head. 'Out' pushes the words outside your mind, and 'loud' means audible. Reading 'out loud' is one of the oldest language exercises — it forces your mouth to make the real sounds, not just imagine them.",
    usage: "Read the sentences out loud to train your pronunciation."
  },
  {
    desc: "one stage at a time, in order",
    answer: "step by step",
    options: ["step by step", "stage on stage", "one by two", "foot by foot"],
    story: "Like climbing stairs: you do not jump to the top — you take one step, then the next. The doubled word 'step by step' is a promise that a big climb is really just many small, ordered moves.",
    usage: "Follow the course step by step and do not skip ahead."
  },
  {
    desc: "every day",
    answer: "on a daily basis",
    options: ["on a daily basis", "in a day way", "by each morning", "per the daily"],
    story: "'Basis' means the foundation or regular rhythm of something. So 'on a daily basis' means 'built on a daily rhythm'. It is the more formal cousin of simply saying 'every day', common in both speech and writing.",
    usage: "You should review new words on a daily basis so they move into long-term memory."
  },
];

const WRITING_QUESTS = [
  {
    topic: "Write about how you would build a daily English-learning routine.",
    requiredWords: ["consistent", "immerse", "vocabulary", "progress", "gradually"],
    requiredPatterns: [
      { pattern: "the more", hint: "The more... the more..." },
      { pattern: "instead of", hint: "instead of doing X, I will do Y" }
    ],
    minWords: 100,
    modelAnswer: "To build a daily English routine, I will stay consistent rather than chase intense bursts. The more I immerse myself in real content, the more natural the language feels. Instead of memorising word lists, I will grow my vocabulary through reading and listening. Each day I will practise speaking out loud, even for ten minutes. Progress will come gradually, but it will come. The more I repeat this routine, the more confident I will become, and slowly English will stop feeling like a subject and start feeling like a tool I use."
  },
  {
    topic: "Write about why mistakes are useful when learning a language.",
    requiredWords: ["mistake", "confidence", "improve", "feedback", "persistent"],
    requiredPatterns: [
      { pattern: "not only", hint: "not only... but also..." },
      { pattern: "so that", hint: "... so that ..." }
    ],
    minWords: 100,
    modelAnswer: "Mistakes are not the enemy of learning; they are the engine. Every mistake shows exactly where I need to improve. When I get feedback, I learn not only the correct form but also why my first attempt was wrong. This builds real confidence, because I stop fearing errors and start collecting them. I write down each mistake so that I can review it later and avoid repeating it. A persistent learner treats every error as data. The more mistakes I make and correct, the faster I improve. In the long run, the learner who is not afraid to be wrong always beats the one who stays silent."
  },
  {
    topic: "Write about how reading and listening help you learn a language.",
    requiredWords: ["exposure", "meaningful", "curiosity", "challenge", "fluent"],
    requiredPatterns: [
      { pattern: "the more", hint: "The more... the more..." },
      { pattern: "by doing", hint: "by doing X, you can achieve Y" }
    ],
    minWords: 100,
    modelAnswer: "Reading and listening give me constant exposure to real English. The more I read, the more words I meet in meaningful context, and the more they stick. By listening to podcasts and videos, I train my ear before my mouth. I follow my curiosity and choose topics I actually enjoy, so learning never feels like work. I also pick a challenge just beyond my level — material that is a little too hard pushes me to grow. Over time, this steady diet of input is what makes a learner fluent. Input comes first; output follows naturally."
  }
];

const SENTENCE_BUILDER = [
  {
    topic: "Why consistency beats intensity",
    sentences: [
      "Many learners study hard for a few days and then stop completely.",
      "This burst of effort feels productive, but it fades quickly.",
      "That is why a small daily habit works far better than occasional cramming.",
      "So choose consistency over intensity, and your skills will grow steadily."
    ]
  },
  {
    topic: "The role of mistakes",
    sentences: [
      "Most learners are afraid of making mistakes when they speak.",
      "But every mistake points to exactly what you need to fix next.",
      "For example, a wrong verb form tells you which grammar to review.",
      "So instead of hiding from errors, collect them and learn from each one."
    ]
  },
  {
    topic: "Input before output",
    sentences: [
      "Before you can speak well, you need a lot of listening and reading.",
      "This input fills your mind with real phrases and natural patterns.",
      "When the input is rich enough, words start coming out on their own.",
      "That is why fluent speakers always recommend listening more than you speak."
    ]
  },
  {
    topic: "Learning in context",
    sentences: [
      "Memorising word lists feels efficient, but the words slip away fast.",
      "Words learned inside a real sentence, however, stay much longer.",
      "That is because context gives each word a meaning you can picture.",
      "So always learn vocabulary in sentences, not in isolation."
    ]
  },
  {
    topic: "The power of feedback",
    sentences: [
      "Practice alone does not guarantee improvement.",
      "Without feedback, you can repeat the same mistake for months.",
      "A teacher, a partner, or even an app can point out what you cannot see.",
      "That is why the fastest learners always seek correction, not just repetition."
    ]
  },
  {
    topic: "Make it enjoyable",
    sentences: [
      "If learning feels like a chore, you will eventually quit.",
      "But if you learn through topics you love, the effort feels like play.",
      "For instance, a football fan can learn English through match commentary.",
      "So pick materials you enjoy, and consistency will take care of itself."
    ]
  }
];

const PARAPHRASE_TASKS = [
  {
    original: "Practice makes progress.",
    hint: "Rewrite this in your own words. Keep the meaning, change the words.",
    models: [
      "Doing something again and again moves you forward.",
      "The more you practise, the further you advance.",
      "Regular effort leads to steady improvement."
    ]
  },
  {
    original: "Consistency beats intensity.",
    hint: "Rewrite this in your own words. Keep the meaning, change the words.",
    models: [
      "Small daily effort wins over rare big effort.",
      "Working a little every day beats working a lot once in a while.",
      "Steady repetition outperforms occasional bursts."
    ]
  },
  {
    original: "Mistakes help you learn.",
    hint: "Rewrite this in your own words. Keep the meaning, change the words.",
    models: [
      "Errors are your best teachers.",
      "Getting things wrong shows you how to get them right.",
      "You learn the most from the things you get wrong."
    ]
  },
  {
    original: "Learning a language is a marathon, not a sprint.",
    hint: "Rewrite this in your own words. Keep the meaning, change the words.",
    models: [
      "Mastering a language takes patience, not speed.",
      "Language learning is a long journey, not a quick race.",
      "You reach fluency slowly, over months — not in one burst."
    ]
  }
];

const EXPANDER_TASKS = [
  {
    quote: "Practice makes progress.",
    hint: "Expand into 3-4 sentences. Add a reason and a personal example.",
    connectors: ["because", "for example", "when", "instead of"],
    modelAnswer: "Practice makes progress because each repetition strengthens the skill a little more. For example, when I practise speaking for ten minutes every morning, I notice my sentences come out more smoothly each week. Instead of waiting for a big block of free time, I use small moments throughout the day. When I look back after a month, the improvement is obvious."
  },
  {
    quote: "Mistakes help you learn.",
    hint: "Expand into 3-4 sentences. Add a reason and a personal example.",
    connectors: ["because", "for example", "when", "instead of"],
    modelAnswer: "Mistakes help you learn because they show you exactly what to fix. For example, when a teacher corrects my grammar, I remember that rule far better than if I had just read it. Instead of feeling embarrassed, I now write down each error and review it. When I make the same point correctly a week later, I know the mistake did its job."
  },
  {
    quote: "Consistency beats intensity.",
    hint: "Expand into 3-4 sentences. Add a reason and a personal example.",
    connectors: ["because", "for example", "when", "instead of"],
    modelAnswer: "Consistency beats intensity because the brain remembers what it meets often, not what it meets once. For example, I remember far more from fifteen minutes of daily review than from a three-hour weekend cram. Instead of studying hard for two days and quitting, I now do a little every single day. When the habit is small and daily, it never feels heavy — and it never stops working."
  }
];

const CLOZE_DATA = {
  writing: [
    {
      title: "Building a Daily Reading Habit",
      parts: [
        "I want to read English every day. First, I will make it easy by choosing short articles. The ",
        " I read, the more words I will meet. Instead of relying on motivation, I will read at the same time each morning so it becomes ",
        ". Over time, this small habit will show real ",
        " in my vocabulary."
      ],
      answers: ["more", "automatic", "progress"],
      bank: ["more", "automatic", "progress", "difficult", "random", "regret", "less"]
    },
    {
      title: "Why I Will Speak Out Loud",
      parts: [
        "To improve my speaking, I will practise out loud every day. Speaking trains my mouth, not just my ",
        ". When I say a sentence aloud, I hear my own mistakes and can ",
        " them. This daily practice will slowly build my ",
        ". Little by little, speaking English will feel natural."
      ],
      answers: ["mind", "fix", "confidence"],
      bank: ["mind", "fix", "confidence", "ignore", "book", "fear", "desk"]
    },
    {
      title: "Learning Words in Context",
      parts: [
        "I will stop memorising long word lists. Words learned in isolation fade fast. Instead, I will learn each word inside a real ",
        ". The context gives the word a meaning I can ",
        ". This way, new vocabulary stays in my memory much ",
        "."
      ],
      answers: ["sentence", "picture", "longer"],
      bank: ["sentence", "picture", "longer", "forget", "number", "shorter", "list"]
    }
  ],
  paraphrase: [
    {
      original: "Practice makes progress.",
      parts: ["Doing something again and again ", " you forward."],
      answers: ["moves"],
      bank: ["moves", "stops", "pushes back", "hides", "blocks"]
    },
    {
      original: "Consistency beats intensity.",
      parts: ["Small daily effort ", " over rare big effort."],
      answers: ["wins"],
      bank: ["wins", "loses", "runs", "hides", "falls"]
    },
    {
      original: "Mistakes help you learn.",
      parts: ["Errors are your best ", "."],
      answers: ["teachers"],
      bank: ["teachers", "enemies", "friends", "walls", "games"]
    },
    {
      original: "Learning a language is a marathon, not a sprint.",
      parts: ["Mastering a language takes ", ", not speed."],
      answers: ["patience"],
      bank: ["patience", "luck", "money", "talent", "speed"]
    }
  ],
  expander: [
    {
      quote: "Practice makes progress.",
      parts: [
        "Practice makes progress ",
        " each repetition strengthens the skill a little more. ",
        ", when I practise speaking every morning, my sentences come out more smoothly. ",
        " waiting for a big block of free time, I use small moments throughout the day."
      ],
      answers: ["because", "For example", "Instead of"],
      bank: ["because", "For example", "Instead of", "although", "never", "quickly"]
    },
    {
      quote: "Mistakes help you learn.",
      parts: [
        "Mistakes help you learn ",
        " they show you exactly what to fix. ",
        ", when a teacher corrects my grammar, I remember that rule far better. ",
        " feeling embarrassed, I write down each error and review it."
      ],
      answers: ["because", "For example", "Instead of"],
      bank: ["because", "For example", "Instead of", "unless", "never", "slowly"]
    },
    {
      quote: "Consistency beats intensity.",
      parts: [
        "Consistency beats intensity ",
        " the brain remembers what it meets often. ",
        ", I remember more from daily review than from a weekend cram. ",
        " studying hard for two days and quitting, I do a little every day."
      ],
      answers: ["because", "For example", "Instead of"],
      bank: ["because", "For example", "Instead of", "although", "seldom", "hardly"]
    }
  ]
};

const MATCHING_ENDINGS = [
  {
    stem: "The more you practise,",
    endings: [
      "the more confident you become.",
      "the more confident you will became.",
      "the most confident you become.",
      "the more confident you becoming."
    ],
    note: "The structure is 'the more... the more + subject + verb' in the present tense."
  },
  {
    stem: "Instead of memorising word lists,",
    endings: [
      "learn words inside real sentences.",
      "learning words inside real sentences.",
      "to learning words in real sentences.",
      "you learning words in real sentences."
    ],
    note: "'Instead of + -ing' is followed by a main clause with a subject and verb."
  },
  {
    stem: "Because feedback shows what to fix,",
    endings: [
      "you should always ask for correction.",
      "you should always asking for correction.",
      "you should always asked for correction.",
      "asking for correction always."
    ],
    note: "After 'should', use the base form of the verb."
  },
  {
    stem: "When you read every day,",
    endings: [
      "your vocabulary grows without much effort.",
      "your vocabulary grow without much effort.",
      "your vocabulary growing without much effort.",
      "your vocabulary to grow without effort."
    ],
    note: "'Vocabulary' is singular, so the verb is 'grows'."
  },
  {
    stem: "If you only study once a week,",
    endings: [
      "you will forget most of what you learned.",
      "you will forgetting most of what you learned.",
      "you forgets most of what you learned.",
      "you will forgot most of what you learned."
    ],
    note: "First conditional: 'will' + base verb in the result clause."
  },
  {
    stem: "Speaking out loud helps,",
    endings: [
      "because it trains your mouth, not just your mind.",
      "because it training your mouth, not just your mind.",
      "because it train your mouth, not just your mind.",
      "because it trained your mouth tomorrow."
    ],
    note: "'It' is singular and the sentence is general truth, so use present 'trains'."
  },
  {
    stem: "The fastest learners are not the ones who never fail,",
    endings: [
      "but the ones who learn from every failure.",
      "but the ones who learning from every failure.",
      "but the ones who learns from every failure.",
      "but the ones who fail to learn."
    ],
    note: "The contrast is 'not... but...'; the plural 'ones' takes 'learn'."
  },
  {
    stem: "To become fluent,",
    endings: [
      "you need to use the language, not just study it.",
      "you need using the language, not just study it.",
      "you needing to use the language.",
      "you needs to use the language."
    ],
    note: "'Need to + verb' is the correct pattern; 'you' takes 'need'."
  },
  {
    stem: "Small habits work",
    endings: [
      "because they are easy to repeat every single day.",
      "because they is easy to repeat every single day.",
      "because they being easy to repeat daily.",
      "because it are easy to repeat every day."
    ],
    note: "'Habits' is plural, so use 'they are'."
  },
  {
    stem: "Do not wait until you feel ready,",
    endings: [
      "because that day may never come.",
      "because that day may never comes.",
      "because that day may never coming.",
      "because that day never to come."
    ],
    note: "After 'may', use the base verb 'come'."
  }
];

const KNOWLEDGE_BANK = {
  words: VOCAB.map(v => ({
    term: v.word, phonetic: v.phonetic, meaning: v.meaning, example: v.example, source: "Sample Vocabulary"
  })),
  phrases: [
    { term: "little by little", meaning: "slowly, in small steps", example: "You get there little by little, one conversation at a time.", source: "Phrase Detective" },
    { term: "pick up", meaning: "to learn naturally without formal study", example: "Children pick up languages just by hearing them.", source: "Phrase Detective" },
    { term: "stick with it", meaning: "to keep going and not quit", example: "If you stick with it, the progress comes.", source: "Phrase Detective" },
    { term: "get the hang of", meaning: "to learn how to do something", example: "You will get the hang of it soon.", source: "Phrase Detective" },
    { term: "pay off", meaning: "to bring good results over time", example: "All that practice finally paid off.", source: "Phrase Detective" },
    { term: "brush up on", meaning: "to practise to refresh an old skill", example: "I need to brush up on my English.", source: "Phrase Detective" },
    { term: "in the long run", meaning: "over a long period, eventually", example: "Daily practice wins in the long run.", source: "Phrase Detective" },
    { term: "out loud", meaning: "speaking so others can hear", example: "Read the sentences out loud.", source: "Phrase Detective" },
    { term: "step by step", meaning: "one stage at a time, in order", example: "Follow the course step by step.", source: "Phrase Detective" },
    { term: "on a daily basis", meaning: "every day", example: "Review new words on a daily basis.", source: "Phrase Detective" },
    { term: "keep at it", meaning: "to continue working on something", example: "Keep at it and you will improve.", source: "Phrase Match" },
    { term: "over time", meaning: "as days and months pass", example: "Skill builds over time.", source: "Phrase Match" },
  ],
  patterns: [
    { term: "the more... the more...", meaning: "two things increase together", example: "The more you practise, the more confident you become.", source: "Sentence Endings" },
    { term: "instead of + -ing", meaning: "choose one thing, not another", example: "Instead of memorising lists, learn words in sentences.", source: "Sentence Endings" },
    { term: "not only... but also...", meaning: "adds a second, stronger point", example: "You learn not only the correct form but also the reason.", source: "Writing Quest" },
    { term: "so that", meaning: "shows purpose or result", example: "I write down each mistake so that I can review it.", source: "Writing Quest" },
    { term: "by doing X, you can Y", meaning: "method leads to result", example: "By listening daily, you train your ear.", source: "Writing Quest" },
    { term: "First conditional (if + present, will + verb)", meaning: "a real future possibility", example: "If you only study once a week, you will forget most of it.", source: "Sentence Endings" },
    { term: "not... but...", meaning: "corrects one idea with another", example: "The fastest learners are not the ones who never fail, but the ones who learn from failure.", source: "Sentence Endings" },
    { term: "need to + verb", meaning: "expresses necessity", example: "You need to use the language, not just study it.", source: "Sentence Endings" },
  ],
  expressions: [
    { term: "Practice makes progress.", meaning: "repetition leads to improvement", example: "Do not chase perfection — practice makes progress.", source: "Gold Sentences" },
    { term: "Consistency beats intensity.", meaning: "regular small effort wins over rare big effort", example: "Ten minutes daily wins — consistency beats intensity.", source: "Gold Sentences" },
    { term: "Mistakes help you learn.", meaning: "errors are useful feedback", example: "Do not fear errors — mistakes help you learn.", source: "Gold Sentences" },
    { term: "because", meaning: "gives a reason", example: "Practice works because each repetition strengthens the skill.", source: "Quote Expander" },
    { term: "for example", meaning: "introduces a specific case", example: "For example, I review words every morning.", source: "Quote Expander" },
    { term: "when", meaning: "introduces a time or situation", example: "When I look back after a month, the progress is clear.", source: "Quote Expander" },
    { term: "instead of", meaning: "shows a replaced action", example: "Instead of cramming, study a little every day.", source: "Quote Expander" },
  ]
};

const FRAME_DATA = {
  writing: [
    {
      topic: "Write about how you would build a daily English-learning routine. Use the starters if you need help.",
      starters: ["I want to build a habit of...", "To make it easy, I will...", "If I miss one day, I will..."],
      requiredWords: ["consistent", "progress"],
      requiredPatterns: [{ pattern: "the more", hint: "The more... the more..." }],
      minWords: 50,
      modelAnswer: "I want to build a habit of reading English every day. To make it easy, I will stay consistent and read for just ten minutes. The more I read, the more words I will learn. If I miss one day, I will not quit — I will start again the next morning. Over time, I know I will see real progress."
    },
    {
      topic: "Write about why mistakes are useful when learning. Use the starters if you need help.",
      starters: ["Many learners are afraid of...", "But mistakes actually...", "For example, when I..."],
      requiredWords: ["mistake", "improve"],
      requiredPatterns: [{ pattern: "for example", hint: "For example, ..." }],
      minWords: 50,
      modelAnswer: "Many learners are afraid of making mistakes. But mistakes actually show us what to fix. For example, when I say a wrong verb form, I learn the correct one. Every mistake is a small lesson. So I will not be afraid — each error helps me improve."
    }
  ],
  paraphrase: [
    {
      original: "Practice makes progress.",
      starters: ["Doing something again and again...", "The more you practise..."],
      requiredWords: [],
      requiredPatterns: [],
      minWords: 8,
      models: [
        "Doing something again and again moves you forward.",
        "The more you practise, the further you advance.",
        "Regular effort leads to steady improvement."
      ]
    },
    {
      original: "Consistency beats intensity.",
      starters: ["Small daily effort...", "Working a little every day..."],
      requiredWords: [],
      requiredPatterns: [],
      minWords: 8,
      models: [
        "Small daily effort wins over rare big effort.",
        "Working a little every day beats working a lot once in a while.",
        "Steady repetition outperforms occasional bursts."
      ]
    }
  ],
  expander: [
    {
      quote: "Practice makes progress.",
      starters: ["Practice makes progress because...", "For example, when I...", "Instead of..."],
      requiredWords: [],
      requiredPatterns: [],
      minWords: 30,
      modelAnswer: "Practice makes progress because each repetition strengthens the skill a little more. For example, when I practise speaking every morning, my sentences come out more smoothly. Instead of waiting for a big block of free time, I use small moments throughout the day."
    },
    {
      quote: "Mistakes help you learn.",
      starters: ["Mistakes help you learn because...", "For example, when...", "Instead of..."],
      requiredWords: [],
      requiredPatterns: [],
      minWords: 30,
      modelAnswer: "Mistakes help you learn because they show you exactly what to fix. For example, when a teacher corrects my grammar, I remember the rule far better. Instead of feeling embarrassed, I write down each error and review it."
    }
  ]
};
