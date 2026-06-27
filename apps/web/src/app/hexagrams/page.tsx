import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { loadHexagramSeed } from "@/lib/hexagrams/load-source";
import { getHexagramSlug } from "@/lib/hexagrams/slug";

export const metadata: Metadata = {
  title: "64 Hexagrams",
  description: "Explore all 64 Dao Oracle hexagrams."
};

export default function HexagramsPage() {
  const hexagrams = loadHexagramSeed();

  return (
    <PageShell
      title="The 64 hexagrams"
      description="Each hexagram is a pattern of change. Dao Oracle uses these patterns for reflection, timing, relationships, work, and the next step."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {hexagrams.map((hexagram) => (
          <Link
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-gold"
            href={`/hexagrams/${getHexagramSlug(hexagram.number, hexagram.title_en)}`}
            key={hexagram.number}
          >
            <p className="text-sm text-gold">Hexagram {hexagram.number}</p>
            <h2 className="mt-2 text-2xl">{hexagram.title_en}</h2>
            <p className="mt-3 text-base">{hexagram.core_en}</p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
