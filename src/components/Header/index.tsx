import {
  Box,
  Divider,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  BreadcrumbItem,
  HeaderBreadcrumb,
} from "./components/HeaderBreadcrumb";
import { HeaderUserMenu } from "./components/HeaderUserMenu";
import { PluttoLogo } from "components/icons";

interface HeaderProps {
  breadcrumbItems: Array<BreadcrumbItem>;
}

export function Header({ breadcrumbItems }: HeaderProps) {
  const dividerBorderColor = useColorModeValue(
    "blackAlpha.100",
    "whiteAlpha.100"
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box as="header" px="2">
      <Flex
        alignItems="center"
        justifyContent="space-between"
        h="16"
        w="full"
        p="4"
      >
        <Flex alignItems="center" gap="4">
          {isMobile && <PluttoLogo boxSize="6" color="brand.600" />}

          <HeaderBreadcrumb items={breadcrumbItems} />
        </Flex>

        <HeaderUserMenu />
      </Flex>

      <Divider borderColor={dividerBorderColor} />
    </Box>
  );
}
