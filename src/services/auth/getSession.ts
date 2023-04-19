import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

export async function getAuthSession(supabaseClient: SupabaseClient<Database>) {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  return session;
}
