import redisClient from "../config/redis.js";

export const cachePublicList = (keyPrefix) => async (req, res, next) => {
  try {
    const key = `${keyPrefix}:${JSON.stringify(req.query)}`;

    const cachehedData = await redisClient.get(key);
    console.log(`Cache HIT for key: ${key}`);
    if (cachehedData) {
      return res.status(200).json(JSON.parse(cachehedData));
    }
    res.locals.redisKey = key;
    next();
  } catch (error) {
    console.error("Redis caching error:", error);
    next();
  }
};
