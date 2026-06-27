import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const sourceFile =
  "outputs/hexagram_content/dao_oracle_64_hexagrams_database_ready.jsonl";
const sourcePath = path.resolve(process.cwd(), "../../", sourceFile);

const records = readFileSync(sourcePath, "utf8")
  .split(/\r?\n/)
  .filter((line) => line.trim().length > 0)
  .map((line) => JSON.parse(line))
  .map((record) => ({
    number: record.number,
    slug: getHexagramSlug(record.number, record.title_en),
    title_en: record.title_en,
    title_zh: record.title_zh,
    core_en: record.core_en,
    core_zh: record.core_zh,
    sections: record.sections,
    question_lens: record.question_lens,
    source_file: sourceFile
  }));

if (records.length !== 64) {
  throw new Error(`Expected 64 records, received ${records.length}`);
}

if (dryRun) {
  console.log(`Dry run: prepared ${records.length} hexagrams for Supabase.`);
  console.log(`First record: ${records[0].slug}`);
  console.log(`Last record: ${records.at(-1).slug}`);
  process.exit(0);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Use --dry-run for local validation."
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false
  }
});

const { error } = await supabase.from("hexagrams").upsert(records, {
  onConflict: "number"
});

if (error) {
  throw error;
}

console.log(`Seeded ${records.length} Dao Oracle hexagrams.`);

function getHexagramSlug(number, titleEn) {
  const normalizedTitle = titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${number}-${normalizedTitle}`;
}
