import CabinForm from "@/components/cabins/cabin-form";
import PageHeader from "@/components/shared/page-header";
import BackButton from "@/components/shared/back-button";
import useTitle from "@/hooks/shared/use-title";

function NewCabin() {
  useTitle("New cabin");

  return (
    <>
      <PageHeader
        eyebrow="Accommodation"
        title="Add a cabin"
        description="Photos, rates and the little details guests look for. You can change everything later."
        actions={<BackButton />}
      />
      <CabinForm />
    </>
  );
}

export default NewCabin;
