
// import CreateCabinForm from "@/components/cabins/create-cabin-form"
import { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import CabinFormModal from "@/components/cabins/cabin-form-modal";

function AddCabin() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="mt-8 flex items-center justify-start">
            <Button className="w-full sm:w-auto" onClick={() => setIsOpen(true)}>Add new cabin</Button>

            <CabinFormModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </div>
    )
}

export default AddCabin
