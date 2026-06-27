import type { Metadata } from "next";
import {
  Eyebrow,
  MobileStage,
  Panel,
  PrimaryCta
} from "@/components/mobile-flow";

export const metadata: Metadata = {
  title: "Begin Your Reading",
  description: "Ask a clear question before casting a Dao Oracle reading."
};

const questionTypes = ["Love", "Career", "Money", "Wellbeing", "Life Path"];

export default function ReadingPage() {
  return (
    <MobileStage label="Question page" variant="question">
      <div className="grid gap-5">
        <Panel>
          <Eyebrow>Your present question</Eyebrow>
          <h1 className="font-serif text-4xl leading-tight">
            What question are you carrying?
          </h1>
          <p className="mt-4 text-sm leading-6 text-mist">
            Write the question as it lives in you now. The clearer the question,
            the more precise the reading can become.
          </p>
        </Panel>

        <Panel>
          <label className="text-xs uppercase tracking-[0.22em] text-gold" htmlFor="question">
            Current question
          </label>
          <textarea
            className="mt-4 min-h-44 w-full resize-none rounded-2xl border border-white/10 bg-black/25 p-4 text-base leading-7 text-white outline-none placeholder:text-mist/50 focus:border-gold"
            id="question"
            placeholder="Example: I feel torn between staying where I am and choosing a new path. What should I understand before deciding?"
          />
          <div className="mt-5 flex flex-wrap gap-2">
            {questionTypes.map((type) => (
              <span
                className="rounded-full border border-white/10 px-3 py-2 text-xs text-mist"
                key={type}
              >
                {type}
              </span>
            ))}
          </div>
        </Panel>

        <PrimaryCta href="/reading/transition">Enter the Oracle</PrimaryCta>
      </div>
    </MobileStage>
  );
}
