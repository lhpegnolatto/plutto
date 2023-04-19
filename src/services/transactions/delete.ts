import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type DeleteTransactionOptions = {
  transactionId: string;
};

export async function deleteTransaction(
  supabaseClient: SupabaseClient<Database>,
  options: DeleteTransactionOptions
) {
  await supabaseClient
    .from("transactions")
    .delete()
    .match({ id: options.transactionId });
}
