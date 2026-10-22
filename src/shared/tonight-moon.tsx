import { lunarPhase } from "@/lib/lunar";
import MoonPhase from "./moon-phase";

/** The real moon over the hotel tonight: phase drawing, name and how much is lit. */
function TonightMoon() {
  const moon = lunarPhase();

  return (
    <div className="flex items-center gap-3" title={`Tonight's moon: ${moon.name}, ${Math.round(moon.illumination * 100)}% lit`}>
      <MoonPhase fraction={moon.illumination} waning={!moon.waxing} className="size-9 text-gold" />
      <div className="flex flex-col gap-1.5 pt-1">
        <span className="text-[10px] leading-none font-semibold uppercase tracking-[0.28em] text-muted-foreground">Tonight's moon</span>
        <span className="text-[13px] leading-none text-foreground">
          {moon.name} · {Math.round(moon.illumination * 100)}%
        </span>
      </div>
    </div>
  );
}

export default TonightMoon;
