export const getPlayerTitle = (visitedCount, isMonetized) => {
  // 1. 全ルート制覇 ＋ 支援中
  if (visitedCount >= 3 && isMonetized) return {
    name: "多元世界の覇道軍師",
    color: "text-yellow-400 shadow-yellow-500",
    rank: "SSR"
  };

  // 2. 全ルート制覇
  if (visitedCount >= 3) return {
    name: "歴史の観測者（クロノ・オブザーバー）",
    color: "text-blue-400",
    rank: "SR"
  };

  // 3. IFルートを1つ以上見た
  if (visitedCount >= 2) return {
    name: "胡蝶の夢を追う者",
    color: "text-green-400",
    rank: "R"
  };

  // 4. 初期状態
  return {
    name: "歴史の徒",
    color: "text-gray-400",
    rank: "C"
  };
};