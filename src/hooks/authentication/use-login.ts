import { login as loginApi } from "@/services/api-auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { getUserProfile } from "@/lib/helpers"

function useLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isPending, error } = useMutation({
        mutationFn: loginApi,
        onSuccess: ({ user }) => {
            queryClient.setQueryData(['user'], user);
            navigate('/dashboard', { replace: true })
            toast.success(`Welcome back, ${getUserProfile(user).displayName}`)
        },
        onError: (err: Error) => {
            toast.error("Couldn't log in", { description: err.message });
        }
    })
    return { login, isPending, error }
}

export default useLogin
