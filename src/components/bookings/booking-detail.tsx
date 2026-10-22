import BookingDataBox from "@/components/bookings/booking-data-box";
import BookingDetailSkeleton from "@/components/bookings/booking-detail-skeleton";
import useBooking from "@/hooks/bookings/use-booking";
import { Button } from "@/components/ui/button";
import { useMoveBack } from "@/hooks/shared/use-move-back";
import { Link, useNavigate } from "react-router-dom";
import { useCheckout } from "@/hooks/check-in-out/use-checkout";
import { useDeleteBooking } from "@/hooks/bookings/use-delete-booking";
import ConfirmDelete from "@/components/shared/confirm-delete";
import { useState } from "react";
import PageHeader from "@/components/shared/page-header";
import StatusTag from "@/components/shared/status-tag";
import SourceTag from "@/components/shared/source-tag";
import BackButton from "@/components/shared/back-button";
import BookingUnavailable from "@/components/bookings/booking-unavailable";
import AccessTag from "@/components/shared/access-tag";
import { usePermissions } from "@/hooks/authentication/use-permissions";


function BookingDetail() {
  const [deletingBookingId, setDeletingBookingId] = useState<number | null>(null);
  const { booking, bookingId, isPending, error } = useBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const deleteLock = usePermissions().lockFor("bookings.delete");

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <BookingDetailSkeleton bookingId={bookingId} />;

  if (error || !booking) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader eyebrow="Reservation" title={`Booking #${bookingId}`} actions={<BackButton />} />
        <BookingUnavailable bookingId={bookingId} error={error} />
      </div>
    );
  }

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
        meta={<div className="flex flex-wrap items-center gap-2"><StatusTag status={status} /><SourceTag source={booking.source} /></div>}
        actions={<BackButton />}
      />

      {/* Main Booking Content */}
      <BookingDataBox booking={booking} />

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-8">
        {status !== "checked-out" && (
          <Button variant="outline" render={<Link to={`/bookings/${id}/edit`} />} nativeButton={false}>
            Edit booking
          </Button>
        )}
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
        {deleteLock && <AccessTag reason={deleteLock} />}
        <Button variant="destructive"
          onClick={() => setDeletingBookingId(id)}
          disabled={isDeletingBooking || Boolean(deleteLock)}>
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
