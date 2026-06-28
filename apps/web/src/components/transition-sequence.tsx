"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CosmicGate } from "@/components/mobile-flow";

const messages = [
  "Your question has entered the oracle.",
  "The center begins to breathe.",
  "The reading is gathering in deep space."
];

export function TransitionSequence() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => Math.min(current + 1, messages.length - 1));
    }, 1400);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const redirect = window.setTimeout(() => {
      router.push("/reading/cast");
    }, 4600);

    return () => window.clearTimeout(redirect);
  }, [router]);

  return (
    <div className="flex min-h-[650px] flex-col items-center justify-center gap-9 text-center">
      <div className="relative">
        <div className="absolute -inset-12 rounded-full bg-[radial-gradient(circle,rgba(216,178,76,0.18),transparent_58%)] blur-2xl" />
        <div className="question-comet" />
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
          The screen darkens, the star field opens, and the question moves
          toward the casting gate.
        </p>
      </div>
      <p className="text-xs uppercase tracking-[0.28em] text-mist">
        Connecting to the field
      </p>
    </div>
  );
}
