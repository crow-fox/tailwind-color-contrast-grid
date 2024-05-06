import { ColorGridTable } from "@/app/_features/color/ColorGridTable";
import { ColorController } from "@/app/_features/color/ColorController";
import { Suspense } from "react";
import {
  getTailwindColors,
  getTailwindThemeColors,
} from "@/app/_features/color/tailwind";

export default function Home() {
  const tailwindThemeColors = getTailwindThemeColors();
  const tailwindColors = getTailwindColors(tailwindThemeColors);

  return (
    <div className="grid gap-y-8">
      <Suspense fallback={<p>読み込み中...</p>}>
        <ColorController tailwindColors={tailwindColors} />
      </Suspense>
      <ColorGridTable />
    </div>
  );
}
