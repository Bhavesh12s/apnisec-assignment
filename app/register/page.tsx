"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Registration failed");
      return;
    }

    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT SECTION */}
        <div className="hidden md:block text-white">
          <h1 className="text-4xl font-bold leading-tight">
            Secure Your Infrastructure
          </h1>
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            ApniSec helps cybersecurity teams track, manage, and resolve
            security issues across Cloud Security, Red Teaming, and VAPT —
            all from a single dashboard.
          </p>
        </div>

        {/* RIGHT CARD */}
        <form
          onSubmit={handleRegister}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl text-white"
        >
          <h2 className="text-2xl font-semibold mb-2">Create Account</h2>
          <p className="text-sm text-gray-300 mb-6">
            Join ApniSec and start managing security issues.
          </p>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 px-4 py-3 rounded bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full mb-4 px-4 py-3 rounded bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-6 px-4 py-3 rounded bg-black/40 border border-white/10 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <p className="text-sm text-center mt-4 text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
