// src/constants/militaryRanks.js
export const MILITARY_RANKS = [
  // --- 文官 最高職 ---
  {
    category: "文官",
    grade: "一品",
    title: "丞相 (じょうしょう)",
    camp: ["漢", "魏", "蜀", "呉"],
    description: "百官の長であり、皇帝を補佐して国政全般を統括する最高権力職。蜀の諸葛亮や魏の曹操が就いたことで有名。",
    famous: ["曹操", "諸葛亮", "陸遜"],
    salary: "万石 (最高額)",
    authority: 5,
    color: "text-emerald-400",
    bg: "bg-emerald-900/20"
  },
  {
    category: "文官",
    grade: "一品 / 二品",
    title: "大司馬 (だいしば)",
    camp: ["漢", "魏", "蜀", "呉"],
    description: "軍政の最高責任者。時代によって武官寄りだったり文官寄りだったりするが、極めて高い権威を持つ。",
    famous: ["曹仁", "司馬懿", "呉懿"],
    salary: "中二千石",
    authority: 5,
    color: "text-cyan-400",
    bg: "bg-cyan-900/20"
  },
  {
    category: "文官",
    grade: "二品",
    title: "大都督 (だいととく)",
    camp: ["呉", "魏"],
    description: "呉において前線の軍事を総括する最高職。赤壁や夷陵の戦いなどで全軍を指揮した。",
    famous: ["周瑜", "魯粛", "呂蒙", "陸遜"],
    salary: "万石",
    authority: 5,
    color: "text-red-400",
    bg: "bg-red-900/20"
  },
  {
    category: "文官",
    grade: "一品",
    title: "三公 (太尉・司徒・司空)",
    camp: ["漢", "魏"],
    description: "漢代以来の最高位の三職。太尉（軍事）、司徒（民政）、司空（土木・監察）を司る国家の重鎮。名誉職としての性格も強い。",
    famous: ["王允 (司徒)", "荀彧 (尚書令)", "楊彪"],
    salary: "万石",
    authority: 5,
    color: "text-teal-400",
    bg: "bg-teal-900/20"
  },
  {
    category: "文官",
    grade: "三品 / 四品",
    title: "尚書令 / 中書令",
    camp: ["漢", "蜀"],
    description: "皇帝の秘書官長から発展し、実質的な政務の枢軸を担う。行政の実務における最高責任者といえる。",
    famous: ["荀彧", "諸葛瑾", "法正"],
    salary: "千石",
    authority: 4,
    color: "text-blue-300",
    bg: "bg-blue-900/20"
  },
  {
    category: "文官",
    grade: "二品 / 三品",
    title: "州牧 / 刺史 (しゅうぼく / しし)",
    camp: ["漢", "魏", "蜀", "呉"],
    description: "州（地方行政区分）の長。本来は監察職であったが、乱世において軍事・行政の全権を握る軍閥化した。",
    famous: ["劉備 (豫州牧)", "劉表 (荊州牧)", "陶謙 (徐州刺史)"],
    salary: "二千石",
    authority: 4,
    color: "text-green-400",
    bg: "bg-green-900/20"
  },
  {
    category: "文官",
    grade: "三品",
    title: "侍中 (じちゅう)",
    camp: ["漢", "魏", "蜀", "呉"],
    description: "皇帝の側に仕え、諮問に応じる顧問職。常に皇帝の傍にいるため、政治の意思決定に深く関与できる。",
    famous: ["荀攸", "董允", "馬良"],
    salary: "二千石",
    authority: 3,
    color: "text-amber-300",
    bg: "bg-amber-900/20"
  },

  // --- 武官職 ---
  {
    category: "武官",
    grade: "一品",
    title: "大将軍",
    camp: ["漢", "魏", "蜀", "呉"],
    description: "軍事における最高位。全軍を統率する権限を持つ。位は大臣よりも上とされることもあった。",
    famous: ["何進", "曹真", "蒋琬", "姜維"],
    salary: "万石",
    authority: 5,
    color: "text-yellow-400",
    bg: "bg-yellow-900/20"
  },
  {
    category: "武官",
    grade: "二品",
    title: "驃騎将軍 / 車騎将軍",
    camp: ["漢", "魏", "蜀", "呉"],
    description: "大将軍に次ぐ高位。三公に準ずる待遇を受け、大規模な軍団の指揮権を持つ。",
    famous: ["張飛 (車騎将軍)", "馬超 (驃騎将軍)", "曹洪"],
    salary: "万石",
    authority: 5,
    color: "text-orange-400",
    bg: "bg-orange-900/20"
  },
  {
    category: "武官",
    grade: "二品",
    title: "衛将軍",
    camp: ["漢", "蜀", "魏"],
    description: "皇帝の警護、首都近郊の防衛、および宮廷内の軍事を司る重要職。",
    famous: ["諸葛瞻", "姜維 (就任履歴あり)"],
    salary: "二千石",
    authority: 4,
    color: "text-red-400",
    bg: "bg-red-900/20"
  },
  {
    category: "武官",
    grade: "三品",
    title: "四征将軍",
    camp: ["漢", "魏", "蜀", "呉"],
    description: "征東・征南・征西・征北の四将。特定の方面軍の全権を掌握し、遠征や防衛の指揮を執る。",
    famous: ["張遼 (征東将軍)", "鄧艾 (征西将軍)", "夏侯淵 (征西将軍)"],
    salary: "二千石",
    authority: 4,
    color: "text-blue-400",
    bg: "bg-blue-900/20"
  },
  {
    category: "武官",
    grade: "四品 / 五品",
    title: "中郎将 (ちゅうろうしょう)",
    camp: "漢",
    description: "将軍と校尉の間に位置する将校。軍師中郎将（諸葛亮）や五官中郎将（曹丕）など、特殊な任務を帯びることも多い。",
    famous: ["諸葛亮 (軍師中郎将)", "曹丕 (五官中郎将)", "龐統"],
    salary: "比二千石",
    authority: 3,
    color: "text-stone-400",
    bg: "bg-stone-900/20"
  },
  {
    category: "武官",
    grade: "四品以下",
    title: "雑号将軍",
    camp: ["漢", "魏", "蜀", "呉"],
    description: "特定の功績に応じて名付けられた称号。「盪寇」「破虜」「討逆」など、戦場での勇猛さを示すものが多い。",
    famous: ["関羽 (盪寇将軍)", "孫堅 (破虜将軍)", "孫策 (討逆将軍)"],
    salary: "比二千石",
    authority: 2,
    color: "text-gray-400",
    bg: "bg-gray-900/20"
  }
];