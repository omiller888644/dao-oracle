import type { CastLine } from "../readings/cast";
import type { HexagramSeed, HexagramSection } from "../hexagrams/types";

export type QuestionType =
  | "love"
  | "career"
  | "money"
  | "wellbeing"
  | "life_path"
  | "general";

export interface BuildInterpretationContextInput {
  question: string;
  questionType: QuestionType;
  hexagram: HexagramSeed;
  lines: CastLine[];
  changingLines: number[];
}

export interface InterpretationContext {
  question: string;
  questionType: QuestionType;
  lines: CastLine[];
  changingLines: number[];
  hexagram: {
    number: number;
    title: string;
    titleZh: string;
    core: string;
  };
  sections: {
    cosmic_timing: string;
    human_field: string;
    earthly_leverage: string;
    ancient_root: string;
  };
  brandBoundaries: string[];
}

export function buildInterpretationContext(
  input: BuildInterpretationContextInput
): InterpretationContext {
  return {
    question: input.question,
    questionType: input.questionType,
    lines: input.lines,
    changingLines: input.changingLines,
    hexagram: {
      number: input.hexagram.number,
      title: input.hexagram.title_en,
      titleZh: input.hexagram.title_zh,
      core: input.hexagram.core_en
    },
    sections: {
      cosmic_timing: sectionToEnglish(input.hexagram.sections.cosmic_timing),
      human_field: sectionToEnglish(input.hexagram.sections.human_field),
      earthly_leverage: sectionToEnglish(
        input.hexagram.sections.earthly_leverage
      ),
      ancient_root: sectionToEnglish(input.hexagram.sections.ancient_root)
    },
    brandBoundaries: [
      "Dao Oracle is not fortune telling.",
      "The I Ching is a system of change, not fixed destiny.",
      "Support the user's agency and judgment.",
      "Do not invent traditional text, sources, or guaranteed outcomes."
    ]
  };
}

function sectionToEnglish(section: HexagramSection): string {
  return section.paragraphs
    .map((paragraph) => paragraph.en)
    .filter((text) => text.trim().length > 0)
    .join("\n");
}
