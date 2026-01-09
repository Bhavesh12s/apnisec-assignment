"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
  id: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        id: payload.id,
        email: payload.email,
      });
    } catch {
      localStorage.removeItem("token");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    router.replace("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white/5 border-r border-white/10 p-6 hidden md:block">
        <h1 className="text-xl font-semibold mb-8">ApniSec</h1>
        <nav className="space-y-3 text-sm">
          <Link
            href="/dashboard"
            className="text-gray-400 hover:text-white block"
          >
            📊 Dashboard
          </Link>
          <p className="text-blue-400">👤 Profile</p>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-2xl shadow-2xl p-8">
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
              {user?.email.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-2xl font-semibold mt-4">User Profile</h1>
            <p className="text-sm text-gray-400">
              Manage your ApniSec account
            </p>
          </div>

          {/* INFO */}
          <div className="space-y-4 text-sm">
            <InfoRow label="Email" value={user?.email || ""} />
            <InfoRow label="User ID" value={user?.id || ""} truncate />
            <InfoRow
              label="Account Type"
              value="Standard"
              valueClass="text-green-400"
            />
          </div>

          {/* ACTIONS */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-2.5 rounded-lg font-semibold"
            >
              Back to Dashboard
            </button>

            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 transition py-2.5 rounded-lg font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- SMALL COMPONENT ---------- */

function InfoRow({
  label,
  value,
  truncate,
  valueClass = "",
}: {
  label: string;
  value: string;
  truncate?: boolean;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between items-center border-b border-white/10 pb-2">
      <span className="text-gray-400">{label}</span>
      <span
        className={`font-medium ${
          truncate ? "max-w-[220px] truncate" : ""
        } ${valueClass}`}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}
