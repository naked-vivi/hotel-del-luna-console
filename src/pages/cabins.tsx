import AddCabin from "@/components/cabins/add-cabin";
import CabinTable from "@/components/cabins/cabin-table";
import CabinTableOperations from "@/components/cabins/cabin-table-operations";
import PageHeader from "@/components/shared/page-header";
import useTitle from "@/hooks/shared/use-title";

function Cabins() {
  useTitle("Cabins");

  return (
    <div className="min-w-0">
      <PageHeader
        eyebrow="Accommodation"
        title="All cabins"
        description="The rooms of the house, their rates and how many guests each one sleeps."
        actions={<CabinTableOperations />}
      />

      <CabinTable />
      <AddCabin />
    </div>
  );
}

export default Cabins;
