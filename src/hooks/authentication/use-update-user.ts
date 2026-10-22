import { toast } from "sonner";
import { updateCurrentUser } from "@/services/api-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }, { password }) => {
            queryClient.setQueryData(["user"], user);
            toast.success(password ? "Password updated" : "Profile updated");
            return queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error: Error) => {
            toast.error("Couldn't update your account", { description: error.message });
        },
    })
    return { updateUser, isUpdating }
}