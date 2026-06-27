export type CastLine = 6 | 7 | 8 | 9;

export interface NormalizedCast {
  lines: CastLine[];
  hexagramNumber: number;
  changingLines: number[];
}

const VALID_LINES = new Set([6, 7, 8, 9]);

export function normalizeCastLines(input: unknown): CastLine[] {
  if (!Array.isArray(input) || input.length !== 6) {
    throw new Error("A reading requires exactly six lines.");
  }

  return input.map((line) => {
    if (!VALID_LINES.has(Number(line))) {
      throw new Error(`Invalid cast line value: ${line}`);
    }

    return Number(line) as CastLine;
  });
}

export function deriveHexagramNumber(lines: CastLine[]): number {
  const normalizedLines = normalizeCastLines(lines);
  const binaryValue = normalizedLines.reduce((value, line, index) => {
    const bit = line === 7 || line === 9 ? 1 : 0;
    return value + bit * 2 ** index;
  }, 0);

  return binaryValue + 1;
}

export function getChangingLinePositions(lines: CastLine[]): number[] {
  return normalizeCastLines(lines).flatMap((line, index) =>
    line === 6 || line === 9 ? [index + 1] : []
  );
}

export function normalizeCast(input: unknown): NormalizedCast {
  const lines = normalizeCastLines(input);

  return {
    lines,
    hexagramNumber: deriveHexagramNumber(lines),
    changingLines: getChangingLinePositions(lines)
  };
}
