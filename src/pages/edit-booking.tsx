import BookingForm from "@/components/bookings/booking-form";
import PageHeader from "@/components/shared/page-header";
import BackButton from "@/components/shared/back-button";
import BookingUnavailable from "@/components/bookings/booking-unavailable";
import CheckedOutNotice from "@/components/bookings/checked-out-notice";
import FormPageSkeleton from "@/components/shared/form-page-skeleton";
import useBooking from "@/hooks/bookings/use-booking";
import useTitle from "@/hooks/shared/use-title";

function EditBooking() {
  const { booking, bookingId, isPending, error } = useBooking();
  useTitle(booking ? `Edit booking #${booking.id}` : "Edit booking");

  return (
    <>
      <PageHeader
        eyebrow="Reservations"
        title={booking ? `Edit booking #${booking.id}` : "Edit booking"}
        description="Change the guest, cabin, nights or extras. The price is worked out again when you save."
        actions={<BackButton />}
      />
      {isPending ? (
        <FormPageSkeleton />
      ) : error || !booking ? (
        <BookingUnavailable bookingId={bookingId} error={error} />
      ) : booking.status === "checked-out" ? (
        <CheckedOutNotice bookingId={booking.id} />
      ) : (
        <BookingForm key={booking.id} booking={booking} />
      )}
    </>
  );
}

export default EditBooking;
