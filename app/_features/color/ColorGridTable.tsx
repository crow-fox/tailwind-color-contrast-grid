import { ColorGridItem } from "@/app/_features/color/ColorGridItem";
import { FallbackColorGridItem } from "@/app/_features/color/FallbackColorGridItem";
import {
  getTailwindColorGrades,
  getTailwindColors,
  getTailwindThemeColors,
} from "@/app/_features/color/tailwind";
import { getObjectKeys } from "@/app/_utils/object";
import { capitalizeFirstLetter } from "@/app/_utils/string";
import { Suspense } from "react";

export function ColorGridTable() {
  const tailwindThemeColors = getTailwindThemeColors();
  const tailwindColors = getTailwindColors(tailwindThemeColors);
  const tailwindColorGrades = getTailwindColorGrades(tailwindThemeColors);

  return (
    <div className=" grid grid-cols-[minmax(0,1fr)] justify-center overflow-x-auto">
      <table className=" relative w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-black bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),theme(colors.black)_50%,transparent_calc(50%+0.5px))]  ">
              <p className="text-end text-xs">Grade</p>
              <p className="text-start text-xs">Color</p>
            </th>
            {tailwindColorGrades.map((grade) => (
              <th
                key={grade}
                className=" border border-black px-2 py-2 text-sm"
              >
                {grade}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getObjectKeys(tailwindColors.graded).map((name) => (
            <tr key={name}>
              <th className=" border border-black px-2 py-2 text-sm">
                {capitalizeFirstLetter(name)}
              </th>
              {getObjectKeys(tailwindColors.graded[name]).map((grade) => (
                <td key={grade} className="border border-slate-200">
                  <Suspense
                    fallback={
                      <FallbackColorGridItem
                        color={{
                          name,
                          grade,
                          value: tailwindColors.graded[name][grade],
                        }}
                      />
                    }
                  >
                    <ColorGridItem
                      color={{
                        name,
                        grade,
                        value: tailwindColors.graded[name][grade],
                      }}
                      tailwindColors={tailwindColors}
                    />
                  </Suspense>
                </td>
              ))}
            </tr>
          ))}
          {getObjectKeys(tailwindColors.single).map((name) => (
            <tr key={name}>
              <th className=" border border-black px-2 py-2 align-top text-sm">
                {capitalizeFirstLetter(name)}
              </th>
              <td
                colSpan={tailwindColorGrades.length}
                className="border border-slate-200"
              >
                <Suspense
                  fallback={
                    <FallbackColorGridItem
                      color={{
                        name,
                        value: tailwindColors.single[name],
                      }}
                    />
                  }
                >
                  <ColorGridItem
                    color={{
                      name,
                      value: tailwindColors.single[name],
                    }}
                    tailwindColors={tailwindColors}
                  />
                </Suspense>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
