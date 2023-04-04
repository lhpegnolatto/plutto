/** @type {import('next').NextConfig} */
const nextConfig = {
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
    defaultLocale: "pt-BR",
    locales: ["en", "pt-BR"],
  },
};

module.exports = nextConfig;
