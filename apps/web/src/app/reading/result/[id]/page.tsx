import type { Metadata } from "next";
import {
  HexagramMark,
  MobileStage,
  Panel,
  PrimaryCta,
  SecondaryCta
} from "@/components/mobile-flow";

export const metadata: Metadata = {
  title: "Reading Result",
  description: "A Dao Oracle reading result."
};

export default async function ReadingResultPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <MobileStage label="Reading result" variant="result">
      <div className="grid gap-4">
        <Panel>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">
            Your question
          </p>
          <p className="mt-3 text-sm leading-6 text-mist">
            What should I understand before deciding?
          </p>
        </Panel>

        <Panel className="text-center">
          <HexagramMark compact />
          <p className="mt-5 text-xs uppercase tracking-[0.26em] text-gold">
            Hexagram 2
          </p>
          <h1 className="mt-2 font-serif text-4xl">The Receptive</h1>
          <p className="mt-4 text-base leading-7 text-mist">
            Strength is not always a push. Sometimes it is a holding.
          </p>
        </Panel>

        <Panel>
          <h2 className="font-serif text-2xl">Cosmic Timing</h2>
          <p className="mt-3 text-sm leading-6 text-mist">
            This reading points to the timing around your question: what is
            opening, what is slowing down, and where force would create noise.
          </p>
        </Panel>

        <Panel>
          <h2 className="font-serif text-2xl">Human Field</h2>
          <p className="mt-3 text-sm leading-6 text-mist">
            Notice the people and expectations around this question. The useful
            relationship is the one that makes the situation clearer, not louder.
          </p>
        </Panel>

        <div className="grid gap-3">
          <PrimaryCta href="/reading/payment">Unlock Full Reading</PrimaryCta>
          <SecondaryCta href="/reading/share">Share This Reading</SecondaryCta>
        </div>
        <p className="text-center text-xs text-mist/60">Reading ID: {id}</p>
      </div>
    </MobileStage>
  );
}
