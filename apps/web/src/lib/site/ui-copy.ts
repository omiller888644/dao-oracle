export interface HomeAction {
  label: string;
  href: string;
  variant: "primary" | "text";
}

export interface QuestionDirection {
  value: "love" | "career" | "money" | "wellbeing" | "life_path";
  label: string;
  prompt: string;
}

export const homeActions: HomeAction[] = [
  {
    label: "Begin Your Reading",
    href: "/reading",
    variant: "primary"
  },
  {
    label: "Learn Dao Oracle",
    href: "/dao-oracle",
    variant: "text"
  },
  {
    label: "The Origin of the 64 Hexagrams",
    href: "/i-ching/origin-of-64-hexagrams",
    variant: "text"
  }
];

export const questionDirections: QuestionDirection[] = [
  {
    value: "love",
    label: "Love",
    prompt: "Relationship pattern"
  },
  {
    value: "career",
    label: "Career",
    prompt: "Timing and direction"
  },
  {
    value: "money",
    label: "Money",
    prompt: "Resources and risk"
  },
  {
    value: "wellbeing",
    label: "Wellbeing",
    prompt: "Energy and balance"
  },
  {
    value: "life_path",
    label: "Life Path",
    prompt: "Meaning and next step"
  }
];

export const transitionLetters = "YOURCONFUSION?".split("");
