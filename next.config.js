/** @type {import('next').NextConfig} */
module.exports = {
  pageExtensions: ["public.ts", "public.tsx"],
  reactStrictMode: true,
  redirects: () => [
    {
      source: "/",
      destination: "/home",
      permanent: true,
    },
  ],
  async rewrites() {
    return [
      // PT routes
      {
        source: "/:slug_pt.public",
        destination: "/:slug_pt",
      },
      // EN routes
      {
        source: "/:slug_en.public",
        destination: "/:slug_en",
      },
    ];
  },
  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
    localeDetection: true,
    domains: [
      {
        domain: "plutto.com.br",
        defaultLocale: "pt",
      },
    ],
  },
};
