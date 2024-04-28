import {
  TailwindColorGrade,
  TailwindGradedColorName,
  TailwindSingleColorName,
} from "@/app/_features/color/tailwind";

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
    <div className="grid gap-y-3 p-2 hover:shadow-[inset_0_0_0_2px_black]">
      <div
        className="grid h-10 w-20 place-content-center rounded-md border border-gray-100 text-xs/none dark:border-gray-800 "
        style={{
          backgroundColor: color.value,
        }}
      ></div>
      <p className=" text-sm/none ">{color.value}</p>
    </div>
  );
}
