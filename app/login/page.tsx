"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Login failed");
      setLoading(false);
      return;
    }

    localStorage.setItem("token", data.token);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1220] via-black to-[#020617]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.15),transparent_60%)]" />

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-10 py-6">
        <h1 className="text-xl font-semibold tracking-wide">ApniSec</h1>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-400">Services</span>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-sm"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex items-center justify-center px-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-20">
          {/* Left marketing section */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Security Issue Management <br /> Platform for Professionals
            </h2>
            <p className="text-gray-400 max-w-md">
              Track and manage security issues efficiently with ApniSec,
              designed for modern cybersecurity teams.
            </p>

            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-medium transition"
            >
              Get Started
            </Link>
          </div>

          {/* Login card */}
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-8 shadow-[0_0_80px_-20px_rgba(56,189,248,0.3)]"
          >
            <h3 className="text-2xl font-semibold mb-1">Welcome Back!</h3>
            <p className="text-sm text-gray-400 mb-6">
              Sign in to continue managing security issues.
            </p>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center mt-5 text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-400 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-gray-500 mt-24 pb-6">
        © 2024 ApniSec. All rights reserved.
      </footer>
    </div>
  );
}
