import Link from "next/link";
import type { ReactNode } from "react";

interface MobileStageProps {
  label: string;
  children: ReactNode;
  variant?: "home" | "question" | "transition" | "ritual" | "result" | "payment" | "share";
}

export function MobileStage({ label, children, variant = "home" }: MobileStageProps) {
  return (
    <main className={`min-h-screen overflow-hidden bg-ink text-white stage-${variant}`}>
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-5 py-8">
        <div className="relative w-full max-w-[390px] rounded-[2.4rem] border border-white/10 bg-[#0a101d] p-2 shadow-2xl shadow-black/60">
          <div className="absolute inset-0 rounded-[2.4rem] bg-[radial-gradient(circle_at_50%_18%,rgba(216,178,76,0.12),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(42,78,101,0.18),transparent_44%)]" />
          <section className="relative min-h-[844px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1423]">
            <div className="flex h-16 items-center justify-between border-b border-white/5 px-6 text-xs text-mist">
              <span>9:41</span>
              <span className="tracking-[0.35em]">●●●▮</span>
            </div>
            <div className="px-6 py-5">
              <div className="mb-8 flex items-center justify-between">
                <Link className="flex items-center gap-3 font-serif text-2xl" href="/">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/70 text-gold">☉</span>
                  <span>Dao Oracle</span>
                </Link>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-mist">≡</span>
              </div>
              <p className="mb-6 text-center text-xs uppercase tracking-[0.28em] text-mist">{label}</p>
              {children}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-gold">
      <span className="h-px w-10 bg-gold" />
      {children}
    </p>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[1.4rem] border border-white/10 bg-white/[0.045] p-5 shadow-lg shadow-black/20 ${className}`}>
      {children}
    </div>
  );
}

export function PrimaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#f1cf68]"
      href={href}
    >
      {children}
    </Link>
  );
}

export function SecondaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="inline-flex w-full items-center justify-center rounded-full border border-white/12 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.16em] text-mist transition hover:border-gold hover:text-gold"
      href={href}
    >
      {children}
    </Link>
  );
}

export function HexagramMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`mx-auto grid ${compact ? "gap-1.5" : "gap-2.5"}`}>
      {Array.from({ length: 6 }).map((_, index) => (
        <span
          className={`${compact ? "h-1 w-20" : "h-1.5 w-28"} block rounded-full bg-gold shadow-[0_0_18px_rgba(216,178,76,0.34)]`}
          key={index}
        />
      ))}
    </div>
  );
}

export function CosmicGate() {
  return (
    <div className="relative mx-auto grid h-64 w-64 place-items-center">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(216,178,76,0.22)_0%,rgba(38,64,91,0.12)_36%,transparent_68%)] blur-xl" />
      <div className="absolute h-60 w-60 rounded-full border border-gold/10" />
      <div className="absolute h-48 w-48 rounded-full border border-white/10" />
      <div className="absolute h-36 w-36 rounded-full border border-gold/20" />
      <div className="absolute h-24 w-24 rounded-full bg-black shadow-[0_0_80px_rgba(216,178,76,0.28)]" />
      <div className="relative grid gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <span className="h-1 w-16 rounded-full bg-gold/80" key={index} />
        ))}
      </div>
    </div>
  );
}
