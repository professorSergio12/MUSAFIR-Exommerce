import React from "react";
import HeroCarousel from "../components/HeroCarousel";
import { useRecommendedPackages } from "../hooks/usePackages";

const Home = () => {
  const {
    data: recommendedPackages,
    isLoading,
    isError,
  } = useRecommendedPackages();

  // Fallback packages if API fails
  const fallbackPackages = [
    {
      id: 1,
      title: "Mount Kun Expedition (7077 M | 23218 Ft)",
      duration: "24 Days / 23 Nights",
      itinerary: "Delhi - Leh - Kargil - Parkachik - Shafat Nala - Base Camp - Summit - Base Camp - Kargil - Leh - Delhi",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Markha Valley Trek - Cost And Itinerary Of Markha Valley",
      duration: "8 Days / 7 Nights",
      itinerary: "Leh - Chilling - Skiu - Sara - Markha Village - Skiu - Chilling - Leh",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d49388?w=500&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Mount Nun Climbing Expedition (7135 M | 23409 Ft)",
      duration: "24 Days / 23 Nights",
      itinerary: "Delhi - Leh - Kargil - Tangol - Base Camp - Summit Mt Nun - Base Camp - Tangol - Kargil - Leh - Delhi",
      image: "https://images.unsplash.com/photo-1518623070296-8c646923151c?w=500&h=300&fit=crop"
    }
  ];

  const packages = recommendedPackages || fallbackPackages;

  if (isLoading) {
    return (
      <div className="w-full">
        <HeroCarousel />
        <div className="text-center py-20">Loading packages...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <HeroCarousel />

      {/* High-Altitude Adventures & Cultural Trails Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-6">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              HIGH-ALTITUDE ADVENTURES & CULTURAL TRAILS
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              EXPLORE LEGENDARY PEAKS, REMOTE TRAILS, AND ONCE-IN-A-LIFETIME
              EXPEDITIONS LED BY EXPERT GUIDES
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Package Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={pkg.images}
                    alt={pkg.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Package Content */}
                <div className="p-6">
                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-2">{pkg.durationDays} Days / {pkg.durationDays - 1} Nights</p>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {pkg.name}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {pkg.description || `Explore ${pkg.country} with this amazing ${pkg.durationDays}-day adventure package.`}
                    </p>
                    {pkg.basePrice && (
                      <p className="text-lg font-semibold text-orange-600 mt-2">
                        Starting from ₹{pkg.basePrice.toLocaleString()}
                      </p>
                    )}
                  </div>

                  {/* Book Now Button */}
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View All Packages Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300">
              View All Packages
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
