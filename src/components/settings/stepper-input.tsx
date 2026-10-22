import { MinusIcon, PlusIcon } from "@/components/icons/icons";
import { clampNumber } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { STEPPER_BUTTON } from "@/lib/constants";

function StepperInput({ id, label, unit, value, onChange, onBlur, min, max, step = 1, invalid, describedBy, disabled }: StepperInputProps) {
  const current = Number.isFinite(value) ? value : min;

  function nudge(delta: number) {
    onChange(clampNumber(Math.round((current + delta) * 100) / 100, min, max));
  }

  return (
    <div className={cn("flex h-12 items-stretch border border-input transition-colors focus-within:border-ring", invalid && "border-destructive", disabled && "opacity-60")}>
      <button type="button" onClick={() => nudge(-step)} disabled={disabled || current <= min} aria-label={`Less ${label.toLowerCase()}`} className={cn(STEPPER_BUTTON, "border-r border-input")}>
        <MinusIcon aria-hidden="true" className="size-4" />
      </button>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step="any"
        min={min}
        max={max}
        value={Number.isFinite(value) ? value : ""}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="w-0 min-w-0 flex-1 bg-transparent pt-1 text-right text-xl font-light tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <span aria-hidden="true" className="flex w-16 items-center pt-1 pl-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{unit}</span>
      <button type="button" onClick={() => nudge(step)} disabled={disabled || (max !== undefined && current >= max)} aria-label={`More ${label.toLowerCase()}`} className={cn(STEPPER_BUTTON, "border-l border-input")}>
        <PlusIcon aria-hidden="true" className="size-4" />
      </button>
    </div>
  );
}

export default StepperInput;
