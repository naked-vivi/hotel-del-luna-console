import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteUserAccount } from "@/services/api-users";

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  const { mutate: deleteStaff, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      toast.success("Account deleted");
      queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
    },
    onError: (error: Error) => toast.error("Couldn't delete the account", { description: error.message }),
  });

  return { deleteStaff, isDeleting };
}
