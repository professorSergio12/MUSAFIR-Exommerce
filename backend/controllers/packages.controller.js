import packageModel from "../models/package.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import redisClient from "../config/redis.js";
import "../models/location.model.js";
import "../models/hotel.model.js";
import "../models/foodOption.model.js";

export const getRecommendedPackages = async (req, res, next) => {
  try {
    const cacheKey = res.locals.redisKey;
    const cachedPackages = await redisClient.get(cacheKey);

    if (cachedPackages) {
      console.log("Cache HIT — returning cached packages");
      return res.status(200).json(JSON.parse(cachedPackages));
    }

    console.log("Cache MISS — fetching from DB...");
    const packages = await packageModel.find({ isRecommended: true });

    await redisClient.set(cacheKey, JSON.stringify(packages), "EX", 10);
    console.log(`Cached packages under key: ${cacheKey}`);

    return res.status(200).json(packages);
  } catch (error) {
    next(error);
  }
};

export const getAllPackages = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;

    const [packages, total] = await Promise.all([
      packageModel
        .find()
        .select("name slug basePrice images description durationDays country isRecommended bestSeason")
        .skip(skip)
        .limit(limit),
      packageModel.countDocuments(),
    ]);

    // Shape minimal listing payload
    const minimalPackages = packages.map((pkg) => ({
      _id: pkg._id,
      name: pkg.name,
      slug: pkg.slug,
      basePrice: pkg.basePrice,
      image: pkg.images || null,
      description: pkg.description,
      durationDays: pkg.durationDays,
      country: pkg.country,
      isRecommended: pkg.isRecommended,
      bestSeason: pkg.bestSeason,
    }));

    res.status(200).json({
      data: minimalPackages,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 0,
        hasNextPage: skip + packages.length < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPackageBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    if (!slug) {
      return next(errorHandler(400, "Slug is required"));
    }

    const packageData = await packageModel
      .findOne({ slug })
      .populate({
        path: "itinerary",
        select: "-__v",
        strictPopulate: false,
      })
      .populate({
        path: "availableHotels",
        select: "-__v",
        strictPopulate: false,
      })
      .populate({
        path: "availableFoodOptions",
        select: "-__v",
        strictPopulate: false,
      });

    if (!packageData) {
      return next(errorHandler(404, "Package not found"));
    }
    res.status(200).json(packageData);
  } catch (error) {
    console.error("Error fetching package by slug:", error);
    next(error);
  }
};

//Admin Routes
export const createPackage = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "Unauthorized"));
  }
  console.log(req.body);
  const {
    name,
    description,
    basePrice,
    durationDays,
    isRecommended,
    bestSeason,
    images,
    country,
    itinerary,
    availableHotels,
    availableFoodOptions,
  } = req.body;

  // Validate required fields
  if (!name || !basePrice || !durationDays) {
    return next(
      errorHandler(400, "Name, basePrice, and durationDays are required")
    );
  }

  try {
    const newPackage = new packageModel({
      name,
      description,
      basePrice,
      durationDays,
      isRecommended,
      bestSeason,
      images,
      country,
      itinerary,
      availableHotels,
      availableFoodOptions,
    });
    await newPackage.save();

    // Clear recommended packages cache if this package is recommended
    if (isRecommended) {
      await redisClient.del("recommended_packages");
      console.log("🗑️ Cleared recommended packages cache");
    }

    res.status(201).json({ status: "success", data: newPackage });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updatePackage = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "Unauthorized"));
  }

  const updateFields = {
    name: req.body.name,
    description: req.body.description,
    basePrice: req.body.basePrice,
    durationDays: req.body.durationDays,
    isRecommended: req.body.isRecommended,
    bestSeason: req.body.bestSeason,
    images: req.body.images,
    country: req.body.country,
    itinerary: req.body.itinerary,
    availableHotels: req.body.availableHotels,
    availableFoodOptions: req.body.availableFoodOptions,
  };

  const updateObject = Object.fromEntries(
    Object.entries(updateFields).filter(([_, v]) => v !== undefined)
  );

  try {
    const updatedPackage = await packageModel.findByIdAndUpdate(
      req.params.id,
      updateObject,
      { new: true, runValidators: true } // new: true returns the updated document
    );

    if (!updatedPackage) {
      return next(errorHandler(404, "Package not found"));
    }

    // Clear recommended packages cache if isRecommended field was updated
    if (req.body.isRecommended !== undefined) {
      await redisClient.del("recommended_packages");
      console.log("🗑️ Cleared recommended packages cache");
    }

    res.status(200).json({ status: "success", data: updatedPackage });
  } catch (error) {
    next(error);
  }
};

export const deletePackage = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(401, "Unauthorized"));
  }
  try {
    const deletedPackage = await packageModel.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return next(errorHandler(404, "Package not found"));
    }

    res.status(204).json(null);
  } catch (error) {
    next(error);
  }
};
