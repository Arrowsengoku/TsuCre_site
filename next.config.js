/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true, // Netlifyでは next/image の最適化を無効化
  },
  // Enable optimization features
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minification to avoid compilation issues
  // Simplified webpack config to avoid caching issues
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
