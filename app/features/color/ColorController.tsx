import { TailwindColors } from "./tailwind";
import { useTailwindColorQuery } from "./useTailwindColorQuery";

import { useTranslation } from "react-i18next";
type Props = {
  tailwindColors: TailwindColors;
};

export function ColorController({ tailwindColors }: Props) {
  const { currentColor, resetCurrentColor } =
    useTailwindColorQuery(tailwindColors);
  const { t } = useTranslation();
  return (
    <div>
      {currentColor.type === "notFound" ? (
        <p>{t("Please select a color")}</p>
      ) : (
        <p>
          <button
            onClick={() => resetCurrentColor()}
            className="rounded-lg bg-gray-900 px-4 py-2 text-white dark:bg-gray-200 dark:text-gray-950"
          >
            {t("Unselect")}
          </button>
        </p>
      )}
    </div>
  );
}
