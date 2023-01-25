import { Box, Flex } from "@chakra-ui/react";

import { Header } from "components/Header";
import { BreadcrumbItem } from "components/Header/components/HeaderBreadcrumb";
import { Sidebar } from "components/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbItems: Array<BreadcrumbItem>;
}

export function AppLayout({ children, breadcrumbItems }: AppLayoutProps) {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex flexDirection="column" h="100vh" w="full">
        <Header breadcrumbItems={breadcrumbItems} />
        <Flex w="full" h="full" overflow="auto" p="10" justifyContent="center">
          <Box maxW="6xl" w="full" h="full">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}