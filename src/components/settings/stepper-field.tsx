import { useController } from "react-hook-form";
import SettingRow from "@/components/settings/setting-row";
import StepperInput from "@/components/settings/stepper-input";
import { hintAndErrorIds, pluralWord } from "@/lib/helpers";

function StepperField({ control, disabled, name, label, hint, unit, units, min, max, step }: StepperFieldProps) {
  const { field, fieldState } = useController({ name, control });
  const value = Number(field.value);

  return (
    <SettingRow id={name} label={label} hint={hint} error={fieldState.error?.message}>
      <StepperInput
        id={name}
        label={label}
        unit={units ?? pluralWord(value, unit)}
        value={value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        invalid={Boolean(fieldState.error)}
        describedBy={hintAndErrorIds(name, Boolean(fieldState.error))}
      />
    </SettingRow>
  );
}

export default StepperField;
