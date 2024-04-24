import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";

export function getTailwindThemeColors() {
  const { theme } = resolveConfig(tailwindConfig);
  return theme.colors;
}
