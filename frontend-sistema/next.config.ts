import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sin esto, Next.js sube hasta encontrar el package-lock.json del
  // monorepo (chrisal-lab-web/) y resuelve node_modules desde ahí en vez
  // de frontend-sistema/node_modules. En este equipo ese node_modules de
  // la raíz vive en OneDrive y tiene archivos sin sincronizar (placeholders
  // "solo en la nube"), lo que rompe Turbopack con errores como
  // "Cannot find module 'react/jsx-runtime'" aunque el proyecto sí tenga
  // su propia copia completa.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
