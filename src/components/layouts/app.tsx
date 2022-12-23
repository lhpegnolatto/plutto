import { Box, Flex } from "@chakra-ui/react";

import { Sidebar } from "components/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box w="full" maxH="100vh" overflow="auto" p="10">
        {children}
      </Box>
    </Flex>
  );
}
