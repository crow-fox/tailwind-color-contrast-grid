import Color from "colorjs.io";

export type ColorContrastLevel = "AAA" | "AA" | "AA18" | "DNP";

type ContrastResult = {
  level: ColorContrastLevel;
  ratio: number;
};

export function calculateColorContrast(
  colorRGB1: string,
  colorRGB2: string,
): ContrastResult {
  const color1 = new Color(colorRGB1);
  const color2 = new Color(colorRGB2);

  const contrast = Math.floor(color1.contrastWCAG21(color2) * 10) / 10;

  if (contrast >= 7) {
    return {
      level: "AAA",
      ratio: contrast,
    };
  }

  if (contrast >= 4.5) {
    return {
      level: "AA",
      ratio: contrast,
    };
  }

  if (contrast >= 3) {
    return {
      level: "AA18",
      ratio: contrast,
    };
  }

  return {
    level: "DNP",
    ratio: contrast,
  };
}
