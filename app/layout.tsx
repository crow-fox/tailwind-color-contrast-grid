import type { Metadata } from "next";
import "./globals.css";

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
      <body className="grid min-h-svh grid-rows-[1fr_auto] bg-white font-mono text-black">
        <main className="px-4 py-8">{children}</main>
        <footer className="p-4">
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
