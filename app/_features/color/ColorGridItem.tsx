"use client";

import {
  ColorContrastLevel,
  calculateColorContrast,
} from "@/app/_features/color/contrast";
import {
  TailwindColorGrade,
  TailwindGradedColorName,
  TailwindSingleColorName,
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
};

export function ColorGridItem({ color }: Props) {
  const { createColorHref, currentColor } = useTailwindColorQuery();

  const contrastResult =
    currentColor.type === "notFound"
      ? undefined
      : calculateColorContrast(currentColor.color.value, color.value);

  const isCurrent =
    currentColor.type !== "notFound" &&
    currentColor.color.value === color.value;

  return (
    <Link
      href={createColorHref(color)}
      prefetch={false}
      className={[
        "grid gap-y-2 p-2 hover:shadow-[inset_0_0_0_2px_black] focus-visible:shadow-[inset_0_0_0_2px_black] focus-visible:outline-none",
        isCurrent ? "shadow-[inset_0_0_0_2px_black]" : "shadow-none",
      ].join(" ")}
    >
      <div
        className="grid h-[2.5rem] w-24 place-content-center rounded-md border border-slate-100 text-xs "
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
        <div className="grid grid-cols-[auto,1fr] items-center gap-x-2">
          <p
            className={[
              "rounded-md p-1 text-base/none ",
              getLevelClassNames(contrastResult.level),
            ].join(" ")}
          >
            {contrastResult.level}
          </p>
          <p className="text-base/none">{contrastResult.ratio}</p>
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
