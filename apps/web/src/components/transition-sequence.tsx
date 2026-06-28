"use client";

import { useEffect, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { transitionLetters } from "@/lib/site/ui-copy";

const letterPositions = [
  { x: "-132px", y: "-126px", r: "-12deg", delay: "0ms" },
  { x: "-58px", y: "-148px", r: "8deg", delay: "90ms" },
  { x: "36px", y: "-138px", r: "-6deg", delay: "180ms" },
  { x: "124px", y: "-104px", r: "11deg", delay: "270ms" },
  { x: "-154px", y: "-34px", r: "5deg", delay: "360ms" },
  { x: "146px", y: "-18px", r: "-10deg", delay: "450ms" },
  { x: "-128px", y: "48px", r: "-4deg", delay: "540ms" },
  { x: "116px", y: "58px", r: "7deg", delay: "630ms" },
  { x: "-76px", y: "124px", r: "10deg", delay: "720ms" },
  { x: "42px", y: "138px", r: "-8deg", delay: "810ms" },
  { x: "-8px", y: "-106px", r: "4deg", delay: "900ms" },
  { x: "76px", y: "104px", r: "-5deg", delay: "990ms" },
  { x: "-150px", y: "102px", r: "9deg", delay: "1080ms" },
  { x: "148px", y: "112px", r: "-9deg", delay: "1170ms" }
];

export function TransitionSequence() {
  const router = useRouter();

  useEffect(() => {
    const redirect = window.setTimeout(() => {
      router.push("/reading/cast");
    }, 5200);

    return () => window.clearTimeout(redirect);
  }, [router]);

  return (
    <div className="flex min-h-[650px] flex-col items-center justify-center gap-9 text-center">
      <div className="letter-vortex" aria-hidden="true">
        <div className="letter-core" />
        <div className="letter-event-horizon" />
        {transitionLetters.map((letter, index) => {
          const position = letterPositions[index] ?? letterPositions[0];

          return (
            <span
              className="question-letter"
              key={`${letter}-${index}`}
              style={{
                "--letter-x": position.x,
                "--letter-y": position.y,
                "--letter-rotate": position.r,
                "--letter-delay": position.delay
              } as CSSProperties}
            >
              {letter}
            </span>
          );
        })}
      </div>
      <div className="min-h-28">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">
          Entering deep space
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight">
          Let the doubt be drawn inward.
        </h1>
        <p className="mt-4 text-sm leading-6 text-mist">
          The field receives it. The casting begins as soon as the center closes.
        </p>
      </div>
    </div>
  );
}
