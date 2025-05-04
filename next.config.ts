import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['i.ebayimg.com'], // ✅ allow eBay-hosted images
  },
}

export default nextConfig
