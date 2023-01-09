import { Flex, Heading } from "@chakra-ui/react";

import { NextPageWithLayout } from "./_app.public";

const Home: NextPageWithLayout = () => {
  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">Home page</Heading>
    </Flex>
  );
};

Home.breadcrumbItems = [{ title: "Home", path: "/", isCurrentPage: true }];

export default Home;
