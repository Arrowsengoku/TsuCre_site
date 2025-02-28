/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // App Routerを使用していることを明示
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    esmExternals: false, // モジュールの解決を調整
  },
    async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*", // APIルートを適切に解釈
      },
    ];
  },
  webpack: (config) => {
    config.externals = config.externals || [];
    config.externals.push('resend'); // 例: 'resend' を外部モジュールとして扱う
    return config;
  },
};

module.exports = nextConfig;
