import { useParams } from "react-router-dom"
import CheckinBooking from "@/components/check-in-out/checkin-booking"
import useTitle from "@/hooks/shared/use-title"

function Checkin() {
    const { bookingId } = useParams()
    useTitle(`Check in #${bookingId}`)

    return (
        <CheckinBooking />
    )
}

export default Checkin
