import { useState } from "react"
import ConfirmDelete from "@/components/shared/confirm-delete"
import EmptyState from "@/components/shared/empty-state"
import CabinFormModal from "@/components/cabins/cabin-form-modal"
import CabinGallery from "@/components/cabins/cabin-gallery"
import CabinGallerySkeleton from "@/components/cabins/cabin-gallery-skeleton"
import CabinList from "@/components/cabins/cabin-list"
import CabinTableSkeleton from "@/components/cabins/cabin-table-skeleton"
import useCabins from "@/hooks/cabins/use-cabins"
import useCreateCabin from "@/hooks/cabins/use-create-cabin"
import useDeleteCabin from "@/hooks/cabins/use-delete-cabin"
import { useSearchParam } from "@/hooks/shared/use-search-param"
import { cabinCopy, filterCabins, sortCabins } from "@/lib/helpers"
import { DEFAULT_CABIN_SORT } from "@/lib/constants"

export default function CabinTable() {
  const [editingCabin, setEditingCabin] = useState<Cabin | null>(null)
  const [deletingCabin, setDeletingCabin] = useState<Cabin | null>(null)

  const { isCreating, createCabinMutate } = useCreateCabin()
  const { isDeleting, mutate: deleteCabin } = useDeleteCabin()
  const { isPending, cabins = [] } = useCabins()
  const [viewParam] = useSearchParam("view")
  const [discount] = useSearchParam("discount", "all")
  const [sortBy] = useSearchParam("sortBy", DEFAULT_CABIN_SORT)
  const view: CabinView = viewParam === "list" ? "list" : "gallery"

  if (isPending) return view === "list" ? <CabinTableSkeleton /> : <CabinGallerySkeleton />

  const visibleCabins = sortCabins(filterCabins(cabins, discount), sortBy)

  const actions: CabinActionHandlers = {
    isCreating,
    onDuplicate: (cabin) => createCabinMutate(cabinCopy(cabin)),
    onEdit: setEditingCabin,
    onDelete: setDeletingCabin,
  }

  function handleConfirmDelete() {
    deleteCabin(deletingCabin.id, { onSuccess: () => setDeletingCabin(null) })
  }

  return (
    <>
      {visibleCabins.length === 0 ? (
        <EmptyState title={cabins.length === 0 ? "No cabins yet" : "No cabins match"}>
          {cabins.length === 0 ? "Add the first cabin to start taking bookings." : "Try another discount filter."}
        </EmptyState>
      ) : view === "gallery" ? (
        <CabinGallery cabins={visibleCabins} actions={actions} />
      ) : (
        <CabinList cabins={visibleCabins} actions={actions} />
      )}

      <CabinFormModal isOpen={Boolean(editingCabin)} cabinToEdit={editingCabin} onClose={() => setEditingCabin(null)} />

      {deletingCabin && (
        <ConfirmDelete
          resourceName="Cabin"
          itemName={deletingCabin.name}
          isDeleting={isDeleting}
          onConfirm={handleConfirmDelete}
          isOpen={Boolean(deletingCabin)}
          onClose={() => setDeletingCabin(null)}
        />
      )}
    </>
  )
}
