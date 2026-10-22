import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import CabinField from "@/components/cabins/cabin-field"
import useCreateCabin from "@/hooks/cabins/use-create-cabin"
import { cabinSchema } from "@/lib/schemas"
import { cabinFormValues, hintAndErrorIds } from "@/lib/helpers"
import { EMPTY_CABIN_FORM } from "@/lib/constants"

export default function CreateCabinForm({ cabinToEdit = {}, onClose }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit;

  const { createCabinMutate, isCreating, isEditSession } = useCreateCabin({
    editId,
    onSuccessCallback: () => {
      form.reset();
      onClose?.();
    },
  });

  const form = useForm<CabinFormValues>({
    resolver: zodResolver(cabinSchema),
    values: isEditSession ? cabinFormValues(editValues) : EMPTY_CABIN_FORM,
  });

  function onSubmit(data: CabinFormValues) {
    if (isCreating) return;
    createCabinMutate(data);
  }

  return (
        <form id="cabin-form" noValidate aria-busy={isCreating} onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isCreating} className="min-w-0">
          <FieldGroup className="space-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <CabinField id="cabin-name" label="Cabin name" hint="A short name or number, such as 001." error={fieldState.error}>
                  <Input
                    {...field}
                    id="cabin-name"
                    placeholder="e.g. 001"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={hintAndErrorIds("cabin-name", fieldState.invalid)}
                  />
                </CabinField>
              )}
            />

            <Controller
              name="maxCapacity"
              control={form.control}
              render={({ field, fieldState }) => (
                <CabinField id="maxCapacity" label="Maximum capacity" hint="Maximum number of guests, such as 4." error={fieldState.error}>
                  <Input
                    {...field}
                    type="number" min={1} step={1}
                    id="maxCapacity"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={hintAndErrorIds("maxCapacity", fieldState.invalid)}
                  />
                </CabinField>
              )}
            />

            <Controller
              name="regularPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <CabinField id="regularPrice" label="Regular price (USD / night)" hint="Nightly rate before any discount." error={fieldState.error}>
                  <Input
                    {...field}
                    type="number" min={1} step="0.01"
                    id="regularPrice"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={hintAndErrorIds("regularPrice", fieldState.invalid)}
                  />
                </CabinField>
              )}
            />

            <Controller
              name="discount"
              control={form.control}
              render={({ field, fieldState }) => (
                <CabinField id="discount" label="Discount (USD / night)" hint="Enter 0 for no discount. Cannot exceed the nightly rate." error={fieldState.error}>
                  <Input
                    {...field}
                    type="number" min={0} step="0.01"
                    id="discount"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={hintAndErrorIds("discount", fieldState.invalid)}
                  />
                </CabinField>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <CabinField id="description" label="Description for website" hint="Describe amenities, beds, and what makes this cabin special." error={fieldState.error}>
                  <Textarea
                    {...field}
                    id="description"
                    rows={4}
                    placeholder="Describe the cabin..."
                    aria-invalid={fieldState.invalid}
                    aria-describedby={hintAndErrorIds("description", fieldState.invalid)}
                  />
                </CabinField>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field: imageField, fieldState }) => (
                <CabinField id="image" label="Cabin photo" hint="Choose an image. When editing, leave blank to keep the current photo." error={fieldState.error}>
                  <Input
                    name={imageField.name}
                    ref={imageField.ref}
                    onBlur={imageField.onBlur}
                    type="file"
                    id="image"
                    accept="image/*"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={hintAndErrorIds("image", fieldState.invalid)}
                    onChange={(e) => imageField.onChange(e.target.files?.[0] ?? editValues.image ?? "")}
                  />
                </CabinField>
              )}
            />

            <div className="flex flex-wrap justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose?.()}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isCreating}>{isCreating ? "Saving cabin..." : isEditSession ? "Update cabin" : "Add cabin"}</Button>
            </div>
          </FieldGroup>
          </fieldset>
        </form>
  )
}
