import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

export async function getAllPaymentMethods(
  supabaseClient: SupabaseClient<Database>
) {
  const { data } = await supabaseClient
    .from("payment_methods")
    .select("id, title, color")
    .limit(100);

  return data || [];
}
