"use client";

import {
  ColorContrastLevel,
  calculateColorContrast,
} from "@/app/_features/color/contrast";
import {
  TailwindColorGrade,
  TailwindColors,
  TailwindGradedColorName,
  TailwindSingleColorName,
  getTailwindColors,
} from "@/app/_features/color/tailwind";
import { useTailwindColorQuery } from "@/app/_features/color/useTailwindColorQuery";
import Link from "next/link";

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
  const { createColorHref, currentColor } =
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

  return (
    <Link
      href={createColorHref(color)}
      scroll={false}
      className={[
        "grid gap-y-3 p-2 hover:shadow-[inset_0_0_0_2px_theme(colors.gray[900])] focus-visible:shadow-[inset_0_0_0_2px_theme(colors.gray[900])] focus-visible:outline-none  dark:hover:shadow-[inset_0_0_0_2px_theme(colors.gray[200])] dark:focus-visible:shadow-[inset_0_0_0_2px_theme(colors.gray[200])]",
        isCurrent
          ? "shadow-[inset_0_0_0_2px_theme(colors.gray[900])] dark:shadow-[inset_0_0_0_2px_theme(colors.gray[200])]"
          : "shadow-none",
      ].join(" ")}
    >
      <div
        className="grid h-10 w-20 place-content-center rounded-md border border-gray-100 text-xs/none dark:border-gray-800  "
        style={{
          backgroundColor: color.value,
          color:
            currentColor.type === "notFound"
              ? undefined
              : currentColor.color.value,
        }}
      >
        {currentColor.type !== "notFound" && "テキスト"}
      </div>
      <p className=" text-sm/none ">{color.value}</p>

      {contrastResult && (
        <div className=" grid grid-cols-[auto_1fr] items-center gap-x-1">
          <p
            className={[
              "rounded-md p-1 text-xs/none ",
              getLevelClassNames(contrastResult.level),
            ].join(" ")}
          >
            {contrastResult.level}
          </p>
          <p className="text-sm/none">{contrastResult.ratio}</p>
        </div>
      )}
    </Link>
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
