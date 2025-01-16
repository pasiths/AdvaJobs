import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import logger from "./logger.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"], // Allow both Vite frontend URLs
// credentials: true,
  })
);

// Middleware to log all incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send("Internal Server Error");
});

// User Microservice
app.use(
  "/api/user",
  createProxyMiddleware({
    target: "http://localhost:8081/user",
    changeOrigin: true,
    onError: (err, req, res) => {
      logger.error(`Error in /api/users: ${err.message}`);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Something went wrong with /api/users.");
    },
  })
);

// Company Microservice
app.use(
  "/api/company",
  createProxyMiddleware({
    target: "http://localhost:8082/company",
    changeOrigin: true,
    onError: (err, req, res) => {
      logger.error(`Error in /api/companies: ${err.message}`);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Something went wrong with /api/companies.");
    },
  })
);

// Job Microservice
app.use(
  "/api/jobs",
  createProxyMiddleware({
    target: "http://localhost:8083/job",
    changeOrigin: true,
    onError: (err, req, res) => {
      logger.error(`Error in /api/jobs: ${err.message}`);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Something went wrong with /api/jobs.");
    },
  })
);

// Application Microservice
app.use(
  "/api/application",
  createProxyMiddleware({
    target: "http://localhost:8084/application",
    changeOrigin: true,
    onError: (err, req, res) => {
      logger.error(`Error in /api/applications: ${err.message}`);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Something went wrong with /api/applications.");
    },
  })
);

// Start the API Gateway
app.listen(8080, () => {
  logger.info("API Gateway is running on http://localhost:8080");
});
