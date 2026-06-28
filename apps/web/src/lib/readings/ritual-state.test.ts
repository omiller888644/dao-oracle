import { describe, expect, it } from "vitest";
import {
  getAutoCastFrame,
  getRitualProgress,
  isRitualComplete
} from "./ritual-state";

describe("ritual interaction state", () => {
  it("caps cast progress at six pulses", () => {
    expect(getRitualProgress(0)).toEqual({ count: 0, percent: 0 });
    expect(getRitualProgress(3)).toEqual({ count: 3, percent: 50 });
    expect(getRitualProgress(8)).toEqual({ count: 6, percent: 100 });
  });

  it("only completes after six cast pulses", () => {
    expect(isRitualComplete(5)).toBe(false);
    expect(isRitualComplete(6)).toBe(true);
  });

  it("models automatic casting frames before final redirect", () => {
    expect(getAutoCastFrame(0)).toEqual({
      visibleLineIndex: 0,
      completedLines: 0,
      finalHexagramVisible: false,
      shouldRedirect: false
    });
    expect(getAutoCastFrame(6)).toMatchObject({
      completedLines: 6,
      finalHexagramVisible: true,
      shouldRedirect: false
    });
    expect(getAutoCastFrame(8)).toMatchObject({
      completedLines: 6,
      finalHexagramVisible: true,
      shouldRedirect: true
    });
  });
});
