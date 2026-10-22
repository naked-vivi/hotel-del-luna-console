import { useState } from "react"
import ConfirmDelete from "@/components/shared/confirm-delete"
import EmptyState from "@/components/shared/empty-state"
import ErrorNote from "@/components/shared/error-note"
import ErrorPanel from "@/components/shared/error-panel"
import VacantCabins from "@/components/cabins/vacant-cabins"
import CabinGallery from "@/components/cabins/cabin-gallery"
import CabinGallerySkeleton from "@/components/cabins/cabin-gallery-skeleton"
import CabinList from "@/components/cabins/cabin-list"
import CabinTableSkeleton from "@/components/cabins/cabin-table-skeleton"
import useCabins from "@/hooks/cabins/use-cabins"
import useCreateCabin from "@/hooks/cabins/use-create-cabin"
import useDeleteCabin from "@/hooks/cabins/use-delete-cabin"
import { useSearchParam } from "@/hooks/shared/use-search-param"
import { cabinCopy, filterCabins, searchCabins, sortCabins } from "@/lib/helpers"
import { DEFAULT_CABIN_SORT } from "@/lib/constants"

export default function CabinTable() {
  const [deletingCabin, setDeletingCabin] = useState<Cabin | null>(null)

  const { isCreating, createCabinMutate } = useCreateCabin()
  const { isDeleting, mutate: deleteCabin } = useDeleteCabin()
  const { isPending, cabins = [], error } = useCabins()
  const [viewParam] = useSearchParam("view")
  const [discount] = useSearchParam("discount", "all")
  const [sortBy] = useSearchParam("sortBy", DEFAULT_CABIN_SORT)
  const [search] = useSearchParam("search")
  const view: CabinView = viewParam === "list" ? "list" : "gallery"

  if (isPending) return view === "list" ? <CabinTableSkeleton /> : <CabinGallerySkeleton />

  if (error) {
    return (
      <ErrorPanel>
        <ErrorNote title="The cabins are in the fog" message={error.message} drawing={<VacantCabins clouded className="w-full max-w-64" />} />
      </ErrorPanel>
    )
  }

  const visibleCabins = sortCabins(searchCabins(filterCabins(cabins, discount), search), sortBy)

  const actions: CabinActionHandlers = {
    isCreating,
    onDuplicate: (cabin) => createCabinMutate(cabinCopy(cabin)),
    onDelete: setDeletingCabin,
  }

  function handleConfirmDelete() {
    deleteCabin(deletingCabin.id, { onSuccess: () => setDeletingCabin(null) })
  }

  return (
    <>
      {visibleCabins.length === 0 ? (
        <EmptyState drawing={<VacantCabins className="w-full max-w-56" />} title={cabins.length === 0 ? "No cabins yet" : search ? `No cabin matches “${search}”` : "No cabins match"}>
          {cabins.length === 0 ? "Add the first cabin to start taking bookings." : search ? "Try another name or number, or clear the search." : "Try another discount filter."}
        </EmptyState>
      ) : view === "gallery" ? (
        <CabinGallery cabins={visibleCabins} actions={actions} />
      ) : (
        <CabinList cabins={visibleCabins} actions={actions} />
      )}

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
