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
};

export default nextConfig;
