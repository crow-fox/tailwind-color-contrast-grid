import type { FC } from "react";
import { capitalizeFirstLetter } from "../../utils/string";
import { ColorGridItem } from "./ColorGridItem";
import {
  type TWColor,
  twColorGrades,
  twHasGradeColorPaletteListMap,
  twSingleColorPaletteListMap,
} from "./tw";

type Props = {
  selectedColor?: TWColor;
};

export const ColorGridTable: FC<Props> = ({ selectedColor }) => {
  return (
    <div className="grid overflow-x-auto">
      <table className="relative w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-900 bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),theme(colors.gray[900])_50%,transparent_calc(50%+0.5px))] dark:border-gray-200 dark:bg-[linear-gradient(to_top_right,transparent_calc(50%-0.5px),theme(colors.gray[200])_50%,transparent_calc(50%+0.5px))]">
              <p className="text-end text-xs">Grade</p>
              <p className="text-start text-xs">Color</p>
            </th>
            {twColorGrades.map((grade) => (
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
          {Array.from(twHasGradeColorPaletteListMap).map(([name, palette]) => (
            <tr key={name}>
              <th className="border border-gray-900 px-2 py-2 text-sm dark:border-gray-200">
                {capitalizeFirstLetter(name)}
              </th>
              {Array.from(palette).map(([grade, value]) => (
                <td key={grade} className="border border-gray-200 dark:border-gray-700">
                  <ColorGridItem
                    color={{ type: "graded", name, grade, value }}
                    selectedColor={selectedColor}
                  />
                </td>
              ))}
            </tr>
          ))}
          {Array.from(twSingleColorPaletteListMap).map(([name, value]) => (
            <tr key={name}>
              <th className="border border-gray-900 px-2 py-2 text-sm dark:border-gray-200">
                {capitalizeFirstLetter(name)}
              </th>
              <td
                colSpan={twColorGrades.length}
                className="border border-gray-200 dark:border-gray-700"
              >
                <ColorGridItem
                  color={{ type: "single", name, value }}
                  selectedColor={selectedColor}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
