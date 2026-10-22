import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * The moon going through its phases: a disc in the page colour slides across a bronze moon.
 * The faint ring keeps the outline visible at new moon.
 */
function LunarCycle({ className }: { className?: string }) {
  const clipId = `lunar-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("size-16 text-gold", className)}>
      <defs>
        <clipPath id={clipId}>
          <circle cx="24" cy="24" r="19" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.75" />
      <g clipPath={`url(#${clipId})`}>
        <circle cx="24" cy="24" r="19" fill="currentColor" />
        <circle cx="24" cy="24" r="19.5" className="lunar-shadow" style={{ fill: "var(--background)" }} />
      </g>
      <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="0.75" />
    </svg>
  );
}

export default LunarCycle;
