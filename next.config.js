/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "192.168.1.7",
      "http://192.168.1.7:6969/",
      "http://localhost:6001",
    ],
  },
};

module.exports = nextConfig;
