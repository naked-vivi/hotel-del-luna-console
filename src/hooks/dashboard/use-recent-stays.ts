import { getStaysAfterDate } from "@/services/api-bookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { DASHBOARD_PERIOD_PARAM } from "@/lib/constants";
import { isConfirmedStay, parseDashboardPeriod } from "@/lib/helpers";

export function useRecentStays() {
    const [searchParams] = useSearchParams();

    const numDays = parseDashboardPeriod(searchParams.get(DASHBOARD_PERIOD_PARAM));
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { isPending, error, data: stays = [] } = useQuery({
        queryFn: () => getStaysAfterDate(queryDate),
        queryKey: ["stays", `last-${numDays}`]
    })

    const confirmedStays = stays?.filter(isConfirmedStay)

    return { isPending, error, stays, confirmedStays }
}
