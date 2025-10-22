import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connection.js";
import { connectRedis } from "./config/redis.js";
import { connectQueue } from "./config/queueConnection.js";
import authRoutes from "./routers/auth.routes.js";
import packageRoutes from "./routers/package.routes.js";
import bookingRoutes from "./routers/bookings.routes.js";
import cors from "cors";
// Configure dotenv
dotenv.config({ path: "./.env" });

const app = express();

// Connect to MongoDB and Redis
connectDB();
connectRedis();
connectQueue();

const PORT = process.env.PORT || 4000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));
//test route
app.get("/", (req, res) => {
  res.send("Hello World");
});

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

export default app;
