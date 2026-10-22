import { Fragment } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronDownIcon } from "@/components/icons/icons";
import ReturningTag from "@/components/guests/returning-tag";
import GuestHistory from "@/components/guests/guest-history";
import { cn, formatBookingDate, formatCurrency } from "@/lib/utils";
import { guestStats } from "@/lib/helpers";

function GuestRow({ guest, isExpanded, onToggle }: GuestRowProps) {
  const stats = guestStats(guest);

  return (
    <Fragment>
      <TableRow data-state={isExpanded ? "selected" : undefined}>
        <TableCell>
          <button
            type="button"
            onClick={() => onToggle(guest.id)}
            aria-expanded={isExpanded}
            aria-controls={`guest-history-${guest.id}`}
            className="flex min-w-0 items-center gap-4 text-left focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <span className="flex size-7 shrink-0 items-center justify-center border border-border text-muted-foreground">
              <ChevronDownIcon aria-hidden="true" className={cn("size-3.5 transition-transform duration-200", isExpanded && "rotate-180")} />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="flex items-center gap-2.5 text-[15px]">
                {guest.fullName}
                {stats.isReturning && <ReturningTag />}
              </span>
              <span className="text-xs text-muted-foreground">{guest.email}</span>
            </span>
          </button>
        </TableCell>
        <TableCell>
          <span className="flex items-center gap-3">
            <span className="flex h-4 w-6 shrink-0 items-center">
              {guest.countryFlag && <img src={guest.countryFlag} alt="" className="h-4 w-6 object-cover" />}
            </span>
            <span className="text-muted-foreground">{guest.nationality ?? "—"}</span>
          </span>
        </TableCell>
        <TableCell className="text-center text-lg font-light tabular-nums">{stats.stays}</TableCell>
        <TableCell className="text-muted-foreground">{stats.lastStay ? formatBookingDate(stats.lastStay) : "No stays yet"}</TableCell>
        <TableCell className="text-right text-lg font-light tabular-nums">{formatCurrency(stats.totalSpent)}</TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow id={`guest-history-${guest.id}`} className="hover:bg-transparent">
          <TableCell colSpan={5} className="p-0">
            <GuestHistory guest={guest} />
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}

export default GuestRow;
