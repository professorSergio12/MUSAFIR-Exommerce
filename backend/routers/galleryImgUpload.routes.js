import express from "express";
const router = express.Router();

import {
  GalleryImageController,
  getUserGalleryImages,
  deleteUserGalleryImage,
} from "../controllers/galleryImg.controller.js";
import multerUpload from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/verify.js";

router.get("/my", verifyToken, getUserGalleryImages);
router.post("/upload",verifyToken, multerUpload.single("image"), GalleryImageController);
router.delete("/:id", verifyToken, deleteUserGalleryImage);
export default router;
