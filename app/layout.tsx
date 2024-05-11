import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import { Logo } from "@/app/_components/Logo";
import { ThemeSelect } from "@/app/_components/ThemeSelect";

export const metadata: Metadata = {
  title: {
    template: "%s | Tailwind Color Contrast Grid",
    default: "Tailwind Color Contrast Grid",
  },
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
          <div className=" flex min-h-svh flex-col bg-white font-mono text-gray-900 dark:bg-gray-950 dark:text-gray-200">
            <header className=" grid grid-cols-[minmax(1rem,1fr)_minmax(0,80rem)_minmax(1rem,1fr)] border-b border-gray-200 py-4  dark:border-gray-700">
              <div className="flex flex-wrap items-center justify-between gap-4 [grid-column:2]">
                <Logo>
                  <Link href="/" className="text-lg font-bold">
                    Tailwind Color Contrast Grid
                  </Link>
                </Logo>
                <div className=" flex flex-wrap items-center gap-4">
                  <p>
                    <Link
                      href="/reference"
                      className="underline underline-offset-2"
                    >
                      参考サイト
                    </Link>
                  </p>
                  <ThemeSelect />
                </div>
              </div>
            </header>
            <main className="grid grid-cols-[minmax(1rem,1fr)_minmax(0,80rem)_minmax(1rem,1fr)] py-8 ">
              <div className=" [grid-column:2]">{children}</div>
            </main>
            <footer className="mt-auto grid grid-cols-[minmax(1rem,1fr)_minmax(0,80rem)_minmax(1rem,1fr)] py-4">
              <p className="grid justify-center [grid-column:2]">
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
