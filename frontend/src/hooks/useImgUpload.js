import { useMutation } from "@tanstack/react-query";
import {
  uploadProfilePicture,
  uploadGalleryImage,
} from "../api/imageUploadApi";

export const useUploadProfilePicture = () => {
  return useMutation({
    mutationFn: (data) => uploadProfilePicture(data),
    onSuccess: (data) => {
      console.log("Profile Uploaded", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useUploadGalleryImage = () => {
  return useMutation({
    mutationFn: (data) => uploadGalleryImage(data), 
    onSuccess: (data) => {
      console.log("Gallery Image Uploaded", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
