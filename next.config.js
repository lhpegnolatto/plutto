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
  i18n: { locales: ["en", "pt-BR"], defaultLocale: "pt-BR" },
};

module.exports = nextConfig;
