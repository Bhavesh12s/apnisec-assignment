"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
  name?: string | null;
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
      // Decode JWT payload (simple client-side decode)
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-8 text-white">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
            {user?.email.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold mt-4">User Profile</h1>
          <p className="text-gray-400 text-sm">
            Manage your ApniSec account
          </p>
        </div>

        {/* USER INFO */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-gray-400">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>

          <div className="flex justify-between border-b border-slate-700 pb-2">
            <span className="text-gray-400">User ID</span>
            <span className="font-medium truncate max-w-[180px]">
              {user?.id}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Account Type</span>
            <span className="font-medium text-green-400">Standard</span>
          </div>
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
    </div>
  );
}
