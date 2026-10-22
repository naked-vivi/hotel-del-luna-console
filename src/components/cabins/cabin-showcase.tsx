import { useState } from "react";
import CabinPhotoPlaceholder from "@/components/cabins/cabin-photo-placeholder";
import CarouselProgress from "@/components/cabins/carousel-progress";
import { cn } from "@/lib/utils";

function CabinShowcase({ photos, name }: CabinPhotoViewerProps) {
  const [active, setActive] = useState(0);
  const count = photos.length;
  const index = Math.min(active, Math.max(0, count - 1));

  return (
    <div className="group/showcase relative aspect-4/3 overflow-hidden border border-border bg-muted xl:aspect-auto xl:h-full xl:min-h-96">
      {count === 0 ? (
        <CabinPhotoPlaceholder />
      ) : (
        photos.map((url, i) => (
          <img
            key={url}
            src={url}
            alt={i === index ? `Cabin ${name}, photo ${i + 1} of ${count}` : ""}
            aria-hidden={i !== index}
            className={cn("absolute inset-0 size-full object-cover transition-opacity duration-700", i === index ? "opacity-100" : "opacity-0")}
          />
        ))
      )}
      {count > 1 && (
        <CarouselProgress
          count={count}
          active={index}
          onSelect={setActive}
          onComplete={() => setActive((current) => (current + 1) % count)}
        />
      )}
    </div>
  );
}

export default CabinShowcase;
