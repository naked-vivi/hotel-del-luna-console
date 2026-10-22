import BookingDataBox from "@/components/bookings/booking-data-box";
import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/shared/use-move-back";
import useBooking from "@/hooks/bookings/use-booking";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { breakfastCost, checkinArgs, paymentSummary } from "@/lib/helpers";
import { useCheckin } from "@/hooks/check-in-out/use-checkin";
import useSettings from "@/hooks/settings/use-settings";
import PageHeader from "@/components/shared/page-header";
import BackButton from "@/components/shared/back-button";
import BookingUnavailable from "@/components/bookings/booking-unavailable";
import CheckinCheckbox from "@/components/check-in-out/checkin-checkbox";
import CheckinBookingSkeleton from "@/components/check-in-out/checkin-booking-skeleton";

function CheckinBooking() {

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking, bookingId: bookingIdParam, isPending, error } = useBooking();
  const { checkIn, isCheckingIn } = useCheckin();
  const { settings, isPending: isPendingSettings, error: settingsError } = useSettings();

  useEffect(() => {
    if (booking && booking.status !== "unconfirmed") {
      moveBack();
    }
  }, [booking, moveBack]);

  if (isPending || isPendingSettings) return <CheckinBookingSkeleton bookingId={bookingIdParam} />;

  if (error || settingsError || !booking || !settings) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader eyebrow="Arrival" title={`Check in booking #${bookingIdParam}`} actions={<BackButton />} />
        <BookingUnavailable bookingId={bookingIdParam} error={error ?? settingsError} />
      </div>
    );
  }

  const { id: bookingId, guests, totalPrice, numNights, numGuests, hasBreakfast } = booking;
  const optionalBreakfastPrice = breakfastCost(settings.breakfastPrice, numNights, numGuests);

  function handleCheckIn() {
    if (!confirmPaid || isCheckingIn || booking.status !== "unconfirmed") return;
    checkIn(checkinArgs(booking, addBreakfast, optionalBreakfastPrice));
  }

  function handleAddBreakfast(checked: boolean) {
    setAddBreakfast(checked);
    setConfirmPaid(false);
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Arrival"
        title={`Check in booking #${bookingId}`}
        description={`Check-in opens at ${settings.checkInTime}. Confirm the details with the guest, add breakfast if they would like it, then confirm payment.`}
        actions={<BackButton />}
      />

      {/* Booking Details Card */}
      <BookingDataBox booking={booking} />

      <section aria-label="Check-in confirmation" className="divide-y divide-border border border-border bg-card">
        {!hasBreakfast && (
          <CheckinCheckbox id="breakfast" checked={addBreakfast} disabled={isCheckingIn} onCheckedChange={handleAddBreakfast}>
            Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </CheckinCheckbox>
        )}

        <CheckinCheckbox id="confirm" checked={confirmPaid} disabled={isCheckingIn} onCheckedChange={setConfirmPaid}>
          I confirm that {guests.fullName} has paid the total amount of {paymentSummary(totalPrice, optionalBreakfastPrice, addBreakfast)}
        </CheckinCheckbox>
      </section>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-8">
        <Button onClick={handleCheckIn} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variant="outline" onClick={moveBack}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default CheckinBooking;
