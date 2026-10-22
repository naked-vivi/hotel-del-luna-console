import { Link } from "react-router-dom";
import CabinNumber from "@/components/cabins/cabin-number";
import CabinActions from "@/components/cabins/cabin-actions";
import CabinAmenityStrip from "@/components/cabins/cabin-amenity-strip";
import CabinCarousel from "@/components/cabins/cabin-carousel";
import { cabinPhotos, nightlyRate } from "@/lib/helpers";

function CabinCard({ cabin, actions, isPreview = false }: CabinCardProps) {
  const details = [`Sleeps ${cabin.maxCapacity}`, cabin.size ? `${cabin.size} m²` : null].filter(Boolean).join(" · ");
  const title = <CabinNumber name={cabin.name} className="text-3xl leading-9" />;

  return (
    <article className="flex min-w-0 flex-col border border-border bg-card">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <CabinCarousel photos={cabinPhotos(cabin)} name={cabin.name} href={isPreview ? undefined : `/cabins/${cabin.id}`} />
        {cabin.discount > 0 && (
          <span className="absolute top-3 left-3 z-10 border border-status-success/30 bg-card px-2.5 pt-1 pb-0.5 text-[10px] font-semibold tracking-[0.22em] text-status-success uppercase">
            ${cabin.discount} off
          </span>
        )}
        {actions && (
          <div className="absolute top-2 right-2 z-10">
            <CabinActions cabin={cabin} {...actions} triggerClassName="border border-border bg-card hover:bg-card dark:hover:bg-card" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          {isPreview ? title : (
            <Link to={`/cabins/${cabin.id}`} className="transition-opacity hover:opacity-80 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring">
              {title}
            </Link>
          )}
          <p className="pt-1 text-right whitespace-nowrap">
            {cabin.discount > 0 && (
              <span className="mr-2 text-sm text-muted-foreground tabular-nums line-through">${cabin.regularPrice}</span>
            )}
            <span className="text-xl font-light tabular-nums">${nightlyRate(cabin)}</span>
            <span className="ml-1 text-xs text-muted-foreground">/ night</span>
          </p>
        </div>

        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
          {cabin.description || "No description yet."}
        </p>

        <CabinAmenityStrip amenities={cabin.amenities} />

        <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4 text-[10.5px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
          <span>{details}</span>
          <span>{cabin.discount > 0 ? "Offer" : "Standard rate"}</span>
        </div>
      </div>
    </article>
  );
}

export default CabinCard;
