import MoonLight from "@/components/shared/moon-light";
import { dialTicksPath } from "@/lib/lunar";
import { dayFraction, toPercent } from "@/lib/helpers";
import { NIGHT_DIAL } from "@/lib/constants";

function NightDial({ now, className }: NightDialProps) {
  const { center: c, moonRadius: r, ticks, tickRadii } = NIGHT_DIAL;
  const fraction = dayFraction(now);
  const lit = toPercent(fraction);

  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={`The moon is ${lit}% lit, as ${lit}% of today has passed`} className={className} fill="none">
      <circle cx={c} cy={c} r={tickRadii.outer} className="stroke-accent-400/20" strokeWidth="1" />
      <path d={dialTicksPath(c, ticks, tickRadii)} className="stroke-accent-400/35" strokeWidth="1" />
      <circle cx={c} cy={c} r="122" className="stroke-accent-400/15" strokeWidth="1" />
      <circle cx={c} cy={c} r={r} className="stroke-accent-400/70" strokeWidth="1.25" />
      <MoonLight cx={c} cy={c} r={r} fraction={fraction} className="fill-accent-400" />
    </svg>
  );
}

export default NightDial;
