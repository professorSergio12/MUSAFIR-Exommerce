import React, { useState } from "react";
import { useSignup } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { mutate: signup, isPending, error } = useSignup();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password, country, phone } = formData;

    if (!username || !email || !password || !country || !phone) {
      alert("Please fill in all fields");
      return;
    }

    signup(formData, {
      onSuccess: () => {
        alert("Account created successfully! Welcome to Travel Blogger.");
        setFormData({
          username: "",
          email: "",
          password: "",
          country: "",
          phone: "",
        });
        navigate("/signin");
      },
      onError: (error) => {
        console.error("Signup error:", error);
        alert(error?.response?.data?.message || "Signup failed! Try again.");
      },
    });
  };

  return (
    <div className="flex justify-center items-center py-20 md:py-15 min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row overflow-hidden rounded-2xl shadow-2xl">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 relative bg-cover bg-center overflow-hidden min-h-[250px] lg:min-h-[600px] rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dpu6rveug/image/upload/v1763201542/singup-image_rmipxc.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/60"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center p-4 md:p-6 lg:p-8 text-white h-full">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-center" style={{ fontFamily: 'cursive' }}>
                MUSAFIR
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-white/90 max-w-md leading-relaxed text-center">
                Travel is the only purchase that enriches you in ways beyond material wealth.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-3 md:p-4 lg:p-5 relative min-h-[600px] overflow-hidden rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none">
          <div className="absolute top-3 right-3 md:top-4 md:right-4 hidden lg:block">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>

          <div className="w-full max-w-md">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 mb-0.5">Welcome</h2>
            <p className="text-gray-500 mb-2 text-xs">Create Your Account</p>

            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-gray-700 text-xs font-medium mb-0.5">
                  Username
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="w-full pl-9 pr-3 py-1.5 text-sm border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-700 text-xs font-medium mb-0.5">
                  Email id
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full pl-9 pr-3 py-1.5 text-sm border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-700 text-xs font-medium mb-0.5">
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-3 py-1.5 text-sm border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-gray-700 text-xs font-medium mb-0.5">
                  Country
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <input
                    id="country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Enter your country"
                    className="w-full pl-9 pr-3 py-1.5 text-sm border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-xs font-medium mb-0.5">
                  Phone Number
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full pl-9 pr-3 py-1.5 text-sm border-2 border-blue-500 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={isPending}
                className={`w-full py-1.5 px-4 rounded-lg font-semibold text-sm text-white transition duration-200 ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isPending ? "Creating Account..." : "SIGN UP"}
              </button>

              {error && (
                <p className="text-red-500 text-center text-xs mt-0.5">
                  {error?.response?.data?.message || "Something went wrong!"}
                </p>
              )}

              {/* OR */}
              <div className="flex items-center my-2">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-2 text-gray-500 text-xs">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Social */}
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  className="w-9 h-9 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <span className="text-base font-bold text-gray-700">G</span>
                </button>
                <button
                  type="button"
                  className="w-9 h-9 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <span className="text-base font-bold text-gray-700">f</span>
                </button>
                <button
                  type="button"
                  className="w-9 h-9 border-2 border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.33-1.09-.58-2.06-.91-3.32-.91-1.26 0-2.23.33-3.32.91-1.03.55-2.1.62-3.08.33-1.71-1.71-1.79-4.7-.14-6.78L12 2l6.19 11.5c1.65 2.08 1.57 5.07-.14 6.78zm-1.5-1.5c.5-.5.5-1.31 0-1.81s-1.31-.5-1.81 0-.5 1.31 0 1.81 1.31.5 1.81 0z" />
                  </svg>
                </button>
              </div>

              <p className="text-center text-gray-600 text-xs mt-2">
                Already have an account?{" "}
                <Link to="/signin" className="text-blue-600 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
