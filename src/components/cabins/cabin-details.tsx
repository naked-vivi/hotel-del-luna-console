import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/shared/page-header";
import BackButton from "@/components/shared/back-button";
import CabinUnavailable from "@/components/cabins/cabin-unavailable";
import AccessTag from "@/components/shared/access-tag";
import CabinShowcase from "@/components/cabins/cabin-showcase";
import CabinFact from "@/components/cabins/cabin-fact";
import CabinAmenityList from "@/components/cabins/cabin-amenity-list";
import CabinStays from "@/components/cabins/cabin-stays";
import CabinDetailsSkeleton from "@/components/cabins/cabin-details-skeleton";
import { useCabin } from "@/hooks/cabins/use-cabin";
import { usePermissions } from "@/hooks/authentication/use-permissions";
import { cabinPhotos, nightlyRate, pluralize } from "@/lib/helpers";
import { formatCurrency } from "@/lib/utils";

function CabinDetails() {
  const { cabin, isPending, error } = useCabin();
  const lock = usePermissions().lockFor("cabins.manage");

  if (isPending) return <CabinDetailsSkeleton />;
  if (error || !cabin) {
    return (
      <div className="flex flex-col gap-8">
        <PageHeader eyebrow="Cabin" title="Cabin not found" actions={<BackButton />} />
        <CabinUnavailable error={error} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        eyebrow="Cabin"
        title={<><span className="mr-3 align-middle text-sm font-semibold tracking-[0.14em] text-muted-foreground">N°</span>{cabin.name}</>}
        meta={cabin.discount > 0 && (
          <span className="border border-status-success/30 px-2.5 pt-1 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-status-success">
            ${cabin.discount} off
          </span>
        )}
        actions={
          <>
            <BackButton />
            {lock && <AccessTag reason={lock} />}
            {lock ? (
              <Button disabled>Edit cabin</Button>
            ) : (
              <Button render={<Link to={`/cabins/${cabin.id}/edit`} />} nativeButton={false}>Edit cabin</Button>
            )}
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] xl:items-stretch">
        <CabinShowcase photos={cabinPhotos(cabin)} name={cabin.name} />

        <section aria-label="Cabin details" className="border border-border bg-card">
          <div className="space-y-2 border-b border-border p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">Per night</p>
            <p className="flex items-baseline gap-3">
              <span className="text-5xl leading-none font-extralight tabular-nums">{formatCurrency(nightlyRate(cabin))}</span>
              {cabin.discount > 0 && <span className="text-base text-muted-foreground tabular-nums line-through">{formatCurrency(cabin.regularPrice)}</span>}
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px border-b border-border bg-border">
            <CabinFact label="Sleeps">{pluralize(cabin.maxCapacity, "guest")}</CabinFact>
            <CabinFact label="Beds">{cabin.bedType ?? "Not set"}</CabinFact>
            <CabinFact label="Size">{cabin.size ? `${cabin.size} m²` : "Not set"}</CabinFact>
            <CabinFact label="Discount">{cabin.discount > 0 ? formatCurrency(cabin.discount) : "None"}</CabinFact>
          </dl>
          <div className="space-y-5 p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-muted-foreground">Amenities</p>
            <CabinAmenityList amenities={cabin.amenities} />
          </div>
        </section>
      </div>

      <section aria-labelledby="cabin-about-title" className="border border-border bg-card px-6 py-6 sm:px-8">
        <h2 id="cabin-about-title" className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">About this cabin</h2>
        <p className="max-w-[75ch] text-[15px] leading-relaxed text-foreground/90">{cabin.description || "No description yet."}</p>
      </section>

      <CabinStays cabinId={cabin.id} />
    </div>
  );
}

export default CabinDetails;
