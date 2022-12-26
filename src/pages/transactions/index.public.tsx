import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Transactions() {
  return (
    <Box as="main" h="full">
      <Button as={Link} href="/transactions/new">
        Create new
      </Button>
    </Box>
  );
}
