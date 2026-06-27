import { NextResponse } from "next/server";
import { buildInterpretationContext } from "@/lib/ai/build-context";
import type { QuestionType } from "@/lib/ai/build-context";
import type { ReadingInterpretationOutput } from "@/lib/ai/interpretation-schema";
import { loadHexagramSeed } from "@/lib/hexagrams/load-source";
import { normalizeCastLines, getChangingLinePositions } from "@/lib/readings/cast";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      question?: string;
      questionType?: QuestionType;
      hexagramNumber?: number;
      lines?: unknown;
    };

    const lines = normalizeCastLines(body.lines);
    const hexagram = loadHexagramSeed().find(
      (record) => record.number === body.hexagramNumber
    );

    if (!body.question || !body.questionType || !hexagram) {
      return NextResponse.json(
        { error: "Question, question type, and hexagram are required." },
        { status: 400 }
      );
    }

    const context = buildInterpretationContext({
      question: body.question,
      questionType: body.questionType,
      hexagram,
      lines,
      changingLines: getChangingLinePositions(lines)
    });

    const output = createDevelopmentInterpretation(context);

    return NextResponse.json({
      context,
      output
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate interpretation."
      },
      { status: 400 }
    );
  }
}

function createDevelopmentInterpretation(context: {
  question: string;
  questionType: QuestionType;
  hexagram: { title: string; core: string };
  sections: { cosmic_timing: string; earthly_leverage: string };
}): ReadingInterpretationOutput {
  return {
    summary: `${context.hexagram.title} speaks to ${context.questionType} through timing, pattern, and agency.`,
    hexagram_message: context.hexagram.core,
    timing: firstSentence(context.sections.cosmic_timing),
    relationship_or_context_lens: `For this question, read the hexagram as a mirror for the pattern around your next decision, not as a fixed prediction.`,
    action_steps: [
      firstSentence(context.sections.earthly_leverage),
      "Name the choice that is actually yours to make.",
      "Take one grounded action before asking for another sign."
    ],
    reflection_question:
      "What would become clearer if you stopped asking for certainty and asked for the next honest step?",
    caution:
      "Do not use this reading to avoid practical judgment, consent, professional advice, or direct communication.",
    not_fortune_telling_note:
      "Dao Oracle offers symbolic guidance for reflection; it does not decide your future for you.",
    source: "mock"
  };
}

function firstSentence(text: string): string {
  return text.split(/(?<=\.)\s+/)[0] ?? text;
}
