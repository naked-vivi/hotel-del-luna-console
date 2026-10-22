import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CheckoutButton from "@/components/check-in-out/checkout-button";
import { pluralize } from "@/lib/helpers";

function TodayItem({ activity }: TodayItemProps) {
  const { id, guests, status, numNights } = activity;
  const isArrival = status === "unconfirmed";
  const isDeparture = status === "checked-in";

  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-border py-4 text-sm last:border-b-0 @min-[30rem]/activity:grid-cols-[5.5rem_minmax(0,1fr)_4rem_7rem]">
      <span className={cn(
        "justify-self-start border border-current/30 px-2 pt-1 pb-0.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em]",
        isArrival
          ? "bg-status-success-bg text-status-success"
          : "bg-status-info-bg text-status-info",
      )}>
        {isArrival ? "Arriving" : isDeparture ? "Departing" : "Completed"}
      </span>
      
      <div className="grid min-w-0 grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-2">
        <span className="flex h-4 w-6 items-center">
        {guests?.countryFlag && (
          <img src={guests.countryFlag} alt={guests.nationality ?? "Guest country"} className="h-4 w-6 shrink-0 object-cover" />
        )}
        </span>
        <span className="wrap-break-word text-[15px] font-normal" title={guests?.fullName}>{guests?.fullName ?? "Unknown guest"}</span>
      </div>
      <span className="whitespace-nowrap tabular-nums text-muted-foreground @min-[30rem]/activity:text-right">{pluralize(numNights, "night")}</span>
      <div className="flex justify-end [&>button]:w-full [&>a]:w-full">
      {isArrival && (
        <Button size="sm" render={<Link to={`/checkin/${id}`} />}>Check in</Button>
      )}
      {isDeparture && <CheckoutButton bookingId={id} />}
      </div>
    </li>
  );
}

export default TodayItem;
