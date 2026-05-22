# Sutra Lock

**読むことで、開く。**

スマホを開く前に、一度だけ立ち止まるための読誦タイマー。

## What is this?

Sutra Lock は、スマホを使う前に般若心経の冒頭を読み、15 秒の待機時間を経てから使用を開始するセルフコントロール Web アプリです。

- ブラウザ上でスマホ全体をロックするものではありません
- 自分の意思で「一度立ち止まる」ための UI です
- 音声認識は使用しません

## How it works

1. アプリを開くと般若心経の冒頭（ふりがな付き）が表示される
2. 「読み始める」ボタンを押すと 15 秒のカウントダウンが始まる
3. カウントダウン中にお経を読む（声に出しても、心の中でも可）
4. 15 秒後に「読了する」ボタンが有効になる
5. ボタンを押すと完了画面が表示され、今日の読誦回数が記録される

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Noto Serif JP (sutra text)
- **State**: localStorage
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
