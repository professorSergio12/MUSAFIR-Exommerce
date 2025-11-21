import { useMutation, useQuery } from "@tanstack/react-query";
import {
  uploadGalleryImage,
  getUserGalleryImages,
} from "../api/imageUploadApi";

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

export const useUserGalleryImages = () => {
  return useQuery({
    queryKey: ["user-gallery-images"],
    queryFn: getUserGalleryImages,
    staleTime: 0,
    gcTime: 0,
  });
};
