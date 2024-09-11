import { useURLQueryParams } from "../../utils/useURLQueryParams";
import {
  type TWColor,
  type TWColorGrade,
  type TWHasGradeColorName,
  type TWSingleColorName,
  isTWColorGrade,
  isTWHasGradeColorName,
  isTWSingleColorName,
  twHasGradeColorPaletteListMap,
  twSingleColorPaletteListMap,
} from "./tw";

type TWQuery = "colorname" | "colorgrade";

export function useTWSelectedColor(): TWColor | undefined {
  const { getQueryValue } = useURLQueryParams<TWQuery>();

  const colorName = getQueryValue("colorname") ?? "";
  const colorGrade = getQueryValue("colorgrade") ?? "";

  if (isTWSingleColorName(colorName)) {
    const colorValue = twSingleColorPaletteListMap.get(colorName) ?? "";

    return {
      type: "single",
      name: colorName,
      value: colorValue,
    };
  }

  if (isTWColorGrade(colorGrade) && isTWHasGradeColorName(colorName)) {
    const colorValue =
      twHasGradeColorPaletteListMap.get(colorName)?.get(colorGrade) ?? "";

    return {
      type: "graded",
      name: colorName,
      grade: colorGrade,
      value: colorValue,
    };
  }

  return undefined;
}

export function useTWColorAction() {
  const { updateQueries, deleteQueries } = useURLQueryParams<TWQuery>();

  function resetSelectedColor(
    options: { preventScrollReset: boolean } = { preventScrollReset: false },
  ) {
    deleteQueries(["colorname", "colorgrade"], {
      preventScrollReset: options.preventScrollReset,
    });
  }

  function selectColor(
    newColor:
      | {
          name: TWHasGradeColorName;
          grade: TWColorGrade;
        }
      | {
          name: TWSingleColorName;
        },
    options: { preventScrollReset: boolean } = { preventScrollReset: false },
  ) {
    updateQueries(
      {
        colorname: newColor.name,
        colorgrade: "grade" in newColor ? newColor.grade : undefined,
      },
      {
        preventScrollReset: options.preventScrollReset,
      },
    );
  }

  return {
    resetSelectedColor,
    selectColor,
  } as const;
}
