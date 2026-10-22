import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FormSection from "@/components/shared/form-section"
import CabinField from "@/components/cabins/cabin-field"
import CabinCard from "@/components/cabins/cabin-card"
import PhotoPicker from "@/components/cabins/photo-picker"
import AmenityPicker from "@/components/cabins/amenity-picker"
import useCreateCabin from "@/hooks/cabins/use-create-cabin"
import { cabinSchema } from "@/lib/schemas"
import { cabinPreview, cabinToFormValues, hintAndErrorIds } from "@/lib/helpers"
import { BED_TYPE_OPTIONS } from "@/lib/options"
import { EMPTY_CABIN_FORM } from "@/lib/constants"

function CabinForm({ cabin }: CabinFormProps) {
  const navigate = useNavigate()
  const { createCabinMutate, isCreating, isEditSession } = useCreateCabin({
    editId: cabin?.id,
    onSuccessCallback: (saved) => navigate(`/cabins/${saved.id}`, { replace: true }),
  })

  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<CabinFormValues>({
    resolver: zodResolver(cabinSchema),
    defaultValues: cabin ? cabinToFormValues(cabin) : EMPTY_CABIN_FORM,
  })
  const preview = cabinPreview(useWatch({ control }))

  function onSubmit(values: CabinFormValues) {
    if (isCreating) return
    createCabinMutate(values)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isCreating} className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-start">
      <fieldset disabled={isCreating} className="flex min-w-0 flex-col gap-6">
        <FormSection eyebrow="The room" title="Name and layout" description="How the cabin is listed, and how many guests it sleeps.">
          <div className="grid gap-6 sm:grid-cols-2">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <CabinField required id="name" label="Cabin name" hint="A short name or number, such as 009." error={fieldState.error}>
                  <Input {...field} id="name" placeholder="e.g. 009" aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("name", fieldState.invalid)} />
                </CabinField>
              )}
            />
            <Controller
              name="maxCapacity"
              control={control}
              render={({ field, fieldState }) => (
                <CabinField required id="maxCapacity" label="Sleeps" hint="Maximum number of guests." error={fieldState.error}>
                  <Input {...field} value={field.value ?? ""} id="maxCapacity" type="number" min={1} step={1} aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("maxCapacity", fieldState.invalid)} />
                </CabinField>
              )}
            />
            <Controller
              name="bedType"
              control={control}
              render={({ field, fieldState }) => (
                <CabinField required id="bedType" label="Beds" hint="The main sleeping arrangement." error={fieldState.error}>
                  <Select value={field.value || null} onValueChange={(value) => field.onChange(value ?? "")}>
                    <SelectTrigger id="bedType" className="w-full" aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("bedType", fieldState.invalid)}>
                      <SelectValue placeholder="Choose beds">{field.value}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {BED_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CabinField>
              )}
            />
            <Controller
              name="size"
              control={control}
              render={({ field, fieldState }) => (
                <CabinField required id="size" label="Size (m²)" hint="Floor area in square metres." error={fieldState.error}>
                  <Input {...field} value={field.value ?? ""} id="size" type="number" min={10} step={1} placeholder="e.g. 45" aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("size", fieldState.invalid)} />
                </CabinField>
              )}
            />
          </div>
        </FormSection>

        <FormSection eyebrow="Rates" title="Price per night" description="Prices are in US dollars. A discount shows as an offer on the card.">
          <div className="grid gap-6 sm:grid-cols-2">
            <Controller
              name="regularPrice"
              control={control}
              render={({ field, fieldState }) => (
                <CabinField required id="regularPrice" label="Regular price" hint="Nightly rate before any discount." error={fieldState.error}>
                  <Input {...field} value={field.value ?? ""} id="regularPrice" type="number" min={1} step="0.01" placeholder="e.g. 320" aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("regularPrice", fieldState.invalid)} />
                </CabinField>
              )}
            />
            <Controller
              name="discount"
              control={control}
              render={({ field, fieldState }) => (
                <CabinField required id="discount" label="Discount" hint="Enter 0 for no discount." error={fieldState.error}>
                  <Input {...field} value={field.value ?? ""} id="discount" type="number" min={0} step="0.01" aria-invalid={fieldState.invalid} aria-describedby={hintAndErrorIds("discount", fieldState.invalid)} />
                </CabinField>
              )}
            />
          </div>
        </FormSection>

        <FormSection required eyebrow="Photos" title="Gallery" description="The first photo is the cover. Drag several in at once.">
          <Controller
            name="photos"
            control={control}
            render={({ field, fieldState }) => (
              <div className="space-y-3">
                <PhotoPicker value={(field.value ?? []) as CabinPhoto[]} onChange={field.onChange} invalid={fieldState.invalid} describedBy={fieldState.invalid ? "photos-error" : undefined} />
                {fieldState.error && <FieldError id="photos-error" errors={[fieldState.error]} />}
              </div>
            )}
          />
        </FormSection>

        <FormSection eyebrow="Amenities" title="What's included" description="Shown as small icons on the cabin card and in full on its page.">
          <Controller
            name="amenities"
            control={control}
            render={({ field }) => <AmenityPicker value={field.value ?? []} onChange={field.onChange} />}
          />
        </FormSection>

        <FormSection eyebrow="Description" title="For the website" description="What makes this cabin special: the view, the beds, the little details.">
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <CabinField required id="description" label="Description" error={fieldState.error}>
                <Textarea {...field} id="description" rows={5} placeholder="Describe the cabin..." aria-invalid={fieldState.invalid} aria-describedby={fieldState.invalid ? "description-error" : undefined} />
              </CabinField>
            )}
          />
        </FormSection>

        {Object.keys(errors).length > 0 && (
          <p role="alert" className="text-sm text-destructive">Some details need attention. Check the highlighted fields above.</p>
        )}

        <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-8">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" disabled={isCreating || (isEditSession && !isDirty)}>
            {isCreating ? "Saving cabin..." : isEditSession ? "Save changes" : "Add cabin"}
          </Button>
        </div>
      </fieldset>

      <aside aria-label="Live preview" className="space-y-4 xl:sticky xl:top-28">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Live preview</p>
        <CabinCard cabin={preview} isPreview />
        <p className="text-xs text-muted-foreground">This is how the cabin appears in the gallery.</p>
      </aside>
    </form>
  )
}

export default CabinForm
