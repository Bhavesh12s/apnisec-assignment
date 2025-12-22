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
      return;
    }

    // ✅ THIS FIXES EVERYTHING
    localStorage.setItem("token", data.token);

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-white shadow-2xl"
      >
        <h1 className="text-2xl font-bold mb-2">WELCOME BACK!</h1>
        <p className="text-sm text-gray-300 mb-6">
          Sign in to start managing your security issues.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full mb-4 px-4 py-3 rounded bg-black/40 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-4 px-4 py-3 rounded bg-black/40 border border-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full py-3 rounded bg-blue-600 hover:bg-blue-700 font-semibold"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-400">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
