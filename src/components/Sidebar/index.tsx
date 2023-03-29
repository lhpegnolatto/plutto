import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Icon,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineBanknotes,
  HiBeaker,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";

import { routes } from "constants/routes";

import { PluttoLogo } from "components/icons";
import { SidebarIconButton } from "./components/SidebarIconButton";

const pages = [
  {
    title: "Home",
    path: routes.HOME,
    icon: <Icon as={HiOutlineHome} boxSize="5" />,
    shouldMatchExactHref: true,
  },
  {
    title: "Transactions",
    path: routes.TRANSACTIONS,
    icon: <Icon as={HiOutlineBanknotes} boxSize="5" />,
  },
  {
    title: "Insights - (coming soon)",
    path: "/insights",
    icon: <Icon as={HiBeaker} boxSize="5" />,
    isDisabled: true,
  },
  {
    title: "Goals - (coming soon)",
    path: "/goals",
    icon: <Icon as={HiOutlinePresentationChartLine} boxSize="5" />,
    isDisabled: true,
  },
  {
    title: "Growing - (coming soon)",
    path: "/growing",
    icon: <Icon as={HiOutlineAcademicCap} boxSize="5" />,
    isDisabled: true,
  },
];

export function Sidebar() {
  const { asPath } = useRouter();

  const sidebarBackgroundColor = useColorModeValue("white", "gray.800");
  const sidebarBorderColor = useColorModeValue(
    "blackAlpha.100",
    "whiteAlpha.100"
  );

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack
      spacing="4"
      borderColor={sidebarBorderColor}
      borderRightWidth={{ base: "none", md: "1px" }}
      borderTopWidth={{ base: "1px", md: "none" }}
      position={{ base: "fixed", md: "initial" }}
      w={{ base: "100%", md: "14" }}
      h={{ base: "16", md: "initial" }}
      bottom="0px"
      px={{ base: "4", md: "2" }}
      py={{ base: "2", md: "4" }}
      bg={sidebarBackgroundColor}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      {!isMobile && (
        <>
          <PluttoLogo color="brand.600" boxSize="8" />

          <Divider />
        </>
      )}

      <Box as="nav">
        <Stack
          direction={{ base: "row", md: "column" }}
          as="ul"
          listStyleType="none"
        >
          {pages.map(
            ({ title, path, icon, shouldMatchExactHref = false, ...rest }) => {
              const isCurrentPage = shouldMatchExactHref
                ? asPath === path
                : asPath.startsWith(path);

              return (
                <li key={path}>
                  <SidebarIconButton
                    title={title}
                    path={path}
                    icon={icon}
                    aria-label={`${title} page`}
                    variant={isCurrentPage ? "solid" : "shadow"}
                    {...rest}
                  />
                </li>
              );
            }
          )}
        </Stack>
      </Box>
    </VStack>
  );
}
