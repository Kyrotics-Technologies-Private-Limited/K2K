/*import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
//import Navbar from "../components/Navbar";
//import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="min-h-screen ">
     
      
      <div className="h-screen bg-green-100 from-green-100 via-green-300 to-green-100 animate-gradient-x flex items-center justify-center bg-cover bg-center">
        <div className="shadow-xl rounded-2xl p-8 max-w-md w-full bg-white">
          <h2 className="text-2xl font-bold text-green-700 text-center mb-4">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                {...register("email")}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700">Password</label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your password"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right text-sm text-green-700 hover:underline cursor-pointer">
              Forgot Password?
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition duration-300"
            >
              Login
            </button>

            <div className="text-center mt-4 text-sm">
              Don't have an account?
              <Link
                to="/register"
                className="text-green-700 hover:underline cursor-pointer ml-1"
              >
                Sign Up
              </Link>
            </div>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              className="w-full border border-gray-300 flex items-center justify-center py-2 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              <FcGoogle className="mr-2 text-xl" /> Sign in with Google
            </button>
          </form>
        </div>
      </div>
     
    </div>
  );
};

export default Login;*/

import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../services/firebase/firebase"; // Adjust the path as necessary
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      console.log("Bearer Token:", token);

      // Send token to backend
      const response = await axios.post(
        "http://localhost:5566/api/users/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 1500); // Redirect after 1.5s
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="shadow-xl rounded-2xl p-8 max-w-md w-full bg-white">
        {showForgotPassword ? (
          <>
            <h2 className="text-2xl font-bold text-center mb-4">
              Reset Password
            </h2>
            {resetEmailSent ? (
              <div className="text-center">
                <p className="text-green-600 mb-4">
                  Password reset email sent to {email}
                </p>
                <button
                  className="text-green-600 hover:underline"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                  }}
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-4">
                  Enter your email address and we’ll send you a reset link.
                </p>
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <div className="text-sm text-red-500 mb-2">{error}</div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    className="w-full mt-3 text-green-600 hover:underline"
                    onClick={() => setShowForgotPassword(false)}
                  >
                    Back to Login
                  </button>
                </form>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
              Login
            </h2>
            {error && (
              <div className="mb-3 p-3 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            {message && (
              <div className="mb-3 p-3 bg-green-100 text-green-700 rounded text-sm">
                {message}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                Login
              </button>
            </form>
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-green-600 hover:underline text-sm"
              >
                Forgot your password?
              </button>
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-green-600 hover:underline">
                Register
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
