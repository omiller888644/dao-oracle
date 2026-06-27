export const RITUAL_PULSE_COUNT = 6;

export interface RitualProgress {
  count: number;
  percent: number;
}

export function getRitualProgress(rawCount: number): RitualProgress {
  const count = Math.min(Math.max(Math.trunc(rawCount), 0), RITUAL_PULSE_COUNT);

  return {
    count,
    percent: Math.round((count / RITUAL_PULSE_COUNT) * 100)
  };
}

export function isRitualComplete(rawCount: number): boolean {
  return getRitualProgress(rawCount).count === RITUAL_PULSE_COUNT;
}
