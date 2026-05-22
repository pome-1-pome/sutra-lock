import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sutra Lock",
  description: "スマホ依存対策 - 誓約文を音読してロック解除",
};

const NAV_ITEMS = [
  { href: "/", label: "ホーム" },
  { href: "/chant", label: "音読" },
  { href: "/history", label: "履歴" },
  { href: "/settings", label: "設定" },
] as const;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <main className="flex-1 flex flex-col w-full max-w-lg mx-auto pb-16">
          {children}
        </main>

        <nav className="fixed bottom-0 inset-x-0 border-t border-zinc-200 bg-white/90 backdrop-blur-sm">
          <div className="mx-auto flex max-w-lg">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-1 flex-col items-center py-2 text-xs text-zinc-600 active:text-zinc-900"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </body>
    </html>
  );
}
