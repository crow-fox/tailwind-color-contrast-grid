import { changeLanguage } from "i18next";

export function LanguageSwitcher() {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white dark:bg-gray-200 dark:text-gray-950">
      <button onClick={() => changeLanguage("ja")}>日本語</button>
      <button onClick={() => changeLanguage("en")}>English</button>
    </div>
  );
}
