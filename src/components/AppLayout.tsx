import { Box, Flex, useToken } from "@chakra-ui/react";

import { Header } from "components/Header";
import { BreadcrumbItem } from "components/Header/components/HeaderBreadcrumb";
import { Sidebar } from "components/Sidebar";

export interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumbItems: Array<BreadcrumbItem>;
}

export function AppLayout({ children, breadcrumbItems }: AppLayoutProps) {
  const [size16] = useToken("sizes", ["16"]);

  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex
        flexDirection="column"
        h={{ base: `calc(100% - ${size16})`, md: "100vh" }}
        w="full"
      >
        <Header breadcrumbItems={breadcrumbItems} />
        <Flex w="full" h="full" overflow="auto" px="6" justifyContent="center">
          <Box
            maxW="6xl"
            w="full"
            h="full"
            sx={{
              "& > *": {
                height: "auto",
                minH: "100%",
                py: { base: "6", md: "10" },
              },
            }}
          >
            {children}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
