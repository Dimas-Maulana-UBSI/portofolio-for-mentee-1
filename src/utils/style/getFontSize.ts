const remBase = 16;

export function getFontSize(pixels: number): number {
  const browserFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  return browserFontSize * (pixels / remBase);
}
