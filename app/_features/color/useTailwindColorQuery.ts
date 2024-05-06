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
  const { getQueryValue, deleteQueries, updateQueries, createHrefWithQueries } =
    useURLQueryParams<"colorname" | "colorgrade">();

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

  const resetCurrentColor = useCallback(() => {
    deleteQueries(["colorname", "colorgrade"]);
  }, [deleteQueries]);

  const createColorHref = useCallback(
    (
      color:
        | {
            name: TailwindGradedColorName;
            grade: TailwindColorGrade;
          }
        | { name: TailwindSingleColorName },
    ) => {
      if ("grade" in color) {
        return createHrefWithQueries({
          colorname: color.name,
          colorgrade: color.grade,
        });
      }
      return createHrefWithQueries({
        colorname: color.name,
        colorgrade: undefined,
      });
    },
    [createHrefWithQueries],
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
    createColorHref,
  } as const;
}
