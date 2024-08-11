import {
  TailwindColorGrade,
  TailwindGradedColorName,
  TailwindSingleColorName,
  findTailwindColor,
} from "./tailwind.client";
import { TailwindColors } from "./tailwind";
import { useURLQueryParams } from "../../utils/useURLQueryParams";

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

  function resetCurrentColor(
    options: { preventScrollReset: boolean } = { preventScrollReset: false },
  ) {
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
        preventScrollReset: true,
      },
    );
  }

  return {
    selectColor,
    currentColor,
    resetCurrentColor,
  } as const;
}
