// src/data/battles.js

// 1. 各シナリオのインポート
import wuzhangShu from './scenarios/wuzhang_shu.json';
import fanchengShu from './scenarios/fancheng_shu.json';
import yilingShu from './scenarios/yiling_shu.json';
import hefeiWei from './scenarios/hefei_wei.json';
import hanzhongShu from './scenarios/hanzhong_shu.json';
import guanduCao from './scenarios/guandu_cao.json';
import chibiRengo from './scenarios/chibi_rengo.json';

// 2. 統合オブジェクトのエクスポート
export const BATTLES = {
  wuzhang_shu: wuzhangShu,
  fancheng_shu: fanchengShu,
  yiling_shu: yilingShu,
  hefei_wei: hefeiWei,
  hanzhong_shu: hanzhongShu,
  guandu_cao: guanduCao,
  chibi_rengo: chibiRengo
};

// 開発者向けメモ: 
// 今後新しい戦場を追加する際は、JSONファイルを作ってここでimportするだけでOKです。