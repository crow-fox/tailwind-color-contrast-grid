import { FC } from "react";
import { useClipboardCopy } from "../../utils/useClipboardCopy";
import { ColorContrastLevel, calculateColorContrast } from "./contrast";
import { TWColor } from "./tw";
import { useTWColorAction } from "./useTWColor";

type Props = {
  color: TWColor;
  selectedColor?: TWColor;
};

export const ColorGridItem: FC<Props> = (props) => {
  const { selectColor, resetSelectedColor } = useTWColorAction();

  const isSelected =
    props.color.type === "graded"
      ? props.selectedColor?.name === props.color.name &&
        props.selectedColor?.grade === props.color.grade
      : props.color.type === "single"
        ? props.selectedColor?.name === props.color.name
        : false;

  const contrastResult = props.selectedColor
    ? calculateColorContrast(props.selectedColor.value, props.color.value)
    : undefined;

  const handleClick = () => {
    if (isSelected) {
      resetSelectedColor({ preventScrollReset: true });
      return;
    }
    switch (props.color.type) {
      case "graded":
        selectColor(
          { name: props.color.name, grade: props.color.grade },
          { preventScrollReset: true },
        );
        return;
      case "single":
        selectColor({ name: props.color.name }, { preventScrollReset: true });
        return;
      default: {
        const _: never = props.color;
      }
    }
  };

  const { isCopied, clipboardCopy } = useClipboardCopy();

  const handleCopy = async () => await clipboardCopy(props.color.value);

  return (
    <div className="relative grid gap-y-2 p-2">
      <div
        aria-hidden="true"
        className="grid h-10 w-full min-w-20 place-content-center rounded-md border border-gray-100 text-xs/none dark:border-gray-800"
        style={{
          backgroundColor: props.color.value,
          color: props.selectedColor ? props.selectedColor.value : undefined,
        }}
      >
        {props.selectedColor && "テキスト"}
      </div>
      <div className="grid grid-cols-[auto_1fr] items-center gap-x-1 text-sm/none">
        <button
          onClick={handleClick}
          className={[
            "text-sm/none after:absolute after:inset-0 after:block focus-visible:outline-none",
            "after:focus-visible:shadow-[inset_0_0_0_3px_theme(colors.gray[900])] after:hover:shadow-[inset_0_0_0_3px_theme(colors.gray[900])] after:dark:focus-visible:shadow-[inset_0_0_0_3px_theme(colors.gray[200])] after:dark:hover:shadow-[inset_0_0_0_3px_theme(colors.gray[200])]",
            isSelected
              ? "after:shadow-[inset_0_0_0_3px_theme(colors.gray[900])] after:dark:shadow-[inset_0_0_0_3px_theme(colors.gray[200])]"
              : "after:shadow-none",
          ].join(" ")}
        >
          {props.color.value}
        </button>
        <button
          onClick={handleCopy}
          className="isolate inline-grid size-6 place-content-center rounded-lg border border-gray-900 bg-white text-sm/none dark:border-gray-200 dark:bg-gray-950"
        >
          {isCopied ? (
            <svg
              role="img"
              aria-label="コピーしました"
              height="1em"
              viewBox="0 -960 960 960"
              width="1em"
              className="fill-current"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          ) : (
            <svg
              role="img"
              aria-label="カラーコードコピー"
              height="1em"
              viewBox="0 -960 960 960"
              width="1em"
              className="fill-current"
            >
              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
            </svg>
          )}
        </button>
      </div>
      {contrastResult && (
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-1">
          <p
            className={[
              "rounded-md p-1 text-xs/none",
              getLevelClassNames(contrastResult.level),
            ].join(" ")}
          >
            {contrastResult.level}
          </p>
          <p className="text-sm/none">{contrastResult.ratio}</p>
        </div>
      )}
    </div>
  );
};

function getLevelClassNames(level: ColorContrastLevel) {
  switch (level) {
    case "AAA":
      return "bg-violet-600 text-white";
    case "AA":
      return "bg-violet-200 text-black";
    case "AA18":
      return "bg-amber-200 text-black";
    case "DNP":
      return "bg-rose-600 text-white";
  }
}
