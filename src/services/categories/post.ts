import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PostCategoryOptions = {
  payload: Database["public"]["Tables"]["categories"]["Insert"];
};

export async function postCategory(
  supabaseClient: SupabaseClient<Database>,
  options: PostCategoryOptions
) {
  const { data } = await supabaseClient
    .from("categories")
    .insert(options.payload)
    .select("id, title, color")
    .maybeSingle();

  return data;
}
