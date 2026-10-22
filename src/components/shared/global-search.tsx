import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "@/components/ui/command";
import { SearchIcon } from "@/components/icons/icons";
import SearchResultItem from "@/components/shared/search-result-item";
import SearchTypeChips from "@/components/shared/search-type-chips";
import SearchEmptyNote from "@/components/shared/search-empty-note";
import SearchLoading from "@/components/shared/search-loading";
import Telescope from "@/components/shared/telescope";
import { useGlobalSearch } from "@/hooks/shared/use-global-search";
import { useHotkey } from "@/hooks/shared/use-hotkey";
import { SEARCH_PROMPTS } from "@/lib/constants";

function GlobalSearch() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<SearchType | "all">("all");
  const { query, setQuery, results, isSearching } = useGlobalSearch();
  const visible = results.filter((result) => type === "all" || result.type === type);
  const term = query.trim();
  const isLoading = isSearching && Boolean(term);

  useHotkey("k", () => setIsOpen((open) => !open));

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) {
      setQuery("");
      setType("all");
    }
  }

  function handleSelect(result: SearchResult) {
    handleOpenChange(false);
    navigate(result.to);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Search the console"
        className="flex h-10 shrink-0 items-center gap-3 border border-border px-3 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring 2xl:w-64"
      >
        <SearchIcon aria-hidden="true" className="size-4 shrink-0" />
        <span className="hidden flex-1 pt-0.5 text-left text-sm 2xl:block">Search…</span>
        <kbd className="hidden border border-border px-1.5 pt-0.5 font-sans text-[10px] font-semibold tracking-[0.1em] md:block">⌘K</kbd>
      </button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent showCloseButton={false} className="top-[12dvh] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-2xl">
          <DialogTitle className="sr-only">Search the console</DialogTitle>
          <Command shouldFilter={false} loop>
            <CommandInput value={query} onValueChange={setQuery} placeholder="Search bookings, cabins, guests or pages…" />
            <SearchTypeChips value={type} onChange={setType} />
            <CommandList>
              {isLoading ? (
                <SearchLoading />
              ) : (
                <CommandEmpty>
                  {term ? (
                    <SearchEmptyNote title={`Nothing matches “${term}”`} message="Try a guest's name, a booking number or a cabin." />
                  ) : (
                    <SearchEmptyNote {...SEARCH_PROMPTS[type]} drawing={<Telescope className="w-36" />} />
                  )}
                </CommandEmpty>
              )}
              {!isLoading && visible.length > 0 && (
                <CommandGroup heading={term ? "Top match" : "Jump to"}>
                  {visible.map((result) => <SearchResultItem key={result.id} result={result} onSelect={handleSelect} />)}
                </CommandGroup>
              )}
            </CommandList>
            <div className="flex items-center justify-between gap-4 border-t border-border px-5 py-2.5 text-[11px] text-muted-foreground">
              <span>↑ ↓ to move · Enter to open</span>
              <span>Esc to close</span>
            </div>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default GlobalSearch;
