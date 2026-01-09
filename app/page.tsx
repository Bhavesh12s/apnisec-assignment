import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ApniSec | Security Issue Management Platform",
  description:
    "ApniSec helps security teams track, manage, and resolve Cloud Security, Red Team, and VAPT issues efficiently.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-green-400">ApniSec</h1>

        <div className="flex items-center gap-6 text-sm">
          <a href="#features" className="text-gray-300 hover:text-white">
            Features
          </a>
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Security Issue Management
            <br />
            <span className="text-blue-400">Built for Cyber Teams</span>
          </h1>

          <p className="mt-6 text-gray-300 text-sm leading-relaxed max-w-xl">
            ApniSec enables security teams to track vulnerabilities, manage
            assessments, and resolve issues across Cloud Security, Red Teaming,
            and VAPT — all from a single secure dashboard.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-semibold"
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* HERO VISUAL PLACEHOLDER */}
       <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <img
          src="/dashboard-preview.png"
          alt="ApniSec Dashboard Preview"
          className="w-full object-cover"
          />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-8"
      >
        <Feature
          icon="🛡"
          title="Cloud Security"
          desc="Monitor, track, and manage cloud security issues with full visibility."
        />
        <Feature
          icon="🎯"
          title="Red Team Assessment"
          desc="Track simulated attack findings and manage remediation progress."
        />
        <Feature
          icon="🧪"
          title="VAPT"
          desc="Identify vulnerabilities early and manage penetration testing results."
        />
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-8 border-t border-white/10">
        © {new Date().getFullYear()} ApniSec. All rights reserved.
      </footer>
    </main>
  );
}

/* ---------- SMALL COMPONENT ---------- */

function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-xl hover:bg-white/10 transition">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}
