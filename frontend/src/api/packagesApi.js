import axiosInstance from "./axiosInstance";

export const getRecommendedPackages = async () => {
  const response = await axiosInstance.get("/packages/recommended");
  return response.data;
};
