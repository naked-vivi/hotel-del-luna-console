import { Field, FieldError, FieldLabel } from "@/components/ui/field";

function SettingRow({ id, label, hint, error, children }: SettingRowProps) {
  return (
    <Field data-invalid={Boolean(error)} className="grid gap-3 py-6 first:pt-0 last:pb-0 sm:grid-cols-[minmax(0,1fr)_16rem] sm:items-start sm:gap-10">
      <div className="space-y-1.5">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">{hint}</p>
      </div>
      <div className="min-w-0 space-y-2">
        {children}
        {error && <FieldError id={`${id}-error`} errors={[{ message: error }]} />}
      </div>
    </Field>
  );
}

export default SettingRow;
