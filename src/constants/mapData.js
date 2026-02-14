export const MAJOR_LOCATIONS = {
  CHENGDU: {
    id: "CHENGDU",
    name: "成都",
    x: 100,
    y: 450,
    terrain: "BASIN",
    history: "「蜀の都」。周囲を険しい山々に囲まれた天然の要塞でありつつ、内側には「天府之国」と称される豊かな平野が広がる。ここからの北伐は、常に補給路の確保という絶望的な課題との戦いであった。",
    distances: {
      HANZHONG: 1200, // 剣閣越え
      YILING: 1500,   // 長江下り
    }
  },
  HANZHONG: {
    id: "HANZHONG",
    name: "漢中",
    x: 200,
    y: 300,
    terrain: "MOUNTAIN",
    history: "「蜀の北の門戸」。劉備が曹操を破り「漢中王」を名乗った地。後の北伐では諸葛亮の兵站基地となり、ここを失うことは蜀の滅亡を意味した。",
    distances: {
      CHENGDU: 1200,
      CHANGAN: 500,
    }
  },
  CHANGAN: {
    id: "CHANGAN",
    name: "長安",
    x: 350,
    y: 180,
    terrain: "PLAINS",
    history: "かつての漢の都。北伐における最重要攻略目標。ここを奪還することは、漢王朝の再興という大義名分を果たす象徴的な意味を持っていた。",
    distances: {
      HANZHONG: 500,
      LUOYANG: 800,
    }
  },
  LUOYANG: {
    id: "LUOYANG",
    name: "洛陽",
    x: 550,
    y: 150,
    terrain: "PLAINS",
    history: "後漢の都。董卓による焼き討ちで荒廃したが、後に曹丕が魏の都として再建。中原の中心地であり、天下を制する者が必ず手にする地。",
    distances: {
      CHANGAN: 800,
      JIANYE: 1800,
    }
  },
  JIANYE: {
    id: "JIANYE",
    name: "建業",
    x: 800,
    y: 420,
    terrain: "WATER",
    history: "「呉の都」。長江の天険を背にした南方の要衝。孫権が開発を進め、後に六朝文化の花開く地となる。北方勢力がこの地に攻め入るには、水軍の壁を越えねばならない。",
    distances: {
      LUOYANG: 1800,
      YILING: 1000,
    }
  }
};


export const TERRAIN_MULTIPLIER = {
  PLAINS: 1.0,   // 平地：標準
  BASIN: 1.2,    // 盆地：やや難
  MOUNTAIN: 2.5, // 山岳：激難（蜀の桟道）
  WATER: 0.8     // 水上：船を使えば実は平地より速い（呉の強み！）
};