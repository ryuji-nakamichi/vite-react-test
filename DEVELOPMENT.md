# 開発記録と技術仕様 (Development Log)

本ドキュメントは、プロジェクトの設計仕様、デバッグ手法、および開発の軌跡を記録するものである。

---

## ◼︎ アプリケーション仕様・設計

### 1. クイズ機能 (Quiz System)
- **難易度設定**: 初級・中級・上級の3段階。
- **出題形式**: `dic.js` から難易度に応じた問題を抽出。
- **状態管理**: `useState` を用いて、現在の問題番号、正答数、クイズ進行ステータスを管理。
- **UX**: 全問回答後にスコアを表示。リトライ機能および難易度選択画面への遷移を実装。

### 2. 武将図鑑と支援者限定演出 (Character Encyclopedia)
- **基本データ**: 魏・呉・蜀 各5名（計15名）の史実および演義データを保持。
- **Web Monetization 連携**:
    - ブラウザからの支払いイベント（`monetizationstart`）を検知し、`isMonetized` フラグを `true` に更新。
    - 支援状態でのみ「軍略秘録」セクションを表示。
- **デコード演出 (`DecodingText`)**:
    - 支援者限定データ（現代役職・裏人物評）を、シャッフルアルゴリズムを用いたアニメーションで表示。
    - CSS走査線エフェクトによる「機密データ解析」の世界観を構築。

---

## 🛠 Web Monetization デバッグ手法

拡張機能による実際の支払いを待たずに、UIやロジックのテストを行うためのモックコード。

### 強制支援状態発動スクリプト (Console用)
ブラウザのデベロッパーツール（Console）に貼り付けて実行することで、支援開始イベントをシミュレートする。

```javascript
// 1. オブジェクトの存在確認と作成
if (!document.monetization) {
    document.monetization = document.createElement('div');
    document.monetization.state = 'pending';
}

// 2. 状態を「支援開始」に変更
document.monetization.state = 'started';

// 3. React側が監視しているイベントを強制発火
const startEvent = new CustomEvent('monetizationstart');
document.monetization.dispatchEvent(startEvent);

console.log('🚀 [SYSTEM] Web Monetization Mock Event: STARTED');
```


---

### ステップ2：後半をコピーして、ステップ1の直後に貼り付け
（開発タイムラインから環境構築メモの最後までです）

```markdown

---

## ⏳ 開発タイムライン (Changelog)

### 2025-11-01 〜 2025-11-03
- **プロジェクト発足**: React + Vite + Tailwind CSS の基本構成を構築。
- **クイズエンジン**: 難易度選択と問題遷移の基本ロジックを実装。

### 2026-01-03 〜 2026-01-04
- **PWA & Deploy**: PWA化（オフライン対応）の完了。
- **GitHub Pages**: `gh-pages` を利用した自動デプロイ環境の構築。

### 2026-01-07 〜 2026-01-10
- **収益化基盤**: GateHub口座開設、KYC（本人確認）の完了。
- **Payment Pointer**: `$ilp.gatehub.net/984080110/eur` を取得し、アプリへ結合。

### 2026-01-11 (Current)
- **演出の極致**: `DecodingText` コンポーネントによる「軍略秘録」の解析演出を実装。
- **データ拡充**: 主要武将15名の「IT業界版パラレル設定（裏・人物評）」を完筆。
- **ドキュメント整理**: リファクタリングを完了。

---

## 💡 今後の課題

- [ ] **支援者へのサンクスメッセージ機能**: 支援中のみ表示される感謝の通知演出。
- [ ] **諸葛亮の助言（ヒント）**: クイズ画面における回答補助ロジックの実装。
- [ ] **黄金モード（UIテーマチェンジ）**: 支援中限定のプレミアムな背景演出。

---

## 📋 付録：環境構築メモ (Environment Setup)

### 1. Node.js 環境の構築 (nvm)

- **nvm インストール**:
  ```bash
  $ brew install nvm
  $ mkdir ~/.nvm
  ```


- Xcode ライセンス同意:
`$ sudo xcodebuild -license accept`

- パス設定: `~/.zshrc` の末尾に追記。

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"
```

- Node.js インストール:
`$ nvm install --lts`


### 2. プロジェクト初期化と Vite 導入
- Vite プロジェクト作成:
`$ npm create vite@6.2.1 .`

- パッケージインストール:
`$ npm install`

### 3. 主要パッケージの追加
- ルーティング: `$ npm install react-router-dom`
- スタイリング: `$ npm install -D tailwindcss postcss autoprefixer`
- PWA対応: `$ npm add -D vite-plugin-pwa`
- デプロイツール: `$ npm install -D gh-pages`

### 4. ESLint カスタム設定
`eslint.config.js` の `rules` を以下のように調整。
- `no-unused-vars: "error"`
- `react/prop-types: "off"`