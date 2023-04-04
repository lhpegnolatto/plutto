import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAppLoaderContext } from "contexts/AppLoaderContext";
import { routes } from "constants/routes";
import { useTranslation } from "react-i18next";

export function useSignIn() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { i18n } = useTranslation();

  const { isAppLoading, setIsAppLoading } = useAppLoaderContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn(provider: "github" | "google" | "facebook") {
    setIsAppLoading(true);
    setIsSubmitting(true);

    const hasEnglishLocalePath = i18n.language === "en";
    const localePathPrefix = hasEnglishLocalePath ? "/en" : "";

    await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${
          process.env.NEXT_PUBLIC_SITE_URL ??
          process.env.NEXT_PUBLIC_VERCEL_URL ??
          "http://localhost:3000"
        }${localePathPrefix}`,
      },
    });
  }

  useEffect(() => {
    async function checkSession() {
      setIsSubmitting(false);
      setIsAppLoading(true);

      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      setIsAppLoading(false);

      if (session) {
        router.push(routes.HOME);
      }
    }

    checkSession();
  }, [router, setIsAppLoading, supabaseClient]);

  return { isAppLoading, isSubmitting, handleSignIn };
}
