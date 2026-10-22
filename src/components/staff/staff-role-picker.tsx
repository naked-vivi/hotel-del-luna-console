import { cn } from "@/lib/utils";
import { STAFF_ROLE_OPTIONS } from "@/lib/options";

function StaffRolePicker({ value, onChange }: StaffRolePickerProps) {
  return (
    <div role="radiogroup" aria-label="Role" className="grid grid-cols-2 gap-px border border-input bg-input">
      {STAFF_ROLE_OPTIONS.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex flex-col items-start gap-1 px-4 pt-3.5 pb-3 text-left transition-colors focus-visible:outline-1 focus-visible:-outline-offset-2 focus-visible:outline-ring disabled:opacity-60",
              selected ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted/50",
            )}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">{option.label}</span>
            <span className={cn("text-xs", selected ? "text-primary-foreground/80" : "text-muted-foreground")}>{option.note}</span>
          </button>
        );
      })}
    </div>
  );
}

export default StaffRolePicker;
