import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";

import { AppLayout } from "components/layouts/app";

import { theme } from "theme";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout>{page}</AppLayout>);

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

      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}
