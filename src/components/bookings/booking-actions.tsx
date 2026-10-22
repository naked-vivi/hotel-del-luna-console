import { Link } from "react-router-dom";
import { MoreIcon } from "@/components/icons/icons";
import { ReservationCardIcon, KeyOnTagIcon, DoorAjarIcon, WastebasketIcon } from "@/components/icons/drawn-icons";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

export default BookingActions;
