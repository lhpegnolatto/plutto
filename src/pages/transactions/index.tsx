import { Box, Button } from "@chakra-ui/react";
import { useAppLayoutBreadcrumb } from "contexts/AppLayoutContext";
import Link from "next/link";

export default function Transactions() {
  useAppLayoutBreadcrumb([{ title: "Transactions", path: "/transactions" }]);

  return (
    <Box as="main" h="full">
      <Button as={Link} href="/transactions/new">
        Create new
      </Button>
    </Box>
  );
}
