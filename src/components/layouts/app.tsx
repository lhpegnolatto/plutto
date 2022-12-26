import { Box, Flex } from "@chakra-ui/react";
import { Header } from "components/Header";

import { Sidebar } from "components/Sidebar";
import { BreadcrumbProvider } from "contexts/BreadcrumbContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex flexDirection="column" h="100vh" w="full">
        <BreadcrumbProvider>
          <Header></Header>
          <Box w="full" h="full" overflow="auto" p="10">
            {children}
          </Box>
        </BreadcrumbProvider>
      </Flex>
    </Flex>
  );
}
