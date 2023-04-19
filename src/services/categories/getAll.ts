import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

export async function getAllCategories(
  supabaseClient: SupabaseClient<Database>
) {
  const { data } = await supabaseClient
    .from("categories")
    .select("id, title, color");

  return data || [];
}
