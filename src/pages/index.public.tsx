import { Flex, Heading } from "@chakra-ui/react";

import { useAppLayoutBreadcrumb } from "contexts/AppLayoutContext";

export default function Home() {
  useAppLayoutBreadcrumb([{ title: "Home", path: "/" }]);

  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">Home page</Heading>
    </Flex>
  );
}
