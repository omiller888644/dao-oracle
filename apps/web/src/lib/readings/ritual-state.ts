export const RITUAL_PULSE_COUNT = 6;
export const AUTO_CAST_INTERVAL_MS = 1800;
export const RESULT_REDIRECT_DELAY_MS = 2000;

export interface RitualProgress {
  count: number;
  percent: number;
}

export interface AutoCastFrame {
  visibleLineIndex: number;
  completedLines: number;
  finalHexagramVisible: boolean;
  shouldRedirect: boolean;
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

export function getAutoCastFrame(rawFrame: number): AutoCastFrame {
  const frame = Math.max(Math.trunc(rawFrame), 0);
  const completedLines = Math.min(frame, RITUAL_PULSE_COUNT);

  return {
    visibleLineIndex: Math.min(frame, RITUAL_PULSE_COUNT - 1),
    completedLines,
    finalHexagramVisible: frame >= RITUAL_PULSE_COUNT,
    shouldRedirect: frame >= RITUAL_PULSE_COUNT + 2
  };
}
