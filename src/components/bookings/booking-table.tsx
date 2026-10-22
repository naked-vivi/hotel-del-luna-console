import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { PaginationPage } from "@/components/shared/pagination-page";
import ConfirmDelete from "@/components/shared/confirm-delete";
import EmptyState from "@/components/shared/empty-state";
import ErrorNote from "@/components/shared/error-note";
import ErrorPanel from "@/components/shared/error-panel";
import EmptyRegister from "@/components/bookings/empty-register";
import BookingTableHeader from "@/components/bookings/booking-table-header";
import BookingTableSkeleton from "@/components/bookings/booking-table-skeleton";
import BookingRow from "@/components/bookings/booking-row";
import useBookings from "@/hooks/bookings/use-bookings";
import { useCheckout } from "@/hooks/check-in-out/use-checkout";
import { useDeleteBooking } from "@/hooks/bookings/use-delete-booking";
import { BOOKINGS_PAGE_SIZE } from "@/lib/constants";

export default function BookingTable() {
  const [deletingBookingId, setDeletingBookingId] = useState<number | null>(null);
  const { bookings, isPending, error, count, page, bookingId } = useBookings();
  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isPending) return <BookingTableSkeleton />;
  if (error) {
    return (
      <ErrorPanel>
        <ErrorNote title="The register is out of reach" message={error.message} drawing={<EmptyRegister clouded className="w-full max-w-64" />} />
      </ErrorPanel>
    );
  }
  if (bookings.length === 0 && bookingId !== null) {
    return <EmptyState drawing={<EmptyRegister className="w-full max-w-56" />} title={bookingId > 0 ? `No booking #${bookingId}` : "That isn't a booking number"}>Check the number, or clear the search to see every booking.</EmptyState>;
  }
  if (bookings.length === 0) return <EmptyState drawing={<EmptyRegister className="w-full max-w-56" />} title="No bookings here">Try another status filter, or check back once new guests reserve.</EmptyState>;

  function handleConfirmDelete() {
    deleteBooking(deletingBookingId, { onSuccess: () => setDeletingBookingId(null) });
  }

  return (
    <>
      <div className="min-w-0 border border-border bg-card">
        <Table>
          <BookingTableHeader />
          <TableBody>{bookings.map((booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
              busy={isCheckingOut || isDeletingBooking}
              onCheckout={checkOut}
              onDelete={setDeletingBookingId}
            />
          ))}</TableBody>
        </Table>
      </div>
      {count > BOOKINGS_PAGE_SIZE && <div className="mt-8 flex justify-center"><PaginationPage count={count} page={page} pageSize={BOOKINGS_PAGE_SIZE} /></div>}
      {deletingBookingId !== null && <ConfirmDelete resourceName="Booking" itemName={`#${deletingBookingId}`} isOpen isDeleting={isDeletingBooking} onClose={() => setDeletingBookingId(null)} onConfirm={handleConfirmDelete} />}
    </>
  );
}
