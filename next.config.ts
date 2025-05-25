import type { NextConfig } from "next";

// Cache-busting comment
const nextConfig: NextConfig = {
  serverExternalPackages: ['@supabase/supabase-js'],
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  trailingSlash: false
};

export default nextConfig;
