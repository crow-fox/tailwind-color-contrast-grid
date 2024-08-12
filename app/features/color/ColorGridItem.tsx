import { ColorContrastLevel, calculateColorContrast } from "./contrast";
import {
  TailwindColorGrade,
  TailwindGradedColorName,
  TailwindSingleColorName,
} from "./tailwind.client";
import { TailwindColors } from "./tailwind";

import { useTailwindColorQuery } from "./useTailwindColorQuery";
import { useClipboardCopy } from "../../utils/useClipboardCopy";
import { useCallback } from "react";

type Props = {
  color:
    | {
        name: TailwindGradedColorName;
        grade: TailwindColorGrade;
        value: string;
      }
    | {
        name: TailwindSingleColorName;
        value: string;
      };
  tailwindColors: TailwindColors;
};

export function ColorGridItem({ color, tailwindColors }: Props) {
  const { currentColor, selectColor, resetCurrentColor } =
    useTailwindColorQuery(tailwindColors);

  const contrastResult =
    currentColor.type === "notFound"
      ? undefined
      : calculateColorContrast(currentColor.color.value, color.value);

  // 同じカラーコードの異なる色名があるため、色名も比較する
  const isCurrent =
    currentColor.type !== "notFound" &&
    currentColor.color.name === color.name &&
    currentColor.color.value === color.value;

  const { isCopied, clipboardCopy } = useClipboardCopy();

  const handleCopy = useCallback(async () => {
    await clipboardCopy(color.value);
  }, [color.value, clipboardCopy]);

  const handleClickColor = () => {
    if (isCurrent) {
      resetCurrentColor({ preventScrollReset: false });
    } else {
      selectColor(color);
    }
  };

  return (
    <div className="relative grid gap-y-2 p-2">
      <div
        aria-hidden="true"
        className="grid h-10 w-full min-w-20 place-content-center rounded-md border border-gray-100 text-xs/none dark:border-gray-800"
        style={{
          backgroundColor: color.value,
          color:
            currentColor.type === "notFound"
              ? undefined
              : currentColor.color.value,
        }}
      >
        {currentColor.type !== "notFound" && "Text"}
      </div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-1 text-sm/none">
        <button
          onClick={handleClickColor}
          className={[
            "text-sm/none after:absolute after:inset-0 after:block focus-visible:outline-none",
            "after:focus-visible:shadow-[inset_0_0_0_3px_theme(colors.gray[900])] after:hover:shadow-[inset_0_0_0_3px_theme(colors.gray[900])] after:dark:focus-visible:shadow-[inset_0_0_0_3px_theme(colors.gray[200])] after:dark:hover:shadow-[inset_0_0_0_3px_theme(colors.gray[200])]",
            isCurrent
              ? "after:shadow-[inset_0_0_0_3px_theme(colors.gray[900])] after:dark:shadow-[inset_0_0_0_3px_theme(colors.gray[200])]"
              : "after:shadow-none",
          ].join(" ")}
        >
          {color.value}
        </button>
        <button
          onClick={handleCopy}
          className="isolate inline-grid size-6 place-content-center rounded-lg border border-gray-900 bg-white text-sm/none dark:border-gray-200 dark:bg-gray-950"
        >
          {isCopied ? (
            <svg
              role="img"
              aria-label="Copied"
              height="1em"
              viewBox="0 -960 960 960"
              width="1em"
              className="fill-current"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          ) : (
            <svg
              role="img"
              aria-label="Color code copy"
              height="1em"
              viewBox="0 -960 960 960"
              width="1em"
              className="fill-current"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>
          )}
        </button>
      </div>
      {contrastResult && (
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-1">
          <p
            className={[
              "rounded-md p-1 text-xs/none",
              getLevelClassNames(contrastResult.level),
            ].join(" ")}
          >
            {contrastResult.level}
          </p>
          <p className="text-sm/none">{contrastResult.ratio}</p>
        </div>
      )}
    </div>
  );
}

function getLevelClassNames(level: ColorContrastLevel) {
  switch (level) {
    case "AAA":
      return "bg-violet-600 text-white";
    case "AA":
      return "bg-violet-200 text-black";
    case "AA18":
      return "bg-amber-200 text-black";
    case "DNP":
      return "bg-rose-600 text-white";
  }
}
