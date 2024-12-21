import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.PORT) || 3000,
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL, // Replace with your backend URL
        changeOrigin: true,
        // prependPath: true, // Ensure this is configured properly
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
