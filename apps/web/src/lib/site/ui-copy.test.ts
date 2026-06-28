import { describe, expect, it } from "vitest";
import {
  buildQuestionFragments,
  homeActions,
  questionDirections,
  transitionFragments
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

  it("frames the transition as inner question text being absorbed", () => {
    expect(transitionFragments[0]).toBe("Your confusion?");
    expect(transitionFragments).toContain("The next step?");
    expect(transitionFragments.length).toBeGreaterThanOrEqual(5);
  });

  it("turns a user question into short transition fragments", () => {
    expect(
      buildQuestionFragments(
        "I feel torn between staying where I am and choosing a new path. What should I understand before deciding?"
      )
    ).toEqual([
      "Your confusion?",
      "I feel torn between staying",
      "where I am and choosing",
      "a new path",
      "What should I understand before"
    ]);
  });
});
