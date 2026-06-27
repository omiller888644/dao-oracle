import type { Metadata } from "next";
import { CastRitual } from "@/components/cast-ritual";
import { MobileStage } from "@/components/mobile-flow";

export const metadata: Metadata = {
  title: "Cast Your Hexagram",
  description: "Cast six lines for a Dao Oracle reading."
};

export default function CastPage() {
  return (
    <MobileStage label="Cosmic ritual" variant="ritual">
      <CastRitual />
    </MobileStage>
  );
}
