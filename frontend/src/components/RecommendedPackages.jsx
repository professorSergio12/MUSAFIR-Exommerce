import React, { useState, useRef } from "react";
import { useRecommendedPackages } from "../hooks/usePackages";
import { useNavigate } from "react-router-dom";

const RecommendedPackages = () => {
  const { data, isLoading, isError } = useRecommendedPackages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  // Navigation functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.offsetWidth || 320;
      const newIndex = Math.max(0, currentIndex - 1);
      setCurrentIndex(newIndex);
      container.scrollTo({
        left: newIndex * (cardWidth + 32),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.children[0]?.offsetWidth || 320;
      const maxIndex = Math.max(0, packages.length - 4);
      const newIndex = Math.min(maxIndex, currentIndex + 1);
      setCurrentIndex(newIndex);
      container.scrollTo({
        left: newIndex * (cardWidth + 32),
        behavior: "smooth",
      });
    }
  };

  // Transform API data for frontend
  const packages =
    Array.isArray(data) && data.length
      ? data.map((pkg, index) => ({
          id: pkg._id || index + 1,
          title: pkg.name || `Package ${index + 1}`,
          duration: pkg.durationDays
            ? `${pkg.durationDays} Days / ${pkg.durationDays - 1} Nights`
            : pkg.duration || "N/A",
          itinerary: pkg.description || "Adventure awaits!",
          image:
            pkg.images ||
            pkg.image ||
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=300&fit=crop",
          slug: pkg.slug || "",
        }))
      : [];

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center py-20">Loading packages...</div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center py-20 text-red-500">
            Failed to load packages. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-orange-50 relative">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Section Header with Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">Recommended Packages</h2>
            <p className="text-xl text-gray-600">
              Explore our hand-picked packages for your next adventure!
            </p>
          </div>

          {/* Navigation Arrows - Top Right */}
          <div className="flex space-x-2">
            <button
              onClick={scrollLeft}
              disabled={currentIndex === 0}
              className="w-10 h-10 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors duration-300"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              disabled={currentIndex >= Math.max(0, packages.length - 4)}
              className="w-10 h-10 bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors duration-300"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Cards */}
        {packages.length > 0 ? (
          <div className="relative w-full">
            <div
              ref={scrollContainerRef}
              className="flex space-x-8 overflow-x-auto scrollbar-hide pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                minWidth: "1400px", // Ensure enough space for 4 cards (4 * 320px + 3 * 32px = 1376px)
              }}
            >
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-600 mb-2">{pkg.duration}</p>
                    <h3 className="text-lg font-bold mb-3">{pkg.title}</h3>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                      {pkg.itinerary}
                    </p>

                    <button  onClick={() => navigate(`/packages/${pkg.slug}`)} className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                      More Info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No packages available at the moment.
          </div>
        )}

        {/* View All Packages Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/all-packages")}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            View all packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedPackages;
