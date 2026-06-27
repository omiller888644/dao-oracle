import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "I Ching Love Reading",
  description: "Reflect on relationship patterns with a Dao Oracle love reading."
};

export default function LoveReadingPage() {
  return (
    <PageShell
      title="I Ching love reading"
      description="Use a love reading to understand relationship patterns, timing, and the next honest conversation."
    >
      <p>
        Dao Oracle does not tell you whether someone is destined for you. It
        helps you see the pattern in the relationship, the timing around action,
        and the question you may be avoiding.
      </p>
    </PageShell>
  );
}
