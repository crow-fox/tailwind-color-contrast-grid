import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tailwind Color Contrast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="font-sans grid grid-rows-[auto_1fr_auto] min-h-svh text-zinc-800">
        <header className=" p-4 border-b border-b-zinc-300">
          <p>
            <Link href="/">Tailwind Color Contrast</Link>
          </p>
        </header>
        <main className=" py-8 px-4">{children}</main>
        <footer className="px-4 py-2 border-t border-t-zinc-300">
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
