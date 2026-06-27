export type HexagramParagraphType = "pair" | "zh" | "label";

export interface HexagramParagraph {
  type: HexagramParagraphType;
  en: string;
  zh: string;
}

export interface HexagramSection {
  title_en: string;
  title_zh: string;
  paragraphs: HexagramParagraph[];
}

export interface HexagramSections {
  cosmic_timing: HexagramSection;
  human_field: HexagramSection;
  earthly_leverage: HexagramSection;
  ancient_root: HexagramSection;
}

export interface HexagramQuestionLens {
  love: string | null;
  career: string | null;
  money: string | null;
  wellbeing: string | null;
  life_path: string | null;
}

export interface HexagramSeed {
  number: number;
  title_en: string;
  title_zh: string;
  core_en: string;
  core_zh: string;
  sections: HexagramSections;
  question_lens: HexagramQuestionLens;
}

export const REQUIRED_SECTION_KEYS = [
  "cosmic_timing",
  "human_field",
  "earthly_leverage",
  "ancient_root"
] as const;
