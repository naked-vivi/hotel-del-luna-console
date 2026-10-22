import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CheckIcon, ChevronDownIcon } from "@/components/icons/icons";
import SearchEmptyNote from "@/components/shared/search-empty-note";
import { cn } from "@/lib/utils";
import { filterGuestOptions } from "@/lib/helpers";

function GuestCombobox({ guests, value, onChange, invalid, isLoading, describedBy }: GuestComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const selected = guests.find((guest) => guest.id === Number(value));
  const matches = filterGuestOptions(guests, query);

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
    if (!open) setQuery("");
  }

  function handleSelect(id: number) {
    onChange(id);
    handleOpenChange(false);
  }

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger
        id="guestId"
        disabled={isLoading}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        className="flex h-10 w-full items-center gap-3 border border-input bg-transparent px-3.5 text-left text-sm transition-colors outline-none hover:border-foreground/40 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 aria-invalid:border-destructive"
      >
        {selected ? (
          <>
            {selected.countryFlag && <img src={selected.countryFlag} alt="" className="h-3 w-4.5 shrink-0 object-cover" />}
            <span className="truncate pt-0.5">{selected.fullName}</span>
            <span className="truncate pt-0.5 text-xs text-muted-foreground">{selected.email}</span>
          </>
        ) : (
          <span className="pt-0.5 text-muted-foreground">{isLoading ? "Loading guests…" : "Choose a guest"}</span>
        )}
        <ChevronDownIcon aria-hidden="true" className="ml-auto size-4 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="w-(--anchor-width) min-w-80 p-0">
        <Command shouldFilter={false} loop>
          <CommandInput value={query} onValueChange={setQuery} placeholder="Search by name or email…" />
          <CommandList className="max-h-96">
            <CommandEmpty>
              <SearchEmptyNote title={`No guest matches “${query.trim()}”`} message="Check the spelling, or switch to New guest." />
            </CommandEmpty>
            {matches.length > 0 && (
              <CommandGroup>
                {matches.map((guest) => (
                  <CommandItem key={guest.id} value={String(guest.id)} onSelect={() => handleSelect(guest.id)} className="py-3.5">
                    <span className="flex h-3.5 w-5 shrink-0 items-center">
                      {guest.countryFlag && <img src={guest.countryFlag} alt="" className="h-3.5 w-5 object-cover" />}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="truncate text-[14px]">{guest.fullName}</span>
                      <span className="truncate text-xs text-muted-foreground">{guest.email}</span>
                    </span>
                    <CheckIcon aria-hidden="true" className={cn("size-4 shrink-0 text-gold", guest.id !== Number(value) && "invisible")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default GuestCombobox;
