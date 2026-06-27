import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

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
    <PageShell
      title="Your reading result"
      description="A saved reading will combine your question, the cast hexagram, and a grounded AI interpretation."
    >
      <p>Reading ID: {id}</p>
      <h2>What will appear here</h2>
      <p>
        The result page will show the fixed hexagram message, personalized
        context, action steps, a reflection question, and a reminder that Dao
        Oracle supports judgment rather than replacing it.
      </p>
    </PageShell>
  );
}
