import { cn } from "@/lib/utils";

/** A moon lit to the given fraction, drawn with a dashed outline. `waning` lights the left side instead of the right. */
function MoonPhase({ fraction, waning = false, className }: { fraction: number; waning?: boolean; className?: string }) {
  const f = Math.min(1, Math.max(0, fraction));
  const r = 15;
  const cx = 20;
  const top = 20 - r;
  const bottom = 20 + r;
  const rx = (Math.abs(1 - 2 * f) * r).toFixed(2);
  const sweep = f > 0.5 ? 1 : 0;

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-10", waning && "-scale-x-100", className)}>
      <circle cx={cx} cy="20" r={r} fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" strokeDasharray="2 3" />
      {f >= 0.99 ? (
        <circle cx={cx} cy="20" r={r} fill="currentColor" />
      ) : f > 0.01 ? (
        <path d={`M${cx} ${top} A${r} ${r} 0 0 1 ${cx} ${bottom} A${rx} ${r} 0 0 ${sweep} ${cx} ${top}Z`} fill="currentColor" />
      ) : null}
    </svg>
  );
}

export default MoonPhase;
