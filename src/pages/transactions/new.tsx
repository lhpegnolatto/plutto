import { Flex, Heading } from "@chakra-ui/react";
import { useAppLayoutBreadcrumb } from "contexts/AppLayoutContext";

export default function NewTransaction() {
  useAppLayoutBreadcrumb([
    { title: "Transactions", path: "/transactions" },
    { title: "New", path: "/transactions/new" },
  ]);

  return (
    <Flex as="main" h="full" alignItems="center" justifyContent="center">
      <Heading as="h1">New transaction page</Heading>
    </Flex>
  );
}
