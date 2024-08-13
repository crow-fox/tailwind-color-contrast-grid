import { useURLQueryParams } from "../../utils/useURLQueryParams";
import {
  isTWColorGrade,
  isTWHasGradeColorName,
  isTWSingleColorName,
  TWColor,
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
