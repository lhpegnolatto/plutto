import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PostPaymentMethodOptions = {
  paymentMethodId: string;
  payload: Database["public"]["Tables"]["payment_methods"]["Update"];
};

export async function putPaymentMethod(
  supabaseClient: SupabaseClient<Database>,
  options: PostPaymentMethodOptions
) {
  await supabaseClient
    .from("payment_methods")
    .update(options.payload)
    .eq("id", options.paymentMethodId);
}
