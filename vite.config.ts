import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Code-splitting for faster initial page loads
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            // Core React & routing
            {
              name: "vendor-react",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 3,
            },
            // UI component library
            {
              name: "vendor-ui",
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]react-(dialog|dropdown-menu|tabs|select|avatar|toast|tooltip)[\\/]/,
              priority: 2,
            },
            // Data fetching
            {
              name: "vendor-data",
              test: /[\\/]node_modules[\\/](@tanstack[\\/]react-query|zod|react-hook-form)[\\/]/,
              priority: 1,
            },
          ],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
  server: {
    fs: {
      strict: false,
      allow: [
        path.resolve(import.meta.dirname, "client"),
        path.resolve(import.meta.dirname, "shared"),
        path.resolve(import.meta.dirname, "attached_assets"),
        path.resolve(import.meta.dirname, "node_modules"),
      ],
      deny: ["**/.*"],
    },
  },
});
