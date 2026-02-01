export const BATTLES = {
  fancheng_shu: {
    title: "樊城の戦い - 蜀軍シナリオ",
    typeLabel: "BATTLEFIELD",
    icon: "🗡️",
    branchId: "win-fancheng",
    prelude: [
      "建安二十四年。\n関羽は中原を震わせるべく、\n魏の要衝・樊城へと進軍を開始した。",
      "長雨により大地はぬかるみ、河川は荒れ狂う。",
      "目前には曹仁が守る堅城、\nそして北方からは于禁の援軍が迫る。",
      "義の刃が勝つか、老獪な守りが勝つか。",
      "三国の歴史を左右する運命の戦いが\n今、幕を開ける。"
    ],
    initialStats: {
      player: { name: "関羽軍", troops: 10000, morale: 80 },
      enemy: { name: "曹仁軍", troops: 12000, morale: 85 }
    },
    cutIn: {
      text: "「我が刃、中原を両断せん！」",
      author: "— 蜀将・関羽雲長",
      color: "bg-blue-600/80" 
    },
    phases: {
      // 1. 開戦
      start: {
        message: "魏の曹仁が守る樊城を包囲した。しかし、北から于禁の援軍が接近中との報が入った。どう動く？",
        choices: [
          {
            text: "長雨を利用し、水攻めの準備を開始する",
            impact: { playerMorale: 5, enemyMorale: -10, playerTroops: -100, enemyTroops: 0 },
            log: "関羽は堤防を築き、雨水を溜め始めた……。",
            nextPhase: "flood_wait"
          },
          {
            text: "援軍が来る前に正面から力押しで落とす",
            impact: { playerMorale: -5, enemyMorale: -5, playerTroops: -1500, enemyTroops: -1000 },
            log: "関羽軍は猛攻を仕掛けたが、樊城の守りは堅い！",
            nextPhase: "front_clash"
          }
        ]
      },
      // 2-A. 水攻めルート
      flood_wait: {
        message: "水攻めの準備が整った。于禁の軍が低地に布陣している。今こそ決行の時か？",
        choices: [
          {
            text: "今こそ水門を開け、敵を水没させる！",
            impact: { playerMorale: 30, enemyMorale: -50, playerTroops: 0, enemyTroops: -5000 },
            log: "凄まじい濁流が魏軍を飲み込む！于禁を捕らえ、龐徳を討った！",
            nextPhase: "victory"
          }
        ]
      },
      // 2-B. 正面突破ルート（今回追加した箇所）
      front_clash: {
        message: "樊城への総攻撃を開始しました！しかし曹仁の守備は鉄壁であり、魏の援軍も現れました。激戦が続いています。",
        choices: [
          {
            text: "全軍突撃！一気に本丸を落とす",
            impact: { playerMorale: -20, enemyTroops: -3000, playerTroops: -4000 },
            log: "関羽軍は決死の覚悟で突撃。多大な犠牲を払いつつも、魏軍を追い詰めていく……。",
            nextPhase: "victory"
          },
          {
            text: "一旦軍を退き、包囲網を再編する",
            impact: { playerMorale: -10, enemyMorale: 5, playerTroops: 0, enemyTroops: 0 },
            log: "攻勢を維持できず、好機を逸した。士気が低下している。",
            nextPhase: "start"
          }
        ]
      },
      // 3. 結末：勝利
      victory: {
        message: "見事なり！敵軍を壊滅させ、樊城を完全に制圧しました。我が軍の勝利です！",
        choices: [
          {
            text: "勝利の凱旋（ホームへ）",
            nextPhase: "end_victory",
            log: "合戦に勝利しました！"
          }
        ]
      },
      // 4. 結末：敗北
      defeat: {
        message: "無念……。我が軍の損害が限界を超えました。ここは一時撤退し、軍を立て直しましょう。",
        choices: [
          {
            text: "無念の撤退（ホームへ）",
            nextPhase: "end_defeat",
            log: "合戦に敗北しました……。"
          }
        ]
      }
    }
  },
  // ★ 新規追加：夷陵の戦い
  yiling_shu: {
    title: "夷陵の戦い - 蜀軍シナリオ",
    typeLabel: "BATTLEFIELD",
    icon: "🔥",
    branchId: "win-yiling",
    prelude: [
      "章武二年。昭烈帝・劉備は、\n義弟・関羽の報復を果たすべく、\n蜀の精鋭を率いて東呉へと侵攻した。",
      "破竹の勢いで長江を下る蜀軍。\n対する呉の若き名将・陸遜は、\n広大な森林地帯へと劉備を誘い込む。",
      "連なる陣営、夏の酷暑、そして不気味な沈黙。\n復讐に燃える劉備は、復讐を遂げることができるのか。"
    ],
    initialStats: {
      player: { name: "劉備軍", troops: 15000, morale: 90 },
      enemy: { name: "陸遜軍", troops: 12000, morale: 85 }
    },
    cutIn: {
      text: "「亡き弟たちの無念、この一戦で晴らさん！」",
      author: "— 蜀漢皇帝・劉備玄徳",
      color: "bg-red-700/80"
    },
    phases: {
      start: {
        message: "蜀軍は長江沿いに「連営」を築いたが、夏の酷暑に兵が疲弊している。どう陣を動かすか？",
        choices: [
          {
            text: "涼を求め、陣を森林地帯へと移動させる",
            impact: { playerMorale: 10, enemyMorale: 5 },
            log: "劉備は涼しさを優先し、全軍を森へ移動させた。しかし、陸遜はこれを待っていた……！",
            nextPhase: "fire_trap"
          },
          {
            text: "敵の誘いと警戒し、不便を承知で水際に陣を留める",
            impact: { playerMorale: -20, playerTroops: -1000, enemyTroops: -500 },
            log: "兵の不満は募るが、陸遜の狙いからは外れた。泥沼の消耗戦が始まる。",
            nextPhase: "clash"
          }
        ]
      },
      fire_trap: {
        message: "夜陰に乗じ、呉軍の火計が発動！森に隠れた蜀の連営が瞬く間に火の海となる！",
        choices: [
          {
            text: "陣を捨て、白帝城まで全軍撤退！",
            impact: { playerMorale: -50, playerTroops: -7000 },
            log: "壊滅的な被害を出し、劉備はかろうじて逃げ延びた……。史実通りの敗北である。",
            nextPhase: "defeat"
          },
          {
            text: "火の中を突き進み、陸遜の本陣へ決死の突撃！",
            impact: { playerMorale: 40, enemyMorale: -30, playerTroops: -4000, enemyTroops: -5000 },
            log: "「義のために死すべし！」逆境での猛攻に、呉軍は恐慌状態に陥った！",
            nextPhase: "victory" // ここでIFルートへ！
          }
        ]
      },
      clash: {
        message: "両軍、正面から激突。陸遜の巧妙な用兵に蜀軍は苦戦を強いられる……。",
        choices: [
          {
            text: "捨て身の攻勢をかける",
            impact: { playerMorale: 20, enemyMorale: -10, playerTroops: -3000, enemyTroops: -2000 },
            log: "激しい乱戦となった。勝利の女神はどちらに微笑むか……。",
            nextPhase: "victory"
          }
        ]
      },
      // ★ 追加：勝利フェーズ（ここがないとボタンが出ません）
      victory: {
        message: "陸遜を撃退し、江陵までの道を切り拓いた！蜀軍の意気は天を突き、歴史は今、大きく塗り替えられた。",
        choices: [
          {
            text: "勝利の凱旋（ホームへ）",
            nextPhase: "end_victory",
            impact: {},
            log: "歴史に新たな一ページが刻まれた。"
          }
        ]
      },

      // ★ 追加：敗北フェーズ
      defeat: {
        message: "劉備は力尽き、永安へと逃げ延びた。蜀の未来に暗雲が立ち込める……。",
        choices: [
          {
            text: "撤退する（ホームへ）",
            nextPhase: "end_defeat",
            impact: {},
            log: "無念の敗北である。"
          }
        ]
      }
    }
  }
};