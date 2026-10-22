import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchEverything } from "@/services/api-search";
import { usePermissions } from "@/hooks/authentication/use-permissions";
import { searchPages } from "@/lib/helpers";
import { SEARCH_DEBOUNCE_MS, SEARCH_MIN_LENGTH, SEARCH_STALE_TIME } from "@/lib/constants";

export function useGlobalSearch() {
  const [query, setQuery] = useState("");
  const [term, setTerm] = useState("");
  const { canView } = usePermissions();
  const includeStaff = canView("staff.view");

  useEffect(() => {
    const timeout = window.setTimeout(() => setTerm(query.trim()), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const { data = [], isFetching } = useQuery({
    queryKey: ["global-search", term, includeStaff],
    queryFn: () => searchEverything(term, includeStaff),
    enabled: term.length >= SEARCH_MIN_LENGTH,
    staleTime: SEARCH_STALE_TIME,
  });

  return {
    query,
    setQuery,
    results: [...searchPages(query, canView), ...(term ? data : [])],
    isSearching: isFetching || query.trim() !== term,
  };
}
