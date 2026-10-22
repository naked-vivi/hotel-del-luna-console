import { getBookingsAfterDate } from "@/services/api-bookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { DASHBOARD_PERIOD_PARAM } from "@/lib/constants";
import { parseDashboardPeriod } from "@/lib/helpers";

export function useRecentBookings() {
    const [searchParams] = useSearchParams();

    const numDays = parseDashboardPeriod(searchParams.get(DASHBOARD_PERIOD_PARAM));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isPending, error, data: bookings = [] } = useQuery({
        queryFn: () => getBookingsAfterDate(queryDate),
        queryKey: ["bookings", `last-${numDays}`]
    })
    return { isPending, error, bookings ,numDays}
}
