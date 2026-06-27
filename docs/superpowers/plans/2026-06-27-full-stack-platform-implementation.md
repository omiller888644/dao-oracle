# Dao Oracle Full-Stack Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first testable Dao Oracle full-stack website with Next.js, Supabase-ready database schema, 64-hexagram seed import, AI interpretation API, user reading flow, admin views, and overseas deployment configuration.

**Architecture:** Create the production application under `apps/web` so the repo can keep its strategy docs and outputs at the root. Use test-first data and API modules, then wire them into Next.js pages and route handlers. Keep Supabase and OpenAI behind server-only modules with local deterministic fallbacks for tests.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Supabase Postgres/Auth, OpenAI API, Vitest, Vercel.

## Global Constraints

- Target market is Europe and North America; default public copy is English.
- Deployment target is overseas infrastructure: Vercel Preview first, Vercel Production later.
- Database target is Supabase Postgres with Staging first and Production later.
- 64 hexagram seed source is `outputs/hexagram_content/dao_oracle_64_hexagrams_database_ready.jsonl`.
- AI must not invent hexagram meanings or deterministic predictions; it may only personalize our fixed hexagram content to the user's question.
- The site must be SEO/GEO-friendly: crawlable HTML, stable routes, metadata, sitemap, robots, and internal links.
- No real API keys may be committed.
- Payment is out of scope for this first build but routes and data boundaries must not block future Stripe integration.

---

### Task 1: App Skeleton and Tooling

**Files:**
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.mjs`
- Create: `apps/web/postcss.config.mjs`
- Create: `apps/web/tailwind.config.ts`
- Create: `apps/web/vitest.config.ts`
- Create: `apps/web/src/app/layout.tsx`
- Create: `apps/web/src/app/page.tsx`
- Create: `apps/web/src/app/globals.css`
- Create: `apps/web/src/test/smoke.test.ts`
- Create: `apps/web/.env.local.example`

**Interfaces:**
- Produces: `npm --prefix apps/web run test`, `npm --prefix apps/web run lint`, `npm --prefix apps/web run build`.

- [ ] **Step 1: Write failing smoke test**

```ts
import { describe, expect, it } from "vitest";

describe("Dao Oracle web app", () => {
  it("exposes the public brand name", () => {
    expect("Dao Oracle").toMatch(/Dao Oracle/);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix apps/web run test`
Expected: FAIL because `apps/web` does not exist yet.

- [ ] **Step 3: Create minimal Next.js app and tooling**

Create the files listed above with a mobile-first English landing page and scripts for `dev`, `build`, `start`, `lint`, and `test`.

- [ ] **Step 4: Install dependencies and verify**

Run: `npm --prefix apps/web install`
Run: `npm --prefix apps/web run test`
Run: `npm --prefix apps/web run build`
Expected: PASS.

### Task 2: Hexagram Data Module and Seed Validation

**Files:**
- Create: `apps/web/src/lib/hexagrams/types.ts`
- Create: `apps/web/src/lib/hexagrams/load-source.ts`
- Create: `apps/web/src/lib/hexagrams/slug.ts`
- Create: `apps/web/src/lib/hexagrams/seed.test.ts`

**Interfaces:**
- Produces: `loadHexagramSeed(sourcePath?: string): HexagramSeed[]`
- Produces: `getHexagramSlug(number: number, titleEn: string): string`

- [ ] **Step 1: Write failing seed tests**

Tests must assert that the JSONL source parses to 64 unique hexagrams, each has required sections, and slugs are stable.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm --prefix apps/web run test -- src/lib/hexagrams/seed.test.ts`
Expected: FAIL because module files do not exist.

- [ ] **Step 3: Implement data loader**

Implement JSONL parsing using Node `fs`, validate required keys, and generate lowercase URL slugs like `1-the-creative`.

- [ ] **Step 4: Verify**

Run: `npm --prefix apps/web run test -- src/lib/hexagrams/seed.test.ts`
Expected: PASS.

### Task 3: Supabase Schema and Seed Script

**Files:**
- Create: `apps/web/supabase/migrations/0001_initial_schema.sql`
- Create: `apps/web/scripts/seed-hexagrams.mjs`
- Create: `apps/web/scripts/validate-seed.mjs`
- Modify: `apps/web/package.json`

**Interfaces:**
- Produces SQL tables: `hexagrams`, `profiles`, `readings`, `prompt_versions`, `reading_interpretations`, `user_feedback`, `seo_pages`.
- Produces scripts: `npm --prefix apps/web run db:validate-seed`, `npm --prefix apps/web run db:seed-hexagrams`.

- [ ] **Step 1: Write seed validation script against loader**

Script should exit `0` only when all 64 records are valid.

- [ ] **Step 2: Run validation before migration exists**

Run: `npm --prefix apps/web run db:validate-seed`
Expected: PASS after Task 2; migration is not required for this script.

- [ ] **Step 3: Add Supabase migration**

Create tables, indexes, timestamps, role constraints, reading constraints, and RLS enablement.

- [ ] **Step 4: Add seed script**

Seed script should support `--dry-run` without Supabase credentials and real insert/upsert when `SUPABASE_SERVICE_ROLE_KEY` is set.

- [ ] **Step 5: Verify**

Run: `npm --prefix apps/web run db:validate-seed`
Run: `npm --prefix apps/web run db:seed-hexagrams -- --dry-run`
Expected: both PASS.

### Task 4: Reading Logic and AI Interpretation Boundary

**Files:**
- Create: `apps/web/src/lib/readings/cast.ts`
- Create: `apps/web/src/lib/readings/cast.test.ts`
- Create: `apps/web/src/lib/ai/interpretation-schema.ts`
- Create: `apps/web/src/lib/ai/build-context.ts`
- Create: `apps/web/src/lib/ai/build-context.test.ts`
- Create: `apps/web/src/app/api/readings/route.ts`
- Create: `apps/web/src/app/api/interpretations/route.ts`

**Interfaces:**
- Produces: `deriveHexagramNumber(lines: CastLine[]): number`
- Produces: `buildInterpretationContext(input): InterpretationContext`
- Produces API route: `POST /api/readings`
- Produces API route: `POST /api/interpretations`

- [ ] **Step 1: Write failing cast tests**

Test six-line input validation, deterministic hexagram number range, and changing-line extraction.

- [ ] **Step 2: Run cast tests to verify failure**

Run: `npm --prefix apps/web run test -- src/lib/readings/cast.test.ts`
Expected: FAIL because cast module does not exist.

- [ ] **Step 3: Implement cast module**

Use a deterministic binary mapping for first build and keep `changingLines` for future transformed hexagram work.

- [ ] **Step 4: Write failing AI context tests**

Test that context contains user question, question type, fixed hexagram content, and brand safety constraints.

- [ ] **Step 5: Implement AI context and API boundaries**

Implement schema and route handlers with server-side environment checks. If no OpenAI key exists, return a deterministic development interpretation and mark it as `mock`.

- [ ] **Step 6: Verify**

Run: `npm --prefix apps/web run test`
Expected: PASS.

### Task 5: User Pages and SEO/GEO Routes

**Files:**
- Create: `apps/web/src/app/reading/page.tsx`
- Create: `apps/web/src/app/reading/cast/page.tsx`
- Create: `apps/web/src/app/reading/result/[id]/page.tsx`
- Create: `apps/web/src/app/hexagrams/page.tsx`
- Create: `apps/web/src/app/hexagrams/[slug]/page.tsx`
- Create: `apps/web/src/app/i-ching/origin-of-64-hexagrams/page.tsx`
- Create: `apps/web/src/app/i-ching/64-hexagrams/page.tsx`
- Create: `apps/web/src/app/i-ching/beginners-guide/page.tsx`
- Create: `apps/web/src/app/readings/love/page.tsx`
- Create: `apps/web/src/app/readings/career/page.tsx`
- Create: `apps/web/src/app/dao-oracle/page.tsx`
- Create: `apps/web/src/app/robots.ts`
- Create: `apps/web/src/app/sitemap.ts`

**Interfaces:**
- Produces crawlable public pages and internal links.

- [ ] **Step 1: Write route smoke test**

Test the route manifest file or page metadata helpers include the first GEO routes.

- [ ] **Step 2: Run test to verify failure**

Run: `npm --prefix apps/web run test`
Expected: FAIL before route helpers exist.

- [ ] **Step 3: Implement pages**

Use existing Dao Oracle visual direction: dark spacious background, restrained gold, clear CTA, no cheap fortune-telling language.

- [ ] **Step 4: Verify**

Run: `npm --prefix apps/web run build`
Expected: PASS.

### Task 6: Admin MVP and Deployment Docs

**Files:**
- Create: `apps/web/src/app/admin/page.tsx`
- Create: `apps/web/src/app/admin/hexagrams/page.tsx`
- Create: `apps/web/src/app/admin/readings/page.tsx`
- Create: `apps/web/src/app/admin/interpretations/page.tsx`
- Create: `apps/web/src/app/admin/prompts/page.tsx`
- Create: `apps/web/src/app/admin/feedback/page.tsx`
- Create: `apps/web/src/app/admin/seo-pages/page.tsx`
- Create: `apps/web/README.md`
- Create: `apps/web/vercel.json`
- Modify: `README.md`

**Interfaces:**
- Produces admin placeholder pages with clear future data boundaries.
- Produces deployment instructions for Vercel root directory `apps/web`.

- [ ] **Step 1: Write admin route smoke test**

Test admin route labels and deployment checklist are exported from a config file.

- [ ] **Step 2: Run test to verify failure**

Run: `npm --prefix apps/web run test`
Expected: FAIL before config exists.

- [ ] **Step 3: Implement admin MVP and docs**

Admin pages can be read-only placeholders in first build, but must match final route structure and explain required environment variables.

- [ ] **Step 4: Final verification**

Run:

```bash
npm --prefix apps/web run test
npm --prefix apps/web run build
node tests/dao-oracle-prototype.test.mjs
```

Expected: all PASS.
