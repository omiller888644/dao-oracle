import { describe, expect, it } from "vitest";
import { loadHexagramSeed } from "./load-source";
import { getHexagramSlug } from "./slug";

describe("hexagram seed data", () => {
  it("loads exactly 64 unique hexagrams from the database-ready JSONL source", () => {
    const hexagrams = loadHexagramSeed();
    const numbers = new Set(hexagrams.map((hexagram) => hexagram.number));

    expect(hexagrams).toHaveLength(64);
    expect(numbers.size).toBe(64);
    expect(Math.min(...numbers)).toBe(1);
    expect(Math.max(...numbers)).toBe(64);
  });

  it("requires the four interpretation sections used by Dao Oracle readings", () => {
    const [first] = loadHexagramSeed();

    expect(first.sections.cosmic_timing.title_en).toBe("Cosmic Timing");
    expect(first.sections.human_field.title_en).toBe("Human Field");
    expect(first.sections.earthly_leverage.title_en).toBe("Earthly Leverage");
    expect(first.sections.ancient_root.title_en).toBe("Ancient Root");
  });

  it("generates stable English slugs for public hexagram routes", () => {
    expect(getHexagramSlug(1, "The Creative")).toBe("1-the-creative");
    expect(getHexagramSlug(64, "Before Completion")).toBe(
      "64-before-completion"
    );
  });
});
