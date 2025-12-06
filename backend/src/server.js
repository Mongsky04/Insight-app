// src/server.js
import app from "./app.js";
import dotenv from "dotenv";
import logger from "./config/logger.js";

dotenv.config();

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  logger.info("Insight Backend Server Started");
  logger.info(`Environment: ${NODE_ENV}`);
  logger.info(`URL: http://localhost:${PORT}`);
  logger.info(`Supabase: ${process.env.SUPABASE_URL || "Not configured"}`);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection", { reason, promise });
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", { error });
  process.exit(1);
});
