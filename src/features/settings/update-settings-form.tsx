import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useSettings from "./use-settings";
import { Skeleton } from "@/components/ui/skeleton";
import useUpdateSettings from "./use-update-settings";

const settingsSchema = z.object({
  minBookingLength: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of nights").min(1, "Minimum stay must be at least 1 night"),
  maxBookingLength: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of nights").min(1, "Maximum stay must be at least 1 night"),
  maxGuestsPerBooking: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of guests").min(1, "Allow at least 1 guest"),
  breakfastPrice: z.coerce.number({ invalid_type_error: "Enter a breakfast price, such as 10 or 0 for free" }).finite().min(0, "Breakfast price cannot be negative"),
}).refine((values) => values.maxBookingLength >= values.minBookingLength, {
  message: "Maximum stay must be at least as long as the minimum stay",
  path: ["maxBookingLength"],
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const fields = [
  { name: "minBookingLength", label: "Minimum stay (nights)", hint: "The shortest stay guests can book.", min: 1, step: 1 },
  { name: "maxBookingLength", label: "Maximum stay (nights)", hint: "Must be at least as long as the minimum stay.", min: 1, step: 1 },
  { name: "maxGuestsPerBooking", label: "Maximum guests per booking", hint: "Enter a whole number of guests.", min: 1, step: 1 },
  { name: "breakfastPrice", label: "Breakfast price (USD)", hint: "Price per guest, per night. Enter 0 for free breakfast.", min: 0, step: 0.01 },
] as const;

function SettingsForm({ initialValues }: { initialValues: SettingsFormValues }) {
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
      {fields.map(({ name, label, hint, min, step }) => (
        <Field key={name} data-invalid={Boolean(errors[name])} className="grid gap-3 px-6 py-7 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-start sm:gap-10 sm:px-10">
          <div className="space-y-2">
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
            <p id={`${name}-hint`} className="text-sm text-muted-foreground">{hint}</p>
          </div>
          <div className="space-y-2">
            <Input {...register(name, { valueAsNumber: true })} id={name} type="number" min={min} step={step} required disabled={isUpdating}
              className="h-12 text-right text-xl font-light tabular-nums md:text-xl"
              aria-invalid={Boolean(errors[name])} aria-describedby={`${name}-hint${errors[name] ? ` ${name}-error` : ""}`} />
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

export default function UpdateSettingsForm() {
  const { isPending, settings, error } = useSettings();
  if (isPending) {
    return (
      <div className="max-w-4xl" aria-busy="true" aria-label="Loading settings">
        <div className="border border-border bg-card">
          <div className="divide-y divide-border">
            {fields.map(({ name }) => (
              <div key={name} className="grid gap-3 px-6 py-7 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-start sm:gap-10 sm:px-10">
                <div className="space-y-2">
                  <p className="pt-0.5 text-[10.5px]"><Skeleton className="h-lh w-40" /></p>
                  <p className="text-sm"><Skeleton className="h-lh w-64 max-w-full" /></p>
                </div>
                <Skeleton className="h-12" />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-end gap-3 border-t border-border px-6 py-6 sm:px-10">
            <Skeleton className="h-10 w-36" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    );
  }
  if (error || !settings) return <p role="alert">{error?.message || "Settings could not be loaded."}</p>;

  return (
    <div className="max-w-4xl">
      <SettingsForm initialValues={{ minBookingLength: settings.minBookingLength, maxBookingLength: settings.maxBookingLength, maxGuestsPerBooking: settings.maxGuestsPerBooking, breakfastPrice: settings.breakfastPrice }} />
    </div>
  );
}
