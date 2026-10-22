import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import ConfirmDelete from "@/shared/confirm-delete"
import EmptyState from "@/shared/empty-state"
import { MoreIcon } from "@/shared/icons"
import { KeyCardsIcon, FountainPenIcon, WastebasketIcon } from "@/shared/drawn-icons"
import { cn } from "@/lib/utils"
import useCabins from "./use-cabins"
import useCreateCabin from "./use-create-cabin"
import useDeleteCabin from "./use-delete-cabin"
import CabinFormModal from "./cabin-form-modal"

interface Cabin {
  id: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  image: string
  description: string
}

/** "N°" set small before the cabin name, the way room numbers are written in the hotel. */
function CabinNumber({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("font-extralight", className)}>
      <span className="mr-1.5 align-middle text-[10px] font-semibold tracking-[0.14em] text-muted-foreground">N°</span>
      {name}
    </span>
  )
}

function CabinActions({ cabin, isCreating, onDuplicate, onEdit, onDelete, triggerClassName }: {
  cabin: Cabin
  isCreating: boolean
  onDuplicate: () => void
  onEdit: () => void
  onDelete: () => void
  triggerClassName?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon" className={triggerClassName} aria-label={`Actions for cabin ${cabin.name}`}>
            <MoreIcon className="size-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled={isCreating} onClick={onDuplicate}>
          <KeyCardsIcon className="size-5" />
          <span>Duplicate</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>
          <FountainPenIcon className="size-5" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive [--icon-accent:currentColor] focus:text-destructive" onClick={onDelete}>
          <WastebasketIcon className="size-5" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ---------- Gallery: one card per cabin, like a hotel's rooms page ---------- */

const galleryGrid = "grid grid-cols-1 gap-6 @min-[40rem]:grid-cols-2 @min-[68rem]:grid-cols-3"

function CabinCard({ cabin, actions }: { cabin: Cabin; actions: React.ReactNode }) {
  const nightly = Math.max(0, cabin.regularPrice - (cabin.discount || 0))

  return (
    <article className="flex min-w-0 flex-col border border-border bg-card">
      <div className="relative aspect-4/3 overflow-hidden bg-muted">
        <img src={cabin.image} alt={`Cabin ${cabin.name}`} className="size-full object-cover" />
        {cabin.discount > 0 && (
          <span className="absolute top-3 left-3 border border-status-success/30 bg-card px-2.5 pt-1 pb-0.5 text-[10px] font-semibold tracking-[0.22em] text-status-success uppercase">
            ${cabin.discount} off
          </span>
        )}
        <div className="absolute top-2 right-2">{actions}</div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <CabinNumber name={cabin.name} className="text-3xl leading-9" />
          <p className="pt-1 text-right whitespace-nowrap">
            {cabin.discount > 0 && (
              <span className="mr-2 text-sm text-muted-foreground tabular-nums line-through">${cabin.regularPrice}</span>
            )}
            <span className="text-xl font-light tabular-nums">${nightly}</span>
            <span className="ml-1 text-xs text-muted-foreground">/ night</span>
          </p>
        </div>

        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-muted-foreground">
          {cabin.description || "No description yet."}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-[10.5px] font-semibold tracking-[0.24em] text-muted-foreground uppercase">
          <span>Sleeps {cabin.maxCapacity}</span>
          <span>{cabin.discount > 0 ? "Offer" : "Standard rate"}</span>
        </div>
      </div>
    </article>
  )
}

/** Card skeleton with the same photo ratio and line heights as a real card. */
function CabinGallerySkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="@container" aria-busy="true" aria-label="Loading cabins">
      <div className={galleryGrid}>
        {Array.from({ length: cards }, (_, i) => (
          <div key={i} className="flex flex-col border border-border bg-card">
            <Skeleton className="aspect-4/3 w-full" />
            <div className="flex flex-col gap-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="mt-1 h-7 w-20" />
              </div>
              <Skeleton className="h-10 w-full" />
              <div className="border-t border-border pt-4"><Skeleton className="h-4 w-full" /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- List: the compact table ---------- */

function CabinTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Photo</TableHead>
        <TableHead>Cabin</TableHead>
        <TableHead className="text-center">Capacity</TableHead>
        <TableHead className="text-end">Price</TableHead>
        <TableHead className="text-end">Discount</TableHead>
        <TableHead className="text-end"><span className="sr-only">Actions</span></TableHead>
      </TableRow>
    </TableHeader>
  )
}

/** Placeholder rows matching the real row height (the photo is the tallest cell). */
function CabinTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="min-w-0 max-w-full border border-border bg-card" aria-busy="true" aria-label="Loading cabins">
      <Table className="min-w-140">
        <CabinTableHeader />
        <TableBody>
          {Array.from({ length: rows }, (_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              {/* Every block is 56px, the height of the cabin photo, so all cells line up. */}
              <TableCell className="py-5"><Skeleton className="h-14 w-21" /></TableCell>
              <TableCell><Skeleton className="h-14 w-16" /></TableCell>
              <TableCell><Skeleton className="mx-auto h-14 w-28" /></TableCell>
              <TableCell><Skeleton className="ml-auto h-14 w-24" /></TableCell>
              <TableCell><Skeleton className="ml-auto h-14 w-12" /></TableCell>
              <TableCell><Skeleton className="ml-auto h-14 w-10" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

/* ---------- The cabins, filtered, sorted and shown as a gallery or a list ---------- */

export default function CabinTable() {
  const [editingCabin, setEditingCabin] = useState<Cabin | null>(null)
  const [deletingCabin, setDeletingCabin] = useState<Cabin | null>(null)

  const { isCreating, createCabinMutate } = useCreateCabin()
  const { isDeleting, mutate: deleteCabin } = useDeleteCabin()
  const { isPending, cabins } = useCabins()
  const [searchParams] = useSearchParams()
  const view = searchParams.get("view") === "list" ? "list" : "gallery"

  if (isPending) return view === "list" ? <CabinTableSkeleton /> : <CabinGallerySkeleton />

  const cabinList: Cabin[] = cabins || []

  // Filter by discount
  const filterValue = searchParams.get("discount") || "all"
  let filteredCabins = cabinList
  if (filterValue === "no-discount") filteredCabins = cabinList.filter((cabin) => cabin.discount === 0)
  else if (filterValue === "with-discount") filteredCabins = cabinList.filter((cabin) => cabin.discount > 0)

  // Sort
  const sortBy = searchParams.get("sortBy") || "name-asc"
  const [field, direction] = sortBy.split("-")
  const modifier = direction === "asc" ? 1 : -1
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    const aVal = a[field as keyof Cabin]
    const bVal = b[field as keyof Cabin]
    if (typeof aVal === "string" && typeof bVal === "string") return aVal.localeCompare(bVal) * modifier
    return ((aVal as number) - (bVal as number)) * modifier
  })

  function handleDuplicate(cabin: Cabin) {
    const { name, maxCapacity, regularPrice, discount, image, description } = cabin
    createCabinMutate({ name: `${name} (Copy)`, maxCapacity, regularPrice, discount, image, description })
  }

  const actionsFor = (cabin: Cabin, triggerClassName?: string) => (
    <CabinActions
      cabin={cabin}
      isCreating={isCreating}
      onDuplicate={() => handleDuplicate(cabin)}
      onEdit={() => setEditingCabin(cabin)}
      onDelete={() => setDeletingCabin(cabin)}
      triggerClassName={triggerClassName}
    />
  )

  const content =
    sortedCabins.length === 0 ? (
      <EmptyState title={cabinList.length === 0 ? "No cabins yet" : "No cabins match"}>
        {cabinList.length === 0 ? "Add the first cabin to start taking bookings." : "Try another discount filter."}
      </EmptyState>
    ) : view === "gallery" ? (
      <div className="@container">
        <div className={galleryGrid}>
          {sortedCabins.map((cabin) => (
            <CabinCard
              key={cabin.id}
              cabin={cabin}
              actions={actionsFor(cabin, "border border-border bg-card hover:bg-card dark:hover:bg-card")}
            />
          ))}
        </div>
      </div>
    ) : (
      <div className="min-w-0 max-w-full border border-border bg-card">
        <Table className="min-w-140" aria-label="Cabins">
          <CabinTableHeader />
          <TableBody>
            {sortedCabins.map((cabin) => (
              <TableRow key={cabin.id}>
                <TableCell className="py-5">
                  <img src={cabin.image} alt={cabin.name} className="aspect-3/2 h-14 min-w-21 object-cover" />
                </TableCell>
                <TableCell><CabinNumber name={cabin.name} className="text-2xl" /></TableCell>
                <TableCell className="text-center text-muted-foreground">Up to {cabin.maxCapacity} guests</TableCell>
                <TableCell className="text-end text-lg font-light tabular-nums">
                  ${cabin.regularPrice}
                  <span className="ml-1 text-xs text-muted-foreground">/ night</span>
                </TableCell>
                <TableCell className="text-end tabular-nums">
                  {cabin.discount ? <span className="text-status-success">&minus;${cabin.discount}</span> : <span className="text-muted-foreground">&mdash;</span>}
                </TableCell>
                <TableCell className="text-end">{actionsFor(cabin)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )

  return (
    <>
      {content}

      <CabinFormModal isOpen={Boolean(editingCabin)} cabinToEdit={editingCabin} onClose={() => setEditingCabin(null)} />

      {deletingCabin && (
        <ConfirmDelete
          resourceName="Cabin"
          itemName={deletingCabin.name}
          isDeleting={isDeleting}
          onConfirm={() => deleteCabin(deletingCabin.id, { onSuccess: () => setDeletingCabin(null) })}
          isOpen={Boolean(deletingCabin)}
          onClose={() => setDeletingCabin(null)}
        />
      )}
    </>
  )
}
