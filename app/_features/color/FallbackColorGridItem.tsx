import {
  TailwindColorGrade,
  TailwindGradedColorName,
  TailwindSingleColorName,
} from "@/app/_features/color/tailwind.client";

type Props = {
  color:
    | {
        name: TailwindGradedColorName;
        grade: TailwindColorGrade;
        value: string;
      }
    | {
        name: TailwindSingleColorName;
        value: string;
      };
};

export function FallbackColorGridItem({ color }: Props) {
  return (
    <div className="grid gap-y-2 p-2">
      <div
        className="grid h-10 w-full min-w-20 place-content-center rounded-md border border-gray-100 dark:border-gray-800"
        style={{
          backgroundColor: color.value,
        }}
      ></div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-1">
        <p className="text-sm/none">{color.value}</p>
        <div className="size-6"></div>
      </div>
    </div>
  );
}
