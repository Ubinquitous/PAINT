import withLinaria from "next-with-linaria";

/** @type {import('next').NextConfig} */
const nextConfig = withLinaria({
  swcMinify: true,
});

export default nextConfig;
