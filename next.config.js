/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [["next-superjson-plugin", {}]],
    serverActions: true,
  },
  images: {
    domains: ['image.tmdb.org'],
  },
};

module.exports = nextConfig;
