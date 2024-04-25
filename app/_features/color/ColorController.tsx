"use client";

import { useTailwindColorQuery } from "@/app/_features/color/useTailwindColorQuery";

export function ColorController() {
  const { currentColor, resetCurrentColor } = useTailwindColorQuery();
  return (
    <div>
      {currentColor.type === "notFound" ? (
        <p>色を選択してください</p>
      ) : (
        <p>
          <button
            onClick={resetCurrentColor}
            className=" rounded-lg bg-black px-4 py-2  text-slate-100"
          >
            選択を解除
          </button>
        </p>
      )}
    </div>
  );
}
