import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useAppLoaderContext } from "contexts/AppLoaderContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiGithub } from "react-icons/fi";

import { NextPageWithLayout } from "./_app.public";

const AuthPage: NextPageWithLayout = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { isAppLoading, setIsAppLoading } = useAppLoaderContext();

  async function handleSignIn() {
    setIsAppLoading(true);

    await supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo:
          process.env.NEXT_PUBLIC_SITE_URL ??
          process.env.NEXT_PUBLIC_VERCEL_URL ??
          "http://localhost:3000",
      },
    });
  }

  useEffect(() => {
    async function checkSession() {
      setIsAppLoading(true);

      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      setIsAppLoading(false);

      if (session) {
        router.push("/");
      }
    }

    checkSession();
  }, []);

  return (
    <Flex
      h="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" fontSize="lg">
        Please sign in using one of this services
      </Heading>

      <Button
        onClick={handleSignIn}
        leftIcon={<Icon as={FiGithub} />}
        mt="4"
        isLoading={isAppLoading}
      >
        Github
      </Button>
    </Flex>
  );
};

AuthPage.layout = "auth";

export default AuthPage;
