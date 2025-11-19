import express from "express";
const router = express.Router();

import { GalleryImageController } from "../controllers/galleryImg.controller.js";
import multerUpload from "../middlewares/multer.middleware.js";

router.post("/upload", multerUpload.single("image"), GalleryImageController);

export default router;