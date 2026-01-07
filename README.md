# Reactを使用して開発を学習する

## viteの準備 初回の準備

1:20:42

### `brew`コマンドでnode.jsのバージョン管理用のパッケージ`nvm`をインストールする

1. 下記を実行。
`$ brew install nvm`

2. もし、下記のようなエラーが表示されたら、下記の`sudo`コマンドでライセンスの同意する。
`$ sudo xcodebuild -license accept`

↓表示されるエラー
```bash
Error: You have not agreed to the Xcode license. Please resolve this by running:
  sudo xcodebuild -license accept
```

↓調べた結果
```bash
ターミナルで
sudo xcodebuild -license コマンドを実行し、Xcodeのライセンスに同意することでこのエラーは解決できます。
```

なので、上記のコマンドを実行する。そして続きを実行していく。


3. `nvm`用のディレクトリを作成する。
`$ mkdir ~/.nvm`


4. `nvm`のファイルの場所を指示するための処理を追加する。

下記のコードをコピーする。
```bash
export NVM_DIR="$HOME/.nvm"
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
```

`$ open ~/.zshrc`を実行すると、テキストエディットが開くので、ファイルの末尾に貼り付ける。

5. `nvm`バージョンを確認する

- `$ nvm -v`を実行してnvmのバージョンが表示されるかを確認する。
確認できなければ、一旦そのターミナルを終了させて再起動して確認し直す。

- `0.40.3`のようにバージョンが表示されるはず。

6. `nvm`コマンドで`node.js`をインストールする。

- `$ nvm install --lts`を実行してインストールする。

- `$ node -v`を実行して最新のnode.jsバージョンがインストールされているかを確認する。

- `$ npm -v`も実行してnpmのバージョンが表示されるかも確認しておく。


### Viteの導入

1. Viteコマンドをプロジェクトディレクトリにて実行する。
- `https://ja.vite.dev/`にアクセスする。
- `はじめる`ボタンを押す。
- `$ npm create vite@latest`のコマンドが掲載されているので、コピーする。
- `$ npm create vite@6.2.1`に変更して、ターミナルで実行する。
- 対話式でセットアップの質問が来るので、`y`、`.`、`React`、`JavaScript`を選択してEnterキーを押す。

2. 実行環境のセットアップ

- 下記のコマンドを順番に実行すると、ローカルサーバーが起動する。
  - `$ npm install`
  - `$ npm run dev`

- ローカルサーバーが起動するのでアクセスする。
  - `http://localhost:5173/` 

- 開発を停止する場合は`$ Ctrl + c`を実行する。

### ESLintを設定

- プロジェクトディレクトリ直下にある`eslint.config.js`を開く。
- 下記のように追記する。
  ```js
  rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-unused": "error", // 追記
      "no-unused-vars": "error", // 追記
      "react/prop-types": "off", // 追記
    },
  ```

### React Routerの導入

- 以下コマンドを実行して`React Router`をインストール。
`$ npm install react-router-dom`

### Tailwind CSS のインストール

`npm install -D tailwindcss postcss autoprefixer`

## ２回目以降の準備

- `$ npm run dev`を実行する。
- ローカルサーバーが起動するのでアクセスする。
  - `http://localhost:5173/` 
  - 開発を停止する場合は`$ Ctrl + c`を実行する。

## 仕様

- クイズ
  - トップ/メニュー画面,アプリの入り口。クイズの種類を選択。
    - 「初級」「中級」「上級」などの難易度選択ボタンを設置。ルーティング設定。
  - クイズ開始画面,クイズの出題と回答。・問題文と選択肢（4択など）の表示
  - 結果画面,クイズの正誤と成績を表示。・正答数、正答率、かかった時間の表示
  - 武将図鑑/解説画面 (オプション)クイズで出た武将の詳細情報を表示。・武将の基本情報（字、勢力、能力値など）


### 詳細設計

#### ◼︎ホーム画面

- クイズボタン
  - 選択すると、クイズ難易度選択画面に移動。
- XXXボタン（アップデート）

##### ▼クイズ難易度画面

- 以下ボタンを配置、選択すると、難易度別のクイズ開始画面に遷移。
  - 初級
  - 中級
  - 上級

##### ▼クイズ画面

- 実際にクイズが表示される。ユーザーはどの選択肢が正解かを選択してボタンを押す。
- クイズ数は5問。全問解答後、結果画面に遷移する。
- 第一問を回答すると、第二問に遷移して、第五問まで表示される。第五問を回答すると、クイズ結果表示画面に遷移される。


##### ▼クイズ結果表示画面

- 全問解答後、結果発表を表示する。
- 「全5問中、⚫︎問正解。⚫︎⚫︎点でした。」と表示させる。
- クイズ難易度選択画面に戻るボタンを設置する。


## 開発記録

### 2025-11-01

- 現在、ホーム画面からクイズの難易度選択画面を設置。問題文ページに遷移することに成功。
- 次は、クイズの問題を別データで予め定義しておいてそれを呼び出して、表示させることを対応する。添字は決め打ちで表示させる。後で動的に設定する。
- 取り敢えず、配列の0番目のクイズを表示できた。次は、添字部分を動的にする。
- 先ずは、クリックされた選択肢のインデックス番号を取得することができた。

### 2025-11-03

- そろそろCSSのフレームワークを導入する。

### 2026-01-03

- PWA化
  1. `$ npm add -D vite-plugin-pwa`
  2. `vite.config.js`の設定。
  3. アイコンの配置を確認

- 動作確認
  1. `$ npm run build`
  2. `$ npm run preview`
  3. ブラウザ経由でインストールできるか確認。インストールする。
  4. 専用ウィンドウで開かれるので、開いて、開発ツールを開いて、Net WorkタブでThrottlingからOfflineを選択して、オフラインでも動作するかを確認する。

- デプロイ


### 2026-01-04

#### デプロイする
- `GitHub Pages`を使ってデプロイする
  1. Build:  Reactのコードを、ブラウザが理解できる形式（HTML/CSS）に変換して`dist`フォルダにまとめる。
  1. Upload: `dist`フォルダの中身だけを`GitHub`の`gh-oages`という専用ブランチに自動でアップロードする。
  1. `Publish`: `GitHub`がそのファイルを読み込み、世界中に公開する。

#### 設定の最終チェック
- 公開を成功させるために、以下の三箇所をセットで修正・確認する。

1. `package.json`の修正
  - `homepage`フィールドと`scripts`を追加する。*`homepage`は、GitHubで自分のURLに合わせる。

2. `vite.config.js`の確認
  - 先日設定した`base`が、URLの末尾（サブディレクトリ）と一致しているか再確認する。

3. 公開コマンドの実行
- 以下のコマンドを実行する。

`$ npm run deploy`

#### エラー解決

1. `gh-pages`をインストールする
`$ npm install -D gh-pages`

2. 再度デプロイを実行する

- 以下で再度デプロイする
`$ npm run deploy`


### 2026-01-07

#### 支援者専用コンテンツ

##### 開発ツールから動作確認する方法

- 動作確認するには以下のjsコードを張り付けることで直ぐにテストができる。

```js
// Web Monetizationの開始イベントを擬似的に発生させる
if (document.monetization) {
  document.monetization.state = 'started';
  document.monetization.dispatchEvent(new CustomEvent('monetizationstart'));
  console.log('✅ Monetization Mock Event Sent!');
} else {
  console.error('❌ metaタグがないか、ブラウザが未対応です');
}
```

**Chromeの開発ツールで、デバッグコードが貼り付けられないことへの対策。**
[https://qiita.com/flano_yuki/items/adc778aa8bcede2c10e9](https://qiita.com/flano_yuki/items/adc778aa8bcede2c10e9)


`metaタグがないか、ブラウザが未対応です`と表示される場合は以下のコードをコンソールに貼り付けて実行することで、強制的に支援状態にできる。

```js
// 1. 存在しない document.monetization オブジェクトを無理やり作成する
if (!document.monetization) {
    document.monetization = document.createElement('div'); // イベントを扱えるようにする
    document.monetization.state = 'pending';
}

// 2. 状態を「開始」に変更し、Reactが監視しているイベントを発生させる
document.monetization.state = 'started';
const startEvent = new CustomEvent('monetizationstart');
document.monetization.dispatchEvent(startEvent);

console.log('🚀 [Mock] 支援開始イベントを強制送信しました！');
```


##### 本物の拡張機能を使う場合