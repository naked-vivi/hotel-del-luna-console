import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import RequiredMark from "@/components/shared/required-mark";

function CabinField({ id, label, required = false, hint, error, children }: CabinFieldProps) {
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}{required && <RequiredMark />}</FieldLabel>
      {children}
      {hint && <p id={`${id}-hint`} className="text-sm text-muted-foreground">{hint}</p>}
      {error && <FieldError id={`${id}-error`} errors={[error]} />}
    </Field>
  );
}

export default CabinField;
