import { Controller, useWatch } from "react-hook-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CabinField from "@/components/cabins/cabin-field";
import GuestCombobox from "@/components/bookings/guest-combobox";
import { useGuestOptions } from "@/hooks/guests/use-guest-options";
import { hintAndErrorIds } from "@/lib/helpers";
import { COUNTRIES } from "@/lib/countries";
import { GUEST_MODE_OPTIONS } from "@/lib/constants";
import { flagUrl } from "@/lib/helpers";

function GuestPicker({ control }: GuestPickerProps) {
  const { guests, isPending } = useGuestOptions();
  const mode = useWatch({ control, name: "guestMode" });

  return (
    <div className="space-y-6">
      <Controller
        name="guestMode"
        control={control}
        render={({ field }) => (
          <Tabs value={field.value} onValueChange={field.onChange}>
            <TabsList aria-label="Guest" className="group-data-horizontal/tabs:h-auto">
              {GUEST_MODE_OPTIONS.map((option) => (
                <TabsTrigger key={option.value} value={option.value} className="h-10 flex-none">{option.label}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
      />

      {mode === "existing" ? (
        <Controller
          name="guestId"
          control={control}
          render={({ field, fieldState }) => (
            <CabinField required id="guestId" label="Guest" hint="Search everyone who has stayed or booked before." error={fieldState.error}>
              <GuestCombobox
                guests={guests}
                value={field.value}
                onChange={field.onChange}
                isLoading={isPending}
                invalid={fieldState.invalid}
                describedBy={hintAndErrorIds("guestId", fieldState.invalid)}
              />
            </CabinField>
          )}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          <Controller
            name="guestName"
            control={control}
            render={({ field, fieldState }) => (
              <CabinField required id="guestName" label="Full name" error={fieldState.error}>
                <Input {...field} id="guestName" autoComplete="off" placeholder="e.g. Ji Hyun-joong" aria-invalid={fieldState.invalid} aria-describedby={fieldState.invalid ? "guestName-error" : undefined} />
              </CabinField>
            )}
          />
          <Controller
            name="guestEmail"
            control={control}
            render={({ field, fieldState }) => (
              <CabinField required id="guestEmail" label="Email address" error={fieldState.error}>
                <Input {...field} id="guestEmail" type="email" autoComplete="off" placeholder="name@example.com" aria-invalid={fieldState.invalid} aria-describedby={fieldState.invalid ? "guestEmail-error" : undefined} />
              </CabinField>
            )}
          />
          <Controller
            name="guestCountry"
            control={control}
            render={({ field, fieldState }) => {
              const country = COUNTRIES.find((entry) => entry.code === field.value);
              return (
                <CabinField required id="guestCountry" label="Country" error={fieldState.error}>
                  <Select value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")}>
                    <SelectTrigger id="guestCountry" className="w-full" aria-invalid={fieldState.invalid} aria-describedby={fieldState.invalid ? "guestCountry-error" : undefined}>
                      <SelectValue placeholder="Choose a country">{country?.name}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((entry) => (
                        <SelectItem key={entry.code} value={entry.code}>
                          <span className="flex items-center gap-3">
                            <img src={flagUrl(entry.code)} alt="" className="h-3 w-4.5 object-cover" />
                            {entry.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CabinField>
              );
            }}
          />
          <Controller
            name="guestNationalId"
            control={control}
            render={({ field, fieldState }) => (
              <CabinField id="guestNationalId" label="National ID or passport" hint="Optional. Can be added at check-in." error={fieldState.error}>
                <Input {...field} id="guestNationalId" autoComplete="off" aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("guestNationalId", fieldState.invalid)} />
              </CabinField>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default GuestPicker;
