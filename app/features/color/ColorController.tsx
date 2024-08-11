import { TailwindColors } from "./tailwind";
import { useTailwindColorQuery } from "./useTailwindColorQuery";

type Props = {
  tailwindColors: TailwindColors;
};

export function ColorController({ tailwindColors }: Props) {
  const { currentColor, resetCurrentColor } =
    useTailwindColorQuery(tailwindColors);

  return (
    <div>
      {currentColor.type === "notFound" ? (
        <p>色を選択してください</p>
      ) : (
        <p>
          <button
            onClick={() => resetCurrentColor()}
            className="rounded-lg bg-gray-900 px-4 py-2 text-white dark:bg-gray-200 dark:text-gray-950"
          >
            選択を解除
          </button>
        </p>
      )}
    </div>
  );
}
