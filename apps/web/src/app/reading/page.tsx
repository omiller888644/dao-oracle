import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Begin Your Reading",
  description: "Ask a clear question before casting a Dao Oracle reading."
};

export default function ReadingPage() {
  return (
    <PageShell
      title="Begin your reading"
      description="Start with a real question. Dao Oracle works best when you ask about a pattern, a decision, or the next step rather than a fixed prediction."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <form className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <label className="block text-sm font-semibold text-white" htmlFor="question">
            Your question
          </label>
          <textarea
            className="mt-3 min-h-40 w-full rounded-xl border border-white/10 bg-black/20 p-4 text-base text-white outline-none ring-0 placeholder:text-mist/60 focus:border-gold"
            id="question"
            name="question"
            placeholder="What should I understand before making this decision?"
          />
          <label className="mt-6 block text-sm font-semibold text-white" htmlFor="questionType">
            Question type
          </label>
          <select
            className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 p-4 text-white outline-none focus:border-gold"
            id="questionType"
            name="questionType"
          >
            <option value="general">General</option>
            <option value="love">Love</option>
            <option value="career">Career</option>
            <option value="money">Money</option>
            <option value="wellbeing">Wellbeing</option>
            <option value="life_path">Life Path</option>
          </select>
          <Link
            className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black"
            href="/reading/cast"
          >
            Continue to Cast
          </Link>
        </form>
        <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2>Ask for clarity, not control</h2>
          <p>
            Strong questions usually begin with what, how, where, or what should
            I understand. Avoid asking for a guaranteed outcome.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
