import express from "express";
const router = express.Router();
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
export default router;