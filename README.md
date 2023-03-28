# WordWise

OpneAI の API を使う練習と自分用の英語学習サービスを作りたいと思い、せっかくなので GPT-4 にサービス名考案から要件定義・フォルダ構成・コードの内容まで一通り相談しながら作りました。<br>結局コードはかなり書き換えましたが、大枠は GPT-4 産のままです。以下の README の内容も GPT-4 産です。<br>
<br>
…………………………………………………<br>
<br>

WordWise は、OpenAI API を使用して英語学習をサポートする Web アプリケーションです。自分が知らない単語を入力し、例文とその翻訳を表示し、データベースに保存できます。

## 技術スタック

- Next.js
- TypeScript
- Firebase (Firestore)
- Tailwind CSS
- Axios

## 機能

- OpenAI API を使用して、入力された単語を用いた英語の例文とその翻訳を表示
- 日本語翻訳文の表示/非表示
- 入力した単語と例文のセットをデータベースに保存
- データベースに登録された情報を表示

## セットアップ

1. このリポジトリをクローンします。

```
git clone https://github.com/YOUR_USERNAME/wordwise.git
```

2. ディレクトリに移動します。

```
cd wordwise
```

3. npm パッケージをインストールします。

```
npm install
```

4. 環境変数を設定します。`.env.local`ファイルをプロジェクトのルートディレクトリに作成し、以下の内容を記述します。ランダムな文字列は「openssl rand -base64 32」などから生成できます。

```
OPENAI_API_KEY=あなたの OpenAI_API キー
REVALIDATE_TOKEN=ランダムな文字列
NEXT_PUBLIC_FIREBASE_API_KEY=あなたの Firebase_API キー
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=あなたの Firebase_AuthDomain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=あなたの Firebase_ProjectID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=あなたの Firebase_StorageBucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=あなたの Firebase_MessagingSenderId
NEXT_PUBLIC_FIREBASE_APP_ID=あなたの Firebase_AppID
```

5. 開発サーバーを起動します。

```
npm run dev
```

アプリケーションは`http://localhost:3000`でアクセスできるようになります。

---
