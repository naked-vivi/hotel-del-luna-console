/** Name of the moon phase that matches a fill level from 0 to 1. */
export function moonPhaseName(fraction: number) {
  if (fraction <= 0.03) return "New moon";
  if (fraction < 0.45) return "Waxing crescent";
  if (fraction <= 0.55) return "First quarter";
  if (fraction < 0.97) return "Waxing gibbous";
  return "Full moon";
}
