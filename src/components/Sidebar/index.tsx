import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  FiActivity,
  FiCreditCard,
  FiHome,
  FiMoon,
  FiSun,
} from "react-icons/fi";

import { PluttoIcon } from "components/icons";
import { SidebarIconButton } from "./components/SidebarIconButton";

const pages = [
  {
    title: "Dashboard",
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

  const { colorMode, toggleColorMode } = useColorMode();

  const sidebarBorderColor = useColorModeValue(
    "blackAlpha.100",
    "whiteAlpha.100"
  );

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      borderRight="1px"
      borderColor={sidebarBorderColor}
      w="14"
      px="2"
      py="4"
    >
      <VStack spacing="4">
        <PluttoIcon boxSize="8" />

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

      <VStack spacing="4" mt="4">
        <VStack as="ul" listStyleType="none">
          <li>
            <SidebarIconButton
              title="Toggle theme"
              icon={
                <Icon as={colorMode === "light" ? FiMoon : FiSun} boxSize="5" />
              }
              aria-label="Toggle theme"
              onClick={toggleColorMode}
            />
          </li>
        </VStack>

        <Divider />

        <Avatar
          name="Luiz Pegnolatto"
          src="https://www.github.com/lhpegnolatto.png"
          size="sm"
        />
      </VStack>
    </Flex>
  );
}
