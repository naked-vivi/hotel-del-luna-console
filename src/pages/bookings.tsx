import BookingTable from "@/components/bookings/booking-table";
import BookingTableOperations from "@/components/bookings/booking-table-operations";
import RoomChart from "@/components/bookings/room-chart";
import PageHeader from "@/components/shared/page-header";
import { useSearchParam } from "@/hooks/shared/use-search-param";
import useTitle from "@/hooks/shared/use-title";

function Bookings() {
  useTitle("Bookings");
  const [viewParam] = useSearchParam("view");
  const view: BookingView = viewParam === "chart" ? "chart" : "list";

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
