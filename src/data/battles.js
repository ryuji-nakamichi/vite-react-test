export const BATTLES = {
  // 官渡の戦い - 曹操軍、北の覇権を賭けた決戦
  guandu_wei: {
    title: "官渡の戦い - 奇襲烏巣",
    typeLabel: "MAJOR BATTLE",
    icon: "🌾",
    branchId: "win-guandu",
    factions: ['魏', '袁紹'],
    mapX: 450, mapY: 150, mapColor: "purple", // 黄河の近く
    prelude: [
      "中原の覇権を巡り、曹操と袁紹が激突。兵力差は十倍、曹操軍は兵糧不足に苦しんでいた。",
      "そこへ袁紹の策士・許攸が投降し、秘密の情報を告げる。兵糧庫『烏巣』の守りが薄いと……。",
      "「天、我に味方せり！」"
    ],
    initialStats: {
      player: { name: "曹操軍", troops: 20000, morale: 60 },
      enemy: { name: "袁紹軍", troops: 100000, morale: 90 }
    },
    phases: {
      start: {
        message: "決死の奇襲を仕掛けるか、官渡の城で守り抜くか？",
        choices: [
          {
            text: "曹操自ら軽騎兵を率い、烏巣を火攻めにする",
            impact: { enemyMorale: -50, enemyTroops: -20000, playerMorale: 40 },
            log: "烏巣の炎が夜空を焦がす！袁紹軍はパニックに陥り、大軍が総崩れとなった！",
            nextPhase: "victory"
          },
          {
            text: "増援を待ち、官渡を死守する",
            impact: { playerTroops: -5000, playerMorale: -20 },
            log: "物量差に圧倒され、城壁が崩れ始める……。撤退はもはや不可能だ。",
            nextPhase: "defeat"
          }
        ]
      },
      victory: {
        message: "袁紹軍を撃破し、曹操は北中原の支配権を確立した。覇道はここから加速する。",
        choices: [{ text: "凱旋（ホームへ）", nextPhase: "end_victory", impact: {}, log: "中原の覇者へ。" }]
      },
      defeat: {
        message: "奇襲は失敗し、曹操は官渡で力尽きた。袁紹の天下が現実のものとなる……。",
        choices: [{ text: "撤退（ホームへ）", nextPhase: "end_defeat", impact: {}, log: "無念……。" }]
      }
    },
    cutIn: {
      text: "「天下の形勢、この一火にあり！」",
      author: "— 魏王・曹操孟徳",
      color: "bg-purple-900/90"
    }
  },
  // 赤壁の戦い - 天下三分を決めた大火
  chibi_shu: {
    title: "赤壁の戦い - 逆転の東風",
    typeLabel: "NAVAL BATTLE",
    icon: "⛵",
    branchId: "win-chibi",
    factions: ['魏', '呉', '蜀',],
    mapX: 550, mapY: 400, mapColor: "emerald",
    prelude: [
      "曹操率いる八十万の大軍が南下。長江を埋め尽くす艦隊を前に、孫権・劉備連合軍は窮地に立たされる。",
      "諸葛亮はひとり、七星壇に登り『祈風』の儀式を執り行う……。",
      "「この風、天に届くか――」"
    ],
    initialStats: {
      player: { name: "孫劉連合軍", troops: 50000, morale: 85 },
      enemy: { name: "曹操軍", troops: 800000, morale: 70 }
    },
    phases: {
      start: {
        message: "北風が吹き荒れている。火計を成功させるには、南東の風が必要だ。諸葛亮はどう動く？",
        choices: [
          {
            text: "祈祷により風を呼ぶ（IFルート）",
            impact: { playerMorale: 50, enemyMorale: -20 },
            log: "奇跡か、天命か。突如として南東の風が吹き始め、黄蓋の火船が魏の艦隊へ突っ込む！",
            nextPhase: "victory"
          },
          {
            text: "風を待たず、小舟で奇襲をかける",
            impact: { playerTroops: -10000, playerMorale: -20 },
            log: "風に煽られ火は自軍へ。圧倒的な兵力差を前に、連合軍は壊滅の危機に……。",
            nextPhase: "defeat"
          }
        ]
      },
      victory: {
        message: "赤壁の海は火の海と化し、曹操は命からがら北へ逃げ延びた。ここに『天下三分』の礎が築かれた。",
        choices: [{ text: "凱旋（ホームへ）", nextPhase: "end_victory", impact: {}, log: "伝説が始まった。" }]
      },
      defeat: {
        message: "火計は失敗し、長江は曹操の手に落ちた。漢王朝の運命は風前の灯火……。",
        choices: [{ text: "撤退（ホームへ）", nextPhase: "end_defeat", impact: {}, log: "野望は潰えた。" }]
      }
    },
    cutIn: {
      text: "「天、我が願いを聞き入れたり！」",
      author: "— 諸葛亮孔明",
      color: "bg-emerald-600/90"
    }
  },
  // 漢中争奪戦 - 蜀漢の最盛期
  hanzhong_shu: {
    title: "漢中争奪戦 - 定軍山の戦い",
    typeLabel: "MOUNTAIN BATTLE",
    icon: "🏔️",
    branchId: "win-hanzhong",
    factions: ['蜀', '魏'],
    mapX: 280, mapY: 320, mapColor: "amber",
    prelude: [
      "蜀の安寧のため、北の門戸『漢中』の奪還は急務。老将・黄忠は名将・夏侯淵を討つべく定軍山へ向かう。",
      "劉備自ら陣頭指揮を執り、曹操との最終決戦が幕を開ける！"
    ],
    initialStats: {
      player: { name: "劉備軍", troops: 12000, morale: 100 },
      enemy: { name: "夏侯淵軍", troops: 10000, morale: 85 }
    },
    phases: {
      start: {
        message: "夏侯淵は高地を占拠している。黄忠の猛攻をどう仕掛ける？",
        choices: [
          {
            text: "法正の合図を待ち、一気に駆け下りる",
            impact: { enemyTroops: -5000, enemyMorale: -40 },
            log: "「いまだ！」法正が旗を振ると、黄忠は雷光の如き速さで夏侯淵を討ち取った！",
            nextPhase: "victory"
          },
          {
            text: "力攻めで斜面を登る",
            impact: { playerTroops: -4000, playerMorale: -10 },
            log: "矢の雨に阻まれ、消耗戦に。曹操の援軍が到着してしまう……。",
            nextPhase: "defeat"
          }
        ]
      },
      victory: {
        message: "漢中を手中に収めた劉備は、ついに『漢中王』を名乗り、天下にその覇道を示した。",
        choices: [{ text: "凱旋（ホームへ）", nextPhase: "end_victory", impact: {}, log: "王道ここに極まる。" }]
      },
      defeat: {
        message: "夏侯淵を崩せず、劉備軍は漢中から撤退。曹操の威圧感はさらに増すことに……。",
        choices: [{ text: "撤退（ホームへ）", nextPhase: "end_defeat", impact: {}, log: "無念の敗北。" }]
      }
    },
    cutIn: {
      text: "「この黄忠、老いたりといえど、この首は取れまい！」",
      author: "— 蜀将・黄忠漢升",
      color: "bg-amber-600/90"
    }
  },
  // 合肥の戦い - 張遼、八百の勇士
  hefei_wei: {
    title: "合肥の戦い - 遼来来",
    typeLabel: "DEFENSIVE BATTLE",
    icon: "🐎",
    branchId: "win-hefei",
    factions: ['魏', '呉'],
    mapX: 600, mapY: 350, mapColor: "purple", // 長江の下流、東部
    prelude: [
      "孫権率いる十万の大軍が合肥城を包囲。守る魏軍はわずか七千。",
      "絶望的な状況下、名将・張遼は決死隊八百を選りすぐり、夜明けとともに敵陣へ突撃した！"
    ],
    initialStats: {
      player: { name: "張遼隊", troops: 800, morale: 120 },
      enemy: { name: "孫権軍", troops: 100000, morale: 80 }
    },
    phases: {
      start: {
        message: "孫権の本陣が見えた！張遼、全軍をどう導く？",
        choices: [
          {
            text: "己が名を叫び、真っ直ぐ孫権を急襲する！",
            impact: { enemyMorale: -60, enemyTroops: -10000, playerMorale: 30 },
            log: "「張文遠、ここにおり！」孫権軍は恐怖で凍りつき、呉の子らは泣く子も黙ったという……。",
            nextPhase: "victory"
          },
          {
            text: "城に戻り、籠城戦に切り替える",
            impact: { playerMorale: -30, enemyMorale: 10 },
            log: "突撃の勢いが止まり、圧倒的な物量に包囲される。チャンスは失われた。",
            nextPhase: "defeat"
          }
        ]
      },
      victory: {
        message: "八百の勇士が十万を退けた。合肥は守られ、張遼の名は呉の国中に轟いた。",
        choices: [{ text: "凱旋（ホームへ）", nextPhase: "end_victory", impact: {}, log: "武神の如し。" }]
      },
      defeat: {
        message: "張遼、奮戦及ばず。合肥城は陥落し、呉軍の中原進出を許してしまった……。",
        choices: [{ text: "撤退（ホームへ）", nextPhase: "end_defeat", impact: {}, log: "合肥、陥つ。" }]
      }
    },
    cutIn: {
      text: "「我が名を震えながら聞くがいい！」",
      author: "— 魏将・張遼文遠",
      color: "bg-indigo-800/90"
    }
  },
  // 樊城の戦い
  fancheng_shu: {
    title: "樊城の戦い - 蜀軍シナリオ",
    typeLabel: "BATTLEFIELD",
    icon: "🗡️",
    branchId: "win-fancheng",
    factions: ['魏', '呉', '蜀',],
    mapX: 420, mapY: 300, mapColor: "blue",
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
    factions: ['蜀', '呉'],
    mapX: 300, mapY: 430, mapColor: "red",
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
  },
  // 五丈原の戦い
  wuzhang_shu: {
    title: "五丈原の戦い - 秋風の決戦",
    typeLabel: "BATTLEFIELD",
    icon: "🌟",
    branchId: "win-wuzhang",
    factions: ['蜀', '魏'],
    mapX: 350, mapY: 220, mapColor: "indigo",
    prelude: [
      "建安九年。諸葛亮、五度目の北伐。\n魏の守護神・司馬懿は、堅固な陣を築き、\n一向に打って出ようとはしない。",
      "秋風が吹き抜ける五丈原。\n諸葛亮は自らの寿命が尽きようとしていることを悟る。",
      "「我が命、天に問わん」"
    ],
    initialStats: {
      player: { name: "諸葛亮軍", troops: 10000, morale: 80 }, // 初回ボーナス+20で 100 スタートを想定
      enemy: { name: "司馬懿軍", troops: 15000, morale: 95 }
    },
    phases: {
      start: {
        message: "司馬懿は堅く守り、持久戦の構えだ。諸葛亮の病状は悪化している。どう動くか？",
        choices: [
          {
            text: "女物の服を送りつけ、司馬懿を激しく挑発する",
            impact: { playerMorale: -45, enemyMorale: -30 }, // ★ 大幅に士気を削るリスク（絶望への道）
            log: "司馬懿は動じず。逆に蜀軍の焦りが全軍に伝染し、士気が急落した……！",
            nextPhase: "star_prayer"
          },
          {
            text: "五丈原で屯田を行い、長期戦の覚悟を見せる",
            impact: { playerMorale: 5, playerTroops: 1000 },
            log: "蜀軍は落ち着きを取り戻すが、時間は無情に過ぎていく。",
            nextPhase: "star_prayer"
          }
        ]
      },
      star_prayer: {
        message: "諸葛亮は「七星灯の儀式」を行い、天に寿命を延ばすよう祈る。背後では司馬懿が動き出した……！",
        choices: [
          {
            text: "儀式に集中し、天命を待つ",
            // ★ 士気 +60 に強化！ (100 + 60 = 160 で黄金モード確定)
            impact: { playerMorale: 60, enemyMorale: -20 },
            log: "灯火は消えなかった！天から黄金の光が降り注ぎ、諸葛亮の瞳に力が戻る。魏軍は『死せる孔明』の威圧感に震え上がった！",
            nextPhase: "victory"
          },
          {
            text: "儀式を中断し、全軍に撤退を命じる",
            // ★ 士気 -70 に強化！ (100 - 70 = 30 で暗闇モード確定)
            impact: { playerMorale: -70, enemyMorale: 20, playerTroops: -3000 },
            log: "「我が命、ここまでか……」諸葛亮の溜息と共に灯火が消え、戦場に深い闇が立ち込める。蜀軍は悲痛な面持ちで撤退を開始した。",
            nextPhase: "defeat"
          }
        ]
      },
      victory: {
        message: "奇跡の復活を遂げた諸葛亮の采配に、魏軍は壊滅。長安への道が開かれた。歴史の歯車が今、逆転する！",
        choices: [
          {
            text: "勝利の凱旋（ホームへ）",
            nextPhase: "end_victory",
            impact: {},
            log: "秋風は、蜀漢の旗を高く掲げた。"
          }
        ]
      },
      defeat: {
        message: "巨星、五丈原に墜つ。蜀軍は悲しみを胸に、姜維に導かれ漢中へと退いた……。",
        choices: [
          {
            text: "撤退する（ホームへ）",
            nextPhase: "end_defeat",
            impact: {},
            log: "秋風五丈原……一つの時代が終わった。"
          }
        ]
      }
    },
    cutIn: {
      text: "「死せる孔明、生ける仲達を走らす！」",
      author: "— 蜀漢丞相・諸葛亮孔明",
      color: "bg-indigo-900/90" // 神秘的な夜のイメージ
    }
  }
};