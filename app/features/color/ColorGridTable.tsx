import { ColorGridItem } from "./ColorGridItem";
import {
  getTailwindColorGrades,
  getTailwindColors,
  getTailwindThemeColors,
} from "./tailwind";

import { getObjectKeys } from "../../utils/object";
import { capitalizeFirstLetter } from "../../utils/string";

export function ColorGridTable() {
  const tailwindThemeColors = getTailwindThemeColors();
  const tailwindColors = getTailwindColors(tailwindThemeColors);
  const tailwindColorGrades = getTailwindColorGrades();

  return (
    <div className="grid overflow-x-auto">
      <table className="relative w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-900 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),theme(colors.gray[900])_50%,transparent_calc(50%+0.5px))] dark:border-gray-200 dark:bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),theme(colors.gray[200])_50%,transparent_calc(50%+0.5px))]">
              <p className="text-end text-xs">Grade</p>
              <p className="text-start text-xs">Color</p>
            </th>
            {tailwindColorGrades.map((grade) => (
              <th
                key={grade}
                className="border border-gray-900 px-2 py-2 text-sm dark:border-gray-200"
              >
                {grade}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getObjectKeys(tailwindColors.graded).map((name) => (
            <tr key={name}>
              <th className="border border-gray-900 px-2 py-2 text-sm dark:border-gray-200">
                {capitalizeFirstLetter(name)}
              </th>
              {getObjectKeys(tailwindColors.graded[name]).map((grade) => (
                <td
                  key={grade}
                  className="border border-gray-200 dark:border-gray-700"
                >
                  <ColorGridItem
                    color={{
                      name,
                      grade,
                      value: tailwindColors.graded[name][grade],
                    }}
                    tailwindColors={tailwindColors}
                  />
                </td>
              ))}
            </tr>
          ))}
          {getObjectKeys(tailwindColors.single).map((name) => (
            <tr key={name}>
              <th className="border border-gray-900 px-2 py-2 text-sm dark:border-gray-200">
                {capitalizeFirstLetter(name)}
              </th>
              <td
                colSpan={tailwindColorGrades.length}
                className="border border-gray-200 dark:border-gray-700"
              >
                <ColorGridItem
                  color={{
                    name,
                    value: tailwindColors.single[name],
                  }}
                  tailwindColors={tailwindColors}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
