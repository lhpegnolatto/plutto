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
};
