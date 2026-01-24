// src/utils/titleSystem.js

/**
 * 訪問数、支援状態、クイズ成績からプレイヤーの称号を算出する
 */
export const getPlayerTitle = (visitedCount, isMonetized, quizStats = { maxCorrect: 0, difficulty: "" }) => {

  // 1. 接頭語（Prefix）の判定
  const getPrefix = (stats) => {
    const { maxCorrect, difficulty } = stats;

    if (maxCorrect === 5 && difficulty === "上級") return "古今無双の";
    if (maxCorrect === 5) return "不敗の";
    if (maxCorrect >= 3) return "名高き";
    if (isMonetized) return "黄金の";
    return ""; // 条件を満たさない場合は空文字
  };

  const prefix = getPrefix(quizStats);

  // 2. ベース称号の判定（歴史の観測度に基づく）
  let baseTitle = { name: "歴史の徒", color: "text-gray-400", rank: "C" };

  if (visitedCount >= 3 && isMonetized) {
    baseTitle = {
      name: "多元世界の覇道軍師",
      color: "text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.5)]",
      rank: "SSR"
    };
  } else if (visitedCount >= 3) {
    baseTitle = {
      name: "歴史の観測者",
      color: "text-blue-400",
      rank: "SR"
    };
  } else if (visitedCount >= 2) {
    baseTitle = {
      name: "胡蝶の夢を追う者",
      color: "text-green-400",
      rank: "R"
    };
  }

  // 3. 結合して最終的な称号データを生成
  return {
    ...baseTitle,
    fullName: `${prefix}${baseTitle.name}`, // 例: "不敗の歴史の観測者"
    prefix: prefix
  };
};