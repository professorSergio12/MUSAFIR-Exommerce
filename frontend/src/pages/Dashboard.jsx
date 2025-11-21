import React from "react";
import { useUserBookings } from "../hooks/useBookings";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { data: bookingsData, isLoading, isError } = useUserBookings();
  const navigate = useNavigate();

  const bookings = bookingsData?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">
            Failed to load your bookings. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            View and manage all your travel bookings
          </p>
        </div>

        {/* Bookings Grid */}
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => {
              const packageData = booking.packageId;
              const bookingDate = new Date(
                booking.createdAt
              ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              return (
                <div
                  key={booking._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Package Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        packageData?.images ||
                        packageData?.image ||
                        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=300&fit=crop"
                      }
                      alt={packageData?.name || "Package"}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          booking.status === "Confirmed"
                            ? "bg-green-500 text-white"
                            : booking.status === "Pending"
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Package Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {packageData?.name || "Package Name"}
                    </h3>

                    {/* Package Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>
                          {packageData?.durationDays
                            ? `${packageData.durationDays} Days / ${
                                packageData.durationDays - 1
                              } Nights`
                            : "N/A"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>
                          {packageData?.country || "Multiple destinations"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Booked on {bookingDate}</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Booking Amount */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">
                        Total Amount:
                      </span>
                      <span className="text-xl font-bold text-red-600">
                        ₹{booking.amount?.toLocaleString() || "0"}
                      </span>
                    </div>

                    {/* View Package Button */}
                    {packageData?.slug && (
                      <button
                        onClick={() =>
                          navigate(`/packages/${packageData.slug}`)
                        }
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
                      >
                        View Package Details
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No Bookings Yet
            </h3>
            <p className="text-gray-600 mb-6">
              You haven't made any bookings yet. Start exploring our amazing
              packages!
            </p>
            <button
              onClick={() => navigate("/all-packages")}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Explore Packages
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
