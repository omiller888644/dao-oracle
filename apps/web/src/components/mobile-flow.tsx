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
            {(variant === "transition" || variant === "ritual") ? (
              <StarField />
            ) : null}
            <div className="flex h-16 items-center justify-between border-b border-white/5 px-6 text-xs text-mist">
              <span>9:41</span>
              <span className="tracking-[0.35em]">●●●▮</span>
            </div>
            <div className="relative z-10 px-6 py-5">
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

function StarField() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(24,37,64,0.28),transparent_34%),radial-gradient(circle_at_50%_72%,rgba(216,178,76,0.1),transparent_42%),linear-gradient(180deg,#040711_0%,#08101f_52%,#02030a_100%)]" />
      <div className="star-layer star-layer-a" />
      <div className="star-layer star-layer-b" />
      <div className="star-dust" />
      <div className="absolute inset-x-10 top-28 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
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

export function CosmicGate({
  active = false,
  reveal = false,
  pulseKey = 0
}: {
  active?: boolean;
  reveal?: boolean;
  pulseKey?: number;
}) {
  return (
    <div className={`cosmic-gate relative mx-auto grid h-72 w-72 place-items-center ${active ? "is-active" : ""}`}>
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(216,178,76,0.24)_0%,rgba(38,64,91,0.13)_34%,transparent_66%)] blur-xl" />
      <div className="gate-ring gate-ring-one" />
      <div className="gate-ring gate-ring-two" />
      <div className="gate-ring gate-ring-three" />
      <div className="gate-pulse" key={pulseKey} />
      <div className="absolute h-28 w-28 rounded-full bg-black shadow-[0_0_95px_rgba(216,178,76,0.28),inset_0_0_28px_rgba(255,255,255,0.05)]" />
      <div className={`relative grid gap-2 transition-all duration-700 ${reveal ? "scale-100 opacity-100" : "scale-90 opacity-55"}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <span className="h-1 w-16 rounded-full bg-gold/80" key={index} />
        ))}
      </div>
    </div>
  );
}
