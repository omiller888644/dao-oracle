import { NextResponse } from "next/server";
import { loadHexagramSeed } from "@/lib/hexagrams/load-source";
import { normalizeCast } from "@/lib/readings/cast";
import type { QuestionType } from "@/lib/ai/build-context";

const questionTypes = new Set<QuestionType>([
  "love",
  "career",
  "money",
  "wellbeing",
  "life_path",
  "general"
]);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      question?: unknown;
      questionType?: unknown;
      lines?: unknown;
    };

    const question = validateQuestion(body.question);
    const questionType = validateQuestionType(body.questionType);
    const cast = normalizeCast(body.lines);
    const hexagram = loadHexagramSeed().find(
      (record) => record.number === cast.hexagramNumber
    );

    if (!hexagram) {
      return NextResponse.json(
        { error: "Unable to resolve hexagram." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: crypto.randomUUID(),
      question,
      questionType,
      hexagramNumber: cast.hexagramNumber,
      hexagramTitle: hexagram.title_en,
      lines: cast.lines,
      changingLines: cast.changingLines,
      persistence: "mock"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Invalid reading." },
      { status: 400 }
    );
  }
}

function validateQuestion(value: unknown): string {
  if (typeof value !== "string") {
    throw new Error("Question is required.");
  }

  const question = value.trim();

  if (question.length < 20 || question.length > 800) {
    throw new Error("Question must be between 20 and 800 characters.");
  }

  return question;
}

function validateQuestionType(value: unknown): QuestionType {
  if (typeof value !== "string" || !questionTypes.has(value as QuestionType)) {
    throw new Error("Invalid question type.");
  }

  return value as QuestionType;
}
