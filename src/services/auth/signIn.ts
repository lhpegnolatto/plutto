import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "types/supabase.types";

export type SignInProvider = "github" | "google" | "facebook";

type SignInOptions = {
  provider: SignInProvider;
  locale: string;
};

export async function signIn(
  supabaseClient: SupabaseClient<Database>,
  options: SignInOptions
) {
  const hasEnglishLocalePath = options.locale === "en";
  const localePathPrefix = hasEnglishLocalePath ? "/en" : "";

  await supabaseClient.auth.signInWithOAuth({
    provider: options.provider,
    options: {
      redirectTo: `${
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        "http://localhost:3000"
      }${localePathPrefix}`,
    },
  });
}
