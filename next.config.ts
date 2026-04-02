import type { NextConfig } from 'next'

const imageDomains = (process.env.IMAGE_DOMAINS ?? '').split(',').map((domain) => {
  return new URL(domain)
})

const IS_DOCKER_BUILD = process.env.DOCKER_BUILD === 'true'

const nextConfig: NextConfig = {
  output: IS_DOCKER_BUILD ? 'standalone' : undefined,
  reactStrictMode: true,
  images: {
    remotePatterns: imageDomains
  }
}

module.exports = nextConfig
