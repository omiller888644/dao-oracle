import { readFileSync } from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.resolve(
      process.cwd(),
      "../../outputs/hexagram_content/dao_oracle_64_hexagrams_database_ready.jsonl"
    );

const requiredSections = [
  "cosmic_timing",
  "human_field",
  "earthly_leverage",
  "ancient_root"
];

const records = readFileSync(sourcePath, "utf8")
  .split(/\r?\n/)
  .filter((line) => line.trim().length > 0)
  .map((line, index) => {
    try {
      return JSON.parse(line);
    } catch (error) {
      throw new Error(`Invalid JSON on line ${index + 1}: ${error.message}`);
    }
  });

if (records.length !== 64) {
  throw new Error(`Expected 64 hexagrams, received ${records.length}`);
}

const numbers = new Set();

for (const record of records) {
  if (!Number.isInteger(record.number) || record.number < 1 || record.number > 64) {
    throw new Error(`Invalid hexagram number: ${record.number}`);
  }

  if (numbers.has(record.number)) {
    throw new Error(`Duplicate hexagram number: ${record.number}`);
  }

  numbers.add(record.number);

  for (const key of ["title_en", "title_zh", "core_en", "core_zh"]) {
    if (typeof record[key] !== "string" || record[key].trim().length === 0) {
      throw new Error(`Hexagram ${record.number} is missing ${key}`);
    }
  }

  for (const sectionKey of requiredSections) {
    const section = record.sections?.[sectionKey];
    if (!section?.title_en || !Array.isArray(section.paragraphs)) {
      throw new Error(`Hexagram ${record.number} has invalid ${sectionKey}`);
    }
  }
}

console.log(`Validated ${records.length} Dao Oracle hexagram records.`);
