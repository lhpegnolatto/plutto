import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useAppLoaderContext } from "contexts/AppLoaderContext";
import { routes } from "constants/routes";
import { getAuthSession } from "services/auth/getSession";
import { SignInProvider, signIn } from "services/auth/signIn";

export function useSignIn() {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { isAppLoading, setIsAppLoading } = useAppLoaderContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn(provider: SignInProvider) {
    setIsAppLoading(true);
    setIsSubmitting(true);

    await signIn(supabaseClient, { provider, locale: router.locale || "" });
  }

  useEffect(() => {
    async function checkSession() {
      setIsSubmitting(false);
      setIsAppLoading(true);

      const session = await getAuthSession(supabaseClient);

      setIsAppLoading(false);

      if (session) {
        router.push(routes.HOME);
      }
    }

    checkSession();
  }, [router, setIsAppLoading, supabaseClient]);

  return { isAppLoading, isSubmitting, handleSignIn };
}
