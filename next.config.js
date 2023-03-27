/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["public.ts", "public.tsx"],
  reactStrictMode: true,
  rewrites: [{ source: "/", destination: "/home" }],
};

module.exports = nextConfig;
