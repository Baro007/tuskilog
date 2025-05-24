import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@supabase/supabase-js'],
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: false
  },
  typescript: {
    ignoreBuildErrors: false
  },
  trailingSlash: false,
  output: 'export',
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/tuskilog' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/tuskilog' : '',
};

export default nextConfig;
