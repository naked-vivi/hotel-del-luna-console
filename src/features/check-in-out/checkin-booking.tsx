import BookingDataBox from "../../features/bookings/booking-data-box";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { useMoveBack } from "../../hooks/use-move-back";
import useBooking from "../bookings/use-booking";
import { Skeleton } from "@/components/ui/skeleton";
import BookingDataBoxSkeleton from "../bookings/booking-data-box-skeleton";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useCheckin } from "./use-checkin";
import useSettings from "../settings/use-settings";
import PageHeader from "@/shared/page-header";

function CheckinBooking() {

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isPending, error } = useBooking();
  const { checkIn, isCheckingIn } = useCheckin();
  const { settings, isPending: isPendingSettings, error: settingsError } = useSettings();

  useEffect(() => {
    if (booking && booking.status !== "unconfirmed") {
      moveBack();
    }
  }, [booking, moveBack]);

  const { bookingId: bookingIdParam } = useParams();

  if (isPending || isPendingSettings) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Arrival"
          title={`Check in booking #${bookingIdParam}`}
          description="Confirm the details with the guest, add breakfast if they would like it, then confirm payment."
          actions={<Button variant="ghost" onClick={moveBack} className="text-muted-foreground hover:text-foreground">&larr; Back</Button>}
        />
        <BookingDataBoxSkeleton />
        <div aria-hidden="true" className="divide-y divide-border border border-border bg-card">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-5">
              <Skeleton className="size-4" />
              <p className="text-[15px] leading-snug"><Skeleton className="h-lh w-80 max-w-full" /></p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !booking || settingsError || !settings) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p role="alert">{error?.message || settingsError?.message || (!booking ? "Booking not found" : "Settings not found")}</p>
        <Button variant="outline" onClick={moveBack}>Back</Button>
      </div>
    );
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    extrasPrice,
    numNights,
    numGuests,
    hasBreakfast,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;


  function handleCheckIn() {
    if (!confirmPaid || isCheckingIn || booking.status !== "unconfirmed") return;
    if (addBreakfast && !hasBreakfast) {
      checkIn({
        bookingId, breakfast: {
          hasBreakfast: true,
          extrasPrice: (extrasPrice ?? 0) + optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        }
      })
    } else {
      checkIn({ bookingId });
    }

  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Arrival"
        title={`Check in booking #${bookingId}`}
        description="Confirm the details with the guest, add breakfast if they would like it, then confirm payment."
        actions={
          <Button variant="ghost" onClick={moveBack} className="text-muted-foreground hover:text-foreground">
            &larr; Back
          </Button>
        }
      />

      {/* Booking Details Card */}
      <BookingDataBox booking={booking} />

      <section aria-label="Check-in confirmation" className="divide-y divide-border border border-border bg-card">
      {!hasBreakfast &&
        <div className="flex items-center gap-4 px-6 py-5">
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            disabled={isCheckingIn}
            onCheckedChange={(checked) => {
              setAddBreakfast(checked);
              setConfirmPaid(false);
            }}
          />
          <label htmlFor="breakfast" className="pt-0.5 text-[15px] leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Want to add Breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </label>
        </div>}

      <div className="flex items-center gap-4 px-6 py-5">
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          onCheckedChange={setConfirmPaid}
          disabled={isCheckingIn}
        />
        <label htmlFor="confirm" className="pt-0.5 text-[15px] leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          I confirm that {guests.fullName} has paid the total amount of {" "}{!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </label>
      </div>
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
