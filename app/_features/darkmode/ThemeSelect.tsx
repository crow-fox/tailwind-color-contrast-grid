"use client";

import { useTheme } from "next-themes";
import { useId } from "react";

export function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const uid = useId();

  return (
    <p>
      <label htmlFor={uid} className="sr-only">
        カラーテーマを選択
      </label>
      <span className="grid items-center ">
        <select
          id={uid}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="inline-grid appearance-none rounded-lg border border-gray-900 bg-white py-2 pl-2 pr-6 text-base/none [grid-area:1/1] dark:border-gray-200 dark:bg-gray-950 "
        >
          <option value="system">System</option>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
        <svg
          aria-hidden="true"
          height="24"
          viewBox="0 -960 960 960"
          width="24"
          className=" pointer-events-none mr-1 size-5 justify-self-end fill-current [grid-area:1/1]"
        >
          <path d="M480-360 280-560h400L480-360Z" />
        </svg>
      </span>
    </p>
  );
}
