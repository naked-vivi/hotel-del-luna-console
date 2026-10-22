import Filter from "@/components/shared/filter";
import SortBy from "@/components/shared/sort-by";
import SearchInput from "@/components/shared/search-input";
import { CABIN_DISCOUNT_OPTIONS, CABIN_SORT_OPTIONS, CABIN_VIEW_OPTIONS } from "@/lib/options";

function CabinTableOperations() {
  return (
    <>
      <SearchInput param="search" label="Find a cabin by name or number" placeholder="Cabin name or no." />
      <Filter filterField="view" options={CABIN_VIEW_OPTIONS} />
      <Filter filterField="discount" options={CABIN_DISCOUNT_OPTIONS} />
      <SortBy options={CABIN_SORT_OPTIONS} />
    </>
  );
}

export default CabinTableOperations;
