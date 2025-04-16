import { randomFloat } from "./random.ts";

export const blackRandomColor = (): string =>
  "#" + ((randomFloat(0.0, 0.4) * 0xffffff) << 0).toString(16).padStart(6, "0");
