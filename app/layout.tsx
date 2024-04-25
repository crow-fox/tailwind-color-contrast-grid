import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tailwind Color Contrast Grid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="grid min-h-svh grid-rows-[auto_1fr_auto] font-mono text-zinc-800">
        <header className=" border-b border-b-zinc-300 p-4">
          <p>
            <Link href="/">Tailwind Color Contrast Grid</Link>
          </p>
        </header>
        <main className=" px-4 py-8">{children}</main>
        <footer className="border-t border-t-zinc-300 px-4 py-2">
          <p className="grid justify-center">
            <a href="https://github.com/crow-fox">
              <small className="text-sm">&copy; crow-fox</small>
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
