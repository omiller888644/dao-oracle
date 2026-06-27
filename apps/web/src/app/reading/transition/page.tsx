import type { Metadata } from "next";
import { MobileStage } from "@/components/mobile-flow";
import { TransitionSequence } from "@/components/transition-sequence";

export const metadata: Metadata = {
  title: "Question Received",
  description: "A short Dao Oracle transition state before casting."
};

export default function TransitionPage() {
  return (
    <MobileStage label="Transition state" variant="transition">
      <TransitionSequence />
    </MobileStage>
  );
}
