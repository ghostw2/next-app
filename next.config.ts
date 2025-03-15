import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Your existing config options here */
  
  // Add this to suppress hydration warnings
  reactStrictMode: true,
  
  // You can add experimental options to suppress specific behaviors
  experimental: {
    // These options can help with hydration warnings
    // Only add what you need based on your specific issues
    esmExternals: 'loose',
  },
  
  // If you're using swc compiler
  swcMinify: true,
};

export default nextConfig;