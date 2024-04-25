import {
  TailwindColorGrade,
  TailwindGradedColorName,
  TailwindSingleColorName,
  findTailwindColor,
} from "@/app/_features/color/tailwind";
import { useURLQueryParams } from "@/app/_utils/useURLQueryParams";
import { useMemo } from "react";

export function useTailwindColorQuery() {
  const { getQueryValue, deleteQueries, updateQueries, createHrefWithQueries } =
    useURLQueryParams<"colorname" | "colorgrade">();

  const colorName = getQueryValue("colorname") ?? "";
  const colorGrade = getQueryValue("colorgrade") ?? "";

  const currentColor = useMemo(() => {
    return findTailwindColor({
      name: colorName,
      grade: colorGrade,
    });
  }, [colorName, colorGrade]);

  function resetCurrentColor() {
    deleteQueries(["colorname", "colorgrade"]);
  }

  function createColorHref(
    color:
      | {
          name: TailwindGradedColorName;
          grade: TailwindColorGrade;
        }
      | {
          name: TailwindSingleColorName;
        },
  ) {
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
  }

  function selectColor(
    color:
      | {
          name: TailwindGradedColorName;
          grade: TailwindColorGrade;
        }
      | {
          name: TailwindSingleColorName;
        },
  ) {
    if ("grade" in color) {
      return updateQueries({
        colorname: color.name,
        colorgrade: color.grade,
      });
    }
    return updateQueries({
      colorname: color.name,
      colorgrade: undefined,
    });
  }

  return {
    selectColor,
    currentColor,
    resetCurrentColor,
    createColorHref,
  } as const;
}
