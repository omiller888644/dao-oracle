export interface AdminRoute {
  path: string;
  label: string;
  description: string;
}

export const adminRoutes: AdminRoute[] = [
  {
    path: "/admin",
    label: "Overview",
    description: "Operational dashboard for readings, feedback, and prompt health."
  },
  {
    path: "/admin/hexagrams",
    label: "Hexagrams",
    description: "Review the 64 fixed hexagram records used as the source of truth."
  },
  {
    path: "/admin/readings",
    label: "Readings",
    description: "Inspect user questions, cast results, and question types."
  },
  {
    path: "/admin/interpretations",
    label: "Interpretations",
    description: "Review AI outputs and identify weak responses."
  },
  {
    path: "/admin/prompts",
    label: "Prompts",
    description: "Manage reading prompt versions and model boundaries."
  },
  {
    path: "/admin/feedback",
    label: "Feedback",
    description: "Track helpful, unclear, inaccurate, and too-mystical responses."
  },
  {
    path: "/admin/seo-pages",
    label: "SEO/GEO Pages",
    description: "Plan crawlable content pages for search and AI answer engines."
  }
];

export const deploymentChecklist = [
  "Set Vercel root directory to apps/web.",
  "Connect Supabase Staging before production.",
  "Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  "Configure SUPABASE_SERVICE_ROLE_KEY only as a server-side secret.",
  "Configure OPENAI_API_KEY only as a server-side secret.",
  "Run db:validate-seed and db:seed-hexagrams -- --dry-run before real import."
];
