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
  i18n: {
    locales: ["pt", "en"],
    defaultLocale: "pt",
  },
  async rewrites() {
    return [
      {
        source: "/:slug_pt.public",
        destination: "/:slug_pt",
      },
      {
        source: "/:slug_en.public",
        destination: "/:slug_en",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:slug_pt.public",
        headers: [
          {
            key: "Accept-Language",
            value: "pt-BR",
          },
        ],
      },
      {
        source: "/:slug_en.public",
        headers: [
          {
            key: "Accept-Language",
            value: "en-US",
          },
        ],
      },
    ];
  },
};
