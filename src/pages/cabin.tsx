import CabinDetails from "@/components/cabins/cabin-details";
import { useCabin } from "@/hooks/cabins/use-cabin";
import useTitle from "@/hooks/shared/use-title";

function Cabin() {
  const { cabin } = useCabin();
  useTitle(cabin ? `Cabin N° ${cabin.name}` : "Cabin");

  return <CabinDetails />;
}

export default Cabin;
