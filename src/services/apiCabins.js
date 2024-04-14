/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be fetched");
  }

  return data;
}

export async function CreateEditCabin(newCabin, id) {
  console.log(newCabin, id);

  // https://fswhsxhtfderrnueplru.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); // nb> the image might not be a string hence we use optional chaining to be safe
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // step 1. Create Cabin/edit cabin
  let query = supabase.from("cabins");

  //A) CREATE CABIN IF THERE IS NO ID
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]).select();

  //B EDIT CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  // the query above is then executed to fetch the edited/ created cabin as as single row
  const { data, error } = await query.select().single(); // we use this to return a new row immediately
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // step 2. Upload if the cabin creation is succcessful
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3 preventing a new cabin creation in case the cabin did not upload correctly
  //hence we delete the cabin if image was not well uploaded

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin Image could not be Uploaded and cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  // we delete the id column of the cabin where the id we passed in is equal to it
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
/* my name ois keennedy mwangi mwaniki, a junior software developer at kirinyaga university */
