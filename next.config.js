/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    unoptimized: true, // Netlifyでは next/image の最適化を無効化
  },
  // Enable optimization features
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Simplified webpack config to avoid caching issues
  webpack: (config) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
