import { Box, Flex } from "@chakra-ui/react";
import { Header } from "components/Header";

import { Sidebar } from "components/Sidebar";
import { AppLayoutProvider } from "contexts/AppLayoutContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutProvider>
      <Flex h="100vh">
        <Sidebar />
        <Flex flexDirection="column" h="100vh" w="full">
          <Header></Header>
          <Box w="full" h="full" overflow="auto" p="10">
            {children}
          </Box>
        </Flex>
      </Flex>
    </AppLayoutProvider>
  );
}
