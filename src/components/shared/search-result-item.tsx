import { CommandItem } from "@/components/ui/command";
import { SEARCH_TYPES } from "@/lib/options";

function SearchResultItem({ result, onSelect }: SearchResultItemProps) {
  const meta = SEARCH_TYPES.find((entry) => entry.value === result.type);
  const Icon = result.icon ?? meta?.icon;

  return (
    <CommandItem value={result.id} onSelect={() => onSelect(result)}>
      <span className="flex size-9 shrink-0 items-center justify-center border border-border text-muted-foreground">
        {result.flag ? <img src={result.flag} alt="" className="h-3.5 w-5 object-cover" /> : Icon && <Icon aria-hidden="true" className="size-4.5" />}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[14px] text-foreground">{result.title}</span>
        <span className="truncate text-xs text-muted-foreground">{meta?.label.replace(/s$/, "") ?? "Result"} · {result.subtitle}</span>
      </span>
    </CommandItem>
  );
}

export default SearchResultItem;
