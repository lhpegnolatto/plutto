import { Box, Flex } from "@chakra-ui/react";
import { Header } from "components/Header";

import { Sidebar } from "components/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex flexDirection="column" h="100vh" w="full">
        <Header></Header>
        <Flex w="full" h="full" overflow="auto" p="10" justifyContent="center">
          <Box maxW="6xl" w="full" h="full">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
