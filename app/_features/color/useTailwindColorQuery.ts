import {
  TailwindColorGrade,
  TailwindColors,
  TailwindGradedColorName,
  TailwindSingleColorName,
  findTailwindColor,
} from "@/app/_features/color/tailwind";
import { useURLQueryParams } from "@/app/_utils/useURLQueryParams";
import { useCallback, useMemo } from "react";

export function useTailwindColorQuery(tailwindColors: TailwindColors) {
  const { getQueryValue, deleteQueries, updateQueries } = useURLQueryParams<
    "colorname" | "colorgrade"
  >();

  const colorName = getQueryValue("colorname") ?? "";
  const colorGrade = getQueryValue("colorgrade") ?? "";

  const currentColor = useMemo(() => {
    return findTailwindColor(
      {
        name: colorName,
        grade: colorGrade,
      },
      tailwindColors,
    );
  }, [colorName, colorGrade, tailwindColors]);

  const resetCurrentColor = useCallback(
    (options: { scroll: boolean } = { scroll: true }) => {
      deleteQueries(["colorname", "colorgrade"], options);
    },
    [deleteQueries],
  );

  const selectColor = useCallback(
    (
      color:
        | {
            name: TailwindGradedColorName;
            grade: TailwindColorGrade;
          }
        | { name: TailwindSingleColorName },
    ) => {
      return updateQueries(
        {
          colorname: color.name,
          colorgrade: "grade" in color ? color.grade : undefined,
        },
        {
          scroll: false,
        },
      );
    },
    [updateQueries],
  );

  return {
    selectColor,
    currentColor,
    resetCurrentColor,
  } as const;
}
