import { useState } from "react";
import { Link } from "react-router-dom";
import { MoreIcon } from "@/shared/icons";
import { ReservationCardIcon, KeyOnTagIcon, DoorAjarIcon, WastebasketIcon } from "@/shared/drawn-icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BOOKINGS_PAGE_SIZE } from "@/services/api-bookings";
import { formatBookingDate, formatCurrency } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginationPage } from "@/shared/pagination-page";
import ConfirmDelete from "@/shared/confirm-delete";
import EmptyState from "@/shared/empty-state";
import StatusTag from "@/shared/status-tag";
import useBookings from "./use-bookings";
import { useCheckout } from "../check-in-out/use-checkout";
import { useDeleteBooking } from "./use-delete-booking";


type BookingActionsProps = {
  id: number;
  status: string;
  busy: boolean;
  onCheckout: (id: number) => void;
  onDelete: (id: number) => void;
};

function BookingActions({ id, status, busy, onCheckout, onDelete }: BookingActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for booking #${id}`}><MoreIcon aria-hidden="true" className="stroke-[1.5]" /></Button>} />
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={<Link to={`/bookings/${id}`} />}><ReservationCardIcon aria-hidden="true" className="size-5" />View details</DropdownMenuItem>
        {status === "unconfirmed" && <DropdownMenuItem render={<Link to={`/checkin/${id}`} />}><KeyOnTagIcon aria-hidden="true" className="size-5" />Check-in</DropdownMenuItem>}
        {status === "checked-in" && <DropdownMenuItem disabled={busy} onClick={() => onCheckout(id)}><DoorAjarIcon aria-hidden="true" className="size-5" />Check-out</DropdownMenuItem>}
        <DropdownMenuItem className="text-destructive [--icon-accent:currentColor] focus:text-destructive" disabled={busy} onClick={() => onDelete(id)}><WastebasketIcon aria-hidden="true" className="size-5" />Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function BookingTableHeader() {
  return (
    <TableHeader><TableRow>
      <TableHead>Cabin</TableHead><TableHead>Guest</TableHead><TableHead>Dates</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Amount</TableHead><TableHead><span className="sr-only">Actions</span></TableHead>
    </TableRow></TableHeader>
  );
}

/** Placeholder rows: one block per cell, all the same height as the real row's content, so nothing jumps. */
function BookingTableSkeleton({ rows = 8 }: { rows?: number }) {
  return (
    <div className="min-w-0 border border-border bg-card" aria-busy="true" aria-label="Loading bookings">
      <Table>
        <BookingTableHeader />
        <TableBody>{Array.from({ length: rows }, (_, i) => (
          <TableRow key={i} className="hover:bg-transparent">
            {/* Every block is 40px, the height of the row's action button, so all cells line up. */}
            <TableCell><Skeleton className="h-10 w-16" /></TableCell>
            <TableCell><Skeleton className="h-10 w-44" /></TableCell>
            <TableCell><Skeleton className="h-10 w-36" /></TableCell>
            <TableCell><Skeleton className="h-10 w-24" /></TableCell>
            <TableCell><Skeleton className="ml-auto h-10 w-20" /></TableCell>
            <TableCell><Skeleton className="ml-auto size-10" /></TableCell>
          </TableRow>
        ))}</TableBody>
      </Table>
    </div>
  );
}

export default function BookingTable() {
  const [deletingBookingId, setDeletingBookingId] = useState<number | null>(null);
  const { bookings, isPending, error, count, page } = useBookings();
  const { checkOut, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const actions = { busy: isCheckingOut || isDeletingBooking, onCheckout: (id: number) => checkOut(id), onDelete: setDeletingBookingId };

  if (isPending) return <BookingTableSkeleton />;
  if (error) return <p role="alert">{error.message}</p>;
  if (bookings.length === 0) return <EmptyState title="No bookings here">Try another status filter, or check back once new guests reserve.</EmptyState>;

  return (
    <>
      <div className="min-w-0 border border-border bg-card">
        <Table>
          <BookingTableHeader />
          <TableBody>{bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell><span className="text-2xl font-extralight"><span className="mr-1.5 align-middle text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">N°</span>{booking.cabins?.name || booking.cabinName}</span></TableCell>
              <TableCell><div className="flex flex-col"><span className="text-[15px]">{booking.guests?.fullName || booking.guestName}</span><span className="text-xs text-muted-foreground">{booking.guests?.email || booking.guestEmail}</span></div></TableCell>
              <TableCell><div className="text-[15px]">{formatBookingDate(booking.startDate)} &ndash; {formatBookingDate(booking.endDate)}</div><span className="text-xs text-muted-foreground">{booking.numNights} {booking.numNights === 1 ? "night" : "nights"}</span></TableCell>
              <TableCell><StatusTag status={booking.status} /></TableCell>
              <TableCell className="text-right text-lg font-light tabular-nums">{formatCurrency(booking.totalPrice)}</TableCell>
              <TableCell className="text-right"><BookingActions id={booking.id} status={booking.status} {...actions} /></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </div>
      {count > BOOKINGS_PAGE_SIZE && <div className="mt-8 flex justify-center"><PaginationPage count={count} page={page} pageSize={BOOKINGS_PAGE_SIZE} /></div>}
      {deletingBookingId !== null && <ConfirmDelete resourceName="Booking" itemName={`#${deletingBookingId}`} isOpen isDeleting={isDeletingBooking} onClose={() => setDeletingBookingId(null)} onConfirm={() => deleteBooking(deletingBookingId, { onSuccess: () => setDeletingBookingId(null) })} />}
    </>
  );
}
