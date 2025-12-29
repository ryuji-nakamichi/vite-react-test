import dic from './dic';

/**
 * 配列をランダムにシャッフルする
 */
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

/**
 * 動的にクイズを生成する関数
 * @param {number} count - 生成する問題数
 * @returns {Array} クイズ配列
 */
export const generateDynamicQuiz = (count = 5) => {
  const allCharacters = dic.ALL_DIC_DATA;
  const quizzes = [];

  for (let i = 0; i < count; i++) {
    // 1. ランダムに4人選ぶ
    const shuffledChars = shuffle(allCharacters).slice(0, 4);
    const target = shuffledChars[0]; // 最初の1人を正解の候補にする

    // 2. 問題のタイプをランダムに決定 (0: 武力比較, 1: 字当て)
    const type = Math.floor(Math.random() * 2);

    let question = "";
    let answerIndex = 0;
    let options = [];

    if (type === 0) {
      // パターンA: 武力No.1決定戦
      question = "この中で【武力】が最も高い武将は誰ですか？";
      // 4人の中で実際に武力が一番高い人のインデックスを探す
      const highestStrength = Math.max(...shuffledChars.map(c => c.strength));
      answerIndex = shuffledChars.findIndex(c => c.strength === highestStrength);
      options = shuffledChars.map(c => `${c.firstName}${c.lastName}`);
    } else {
      // パターンB: 字当てクイズ
      question = `字（あざな）が「${target.nickName}」である武将は誰ですか？`;
      answerIndex = 0; // targetが最初なので0
      options = shuffledChars.map(c => `${c.firstName}${c.lastName}`);
    }

    // 選択肢と正解インデックスを最後にシャッフル（答えが常に一番上にならないように）
    // ※今回は簡易化のため割愛しますが、本来はここでoptionsをシャッフルします

    quizzes.push({ question, options, answerIndex });
  }

  return quizzes;
};