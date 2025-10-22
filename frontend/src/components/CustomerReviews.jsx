import React, { useState, useEffect } from "react";

const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review: "Amazing experience! The Kashmir trip was perfectly planned. Our guide was knowledgeable and the hotels were excellent.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    trip: "Kashmir Paradise"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    review: "Best travel agency! The Rajasthan tour exceeded our expectations. Highly recommended for family trips.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    trip: "Rajasthan Royalty"
  },
  {
    id: 3,
    name: "Sneha Patel",
    location: "Ahmedabad",
    rating: 5,
    review: "24x7 support was incredible! They helped us with last-minute changes. The Goa package was perfect.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    trip: "Goa Beach Bliss"
  },
  {
    id: 4,
    name: "Amit Singh",
    location: "Bangalore",
    rating: 5,
    review: "Professional service and great value for money. The local guides were amazing and very helpful.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    trip: "Mount Kun Expedition"
  },
  {
    id: 5,
    name: "Kavya Reddy",
    location: "Hyderabad",
    rating: 5,
    review: "Excellent customer service! They made our honeymoon trip memorable. Will definitely book again.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    trip: "Markha Valley Trek"
  }
];

const CustomerReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
          <p className="text-lg text-gray-600">What Our Travelers Say</p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-gray-50 rounded-2xl p-8 max-w-4xl mx-auto">
                  <div className="text-center">
                    {/* Stars */}
                    <div className="flex justify-center mb-4">
                      {renderStars(review.rating)}
                    </div>

                    {/* Review Text */}
                    <blockquote className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                      "{review.review}"
                    </blockquote>

                    {/* Customer Info */}
                    <div className="flex items-center justify-center">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div className="text-left">
                        <h4 className="text-lg font-semibold text-gray-900">{review.name}</h4>
                        <p className="text-gray-600">{review.location}</p>
                        <p className="text-sm text-orange-500 font-medium">{review.trip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
