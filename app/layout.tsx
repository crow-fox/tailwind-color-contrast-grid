import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeSelect } from "@/app/_features/darkmode/ThemeSelect";
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
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="grid min-h-svh grid-rows-[auto_1fr_auto] bg-white font-mono text-gray-900 dark:bg-gray-950 dark:text-gray-200">
            <header className=" grid border-b border-gray-200 p-4 dark:border-gray-700">
              <nav>
                <ul className=" flex flex-wrap items-center gap-4">
                  <li className=" mr-auto">
                    <Link href="/" className="underline underline-offset-2">
                      ホーム
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/reference"
                      className="underline underline-offset-2"
                    >
                      参考サイト
                    </Link>
                  </li>
                  <li>
                    <ThemeSelect />
                  </li>
                </ul>
              </nav>
            </header>
            <main className="px-4 py-8">{children}</main>
            <footer className="p-4">
              <p className="grid justify-center">
                <a href="https://github.com/crow-fox">
                  <small className="text-sm">&copy; crow-fox</small>
                </a>
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
