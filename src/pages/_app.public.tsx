import { ReactElement, ReactNode, useState } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

import { AppLayout } from "components/layouts/app";

import { theme } from "theme";
import { AuthLayout } from "components/layouts/auth";

export type NextPageWithLayout = NextPage & {
  layout?: "app" | "auth";
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const AppLayouts = {
  app: AppLayout,
  auth: AuthLayout,
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const Layout = AppLayouts[Component.layout || "app"];

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider theme={theme}>
        <Head>
          <title>Plutto</title>
          <meta
            name="description"
            content="Plutto is a simple personal finance helper for organizing and planning expenses."
          />
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionContextProvider>
  );
}
