import EmptySearch from "@/components/shared/empty-search";

function SearchEmptyNote({ title, message, drawing }: SearchEmptyNoteProps) {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-10 text-center">
      {drawing ?? <EmptySearch className="w-36" />}
      <div className="space-y-1.5">
        <p className="text-[15px] text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default SearchEmptyNote;
