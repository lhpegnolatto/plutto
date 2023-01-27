import { Fragment, useState } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AppLayout } from "components/AppLayout";
import { BreadcrumbItem } from "components/Header/components/HeaderBreadcrumb";
import { AppLoader } from "components/AppLoader";

import { AppLoaderProvider } from "contexts/AppLoaderContext";
import { queryClient } from "services/queryClient";

import { theme } from "theme";

export type NextPageWithLayout = NextPage & {
  layout?: "app" | "auth";
  breadcrumbItems?: BreadcrumbItem[];
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const AppLayouts = {
  app: AppLayout,
  auth: Fragment,
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const Layout = AppLayouts[Component.layout || "app"];

  return (
    <QueryClientProvider client={queryClient}>
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

          <AppLoaderProvider>
            <AppLoader />

            <Layout breadcrumbItems={Component.breadcrumbItems || []}>
              <Component {...pageProps} />
            </Layout>
          </AppLoaderProvider>
        </ChakraProvider>
      </SessionContextProvider>

      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}
