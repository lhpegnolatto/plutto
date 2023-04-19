import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PostCategoryOptions = {
  categoryId: string;
  payload: Database["public"]["Tables"]["categories"]["Update"];
};

export async function putCategory(
  supabaseClient: SupabaseClient<Database>,
  options: PostCategoryOptions
) {
  await supabaseClient
    .from("categories")
    .update(options.payload)
    .eq("id", options.categoryId);
}
