"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CosmicGate } from "@/components/mobile-flow";
import {
  RITUAL_PULSE_COUNT,
  getAutoCastFrame,
  getRitualProgress,
} from "@/lib/readings/ritual-state";
import type { CastLine } from "@/lib/readings/cast";

const linePattern: CastLine[] = [7, 8, 7, 8, 9, 7];

export function CastRitual() {
  const [frameCount, setFrameCount] = useState(0);
  const router = useRouter();
  const autoFrame = getAutoCastFrame(frameCount);
  const progress = getRitualProgress(autoFrame.completedLines);
  const visibleLines = useMemo(
    () => linePattern.slice(0, autoFrame.completedLines),
    [autoFrame.completedLines]
  );
  const transientLine = linePattern[autoFrame.visibleLineIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrameCount((current) =>
        current >= RITUAL_PULSE_COUNT + 2 ? current : current + 1
      );
    }, 900);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!autoFrame.shouldRedirect) {
      return;
    }

    const redirect = window.setTimeout(() => {
      router.push("/reading/result/demo");
    }, 1100);

    return () => window.clearTimeout(redirect);
  }, [autoFrame.shouldRedirect, router]);

  return (
    <div className="flex min-h-[650px] flex-col items-center justify-between text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-gold">
          {progress.count} / {RITUAL_PULSE_COUNT} pulses
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight">
          The oracle is casting.
        </h1>
        <p className="mt-4 text-sm leading-6 text-mist">
          Six lines rise from the center one by one. When the final pattern
          gathers, the reading opens.
        </p>
      </div>

      <div className="relative my-3">
        <CosmicCore pulseKey={autoFrame.completedLines} />
        {!autoFrame.finalHexagramVisible && transientLine ? (
          <LineFromCore line={transientLine} key={autoFrame.completedLines} />
        ) : null}
        {autoFrame.finalHexagramVisible ? (
          <div className="final-hexagram">
            <HexagramLines lines={visibleLines} />
          </div>
        ) : null}
      </div>

      <div className="w-full rounded-2xl border border-white/10 bg-black/15 p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-mist">
          {autoFrame.finalHexagramVisible ? "Hexagram gathered" : "Casting from center"}
        </p>
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gold transition-all duration-500"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function CosmicCore({ pulseKey }: { pulseKey: number }) {
  return (
    <div className="cosmic-core relative mx-auto grid h-72 w-72 place-items-center">
      <div className="core-aura" />
      <div className="core-orbit core-orbit-one" />
      <div className="core-orbit core-orbit-two" />
      <div className="core-light" key={pulseKey} />
    </div>
  );
}

function LineFromCore({ line }: { line: CastLine }) {
  const isYang = line === 7 || line === 9;

  return (
    <div className="casting-line">
      <SingleLine isYang={isYang} />
    </div>
  );
}

function HexagramLines({ lines }: { lines: readonly CastLine[] }) {
  return (
    <div className="grid gap-2">
      {lines.map((line, index) => (
        <SingleLine isYang={line === 7 || line === 9} key={`${line}-${index}`} />
      ))}
    </div>
  );
}

function SingleLine({ isYang }: { isYang: boolean }) {
  return (
    <span className="block h-1.5 w-24 rounded-full bg-gold shadow-[0_0_18px_rgba(216,178,76,0.4)]">
      {!isYang ? (
        <span className="mx-auto block h-1.5 w-6 rounded-full bg-[#0b1220]" />
      ) : null}
    </span>
  );
}
