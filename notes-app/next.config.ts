import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows all local devices access to the Next Dev Server
  allowedDevOrigins: ["192.168.0.*:3000", "192.168.0.*", "0.0.0.0", "0.0.0.0:3000"],
};

export default nextConfig;
