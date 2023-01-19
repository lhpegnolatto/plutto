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
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useAppLoaderContext } from "contexts/AppLoaderContext";
import { routes } from "constants/routes";

export function HeaderUserMenu() {
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  const supabaseClient = useSupabaseClient();
  const { user_metadata: userMetadata } = useUser() ?? {};

  const { setIsAppLoading } = useAppLoaderContext();

  async function signOut() {
    setIsAppLoading(true);

    await supabaseClient.auth.signOut();

    router.push(routes.SIGN_IN);
  }

  return (
    <Menu isLazy>
      <MenuButton as={Button} rightIcon={<Icon as={FiChevronDown} />}>
        <Flex alignItems="center">
          <Avatar
            name={userMetadata?.full_name}
            src={userMetadata?.avatar_url}
            size="xs"
            boxShadow="md"
          />

          <Flex
            flexDirection="column"
            alignItems="flex-start"
            justifyItems="center"
            ml="2"
          >
            <Text fontSize="xs">{userMetadata?.full_name}</Text>
            <Text fontSize="2xs" fontWeight="light">
              {userMetadata?.email}
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
        <MenuItem icon={<Icon as={FiLogOut} boxSize="4" />} onClick={signOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
