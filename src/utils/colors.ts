import { randInt } from "./random";

export function isHexColor(value: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(
    value
  );
}

export function isRgbColor(value: string): boolean {
  return /^rgb\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)$/.test(value);
}

export function isRgbaColor(value: string): boolean {
  return /^rgba\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
    value
  );
}

export function isHslColor(value: string): boolean {
  return /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/.test(value);
}

export function isHslaColor(value: string): boolean {
  return /^hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(
    value
  );
}

export function isCssColorName(value: string): boolean {
  const s: CSSStyleDeclaration = document.createElement("div").style;
  s.color = value;
  return s.color !== "";
}

export function isColor(value: string): boolean {
  return (
    isHexColor(value) ||
    isRgbColor(value) ||
    isRgbaColor(value) ||
    isHslColor(value) ||
    isHslaColor(value) ||
    isCssColorName(value)
  );
}

export const randomColor = (): string => {
  const red: number = randInt(0, 255);
  const green: number = randInt(0, 255);
  const blue: number = randInt(0, 255);
  return `rgb(${red}, ${green}, ${blue})`;
};
