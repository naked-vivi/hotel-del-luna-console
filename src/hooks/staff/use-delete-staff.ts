import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/toast";
import { deleteUserAccount } from "@/services/api-users";

export function useDeleteStaff() {
  const queryClient = useQueryClient();

  const { mutate: deleteStaff, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      toast.add({ type: "success", description: "The account was deleted." });
      queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
    },
    onError: (error: Error) => toast.add({ type: "error", description: error.message }),
  });

  return { deleteStaff, isDeleting };
}
