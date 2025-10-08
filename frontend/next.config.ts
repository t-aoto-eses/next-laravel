import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://nginx_proxy/api/:path*',
      },
    ]
  },
};

export default nextConfig;
