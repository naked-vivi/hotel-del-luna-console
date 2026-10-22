import { useQuery } from "@tanstack/react-query";
import { getCabinStays } from "@/services/api-cabins";

export function useCabinStays(cabinId: number) {
  const { data: stays = [], isPending, error } = useQuery({
    queryKey: ["cabin-stays", cabinId],
    queryFn: () => getCabinStays(cabinId),
  });

  return { stays, isPending, error };
}
