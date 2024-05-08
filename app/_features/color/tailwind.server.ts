import "server-only";

import tailwindConfig from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";
import { DefaultColors } from "tailwindcss/types/generated/colors";
import { getObjectKeys } from "@/app/_utils/object";

export function getTailwindThemeColors() {
  const { theme } = resolveConfig(tailwindConfig);
  return theme.colors;
}

export function getTailwindColors(colors: DefaultColors) {
  return {
    graded: {
      slate: colors.slate,
      gray: colors.gray,
      zinc: colors.zinc,
      neutral: colors.neutral,
      stone: colors.stone,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    single: {
      white: colors.white,
      black: colors.black,
    },
  } as const;
}

export type TailwindColors = ReturnType<typeof getTailwindColors>;

export function getTailwindColorGrades(colors: DefaultColors) {
  return getObjectKeys(colors.amber);
}
