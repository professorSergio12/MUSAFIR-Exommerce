import React, { useEffect, useState } from "react";

const services = [
  {
    title: "Affordable Hotels",
    description: "Comfortable stays at the best prices.",
  },
  {
    title: "Food & Drinks",
    description: "Taste the best cuisines from around the world.",
  },
  {
    title: "24x7 Support",
    description: "Always here to help you with your journey.",
  },
  {
    title: "Custom Itineraries",
    description: "Plans personalized just for you.",
  },
  {
    title: "Local Guides",
    description: "Discover hidden gems with local experts.",
  },
  {
    title: "Secure Payments",
    description: "Safe and easy payments every time.",
  },
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Create extended array for seamless looping
  const extendedServices = [...services, ...services.slice(0, 3)];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;

        // If we're at the end of original services, jump back to start
        if (nextIndex >= services.length) {
          setIsTransitioning(false);
          setTimeout(() => {
            setCurrentIndex(0);
            setIsTransitioning(true);
          }, 50);
          return nextIndex;
        }

        setIsTransitioning(true);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>
          <p className="text-lg text-gray-600 mt-2">What We Offer</p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className={`flex ${
              isTransitioning
                ? "transition-transform duration-500 ease-in-out"
                : ""
            }`}
            style={{
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            }}
          >
            {extendedServices.map((srv, index) => (
              <div
                key={`${srv.title}-${index}`}
                className="w-1/3 flex-shrink-0 px-6"
              >
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-orange-500"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {srv.title}
                    </h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300">
                    More Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
