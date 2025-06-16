import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' https://app.contentful.com`
          }
        ]
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images.ctfassets.net'
      }
    ]
  }
};

export default nextConfig;

