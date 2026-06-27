import { readFileSync } from "node:fs";
import path from "node:path";
import {
  REQUIRED_SECTION_KEYS,
  type HexagramSeed,
  type HexagramSection
} from "./types";

const DEFAULT_SOURCE_PATH = path.resolve(
  process.cwd(),
  "../../outputs/hexagram_content/dao_oracle_64_hexagrams_database_ready.jsonl"
);

export function loadHexagramSeed(sourcePath = DEFAULT_SOURCE_PATH): HexagramSeed[] {
  const raw = readFileSync(sourcePath, "utf8");
  const records = raw
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line, index) => parseHexagramLine(line, index + 1));

  validateSeedSet(records);

  return records;
}

function parseHexagramLine(line: string, lineNumber: number): HexagramSeed {
  let parsed: unknown;

  try {
    parsed = JSON.parse(line);
  } catch (error) {
    throw new Error(`Invalid JSON on hexagram seed line ${lineNumber}`, {
      cause: error
    });
  }

  assertHexagramSeed(parsed, lineNumber);
  return parsed;
}

function assertHexagramSeed(
  value: unknown,
  lineNumber: number
): asserts value is HexagramSeed {
  if (!isRecord(value)) {
    throw new Error(`Hexagram seed line ${lineNumber} is not an object`);
  }

  if (!Number.isInteger(value.number)) {
    throw new Error(`Hexagram seed line ${lineNumber} is missing number`);
  }

  for (const key of ["title_en", "title_zh", "core_en", "core_zh"] as const) {
    if (typeof value[key] !== "string" || value[key].trim().length === 0) {
      throw new Error(`Hexagram ${value.number} is missing ${key}`);
    }
  }

  if (!isRecord(value.sections)) {
    throw new Error(`Hexagram ${value.number} is missing sections`);
  }

  for (const sectionKey of REQUIRED_SECTION_KEYS) {
    const section = value.sections[sectionKey];

    if (!isHexagramSection(section)) {
      throw new Error(`Hexagram ${value.number} has invalid ${sectionKey}`);
    }
  }

  if (!isRecord(value.question_lens)) {
    throw new Error(`Hexagram ${value.number} is missing question_lens`);
  }
}

function validateSeedSet(records: HexagramSeed[]) {
  if (records.length !== 64) {
    throw new Error(`Expected 64 hexagrams, received ${records.length}`);
  }

  const numbers = new Set<number>();

  for (const record of records) {
    if (record.number < 1 || record.number > 64) {
      throw new Error(`Hexagram number ${record.number} is outside 1-64`);
    }

    if (numbers.has(record.number)) {
      throw new Error(`Duplicate hexagram number ${record.number}`);
    }

    numbers.add(record.number);
  }
}

function isHexagramSection(value: unknown): value is HexagramSection {
  return (
    isRecord(value) &&
    typeof value.title_en === "string" &&
    value.title_en.trim().length > 0 &&
    typeof value.title_zh === "string" &&
    value.title_zh.trim().length > 0 &&
    Array.isArray(value.paragraphs)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
