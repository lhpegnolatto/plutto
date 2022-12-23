import {
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiChevronDown,
  FiGlobe,
  FiLogOut,
  FiMoon,
  FiSun,
} from "react-icons/fi";

export function HeaderUserMenu() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<Icon as={FiChevronDown} />}>
        <Flex>
          <Avatar
            name="Luiz Pegnolatto"
            src="https://www.github.com/lhpegnolatto.png"
            size="xs"
            boxShadow="md"
          />

          <Flex
            flexDirection="column"
            alignItems="flex-start"
            justifyItems="center"
            ml="2"
          >
            <Text fontSize="xs">Luiz Pegnolatto</Text>
            <Text fontSize="2xs" fontWeight="light">
              lhpegnolatto@gmail.com
            </Text>
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList fontSize="sm" sx={{ span: { display: "flex" } }}>
        <MenuItem
          icon={
            <Icon as={colorMode === "light" ? FiMoon : FiSun} boxSize="4" />
          }
          onClick={toggleColorMode}
        >
          Toggle theme
        </MenuItem>
        <MenuItem icon={<Icon as={FiGlobe} boxSize="4" />} isDisabled>
          Language
        </MenuItem>
        <MenuItem icon={<Icon as={FiLogOut} boxSize="4" />} isDisabled>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
