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
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  trailingSlash: false,
  generateBuildId: async () => {
    return 'my-build-id'
  }
};

export default nextConfig;
