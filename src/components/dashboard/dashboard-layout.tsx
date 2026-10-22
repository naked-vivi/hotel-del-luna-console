import TodayActivity from "@/components/check-in-out/today-activity";
import { useRecentBookings } from "@/hooks/dashboard/use-recent-bookings";
import { useRecentStays } from "@/hooks/dashboard/use-recent-stays";
import CardSkeleton from "@/components/shared/card-skeleton";
import Stats from "@/components/dashboard/stats";
import SalesChart from "@/components/dashboard/sales-chart";
import DurationChart from "@/components/dashboard/duration-chart";
import useCabins from "@/hooks/cabins/use-cabins";
import GuestCountries from "@/components/dashboard/guest-countries";
import RevenueByCabin from "@/components/dashboard/revenue-by-cabin";
import { CABIN_REVENUE_CARD, COUNTRIES_SKELETON, DURATION_CARD, SALES_CARD } from "@/lib/constants";

function DashboardLayout() {
  const { bookings, isPending: isPending1, error: bookingsError, numDays } = useRecentBookings();
  const { stays, confirmedStays, isPending: isPending2, error: staysError } = useRecentStays();
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

      {isLoading ? <CardSkeleton className={COUNTRIES_SKELETON} label="Loading guest countries" /> : <GuestCountries stays={stays} error={staysError} />}

      {isLoading ? <CardSkeleton className={CABIN_REVENUE_CARD} label="Loading revenue by cabin" /> : <RevenueByCabin bookings={bookings} cabins={cabins} error={bookingsError || cabinsError} />}
    </div>
  );
}

export default DashboardLayout;
