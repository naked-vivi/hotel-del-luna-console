import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUpdateSettings from "@/hooks/settings/use-update-settings";
import { settingsSchema } from "@/lib/schemas";
import { hintAndErrorIds } from "@/lib/helpers";
import { SETTINGS_FIELDS } from "@/lib/constants";

function SettingsForm({ initialValues }: SettingsFormProps) {
  const { isUpdating, updateSettings } = useUpdateSettings();
  const { register, handleSubmit, reset, setError, formState: { errors, isDirty } } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: SettingsFormValues) {
    if (isUpdating) return;
    updateSettings(values, {
      onSuccess: () => reset(values),
      onError: (error: Error) => setError("root", { message: error.message }),
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isUpdating} className="border border-border bg-card">
      <div className="divide-y divide-border">
      {SETTINGS_FIELDS.map(({ name, label, hint, min, step }) => (
        <Field key={name} data-invalid={Boolean(errors[name])} className="grid gap-3 px-6 py-7 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-start sm:gap-10 sm:px-10">
          <div className="space-y-2">
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <p id={`${name}-hint`} className="text-sm text-muted-foreground">{hint}</p>
          </div>
          <div className="space-y-2">
            <Input {...register(name, { valueAsNumber: true })} id={name} type="number" min={min} step={step} required disabled={isUpdating}
              className="h-12 text-right text-xl font-light tabular-nums md:text-xl"
              aria-invalid={Boolean(errors[name])} aria-describedby={hintAndErrorIds(name, Boolean(errors[name]))} />
            {errors[name] && <FieldError id={`${name}-error`} errors={[errors[name]]} />}
          </div>
        </Field>
      ))}
      </div>
      {errors.root && <p role="alert" className="px-6 pt-4 text-sm text-destructive sm:px-10">{errors.root.message}</p>}
      <div className="flex flex-wrap justify-end gap-3 border-t border-border px-6 py-6 sm:px-10">
        <Button type="button" variant="outline" onClick={() => reset()} disabled={isUpdating || !isDirty}>Reset changes</Button>
        <Button type="submit" disabled={isUpdating || !isDirty}>{isUpdating ? "Saving settings..." : "Save settings"}</Button>
      </div>
    </form>
  );
}

export default SettingsForm;
