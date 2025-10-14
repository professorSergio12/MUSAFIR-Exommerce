import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

export default router;
