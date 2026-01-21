import React from "react";
import {
  UserGroupIcon,
  TrophyIcon,
  GlobeAltIcon,
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const stats = [
    { number: "10K+", label: "Happy Travelers" },
    { number: "50+", label: "Destinations" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  const values = [
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Passion for Travel",
      description:
        "We live and breathe travel, creating unforgettable experiences that inspire wanderlust in every journey.",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Trust & Safety",
      description:
        "Your safety is our priority. We ensure secure bookings and 24/7 support throughout your adventure.",
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We strive for perfection in every detail, delivering exceptional service that exceeds expectations.",
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: "Global Network",
      description:
        "With partners worldwide, we bring you authentic experiences and insider access to hidden gems.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="relative text-white py-32 md:py-40 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dpu6rveug/image/upload/v1764841401/about-page_hcuwkl.jpg"
            alt="Travel Background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-indigo-700/40"></div>
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Musafir</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Where Every Journey Becomes a Story Worth Telling
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 dark:from-gray-900 to-transparent z-10"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 md:mt-16 mb-12 md:mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:scale-105 transition"
            >
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-gray-800 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Values
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              The principles that guide our journeys
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow hover:shadow-xl transition"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {v.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dpu6rveug/image/upload/v1764841806/about-page1_l97vhu.jpg"
            alt="Why Choose Us Background"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gray-900/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Why Choose Musafir?</h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <ClockIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold">24/7 Support</h3>
              <p className="text-gray-300">Assistance whenever you need it</p>
            </div>

            <div>
              <TrophyIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Best Price</h3>
              <p className="text-gray-300">Guaranteed value for money</p>
            </div>

            <div>
              <UserGroupIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Expert Team</h3>
              <p className="text-gray-300">
                Travel professionals you can trust
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
