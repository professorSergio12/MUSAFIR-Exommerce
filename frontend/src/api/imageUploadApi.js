import axiosInstance from "./axiosInstance";

export const uploadGalleryImage = async (data) => {
  const response = await axiosInstance.post("/gallery/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const uploadProfilePicture = async (data) => {
  const response = await axiosInstance.post("/gallery/profile-picture", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
