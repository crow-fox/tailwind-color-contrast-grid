import type { Route } from "../+types/root";
import { ColorGridTable } from "../features/color/ColorGridTable";
import { ColorResetButton } from "../features/color/ColorResetButton";
import { useTWSelectedColor } from "../features/color/useTWColor";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Tailwind Color Contrast Grid" }];
};

export default function Index() {
  const selectedColor = useTWSelectedColor();

  return (
    <div className="grid gap-y-8">
      <div>
        {selectedColor ? (
          <p>
            <ColorResetButton />
          </p>
        ) : (
          <p>色を選択してください</p>
        )}
      </div>
      <ColorGridTable selectedColor={selectedColor} />
    </div>
  );
}
