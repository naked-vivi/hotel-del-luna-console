import { cn } from "@/lib/utils";
import { AMENITY_OPTIONS } from "@/lib/options";

function AmenityPicker({ value, onChange }: AmenityPickerProps) {
  function toggle(amenity: string) {
    onChange(value.includes(amenity) ? value.filter((entry) => entry !== amenity) : [...value, amenity]);
  }

  return (
    <div role="group" aria-label="Amenities" className="grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-3">
      {AMENITY_OPTIONS.map(({ value: amenity, label, icon: Icon }) => {
        const selected = value.includes(amenity);
        return (
          <button
            key={amenity}
            type="button"
            aria-pressed={selected}
            onClick={() => toggle(amenity)}
            className={cn(
              "flex items-center gap-3.5 px-4 pt-3.5 pb-3 text-left transition-colors focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring",
              selected ? "bg-primary text-primary-foreground [--icon-accent:currentColor]" : "bg-card text-foreground hover:bg-muted/50",
            )}
          >
            <Icon aria-hidden="true" className="-mt-0.5 size-5 shrink-0" />
            <span className="text-[13px]">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default AmenityPicker;
