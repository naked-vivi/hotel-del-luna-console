import {
  FULL_MOON_FRACTION,
  KNOWN_NEW_MOON,
  LUNAR_PHASE_NAMES,
  MS_PER_DAY,
  NEW_MOON_FRACTION,
  SYNODIC_MONTH,
} from "@/lib/constants";

export function lunarPhase(date = new Date()): LunarPhase {
  const days = (date.getTime() - KNOWN_NEW_MOON) / MS_PER_DAY;
  const age = ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const illumination = (1 - Math.cos((2 * Math.PI * age) / SYNODIC_MONTH)) / 2;
  const step = SYNODIC_MONTH / LUNAR_PHASE_NAMES.length;
  const index = Math.floor((age + step / 2) / step) % LUNAR_PHASE_NAMES.length;

  return { illumination, waxing: age < SYNODIC_MONTH / 2, name: LUNAR_PHASE_NAMES[index] };
}

export function moonPhaseName(fraction: number) {
  if (fraction <= 0.03) return "New moon";
  if (fraction < 0.45) return "Waxing crescent";
  if (fraction <= 0.55) return "First quarter";
  if (fraction < 0.97) return "Waxing gibbous";
  return "Full moon";
}

export function moonLight(fraction: number): MoonLight {
  if (fraction >= FULL_MOON_FRACTION) return "full";
  if (fraction > NEW_MOON_FRACTION) return "partial";
  return "none";
}

export function litMoonPath(cx: number, cy: number, r: number, fraction: number) {
  const rx = (Math.abs(1 - 2 * fraction) * r).toFixed(2);
  const sweep = fraction > 0.5 ? 1 : 0;
  return `M${cx} ${cy - r}A${r} ${r} 0 0 1 ${cx} ${cy + r}A${rx} ${r} 0 0 ${sweep} ${cx} ${cy - r}Z`;
}

export function dialTicksPath(center: number, count: number, { long, short, outer }: DialTickRadii) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const point = (radius: number) =>
      `${(center + Math.cos(angle) * radius).toFixed(2)} ${(center + Math.sin(angle) * radius).toFixed(2)}`;
    return `M${point(i % 2 === 0 ? long : short)}L${point(outer)}`;
  }).join("");
}
