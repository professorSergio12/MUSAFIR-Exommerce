import bcrypt from "bcryptjs";
import {
  enqueueSignupEmail,
  enqueueResetPasswordEmail,
} from "../queues/email.queue.js";
import { welcomeEmailHtml } from "../utils/emailTemplates.js";
import User from "../models/auth.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis.js";

export const signup = async (req, res, next) => {
  const { username, email, password, country, phone } = req.body;
  if (!username || !email || !password || !country || !phone) {
    return next(errorHandler(400, "All fields are required"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      username,
      email,
      password: hashPassword,
      country,
      phone,
    });
    await newUser.save();

    await enqueueSignupEmail(email, username, welcomeEmailHtml(username));
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(errorHandler(400, "Wrong password"));
    }
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const rest = { ...user._doc };
    delete rest.password;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(errorHandler(400, "Email is required"));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    await enqueueResetPasswordEmail(email, user.username, otp);

    redisClient.set(`otp${email}`, otp, "EX", 60 * 5);
    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return next(errorHandler(400, "All fields are required"));
  }
  const storedOTP = await redisClient.get(`otp${email}`);
  if (storedOTP !== otp) {
    return next(errorHandler(400, "Invalid OTP"));
  }
  res.status(200).json({ message: "OTP verified" });
};

export const resetPassword = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
    redisClient.del(`otp${email}`);
  } catch (error) {
    next(error);
  }
};
