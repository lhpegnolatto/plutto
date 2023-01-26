import {
  Button,
  Card,
  Flex,
  Heading,
  HStack,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiGithub } from "react-icons/fi";
import { IoLogoGoogle } from "react-icons/io";

import { useAppLoaderContext } from "contexts/AppLoaderContext";
import { routes } from "constants/routes";

import { NextPageWithLayout } from "./_app.public";
import { PluttoLogo, PluttoText } from "components/icons";

const AuthPage: NextPageWithLayout = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const { isAppLoading, setIsAppLoading } = useAppLoaderContext();

  async function handleSignIn(provider: "github" | "google" | "facebook") {
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
        router.push(routes.HOME);
      }
    }

    checkSession();
  }, [router, setIsAppLoading, supabaseClient]);

  return (
    <Flex
      h="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Card p="10" alignItems="center">
        <Flex alignItems="center">
          <PluttoLogo color="brand.600" boxSize="12" />
          <PluttoText width="20" height="8" ml="4" color="brand.600" />
        </Flex>

        <Heading as="h1" fontSize="lg" mt="12">
          Please sign in using one of this services
        </Heading>

        <VStack spacing="4" mt="8">
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
            <Button
              onClick={() => handleSignIn("facebook")}
              leftIcon={<Icon as={FiFacebook} />}
              isDisabled={isAppLoading}
              colorScheme="blue"
            >
              Facebook
            </Button>
      </Card>
    </Flex>
  );
};

AuthPage.layout = "auth";

export default AuthPage;
