import { describe, expect, it } from "vitest";
import { loadHexagramSeed } from "../hexagrams/load-source";
import { buildInterpretationContext } from "./build-context";

describe("AI interpretation context", () => {
  it("combines the user question with fixed hexagram content and brand constraints", () => {
    const [hexagram] = loadHexagramSeed();
    const context = buildInterpretationContext({
      question: "What should I understand before making this career change?",
      questionType: "career",
      hexagram,
      lines: [7, 7, 7, 7, 7, 7],
      changingLines: []
    });

    expect(context.questionType).toBe("career");
    expect(context.hexagram.number).toBe(1);
    expect(context.hexagram.core).toBe(
      "This is not a moment to follow. This is a moment to initiate."
    );
    expect(context.brandBoundaries).toContain(
      "Dao Oracle is not fortune telling."
    );
    expect(context.sections.cosmic_timing).toContain("Pure yang is present.");
  });
});
