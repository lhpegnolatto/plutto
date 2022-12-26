import { Button, Flex, Heading, Icon } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FiGithub } from "react-icons/fi";

import { NextPageWithLayout } from "./_app.public";

const AuthPage: NextPageWithLayout = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  async function handleSignIn() {
    await supabaseClient.auth.signInWithOAuth({
      provider: "github",
    });
  }

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

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

      <Button onClick={handleSignIn} leftIcon={<Icon as={FiGithub} />} mt="4">
        Github
      </Button>
    </Flex>
  );
};

AuthPage.getLayout = (page) => page;

export default AuthPage;
