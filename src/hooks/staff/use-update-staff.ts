import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserAccount } from "@/services/api-users";

export function useUpdateStaff() {
  const queryClient = useQueryClient();

  const { mutate: updateStaff, isPending: isUpdating } = useMutation({
    mutationFn: updateUserAccount,
    onSuccess: (account) => {
      toast.success(`${account.fullName || "The account"} updated`);
      queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: Error) => toast.error("Couldn't save the changes", { description: error.message }),
  });

  return { updateStaff, isUpdating };
}
