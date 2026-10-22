import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getGuestSummaries } from "@/services/api-guests";
import { pageSlice, parsePage, searchGuests } from "@/lib/helpers";
import { GUESTS_PAGE_SIZE } from "@/lib/constants";

export function useGuests() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const page = parsePage(searchParams.get("page"));

  const { data = [], isPending, error } = useQuery({
    queryKey: ["guests", "summaries"],
    queryFn: getGuestSummaries,
  });

  const matches = searchGuests(data, search);

  return {
    guests: pageSlice(matches, page, GUESTS_PAGE_SIZE),
    count: matches.length,
    total: data.length,
    page,
    search,
    isPending,
    error,
  };
}
