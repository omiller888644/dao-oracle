import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { loadHexagramSeed } from "@/lib/hexagrams/load-source";
import { getHexagramSlug } from "@/lib/hexagrams/slug";
import { REQUIRED_SECTION_KEYS } from "@/lib/hexagrams/types";

export async function generateStaticParams() {
  return loadHexagramSeed().map((hexagram) => ({
    slug: getHexagramSlug(hexagram.number, hexagram.title_en)
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hexagram = findHexagram(slug);

  if (!hexagram) {
    return {};
  }

  return {
    title: `Hexagram ${hexagram.number}: ${hexagram.title_en}`,
    description: hexagram.core_en
  };
}

export default async function HexagramDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hexagram = findHexagram(slug);

  if (!hexagram) {
    notFound();
  }

  return (
    <PageShell
      eyebrow={`Hexagram ${hexagram.number}`}
      title={hexagram.title_en}
      description={hexagram.core_en}
    >
      {REQUIRED_SECTION_KEYS.map((key) => {
        const section = hexagram.sections[key];

        return (
        <section key={key}>
          <h2>{section.title_en}</h2>
          {section.paragraphs
            .filter((paragraph) => paragraph.en)
            .map((paragraph, index) => (
              <p key={`${key}-${index}`}>{paragraph.en}</p>
            ))}
        </section>
        );
      })}
    </PageShell>
  );
}

function findHexagram(slug: string) {
  return loadHexagramSeed().find(
    (hexagram) => getHexagramSlug(hexagram.number, hexagram.title_en) === slug
  );
}
