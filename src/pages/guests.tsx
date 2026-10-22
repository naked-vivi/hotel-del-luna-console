import PageHeader from "@/components/shared/page-header";
import SearchInput from "@/components/shared/search-input";
import GuestTable from "@/components/guests/guest-table";
import useTitle from "@/hooks/shared/use-title";

function Guests() {
  useTitle("Guests");

  return (
    <>
      <PageHeader
        eyebrow="The guest book"
        title="Guests"
        description="Everyone who has stayed or booked. Open a guest to see their booking history."
        actions={<SearchInput param="search" label="Find a guest by name or email" placeholder="Name or email" />}
      />
      <GuestTable />
    </>
  );
}

export default Guests;
