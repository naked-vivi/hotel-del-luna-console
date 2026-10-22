import { useParams } from "react-router-dom"
import BookingDetail from "@/components/bookings/booking-detail"
import useTitle from "@/hooks/shared/use-title"


function Booking() {
    const { bookingId } = useParams()
    useTitle(`Booking #${bookingId}`)

    return (
        <BookingDetail />
    )
}

export default Booking
