import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/icons";

function CarouselArrow({ direction, onClick }: CarouselArrowProps) {
  const Icon = direction === "previous" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "previous" ? "Previous photo" : "Next photo"}
      className="flex size-8 items-center justify-center border border-border bg-card/90 text-foreground transition-colors hover:bg-card focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring"
    >
      <Icon aria-hidden="true" className="size-3.5" />
    </button>
  );
}

export default CarouselArrow;
