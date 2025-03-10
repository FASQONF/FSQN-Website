/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "es", "pt"],
    defaultLocale: "en", 
  },
  eslint: {
    ignoreDuringBuilds: true, // Отключает ESLint в билде
  },
};

module.exports = nextConfig;
