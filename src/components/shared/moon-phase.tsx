import { cn } from "@/lib/utils";
import MoonLight from "@/components/shared/moon-light";

function MoonPhase({ fraction, waning = false, className }: MoonPhaseProps) {
  const f = Math.min(1, Math.max(0, fraction));

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-10", waning && "-scale-x-100", className)}>
      <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
      <MoonLight cx={20} cy={20} r={15} fraction={f} fill="currentColor" />
    </svg>
  );
}

export default MoonPhase;
