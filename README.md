# WordWise

WordWise は、OpenAI API を使用して英語学習をサポートする Web アプリケーションです。自分が知らない単語を入力し、例文とその翻訳を表示し、データベースに保存できます。

## 機能

- OpenAI API を使用して、入力された単語を用いた英語の例文とその翻訳を表示
- 日本語翻訳文の表示/非表示
- 入力した単語と例文のセットをデータベースに保存
- データベースに登録された情報を表示

## セットアップ

1. このリポジトリをクローンします。

\`\`\`
git clone https://github.com/YOUR_USERNAME/wordwise.git
\`\`\`

2. ディレクトリに移動します。

\`\`\`
cd wordwise
\`\`\`

3. npm パッケージをインストールします。

\`\`\`
npm install
\`\`\`

4. 環境変数を設定します。`.env.local`ファイルをプロジェクトのルートディレクトリに作成し、以下の内容を記述します。

\`\`\`
NEXT_PUBLIC_OPENAI_API_KEY=あなたの OpenAI_API キー
FIREBASE_API_KEY=あなたの Firebase_API キー
FIREBASE_AUTH_DOMAIN=あなたの Firebase_AuthDomain
FIREBASE_PROJECT_ID=あなたの Firebase_ProjectID
FIREBASE_STORAGE_BUCKET=あなたの Firebase_StorageBucket
FIREBASE_MESSAGING_SENDER_ID=あなたの Firebase_MessagingSenderId
FIREBASE_APP_ID=あなたの Firebase_AppID
\`\`\`

5. 開発サーバーを起動します。

\`\`\`
npm run dev
\`\`\`

アプリケーションは`http://localhost:3000`でアクセスできるようになります。

---
