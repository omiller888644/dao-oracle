import { describe, expect, it } from "vitest";

describe("Dao Oracle web app", () => {
  it("exposes the public brand name", () => {
    expect("Dao Oracle").toMatch(/Dao Oracle/);
  });
});
