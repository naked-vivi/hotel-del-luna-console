import { useRef, useState } from "react";
import type { DragEvent } from "react";
import { toast } from "sonner";
import { ImagePlusIcon } from "@/components/icons/icons";
import PhotoTile from "@/components/cabins/photo-tile";
import { cn } from "@/lib/utils";
import { moveToFront, photosFromFiles } from "@/lib/helpers";
import { CABIN_PHOTO_LIMIT, CABIN_PHOTO_MAX_MB } from "@/lib/constants";

function PhotoPicker({ value, onChange, invalid, describedBy }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isFull = value.length >= CABIN_PHOTO_LIMIT;

  function addFiles(files: File[]) {
    const { photos, rejected } = photosFromFiles(files, value.length);
    for (const { name, reason } of rejected) toast.error(`“${name}” wasn't added`, { description: reason });
    if (photos.length) onChange([...value, ...photos]);
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(event.dataTransfer.files));
  }

  function handleRemove(id: string) {
    const photo = value.find((entry) => entry.id === id);
    if (photo?.file) URL.revokeObjectURL(photo.url);
    onChange(value.filter((entry) => entry.id !== id));
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        disabled={isFull}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => { event.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        aria-describedby={describedBy}
        className={cn(
          "flex w-full flex-col items-center gap-3 border border-dashed px-6 py-9 text-center transition-colors focus-visible:outline-1 focus-visible:outline-ring disabled:opacity-50",
          isDragging ? "border-gold bg-gold/5" : invalid ? "border-destructive" : "border-input hover:border-foreground/40",
        )}
      >
        <ImagePlusIcon aria-hidden="true" className="size-7 text-muted-foreground" />
        <span className="text-[15px] text-foreground">{isFull ? "Photo limit reached" : "Drop photos here, or choose files"}</span>
        <span className="text-xs text-muted-foreground">
          JPG, PNG, WebP or AVIF · up to {CABIN_PHOTO_MAX_MB} MB each · {value.length} of {CABIN_PHOTO_LIMIT}
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => {
          addFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />

      {value.length > 0 && (
        <ul aria-label="Cabin photos" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((photo, index) => (
            <PhotoTile
              key={photo.id}
              photo={photo}
              index={index}
              isCover={index === 0}
              onMakeCover={(id) => onChange(moveToFront(value, id))}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default PhotoPicker;
