import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: Number(process.env.PORT) || 3000,
    // proxy: {
    //   // Proxy for User Microservice
    //   "/user/": {
    //     target: "http://localhost:8081",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/user/, ""), // Removes `/user` from the path
    //   },
      //   // Proxy for Company Microservice
      //   "/company": {
      //     target: "http://localhost:8082/company",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api\/companiesms/, ""),
      //   },
      //   // Proxy for Job Microservice
      //   "/api/jobsms": {
      //     target: "http://localhost:8083",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api\/jobsms/, ""),
      //   },
      //   // Proxy for Application Microservice
      //   "/api/applicationsms": {
      //     target: "http://localhost:8084",
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api\/applicationsms/, ""),
      //   },
    // },
  },
});
