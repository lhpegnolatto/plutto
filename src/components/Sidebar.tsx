import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  Tooltip,
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
  const buttonsHoverBg = useColorModeValue("gray.100", "whiteAlpha.200");
  const buttonsActiveBg = useColorModeValue("gray.50", "whiteAlpha.400");
  const tooltipBg = useColorModeValue("gray.200", "gray.700");
  const tooltipColor = useColorModeValue("black", "white");

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
                <Tooltip
                  label={title}
                  placement="right"
                  hasArrow
                  bg={tooltipBg}
                  color={tooltipColor}
                >
                  <IconButton
                    aria-label={`${title} page`}
                    icon={icon}
                    variant={asPath === path ? "solid" : "shadow"}
                    _hover={{ bg: buttonsHoverBg }}
                    _active={{ bg: buttonsActiveBg }}
                  />
                </Tooltip>
              </li>
            ))}
          </VStack>
        </Box>
      </VStack>

      <VStack spacing="4" mt="4">
        <VStack as="ul" listStyleType="none">
          <li>
            <Tooltip
              label="Toggle theme"
              placement="right"
              hasArrow
              bg={tooltipBg}
              color={tooltipColor}
            >
              <IconButton
                aria-label="Toggle theme"
                icon={
                  <Icon
                    as={colorMode === "light" ? FiMoon : FiSun}
                    boxSize="5"
                  />
                }
                variant="shadow"
                _hover={{ bg: buttonsHoverBg }}
                _active={{ bg: buttonsActiveBg }}
                onClick={toggleColorMode}
              />
            </Tooltip>
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
