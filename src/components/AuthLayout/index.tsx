import { Box, Flex } from "@chakra-ui/react";

import { Rocket } from "components/icons";
import {
  fallingStar1Animation,
  fallingStar2Animation,
  fallingStar3Animation,
  fallingStar4Animation,
  fallingStar5Animation,
  rocketAnimation,
  rocketContainerAnimation,
  rocketLaunchAnimation,
  starsGroup1Animation,
  starsGroup2Animation,
} from "./animations";

interface AuthLayoutProps {
  children: React.ReactNode;
  launchNow?: boolean;
}

export function AuthLayout({ children, launchNow = false }: AuthLayoutProps) {
  return (
    <Flex
      h="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p="10"
      bg="gray.800"
      overflow="hidden"
    >
      <Box position="fixed" h="100vh" w="2000px">
        <Box
          w="1px"
          h="1px"
          bg="transparent"
          animation={starsGroup1Animation}
        />
        <Box
          w="2px"
          h="2px"
          bg="transparent"
          animation={starsGroup2Animation}
        />

        <Box
          position="absolute"
          h="100vh"
          w="2000px"
          left="50%"
          transform="translateX(-50%)"
          sx={{
            "& > div": {
              position: "relative",
              width: "1px",
              borderRight: "1px solid white",
            },
          }}
        >
          <Box animation={fallingStar1Animation} />
          <Box animation={fallingStar2Animation} />
          <Box animation={fallingStar3Animation} />
          <Box animation={fallingStar4Animation} />
          <Box animation={fallingStar5Animation} />
        </Box>

        <Box
          position="fixed"
          h="100vh"
          w="2000px"
          bg="radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(26, 32, 44, 1) 100%)"
        />
      </Box>

      <Box animation={rocketContainerAnimation}>
        <Rocket
          w="12"
          h="28"
          color="white"
          transform="translate(-100px, -850px)"
          animation={launchNow ? rocketLaunchAnimation : rocketAnimation}
        />
      </Box>

      {children}
    </Flex>
  );
}
