import { logout as logoutApi } from "@/services/api-auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: logout, isPending } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries()
            navigate("/login", { replace: true })
        },
        onError: (err: Error) => {
            toast.error("Couldn't log out", { description: err.message })
        }
    })
    return { logout, isPending }
}

export default useLogout