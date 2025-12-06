// src/app.js
import express from "express";
import cors from "cors";
import segmentationRoutes from "./routes/segmentationRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import earlyWarningRoutes from "./routes/earlyWarningRoutes.js";
import aiRoutes from "./routes/ai.js";
import { errorHandler } from "./middleware/index.js";
import { apiLimiter, aiLimiter, queryLimiter } from "./middleware/rateLimiter.js";
import { supabaseRequest } from "./config/db.js";
import logger from "./config/logger.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

const app = express();

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight request for 10 minutes
}));
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'iNsight API Documentation',
}));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test Supabase connection
    await supabaseRequest('segments', { select: 'segment_id', limit: 1 });
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: 'connected',
        ai: process.env.GOOGLE_API_KEY ? 'configured' : 'missing',
      },
    });
  } catch (error) {
    logger.error('Health check failed', { message: error.message });
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});

// Apply general rate limiter to all API routes
app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "insight-backend" });
});

// API routes with specific rate limiters
app.use("/api/segments", queryLimiter, segmentationRoutes);
app.use("/api/email", queryLimiter, emailRoutes);
app.use("/api/early-warning", queryLimiter, earlyWarningRoutes);
app.use("/api/ai", aiLimiter, aiRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
