/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "img.a.transfermarkt.technology",
      "placehold.co",
      "tmssl.akamaized.net",
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
