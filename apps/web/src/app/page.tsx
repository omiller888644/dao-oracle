import Link from "next/link";

const highlights = [
  "I Ching guidance",
  "64 hexagrams",
  "Reflection before decisions"
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-12">
        <nav className="flex items-center justify-between text-sm text-mist">
          <Link className="font-serif text-xl text-white" href="/">
            Dao Oracle
          </Link>
          <Link
            className="rounded-full border border-white/15 px-4 py-2 text-white/85 transition hover:border-gold hover:text-gold"
            href="/dao-oracle"
          >
            Learn Dao Oracle
          </Link>
        </nav>

        <div className="grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              <span className="h-px w-10 bg-gold" />
              Dao Oracle
            </p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] text-white sm:text-7xl">
              Ancient I Ching guidance for modern decisions
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-mist">
              Ask a real question, cast six lines, and receive a reflective
              reading grounded in the 64 hexagrams. Dao Oracle is designed for
              clarity, timing, and personal agency, not fixed predictions.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#f1cf68]"
                href="/reading"
              >
                Begin Your Reading
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-gold hover:text-gold"
                href="/i-ching/origin-of-64-hexagrams"
              >
                The Origin of the 64 Hexagrams
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[9/16] w-full max-w-sm rounded-[2rem] border border-white/10 bg-night p-6 shadow-2xl shadow-black/40">
            <div className="absolute inset-6 rounded-full border border-gold/10" />
            <div className="relative flex h-full flex-col items-center justify-center gap-8 text-center">
              <div className="space-y-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span
                    className="mx-auto block h-1 w-28 rounded-full bg-gold"
                    key={index}
                  />
                ))}
              </div>
              <p className="font-serif text-4xl text-gold">64</p>
              <p className="max-w-xs text-sm leading-6 text-mist">
                A symbolic language of change, translated for relationships,
                work, timing, and the next step.
              </p>
            </div>
          </div>
        </div>

        <ul className="grid gap-3 border-t border-white/10 pt-6 text-sm text-mist sm:grid-cols-3">
          {highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
