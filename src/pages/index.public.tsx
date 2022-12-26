import { Flex, Heading } from "@chakra-ui/react";

import { useBreadcrumb } from "contexts/BreadcrumbContext";

export default function Home() {
  useBreadcrumb([{ title: "Home", path: "/" }]);

  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">Home page</Heading>
    </Flex>
  );
}
