import { Center, Fade, Portal, Spinner } from "@chakra-ui/react";

import { useAppLoaderContext } from "contexts/AppLoaderContext";

export function AppLoader() {
  const { isAppLoading } = useAppLoaderContext();

  return (
    <Portal>
      <Fade in={isAppLoading} unmountOnExit>
        <Center
          position="absolute"
          top="0"
          left="0"
          bg="blackAlpha.700"
          w="100vw"
          h="100vh"
        >
          <Spinner color="brand.500" size="xl" thickness="4px" />
        </Center>
      </Fade>
    </Portal>
  );
}
