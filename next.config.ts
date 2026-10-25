import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stamped at build time; the footer shows it as "Last updated".
  env: { BUILD_DATE: new Date().toISOString() },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
