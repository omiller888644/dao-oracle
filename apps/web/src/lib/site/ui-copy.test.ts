import { describe, expect, it } from "vitest";
import {
  homeActions,
  questionDirections,
  transitionLetters
} from "./ui-copy";

describe("Dao Oracle flow UI copy", () => {
  it("keeps only one primary home button and renders secondary entries as text links", () => {
    expect(homeActions.filter((action) => action.variant === "primary")).toHaveLength(1);
    expect(homeActions.filter((action) => action.variant === "text")).toHaveLength(2);
  });

  it("keeps question directions selectable and separated", () => {
    expect(questionDirections).toHaveLength(5);
    expect(questionDirections.map((direction) => direction.value)).toEqual([
      "love",
      "career",
      "money",
      "wellbeing",
      "life_path"
    ]);
  });

  it("frames the transition as letters of inner doubt being absorbed", () => {
    expect(transitionLetters.join("")).toBe("YOURCONFUSION?");
    expect(transitionLetters).not.toContain("Your confusion?");
  });
});
