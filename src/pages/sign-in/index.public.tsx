import {
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiFacebook, FiGithub } from "react-icons/fi";
import { IoLogoGoogle } from "react-icons/io";

import { NextPageWithLayout } from "../_app.public";
import { PluttoLogo, PluttoText } from "components/icons";
import { AuthLayout } from "components/AuthLayout";
import { useSignIn } from "./hook";
import { getStaticMessageProps } from "utils/getStaticMessagesProps";

const AuthPage: NextPageWithLayout = () => {
  const { isAppLoading, isSubmitting, handleSignIn } = useSignIn();

  const cardBackground = useColorModeValue("gray.50", "gray.700");

  return (
    <AuthLayout launchNow={isSubmitting}>
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
            isDisabled={isAppLoading || isSubmitting}
          >
            Github
          </Button>
          <Button
            onClick={() => handleSignIn("google")}
            leftIcon={<Icon as={IoLogoGoogle} />}
            isDisabled={isAppLoading || isSubmitting}
            colorScheme="orange"
          >
            Google
          </Button>
          <Button
            onClick={() => handleSignIn("facebook")}
            leftIcon={<Icon as={FiFacebook} />}
            isDisabled={isAppLoading || isSubmitting}
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

export const getStaticProps = getStaticMessageProps;

export default AuthPage;
