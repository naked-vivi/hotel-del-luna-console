function PhotoTile({ photo, isCover, index, onMakeCover, onRemove }: PhotoTileProps) {
  return (
    <li className="group relative aspect-4/3 overflow-hidden border border-border bg-muted">
      <img src={photo.url} alt={`Cabin photo ${index + 1}`} className="size-full object-cover" />
      {isCover && (
        <span className="absolute top-2 left-2 border border-gold/40 bg-card px-2 pt-1 pb-0.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-gold">
          Cover
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 flex divide-x divide-border border-t border-border bg-card/95">
        {!isCover && (
          <button
            type="button"
            onClick={() => onMakeCover(photo.id)}
            className="flex-1 px-2 pt-2 pb-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring"
          >
            Make cover
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(photo.id)}
          aria-label={`Remove photo ${index + 1}`}
          className="flex-1 px-2 pt-2 pb-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-destructive/80 transition-colors hover:text-destructive focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring"
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default PhotoTile;
