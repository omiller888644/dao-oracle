import type { Metadata } from "next";
import { MobileStage } from "@/components/mobile-flow";
import { QuestionForm } from "@/components/question-form";

export const metadata: Metadata = {
  title: "Begin Your Reading",
  description: "Ask a clear question before casting a Dao Oracle reading."
};

export default function ReadingPage() {
  return (
    <MobileStage label="Question page" variant="question">
      <QuestionForm />
    </MobileStage>
  );
}
