import BookingDataBox from "@/components/bookings/booking-data-box";
import BookingDetailSkeleton from "@/components/bookings/booking-detail-skeleton";
import useBooking from "@/hooks/bookings/use-booking";
import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/shared/use-move-back";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCheckout } from "@/hooks/check-in-out/use-checkout";
import { useDeleteBooking } from "@/hooks/bookings/use-delete-booking";
import ConfirmDelete from "@/components/shared/confirm-delete";
import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import StatusTag from "@/components/shared/status-tag";
import BackButton from "@/components/shared/back-button";
import LoadError from "@/components/shared/load-error";


function BookingDetail() {
  const [deletingBookingId, setDeletingBookingId] = useState<number | null>(null);
  const { booking, isPending, error } = useBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  if (isPending) return <BookingDetailSkeleton bookingId={bookingId} />;

  if (error || !booking) return <LoadError message={error?.message || "Booking not found"} />;

  const { id, status } = booking;

  function handleConfirmDelete() {
    deleteBooking(deletingBookingId, {
      onSuccess: () => {
        setDeletingBookingId(null);
        navigate("/bookings", { replace: true });
      },
    });
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Reservation"
        title={`Booking #${id}`}
        meta={<StatusTag status={status} />}
        actions={<BackButton />}
      />

      {/* Main Booking Content */}
      <BookingDataBox booking={booking} />

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-8">
        {status === "unconfirmed" && (
          <Button render={<Link to={`/checkin/${id}`} />} nativeButton={false}>
            Check-in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            onClick={() => checkOut(id)}
            disabled={isCheckingOut}>
            Check-out
          </Button>
        )}
        <Button variant="destructive"
          onClick={() => setDeletingBookingId(id)}
          disabled={isDeletingBooking}>
          Delete Booking
        </Button>
        <Button variant="outline" onClick={moveBack}>
          Back
        </Button>

      </div>
      {deletingBookingId !== null && (
        <ConfirmDelete
          resourceName="Booking"
          itemName={`#${deletingBookingId}`}
          isOpen={true}
          isDeleting={isDeletingBooking}
          onClose={() => setDeletingBookingId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default BookingDetail;
