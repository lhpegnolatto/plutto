import { Box, Divider, Flex, useColorModeValue } from "@chakra-ui/react";

import { HeaderBreadcrumb } from "./components/HeaderBreadcrumb";
import { HeaderUserMenu } from "./components/HeaderUserMenu";

export function Header() {
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
        <HeaderBreadcrumb />

        <HeaderUserMenu />
      </Flex>

      <Divider borderColor={dividerBorderColor} />
    </Box>
  );
}
