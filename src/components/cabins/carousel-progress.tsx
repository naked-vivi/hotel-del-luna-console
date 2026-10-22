import { CAROUSEL_INTERVAL_MS } from "@/lib/constants";

function CarouselProgress({ count, active, onSelect, onComplete }: CarouselProgressProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-4 bg-primary-950/45 px-5 py-3">
      <div role="group" aria-label="Photos" className="flex flex-1 gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active ? "true" : undefined}
            className="flex h-5 flex-1 items-center focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="relative block h-0.5 w-full bg-white/30">
              {i < active && <span className="absolute inset-y-0 left-0 w-full bg-white" />}
              {i === active && (
                <span
                  key={active}
                  onAnimationEnd={onComplete}
                  className="absolute inset-y-0 left-0 bg-white group-hover/showcase:[animation-play-state:paused]"
                  style={{ animation: `carousel-progress ${CAROUSEL_INTERVAL_MS}ms linear forwards` }}
                />
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CarouselProgress;
