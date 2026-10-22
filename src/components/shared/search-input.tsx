import { CloseIcon, SearchIcon } from "@/components/icons/icons";
import { Input } from "@/components/ui/input";
import { useDebouncedSearchParam } from "@/hooks/shared/use-debounced-search-param";
import { cn } from "@/lib/utils";

function SearchInput({ param, label, placeholder, inputMode = "search", className }: SearchInputProps) {
  const { value, change, clear } = useDebouncedSearchParam(param);

  return (
    <div role="search" className={cn("relative w-full sm:w-72", className)}>
      <SearchIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(event) => change(event.target.value)}
        onKeyDown={(event) => event.key === "Escape" && clear()}
        placeholder={placeholder}
        aria-label={label}
        inputMode={inputMode}
        autoComplete="off"
        spellCheck={false}
        className="pr-10 pl-10"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          aria-label="Clear search"
          className="absolute top-1/2 right-1 flex size-8 -translate-y-1/2 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-1 focus-visible:outline-ring"
        >
          <CloseIcon aria-hidden="true" className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
