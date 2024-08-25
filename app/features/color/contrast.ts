import Color from "colorjs.io";

export type ColorContrastLevel = "AAA" | "AA" | "AA18" | "DNP";

type ContrastResult = {
  level: ColorContrastLevel;
  ratio: number;
};

function checkContrastLevel(contrast: number): ColorContrastLevel {
  if (contrast >= 7) {
    return "AAA";
  } else if (contrast >= 4.5) {
    return "AA";
  } else if (contrast >= 3) {
    return "AA18";
  } else {
    return "DNP";
  }
}

export function calculateColorContrast(
  colorRGB1: string,
  colorRGB2: string,
): ContrastResult {
  const color1 = new Color(colorRGB1);
  const color2 = new Color(colorRGB2);

  const contrast = Math.floor(color1.contrastWCAG21(color2) * 10) / 10;

  return {
    level: checkContrastLevel(contrast),
    ratio: contrast,
  };
}
