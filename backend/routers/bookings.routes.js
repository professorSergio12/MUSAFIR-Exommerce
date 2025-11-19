import express from "express";
import { createBooking, getBookingById, getAllBookings } from "../controllers/bookings.controller.js";
import { verifyToken } from "../middlewares/verify.js";

const router = express.Router();

router.post("/create", verifyToken, createBooking);
router.get("/:id", verifyToken, getBookingById);
router.get("/all", verifyToken, getAllBookings);

export default router;