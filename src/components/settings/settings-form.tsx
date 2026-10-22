import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSection from "@/components/shared/form-section";
import AccessTag from "@/components/shared/access-tag";
import StepperField from "@/components/settings/stepper-field";
import TimeField from "@/components/settings/time-field";
import WebsiteBookingsSection from "@/components/settings/website-bookings-section";
import HouseRulesPreview from "@/components/settings/house-rules-preview";
import SettingsSaveBar from "@/components/settings/settings-save-bar";
import useUpdateSettings from "@/hooks/settings/use-update-settings";
import { usePermissions } from "@/hooks/authentication/use-permissions";
import { settingsSchema } from "@/lib/schemas";
import { settingsFormValues } from "@/lib/helpers";
import { CHECK_IN_TIMES, CHECK_OUT_TIMES, STAY_SETTING_FIELDS } from "@/lib/constants";

function SettingsForm({ settings }: SettingsFormProps) {
  const { isUpdating, updateSettings } = useUpdateSettings();
  const { lockFor } = usePermissions();
  const lock = lockFor("settings.update");
  const initialValues = settingsFormValues(settings);
  const { control, handleSubmit, reset, setError, formState: { errors, isDirty } } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialValues,
  });
  const values = { ...initialValues, ...useWatch({ control }) };
  const isDisabled = Boolean(lock) || isUpdating;

  function onSubmit(values: SettingsFormValues) {
    if (isUpdating) return;
    updateSettings(values, {
      onSuccess: () => reset(values),
      onError: (error: Error) => setError("root", { message: error.message }),
    });
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
      <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isUpdating} className="min-w-0 space-y-6">
        {lock && (
          <div className="flex flex-wrap items-center justify-between gap-3 border border-border bg-card px-6 py-4 sm:px-8">
            <p className="text-sm text-muted-foreground">You can view the house rules. Only admins can change them.</p>
            <AccessTag reason={lock} />
          </div>
        )}

        <FormSection eyebrow="Stays" title="Length and party size" description="Limits for every booking, made here or on the website.">
          <div className="divide-y divide-border">
            {STAY_SETTING_FIELDS.map((stayField) => (
              <StepperField key={stayField.name} control={control} disabled={isDisabled} {...stayField} />
            ))}
          </div>
        </FormSection>

        <FormSection eyebrow="Arrivals" title="Check-in and check-out" description="Shown on every booking and at the front desk.">
          <div className="divide-y divide-border">
            <TimeField control={control} disabled={isDisabled} name="checkInTime" label="Check-in from" hint="The earliest time guests can get their keys." options={CHECK_IN_TIMES} />
            <TimeField control={control} disabled={isDisabled} name="checkOutTime" label="Check-out by" hint="Rooms need to be free by this time on the last day." options={CHECK_OUT_TIMES} />
          </div>
        </FormSection>

        <FormSection eyebrow="Breakfast" title="Breakfast rate" description="Added to a booking for each guest, every night, when they choose breakfast.">
          <StepperField control={control} disabled={isDisabled} name="breakfastPrice" label="Price per guest, per night" hint="Enter 0 to include breakfast for free." unit="USD" units="USD" min={0} />
        </FormSection>

        <WebsiteBookingsSection control={control} disabled={isDisabled} lock={lock ? null : lockFor("settings.website")} />

        {errors.root && <p role="alert" className="text-sm text-destructive">{errors.root.message}</p>}

        {!lock && <SettingsSaveBar isDirty={isDirty} isUpdating={isUpdating} onReset={() => reset()} />}
      </form>

      <HouseRulesPreview values={values} isDirty={isDirty} updatedAt={settings.updatedAt} />
    </div>
  );
}

export default SettingsForm;
