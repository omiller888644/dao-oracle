import Link from "next/link";
import { HexagramMark, MobileStage, PrimaryCta } from "@/components/mobile-flow";
import { homeActions } from "@/lib/site/ui-copy";

export default function HomePage() {
  const primaryAction = homeActions.find((action) => action.variant === "primary");
  const textActions = homeActions.filter((action) => action.variant === "text");

  return (
    <MobileStage label="Home" variant="home">
      <div className="flex min-h-[670px] flex-col justify-between">
        <div className="pt-8">
          <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            <span className="h-px w-10 bg-gold" />
            Dao Oracle
          </p>
          <h1 className="home-title max-w-[19rem] font-serif text-[2.95rem] leading-[1.02] text-white">
            Ancient I Ching guidance for modern decisions
          </h1>
          <p className="mt-7 max-w-[18rem] text-base leading-7 text-mist">
            The 64 hexagrams are an ancient symbolic language for timing,
            reflection, and the next honest step.
          </p>
        </div>

        <div className="relative py-8">
          <div className="absolute inset-x-6 top-1/2 h-40 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(216,178,76,0.12),transparent_62%)] blur-xl" />
          <HexagramMark compact />
        </div>

        <div className="pb-5">
          {primaryAction ? (
            <PrimaryCta href={primaryAction.href}>{primaryAction.label}</PrimaryCta>
          ) : null}
          <div className="mt-7 grid gap-4 text-center">
            {textActions.map((action) => (
              <Link
                className="text-sm italic text-mist transition hover:text-gold"
                href={action.href}
                key={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MobileStage>
  );
}
