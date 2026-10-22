import { Skeleton } from "@/components/ui/skeleton";
import { CABIN_GALLERY_GRID, CABIN_SKELETON_CARDS } from "@/lib/constants";

function CabinGallerySkeleton({ cards = CABIN_SKELETON_CARDS }: CabinGallerySkeletonProps) {
  return (
    <div className="@container" aria-busy="true" aria-label="Loading cabins">
      <div className={CABIN_GALLERY_GRID}>
        {Array.from({ length: cards }, (_, i) => (
          <div key={i} className="flex flex-col border border-border bg-card">
            <Skeleton className="aspect-4/3 w-full" />
            <div className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="mt-1 h-7 w-20" />
              </div>
              <Skeleton className="h-10 w-full" />
              <div className="border-t border-border pt-4"><Skeleton className="h-4 w-full" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CabinGallerySkeleton;
