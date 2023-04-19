import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

type PostTransactionOptions = {
  payload: Database["public"]["Tables"]["transactions"]["Insert"];
};

export async function postTransaction(
  supabaseClient: SupabaseClient<Database>,
  options: PostTransactionOptions
) {
  await supabaseClient.from("transactions").insert(options.payload);
}
