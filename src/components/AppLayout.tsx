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
      <Flex
        flexDirection="column"
        h={{ base: "calc(100vh - 56px)", md: "100vh" }}
        w="full"
      >
        <Header breadcrumbItems={breadcrumbItems} />
        <Flex
          w="full"
          overflow="auto"
          py={{ base: "6", md: "10" }}
          px="6"
          justifyContent="center"
        >
          <Box maxW="6xl" w="full" h="full">
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
