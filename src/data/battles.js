export const BATTLES = {
  fancheng_shu: {
    title: "樊城の戦い - 蜀軍シナリオ",
    prelude: [
      "建安二十四年。関羽は中原を震わせるべく、魏の要衝・樊城へと進軍を開始した。",
      "長雨により大地はぬかるみ、河川は荒れ狂う。",
      "目前には曹仁が守る堅城、そして北方からは于禁の援軍が迫る。",
      "義の刃が勝つか、老獪な守りが勝つか。",
      "今、三国の歴史を左右する運命の戦いが幕を開ける。"
    ],
    initialStats: {
      player: { name: "関羽軍", troops: 10000, morale: 80 },
      enemy: { name: "曹仁軍", troops: 12000, morale: 85 }
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
  }
};