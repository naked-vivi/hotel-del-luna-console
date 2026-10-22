import { cn } from "@/lib/utils";
import { SEARCH_TYPES } from "@/lib/options";
import { usePermissions } from "@/hooks/authentication/use-permissions";

function SearchTypeChips({ value, onChange }: SearchTypeChipsProps) {
  const { canView } = usePermissions();
  const types = SEARCH_TYPES.filter((type) => !type.permission || canView(type.permission));

  return (
    <div role="group" aria-label="Filter results by type" className="flex flex-wrap items-center gap-2 border-b border-border px-5 py-3">
      <span className="mr-1 pt-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Type</span>
      {[{ value: "all" as const, label: "All" }, ...types].map((type) => (
        <button
          key={type.value}
          type="button"
          aria-pressed={value === type.value}
          onClick={() => onChange(type.value)}
          className={cn(
            "border px-3 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring",
            value === type.value ? "border-primary bg-primary text-primary-foreground" : "border-border text-foreground/70 hover:text-foreground",
          )}
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}

export default SearchTypeChips;
