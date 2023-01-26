import { extendTheme } from "@chakra-ui/react";

import { foundations } from "./foundations";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  ...foundations,
});
