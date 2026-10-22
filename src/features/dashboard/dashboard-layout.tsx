import TodayActivity from "@/features/check-in-out/today-activity";
import { useRecentBookings } from "./use-recent-bookings";
import { useRecentStays } from "./use-recent-stays";
import CardSkeleton from "@/shared/card-skeleton";
import Stats from "./stats";
import SalesChart from "./sales-chart";
import DurationChart from "./duration-chart";
import useCabins from "../cabins/use-cabins";
import { DURATION_CARD, SALES_CARD } from "./card-sizes";

/** Each card handles its own failure: figures read N/A, charts show the clouded-moon note. */
function DashboardLayout() {
  const { bookings, isPending: isPending1, error: bookingsError, numDays } = useRecentBookings();
  const { confirmedStays, isPending: isPending2, error: staysError } = useRecentStays();
  const { cabins = [], isPending: isPending3, error: cabinsError } = useCabins();

  const isLoading = isPending1 || isPending2 || isPending3;

  return (
    <div className="grid min-w-0 grid-cols-1 gap-6 @min-[64rem]:grid-cols-4">
      <Stats
        isLoading={isLoading}
        errors={{ bookings: Boolean(bookingsError), stays: Boolean(staysError), cabins: Boolean(cabinsError) }}
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />

      <TodayActivity isLoading={isLoading} />

      {isLoading ? <CardSkeleton className={DURATION_CARD} label="Loading length of stay" /> : <DurationChart confirmedStays={confirmedStays} error={staysError} />}

      {isLoading ? <CardSkeleton className={SALES_CARD} label="Loading revenue" /> : <SalesChart bookings={bookings} numDays={numDays} error={bookingsError} />}
    </div>
  );
}

export default DashboardLayout;
