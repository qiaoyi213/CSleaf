const MAX_CANVAS_PIXELS = 8_000_000;

export function renderMultiplier(width = 0, height = 0, dpr = globalThis.devicePixelRatio || 1) {
  const crisp = Math.max(dpr, 2);
  return width && height ? Math.min(crisp, Math.sqrt(MAX_CANVAS_PIXELS / (width * height))) : crisp;
}
