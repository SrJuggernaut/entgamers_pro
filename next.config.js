/** @type {import('next').NextConfig} */

const imageDomains = (process.env.IMAGE_DOMAINS ?? '').split(',').map(domain => domain.trim())

module.exports = {
  reactStrictMode: true,
  images: {
    domains: imageDomains
  }
}
