# 開発記録と技術仕様 (Development Log)

本ドキュメントは、プロジェクトの設計仕様、デバッグ手法、および開発の軌跡を記録するものである。

---

## ◼︎ アプリケーション仕様・設計

### 1. クイズ機能 (Quiz System)
- **難易度設定**: 初級・中級・上級の3段階。
- **諸葛亮の助言 (Hint System)**: 
    - 4択のうち不正解の2つを消去する「50:50」機能を実装。
    - ゲーム中1回のみ使用可能。`hiddenChoices` ステートで制御。
- **状態管理**: `useState` を用いて、現在の問題番号、正答数、クイズ進行、ヒント使用状況を管理。

### 2. 武将図鑑と演出 (Encyclopedia & Visuals)
- **Web Monetization 連携**:
    - 支援開始を検知し `ThankYouToast` を表示。
    - `isMonetized` フラグにより、アプリ全体を「黄金モード（琥珀色の動的グラデーション背景）」へ切り替え。
- **デコード演出 (`DecodingText`)**:
    - 支援者限定データ表示時にシャッフルアニメーションを実行。
    - **安定化処理**: デコード中のみ `font-mono`（等幅フォント）を適用し、文字幅の変化による画面の揺れを抑制。
- **レスポンシブ設計**:
    - `max-w-6xl` のワイドレイアウト採用。
    - スマホ表示時、左右余白を最小化（`px-0`）し、コンテンツ領域を最大化。
    - `overflow-x-hidden` により、詳細画面での不要な横揺れを防止。

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

### 2026-01-11
- **演出の極致**: `DecodingText` コンポーネントによる「軍略秘録」の解析演出を実装。
- **データ拡充**: 主要武将15名の「IT業界版パラレル設定（裏・人物評）」を完筆。
- **ドキュメント整理**: リファクタリングを完了。

### 2026-01-12 (Current)

- UI/UX 革命: 支援状態に連動する「黄金モード」背景の実装。
- 機能拡張: クイズに「諸葛亮の助言（ヒント）」機能を追加。
- SP最適化:
  - 武将詳細画面の横スクロールを解消。
  - DecodingText の揺れを等幅フォントで修正。
  - 全体の幅を max-w-6xl に拡張。
- フィードバック: 支援開始時の「感謝トースト」コンポーネントを実装。

---

## 💡 今後の課題

- [ ] **支援者特典の更なる強化**: 黄金モード時、クイズのヒントを2回使えるように調整。
- [ ] **SE/BGMの実装**: 助言使用時の「扇の音」や、デコード中のシステム音。
- [ ] **クリアランク機能**: スコアに応じた称号（平民〜皇帝）の表示。

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