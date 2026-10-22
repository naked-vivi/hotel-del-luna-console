import { lunarPhase } from "@/lib/lunar";
import { toPercent } from "@/lib/helpers";
import MoonPhase from "@/components/shared/moon-phase";

function TonightMoon() {
  const moon = lunarPhase();
  const lit = toPercent(moon.illumination);

  return (
    <div className="flex items-center gap-3" title={`Tonight's moon: ${moon.name}, ${lit}% lit`}>
      <MoonPhase fraction={moon.illumination} waning={!moon.waxing} className="size-9 text-gold" />
      <div className="flex flex-col gap-1.5 pt-1">
        <span className="text-[10px] leading-none font-semibold uppercase tracking-[0.28em] text-muted-foreground">Tonight's moon</span>
        <span className="text-[13px] leading-none text-foreground">
          {moon.name} · {lit}%
        </span>
      </div>
    </div>
  );
}

export default TonightMoon;
