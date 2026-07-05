import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "uej44t4vq5.ufs.sh",
    },
  ],
},
  
};

export default nextConfig;
