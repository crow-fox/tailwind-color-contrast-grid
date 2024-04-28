import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeSelect } from "@/app/_features/darkmode/ThemeSelect";

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
            <header className=" grid justify-end px-4 pt-4">
              <ThemeSelect />
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
