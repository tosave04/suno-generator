import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Inclure llms-full.txt dans le tracing du build pour que la Server Action
  // de la route /style puisse le lire via fs.readFileSync en production
  // (sortie standalone Next.js).
  outputFileTracingIncludes: {
    "/style": ["./llms-full.txt"],
  },
};

export default nextConfig;
