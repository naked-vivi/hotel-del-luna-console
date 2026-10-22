import CabinForm from "@/components/cabins/cabin-form";
import FormPageSkeleton from "@/components/shared/form-page-skeleton";
import PageHeader from "@/components/shared/page-header";
import BackButton from "@/components/shared/back-button";
import CabinUnavailable from "@/components/cabins/cabin-unavailable";
import { useCabin } from "@/hooks/cabins/use-cabin";
import useTitle from "@/hooks/shared/use-title";

function EditCabin() {
  const { cabin, isPending, error } = useCabin();
  useTitle(cabin ? `Edit N° ${cabin.name}` : "Edit cabin");

  return (
    <>
      <PageHeader
        eyebrow="Accommodation"
        title={cabin ? `Edit N° ${cabin.name}` : "Edit cabin"}
        description="Update the photos, rates and details. Changes show straight away."
        actions={<BackButton />}
      />
      {isPending ? <FormPageSkeleton /> : error || !cabin ? <CabinUnavailable error={error} /> : <CabinForm key={cabin.id} cabin={cabin} />}
    </>
  );
}

export default EditCabin;
