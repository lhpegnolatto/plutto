import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Icon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  HiOutlineAcademicCap,
  HiOutlineHome,
  HiOutlineBuildingLibrary,
  HiOutlineBanknotes,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";

import { PluttoIcon } from "components/icons";
import { SidebarIconButton } from "./components/SidebarIconButton";

const pages = [
  {
    title: "Home",
    path: "/",
    icon: <Icon as={HiOutlineHome} boxSize="5" />,
    shouldMatchExactHref: true,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <Icon as={HiOutlineBanknotes} boxSize="5" />,
  },
  {
    title: "Insights - (coming soon)",
    path: "/insights",
    icon: <Icon as={HiOutlineBuildingLibrary} boxSize="5" />,
    isDisabled: true,
  },
  {
    title: "Goals - (coming soon)",
    path: "/goals",
    icon: <Icon as={HiOutlineArrowTrendingUp} boxSize="5" />,
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

  const sidebarBorderColor = useColorModeValue(
    "blackAlpha.100",
    "whiteAlpha.100"
  );

  return (
    <VStack
      spacing="4"
      borderRight="1px"
      borderColor={sidebarBorderColor}
      w="14"
      px="2"
      py="4"
    >
      <PluttoIcon color="brand.600" boxSize="8" />

      <Divider />

      <Box as="nav">
        <VStack as="ul" listStyleType="none">
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
        </VStack>
      </Box>
    </VStack>
  );
}
