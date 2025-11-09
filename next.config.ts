import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
      // {
      //   source: '/relay-wzk4/static/:path*',
      //   destination: 'https://eu-assets.i.posthog.com/static/:path*',
      // },
      // {
      //   source: '/relay-wzk4/:path*',
      //   destination: 'https://eu.i.posthog.com/:path*',
      // },
    ]
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
}

export default nextConfig
