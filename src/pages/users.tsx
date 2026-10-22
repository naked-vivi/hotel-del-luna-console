import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/page-header";
import StaffTable from "@/components/staff/staff-table";
import AddStaffModal from "@/components/staff/add-staff-modal";
import useTitle from "@/hooks/shared/use-title";
import AccessTag from "@/components/shared/access-tag";
import SearchInput from "@/components/shared/search-input";
import Filter from "@/components/shared/filter";
import { STAFF_ROLE_FILTER_OPTIONS } from "@/lib/options";
import { usePermissions } from "@/hooks/authentication/use-permissions";

function Users() {
  useTitle("Staff");
  const [isAdding, setIsAdding] = useState(false);
  const lock = usePermissions().lockFor("staff.manage");

  return (
    <>
      <PageHeader
        eyebrow="The team"
        title="Staff"
        description="Everyone with access to the console. View, edit or remove an account, or add someone new."
        toolbar={
          <>
            <SearchInput param="search" label="Find staff by name or email" placeholder="Name or email" />
            <Filter filterField="role" options={STAFF_ROLE_FILTER_OPTIONS} />
            {lock && <AccessTag reason={lock} />}
            <Button disabled={Boolean(lock)} onClick={() => setIsAdding(true)}>Add staff</Button>
          </>
        }
      />
      <StaffTable onAdd={() => setIsAdding(true)} />
      <AddStaffModal isOpen={isAdding} onClose={() => setIsAdding(false)} />
    </>
  );
}

export default Users;
