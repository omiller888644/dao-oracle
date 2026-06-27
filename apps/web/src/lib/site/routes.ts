export interface PublicRoute {
  path: string;
  title: string;
  description: string;
  priority: number;
}

export const publicRoutes: PublicRoute[] = [
  {
    path: "/",
    title: "Dao Oracle",
    description: "Ancient I Ching guidance for modern decisions.",
    priority: 1
  },
  {
    path: "/dao-oracle",
    title: "What Is Dao Oracle?",
    description: "A modern I Ching guidance experience built around the 64 hexagrams.",
    priority: 0.9
  },
  {
    path: "/reading",
    title: "Begin Your Reading",
    description: "Ask a question and begin a reflective I Ching reading.",
    priority: 0.9
  },
  {
    path: "/reading/transition",
    title: "Question Received",
    description: "A short transition state before the cosmic ritual begins.",
    priority: 0.5
  },
  {
    path: "/reading/payment",
    title: "Unlock Full Reading",
    description: "A full reading detail page for future paid interpretation.",
    priority: 0.45
  },
  {
    path: "/reading/share",
    title: "Share Reading",
    description: "A share card page for Dao Oracle reading results.",
    priority: 0.45
  },
  {
    path: "/hexagrams",
    title: "64 Hexagrams",
    description: "Explore the 64 hexagrams used by Dao Oracle.",
    priority: 0.85
  },
  {
    path: "/i-ching/origin-of-64-hexagrams",
    title: "The Origin of the 64 Hexagrams",
    description: "Learn where the 64 hexagrams come from and how Dao Oracle uses them.",
    priority: 0.85
  },
  {
    path: "/i-ching/64-hexagrams",
    title: "What Are the 64 Hexagrams?",
    description: "A clear guide to the symbolic language of change in the I Ching.",
    priority: 0.85
  },
  {
    path: "/i-ching/beginners-guide",
    title: "I Ching for Beginners",
    description: "A practical introduction to I Ching readings for modern life decisions.",
    priority: 0.8
  },
  {
    path: "/readings/love",
    title: "I Ching Love Reading",
    description: "Use the I Ching to reflect on relationship patterns without fixed predictions.",
    priority: 0.8
  },
  {
    path: "/readings/career",
    title: "I Ching Career Reading",
    description: "Use the I Ching to reflect on timing, change, and career decisions.",
    priority: 0.8
  }
];
