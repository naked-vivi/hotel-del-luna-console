import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import CreateCabinForm from "@/components/cabins/create-cabin-form"

export default function CabinFormModal({
    isOpen,
    onClose,
    cabinToEdit,
}: CabinFormModalProps) {
    const isEditSession = Boolean(cabinToEdit)

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-h-[90dvh] min-w-0 overflow-y-auto sm:max-w-150">
                <DialogHeader className="min-w-0 wrap-break-word pr-6">
                    <DialogTitle>
                        {isEditSession ? `Edit ${cabinToEdit?.name}` : "Add New Cabin"}
                    </DialogTitle>
                </DialogHeader>

                <CreateCabinForm
                    cabinToEdit={cabinToEdit ?? undefined}
                    onClose={onClose}
                />
            </DialogContent>
        </Dialog>
    )
}
