import {
  Eyebrow,
  HexagramMark,
  MobileStage,
  Panel,
  PrimaryCta,
  SecondaryCta
} from "@/components/mobile-flow";

export default function HomePage() {
  return (
    <MobileStage label="Home" variant="home">
      <div className="flex min-h-[670px] flex-col justify-between">
        <div className="pt-6">
          <Eyebrow>Dao Oracle</Eyebrow>
          <h1 className="font-serif text-5xl leading-[0.95] text-white">
            Ancient I Ching guidance for modern decisions
          </h1>
          <p className="mt-6 text-base leading-7 text-mist">
            For over 3,000 years, the 64 hexagrams have served as a symbolic
            language of guidance from nature and the cosmos.
          </p>
        </div>

        <Panel className="relative overflow-hidden py-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(216,178,76,0.15),transparent_48%)]" />
          <div className="relative">
            <HexagramMark />
            <p className="mx-auto mt-6 max-w-56 text-center text-sm leading-6 text-mist">
              A quiet symbol that turns a question into a pattern of change.
            </p>
          </div>
        </Panel>

        <div className="grid gap-3 pb-2">
          <PrimaryCta href="/reading">Begin Your Reading</PrimaryCta>
          <SecondaryCta href="/dao-oracle">Learn Dao Oracle</SecondaryCta>
          <SecondaryCta href="/i-ching/origin-of-64-hexagrams">
            The Origin of the 64 Hexagrams
          </SecondaryCta>
        </div>
      </div>
    </MobileStage>
  );
}
