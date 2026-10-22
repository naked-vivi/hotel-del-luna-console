import { useController } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SettingRow from "@/components/settings/setting-row";
import { hintAndErrorIds } from "@/lib/helpers";

function TimeField({ control, disabled, name, label, hint, options }: TimeFieldProps) {
  const { field, fieldState } = useController({ name, control });
  const hasError = Boolean(fieldState.error);

  return (
    <SettingRow id={name} label={label} hint={hint} error={fieldState.error?.message}>
      <Select value={field.value} onValueChange={(value) => field.onChange(String(value))} disabled={disabled}>
        <SelectTrigger id={name} aria-invalid={hasError} aria-describedby={hintAndErrorIds(name, hasError)} className="h-12! w-full pt-1 text-xl font-light tabular-nums">
          <SelectValue>{field.value}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((time) => (
            <SelectItem key={time} value={time} className="tabular-nums">{time}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingRow>
  );
}

export default TimeField;
