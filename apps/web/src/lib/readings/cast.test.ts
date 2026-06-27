import { describe, expect, it } from "vitest";
import {
  deriveHexagramNumber,
  getChangingLinePositions,
  normalizeCastLines,
  type CastLine
} from "./cast";

describe("reading cast logic", () => {
  it("derives a stable hexagram number between 1 and 64 from six lines", () => {
    const lines: CastLine[] = [7, 7, 7, 7, 7, 7];

    expect(deriveHexagramNumber(lines)).toBe(64);
  });

  it("treats yin lines as zero and yang lines as one from bottom to top", () => {
    const lines: CastLine[] = [8, 7, 8, 7, 8, 7];

    expect(deriveHexagramNumber(lines)).toBe(43);
  });

  it("rejects casts that do not contain exactly six valid lines", () => {
    expect(() => normalizeCastLines([7, 8, 7])).toThrow(
      "A reading requires exactly six lines."
    );
    expect(() => normalizeCastLines([7, 8, 10, 7, 8, 7])).toThrow(
      "Invalid cast line value: 10"
    );
  });

  it("returns changing line positions using one-based line numbers", () => {
    const lines: CastLine[] = [6, 7, 8, 9, 7, 6];

    expect(getChangingLinePositions(lines)).toEqual([1, 4, 6]);
  });
});
