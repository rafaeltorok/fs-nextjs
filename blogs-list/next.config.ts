import createMdx from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows all local devices access to the Next Dev Server
  allowedDevOrigins: ["192.168.0.*:3000", "192.168.0.*", "0.0.0.0", "0.0.0.0:3000"],

  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMdx({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
