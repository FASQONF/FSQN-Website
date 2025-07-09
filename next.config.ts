/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Отключает ESLint в билде
  },
  output: 'export',
};

module.exports = nextConfig;
