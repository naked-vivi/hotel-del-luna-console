import MoonPhase from "@/components/shared/moon-phase";
import { moonPhaseName } from "@/lib/lunar";

function OccupancyMoon({ fraction, showTitle }: OccupancyMoonProps) {
  return (
    <span title={showTitle ? moonPhaseName(fraction) : undefined} className="flex">
      <MoonPhase fraction={fraction} className="size-12 text-gold" />
    </span>
  );
}

export default OccupancyMoon;
