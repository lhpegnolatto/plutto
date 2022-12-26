import { Flex, Heading } from "@chakra-ui/react";
import { useAppLayoutBreadcrumb } from "contexts/AppLayoutContext";

export default function Home() {
  useAppLayoutBreadcrumb([{ title: "Home", path: "/", isCurrentPage: true }]);

  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">Hello world</Heading>
    </Flex>
  );
}
