"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { authFetch } from "@/src/lib/authFetch";

type Issue = {
  id: string;
  title: string;
  description: string;
  type: string;
  priority?: string;
  status?: string;
};

function authFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("NO_TOKEN");
  }

  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}

export default function DashboardPage() {
  const router = useRouter();

  const [issues, setIssues] = useState<Issue[]>([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Cloud Security");
  const [priority, setPriority] = useState("Medium");

  // 🔒 Gate dashboard by token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    fetchIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType]);

  async function fetchIssues() {
    setLoading(true);
    setError("");

    try {
      const params = filterType ? `?type=${filterType}` : "";
      const res = await authFetch(`/api/issues${params}`);
      const data = await res.json();

      // ✅ DEFENSIVE FIX (NO CRASH)
      if (!Array.isArray(data)) {
        console.error("Issues API returned non-array:", data);
        setIssues([]);
        return;
      }

      setIssues(data);
    } catch (err) {
      setError("Failed to load issues");
      setIssues([]);
    } finally {
      setLoading(false);
    }
  }

  async function createIssue(e: React.FormEvent) {
    e.preventDefault();

    try {
      await authFetch("/api/issues", {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          type,
          priority,
        }),
      });

      setTitle("");
      setDescription("");
      fetchIssues();
    } catch {
      alert("Failed to create issue");
    }
  }

  return (
  <div className="min-h-screen bg-black text-white p-8">
    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">ApniSec Dashboard</h1>
      <a href="/profile" className="text-blue-400 hover:underline">
        Profile
      </a>
    </div>

    {/* CREATE ISSUE */}
    <div className="grid md:grid-cols-3 gap-8 mb-10">
      <form
        onSubmit={createIssue}
        className="bg-gray-900 p-6 rounded-xl border border-gray-700 space-y-4"
      >
        <h2 className="text-xl font-semibold">Create Issue</h2>

        <select
          className="w-full p-2 bg-black border"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Cloud Security</option>
          <option>Redteam Assessment</option>
          <option>VAPT</option>
        </select>

        <select
          className="w-full p-2 bg-black border"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          className="w-full p-2 bg-black border"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 bg-black border"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Create Issue
        </button>
      </form>

      {/* ISSUE LIST */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-xl font-semibold mb-4">My Issues</h2>

        {issues.map((i) => (
          <div
            key={i.id}
            className="bg-gray-900 p-4 rounded-lg border border-gray-700"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{i.title}</h3>
              <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                {i.type}
              </span>
            </div>

            <p className="text-sm text-gray-400 mt-2">{i.description}</p>

            {i.priority && (
              <p className="text-xs mt-2">Priority: {i.priority}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

}
