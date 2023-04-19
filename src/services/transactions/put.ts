import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PostTransactionOptions = {
  transactionId: string;
  payload: Database["public"]["Tables"]["transactions"]["Update"];
};

export async function putTransaction(
  supabaseClient: SupabaseClient<Database>,
  options: PostTransactionOptions
) {
  await supabaseClient
    .from("transactions")
    .update(options.payload)
    .eq("id", options.transactionId);
}
