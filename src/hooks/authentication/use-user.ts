import { getCurrentUser } from "@/services/api-auth"
import { useQuery } from "@tanstack/react-query"

function useUser() {
    const { data: user, isPending } = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    })
    return { user, isPending, isAuthenticated: user?.role === "authenticated" }
}

export default useUser