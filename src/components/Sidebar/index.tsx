import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Icon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FiActivity, FiCreditCard, FiHome } from "react-icons/fi";

import { PluttoIcon } from "components/icons";
import { SidebarIconButton } from "./components/SidebarIconButton";

const pages = [
  {
    title: "Home",
    path: "/",
    icon: <Icon as={FiHome} boxSize="5" />,
  },
  {
    title: "Transactions",
    path: "/transactions",
    icon: <Icon as={FiActivity} boxSize="5" />,
  },
  {
    title: "Planned",
    path: "/planned",
    icon: <Icon as={FiCreditCard} boxSize="5" />,
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
          {pages.map(({ title, path, icon }) => (
            <li key={path}>
              <SidebarIconButton
                title={title}
                icon={icon}
                aria-label={`${title} page`}
                variant={asPath === path ? "solid" : "shadow"}
              />
            </li>
          ))}
        </VStack>
      </Box>
    </VStack>
  );
}
