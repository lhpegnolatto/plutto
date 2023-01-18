import { Button, Flex, Heading, HStack, Icon } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { IoLogoGoogle } from "react-icons/io";

import { useAppLoaderContext } from "contexts/AppLoaderContext";

import { NextPageWithLayout } from "./_app.public";

const AuthPage: NextPageWithLayout = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { isAppLoading, setIsAppLoading } = useAppLoaderContext();

  async function handleSignIn(provider: "github" | "google") {
    setIsAppLoading(true);

    await supabaseClient.auth.signInWithOAuth({
      provider,
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

      <HStack spacing="4" mt="4">
        <Button
          onClick={() => handleSignIn("github")}
          leftIcon={<Icon as={FiGithub} />}
          isDisabled={isAppLoading}
        >
          Github
        </Button>
        <Button
          onClick={() => handleSignIn("google")}
          leftIcon={<Icon as={IoLogoGoogle} />}
          isDisabled={isAppLoading}
          colorScheme="orange"
        >
          Google
        </Button>
      </HStack>
    </Flex>
  );
};

AuthPage.layout = "auth";

export default AuthPage;
