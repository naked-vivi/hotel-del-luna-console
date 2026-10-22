import { useState } from "react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/page-header";
import StaffTable from "@/components/staff/staff-table";
import AddStaffModal from "@/components/staff/add-staff-modal";
import useTitle from "@/hooks/shared/use-title";

function Users() {
  useTitle("Staff");
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="The team"
        title="Staff"
        description="Everyone with access to the console. View, edit or remove an account, or add someone new."
        actions={<Button onClick={() => setIsAdding(true)}>Add staff</Button>}
      />
      <StaffTable onAdd={() => setIsAdding(true)} />
      <AddStaffModal isOpen={isAdding} onClose={() => setIsAdding(false)} />
    </>
  );
}

export default Users;
