import SortBy from "@/shared/sort-by";
import Filter from "@/shared/filter";
import { ListViewIcon, RoomChartIcon } from "@/shared/icons";

/** View switch, status filter, and (in the list) sorting. The room chart is always in date order. */
function BookingTableOperations({ view = "list" }: { view?: "list" | "chart" }) {
  return (
    <div className="flex min-w-0 max-w-full flex-wrap items-center justify-end gap-3">
      <Filter
        filterField="view"
        options={[
          { value: "list", label: <ListViewIcon />, title: "List view" },
          { value: "chart", label: <RoomChartIcon />, title: "Room chart" },
        ]}
      />
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "unconfirmed", label: "Unconfirmed" },
          { value: "checked-in", label: "Checked in" },
          { value: "checked-out", label: "Checked out" },
        ]}
      />
      {view === "list" && <SortBy options={[
        { value: "startDate-desc", label: "Sort by date (recent first)" },
        { value: "startDate-asc", label: "Sort by date (earlier first)" },
        {
          value: "totalPrice-desc",
          label: "Sort by amount (high first)",
        },
        { value: "totalPrice-asc", label: "Sort by amount (low first)" },
      ]} />}
    </div>

  );
}

export default BookingTableOperations;
