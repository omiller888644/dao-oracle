import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "I Ching for Beginners",
  description: "A practical beginner guide to I Ching readings."
};

export default function BeginnersGuidePage() {
  return (
    <PageShell
      title="I Ching for beginners"
      description="A reading begins with a question, forms a hexagram, and turns that symbol into a reflective answer."
    >
      <h2>How a reading works</h2>
      <p>
        You ask a question, cast six lines, receive a hexagram, and reflect on
        how that pattern speaks to your situation. Dao Oracle keeps the language
        modern and avoids fixed predictions.
      </p>
      <h2>How to ask</h2>
      <p>
        Ask what you need to understand, how to approach a situation, or what
        pattern is present. Avoid asking the system to remove your own judgment.
      </p>
    </PageShell>
  );
}
