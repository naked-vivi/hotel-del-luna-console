import BookingForm from "@/components/bookings/booking-form";
import PageHeader from "@/components/shared/page-header";
import BackButton from "@/components/shared/back-button";
import useTitle from "@/hooks/shared/use-title";

function NewBooking() {
  useTitle("New booking");

  return (
    <>
      <PageHeader
        eyebrow="Reservations"
        title="New booking"
        description="Choose the guest, the cabin and the nights. The price updates as you go."
        actions={<BackButton />}
      />
      <BookingForm />
    </>
  );
}

export default NewBooking;
