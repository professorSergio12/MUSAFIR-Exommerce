import express from "express";
const router = express.Router();

import { GalleryImageController, profilePictureUpload } from "../controllers/imageUpload.controller.js";
import multerUpload from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/verify.js";

router.post("/upload", verifyToken, multerUpload.single("image"), GalleryImageController);
router.post("/profile-picture", verifyToken, multerUpload.single("profilePicture"), profilePictureUpload);
export default router;