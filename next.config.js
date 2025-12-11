/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration for Vercel deployment
  trailingSlash: false,
  // Remove standalone output for Vercel
  images: {
    unoptimized: true
  },
  // Ensure proper asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  // Skip build-time static generation for auth-protected pages
  generateBuildId: async () => {
    return 'magic-wrx-build'
  }
}

module.exports = nextConfig
