import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Logo } from "./components/Logo";
import "./globals.css";

import "../i18n";
import { t } from "i18next";
import { LanguageSwitcher } from "./features/color/LanguageSwitcher";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white font-mono text-gray-900 dark:bg-gray-950 dark:text-gray-200">
      <header className="grid grid-cols-[minmax(1rem,1fr)_minmax(0,80rem)_minmax(1rem,1fr)] border-b border-gray-200 py-4 dark:border-gray-700">
        <div className="flex flex-wrap items-center justify-between gap-4 [grid-column:2]">
          <Logo />
          <div className="flex flex-wrap items-center gap-4">
            <p>
              <Link to="/reference" className="underline underline-offset-2">
                {t("Reference")}
              </Link>
            </p>
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main className="grid grid-cols-[minmax(1rem,1fr)_minmax(0,80rem)_minmax(1rem,1fr)] py-8">
        <div className="[grid-column:2]">
          <Outlet />
        </div>
      </main>
      <footer className="mt-auto grid grid-cols-[minmax(1rem,1fr)_minmax(0,80rem)_minmax(1rem,1fr)] border-t border-gray-200 py-4 dark:border-gray-700">
        <p className="grid justify-center [grid-column:2]">
          <a href="https://github.com/crow-fox">
            <small className="text-sm">&copy; crow-fox</small>
          </a>
        </p>
      </footer>
    </div>
  );
}

export function HydrateFallback() {
  return (
    <div className="grid h-svh place-content-center">
      <p className="font-mono text-2xl">Loading...</p>
    </div>
  );
}
