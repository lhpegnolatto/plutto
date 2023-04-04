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
};

module.exports = nextConfig;
