import axiosInstance from "./axiosInstance";

export const createReview = async (data) => {
    const response = await axiosInstance.post("/reviews/create", data);
    return response.data;
};

export const getPackageReviews = async (packageId) => {
    const response = await axiosInstance.get(`/reviews/package/${packageId}`);
    return response.data;
};

export const getUserReviews = async () => {
    const response = await axiosInstance.get("/reviews/user");
    return response.data;
};