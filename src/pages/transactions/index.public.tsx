import { Box, Button } from "@chakra-ui/react";
import { useBreadcrumb } from "contexts/BreadcrumbContext";
import Link from "next/link";

export default function Transactions() {
  useBreadcrumb([{ title: "Transactions", path: "/transactions" }]);

  return (
    <Box as="main" h="full">
      <Button as={Link} href="/transactions/new">
        Create new
      </Button>
    </Box>
  );
}
