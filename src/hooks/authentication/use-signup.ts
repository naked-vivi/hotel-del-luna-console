import { toast } from "sonner";
import { signup as signupApi } from "@/services/api-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignup() {
    const queryClient = useQueryClient();
    const { mutate: signup, isPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
            toast.success("Staff account created", {
                description: data?.session
                    ? "They can log in now."
                    : "They can log in once they confirm their email.",
            });
        },
        onError: (error: Error) => {
            toast.error("Couldn't create the account", { description: error.message });
        },
    });

    return { signup, isPending };
}