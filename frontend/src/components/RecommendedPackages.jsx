import React from "react";
import { useRecommendedPackages } from "../hooks/usePackages";

const RecommendedPackages = () => {
  const { data, isLoading, isError } = useRecommendedPackages();

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Recommended Packages</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Explore our hand-picked packages for your next adventure!
          </p>
        </div>

        {/* Packages Grid */}
        {packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
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
                  <p className="text-sm text-gray-700">{pkg.itinerary}</p>

                  <button className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No packages available at the moment.
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
            View All Packages
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedPackages;
