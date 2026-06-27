import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "What Are the 64 Hexagrams?",
  description: "A beginner-friendly explanation of the I Ching 64 hexagrams."
};

export default function SixtyFourHexagramsGuidePage() {
  return (
    <PageShell
      title="What are the 64 hexagrams?"
      description="The 64 hexagrams are symbolic patterns of change built from six yin or yang lines."
    >
      <p>
        In Dao Oracle, each hexagram is treated as a pattern for reflection:
        timing, human dynamics, practical leverage, and ancient roots.
      </p>
      <p>
        Start with the full <Link href="/hexagrams">64 hexagram library</Link>{" "}
        or begin a reading when you have a real question.
      </p>
    </PageShell>
  );
}
