import { Table, TableBody } from "@/components/ui/table";
import EmptyState from "@/components/shared/empty-state";
import ErrorNote from "@/components/shared/error-note";
import ErrorPanel from "@/components/shared/error-panel";
import EmptyGuestBook from "@/components/guests/empty-guest-book";
import { PaginationPage } from "@/components/shared/pagination-page";
import GuestTableHeader from "@/components/guests/guest-table-header";
import GuestTableSkeleton from "@/components/guests/guest-table-skeleton";
import GuestRow from "@/components/guests/guest-row";
import { useGuests } from "@/hooks/guests/use-guests";
import { useExpandedGuest } from "@/hooks/guests/use-expanded-guest";
import { GUESTS_PAGE_SIZE } from "@/lib/constants";

function GuestTable() {
  const { guests, count, total, page, search, isPending, error } = useGuests();
  const { expandedId, toggle } = useExpandedGuest();

  if (isPending) return <GuestTableSkeleton />;

  if (error) {
    return (
      <ErrorPanel>
        <ErrorNote title="The guest book is out of reach" message={error.message} drawing={<EmptyGuestBook clouded className="w-full max-w-64" />} />
      </ErrorPanel>
    );
  }

  if (total === 0) return <EmptyState drawing={<EmptyGuestBook className="w-full max-w-56" />} title="No guests yet">Guests appear here after their first booking.</EmptyState>;
  if (count === 0) return <EmptyState drawing={<EmptyGuestBook className="w-full max-w-56" />} title={`No guest matches “${search}”`}>Try another name or email, or clear the search.</EmptyState>;

  return (
    <>
      <div className="min-w-0 border border-border bg-card">
        <Table className="min-w-160" aria-label="Guests">
          <GuestTableHeader />
          <TableBody>
            {guests.map((guest) => <GuestRow key={guest.id} guest={guest} isExpanded={guest.id === expandedId} onToggle={toggle} />)}
          </TableBody>
        </Table>
      </div>
      {count > GUESTS_PAGE_SIZE && (
        <div className="mt-8 flex justify-center">
          <PaginationPage count={count} page={page} pageSize={GUESTS_PAGE_SIZE} />
        </div>
      )}
    </>
  );
}

export default GuestTable;
