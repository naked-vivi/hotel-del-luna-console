import { toast } from "@/components/ui/toast";
import { signup as signupApi } from "@/services/api-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSignup() {
    const queryClient = useQueryClient();
    const { mutate: signup, isPending } = useMutation({
        mutationFn: signupApi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user-accounts"] });
            toast.add({
                type: "success",
                description: data?.session
                    ? "User successfully created."
                    : "Signup request accepted. The user may need to confirm their email before signing in.",
            });
        },
        onError: (error: Error) => {
            toast.add({
                type: "error",
                description: error.message || "Unable to create user. Please try again.",
            });
        },
    });

    return { signup, isPending };
}