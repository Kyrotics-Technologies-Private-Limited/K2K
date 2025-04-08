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
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { login, forgotPassword, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      // The useEffect will handle the redirect when user state updates
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      await forgotPassword(email);
      setResetEmailSent(true);
    } catch (error) {
      console.error("Password reset failed:", error);
      setError("Failed to send reset email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-green-100 from-green-100 via-green-300 to-green-100 animate-gradient-x flex items-center justify-center bg-cover bg-center">
      <div className="shadow-xl rounded-2xl p-8 max-w-md w-full bg-white">
        {showForgotPassword ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Reset Password
            </h2>
            {resetEmailSent ? (
              <div className="text-center">
                <p className="text-green-600 mb-4">
                  Password reset link sent to {email}
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmailSent(false);
                  }}
                  className="text-green-600 hover:underline"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-600">
                  Enter your email address and we'll send you a link to reset
                  your password.
                </p>
                <form onSubmit={handleForgotPassword}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="forgot-email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="forgot-email"
                      className="w-full px-3 py-2 border rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {error && (
                    <div className="mb-4 text-red-500 text-sm">{error}</div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full text-green-600 hover:underline"
                  >
                    Back to Login
                  </button>
                </form>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Login</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
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
            <p className="mt-4 text-center">
              Don't have an account?
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
