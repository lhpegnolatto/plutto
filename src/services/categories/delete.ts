import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type DeleteCategoryOptions = {
  categoryId: string;
};

export async function deleteCategory(
  supabaseClient: SupabaseClient<Database>,
  options: DeleteCategoryOptions
) {
  await supabaseClient
    .from("categories")
    .delete()
    .match({ id: options.categoryId });
}
