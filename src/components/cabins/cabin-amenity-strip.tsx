import { amenitiesFor } from "@/lib/helpers";
import { CARD_AMENITY_LIMIT } from "@/lib/constants";

function CabinAmenityStrip({ amenities, limit = CARD_AMENITY_LIMIT }: CabinAmenityStripProps) {
  const options = amenitiesFor(amenities);
  if (options.length === 0) return null;

  const shown = options.slice(0, limit);
  const hidden = options.length - shown.length;

  return (
    <ul aria-label="Amenities" className="flex items-center gap-3 text-muted-foreground">
      {shown.map(({ value, label, icon: Icon }) => (
        <li key={value} title={label}>
          <Icon className="size-4.5" />
          <span className="sr-only">{label}</span>
        </li>
      ))}
      {hidden > 0 && <li className="pt-0.5 text-[11px] tabular-nums">+{hidden}</li>}
    </ul>
  );
}

export default CabinAmenityStrip;
