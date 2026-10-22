import AddCabin from "@/features/cabins/add-cabin";
import CabinTable from "@/features/cabins/cabin-table";
import Filter from "@/shared/filter";
import SortBy from "@/shared/sort-by";
import PageHeader from "@/shared/page-header";
import { GalleryViewIcon, ListViewIcon } from "@/shared/icons";

const sortOptions = [
  { value: "name-asc", label: "Sort by name (A-Z)" },
  { value: "name-desc", label: "Sort by name (Z-A)" },
  { value: "regularPrice-asc", label: "Sort by price (low first)" },
  { value: "regularPrice-desc", label: "Sort by price (high first)" },
  { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
  { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
];

function Cabins() {
  return (
    <div className="min-w-0">
      <PageHeader
        eyebrow="Accommodation"
        title="All cabins"
        description="The rooms of the house, their rates and how many guests each one sleeps."
        actions={
          <>
            <Filter
              filterField="view"
              options={[
                { value: "gallery", label: <GalleryViewIcon />, title: "Gallery view" },
                { value: "list", label: <ListViewIcon />, title: "List view" },
              ]}
            />
            <Filter
              filterField="discount"
              options={[
                { value: "all", label: "All" },
                { value: "with-discount", label: "With discount" },
                { value: "no-discount", label: "No discount" },
              ]}
            />
            <SortBy options={sortOptions} />
          </>
        }
      />

      <CabinTable />
      <AddCabin />
    </div>
  );
}

export default Cabins;
