import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/shared/empty-state";
import ErrorNote from "@/components/shared/error-note";
import ErrorPanel from "@/components/shared/error-panel";
import VacantCabins from "@/components/cabins/vacant-cabins";

function CabinUnavailable({ error }: CabinUnavailableProps) {
  if (error) {
    return (
      <ErrorPanel>
        <ErrorNote title="The cabin is in the fog" message={error.message} drawing={<VacantCabins clouded className="w-full max-w-64" />} />
      </ErrorPanel>
    );
  }

  return (
    <EmptyState
      drawing={<VacantCabins className="w-full max-w-56" />}
      title="This cabin doesn't exist"
      action={<Button render={<Link to="/cabins" />} nativeButton={false}>All cabins</Button>}
    >
      It may have been removed, or the link is wrong. Every cabin is listed on the cabins page.
    </EmptyState>
  );
}

export default CabinUnavailable;
