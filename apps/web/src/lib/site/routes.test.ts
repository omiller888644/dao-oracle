import { describe, expect, it } from "vitest";
import { publicRoutes } from "./routes";

describe("public route manifest", () => {
  it("contains the first Dao Oracle SEO and GEO routes", () => {
    const paths = publicRoutes.map((route) => route.path);

    expect(paths).toContain("/dao-oracle");
    expect(paths).toContain("/i-ching/origin-of-64-hexagrams");
    expect(paths).toContain("/i-ching/64-hexagrams");
    expect(paths).toContain("/i-ching/beginners-guide");
    expect(paths).toContain("/readings/love");
    expect(paths).toContain("/readings/career");
    expect(paths).toContain("/reading/transition");
    expect(paths).toContain("/reading/payment");
    expect(paths).toContain("/reading/share");
  });
});
