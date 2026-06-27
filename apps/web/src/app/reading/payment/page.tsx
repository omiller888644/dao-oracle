import type { Metadata } from "next";
import { MobileStage, Panel, PrimaryCta, SecondaryCta } from "@/components/mobile-flow";

export const metadata: Metadata = {
  title: "Unlock Full Reading",
  description: "Unlock a full Dao Oracle reading map."
};

const unlockItems = [
  "A deeper answer to your exact question",
  "Timing, human field, and practical leverage",
  "A small ritual for today",
  "A reflection question to return to"
];

export default function PaymentPage() {
  return (
    <MobileStage label="Payment detail" variant="payment">
      <div className="grid gap-5">
        <Panel>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Full reading
          </p>
          <h1 className="mt-3 font-serif text-4xl">Unlock the full map</h1>
          <p className="mt-4 text-sm leading-6 text-mist">
            The full reading turns the symbol into a practical map for your
            question, without turning it into a fixed prediction.
          </p>
        </Panel>

        <Panel>
          <p className="font-serif text-5xl text-gold">$4.90</p>
          <h2 className="mt-5 font-serif text-2xl">What you unlock</h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-mist">
            {unlockItems.map((item) => (
              <li className="flex gap-3" key={item}>
                <span className="text-gold">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <PrimaryCta href="/reading/result/demo">Unlock Reading</PrimaryCta>
        <SecondaryCta href="/reading/result/demo">Back to Result</SecondaryCta>
      </div>
    </MobileStage>
  );
}
