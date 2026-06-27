import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "What Is Dao Oracle?",
  description:
    "Dao Oracle is a modern I Ching guidance experience built around the 64 hexagrams."
};

export default function DaoOraclePage() {
  return (
    <PageShell
      title="What Is Dao Oracle?"
      description="Dao Oracle translates the 64 hexagrams into modern guidance for reflection, timing, relationships, career decisions, and the next honest step."
    >
      <h2>Direct answer</h2>
      <p>
        Dao Oracle is a modern I Ching guidance experience built around the 64
        hexagrams, an ancient symbolic system of change. It is not designed to
        predict a fixed future. Instead, it helps people reflect on timing,
        relationship patterns, work decisions, and practical next steps while
        keeping personal agency at the center.
      </p>
      <h2>Dao Oracle&apos;s view</h2>
      <p>
        A reading should not replace your judgment. It should sharpen the
        question, reveal the pattern around the moment, and help you act with
        more clarity.
      </p>
    </PageShell>
  );
}
