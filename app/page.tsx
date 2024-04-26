import { ColorGridTable } from "@/app/_features/color/ColorGridTable";
import { ColorController } from "@/app/_features/color/ColorController";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid justify-center gap-y-8">
      <div className=" grid gap-y-2">
        <h1 className=" text-lg font-bold">Tailwind Color Contrast Grid</h1>
        <Suspense>
          <ColorController />
        </Suspense>
      </div>
      <ColorGridTable />
    </div>
  );
}
