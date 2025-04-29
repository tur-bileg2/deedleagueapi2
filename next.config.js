/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['www.asia-basket.com'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  experimental: {
    serverComponentsExternalPackages: ['puppeteer-core', '@sparticuz/chromium'],
  },
  // Increase build memory allocation
  webpack: (config) => {
    config.externals.push({
      puppeteer: 'puppeteer',
    });
    return config;
  },
}

module.exports = nextConfig
