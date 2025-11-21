import React, { useState } from "react";
import {
  useUserGalleryImages,
  useDeleteUserGalleryImage,
} from "../hooks/useImgUpload";
import { useQueryClient } from "@tanstack/react-query";

const UserPersonalGallery = () => {
  const queryClient = useQueryClient();
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
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-bold mb-2">No Photos Yet</h3>
            <p className="text-gray-600 mb-6">
              Upload your first travel photo!
            </p>
            <a
              href="/profile?tab=post"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg"
            >
              Upload Photo
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPersonalGallery;
