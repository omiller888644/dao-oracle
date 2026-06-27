import Link from "next/link";
import type { ReactNode } from "react";

interface PageShellProps {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function PageShell({
  eyebrow = "Dao Oracle",
  title,
  description,
  children
}: PageShellProps) {
  return (
    <main className="min-h-screen bg-ink text-white">
      <div className="mx-auto w-full max-w-5xl px-6 py-8 sm:px-10 lg:px-12">
        <nav className="mb-16 flex items-center justify-between text-sm text-mist">
          <Link className="font-serif text-xl text-white" href="/">
            Dao Oracle
          </Link>
          <Link
            className="rounded-full border border-white/15 px-4 py-2 text-white/85 transition hover:border-gold hover:text-gold"
            href="/reading"
          >
            Begin Your Reading
          </Link>
        </nav>
        <header className="mb-12 max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" />
            {eyebrow}
          </p>
          <h1 className="font-serif text-5xl leading-tight text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-mist">{description}</p>
        </header>
        <div className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-mist prose-a:text-gold">
          {children}
        </div>
      </div>
    </main>
  );
}
