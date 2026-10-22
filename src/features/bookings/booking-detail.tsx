import BookingDataBox from "./booking-data-box";
import { Skeleton } from "@/components/ui/skeleton";
import BookingDataBoxSkeleton from "./booking-data-box-skeleton";
import useBooking from "./use-booking";
import { Button } from "@/components/ui/button";
import { useMoveBack } from "../../hooks/use-move-back";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCheckout } from "../check-in-out/use-checkout";
import { useDeleteBooking } from "./use-delete-booking";
import ConfirmDelete from "@/shared/confirm-delete";
import { useState } from "react";
import PageHeader from "@/shared/page-header";
import StatusTag from "@/shared/status-tag";


function BookingDetail() {
  const [deletingBookingId, setDeletingBookingId] = useState<number | null>(null);
  const { booking, isPending, error } = useBooking();
  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { bookingId } = useParams();

  if (isPending) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader
          eyebrow="Reservation"
          title={`Booking #${bookingId}`}
          meta={<Skeleton className="h-6 w-28" />}
          actions={<Button variant="ghost" onClick={moveBack} className="text-muted-foreground hover:text-foreground">&larr; Back</Button>}
        />
        <BookingDataBoxSkeleton />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex flex-col items-start gap-4">
        <p role="alert">{error?.message || "Booking not found"}</p>
        <Button variant="outline" onClick={moveBack}>Back</Button>
      </div>
    );
  }

  const { id, status } = booking;

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Reservation"
        title={`Booking #${id}`}
        meta={<StatusTag status={status} />}
        actions={
          <Button variant="ghost" onClick={moveBack} className="text-muted-foreground hover:text-foreground">
            &larr; Back
          </Button>
        }
      />

      {/* Main Booking Content */}
      <BookingDataBox booking={booking} />

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border pt-8">
        {booking.status === "unconfirmed" && (
          <Button render={<Link to={`/checkin/${booking.id}`} />} nativeButton={false}>
            Check-in
          </Button>
        )}
        {booking.status === "checked-in" && (
          <Button
            onClick={() => checkOut(booking.id)}
            disabled={isCheckingOut}>
            Check-out
          </Button>
        )}
        <Button variant="destructive"
          onClick={() => setDeletingBookingId(booking.id)}
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
          onConfirm={() => deleteBooking(deletingBookingId, {
            onSuccess: () => {
              setDeletingBookingId(null);
              navigate("/bookings", { replace: true });
            },
          })}
        />
      )}
    </div>
  );
}

export default BookingDetail;
