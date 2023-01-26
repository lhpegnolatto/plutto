import {
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { IoLogoGoogle } from "react-icons/io";

import { useAppLoaderContext } from "contexts/AppLoaderContext";
import { routes } from "constants/routes";

import { NextPageWithLayout } from "./_app.public";
import { PluttoLogo, PluttoText } from "components/icons";
import { AuthLayout } from "components/AuthLayout";

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

  const cardBackground = useColorModeValue("gray.50", "gray.700");

  return (
    <AuthLayout launchNow={isAppLoading}>
      <Card
        p={{ base: "10", md: "14" }}
        mt="10"
        alignItems="center"
        borderRadius="xl"
        w={{ base: "100%", md: "auto" }}
        bg={cardBackground}
      >
        <Flex alignItems="center" flexDirection="column">
          <PluttoLogo color="brand.600" boxSize="12" />
          <PluttoText color="brand.600" width="20" height="8" mt="2" />
        </Flex>

        <Heading
          as="h1"
          fontSize={{ base: "md", md: "lg" }}
          mt="6"
          maxW={{ base: "220px", md: "1000px" }}
          textAlign="center"
        >
          Our mission never ends. Let us help you with your!
        </Heading>

        <Heading
          as="h2"
          fontWeight="normal"
          fontSize="md"
          mt={{ base: "6", md: "10" }}
          textAlign="center"
        >
          Sign in using one of this services:
        </Heading>

        <Stack direction={{ base: "column", md: "row" }} spacing="4" mt="4">
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
        </Stack>
      </Card>
    </AuthLayout>
  );
};

AuthPage.layout = "auth";

export default AuthPage;
