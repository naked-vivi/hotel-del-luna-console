import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getUserAccounts } from "@/services/api-users";
import useUser from "@/hooks/authentication/use-user";
import { parsePage } from "@/lib/helpers";

export function useStaffAccounts() {
  const [searchParams] = useSearchParams();
  const page = parsePage(searchParams.get("page"));
  const { user } = useUser();

  const { data, error, isPending, isFetching } = useQuery({
    queryKey: ["user-accounts", page],
    queryFn: () => getUserAccounts(page),
    enabled: Boolean(user),
    retry: false,
  });

  return {
    accounts: data?.users ?? [],
    count: data?.count ?? 0,
    page: data?.page ?? page,
    error,
    isPending,
    isFetching,
    currentUserId: user?.id,
  };
}
