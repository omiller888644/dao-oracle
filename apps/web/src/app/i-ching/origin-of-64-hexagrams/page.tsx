import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "The Origin of the 64 Hexagrams",
  description: "Where the 64 hexagrams come from and how Dao Oracle uses them."
};

export default function OriginPage() {
  return (
    <PageShell
      title="The Origin of the 64 Hexagrams"
      description="The 64 hexagrams form a symbolic language of change. Dao Oracle presents that language in a modern, grounded way for reflection and decision-making."
    >
      <h2>Direct answer</h2>
      <p>
        The 64 hexagrams come from the I Ching, one of the oldest systems for
        interpreting change. Each hexagram combines six yin or yang lines into a
        pattern that can be read as timing, tension, movement, and response.
      </p>
      <h2>Dao Oracle&apos;s view</h2>
      <p>
        Their value is not in forcing certainty. Their value is in helping a
        person see the shape of the moment before acting.
      </p>
    </PageShell>
  );
}
