import React, { useState } from "react";
import {
  useUserGalleryImages,
  useDeleteUserGalleryImage,
} from "../hooks/useImgUpload";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const UserPersonalGallery = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: galleryData, isLoading, isError } = useUserGalleryImages();
  const { mutate: deleteImage, isPending: isDeleting } =useDeleteUserGalleryImage();

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  let galleryImages = [];

  if (Array.isArray(galleryData)) {
    galleryImages = galleryData;
  } else if (Array.isArray(galleryData?.data)) {
    galleryImages = galleryData.data;
  } else if (Array.isArray(galleryData?.data?.data)) {
    galleryImages = galleryData.data.data;
  }

  const handleDeleteImage = (id) => {
    deleteImage(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user-gallery-images"] });
        setDeleteConfirm(null);
      },
      onError: () => {
        setDeleteConfirm(null);
      },
    });
  };

  const confirmDelete = (id) => setDeleteConfirm(id);
  const cancelDelete = () => setDeleteConfirm(null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading your gallery...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading gallery.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Gallery</h1>
          <p className="text-gray-600">
            {galleryImages.length > 0
              ? `You have ${galleryImages.length} photo${
                  galleryImages.length > 1 ? "s" : ""
                } in your gallery`
              : "Your uploaded tour photos will appear here"}
          </p>
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-2">Delete Image?</h3>
              <p className="text-gray-600 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={cancelDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteImage(deleteConfirm)}
                  disabled={isDeleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image) => {
              const date = new Date(image.uploadedAt).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              );

              return (
                <div
                  key={image._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gray-200 overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt="Gallery"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = "";
                        e.target.style.display = "none";
                      }}
                    />

                    {/* Hover Overlay */}
                    <button
                      onClick={() => confirmDelete(image._id)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4">
                    {image.caption && (
                      <p className="font-medium mb-2 line-clamp-2">
                        {image.caption}
                      </p>
                    )}

                    {image.location && (
                      <p className="text-sm text-gray-600 mb-2">
                        📍 {image.location}
                      </p>
                    )}

                    {image.tags && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {image.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs text-gray-500 border-t pt-2">
                      📅 {date}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="bg-white rounded-2xl shadow-xl p-12 md:p-16 text-center max-w-2xl mx-auto">
              {/* Icon/Illustration */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
                  <svg
                    className="w-16 h-16 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                No Photos Yet
              </h2>

              {/* Description */}
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Abhi tak aapne koi photo upload nahi kiya hai. Apni travel memories share karein aur apni gallery ko beautiful banaein!
              </p>

              {/* CTA Button */}
              <button
                onClick={() => navigate("/profile?tab=post")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPersonalGallery;
