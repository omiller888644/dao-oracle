"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { CosmicGate } from "@/components/mobile-flow";
import {
  buildQuestionFragments,
  currentQuestionStorageKey,
  transitionFragments
} from "@/lib/site/ui-copy";

const messages = [
  "Your confusion enters the field.",
  "The center begins to breathe.",
  "The question is gathering in deep space."
];

const fragmentPositions = [
  { x: "-112px", y: "-116px", r: "-7deg", delay: "0ms" },
  { x: "84px", y: "-86px", r: "5deg", delay: "300ms" },
  { x: "-128px", y: "34px", r: "4deg", delay: "600ms" },
  { x: "104px", y: "54px", r: "-5deg", delay: "900ms" },
  { x: "-24px", y: "124px", r: "2deg", delay: "1200ms" }
];

export function TransitionSequence() {
  const [step, setStep] = useState(0);
  const [fragments, setFragments] = useState(transitionFragments);
  const router = useRouter();

  useEffect(() => {
    const savedQuestion = window.localStorage.getItem(currentQuestionStorageKey);

    if (savedQuestion?.trim()) {
      setFragments(buildQuestionFragments(savedQuestion));
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => Math.min(current + 1, messages.length - 1));
    }, 1650);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const redirect = window.setTimeout(() => {
      router.push("/reading/cast");
    }, 6200);

    return () => window.clearTimeout(redirect);
  }, [router]);

  return (
    <div className="flex min-h-[650px] flex-col items-center justify-center gap-9 text-center">
      <div className="relative">
        <div className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(216,178,76,0.18),transparent_58%)] blur-2xl" />
        <div aria-hidden="true" className="question-fragments">
          {fragments.map((fragment, index) => {
            const position = fragmentPositions[index] ?? fragmentPositions[0];

            return (
              <span
                className="question-fragment"
                key={`${fragment}-${index}`}
                style={{
                  "--fragment-x": position.x,
                  "--fragment-y": position.y,
                  "--fragment-rotate": position.r,
                  "--fragment-delay": position.delay
                } as CSSProperties}
              >
                {fragment}
              </span>
            );
          })}
        </div>
        <CosmicGate active reveal={step >= 2} />
      </div>
      <div className="min-h-36">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">
          Receiving
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight transition-opacity duration-700">
          {messages[step]}
        </h1>
        <p className="mt-4 text-sm leading-6 text-mist">
          The star field opens softly, and the words you carried move inward
          until only the pattern remains.
        </p>
      </div>
      <p className="text-xs uppercase tracking-[0.28em] text-mist">
        Connecting to the field
      </p>
    </div>
  );
}
