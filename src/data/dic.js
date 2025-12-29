// src/data/dic.js

const dicSyokuData = [
  {
    id: 1,
    firstName: '劉',
    lastName: '備',
    nickName: '玄徳',
    group: '蜀',
    birthYear: 161,
    deathYear: 223,
    homeland: '涿郡',
    details: {
      history: {
        catch: '漢の命運を繋ぎ止めた冷徹なる英雄',
        description: '正史では、卓越した政治的感覚と冷徹な判断力を併せ持つ現実主義的な指導者。',
        bio: '正史における劉備は、演義の「お人好し」なイメージとは異なり、非常に粘り強く、時には冷徹な判断も辞さないリアリストとして描かれます。軍事面では苦戦も多かったものの、人心を掌握する術に長け、一代で蜀漢を築き上げた傑物です。'
      },
      romance: {
        catch: '流浪の果てに蜀に国家を樹立',
        description: '漢の末裔を自称し、義を重んじる性格で多くの人々から支持を受けた。',
        bio: '劉備は、後漢末期の武将・政治家であり、蜀漢の初代皇帝として知られる。彼は義を重んじる性格で、多くの人々から支持を受けた。関羽や張飛などの名将を配下に迎え入れ、三国志の中でも特に人気の高い主人公的キャラクターです。'
      }
    },
    strength: 70,
    intelligence: 85,
    charisma: 100,
    politics: 80,
    command: 75,
    strategy: 80,
    keywords: ['義兄弟', '人徳', '漢王室末裔', '三顧の礼', '蜀漢建国'],
    skills: ['外交', '人心掌握', '騎馬', '弓術'],
    relatedCharacters: [
      { id: 2, name: '関羽', relation: '義兄弟' },
      { id: 3, name: '張飛', relation: '義兄弟' },
      { id: 4, name: '諸葛亮', relation: '軍師' },
      { id: 5, name: '趙雲', relation: '忠実な部下' },
      { id: 14, name: '曹操', relation: '好敵手' },
      { id: 8, name: '孫権', relation: '同盟者' },
    ]
  },
  {
    id: 2,
    firstName: '関',
    lastName: '羽',
    nickName: '雲長',
    group: '蜀',
    birthYear: 160,
    deathYear: 219,
    homeland: '河東郡',
    details: {
      history: {
        catch: '威名は華夏を震わす',
        description: '「万人の敵」と称された猛将。剛毅だが自尊心が非常に高く、それが破滅を招いた。',
        bio: '正史では張飛と共に「万人の敵」と評された一騎当千の将。曹操からもその武勇を高く評価されましたが、誇り高い性格ゆえに同僚や同盟国の呉を軽んじ、最終的に孤立して敗れました。'
      },
      romance: {
        catch: '曹操が遷都を考慮するほどの知勇兼備',
        description: '劉備の義兄弟であり、武勇に優れた将軍。義理堅い性格で知られる。',
        bio: '劉備の義兄弟であり、蜀漢の五虎大将軍の筆頭。その忠誠心と武勇は神格化されており、中国では商売の神様としても信仰されています。'
      }
    },
    strength: 95,
    intelligence: 80,
    charisma: 90,
    politics: 70,
    command: 85,
    strategy: 75,
    keywords: ['義兄弟', '忠誠心', '剛勇', '赤壁の戦い', '神格化'],
    skills: ['武勇', '忠誠心', '剣術', '戦術'],
    relatedCharacters: [
      { id: 1, name: '劉備', relation: '義兄弟' },
      { id: 3, name: '張飛', relation: '義兄弟' },
      { id: 14, name: '曹操', relation: '好敵手' },
    ]
  },
  {
    id: 3,
    firstName: '張',
    lastName: '飛',
    nickName: '翼徳',
    group: '蜀',
    birthYear: 167,
    deathYear: 221,
    homeland: '涿郡',
    details: {
      history: {
        catch: '知略でも敵を翻弄した猛将',
        description: 'ただの暴れん坊ではなく、厳顔を計略で降伏させるなどの知略も見せた。',
        bio: '正史の張飛は、君子を敬う一方で部下には厳しく、それが仇となって最期は部下に暗殺されました。しかし、長坂橋での勇姿や益州入りの際の知略など、軍事的能力は極めて高いものがありました。'
      },
      romance: {
        catch: '実は知勇兼備の豪傑',
        description: '劉備の義兄弟であり、豪快な性格と強力な武力で知られる将軍。',
        bio: '豪快で酒好きなキャラクターとして愛されています。長坂橋でたった一騎、曹操の大軍を退かせたエピソードはあまりにも有名です。'
      }
    },
    strength: 90,
    intelligence: 70,
    charisma: 85,
    politics: 60,
    command: 70,
    strategy: 65,
    keywords: ['義兄弟', '豪放磊落', '剛勇', '長坂橋の戦い', '豪快'],
    skills: ['武勇', '豪放磊落', '剣術', '戦術'],
    relatedCharacters: [
      { id: 1, name: '劉備', relation: '義兄弟' },
      { id: 2, name: '関羽', relation: '義兄弟' },
      { id: 14, name: '曹操', relation: '好敵手' },
    ]
  },
  {
    id: 4,
    firstName: '諸',
    lastName: '葛亮',
    nickName: '孔明',
    group: '蜀',
    birthYear: 181,
    deathYear: 234,
    homeland: '琅邪郡',
    details: {
      history: {
        catch: '天下を三分させた不世出の政治家',
        description: '魔法のような計略よりも、法に厳格な政治運営と、組織を維持する能力が評価される。',
        bio: '正史における諸葛亮は、奇跡的な計略を使う軍師というよりは、卓越した行政官・法家としての側面が強い人物です。小国である蜀を法によって統制し、国力以上の軍事活動を可能にしたその執政能力は、歴史上でも類を見ません。'
      },
      romance: {
        catch: '上は天文、下は地理に至る迄',
        description: '劉備の軍師であり、卓越した知略と戦術で蜀漢を支えた。',
        bio: '風を呼び、未来を予見する天才軍師。空城の計や草船借箭など、不可能を可能にする知略で物語を牽引する、三国志最大の人気者です。'
      }
    },
    strength: 60,
    intelligence: 100,
    charisma: 90,
    politics: 95,
    command: 80,
    strategy: 85,
    keywords: ['天才軍師', '知略', '先見の明', '赤壁の戦い', '内政手腕'],
    skills: ['戦術', '内政', '外交', '知略'],
    relatedCharacters: [
      { id: 1, name: '劉備', relation: '主君' },
      { id: 14, name: '曹操', relation: '好敵手' },
    ]
  },
  {
    id: 5,
    firstName: '趙',
    lastName: '雲',
    nickName: '子龍',
    group: '蜀',
    birthYear: 168,
    deathYear: 229,
    homeland: '常山郡',
    details: {
      history: {
        catch: '主君を支えた堅実なる名将',
        description: '派手な一騎打ちは少ないが、殿軍を務めて被害を出さないなどの堅実さが光る。',
        bio: '正史では記録が少ないものの、劉備の家族を戦火から救い出し、北伐の際も撤退戦を見事に指揮するなど、常に安定した功績を残しました。私欲がなく、主君に直言できる誠実な人物でした。'
      },
      romance: {
        catch: '我が槍、敵を貫く',
        description: '長坂の戦いで単騎、幼き主を救い出した白銀の勇将。',
        bio: '演義では無敗を誇る完璧な武将。長坂での単騎駆けは物語最大のクライマックスの一つ。五虎大将軍の一人として、常に前線で活躍しました。'
      }
    },
    strength: 90,
    intelligence: 80,
    charisma: 85,
    politics: 80,
    command: 85,
    strategy: 80,
    keywords: ['勇敢', '忠誠心', '冷静', '長坂橋の戦い', '誠実'],
    skills: ['武勇', '忠誠心', '判断力', '戦術'],
    relatedCharacters: [
      { id: 1, name: '劉備', relation: '主君' },
      { id: 14, name: '曹操', relation: '好敵手' },
    ]
  }
  // ※ スペースの都合上、以降のキャラクター（馬超、黄忠、呉・魏の武将など）は
  // 同じ構造（details.history / details.romance）に当てはめて実装してください。
];

const dicGoData = [
  {
    id: 8,
    firstName: '孫',
    lastName: '権',
    nickName: '仲謀',
    group: '呉',
    birthYear: 182,
    deathYear: 252,
    homeland: '江東',
    details: {
      history: {
        catch: '江東に君臨した若き虎',
        description: '兄の急死後、十代で国を継ぎ、曹操・劉備と並ぶ帝国を築き上げた。',
        bio: '父と兄の急死という危機の中で呉をまとめ上げ、赤壁の戦いで曹操を撃退。晩年には失政もあったものの、三国の均衡を最も長く保った外交と忍耐の指導者です。'
      },
      romance: {
        catch: '我が名は孫権、天下を取る者なり',
        description: '赤壁にて曹操を破った呉の初代皇帝。碧眼の英雄。',
        bio: '呉の初代皇帝。兄・孫策の遺志を継ぎ、多くの名将を率いて赤壁の戦いで勝利。劉備との同盟と対立を繰り返しながら、独自の勢力を守り抜きました。'
      }
    },
    strength: 75,
    intelligence: 85,
    charisma: 90,
    politics: 80,
    command: 85,
    strategy: 80,
    keywords: ['呉の初代皇帝', '政治手腕', '赤壁の戦い', '外交政策', '江東'],
    skills: ['政治', '軍事', '外交', '戦術'],
    relatedCharacters: [
      { id: 14, name: '曹操', relation: '好敵手' },
      { id: 1, name: '劉備', relation: '同盟者' },
    ]
  }
];

const dicGiData = [
  {
    id: 14,
    firstName: '曹',
    lastName: '操',
    nickName: '孟徳',
    group: '魏',
    birthYear: 155,
    deathYear: 220,
    homeland: '沛国',
    details: {
      history: {
        catch: '魏の礎を築いた不世出の天才政治家',
        description: '「治世の能臣、乱世の奸雄」。詩人、兵法家、政治家として頂点を極めた。',
        bio: '正史における曹操は、古い因習を打破し、実力主義を採用した革新的な指導者。詩文にも長け、兵法書『孫子』を現在残る形に注釈したのも彼です。三国志史上、最も多才な英雄と言えます。'
      },
      romance: {
        catch: '乱世を恐れ、乱世を望んだ最強の敵',
        description: '魏の創始者。冷酷非道ながら、人を惹きつけてやまない覇王。',
        bio: '物語では劉備の対極に位置する悪役（ヒール）として描かれますが、その圧倒的なカリスマ性と実力は敵味方から恐れられ、尊敬されました。'
      }
    },
    strength: 85,
    intelligence: 95,
    charisma: 90,
    politics: 80,
    command: 85,
    strategy: 80,
    keywords: ['魏の創始者', '政治手腕', '赤壁の戦い', '外交政策', '江東'],
    skills: ['政治', '軍事', '外交', '戦術'],
    relatedCharacters: [
      { id: 1, name: '劉備', relation: '好敵手' },
      { id: 8, name: '孫権', relation: '好敵手' },
    ]
  }
];

const ALL_DIC_DATA = [
  ...dicSyokuData,
  ...dicGoData,
  ...dicGiData
];

export default {
  dicSyokuData,
  dicGoData,
  dicGiData,
  ALL_DIC_DATA
};