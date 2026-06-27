import type { Metadata } from "next";
import { HexagramMark, MobileStage, Panel, SecondaryCta } from "@/components/mobile-flow";

export const metadata: Metadata = {
  title: "Share Reading",
  description: "Share a Dao Oracle reading card."
};

export default function SharePage() {
  return (
    <MobileStage label="Share page" variant="share">
      <div className="grid gap-5">
        <Panel>
          <h1 className="font-serif text-4xl">A card to carry the message.</h1>
          <p className="mt-4 text-sm leading-6 text-mist">
            A clean share card makes the reading feel complete and social
            without losing the ritual tone.
          </p>
        </Panel>

        <div className="rounded-[1.8rem] border border-gold/25 bg-[#111827] p-8 text-center shadow-2xl shadow-black/30">
          <HexagramMark compact />
          <p className="mt-6 text-xs uppercase tracking-[0.26em] text-gold">
            Hexagram 2
          </p>
          <h2 className="mt-3 font-serif text-4xl">The Receptive</h2>
          <p className="mt-5 text-sm leading-6 text-mist">
            Strength is not always a push. Sometimes it is a holding.
          </p>
          <p className="mt-8 text-xs text-mist/60">
            Dao Oracle · one of 64 signs of guidance
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["Copy", "Save", "Share"].map((action) => (
            <button
              className="rounded-full border border-white/10 px-3 py-3 text-xs uppercase tracking-[0.16em] text-mist"
              key={action}
              type="button"
            >
              {action}
            </button>
          ))}
        </div>
        <SecondaryCta href="/reading/result/demo">Back to Result</SecondaryCta>
      </div>
    </MobileStage>
  );
}
