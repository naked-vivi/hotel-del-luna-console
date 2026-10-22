import { getStaysTodayActivity } from "@/services/api-bookings"
import { useQuery } from "@tanstack/react-query"


function useTodayActivity() {
    const { isPending, error, data: activities = [] } = useQuery({
        queryFn: getStaysTodayActivity,
        queryKey: ['today-activity']
    })

    return { isPending, activities, error }
}

export default useTodayActivity