import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

export async function signOut(supabaseClient: SupabaseClient<Database>) {
  await supabaseClient.auth.signOut();
}
