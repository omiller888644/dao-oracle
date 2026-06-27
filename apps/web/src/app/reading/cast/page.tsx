import type { Metadata } from "next";
import {
  CosmicGate,
  MobileStage,
  PrimaryCta,
  SecondaryCta
} from "@/components/mobile-flow";

export const metadata: Metadata = {
  title: "Cast Your Hexagram",
  description: "Cast six lines for a Dao Oracle reading."
};

export default function CastPage() {
  return (
    <MobileStage label="Cosmic ritual" variant="ritual">
      <div className="flex min-h-[650px] flex-col items-center justify-between text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">
            Six quiet pulses
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight">
            Let the cosmic gate breathe with the question.
          </h1>
          <p className="mt-4 text-sm leading-6 text-mist">
            The question has entered deep space. Six quiet pulses move through
            the gate before the hexagram fades in.
          </p>
        </div>
        <CosmicGate />
        <div className="grid w-full gap-3">
          <PrimaryCta href="/reading/result/demo">Reveal the Hexagram</PrimaryCta>
          <SecondaryCta href="/reading">Change Question</SecondaryCta>
        </div>
      </div>
    </MobileStage>
  );
}
