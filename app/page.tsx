import type { Metadata } from "next";
import Link from "next/link";

/**
 * ✅ PAGE-SPECIFIC SEO
 * Overrides layout metadata for homepage
 */
export const metadata: Metadata = {
  title: "ApniSec | Security as a Service",
  description:
    "ApniSec provides Cloud Security, Red Teaming, and VAPT solutions for modern businesses.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-green-400">ApniSec</h1>
        <div className="space-x-6">
          <Link href="#services">Services</Link>
          <Link
            href="/login"
            className="bg-white text-black px-4 py-2 rounded"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <h1 className="text-4xl font-bold mb-4">
          Security as a Service for Modern Companies
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          ApniSec helps organizations protect their infrastructure through
          Cloud Security, Red Teaming, and VAPT.
        </p>

        <div className="mt-8">
          <Link
            href="/register"
            className="bg-white text-black px-6 py-3 rounded font-semibold"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className="grid md:grid-cols-3 gap-6 px-8 py-16 bg-gray-900"
      >
        <Service
          title="Cloud Security"
          desc="Secure cloud infrastructure with continuous monitoring."
        />
        <Service
          title="Red Team Assessment"
          desc="Simulated attacks to test your organization’s defenses."
        />
        <Service
          title="VAPT"
          desc="Identify vulnerabilities before attackers do."
        />
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 py-6 border-t border-gray-800">
        © {new Date().getFullYear()} ApniSec. All rights reserved.
      </footer>
    </main>
  );
}

function Service({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-black border border-gray-800 p-6 rounded">
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
    </div>
  );
}
