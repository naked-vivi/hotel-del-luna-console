import { useState } from "react";
import { Link } from "react-router-dom";
import CabinPhotoPlaceholder from "@/components/cabins/cabin-photo-placeholder";
import CarouselArrow from "@/components/cabins/carousel-arrow";
import { cn } from "@/lib/utils";

function CabinCarousel({ photos, name, href }: CabinCarouselProps) {
  const [active, setActive] = useState(0);
  const count = photos.length;
  const index = Math.min(active, Math.max(0, count - 1));

  if (count === 0) return <CabinPhotoPlaceholder />;

  return (
    <div className="relative size-full overflow-hidden">
      <div className="flex size-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {photos.map((url, i) => (
          <img key={url} src={url} alt={i === index ? `Cabin ${name}, photo ${i + 1} of ${count}` : ""} aria-hidden={i !== index} className="size-full shrink-0 object-cover" />
        ))}
      </div>
      {href && <Link to={href} aria-label={`Open cabin ${name}`} className="absolute inset-0" />}
      {count > 1 && (
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3">
          <div className="flex gap-1.5 bg-card/90 px-2 py-1.5" aria-hidden="true">
            {photos.map((url, i) => (
              <span key={url} className={cn("size-1.5", i === index ? "bg-gold" : "bg-muted-foreground/40")} />
            ))}
          </div>
          <div className="flex gap-1.5">
            <CarouselArrow direction="previous" onClick={() => setActive((index - 1 + count) % count)} />
            <CarouselArrow direction="next" onClick={() => setActive((index + 1) % count)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CabinCarousel;
