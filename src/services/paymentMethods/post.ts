import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PostPaymentMethodOptions = {
  payload: Database["public"]["Tables"]["payment_methods"]["Insert"];
};

export async function postPaymentMethod(
  supabaseClient: SupabaseClient<Database>,
  options: PostPaymentMethodOptions
) {
  const { data } = await supabaseClient
    .from("payment_methods")
    .insert(options.payload)
    .select("id, title, color")
    .maybeSingle();

  return data;
}
