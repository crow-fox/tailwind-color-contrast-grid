import { FC } from "react";
import { useTWColorAction } from "./useTWColor";

export const ColorResetButton: FC = () => {
  const { resetSelectedColor } = useTWColorAction();

  return (
    <button
      onClick={() => resetSelectedColor({ preventScrollReset: false })}
      className="rounded-lg bg-gray-900 px-4 py-2 text-white dark:bg-gray-200 dark:text-gray-950"
    >
      選択を解除
    </button>
  );
};
