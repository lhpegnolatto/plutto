import { Flex, Heading } from "@chakra-ui/react";

import { routes } from "constants/routes";
import { NextPageWithLayout } from "./_app.public";

const Home: NextPageWithLayout = () => {
  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">Home page</Heading>
    </Flex>
  );
};

Home.breadcrumbItems = [
  { title: "Home", path: routes.HOME, isCurrentPage: true },
];

export default Home;
