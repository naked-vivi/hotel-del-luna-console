import SortBy from "@/components/shared/sort-by";
import Filter from "@/components/shared/filter";
import { BOOKING_SORT_OPTIONS, BOOKING_STATUS_OPTIONS, BOOKING_VIEW_OPTIONS } from "@/lib/options";

function BookingTableOperations({ view = "list" }: BookingTableOperationsProps) {
  return (
    <div className="flex min-w-0 max-w-full flex-wrap items-center justify-end gap-3">
      <Filter filterField="view" options={BOOKING_VIEW_OPTIONS} />
      <Filter filterField="status" options={BOOKING_STATUS_OPTIONS} />
      {view === "list" && <SortBy options={BOOKING_SORT_OPTIONS} />}
    </div>
  );
}

export default BookingTableOperations;
