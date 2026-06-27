export interface ReadingInterpretationOutput {
  summary: string;
  hexagram_message: string;
  timing: string;
  relationship_or_context_lens: string;
  action_steps: string[];
  reflection_question: string;
  caution: string;
  not_fortune_telling_note: string;
  source: "mock" | "openai";
}

export const interpretationJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "summary",
    "hexagram_message",
    "timing",
    "relationship_or_context_lens",
    "action_steps",
    "reflection_question",
    "caution",
    "not_fortune_telling_note"
  ],
  properties: {
    summary: { type: "string" },
    hexagram_message: { type: "string" },
    timing: { type: "string" },
    relationship_or_context_lens: { type: "string" },
    action_steps: {
      type: "array",
      minItems: 1,
      maxItems: 5,
      items: { type: "string" }
    },
    reflection_question: { type: "string" },
    caution: { type: "string" },
    not_fortune_telling_note: { type: "string" }
  }
} as const;
