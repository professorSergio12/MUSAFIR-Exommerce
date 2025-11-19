import GalleryImage from "../models/gallery.model.js";
import getDataURI from "../middlewares/dataURI.middleware.js";
import cloudinary from "../config/cloudinary.config.js";

export const GalleryImageController = async (req, res, next) => {
  try {
    const { caption, location, tags } = req.body;
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file received" });
    }

    // Convert file buffer → DataURI
    const fileUri = getDataURI(file);

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      fileUri.content,
      {
        folder: "gallery",
      }
    );

    // Save in MongoDB
    const newImage = new GalleryImage({
      userId: req.user.id,
      imageUrl: cloudinaryResponse.secure_url,
      caption,
      location,
      tags: JSON.parse(tags || "[]"), // if coming as a string from frontend
    });

    await newImage.save();

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: newImage,
    });
  } catch (error) {
    next(error);
  }
};
