const imageDomains = (process.env.IMAGE_DOMAINS ?? '').split(',').map(domain => {
  const getDataRegex = /(?<protocol>[\w]+)?:\/\/(?<hostname>[\w.-]+)?((?<=[\d]{0,4}):(?<port>[\d]{0,4}))?\/?(?<pathname>.*)?$/
  const groups = getDataRegex.exec(domain).groups ?? {}
  return groups
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: imageDomains
  }
}

module.exports = nextConfig
