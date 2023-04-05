import { Fragment, useState } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { NextIntlProvider } from "next-intl";

import { AppLayout, AppLayoutProps } from "components/AppLayout";
import { BreadcrumbItem } from "components/Header/components/HeaderBreadcrumb";
import { AppLoader } from "components/AppLoader";

import { AppLoaderProvider } from "contexts/AppLoaderContext";
import { queryClient } from "services/queryClient";

import { theme } from "theme";
import { CurrencyContext, CurrencyProvider } from "contexts/CurrencyContext";

export type NextPageWithLayout = NextPage & {
  layout?: "app" | "auth";
  breadcrumbItems?: BreadcrumbItem[];
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const AppLayouts = {
  app: (props: AppLayoutProps) => <AppLayout {...props} />,
  auth: ({ children }: any) => <Fragment>{children}</Fragment>,
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const Layout = AppLayouts[Component.layout || "app"];

  return (
    <CurrencyProvider>
      <CurrencyContext.Consumer>
        {({ currentCurrency }) => (
          <NextIntlProvider
            messages={pageProps.messages}
            formats={{
              number: {
                default: {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
                currency: {
                  style: "currency",
                  currency: currentCurrency,
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
                percent: {
                  style: "percent",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              },
              dateTime: {
                short: {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                },
              },
            }}
          >
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

              <ReactQueryDevtools />
            </QueryClientProvider>
          </NextIntlProvider>
        )}
      </CurrencyContext.Consumer>
    </CurrencyProvider>
  );
}
