/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
  },
};

module.exports = nextConfig;
