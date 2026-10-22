import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { updateUserAccount } from "@/services/api-users";

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  const { mutate: updateStaff, isPending: isUpdating } = useMutation({
    mutationFn: updateUserAccount,
    onSuccess: (account) => {
      toast.add({ type: "success", description: `${account.fullName || "The account"} was updated.` });
      queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => toast.add({ type: "error", description: error.message }),
  });

  return { updateStaff, isUpdating };
}
