import { getBookings } from "@/services/api-bookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { DEFAULT_BOOKING_SORT } from "@/lib/constants";
import { parseBookingsFilter, parsePage, parseSort } from "@/lib/helpers";

export default function useBookings() {
    const [searchParams] = useSearchParams();

    // 1. Filter
    const filter = parseBookingsFilter(searchParams.get("status"));

    // 2. Sort
    const sortBy: BookingsSort = parseSort(searchParams.get("sortBy") || DEFAULT_BOOKING_SORT);

    const page = parsePage(searchParams.get("page"));

    // 3. Query
    const {
        isPending,
        error,
        data,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    return { isPending, error, bookings: data?.bookings ?? [], count: data?.count ?? 0, page };
}
