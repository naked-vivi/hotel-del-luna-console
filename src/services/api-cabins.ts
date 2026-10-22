import supabase, { supabaseUrl } from "./supabase";
import { CABIN_IMAGE_BUCKET, SUPABASE_ERROR_CODES } from "@/lib/constants";

export async function getCabins(): Promise<Cabin[]> {
    const { data, error } = await supabase
        .from('cabins')
        .select('*')

    if (error) {
        console.error(error)
        throw new Error("Cabins cannot be loaded")
    }
    return data;
}

export async function createCabin(newCabin: CabinFormValues, id?: number) {
    const hasImagePath = typeof newCabin.image === "string" && newCabin.image.startsWith(supabaseUrl);

    let imagePath = newCabin.image;
    if (!hasImagePath) {
        if (!(newCabin.image instanceof File)) {
            throw new Error("Choose an image for this cabin");
        }
        const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
        imagePath = `${supabaseUrl}/storage/v1/object/public/${CABIN_IMAGE_BUCKET}/${imageName}`;
        const { error: storageError } = await supabase.storage
            .from(CABIN_IMAGE_BUCKET)
            .upload(imageName, newCabin.image);

        if (storageError) {
            console.error(storageError);
            throw new Error("Cabin image could not be uploaded");
        }
    }

    //2. create cabin
    const query = id
        ? supabase.from("cabins").update({ ...newCabin, image: imagePath }).eq("id", id)
        : supabase.from("cabins").insert({ ...newCabin, image: imagePath });
    const { data, error } = await query.select();

    if (error) {
        console.error(error);
        throw new Error(id ? "Cabin could not be updated" : "Cabin could not be created");
    }
    return data;

}

export async function deleteCabin(id: number) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
        .select('id')

    if (error) {
        console.error(error)
        if (error.code === SUPABASE_ERROR_CODES.foreignKey) {
            throw new Error("This cabin cannot be deleted because it is linked to existing records, such as bookings.");
        }
        throw new Error(`Cabin could not be deleted: ${error.message}`)
    }
    if (!data?.length) {
        throw new Error("No cabin was deleted. It may already be removed, or your account may not have permission to delete it.");
    }
    return data;
}
