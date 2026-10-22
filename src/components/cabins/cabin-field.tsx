import { Field, FieldError, FieldLabel } from "@/components/ui/field";

function CabinField({ id, label, hint, error, children }: CabinFieldProps) {
  return (
    <Field data-invalid={Boolean(error)}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {children}
      <p id={`${id}-hint`} className="text-sm text-muted-foreground">{hint}</p>
      {error && <FieldError id={`${id}-error`} errors={[error]} />}
    </Field>
  );
}

export default CabinField;
