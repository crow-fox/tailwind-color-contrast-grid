import {
  TailwindColorGrade,
  TailwindGradedColorName,
  TailwindSingleColorName,
  findTailwindColor,
} from "@/app/_features/color/tailwind.client";
import { TailwindColors } from "@/app/_features/color/tailwind.server";
import { useURLQueryParams } from "@/app/_utils/useURLQueryParams";

export function useTailwindColorQuery(tailwindColors: TailwindColors) {
  const { getQueryValue, deleteQueries, updateQueries } = useURLQueryParams<
    "colorname" | "colorgrade"
  >();

  const colorName = getQueryValue("colorname") ?? "";
  const colorGrade = getQueryValue("colorgrade") ?? "";

  const currentColor = findTailwindColor(
    {
      name: colorName,
      grade: colorGrade,
    },
    tailwindColors,
  );

  function resetCurrentColor(options: { scroll: boolean } = { scroll: true }) {
    deleteQueries(["colorname", "colorgrade"], options);
  }

  function selectColor(
    color:
      | {
          name: TailwindGradedColorName;
          grade: TailwindColorGrade;
        }
      | { name: TailwindSingleColorName },
  ) {
    updateQueries(
      {
        colorname: color.name,
        colorgrade: "grade" in color ? color.grade : undefined,
      },
      {
        scroll: false,
      },
    );
  }

  return {
    selectColor,
    currentColor,
    resetCurrentColor,
  } as const;
}
