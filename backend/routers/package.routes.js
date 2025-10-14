import express from "express";
import {
  getRecommendedPackages,
  getAllPackages,
  getPackageBySlug,
  createPackage,
  updatePackage,
  deletePackage,
} from "../controllers/packages.controller.js";
import { verifyToken } from "../utils/verify.js";
import { cachePublicList } from "../utils/cache.js";

const router = express.Router();

router.get("/recommended", cachePublicList("recommended_packages"), getRecommendedPackages);
router.get("/all", getAllPackages);
router.get("/:slug", getPackageBySlug);
router.post("/create", verifyToken, createPackage);
router.put("/update/:id", verifyToken, updatePackage);
router.delete("/delete/:id", verifyToken, deletePackage);

export default router;
