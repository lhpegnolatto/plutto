import { Flex, Heading } from "@chakra-ui/react";
import { useBreadcrumb } from "contexts/BreadcrumbContext";

export default function Planned() {
  useBreadcrumb([{ title: "Planned", path: "/planned" }]);

  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">Planned page</Heading>
    </Flex>
  );
}
