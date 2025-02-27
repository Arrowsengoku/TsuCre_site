/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: false, // モジュールの解決を調整
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push('resend'); // 例: 'resend' を外部モジュールとして扱う
    return config;
  },
};

module.exports = nextConfig;

