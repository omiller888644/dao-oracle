"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CosmicGate, SecondaryCta } from "@/components/mobile-flow";
import {
  RITUAL_PULSE_COUNT,
  getRitualProgress,
  isRitualComplete
} from "@/lib/readings/ritual-state";
import type { CastLine } from "@/lib/readings/cast";

const linePattern: CastLine[] = [7, 8, 7, 8, 9, 7];

export function CastRitual() {
  const [pulseCount, setPulseCount] = useState(0);
  const progress = getRitualProgress(pulseCount);
  const complete = isRitualComplete(pulseCount);
  const visibleLines = useMemo(
    () => linePattern.slice(0, progress.count),
    [progress.count]
  );

  return (
    <div className="flex min-h-[650px] flex-col items-center justify-between text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-gold">
          {progress.count} / {RITUAL_PULSE_COUNT} pulses
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight">
          Let the cosmic gate breathe with the question.
        </h1>
        <p className="mt-4 text-sm leading-6 text-mist">
          Tap the gate six times. Each pulse settles into one line of the
          hexagram before the answer appears.
        </p>
      </div>

      <button
        aria-label="Cast one line"
        className="group relative my-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-gold"
        disabled={complete}
        onClick={() =>
          setPulseCount((current) =>
            Math.min(current + 1, RITUAL_PULSE_COUNT)
          )
        }
        type="button"
      >
        <CosmicGate active reveal={complete} pulseKey={progress.count} />
        <span className="absolute inset-x-0 bottom-8 mx-auto w-fit rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs uppercase tracking-[0.18em] text-mist backdrop-blur">
          {complete ? "Hexagram gathered" : "Tap to cast"}
        </span>
      </button>

      <div className="min-h-24 w-full rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="mx-auto grid w-32 gap-2">
          {Array.from({ length: RITUAL_PULSE_COUNT }).map((_, index) => {
            const line = visibleLines[index];
            const isChanging = line === 6 || line === 9;
            const isYang = line === 7 || line === 9;

            return (
              <span
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  line
                    ? "bg-gold opacity-100 shadow-[0_0_16px_rgba(216,178,76,0.35)]"
                    : "bg-white/10 opacity-40"
                } ${isChanging ? "ring-2 ring-gold/30" : ""}`}
                key={index}
              >
                {line && !isYang ? (
                  <span className="mx-auto block h-1.5 w-5 rounded-full bg-[#0d1423]" />
                ) : null}
              </span>
            );
          })}
        </div>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>

      <div className="grid w-full gap-3">
        <Link
          aria-disabled={!complete}
          className={`inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] transition ${
            complete
              ? "bg-gold text-black hover:bg-[#f1cf68]"
              : "pointer-events-none bg-white/10 text-white/35"
          }`}
          href="/reading/result/demo"
        >
          Reveal the Hexagram
        </Link>
        <SecondaryCta href="/reading">Change Question</SecondaryCta>
      </div>
    </div>
  );
}
