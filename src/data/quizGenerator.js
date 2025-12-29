import dic from './dic';

// 配列をシャッフルするユーティリティ
const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

/**
 * 難易度ごとに許可する問題タイプを返す
 */
const getAvailableTypesByDifficulty = (difficulty) => {
  if (difficulty === 'easy') return ['FACTION_GUESS', 'NICKNAME_GUESS'];
  if (difficulty === 'normal') return ['STAT_RANK', 'NICKNAME_GUESS'];
  return ['STAT_RANK', 'KEYWORD_GUESS']; // hard
};

/**
 * ステータスが近いライバルを抽出する（難易度調整）
 */
const getCompetitors = (target, statKey, pool, difficulty) => {
  // 上級(hard)なら差が15以内、それ以外は差が40以内
  const range = difficulty === 'hard' ? 15 : 40;
  const rivals = pool.filter(c =>
    c.id !== target.id &&
    Math.abs((c[statKey] || 0) - (target[statKey] || 0)) <= range
  );
  // 足りない場合はランダムに補充
  return shuffle(rivals.length >= 3 ? rivals : pool.filter(c => c.id !== target.id)).slice(0, 3);
};

/**
 * 動的クイズ生成メイン関数
 */
export const generateDynamicQuiz = (difficulty = 'normal', count = 5) => {
  const allCharacters = dic.ALL_DIC_DATA;

  // ★ ここで定義（ReferenceError防止）
  const quizzes = [];

  // 1. 【重複防止】問題の主役（正解者候補）を重複なく選ぶ
  const targetPool = shuffle(allCharacters).slice(0, count);

  targetPool.forEach((target) => {
    const availableTypes = getAvailableTypesByDifficulty(difficulty);
    const selectedType = availableTypes[Math.floor(Math.random() * availableTypes.length)];

    let question = "";
    let options = [];
    let answerIndex = 0;

    switch (selectedType) {
      case 'STAT_RANK': {
        const stats = [
          { name: '武力', key: 'strength' },
          { name: '知力', key: 'intelligence' },
          { name: '統率', key: 'command' },
          { name: '政治', key: 'politics' }
        ];
        const selectedStat = stats[Math.floor(Math.random() * stats.length)];
        const statKey = selectedStat.key;

        let shuffledCompetitors;
        let hasUniqueWinner = false;

        // 【1位の重複解決】1位が一人になるまで最大5回リトライ
        for (let retry = 0; retry < 5; retry++) {
          const competitors = getCompetitors(target, statKey, allCharacters, difficulty);
          shuffledCompetitors = shuffle([target, ...competitors]);

          const maxVal = Math.max(...shuffledCompetitors.map(c => c[statKey] || 0));
          const winners = shuffledCompetitors.filter(c => (c[statKey] || 0) === maxVal);

          if (winners.length === 1) {
            hasUniqueWinner = true;
            answerIndex = shuffledCompetitors.findIndex(c => (c[statKey] || 0) === maxVal);
            break;
          }
        }

        // 成功しなかった場合は安全のために「字当て」に切り替え
        if (!hasUniqueWinner) {
          question = `字（あざな）が「${target.nickName || '－'}」なのは誰？`;
          const others = shuffle(allCharacters.filter(c => c.id !== target.id)).slice(0, 3);
          const nickOptions = shuffle([target, ...others]);
          answerIndex = nickOptions.indexOf(target);
          options = nickOptions.map(c => `${c.firstName}${c.lastName}`);
        } else {
          options = shuffledCompetitors.map(c => `${c.firstName}${c.lastName}`);
          question = `この中で【${selectedStat.name}】が最も高いのは誰？`;
        }
        break;
      }

      case 'FACTION_GUESS':
        question = `${target.firstName}${target.lastName}の所属勢力は？`;
        options = shuffle(['魏', '呉', '蜀', 'その他']);
        answerIndex = options.indexOf(target.group);
        break;

      case 'NICKNAME_GUESS':
        question = `字（あざな）が「${target.nickName || '－'}」なのは誰？`;
        const nOthers = shuffle(allCharacters.filter(c => c.id !== target.id)).slice(0, 3);
        const nOptions = shuffle([target, ...nOthers]);
        answerIndex = nOptions.indexOf(target);
        options = nOptions.map(c => `${c.firstName}${c.lastName}`);
        break;

      case 'KEYWORD_GUESS':
        const keyword = (target.keywords && target.keywords.length > 0) ? target.keywords[0] : "義兄弟";
        question = `特徴タグに「${keyword}」を持つ武将は誰？`;
        const kOthers = shuffle(allCharacters.filter(c => !c.keywords.includes(keyword))).slice(0, 3);
        const kOptions = shuffle([target, ...kOthers]);
        answerIndex = kOptions.indexOf(target);
        options = kOptions.map(c => `${c.firstName}${c.lastName}`);
        break;
    }

    quizzes.push({ question, options, answerIndex });
  });

  return quizzes;
};