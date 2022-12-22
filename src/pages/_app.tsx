import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Plutto</title>
        <meta
          name="description"
          content="Plutto is a simple personal finance helper for organizing and planning expenses."
        />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Component {...pageProps} />
    </ChakraProvider>
  );
}
