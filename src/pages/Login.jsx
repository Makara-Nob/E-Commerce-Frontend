import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      login({ email, password });
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md dark:bg-gray-800 p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Sign in to your account
        </h1>
        {error && <p className="text-sm text-red-500 text-center">{error.message}</p>}
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              Remember me
            </label>
            <a href="#" className="text-sm text-primary-600 hover:underline dark:text-primary-500">
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-600"
          >
            {isLoading ? "Logging in..." : "Sign in"}
          </button>

          {/* Signup Link */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Don’t have an account yet?{" "}
            <a href="#" className="text-primary-600 hover:underline dark:text-primary-500">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
