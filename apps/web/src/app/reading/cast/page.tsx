import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Cast Your Hexagram",
  description: "Cast six lines for a Dao Oracle reading."
};

export default function CastPage() {
  return (
    <PageShell
      title="Cast six lines"
      description="The first build uses a stable test flow. The production interaction will use the cosmic gate animation from the approved visual direction."
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <div className="mx-auto mb-8 flex max-w-xs flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <span className="h-2 rounded-full bg-gold" key={index} />
          ))}
        </div>
        <p>
          This page is wired for the reading flow. Interactive casting and saved
          results will connect to the API as the next implementation layer.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full border border-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold"
          href="/reading/result/demo"
        >
          View Demo Result
        </Link>
      </div>
    </PageShell>
  );
}
