import { Flex, Heading } from "@chakra-ui/react";
import { useAppLayoutBreadcrumb } from "contexts/AppLayoutContext";

export default function Transactions() {
  useAppLayoutBreadcrumb([{ title: "Transactions", path: "/transactions" }]);

  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">Transactions page</Heading>
    </Flex>
  );
}
