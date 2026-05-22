# Sutra Lock

スマホ使用前の儀式型セルフロックアプリ。

## What is this?

Sutra Lock は、スマホを使う前に短いお経を唱える「儀式」を行うことで、無意識のスマホ使用を防ぐ Web アプリです。

**注意**: このアプリはブラウザ上でスマホ全体をロックするものではありません。自己制御のための儀式 UI を提供するものです。音声認識は使用しません。

## How it works

1. アプリを開くとお経カード（般若心経ミニ版）が表示される
2. 「唱える開始」ボタンを押すと 15 秒のカウントダウンが始まる
3. カウントダウン中に声に出す、または心の中でお経を唱える
4. 15 秒後に「唱え終わった」ボタンが有効になる
5. ボタンを押すと「解放されました」と表示され、今日の儀式回数が記録される

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: localStorage (daily ritual count)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm start
```

## Deploy

Push to `main` branch. Vercel auto-deploys on every push.

## License

MIT
