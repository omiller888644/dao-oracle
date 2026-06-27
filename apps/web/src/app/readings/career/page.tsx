import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "I Ching Career Reading",
  description: "Reflect on timing, change, and work decisions with Dao Oracle."
};

export default function CareerReadingPage() {
  return (
    <PageShell
      title="I Ching career reading"
      description="Use a career reading to reflect on timing, change, leadership, conflict, and the next grounded move."
    >
      <p>
        A career reading should not replace practical planning. It can help you
        identify the pattern around a decision, the leverage available now, and
        the action that deserves your attention first.
      </p>
    </PageShell>
  );
}
