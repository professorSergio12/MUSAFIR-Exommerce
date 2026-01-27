import React, { useState } from "react";
import { Modal } from "flowbite-react";
import {
  XMarkIcon,
  MagnifyingGlassPlusIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const galleryImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
    title: "Mountain Adventure",
    location: "Swiss Alps",
    height: "tall",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    title: "Beach Paradise",
    location: "Maldives",
    height: "short",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=800&fit=crop",
    title: "Sunset Views",
    location: "Santorini",
    height: "medium",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800&h=600&fit=crop",
    title: "Desert Safari",
    location: "Dubai",
    height: "short",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const getHeightClass = (height) => {
    switch (height) {
      case "tall":
        return "row-span-2";
      case "medium":
        return "row-span-1";
      case "short":
        return "row-span-1";
      default:
        return "row-span-1";
    }
  };

  const getImageHeight = (height) => {
    switch (height) {
      case "tall":
        return "h-64 sm:h-80 md:h-96";
      case "medium":
        return "h-48 sm:h-56 md:h-64";
      case "short":
        return "h-40 sm:h-44 md:h-48";
      default:
        return "h-48 sm:h-56 md:h-64";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 md:mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2 sm:mb-4">
          Our Travel Gallery
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 px-2">
          Explore breathtaking destinations around the world
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 auto-rows-max">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 ${getHeightClass(
                image.height
              )}`}
              onClick={() => setSelectedImage(image)}
            >
              <div
                className={`relative ${getImageHeight(
                  image.height
                )} overflow-hidden`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-base sm:text-lg font-bold mb-1">{image.title}</h3>

                    <p className="text-xs sm:text-sm text-gray-200 flex items-center gap-1">
                      <MapPinIcon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span className="truncate">{image.location}</span>
                    </p>
                  </div>

                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                    <MagnifyingGlassPlusIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal - Flowbite */}
      <Modal
        show={selectedImage !== null}
        size="5xl"
        onClose={() => setSelectedImage(null)}
        popup
      >
        {selectedImage && (
          <div className="relative bg-black p-2 sm:p-4 rounded-lg">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:text-gray-300 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] sm:max-h-[80vh] mx-auto object-contain rounded-lg"
            />

            {/* Details */}
            <div className="text-center text-white mt-3 sm:mt-4 px-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{selectedImage.title}</h2>

              <p className="flex justify-center items-center gap-2 mt-1 sm:mt-2 text-sm sm:text-base text-gray-300">
                <MapPinIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{selectedImage.location}</span>
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Gallery;
