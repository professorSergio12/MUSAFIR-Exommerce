import React, { useState } from "react";
import { useSignin } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate: signin, isPending, error } = useSignin();
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

    const { email, password } = formData;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    signin(formData, {
      onSuccess: () => {
        alert("You have logged in successfully! Welcome to Travel Blogger.");
        setFormData({
          username: "",
          email: "",
          password: "",
          country: "",
          phone: "",
        });
      },
      onError: (error) => {
        console.error("Signup error:", error);
        alert(error?.response?.data?.message || "Signin failed! Try again.");
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-900 to-blue-700">
      <div className="bg-blue-800 text-white p-10 rounded-2xl shadow-2xl w-full max-w-lg transform transition-all hover:scale-[1.02]">
        <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wide">
          Login to your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-blue-700 border border-blue-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-blue-700 border border-blue-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white transition"
          />
          <button
            type="submit"
            disabled={isPending}
            className={`w-full font-bold py-3 px-4 rounded-lg transition duration-200 transform shadow-lg ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-50 text-blue-900 hover:scale-[1.02]"
            }`}
          >
            {isPending ? "Logging to your Account..." : "SIGN In"}
          </button>
          <p className="text-center text-gray-300">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <Link
            to="/forgot-password"
            className="text-center text-gray-300"
          >
            Forgot your password?{" "}
          </Link>
          {error && (
            <p className="text-red-300 text-center mt-2">
              {error?.response?.data?.message || "Something went wrong!"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
