import { Link } from "react-router-dom";
import { MoreIcon } from "@/components/icons/icons";
import { ReservationCardIcon, KeyOnTagIcon, DoorAjarIcon, WastebasketIcon, FountainPenIcon } from "@/components/icons/drawn-icons";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AccessTag from "@/components/shared/access-tag";
import { usePermissions } from "@/hooks/authentication/use-permissions";

function BookingActions({ id, status, busy, onCheckout, onDelete }: BookingActionsProps) {
  const lock = usePermissions().lockFor("bookings.delete");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={`Actions for booking #${id}`}><MoreIcon aria-hidden="true" className="stroke-[1.5]" /></Button>} />
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={<Link to={`/bookings/${id}`} />}><ReservationCardIcon aria-hidden="true" className="size-5" />View details</DropdownMenuItem>
        {status !== "checked-out" && <DropdownMenuItem render={<Link to={`/bookings/${id}/edit`} />}><FountainPenIcon aria-hidden="true" className="size-5" />Edit</DropdownMenuItem>}
        {status === "unconfirmed" && <DropdownMenuItem render={<Link to={`/checkin/${id}`} />}><KeyOnTagIcon aria-hidden="true" className="size-5" />Check-in</DropdownMenuItem>}
        {status === "checked-in" && <DropdownMenuItem disabled={busy} onClick={() => onCheckout(id)}><DoorAjarIcon aria-hidden="true" className="size-5" />Check-out</DropdownMenuItem>}
        <DropdownMenuItem className="text-destructive [--icon-accent:currentColor] focus:text-destructive" disabled={busy || Boolean(lock)} onClick={() => onDelete(id)}><WastebasketIcon aria-hidden="true" className="size-5" />Delete{lock && <AccessTag reason={lock} className="ml-auto" />}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default BookingActions;
