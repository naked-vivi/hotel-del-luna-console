import supabase, { supabaseUrl } from "./supabase";
import { CABIN_IMAGE_BUCKET, CABIN_STAYS_LIMIT, SUPABASE_ERROR_CODES } from "@/lib/constants";
import { cabinRowFrom } from "@/lib/helpers";
import { getToday } from "@/lib/utils";

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

export async function getCabin(id: number): Promise<Cabin | null> {
    const { data, error } = await supabase.from("cabins").select("*").eq("id", id).maybeSingle();

    if (error) {
        console.error(error);
        throw new Error("This cabin could not be loaded. Try again shortly.");
    }
    return data;
}

export async function getCabinStays(id: number): Promise<CabinStay[]> {
    const { data, error } = await supabase
        .from("bookings")
        .select("id, startDate, endDate, numNights, numGuests, status, guests(fullName, countryFlag, nationality)")
        .eq("cabinId", id)
        .gte("endDate", getToday())
        .order("startDate")
        .limit(CABIN_STAYS_LIMIT);

    if (error) {
        console.error(error);
        throw new Error("Upcoming stays could not be loaded");
    }
    return (data ?? []) as unknown as CabinStay[];
}

async function uploadCabinPhoto(file: File) {
    const name = `${crypto.randomUUID()}-${file.name}`.replace(/[^\w.-]/g, "-");
    const { error } = await supabase.storage.from(CABIN_IMAGE_BUCKET).upload(name, file);

    if (error) {
        console.error(error);
        throw new Error(`“${file.name}” could not be uploaded`);
    }
    return `${supabaseUrl}/storage/v1/object/public/${CABIN_IMAGE_BUCKET}/${name}`;
}

export async function saveCabin({ values, id }: SaveCabinArgs): Promise<Cabin> {
    const images = await Promise.all(values.photos.map((photo) => (photo.file ? uploadCabinPhoto(photo.file) : photo.url)));
    const row = cabinRowFrom(values, images);

    const query = id
        ? supabase.from("cabins").update(row).eq("id", id)
        : supabase.from("cabins").insert(row);
    const { data, error } = await query.select().maybeSingle();

    if (error) {
        console.error(error);
        throw new Error(id ? "Cabin could not be updated" : "Cabin could not be created");
    }
    if (!data) throw new Error("Only admins can change cabins.");
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
