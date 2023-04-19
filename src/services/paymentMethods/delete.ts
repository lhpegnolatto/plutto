import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type DeletePaymentMethodOptions = {
  paymentMethodId: string;
};

export async function deletePaymentMethod(
  supabaseClient: SupabaseClient<Database>,
  options: DeletePaymentMethodOptions
) {
  await supabaseClient
    .from("payment_methods")
    .delete()
    .match({ id: options.paymentMethodId });
}
