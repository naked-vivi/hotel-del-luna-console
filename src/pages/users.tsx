import Filter from "@/components/shared/filter";
import { LockIcon } from "@/components/icons/icons";
import PageHeader from "@/components/shared/page-header";
import SearchInput from "@/components/shared/search-input";
import AddStaffModal from "@/components/staff/add-staff-modal";
import StaffTable from "@/components/staff/staff-table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePermissions } from "@/hooks/authentication/use-permissions";
import { ACCESS_LOCK_LABELS } from "@/lib/constants";
import useTitle from "@/hooks/shared/use-title";
import { STAFF_ROLE_FILTER_OPTIONS } from "@/lib/options";
import { useState } from "react";

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
            {lock ? (
              <Tooltip>
                <TooltipTrigger
                  render={
                    <span className="inline-flex">
                      <Button disabled onClick={() => setIsAdding(true)}>Add staff</Button>
                    </span>
                  }
                />
                <TooltipContent showArrow={false} className="dark:bg-[#1B2631] border dark:text-[#FAF5F0] bg-[#FAF5F0] text-[#1B2631]">
                  <span className="inline-flex items-center gap-1.5">
                    <LockIcon aria-hidden="true" className="size-3.5" />
                    {ACCESS_LOCK_LABELS[lock]}
                  </span>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button onClick={() => setIsAdding(true)}>Add staff</Button>
            )}
          </>
        }
      />
      <StaffTable onAdd={() => setIsAdding(true)} />
      <AddStaffModal isOpen={isAdding} onClose={() => setIsAdding(false)} />
    </>
  );
}

export default Users;
