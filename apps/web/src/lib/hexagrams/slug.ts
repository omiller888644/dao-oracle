export function getHexagramSlug(number: number, titleEn: string): string {
  const normalizedTitle = titleEn
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${number}-${normalizedTitle}`;
}
