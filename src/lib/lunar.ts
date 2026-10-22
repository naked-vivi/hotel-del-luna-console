// The moon right now, worked out from the date and time. Accurate to within about a day.
const SYNODIC_MONTH = 29.530588853; // days from one new moon to the next
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14); // 6 January 2000, 18:14 UTC

export type LunarPhase = {
  /** How much of the moon is lit, 0 to 1. */
  illumination: number;
  /** True while the lit part is growing (new moon to full moon). */
  waxing: boolean;
  name: string;
};

export function lunarPhase(date = new Date()): LunarPhase {
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86_400_000;
  const age = ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
  const illumination = (1 - Math.cos((2 * Math.PI * age) / SYNODIC_MONTH)) / 2;
  const step = SYNODIC_MONTH / 8;
  const names = [
    "New moon",
    "Waxing crescent",
    "First quarter",
    "Waxing gibbous",
    "Full moon",
    "Waning gibbous",
    "Last quarter",
    "Waning crescent",
  ];
  const index = Math.floor((age + step / 2) / step) % 8;

  return { illumination, waxing: age < SYNODIC_MONTH / 2, name: names[index] };
}
