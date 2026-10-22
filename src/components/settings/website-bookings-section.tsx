import { useController } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import FormSection from "@/components/shared/form-section";
import AccessTag from "@/components/shared/access-tag";
import SettingRow from "@/components/settings/setting-row";
import StepperField from "@/components/settings/stepper-field";
import { BOOKING_WINDOW_LIMITS } from "@/lib/constants";

function WebsiteBookingsSection({ control, disabled, lock }: WebsiteBookingsSectionProps) {
  const { field } = useController({ name: "acceptOnlineBookings", control });
  const isLocked = disabled || Boolean(lock);

  return (
    <FormSection eyebrow="Website" title="Online bookings" description="Rules for reservations made on the Hotel del Luna website. Staff can always book here.">
      {lock && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-border bg-muted/40 px-4 py-3">
          <p className="text-sm text-muted-foreground">These change the real website, so they stay as they are in the demo.</p>
          <AccessTag reason={lock} />
        </div>
      )}
      <div className="divide-y divide-border">
        <SettingRow id="acceptOnlineBookings" label="Take bookings online" hint="When this is off, the website turns away new reservations.">
          <div className="flex h-12 items-center justify-between gap-4 border border-input px-4">
            <span className="pt-0.5 text-sm">{field.value ? "Open" : "Paused"}</span>
            <Switch
              id="acceptOnlineBookings"
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={isLocked}
              aria-describedby="acceptOnlineBookings-hint"
            />
          </div>
        </SettingRow>
        <StepperField
          control={control}
          disabled={isLocked}
          name="bookingWindowDays"
          label="Booking window"
          hint="How far ahead guests can book online."
          unit="day"
          min={BOOKING_WINDOW_LIMITS.min}
          max={BOOKING_WINDOW_LIMITS.max}
          step={BOOKING_WINDOW_LIMITS.step}
        />
      </div>
    </FormSection>
  );
}

export default WebsiteBookingsSection;
