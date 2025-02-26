/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com']
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
  }
};

module.exports = {
  swcMinify: false, // Disable SWC minification
};

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/.netlify/functions/:path*",
      },
    ];
  },
};
