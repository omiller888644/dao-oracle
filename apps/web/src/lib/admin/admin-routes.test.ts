import { describe, expect, it } from "vitest";
import { adminRoutes, deploymentChecklist } from "./admin-routes";

describe("admin route manifest", () => {
  it("contains the MVP admin sections needed for operation and optimization", () => {
    const paths = adminRoutes.map((route) => route.path);

    expect(paths).toEqual([
      "/admin",
      "/admin/hexagrams",
      "/admin/readings",
      "/admin/interpretations",
      "/admin/prompts",
      "/admin/feedback",
      "/admin/seo-pages"
    ]);
  });

  it("documents the overseas preview deployment requirements", () => {
    expect(deploymentChecklist).toContain("Set Vercel root directory to apps/web.");
    expect(deploymentChecklist).toContain("Connect Supabase Staging before production.");
  });
});
