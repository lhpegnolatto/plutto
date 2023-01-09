import { Box, Divider, Flex, useColorModeValue } from "@chakra-ui/react";

import {
  BreadcrumbItem,
  HeaderBreadcrumb,
} from "./components/HeaderBreadcrumb";
import { HeaderUserMenu } from "./components/HeaderUserMenu";

interface HeaderProps {
  breadcrumbItems: Array<BreadcrumbItem>;
}

export function Header({ breadcrumbItems }: HeaderProps) {
  const dividerBorderColor = useColorModeValue(
    "blackAlpha.100",
    "whiteAlpha.100"
  );

  return (
    <Box as="header" px="2">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        h="16"
        w="full"
        p="4"
      >
        <HeaderBreadcrumb items={breadcrumbItems} />

        <HeaderUserMenu />
      </Flex>

      <Divider borderColor={dividerBorderColor} />
    </Box>
  );
}
