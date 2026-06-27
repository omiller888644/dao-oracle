import type { Metadata } from "next";
import { CosmicGate, MobileStage, PrimaryCta } from "@/components/mobile-flow";

export const metadata: Metadata = {
  title: "Question Received",
  description: "A short Dao Oracle transition state before casting."
};

export default function TransitionPage() {
  return (
    <MobileStage label="Transition state" variant="transition">
      <div className="flex min-h-[650px] flex-col items-center justify-center gap-10 text-center">
        <CosmicGate />
        <div>
          <h1 className="font-serif text-4xl leading-tight">
            Your question has entered the oracle.
          </h1>
          <p className="mt-4 text-sm leading-6 text-mist">
            The screen darkens, the center breathes, and the reading starts to
            gather.
          </p>
        </div>
        <PrimaryCta href="/reading/cast">Continue</PrimaryCta>
      </div>
    </MobileStage>
  );
}
