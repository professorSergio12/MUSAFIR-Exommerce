import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connection.js";
import { connectRedis } from "./config/redis.js";
import authRoutes from "./routers/auth.routes.js";
import packageRoutes from "./routers/package.routes.js";
import "./workers/email.worker.js";
import bookingRoutes from "./routers/bookings.routes.js";
// Configure dotenv
dotenv.config({ path: "./.env" });

const app = express();

// Connect to MongoDB and Redis
connectDB();
connectRedis();

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());

//routers
app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
