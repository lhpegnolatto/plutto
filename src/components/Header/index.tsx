import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  useBreakpointValue,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";

import {
  BreadcrumbItem,
  HeaderBreadcrumb,
} from "./components/HeaderBreadcrumb";
import { HeaderUserMenu } from "./components/HeaderUserMenu";
import { BrFlag, PluttoLogo, UsaFlag } from "components/icons";
import { useRouter } from "next/router";
import { LanguageModal } from "components/LanguageModal";
import { useCurrencyContext } from "contexts/CurrencyContext";

interface HeaderProps {
  breadcrumbItems: Array<BreadcrumbItem>;
}

export function Header({ breadcrumbItems }: HeaderProps) {
  const dividerBorderColor = useColorModeValue(
    "blackAlpha.100",
    "whiteAlpha.100"
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  const router = useRouter();

  const locale = router.locale;
  const { currentCurrency } = useCurrencyContext();

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

        <Flex gap="4">
          <LanguageModal hasCurrency>
            {({ onOpen }) => (
              <Button
                size="md"
                minW="0"
                px={{ base: "3", md: "4" }}
                borderRadius={{ base: "xl", md: "md" }}
                onClick={onOpen}
              >
                <Flex alignItems="center" py="2" gap="2">
                  <Icon as={locale === "en" ? UsaFlag : BrFlag} />
                  <Divider orientation="vertical" h="4" />
                  <Text fontSize="xs">{currentCurrency}</Text>
                </Flex>
              </Button>
            )}
          </LanguageModal>

          <HeaderUserMenu />
        </Flex>
      </Flex>

      <Divider borderColor={dividerBorderColor} />
    </Box>
  );
}
