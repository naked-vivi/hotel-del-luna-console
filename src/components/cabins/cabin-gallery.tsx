import CabinCard from "@/components/cabins/cabin-card";
import { CABIN_GALLERY_GRID } from "@/lib/constants";

function CabinGallery({ cabins, actions }: CabinCollectionProps) {
  return (
    <div className="@container">
      <div className={CABIN_GALLERY_GRID}>
        {cabins.map((cabin) => (
          <CabinCard key={cabin.id} cabin={cabin} actions={actions} />
        ))}
      </div>
    </div>
  );
}

export default CabinGallery;
