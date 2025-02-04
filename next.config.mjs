/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev-api.abds.channelhub.ai",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "staging-api.abds.channelhub.ai",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
