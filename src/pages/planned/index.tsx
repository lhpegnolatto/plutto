import { Flex, Heading } from "@chakra-ui/react";
import { useAppLayoutBreadcrumb } from "contexts/AppLayoutContext";

export default function Planned() {
  useAppLayoutBreadcrumb([{ title: "Planned", path: "/planned" }]);

  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">Planned page</Heading>
    </Flex>
  );
}
