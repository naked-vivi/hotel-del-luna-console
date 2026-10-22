import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AccessTag from "@/components/shared/access-tag";
import { usePermissions } from "@/hooks/authentication/use-permissions";

function AddCabinButton() {
  const lock = usePermissions().lockFor("cabins.manage");

  if (lock) {
    return (
      <>
        <AccessTag reason={lock} />
        <Button disabled>Add cabin</Button>
      </>
    );
  }

  return <Button render={<Link to="/cabins/new" />} nativeButton={false}>Add cabin</Button>;
}

export default AddCabinButton;
