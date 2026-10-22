import { Controller, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormSection from "@/components/shared/form-section";
import CabinField from "@/components/cabins/cabin-field";
import GuestPicker from "@/components/bookings/guest-picker";
import BookedNights from "@/components/bookings/booked-nights";
import StayDatesPicker from "@/components/bookings/stay-dates-picker";
import BookingPriceSummary from "@/components/bookings/booking-price-summary";
import useCabins from "@/hooks/cabins/use-cabins";
import useSettings from "@/hooks/settings/use-settings";
import { useCabinAvailability } from "@/hooks/bookings/use-cabin-availability";
import { useSaveBooking } from "@/hooks/bookings/use-save-booking";
import { createBookingSchema } from "@/lib/schemas";
import { bookingPrice, bookingRules, bookingToFormValues, hintAndErrorIds, sortCabinsByName } from "@/lib/helpers";
import { EMPTY_BOOKING_FORM } from "@/lib/constants";

function BookingForm({ booking }: BookingFormProps) {
  const navigate = useNavigate();
  const { cabins = [] } = useCabins();
  const { settings } = useSettings();
  const { save, isSaving } = useSaveBooking(booking?.id);

  const form = useForm<BookingFormValues>({ defaultValues: booking ? bookingToFormValues(booking) : EMPTY_BOOKING_FORM });
  const values = useWatch({ control: form.control }) as BookingFormValues;
  const cabin = cabins.find((entry) => entry.id === Number(values.cabinId));
  const { booked, isLoading: isCheckingDates } = useCabinAvailability(cabin?.id, booking?.id);

  const { maxGuests, ...rules } = bookingRules(cabin, settings, booked);
  const schema = createBookingSchema({ ...rules, maxGuests });
  const price = bookingPrice(cabin, values, settings?.breakfastPrice ?? 0);

  function handleDatesChange(startDate: string, endDate: string) {
    form.setValue("startDate", startDate, { shouldDirty: true });
    form.setValue("endDate", endDate, { shouldDirty: true });
    form.clearErrors(["startDate", "endDate"]);
  }

  function onSubmit(data: BookingFormValues) {
    form.clearErrors();
    const result = schema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) form.setError(issue.path[0] as keyof BookingFormValues, { message: issue.message });
      return;
    }
    if (isSaving || !cabin) return;
    save({ values: result.data as BookingFormValues, cabin, breakfastPrice: settings?.breakfastPrice ?? 0 });
  }

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} aria-busy={isSaving} className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
      <fieldset disabled={isSaving} className="flex min-w-0 flex-col gap-6">
        <FormSection eyebrow="Guest" title="Who is staying" description="Pick someone who has stayed before, or add a new guest.">
          <GuestPicker control={form.control} />
        </FormSection>

        <FormSection eyebrow="Stay" title="Cabin and dates" description={settings ? `Stays run from ${settings.minBookingLength} to ${settings.maxBookingLength} nights. Check-in from ${settings.checkInTime}, check-out by ${settings.checkOutTime}.` : undefined}>
          <div className="grid gap-6 sm:grid-cols-2">
            <Controller
              name="cabinId"
              control={form.control}
              render={({ field, fieldState }) => (
                <CabinField required id="cabinId" label="Cabin" error={fieldState.error}>
                  <Select value={field.value ? String(field.value) : null} onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}>
                    <SelectTrigger id="cabinId" className="w-full" aria-invalid={fieldState.invalid} aria-describedby={fieldState.invalid ? "cabinId-error" : undefined}>
                      <SelectValue placeholder="Choose a cabin">{cabin ? `N° ${cabin.name} · sleeps ${cabin.maxCapacity}` : null}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {sortCabinsByName(cabins).map((entry) => (
                        <SelectItem key={entry.id} value={String(entry.id)}>N° {entry.name} · sleeps {entry.maxCapacity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CabinField>
              )}
            />
            <Controller
              name="numGuests"
              control={form.control}
              render={({ field, fieldState }) => (
                <CabinField required id="numGuests" label="Guests" hint={cabin ? `Up to ${maxGuests} in this cabin.` : "Choose a cabin first."} error={fieldState.error}>
                  <Input {...field} value={field.value ?? ""} id="numGuests" type="number" min={1} max={Number.isFinite(maxGuests) ? maxGuests : undefined} aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("numGuests", fieldState.invalid)} />
                </CabinField>
              )}
            />
            <div className="sm:col-span-2">
              <CabinField required id="stayDates" label="Stay dates" hint={cabin ? "Booked nights are struck through and can't be picked." : "Choose a cabin to see which nights are free."} error={form.formState.errors.startDate ?? form.formState.errors.endDate}>
                <StayDatesPicker
                  startDate={values.startDate}
                  endDate={values.endDate}
                  booked={booked}
                  minNights={rules.minNights}
                  maxNights={rules.maxNights}
                  allowPast={Boolean(booking)}
                  invalid={Boolean(form.formState.errors.startDate ?? form.formState.errors.endDate)}
                  describedBy={hintAndErrorIds("stayDates", Boolean(form.formState.errors.startDate ?? form.formState.errors.endDate))}
                  onChange={handleDatesChange}
                />
              </CabinField>
            </div>
          </div>
          {cabin && <div className="mt-6 border-t border-border pt-5"><BookedNights ranges={booked} isLoading={isCheckingDates} /></div>}
        </FormSection>

        <FormSection eyebrow="Extras" title="Breakfast, payment and notes">
          <div className="space-y-5">
            <Controller
              name="hasBreakfast"
              control={form.control}
              render={({ field }) => (
                <label className="flex items-center gap-4 text-[15px]">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  <span className="pt-0.5">Add breakfast{settings ? ` (${settings.breakfastPrice ? `$${settings.breakfastPrice}` : "free"} per guest, per night)` : ""}</span>
                </label>
              )}
            />
            <Controller
              name="isPaid"
              control={form.control}
              render={({ field }) => (
                <label className="flex items-center gap-4 text-[15px]">
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  <span className="pt-0.5">The guest has already paid</span>
                </label>
              )}
            />
            <Controller
              name="observations"
              control={form.control}
              render={({ field, fieldState }) => (
                <CabinField id="observations" label="Notes for the house" hint="Allergies, late arrival, special occasions." error={fieldState.error}>
                  <Textarea {...field} id="observations" rows={3} aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("observations", fieldState.invalid)} />
                </CabinField>
              )}
            />
          </div>
        </FormSection>

        {Object.keys(form.formState.errors).length > 0 && (
          <p role="alert" className="text-sm text-destructive">Some details need attention. Check the highlighted fields above.</p>
        )}

        <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-8">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" disabled={isSaving}>{isSaving ? "Saving booking..." : booking ? "Save changes" : "Create booking"}</Button>
        </div>
      </fieldset>

      <aside className="xl:sticky xl:top-28">
        <BookingPriceSummary
          price={price}
          cabin={cabin}
          numGuests={values.numGuests}
          hasBreakfast={values.hasBreakfast}
          breakfastPrice={settings?.breakfastPrice ?? 0}
        />
      </aside>
    </form>
  );
}

export default BookingForm;
