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
  useBreakpointValue,
  useColorMode,
  useDisclosure,
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
import { HiChevronDown } from "react-icons/hi2";
import { useEffect } from "react";

export function HeaderUserMenu() {
  const router = useRouter();

  function onLanguageChange(newLocale: string) {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  }

  const { colorMode, toggleColorMode } = useColorMode();

  const supabaseClient = useSupabaseClient();
  const { user_metadata: userMetadata } = useUser() ?? {};

  const { setIsAppLoading } = useAppLoaderContext();

  async function signOut() {
    setIsAppLoading(true);

    await supabaseClient.auth.signOut();

    router.push(routes.SIGN_IN);
  }

  const isMobile = useBreakpointValue({ base: true, md: false });

  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isLanguageOptionsOpen,
    onToggle: onLanguageOptionsToggle,
    onClose: onLanguageOptionsClose,
  } = useDisclosure();

  useEffect(() => {
    if (!isMenuOpen) {
      onLanguageOptionsClose();
    }
  }, [isMenuOpen, onLanguageOptionsClose]);

  return (
    <Menu isLazy isOpen={isMenuOpen} onClose={onMenuClose} onOpen={onMenuOpen}>
      <MenuButton
        as={Button}
        rightIcon={
          !isMobile && (
            <Icon
              as={FiChevronDown}
              transform={isMenuOpen ? "rotate(180deg)" : "rotate(0deg)"}
              transition="transform .2s"
            />
          )
        }
        size="md"
        minW="0"
        px={{ base: "1", md: "4" }}
        borderRadius={{ base: "full", md: "md" }}
      >
        <Flex alignItems="center" py="2">
          <Avatar
            name={userMetadata?.full_name}
            src={userMetadata?.avatar_url}
            size={isMobile ? "sm" : "xs"}
            boxShadow="md"
          />

          {!isMobile && (
            <Flex
              flexDirection="column"
              alignItems="flex-start"
              justifyItems="center"
              ml={{ base: "1", md: "2" }}
            >
              <Text fontSize="xs">{userMetadata?.full_name}</Text>
              <Text fontSize="2xs" fontWeight="light">
                {userMetadata?.email}
              </Text>
            </Flex>
          )}
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

        <MenuItem
          icon={<Icon as={FiGlobe} boxSize="4" />}
          onClick={onLanguageOptionsToggle}
          closeOnSelect={false}
        >
          <Flex alignItems="center" gap="2">
            <Text>Language</Text>
            <Icon
              as={HiChevronDown}
              transform={
                isLanguageOptionsOpen ? "rotate(180deg)" : "rotate(0deg)"
              }
              transition="transform .2s"
            />
          </Flex>
        </MenuItem>
        {isLanguageOptionsOpen && (
          <>
            <MenuItem
              icon={<Icon as={FiGlobe} boxSize="3" />}
              fontSize="xs"
              pl="6"
              color={colorMode === "light" ? "gray.600" : "gray.300"}
              onClick={() => onLanguageChange("en")}
            >
              English
            </MenuItem>
            <MenuItem
              icon={<Icon as={FiGlobe} boxSize="3" />}
              fontSize="xs"
              pl="6"
              color={colorMode === "light" ? "gray.600" : "gray.300"}
              onClick={() => onLanguageChange("pt-BR")}
            >
              Portuguese
            </MenuItem>
          </>
        )}

        <MenuItem icon={<Icon as={FiLogOut} boxSize="4" />} onClick={signOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
