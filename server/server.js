import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import plantRoutes from "./routes/plantRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));

// ─── DB Connection Status ───────────────────────────────────────────────────
let isDbConnected = false;

// Middleware to check DB connection
app.use((req, res, next) => {
  if (!isDbConnected && req.path.startsWith("/api/")) {
    // Allow health check even without DB
    if (req.path === "/api/health") return next();

    return res.status(503).json({
      status: "error",
      message: "Database is not connected. Please check your credentials in .env",
    });
  }
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/upload", uploadRoutes);

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Health check
app.get("/api/health", (_, res) =>
  res.json({ status: "ok", time: new Date() }),
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error("❌", err.message);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// ─── DB + Server ──────────────────────────────────────────────────────────────
const mongoUrl = process.env.MONGO_URL;
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("✅ MongoDB connected");
    isDbConnected = true;
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    if (mongoUrl.includes("<db_password>")) {
      console.error(
        "⚠️  ACTION REQUIRED: You need to replace '<db_password>' in server/.env with your actual MongoDB password.",
      );
    }
  });



app.listen(PORT, () => {
  console.log(`🌿 Forest At Home server running on http://localhost:${PORT}`);
});

