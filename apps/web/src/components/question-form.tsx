"use client";

import { useState } from "react";
import { PrimaryCta } from "@/components/mobile-flow";
import { questionDirections } from "@/lib/site/ui-copy";

export function QuestionForm() {
  const [selected, setSelected] = useState("career");

  return (
    <div className="flex min-h-[650px] flex-col justify-between">
      <div className="pt-4">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">
          Your present question
        </p>
        <h1 className="mt-4 font-serif text-[2.65rem] leading-[1.02] text-white">
          Let the question take shape.
        </h1>
        <p className="mt-5 max-w-[18rem] text-sm leading-6 text-mist">
          Write what you are actually carrying. Then choose the field of life
          this question belongs to.
        </p>
      </div>

      <div className="relative my-6">
        <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_50%_0%,rgba(216,178,76,0.08),transparent_52%)]" />
        <textarea
          className="relative min-h-52 w-full resize-none rounded-[1.6rem] border border-white/10 bg-black/20 p-5 text-base leading-7 text-white outline-none placeholder:text-mist/45 focus:border-gold"
          placeholder="Example: I feel torn between staying where I am and choosing a new path. What should I understand before deciding?"
        />
      </div>

      <div>
        <div className="grid grid-cols-2 gap-3">
          {questionDirections.map((direction, index) => {
            const active = selected === direction.value;
            const wide = index === questionDirections.length - 1;

            return (
              <button
                className={`rounded-2xl border px-4 py-4 text-left transition ${
                  wide ? "col-span-2" : ""
                } ${
                  active
                    ? "border-gold bg-gold/12 text-white shadow-[0_0_24px_rgba(216,178,76,0.14)]"
                    : "border-white/10 bg-white/[0.035] text-mist hover:border-gold/60"
                }`}
                key={direction.value}
                onClick={() => setSelected(direction.value)}
                type="button"
              >
                <span className="block text-sm font-semibold">{direction.label}</span>
                <span className="mt-1 block text-xs text-mist">{direction.prompt}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          <PrimaryCta href="/reading/transition">Enter the Oracle</PrimaryCta>
        </div>
      </div>
    </div>
  );
}
