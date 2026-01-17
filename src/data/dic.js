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
    supporterData: {
      modernRole: "スタートアップ企業のCEO",
      hiddenBio: "「城を貸すと返ってこない」という噂が絶えない、資金調達（人材確保）の天才。彼の元に転がり込んだ勢力が数年以内に滅びる確率は驚異の80%超え。",
      specialSkill: "寄生（Lv.MAX）",
      modernMeta: "人徳という名の最強のデバッガー。諸葛亮という神エンジニアを三顧の礼でスカウトしたことが最大の功績。"
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
      },
      "win-fancheng": {
        bio: "樊城にて曹仁を降し、さらに援軍の于禁・龐徳をも撃破。孫権の不穏な動きを察知していた諸葛亮の策により、呂蒙の急襲を逆撃して荊州を死守した。これにより蜀は悲願の『二路からの北伐』を開始することとなる。",
        catch: "軍神の刃、ついに中原を両断す"
      }
    },
    supporterData: {
      modernRole: "テックリード / 守護神",
      hiddenBio: "圧倒的な実装力と義理堅さを誇る。しかし、前職（曹操社）からの引き抜きを「義理」で断るため、ヘッドハンター泣かせとしても有名。プライドが高く、若手エンジニアには厳しい。",
      specialSkill: "スタンドアロン・ヒーロー",
      modernMeta: "コードの品質（武勇）は神レベルだが、README（外交）を読まないため、たまに孤立する。"
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
    supporterData: {
      modernRole: "SRE（サイト信頼性エンジニア）/ 物理担当",
      hiddenBio: "「長坂橋の一喝」は、現代では全トラフィックをコマンド一つで遮断する圧倒的ファイアウォール。酒を飲むと本番環境のDBを物理的に破壊（物理削除）するリスクがあるため、常に監視が必要。",
      specialSkill: "物理サーバー・リブート",
      modernMeta: "声がデカすぎてアラート通知より先に本人の怒号がオフィスに響く。しかし、トラブル復旧速度だけは誰よりも早い。"
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
    firstName: '諸葛',
    lastName: '亮',
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
    supporterData: {
      modernRole: "CTO / チーフ・アーキテクト",
      hiddenBio: "24時間365日稼働を10年以上続け、死の間際に後任（姜維）が困らないよう100年分の保守マニュアルを書き残した伝説のフルスタック。彼のコードは完璧すぎて誰もリファクタリングできない。",
      specialSkill: "オーバークロック・知略",
      modernMeta: "「死せる孔明、生ける仲達を走らす」は、現代では「本人が退職した後も、彼が作った自動化スクリプトが完璧すぎて競合他社が手も足も出ない」状態を指す。"
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
    supporterData: {
      modernRole: "シニア・セキュリティエンジニア",
      hiddenBio: "単騎で炎上案件（長坂坡）に突っ込み、赤ん坊（大事なマスターデータ）を抱えて生還する危機管理の鬼。生涯で一度も致命的なバグ（敗走）を出したことがない稼働率100%の男。",
      specialSkill: "100%稼働保証（SLA）",
      modernMeta: "私欲がなく、深夜の緊急コールにも即座に対応するが、あまりにも無欠すぎて逆に人間味がないと噂される。"
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
    supporterData: {
      modernRole: "2代目CEO / プロジェクトマネージャー",
      hiddenBio: "父と兄が作った巨大なレガシーコード（江東の基盤）を、見事にモダンな組織へとリファクタリングした経営のプロ。決断に迷うとオフィスのデスクを斬る（物理的決断）癖があり、備品代がかさむ。",
      specialSkill: "外交的リファクタリング",
      modernMeta: "「魏」と「蜀」という巨大なシェア争いの間で、絶妙なバランスを保ちながら会社を守り抜く、調整能力の化身。"
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
    supporterData: {
      modernRole: "メガベンチャー創業者兼CEO",
      hiddenBio: "『俺が天下を裏切っても、天下が俺を裏切ることは許さない』を社訓に掲げる超実力主義者。前科があっても技術があれば即採用するが、期待外れだと空の弁当箱（退職届）を送りつける。",
      specialSkill: "強引なM&A（人材吸収）",
      modernMeta: "圧倒的な意思決定スピードと詩的なセンスを併せ持つ。プライベートでは他社のプロジェクトリーダーの妻をスカウトしようとして、たまに炎上する。"
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

// --- 魏（Gi）追加分 ---
const dicGiDataExtra = [
  {
    id: 15,
    firstName: '司馬',
    lastName: '懿',
    nickName: '仲達',
    group: '魏',
    birthYear: 179,
    deathYear: 251,
    homeland: '河内郡',
    details: {
      history: {
        catch: '最後に笑った不倒の権力者',
        description: '諸葛亮の最大の宿敵であり、後の晋の基礎を築いた老獪な政治家。',
        bio: '正史では諸葛亮の北伐を徹底した持久戦で防ぎきりました。内政・軍事ともに隙がなく、政敵を次々と排除して司馬氏の権力を確立させた、忍耐と計算の達人です。'
      },
      romance: {
        catch: '諸葛亮が最も恐れた智将',
        description: '諸葛亮の知略を唯一見抜くことができたライバル。',
        bio: '諸葛亮のライバルとして描かれ、時には翻弄されますが、最終的には「死せる孔明」に走らされつつも勝利を手にします。'
      }
    },
    supporterData: {
      modernRole: "ヘッド・オブ・セキュリティ / 監査役",
      hiddenBio: "競合（諸葛亮）が自滅するまで徹底的に脆弱性を突かず待機する、忍耐のリスク管理者。一度牙を剥くと、社内の全権力を握るクーデター（M&A）を完遂させる冷徹さを持つ。",
      specialSkill: "プロアクティブ・ディフェンス",
      modernMeta: "「死ぬまでが開発期間」を地で行く長期メンテナンスの達人。彼が書いたコードは100年後の晋システムまで稼働し続ける。"
    },
    strength: 65, intelligence: 98, charisma: 85, politics: 95, command: 90, strategy: 95,
    keywords: ['宿敵', '持久戦', '晋の礎', '老獪'],
    skills: ['防衛', '内政', '策略'],
    relatedCharacters: [{ id: 4, name: '諸葛亮', relation: '好敵手' }, { id: 14, name: '曹操', relation: '主君' }]
  },
  {
    id: 16,
    firstName: '張',
    lastName: '遼',
    nickName: '文遠',
    group: '魏',
    birthYear: 165,
    deathYear: 222,
    homeland: '雁門郡',
    details: {
      history: {
        catch: '泣く子も黙る合肥の守護神',
        description: '元は呂布の配下。合肥の戦いではわずか800の兵で10万の軍を震え上がらせた。',
        bio: '武勇と冷静さを兼ね備えた、魏の五将軍の筆頭格。敵対していた関羽とも義によって結ばれるなど、武人としての品格も高く評価されています。'
      },
      romance: {
        catch: '遼来遼来（遼来たる）',
        description: '呉の子供たちが彼の名を聞くだけで泣き止んだという伝説を持つ猛将。',
        bio: '合肥で孫権をあと一歩まで追い詰めた勇姿は、呉のトラウマとして語り継がれています。'
      }
    },
    supporterData: {
      modernRole: "インシデントレスポンス・リード",
      hiddenBio: "大規模なDDoS攻撃（孫権の10万軍）を、わずか800行のスクリプトで完封した伝説の初動対応者。呉の若手エンジニアは彼のアイコンを見るだけで作業を止める（トラウマ）。",
      specialSkill: "ゼロデイ・アタック完封",
      modernMeta: "「遼来来（リョウライライ）」は、Slackに彼がログインした瞬間に全バグが沈静化することを指す。"
    },
    strength: 92, intelligence: 75, charisma: 85, politics: 60, command: 95, strategy: 80,
    keywords: ['合肥の戦い', '勇猛', '五将軍', '義理堅い'],
    skills: ['突撃', '統率', '武勇'],
    relatedCharacters: [{ id: 14, name: '曹操', relation: '主君' }, { id: 8, name: '孫権', relation: '宿敵' }]
  },
  {
    id: 17,
    firstName: '夏侯',
    lastName: '惇',
    nickName: '元譲',
    group: '魏',
    birthYear: 155,
    deathYear: 220, homeland: '沛国',
    details: {
      history: {
        catch: '魏を支え続けた不屈の重鎮',
        description: '曹操の旗揚げから従う最古参。軍事よりは後方の補給や統治で手腕を発揮した。',
        bio: '曹操の親族であり、最も信頼された副官。戦場での負傷で片目を失いながらも、屯田制の導入など、魏のインフラ基盤を支え続けました。'
      },
      romance: {
        catch: '抜矢啖眼（矢を抜き眼を喰らう）',
        description: '左目に刺さった矢を眼球ごと抜き取り、それを飲み込んで戦い続けた豪将。',
        bio: '曹操軍の先鋒として常に最前線に立ち、演義では凄まじい闘志を持つ武闘派として描かれます。'
      }
    },
    supporterData: {
      modernRole: "COO（最高執行責任者）/ インフラ担当",
      hiddenBio: "左目（モニター）が一つ潰れてもデバッグを続ける不屈の男。曹操CEOの無茶な仕様変更を、現場で全て形にする圧倒的なデリバリー能力を持つ。",
      specialSkill: "ハードウェア・リカバリー",
      modernMeta: "彼が管理するサーバー（領土）は、どんな天災が起きてもダウンしない（屯田制によるリソース確保）。"
    },
    strength: 88, intelligence: 70, charisma: 92, politics: 85, command: 90, strategy: 70,
    keywords: ['独眼竜', '最古参', '補給', '信頼'],
    skills: ['統率', '内政', '武勇'],
    relatedCharacters: [{ id: 14, name: '曹操', relation: '親族・右腕' }]
  },
  {
    id: 18,
    firstName: '郭',
    lastName: '嘉',
    nickName: '奉孝',
    group: '魏',
    birthYear: 170,
    deathYear: 207, homeland: '潁川郡',
    details: {
      history: {
        catch: '曹操が最も愛した夭折の天才軍師',
        description: '相手の心理を読み切り、数手先を予言するように的中させた戦略家。',
        bio: '曹操の覇業初期を支えた軍師。赤壁の戦いで敗れた際、曹操が「奉孝さえいればこれほどの敗北はしなかった」と嘆いたほど、その洞察力は鋭いものでした。'
      },
      romance: {
        catch: '十勝十敗の説',
        description: '曹操と袁紹の差を説き、勝利を確信させた知略の持ち主。',
        bio: '若くして世を去りますが、死後も遺計によって敵を破るなど、天才軍師としての伝説を残しました。'
      }
    },
    supporterData: {
      modernRole: "データサイエンティスト / AI予測モデル",
      hiddenBio: "ログ（心理）を数行見ただけで、競合の次の出方を99%の精度で予測する。あまりに高度な計算を行うため、CPU（体調）が常にオーバーヒート気味で、短命なのが難点。",
      specialSkill: "遺言による自動デプロイ",
      modernMeta: "彼が死に際に残したシェルスクリプト（遺計）は、実行するだけで半年後のバグまで修正してしまう。"
    },
    strength: 20, intelligence: 98, charisma: 80, politics: 80, command: 70, strategy: 100,
    keywords: ['天才軍師', '夭折', '予言', '赤壁の嘆き'],
    skills: ['予測', '知略', '分析'],
    relatedCharacters: [{ id: 14, name: '曹操', relation: '寵愛する軍師' }]
  }
];

// --- 呉（Go）追加分 ---
const dicGoDataExtra = [
  {
    id: 9,
    firstName: '周',
    lastName: '瑜',
    nickName: '公瑾',
    group: '呉',
    birthYear: 175,
    deathYear: 210,
    homeland: '廬江郡',
    details: {
      history: {
        catch: '赤壁に燃える美周郎',
        description: '容姿端麗で音楽にも通じた、呉の建国を支えた最高司令官。',
        bio: '正史では、度量が広く寛大な人物として描かれます。赤壁の戦いでは実質的な総指揮を執り、圧倒的な兵力を誇る曹操軍を火計で打ち破った、呉の真の英雄です。'
      },
      romance: {
        catch: '天はこの世に周瑜を生みながら、なぜ諸葛亮をも生んだのか',
        description: '諸葛亮に翻弄される悲劇の天才軍師。',
        bio: '諸葛亮への対抗心からくる策謀が裏目に出る描写が多いですが、それでも曹操軍を焼き払ったその知略は物語随一です。'
      }
    },
    supporterData: {
      modernRole: "クリエイティブディレクター / 共同創業者",
      hiddenBio: "圧倒的なビジュアル（容姿）と、コードの美しさへのこだわり。火攻めという「ゼロデイ脆弱性」を突いた華やかな攻撃を得意とするが、自分よりGitHubのスター数が多いエンジニア（諸葛亮）を見ると、ストレスでサーバーがダウンする。",
      specialSkill: "火攻め（大規模リファクタリング）",
      modernMeta: "UI/UX（風流）への造詣も深く、「周郎、曲を誤れば顧みる（ミスがあればすぐ指摘する）」と言われるほどの完璧主義なコードレビュアー。"
    },
    strength: 78, intelligence: 96, charisma: 98, politics: 85, command: 95, strategy: 95,
    keywords: ['美周郎', '赤壁の勝者', '火計', '音楽'],
    skills: ['水軍統率', '火計', '音楽'],
    relatedCharacters: [{ id: 8, name: '孫権', relation: '主柱' }, { id: 4, name: '諸葛亮', relation: 'ライバル' }]
  },
  {
    id: 10,
    firstName: '陸',
    lastName: '遜',
    nickName: '伯言',
    group: '呉',
    birthYear: 183,
    deathYear: 245, homeland: '呉郡',
    details: {
      history: {
        catch: '蜀の野望を焼き尽くした若き知将',
        description: '夷陵の戦いで劉備の大軍を破った。後に呉の丞相となる。',
        bio: '謙虚で目立たない若手でしたが、関羽を油断させて討ち取り、夷陵では火計で劉備を絶望させました。冷静な判断力と、長期的視点を持った呉の柱石です。'
      },
      romance: {
        catch: '書生に何ができる！と侮らせた策',
        description: '関羽や劉備に「青二才」と侮らせ、その隙を突いて勝利を収めた。',
        bio: '見た目は若々しい書生ですが、その中身は老練な軍略家。石兵八陣に迷い込むなど、諸葛亮には一歩譲る描写もありますが、呉を守り抜いた功績は絶大です。'
      }
    },
    supporterData: {
      modernRole: "フルスタックエンジニア / 現場責任者",
      hiddenBio: "「ただのコーダー」と侮ったベテラン（関羽・劉備）を、完璧なアーキテクチャ設計で完膚なきまでに叩き潰す。夷陵の戦い（レガシーコードの全焼却）という大規模マイグレーションを完遂した実績を持つ。",
      specialSkill: "夷陵のファイアウォール構築",
      modernMeta: "謙虚な態度で要件定義（外交）を進めるが、実装に入ると一切の容赦がない。後にCTO（丞相）にまで上り詰めた努力の天才。"
    },
    strength: 65, intelligence: 95, charisma: 88, politics: 95, command: 92, strategy: 98,
    keywords: ['夷陵の戦い', '火計', '丞相', '謙虚'],
    skills: ['戦術', '忍耐', '内政'],
    relatedCharacters: [{ id: 8, name: '孫権', relation: '主君' }, { id: 1, name: '劉備', relation: '因縁の相手' }]
  },
  {
    id: 11,
    firstName: '呂',
    lastName: '蒙',
    nickName: '子明',
    group: '呉',
    birthYear: 178,
    deathYear: 219, homeland: '汝南郡',
    details: {
      history: {
        catch: '学問によって生まれ変わった努力の猛将',
        description: '「呉下の阿蒙にあらず」。武勇だけの男から、読書で大軍略家へと進化した。',
        bio: '元は無学な武将でしたが、孫権に勧められて猛勉強し、魯粛を驚かせました。周到な準備と変装を用いた奇襲で、無敵の関羽から荊州を奪還した知勇兼備の将です。'
      },
      romance: {
        catch: '関羽を討ち取った執念の将',
        description: '病を装い、関羽を油断させて背後を突く「白衣渡江」を成功させた。',
        bio: '関羽を罠にかけ、その誇りを打ち砕いた人物。関羽の祟りで死ぬという非科学的な最後を描かれますが、その軍略は高く評価されています。'
      }
    },
    supporterData: {
      modernRole: "独学のリードエンジニア（元・体育会系）",
      hiddenBio: "元は「気合と根性」のエンジニアだったが、猛勉強の末にデザインパターンとアルゴリズムを習得。「もう3日前の僕（阿蒙）ではありません」とドヤ顔でプルリクを出すのが日課。",
      specialSkill: "ステルス・デプロイ（白衣渡江）",
      modernMeta: "関羽（ベテラン）が休暇に入った隙を狙って、完璧なリプレイスを完了させる執念の持ち主。リカレント教育（学び直し）の象徴的存在。"
    },
    strength: 82, intelligence: 90, charisma: 85, politics: 82, command: 92, strategy: 95,
    keywords: ['呉下の阿蒙', '荊州奪還', '努力家', '白衣渡江'],
    skills: ['学習能力', '奇襲', '統率'],
    relatedCharacters: [{ id: 8, name: '孫権', relation: '主君' }, { id: 2, name: '関羽', relation: '宿敵' }]
  },
  {
    id: 12,
    firstName: '魯',
    lastName: '粛',
    nickName: '子敬',
    group: '呉',
    birthYear: 172,
    deathYear: 217, homeland: '臨淮郡',
    details: {
      history: {
        catch: '天下二分の計を唱えた大局の士',
        description: '孫権に、曹操に対抗するための壮大な戦略を提示した先見の明を持つ政治家。',
        bio: '演義のお人好しなイメージとは異なり、正史では豪放で決断力に富む人物。諸葛亮に先んじて「天下二分の計」を唱え、呉と蜀の同盟を維持し続けた現実的な戦略家です。'
      },
      romance: {
        catch: '諸葛亮と周瑜の板挟みになる苦労人',
        description: '義理堅く誠実な性格で、蜀と呉の橋渡し役を務めた。',
        bio: '諸葛亮にいいように扱われたり、周瑜に怒られたりと、中間管理職のような苦労人として描かれますが、その誠実さが物語の潤滑油となっています。'
      }
    },
    supporterData: {
      modernRole: "ビジネスデベロップメント / 渉外担当CTO",
      hiddenBio: "諸葛亮（競合）と周瑜（自社）の板挟みになりながら、API連携（孫劉同盟）を維持し続ける調整の天才。非常に気前が良く、困っているエンジニアにサーバーリソースを無償で提供する太っ腹な一面も。",
      specialSkill: "アライアンス・マネジメント",
      modernMeta: "「お人好し」に見えるが、実は会社の将来を20年先まで見据えたロードマップを描いている戦略的アーキテクト。"
    },
    strength: 55, intelligence: 92, charisma: 90, politics: 95, command: 80, strategy: 92,
    keywords: ['同盟', '先見の明', '太っ腹', '仲裁者'],
    skills: ['外交', '内政', '戦略'],
    relatedCharacters: [{ id: 8, name: '孫権', relation: '主柱' }, { id: 4, name: '諸葛亮', relation: '協力者' }]
  }
];

const ALL_DIC_DATA = [
  ...dicSyokuData,
  ...dicGoData,
  ...dicGiData,
  ...dicGiDataExtra,
  ...dicGoDataExtra
];

export default {
  dicSyokuData,
  dicGoData,
  dicGiData,
  dicGiDataExtra,
  dicGoDataExtra,
  ALL_DIC_DATA
};