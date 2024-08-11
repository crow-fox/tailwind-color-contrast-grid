import { TailwindColors } from "@/app/_features/color/tailwind.server";
import { getObjectKeys } from "@/app/_utils/object";
import { InferOutput, literal, safeParse, union } from "valibot";

function tailwindGradedColorNameSchemaFactory(tailwindColors: TailwindColors) {
  return union(
    getObjectKeys(tailwindColors.graded).map((color) => literal(color)),
  );
}

export type TailwindGradedColorName = InferOutput<
  ReturnType<typeof tailwindGradedColorNameSchemaFactory>
>;

export function isTailwindGradedColorName(
  name: unknown,
  tailwindColors: TailwindColors,
): name is TailwindGradedColorName {
  const result = safeParse(
    tailwindGradedColorNameSchemaFactory(tailwindColors),
    name,
  );
  if (result.success) {
    return true;
  }
  return false;
}

function tailwindSingleColorNameSchemaFactory(tailwindColors: TailwindColors) {
  return union(
    getObjectKeys(tailwindColors.single).map((color) => literal(color)),
  );
}

export type TailwindSingleColorName = InferOutput<
  ReturnType<typeof tailwindSingleColorNameSchemaFactory>
>;

export function isTailwindSingleColorName(
  name: unknown,
  tailwindColors: TailwindColors,
): name is TailwindSingleColorName {
  const result = safeParse(
    tailwindSingleColorNameSchemaFactory(tailwindColors),
    name,
  );
  if (result.success) {
    return true;
  }
  return false;
}

export function tailwindColorNameSchemaFactory(tailwindColors: TailwindColors) {
  return union(
    getObjectKeys({
      ...tailwindColors.graded,
      ...tailwindColors.single,
    }).map((color) => literal(color)),
  );
}

type TailwindColorName = InferOutput<
  ReturnType<typeof tailwindColorNameSchemaFactory>
>;

export function isTailwindColorName(
  name: unknown,
  tailwindColors: TailwindColors,
): name is TailwindColorName {
  const result = safeParse(
    tailwindColorNameSchemaFactory(tailwindColors),
    name,
  );
  if (result.success) {
    return true;
  }
  return false;
}

function tailwindColorGradeSchemaFactory(tailwindColors: TailwindColors) {
  return union(
    getObjectKeys(tailwindColors.graded.amber).map((grade) => literal(grade)),
  );
}

export type TailwindColorGrade = InferOutput<
  ReturnType<typeof tailwindColorGradeSchemaFactory>
>;

export function isTailwindColorGrade(
  grade: unknown,
  tailwindColors: TailwindColors,
): grade is TailwindColorGrade {
  const result = safeParse(
    tailwindColorGradeSchemaFactory(tailwindColors),
    grade,
  );
  if (result.success) {
    return true;
  }
  return false;
}

export function findTailwindColor(
  color: { name: string; grade: string },
  tailwindColors: TailwindColors,
):
  | {
      type: "notFound";
    }
  | {
      type: "single";
      color: {
        name: TailwindSingleColorName;
        value: string;
      };
    }
  | {
      type: "graded";
      color: {
        name: TailwindGradedColorName;
        grade: TailwindColorGrade;
        value: string;
      };
    } {
  if (!isTailwindColorName(color.name, tailwindColors)) {
    return {
      type: "notFound",
    };
  }

  if (isTailwindSingleColorName(color.name, tailwindColors)) {
    return {
      type: "single",
      color: {
        name: color.name,
        value: tailwindColors.single[color.name],
      },
    };
  }

  if (isTailwindGradedColorName(color.name, tailwindColors)) {
    if (isTailwindColorGrade(color.grade, tailwindColors)) {
      return {
        type: "graded",
        color: {
          name: color.name,
          grade: color.grade,
          value: tailwindColors.graded[color.name][color.grade],
        },
      };
    }
    return {
      type: "notFound",
    };
  }

  throw new Error(`Unreachable color name: ${color.name}`);
}
