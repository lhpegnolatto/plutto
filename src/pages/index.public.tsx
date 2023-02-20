import { Box, Card, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";

import { routes } from "constants/routes";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { NextPageWithLayout } from "./_app.public";

const Home: NextPageWithLayout = () => {
  const { user_metadata: userMetadata } = useUser() ?? {};
  const firstName = (userMetadata?.full_name || "").split(" ")[0];

  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  const formattedStartDate = startDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });
  const formattedEndDate = endDate.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });

  return (
    <Box as="main">
      <Flex flexDirection="column">
        <Heading as="h1" fontSize="xl">
          {userMetadata && `Welcome ${firstName}! `}
        </Heading>
        <Text
          fontSize="sm"
          color="gray.400"
        >{`Let's see a summary of your month (${formattedStartDate} - ${formattedEndDate})`}</Text>
      </Flex>

      <Grid
        h="full"
        mt="8"
        templateRows={{ base: "repeat(4, 1fr)", lg: "4fr 2fr" }}
        templateColumns={{ base: "1fr", lg: "4fr 2fr" }}
        gap="6"
      >
        <Card p="6">
          <Text fontWeight="semibold">Your transactions</Text>

          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="full"
          >
            <Icon as={HiWrenchScrewdriver} boxSize="10" />
            <Text mt="2">{"Working on it :)"} </Text>
          </Flex>
        </Card>
        <Card p="6">
          <Text fontWeight="semibold">Most transacted categories</Text>

          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="full"
          >
            <Icon as={HiWrenchScrewdriver} boxSize="10" />
            <Text mt="2">{"Working on it too :)"} </Text>
          </Flex>
        </Card>
        <Card p="6">
          <Text fontWeight="semibold">Installments for this month</Text>

          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="full"
          >
            <Icon as={HiWrenchScrewdriver} boxSize="10" />
            <Text mt="2">{"It too"} </Text>
          </Flex>
        </Card>
        <Card p="6">
          <Text fontWeight="semibold">Calendar</Text>

          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            h="full"
          >
            <Icon as={HiWrenchScrewdriver} boxSize="10" />
            <Text mt="2">{"You know..."} </Text>
          </Flex>
        </Card>
      </Grid>
    </Box>
  );
};

Home.breadcrumbItems = [
  { title: "Home", path: routes.HOME, isCurrentPage: true },
];

export default Home;
