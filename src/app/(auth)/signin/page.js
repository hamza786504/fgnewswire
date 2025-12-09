"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://api.glassworld06.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        const { access_token, expires_in, user } = data;

        if (user.role === "user") {
          // ✅ Normal user → redirect to user dashboard
          localStorage.setItem("token", access_token);
          localStorage.setItem("token_expiry", Date.now() + expires_in * 1000);
          localStorage.setItem("user", JSON.stringify(user));
          router.push("/dashboard/");
        } else {
          // 🚫 Unknown role
          setError("Unauthorized role access.");
        }
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                  outline outline-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
                  outline outline-1 outline-gray-300 placeholder:text-gray-400 
                  focus:outline-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="uppercase w-full bg-gradient-to-r from-blue-400 to-purple-600 
                hover:from-blue-500 hover:to-purple-700 px-8 py-3 rounded-full text-sm 
                font-semibold text-white transition-all duration-300 shadow-lg 
                hover:shadow-xl transform hover:-translate-y-1"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
