import { useSearchParams } from "react-router-dom";
import BookingTable from "@/features/bookings/booking-table";
import BookingTableOperations from "@/features/bookings/booking-table-operations";
import RoomChart from "@/features/bookings/room-chart";
import PageHeader from "@/shared/page-header";

function Bookings() {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") === "chart" ? "chart" : "list";

  return (
    <>
      <PageHeader
        eyebrow="Reservations"
        title="All bookings"
        description="Every stay in the house, from first enquiry to farewell."
        actions={<BookingTableOperations view={view} />}
      />
      {view === "chart" ? <RoomChart /> : <BookingTable />}
    </>
  );
}

export default Bookings;
