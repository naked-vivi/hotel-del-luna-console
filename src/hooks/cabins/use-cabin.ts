import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCabin } from "@/services/api-cabins";
import { isRecordId } from "@/lib/helpers";

export function useCabin() {
  const { cabinId } = useParams();
  const id = Number(cabinId);
  const isValidId = isRecordId(id);

  const { data: cabin, isPending, error } = useQuery({
    queryKey: ["cabin", id],
    queryFn: () => getCabin(id),
    enabled: isValidId,
    retry: false,
  });

  return { cabin: cabin ?? null, cabinId: id, isPending: isValidId && isPending, error };
}
