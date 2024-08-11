import type { MetaFunction } from "@remix-run/node";
import { ColorController } from "../features/color/ColorController";
import { ColorGridTable } from "../features/color/ColorGridTable";
import {
  getTailwindColors,
  getTailwindThemeColors,
} from "../features/color/tailwind";

export const meta: MetaFunction = () => {
  return [{ title: "Tailwind Color Contrast Grid" }];
};

export default function Index() {
  const tailwindThemeColors = getTailwindThemeColors();
  const tailwindColors = getTailwindColors(tailwindThemeColors);

  return (
    <div className="grid gap-y-8">
      <ColorController tailwindColors={tailwindColors} />
      <ColorGridTable />
    </div>
  );
}
