// src/constants/militaryRanks.js
export const MILITARY_RANKS = [
  // --- 文官 最高職 ---
  {
    category: "文官",
    grade: "一品",
    title: "丞相 (じょうしょう)",
    description: "百官の長であり、皇帝を補佐して国政全般を統括する最高権力職。蜀の諸葛亮や魏の曹操が就いたことで有名。",
    famous: ["曹操", "諸葛亮", "陸遜"],
    color: "text-emerald-400",
    bg: "bg-emerald-900/20"
  },
  {
    category: "文官",
    grade: "一品 / 二品",
    title: "大司馬 (だいしば)",
    description: "軍政の最高責任者。時代によって武官寄りだったり文官寄りだったりするが、極めて高い権威を持つ。",
    famous: ["曹仁", "司馬懿", "呉懿"],
    color: "text-cyan-400",
    bg: "bg-cyan-900/20"
  },
  {
    category: "文官",
    grade: "一品",
    title: "三公 (太尉・司徒・司空)",
    description: "漢代以来の最高位の三職。太尉（軍事）、司徒（民政）、司空（土木・監察）を司る国家の重鎮。",
    famous: ["王允 (司徒)", "荀彧 (尚書令)", "楊彪"],
    color: "text-teal-400",
    bg: "bg-teal-900/20"
  },
  {
    category: "文官",
    grade: "三品 / 四品",
    title: "尚書令 / 中書令 (しょうしょれい / ちゅうしょれい)",
    description: "皇帝の秘書官長から発展し、実質的な政務の枢軸を担う。荀彧（魏）や諸葛瑾（呉）などが活躍した職域。",
    famous: ["荀彧", "諸葛瑾", "法正"],
    color: "text-blue-300",
    bg: "bg-blue-900/20"
  },
  // --- 武官職 ---
  {
    category: "武官", // ← 追加
    grade: "一品",
    title: "大将軍",
    description: "軍事における最高位。全軍を統率する権限を持つ。",
    famous: ["何進", "曹真", "蒋琬", "姜維"],
    color: "text-yellow-400",
    bg: "bg-yellow-900/20"
  },
  {
    category: "武官", // ← 追加
    grade: "二品",
    title: "驃騎将軍 / 車騎将軍",
    description: "大将軍に次ぐ高位。儀礼的にも極めて高い待遇を受ける。",
    famous: ["張飛", "馬超", "曹洪"],
    color: "text-orange-400",
    bg: "bg-orange-900/20"
  },
  {
    category: "武官", // ← 追加
    grade: "二品",
    title: "衛将軍",
    description: "皇帝の警護や首都防衛の最高責任者。",
    famous: ["諸葛瞻"],
    color: "text-red-400",
    bg: "bg-red-900/20"
  },
  {
    category: "武官", // ← 追加
    grade: "三品",
    title: "四征将軍 (征東・征南・征西・征北)",
    description: "四方の敵を討伐するために置かれた重要職。軍事権限が強い。",
    famous: ["張遼", "鄧艾", "夏侯淵"],
    color: "text-blue-400",
    bg: "bg-blue-900/20"
  },
  {
    category: "武官", // ← 追加
    grade: "四品以下",
    title: "雑号将軍",
    description: "特定の功績に応じて名付けられた称号。「盪寇」「破虜」など多岐にわたる。",
    famous: ["関羽 (盪寇将軍)", "孫堅 (破虜将軍)"],
    color: "text-gray-400",
    bg: "bg-gray-900/20"
  }
];