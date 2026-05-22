import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Sutra Lock — 読むことで、開く。",
  description:
    "スマホを開く前に、一度だけ立ち止まるための読誦タイマー。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <main className="flex-1 flex flex-col w-full max-w-[720px] mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
