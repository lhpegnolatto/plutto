import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

import { theme } from "theme";

export default function Document(props: DocumentProps) {
  const currentLocale = props.__NEXT_DATA__.locale || "pt";

  return (
    <Html lang={currentLocale}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
